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

    // ── Segredos e configurações de runtime ──────────────────────
    runtimeConfig: {
        jwtSecret: process.env.JWT_SECRET || '',
        jwtExpiresIn: process.env.JWT_EXPIRES_IN || '2h',
        dbName: process.env.DB_NAME || '',
        dbUser: process.env.DB_USER || '',
        dbPass: process.env.DB_PASS || '',
        dbHost: process.env.DB_HOST || '',

        public: {
            appName: 'Wave',
        }
    },

    nitro: {
        // mysql2, sequelize e sharp têm binários nativos — não podem ser
        // bundlados pelo Rollup. Ficam como require() externos em runtime.
        externals: {
            external: ['mysql2', 'sequelize', 'sharp']
        }
    },

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
