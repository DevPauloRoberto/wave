import jwt, { type JwtPayload } from 'jsonwebtoken'
import { AUTH_COOKIE_NAME, HttpStatus } from '../utils/auth'

/**
 * Server middleware: protege todas as rotas /api/admin/*.
 * Valida o JWT e injeta o payload decodificado em `event.context.auth`.
 */
export default defineEventHandler((event) => {
    const { pathname } = getRequestURL(event)

    // Rotas públicas — não requerem autenticação
    if (!pathname.startsWith('/api/admin')) {
        return
    }

    // ── Extrair token do cookie HttpOnly ─────────────────────────
    const token = getCookie(event, AUTH_COOKIE_NAME)

    if (!token) {
        throw createError({
            statusCode: HttpStatus.UNAUTHORIZED,
            statusMessage: 'Acesso negado: Login necessário.',
        })
    }

    // ── Validar JWT ──────────────────────────────────────────────
    const { jwtSecret } = useRuntimeConfig()

    if (!jwtSecret) {
        console.error('[SECURITY] JWT_SECRET não definido. Bloqueando acesso.')
        throw createError({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            statusMessage: 'Erro de configuração do servidor.',
        })
    }

    try {
        const decoded = jwt.verify(token, jwtSecret) as JwtPayload

        // Injeta dados do admin no contexto para uso downstream
        event.context.auth = {
            id: decoded.id,
            usuario: decoded.usuario,
        }
    } catch {
        throw createError({
            statusCode: HttpStatus.UNAUTHORIZED,
            statusMessage: 'Sessão inválida ou expirada.',
        })
    }
})