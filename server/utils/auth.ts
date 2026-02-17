/**
 * Constantes e utilitários de autenticação.
 * Centraliza configurações para evitar "magic numbers" espalhados no código.
 */

// ── Cookie names ─────────────────────────────────────────────────
export const AUTH_COOKIE_NAME = 'auth_token' as const
export const FLAG_COOKIE_NAME = 'is_logged_in' as const

// ── Tempos (em segundos) ─────────────────────────────────────────
export const TOKEN_MAX_AGE_SECONDS = 60 * 60 * 2 // 2 horas

// ── Bcrypt ───────────────────────────────────────────────────────
export const BCRYPT_SALT_ROUNDS = 12

// ── Rate Limiting (tentativas de login) ──────────────────────────
export const LOGIN_MAX_ATTEMPTS = 5
export const LOGIN_WINDOW_MS = 15 * 60 * 1000 // 15 minutos

// ── Mapa in-memory simples para rate limiting ────────────────────
const loginAttempts = new Map<string, { count: number; firstAttempt: number }>()

/**
 * Verifica se um IP excedeu o limite de tentativas de login.
 * Retorna `true` se BLOQUEADO, `false` se permitido.
 */
export function isRateLimited(ip: string): boolean {
    const now = Date.now()
    const record = loginAttempts.get(ip)

    if (!record) {
        loginAttempts.set(ip, { count: 1, firstAttempt: now })
        return false
    }

    // Janela expirou — resetar
    if (now - record.firstAttempt > LOGIN_WINDOW_MS) {
        loginAttempts.set(ip, { count: 1, firstAttempt: now })
        return false
    }

    record.count++

    return record.count > LOGIN_MAX_ATTEMPTS
}

/**
 * Reseta o contador de tentativas para um IP (chamar após login bem-sucedido).
 */
export function resetRateLimit(ip: string): void {
    loginAttempts.delete(ip)
}

// ── HTTP Status Codes ────────────────────────────────────────────
export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    TOO_MANY_REQUESTS = 429,
    INTERNAL_SERVER_ERROR = 500,
}
