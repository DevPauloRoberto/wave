import { Noticia, Tag } from '~/server/dbModels';

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
                    attributes: ['id', 'nome'],
                    through: { attributes: [] }
                }
            ]
        });

        if (!noticia) {
            throw createError({ statusCode: 404, message: 'Notícia não encontrada' });
        }

        return noticia; // O Sequelize retorna o objeto com .tags como array
    } catch (error) {
        throw createError({ statusCode: 500, message: 'Erro ao buscar notícia.' });
    }
});