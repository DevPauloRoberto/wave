import { Categoria } from '~/server/dbModels';

export default defineEventHandler(async (event) => {
    try {
        const categorias = await Categoria.findAll({
            attributes: ['id', 'nome', 'tipo'],
            order: [['nome', 'ASC']]
        });

        return categorias;
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Erro ao buscar lista completa de categorias.'
        });
    }
});