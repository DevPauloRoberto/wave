import { Admin } from '../../dbModels/index'
import jwt from 'jsonwebtoken'
import {
    AUTH_COOKIE_NAME,
    FLAG_COOKIE_NAME,
    TOKEN_MAX_AGE_SECONDS,
    HttpStatus,
    isRateLimited,
    resetRateLimit,
} from '../../utils/auth'

export default defineEventHandler(async (event) => {
    // ── Rate Limiting (proteção contra Brute Force) ──────────────
    const clientIp = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'

    if (isRateLimited(clientIp)) {
        throw createError({
            statusCode: HttpStatus.TOO_MANY_REQUESTS,
            message: 'Muitas tentativas de login. Tente novamente em 15 minutos.',
        })
    }

    // ── Validação do body ────────────────────────────────────────
    const body = await readBody(event)
    const { usuario, senha } = body

    if (!usuario || !senha) {
        throw createError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Usuário e senha são obrigatórios.',
        })
    }

    try {
        const admin = await Admin.findOne({ where: { usuario } })

        if (!admin || !(await admin.checkPassword(senha))) {
            throw createError({
                statusCode: HttpStatus.UNAUTHORIZED,
                message: 'Usuário ou senha incorretos.',
            })
        }

        // ── Gerar JWT ────────────────────────────────────────────
        const { jwtSecret, jwtExpiresIn } = useRuntimeConfig()

        if (!jwtSecret) {
            console.error('[SECURITY] JWT_SECRET não está definido. Abortando login.')
            throw createError({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Erro de configuração do servidor.',
            })
        }

        const tokenPayload = { id: admin.id, usuario: admin.usuario }

        const token = jwt.sign(tokenPayload, jwtSecret, {
            expiresIn: jwtExpiresIn,
        })

        // ── Cookies seguros ──────────────────────────────────────
        const isProduction = process.env.NODE_ENV === 'production'

        setCookie(event, AUTH_COOKIE_NAME, token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: 'lax',
            maxAge: TOKEN_MAX_AGE_SECONDS,
            path: '/',
        })

        setCookie(event, FLAG_COOKIE_NAME, 'true', {
            httpOnly: false,
            secure: isProduction,
            sameSite: 'lax',
            maxAge: TOKEN_MAX_AGE_SECONDS,
            path: '/',
        })

        resetRateLimit(clientIp)

        return {
            success: true,
            message: 'Login realizado com sucesso!',
            user: { usuario: admin.usuario },
        }
    } catch (error: any) {
        if (error.statusCode) throw error
        console.error('[LOGIN] Erro interno:', error)
        throw createError({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Erro interno do servidor.',
        })
    }
})