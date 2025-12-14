import { Tag } from '~/server/dbModels';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');

    if (!id) {
        throw createError({ statusCode: 400, message: 'ID é obrigatório' });
    }

    const tag = await Tag.findByPk(id);

    if (!tag) {
        throw createError({ statusCode: 404, message: 'Tag não encontrada' });
    }

    return tag;
});