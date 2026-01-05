import { Autor } from '~/server/dbModels';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    const { nome } = await readBody(event);

    if (!id) {
        throw createError({ statusCode: 400, message: 'ID é obrigatório' });
    }

    try {
        const autor = await Autor.findByPk(id);

        if (!autor) {
            throw createError({ statusCode: 404, message: 'Autor não encontrado' });
        }

        if (!nome) {
            throw createError({ statusCode: 404, message: 'Nome inválido' });
        }

        // Atualiza os campos enviados
        await autor.update({
            nome: nome,
        });

        return autor;

    } catch (error: any) {
        throw createError({
            statusCode: 500,
            message: 'Erro ao atualizar autor.'
        });
    }
});