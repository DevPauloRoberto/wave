import { Categoria } from '~/server/dbModels';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const nome = body.nome
    if (!nome) {
        throw createError({ statusCode: 400, message: 'Nome da Categoria é obrigatório' });
    }
    try {
        const novaCategoria = await Categoria.create({
            nome: nome
        });
        return novaCategoria;
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            message: 'Erro ao criar Categoria no banco de dados.'
        });
    }
});