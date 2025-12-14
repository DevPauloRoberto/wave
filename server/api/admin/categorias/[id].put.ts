import { Categoria } from '~/server/dbModels';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    const body = await readBody(event);
    const nome = body.nome;

    if (!id) {
        throw createError({ statusCode: 400, message: 'ID é obrigatório' });
    }

    if (!nome) {
        throw createError({ statusCode: 400, message: 'Nome é obrigatório' });
    }

    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
        throw createError({ statusCode: 404, message: 'categoria não encontrada' });
    }

    await categoria.update({
        nome: nome
    });

    return categoria;
});