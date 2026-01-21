import { Noticia, Categoria, Autor } from '~/server/dbModels';

export default defineEventHandler(async (event) => {
    // 1. Captura os parâmetros da URL
    const query = getQuery(event);

    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 10;
    const offset = (page - 1) * limit;

    try {
        // 2. Busca no banco de dados
        const { count, rows } = await Noticia.findAndCountAll({
            // Seleciona os campos da Notícia
            attributes: ['id', 'titulo', 'subtitulo', 'img', 'dataPublicacao'],

            include: [
                {
                    model: Categoria,
                    as: 'categoria',
                    // Precisamos apenas do 'tipo' para a sua interface
                    attributes: ['tipo']
                },
                {
                    model: Autor,
                    as: 'autor',
                    // Precisamos do nome para preencher a string 'autor'
                    attributes: ['nome']
                }
            ],
            // Ordenação por data
            order: [['dataPublicacao', 'DESC']],
            limit: limit,
            offset: offset
        });

        // 3. Trata os dados para bater exatamente com a interface NoticiaLista
        const dataTratada = rows.map((item: any) => {
            const noticia = item.toJSON();

            return {
                id: noticia.id,
                titulo: noticia.titulo,
                subtitulo: noticia.subtitulo,
                img: noticia.img,
                autor: noticia.autor.nome,
                tipo: noticia.categoria.tipo
            };
        });

        // 4. Retorna
        return {
            total: count,
            data: dataTratada,
            page,
            limit
        };

    } catch (error) {
        console.error('Erro ao listar notícias:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Erro ao buscar notícias.'
        });
    }
});