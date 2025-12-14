import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: [
        '@nuxtjs/tailwindcss',
        '@primevue/nuxt-module',
        '@nuxt/icon'
    ],
    css: [
        'primeicons/primeicons.css',
        '~/assets/css/main.scss'
    ],
    primevue: {
        options: {
            ripple: true,
            theme: {
                preset: Aura,
                options: {
                    prefix: 'p',
                    darkModeSelector: '.dark-mode',
                    cssLayer: {
                        name: 'primevue',
                        order: 'tailwind-base, primevue, tailwind-utilities'
                    }
                }
            }
        }
    }
})
