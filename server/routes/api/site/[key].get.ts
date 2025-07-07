import { useStorage } from '#imports'
import { CacheKey, generateCacheKey } from '~~/server/utils/cache'

export default defineEventHandler(async (event) => {
    const key = getRouterParam(event, 'key')
    if (!key) return new Response('Missing slug', { status: 400 })

    const logger = getLogger()
    const cacheKey = generateCacheKey(CacheKey.Site, key)
    const ifNoneMatch = getRequestHeader(event, 'If-None-Match')

    if (getQuery(event)['clearCache'] === 'true') {
        await useStorage('lru-cache').removeItem(cacheKey)
    }

    let resource
    try {
        const cache = await useStorage('lru-cache').getItem(cacheKey)
        if (cache) {
            resource = parseEtagResource(cache)
            if (ifNoneMatch && resource.etag === ifNoneMatch) {
                return new Response(null, { status: 304 })
            }
        }

        if (!resource) {
            const res = await fetch(`${useRuntimeConfig().public.apiURL}/site/${key}`)
            if (!res.ok) return new Response(`Site "${key}" not found.`, { status: 404 })

            const data = await res.json()
            resource = createEtagResource(data)
            useStorage('lru-cache').setItem(cacheKey, JSON.stringify(resource))
        }
    } catch (error) {
        logger.error('Fetch site error', { error })
        return new Response('Server error.', { status: 500 })
    }

    if (resource.data) {
        delete resource.data.styleBody
    }

    return new Response(JSON.stringify(resource.data), {
        headers: {
            'Content-Type': 'application/json',
            'ETag': resource.etag,
            'Cache-Control': 'must-revalidate',
        }
    })
})