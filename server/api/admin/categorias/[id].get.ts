import { Categoria } from '~/server/dbModels';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');

    if (!id) {
        throw createError({ statusCode: 400, message: 'ID é obrigatório' });
    }

    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
        throw createError({ statusCode: 404, message: 'Categoria não encontrada' });
    }

    return categoria;
});