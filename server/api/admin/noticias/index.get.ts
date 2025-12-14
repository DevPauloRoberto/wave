import { Noticia, Categoria } from '~/server/dbModels';

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 10;
    const offset = (page - 1) * limit;

    try {
        const { count, rows } = await Noticia.findAndCountAll({
            attributes: ['id', 'titulo', 'dataPublicacao', 'img', 'autor'],
            include: [
                {
                    model: Categoria,
                    as: 'categoria',
                    attributes: ['nome']
                }
            ],
            order: [['dataPublicacao', 'DESC']],
            limit: limit,
            offset: offset
        });
        const dataTratada = rows.map((item: any) => {
            const noticia = item.toJSON();
            return {
                ...noticia,
                dataPublicacao: new Date(noticia.dataPublicacao).toLocaleDateString('pt-BR'),
            };
        });

        return {
            total: count,
            data: dataTratada,
            page,
            limit
        };
    } catch (error) {
        console.error(error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Erro ao buscar notícias.'
        });
    }
});