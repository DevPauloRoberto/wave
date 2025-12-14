import { Categoria } from '~/server/dbModels';

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 10;
    const offset = (page - 1) * limit;

    try {
        const { count, rows } = await Categoria.findAndCountAll({
            order: [['nome', 'ASC']],
            limit: limit,
            offset: offset
        });
        return {
            total: count,
            data: rows,
            page,
            limit
        };
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Erro ao buscar Categorias no banco de dados.'
        });
    }
});