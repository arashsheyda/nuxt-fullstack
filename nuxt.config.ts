export default defineNuxtConfig({

  extends: [
    '@nuxt/ui-pro',
  ],

  modules: [
    '@nuxt/ui',
    '@nuxtjs/mdc',
    '@vueuse/nuxt',
    'nuxt-mongoose',
    './modules/auth.module',
  ],

  ui: {
    icons: [
      'ph',
      'logos',
      'simple-icons',
    ],
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        {
          rel: 'icon',
          href: '/favicon.ico',
        },
      ],
    },
  },

  devtools: {
    enabled: true,
  },
})
