import { Autor } from '~/server/dbModels';

export default defineEventHandler(async (event) => {
    try {
        const autor = await Autor.findAll({
            attributes: ['id', 'nome'],
            order: [['nome', 'ASC']]
        });

        return autor;
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Erro ao buscar lista completa de autores.'
        });
    }
});