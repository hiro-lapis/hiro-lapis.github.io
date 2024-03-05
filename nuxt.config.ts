// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    strict: true,
  },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-particles', ],
  app: {
    baseURL: '/hiro-lapis.github.io/', // /<repository>/
    buildAssetsDir: 'assets',
  },
})
