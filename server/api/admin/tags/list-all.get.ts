import { Tag } from '~/server/dbModels';

export default defineEventHandler(async (event) => {
    try {
        const tags = await Tag.findAll({
            attributes: ['id', 'nome', 'tipo'],
            order: [['nome', 'ASC']]
        });

        return tags;
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Erro ao buscar lista completa de tags.'
        });
    }
});