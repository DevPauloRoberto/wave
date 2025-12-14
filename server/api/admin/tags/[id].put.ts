import { Tag } from '~/server/dbModels';

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

    const tag = await Tag.findByPk(id);

    if (!tag) {
        throw createError({ statusCode: 404, message: 'Tag não encontrada' });
    }

    await tag.update({
        nome: nome
    });

    return tag;
});