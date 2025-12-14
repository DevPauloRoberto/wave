import { Tag } from '~/server/dbModels';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');

    if (!id) {
        throw createError({ statusCode: 400, message: 'ID é obrigatório' });
    }

    try {
        const deleted = await Tag.destroy({
            where: { id: id }
        });
        if (!deleted) {
            throw createError({ statusCode: 404, message: 'Tag não encontrada' });
        }
        return { success: true, message: 'Tag excluída com sucesso' };

    } catch (error: any) {
        if (error.statusCode) {
            throw error;
        }

        throw createError({
            statusCode: 500,
            message: 'Erro ao excluir tag: ' + (error.message || 'Erro desconhecido')
        });
    }
});