import { Autor } from '~/server/dbModels';

export default defineEventHandler(async (event) => {
    const { nome } = await readBody(event);

    if (!nome) {
        throw createError({ statusCode: 400, message: 'O nome do autor é obrigatório.' });
    }

    try {
        const novoAutor = await Autor.create({
            nome: nome,
        });

        return novoAutor;

    } catch (error: any) {
        throw createError({
            statusCode: 500,
            message: 'Erro ao criar autor no banco de dados.'
        });
    }
});