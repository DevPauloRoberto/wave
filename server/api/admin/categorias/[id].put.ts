import { Categoria } from '~/server/dbModels';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    const { nome, tipo } = await readBody(event);

    if (!id) {
        throw createError({ statusCode: 400, message: 'ID é obrigatório' });
    }

    if (!nome) {
        throw createError({ statusCode: 400, message: 'Nome é obrigatório' });
    }

    if (!tipo) {
        throw createError({ statusCode: 400, message: 'Tipo é obrigatório' });
    }

    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
        throw createError({ statusCode: 404, message: 'categoria não encontrada' });
    }

    await categoria.update({
        nome: nome,
        tipo: tipo
    });

    return categoria;
});