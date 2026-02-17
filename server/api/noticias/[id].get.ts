import { Autor, Noticia, Tag } from '~/server/dbModels';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');

    if (!id) {
        throw createError({ statusCode: 400, message: 'ID é obrigatório' });
    }

    try {
        const noticia = await Noticia.findByPk(id, {
            include: [
                {
                    model: Tag,
                    as: 'tags',
                    attributes: ['id', 'nome', 'tipo'],
                    through: { attributes: [] }
                },
                {
                    model: Autor,
                    as: 'autor',
                    attributes: ['nome'],
                }
            ]
        });

        if (!noticia) {
            throw createError({ statusCode: 404, message: 'Publicação não encontrada' });
        }

        return noticia;
    } catch (error) {
        throw createError({ statusCode: 500, message: 'Erro ao buscar publicação.' });
    }
});