import { Autor } from '~/server/dbModels';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');

    if (!id) {
        throw createError({ statusCode: 400, message: 'ID é obrigatório' });
    }

    try {
        const autor = await Autor.findByPk(id);

        if (!autor) {
            throw createError({ statusCode: 404, message: 'Autor não encontrado' });
        }

        return autor;
    } catch (error) {
        throw createError({ statusCode: 500, message: 'Erro ao buscar autor.' });
    }
});