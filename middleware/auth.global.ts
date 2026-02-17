/**
 * Client-side route middleware global.
 * - Define o layout 'admin' para rotas /admin/*
 * - Redireciona para /admLogin se o cookie de sinalização não existir
 * - Impede acesso à página de login quando já autenticado
 */
export default defineNuxtRouteMiddleware((to) => {
    // ── Layout automático para área administrativa ───────────────
    if (to.path.startsWith('/admin')) {
        setPageLayout('admin')
    }

    const isLoggedIn = useCookie('is_logged_in')

    // Se já está logado e tenta acessar a página de login, redireciona pro admin
    if (to.path === '/admLogin' && isLoggedIn.value) {
        return navigateTo('/admin')
    }

    // Rotas públicas — não precisa de auth
    if (!to.path.startsWith('/admin')) {
        return
    }

    // ── Proteção client-side ─────────────────────────────────────
    // Nota: A validação REAL do token acontece no server middleware.
    // Este check evita "flash" de conteúdo admin para usuários sem cookie.
    if (!isLoggedIn.value) {
        return navigateTo('/admLogin')
    }
})