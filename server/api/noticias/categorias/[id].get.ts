import { Noticia, Autor, Categoria } from '~/server/dbModels';

export default defineEventHandler(async (event) => {
    const categoriaId = getRouterParam(event, 'id');
    const query = getQuery(event);

    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 6;
    const offset = (page - 1) * limit;

    if (!categoriaId) {
        throw createError({ statusCode: 400, message: 'ID da categoria é obrigatório' });
    }

    const categoriaInfo = await Categoria.findByPk(categoriaId, { attributes: ['nome', 'tipo'] });
    const catName = categoriaInfo ? categoriaInfo.nome : '';
    const catTipo = categoriaInfo ? categoriaInfo.tipo : '';

    try {
        const { count, rows } = await Noticia.findAndCountAll({
            attributes: ['id', 'titulo', 'subtitulo', 'img', 'dataPublicacao'],
            include: [
                {
                    model: Autor,
                    as: 'autor',
                    attributes: ['nome']
                },
                {
                    model: Categoria,
                    as: 'categoria', // CORREÇÃO 1: Alias no singular (igual ao Model)
                    where: { id: categoriaId },
                    attributes: ['nome', 'tipo']
                }
            ],
            order: [['dataPublicacao', 'DESC']],
            limit: limit,
            offset: offset
        });

        const dataTratada = rows.map((item: any) => {
            const noticia = item.toJSON();

            // CORREÇÃO 2: Pega o objeto direto (belongsTo retorna objeto, não array)
            const categoriaEncontrada = noticia.categoria;

            return {
                id: noticia.id,
                titulo: noticia.titulo,
                subtitulo: noticia.subtitulo,
                img: noticia.img,
                autor: noticia.autor.nome,
                categoria: categoriaEncontrada.nome,
                tipo: categoriaEncontrada.tipo
            };
        });

        return {
            total: count,
            data: dataTratada,
            page,
            limit,
            catName,
            catTipo
        };

    } catch (error) {
        console.error('Erro ao buscar notícias por categoria:', error);
        throw createError({ statusCode: 500, message: 'Erro ao buscar notícias.' });
    }
});