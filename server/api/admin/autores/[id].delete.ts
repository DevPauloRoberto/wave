import { Autor } from '~/server/dbModels';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');

    if (!id) {
        throw createError({ statusCode: 400, message: 'ID é obrigatório' });
    }

    try {
        const deleted = await Autor.destroy({
            where: { id: id }
        });

        if (!deleted) {
            throw createError({ statusCode: 404, message: 'Autor não encontrado' });
        }

        return { success: true, message: 'Autor excluído com sucesso' };

    } catch (error: any) {
        // Tratamento para erro de chave estrangeira (se o autor estiver em uso numa notícia)
        throw createError({
            statusCode: 500,
            message: 'Erro ao excluir autor. Verifique se ele não está vinculado a uma notícia.'
        });
    }
});