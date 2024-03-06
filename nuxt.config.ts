// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    strict: true,
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-particles',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  app: {
    baseURL: '/hiro-lapis.github.io/', // /<repository>/
    buildAssetsDir: 'assets',
  },
})
