import { Noticia, NoticiaTags } from '~/server/dbModels';

export default defineEventHandler(async (event) => {
    const { titulo, subtitulo, conteudo, autorId, img, categoriaId, tags } = await readBody(event);

    if (!titulo || !subtitulo || !conteudo || !autorId || !img || !tags || !categoriaId) {
        throw createError({ statusCode: 400, message: 'Todos os campos são Obrigatórios!' });
    }

    try {
        const novaNoticia = await Noticia.create({
            titulo: titulo,
            subtitulo: subtitulo,
            conteudo: conteudo,
            autorId: autorId,
            img: img,
            categoriaId: categoriaId
        });

        if (tags && Array.isArray(tags) && tags.length > 0) {
            const tagsParaSalvar = tags.map((tagId: number) => ({
                idNoticia: novaNoticia.id,
                idTag: tagId
            }));
            await NoticiaTags.bulkCreate(tagsParaSalvar);
        }

        return novaNoticia;

    } catch (error: any) {
        console.error('Erro ao criar notícia:', error);
        throw createError({
            statusCode: 500,
            message: 'Erro ao salvar notícia no banco de dados.'
        });
    }
});