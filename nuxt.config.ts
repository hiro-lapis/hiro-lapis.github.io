// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
  colorMode: {
    preference: 'dark' // always use light mode
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
  nitro:{
    prerender: {
      failOnError: false,
    },
  },
})
