// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // for avoid prerender fail, disable ssr
  ssr: false,
  nitro:{
    // https://github.com/nuxt/nuxt/issues/24228#issuecomment-1922526863
    prerender: {
      failOnError: false,
    },
  },
  routeRules: {
    // Disable pre-rendered at build time
    '/writing': { prerender: false },
  },
  devtools: { enabled: true },
  typescript: {
    strict: true,
  },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    'nuxt-particles',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  css: ['~/assets/foundation/main.scss'],
  ui: {
    global: true,
  },
  app: {
    baseURL: '/hiro-lapis.github.io/', // /<repository>/
    buildAssetsDir: 'assets',
    head: {
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Reddit+Mono:wght@200..900&display=swap',
          crossorigin: '',
        },
      ],
    },
  },
})
