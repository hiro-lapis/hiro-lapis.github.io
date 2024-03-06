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
  ui: {
    global: true,
  },
  colorMode: {
    preference: 'dark' // always use light mode
  },
  app: {
    baseURL: '/hiro-lapis.github.io/', // /<repository>/
    buildAssetsDir: 'assets',
  },
})
