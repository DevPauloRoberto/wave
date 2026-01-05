import { Tag } from '~/server/dbModels';

export default defineEventHandler(async (event) => {
    const { nome, tipo } = await readBody(event);

    if (!nome) {
        throw createError({ statusCode: 400, message: 'Nome da tag é obrigatório' });
    }
    if (!tipo) {
        throw createError({ statusCode: 400, message: 'Tipo da tag é obrigatório' });
    }
    try {
        const novaTag = await Tag.create({
            nome: nome,
            tipo: tipo
        });
        return novaTag;
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            message: 'Erro ao criar tag no banco de dados.'
        });
    }
});