
export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const logger = getLogger()

  const api = $fetch.create({
    baseURL: runtimeConfig.public.apiURL,
    onRequest() {

    },
    onResponseError({ response }) {
      logger.error("API response", {
        status: response.status,
        url: response.url,
      })
    },
  })

  return {
    provide: {
      api
    }
  }
})
