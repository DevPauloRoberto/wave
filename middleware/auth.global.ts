export default defineNuxtRouteMiddleware((to, from) => {

    if (to.path.startsWith('/admin')) {

        setPageLayout('admin');
    }

    if (!to.path.startsWith('/admin')) {
        return;
    }

    const isLoggedIn = useCookie('is_logged_in');

    if (!isLoggedIn.value) {
        return navigateTo('/admLogin');
    }
});