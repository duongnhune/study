// https://nuxt.com/docs/api/configuration/nuxt-config

const redisOptions = process.env.REDIS_CLUSTER_HOST
  ? {
    cluster: [{ port: process.env.REDIS_PORT, host: process.env.REDIS_HOST }],
    clusterOptions: { redisOptions: { password: process.env.REDIS_PASSWORD } },
  }
  : { host: process.env.REDIS_HOST, port: process.env.REDIS_PORT, password: process.env.REDIS_PASSWORD };

export default defineNuxtConfig({

  app: {
    rootAttrs: {
      id: '__app',
    },
    buildAssetsDir: "/__app/"
  },

  future: {
    compatibilityVersion: 4
  },

  devtools: { enabled: process.env.NODE_ENV !== 'production' },

  nitro: {
    storage: {
      redis: {
        driver: 'redis',
        ...redisOptions,
      },
      'lru-cache': {
        max: 10000,
        driver: 'lru-cache',
        maxSize: 100 * 1024 * 1024,
      }
    },

  },

  components: [
    {
      global: true,
      path: '~/components/widgets',
      pathPrefix: false,
    },
    {
      global: true,
      path: '~/components/form',
      pathPrefix: false,
    },
    {
      global: true,
      path: '~/components/payments',
      pathPrefix: false,
    },
  ],

  runtimeConfig: {
    logLevel: process.env.LOG_LEVEL,
    public: {
      apiURL: process.env.API_URL?.replace(/\/$/, ''),
      env: process.env.NODE_ENV,
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    }
  },

  vite: {
    optimizeDeps: {
      include: ['@breezingin/breezing-shared'],
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'vi', name: 'Tiếng Việt', file: 'vi.json' },
    ],
  },

  modules: ['@pinia/nuxt', '@nuxtjs/i18n'],
  compatibilityDate: '2025-03-16',
})