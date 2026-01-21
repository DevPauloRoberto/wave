import { Noticia, Autor, Tag } from '~/server/dbModels';

export default defineEventHandler(async (event) => {
    // Pega o ID da Tag da URL
    const tagId = getRouterParam(event, 'id');
    const query = getQuery(event);

    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 6;
    const offset = (page - 1) * limit;

    if (!tagId) {
        throw createError({ statusCode: 400, message: 'ID da tag é obrigatório' });
    }

    const tagInfo = await Tag.findByPk(tagId, { attributes: ['nome', 'tipo'] });
    const tagName = tagInfo ? tagInfo.nome : '';
    const tagTipo = tagInfo ? tagInfo.tipo : '';

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
                    model: Tag,
                    as: 'tags',
                    where: { id: tagId },
                    attributes: ['nome', 'tipo']
                }
            ],
            order: [['dataPublicacao', 'DESC']],
            limit: limit,
            offset: offset
        });

        const dataTratada = rows.map((item: any) => {
            const noticia = item.toJSON();

            const tagEncontrada = noticia.tags && noticia.tags.length > 0 ? noticia.tags[0] : null;

            return {
                id: noticia.id,
                titulo: noticia.titulo,
                subtitulo: noticia.subtitulo,
                img: noticia.img,
                autor: noticia.autor.nome,
                tipo: tagEncontrada.tipo
            };
        });

        return {
            total: count,
            data: dataTratada,
            page,
            limit,
            tagName,
            tagTipo
        };

    } catch (error) {
        console.error('Erro ao buscar notícias por tag:', error);
        throw createError({ statusCode: 500, message: 'Erro ao buscar notícias.' });
    }
});