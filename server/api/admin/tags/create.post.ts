import { Tag } from '~/server/dbModels';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const nome = body.nome
    if (!nome) {
        throw createError({ statusCode: 400, message: 'Nome da tag é obrigatório' });
    }
    try {
        const novaTag = await Tag.create({
            nome: nome
        });
        return novaTag;
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            message: 'Erro ao criar tag no banco de dados.'
        });
    }
});