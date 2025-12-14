import { Noticia } from '~/server/dbModels';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');

    if (!id) {
        throw createError({ statusCode: 400, message: 'ID é obrigatório' });
    }

    try {
        const deleted = await Noticia.destroy({
            where: { id: id }
        });

        if (!deleted) {
            throw createError({ statusCode: 404, message: 'Notícia não encontrada' });
        }

        return { success: true, message: 'Notícia excluída com sucesso' };
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            message: 'Erro ao excluir notícia: ' + error.message
        });
    }
});