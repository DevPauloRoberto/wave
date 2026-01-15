import { Categoria } from '~/server/dbModels';

export default defineEventHandler(async (event) => {
    const { nome, tipo } = await readBody(event);

    if (!nome) {
        throw createError({ statusCode: 400, message: 'Nome da Categoria é obrigatório' });
    }
    if (!tipo) {
        throw createError({ statusCode: 400, message: 'Tipo da Categoria é obrigatório' });
    }

    try {
        const novaCategoria = await Categoria.create({
            nome: nome,
            tipo: tipo
        });
        return novaCategoria;
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            message: 'Erro ao criar Categoria no banco de dados.'
        });
    }
});