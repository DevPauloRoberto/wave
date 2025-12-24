import { Noticia } from '~/server/dbModels';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    const { titulo, subtitulo, conteudo, autor, img, categoriaId, tags } = await readBody(event);

    if (!id) {
        throw createError({ statusCode: 400, message: 'ID é obrigatório' });
    }

    if (!titulo || !subtitulo || !conteudo || !autor || !img || !tags || !categoriaId) {
        throw createError({ statusCode: 400, message: 'Todos os campos são Obrigatórios!' });
    }

    try {
        const noticia = await Noticia.findByPk(id);

        if (!noticia) {
            throw createError({ statusCode: 404, message: 'Notícia não encontrada' });
        }

        await noticia.update({
            titulo: titulo,
            subtitulo: subtitulo,
            conteudo: conteudo,
            autor: autor,
            img: img,
            categoriaId: categoriaId
        });


        if (tags && Array.isArray(tags)) {
            await (noticia as any).setTags(tags);
        }

        return { success: true, message: 'Atualizado com sucesso' };

    } catch (error: any) {
        console.error('Erro ao atualizar:', error);
        throw createError({
            statusCode: 500,
            message: 'Erro ao atualizar notícia.'
        });
    }
});