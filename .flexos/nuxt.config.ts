// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: [
    '~/assets/css/tokens.css',
    '~/assets/css/components.css'
  ],
  app: {
    head: {
      title: 'Nabludatel | Command Center',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Automated forensic monitoring for democratic elections.' }
      ]
    }
  }
})
