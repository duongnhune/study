import type { UseFetchOptions } from 'nuxt/app'

export function useAPI<T>(
  url: string | (() => string),
  options?: UseFetchOptions<T>,
) {
  const {$logger} = useNuxtApp()
  return useFetch(url, {
    ...options,
    onResponse: (response) => {
      const { status, url} = response.response
      if (status !== 200) {
        $logger.error("Non-200 response", { status, url })
      }
    },
    onResponseError: (error) => {
      $logger.error("useAPI response", { error: error.error })
    },
    $fetch: useNuxtApp().$api as typeof $fetch
  })
}
