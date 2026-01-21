import jwt from 'jsonwebtoken';

export default defineEventHandler((event) => {
    // 1. Pega o caminho da URL que está sendo acessada
    const { pathname } = getRequestURL(event);

    // 2. Filtro: Só nos importamos se a rota começar com '/api/admin'
    // Se for outra coisa (ex: login, home, imagens), deixa passar.
    if (!pathname.startsWith('/api/admin')) {
        return;
    }

    // 3. Tenta pegar o cookie seguro 'auth_token'
    const token = getCookie(event, 'auth_token');

    // 4. Se não tiver token, bloqueia (401 Unauthorized)
    if (!token) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Acesso negado: Login necessário.'
        });
    }

    // 5. Verifica se o token é válido e não expirou
    try {
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            // Fallback apenas para evitar erro fatal se esquecer o .env em dev
            // Em produção isso deve estar configurado!
            console.warn('[Security] JWT_SECRET não definido no .env');
        }

        // jwt.verify lança um erro se o token for falso ou expirado
        jwt.verify(token, secret || 'SuaChaveSuperSecretaECompridaQueNinguemDescobre123');

    } catch (error) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Sessão inválida ou expirada.'
        });
    }
});