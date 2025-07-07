import { CacheKey, useStorage } from '#imports'

export default defineEventHandler(async (event) => {
    const fileName = getRouterParam(event, 'file-name')
    if (!fileName) return new Response('Missing file name.', { status: 400 })

    const logger = getLogger()
    const key = fileName.replace(/\.(js|css)$/, '')
    const ext = fileName.split('.').pop()
    const cacheKey = generateCacheKey(CacheKey.WidgetType, key)
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
            const res = await fetch(`${useRuntimeConfig().public.apiURL}/widget-type/${key}`)
            if (!res.ok) return new Response(`Widget "${key}" not found.`, { status: 404 })

            const data = await res.json()
            resource = createEtagResource(data)
            useStorage('lru-cache').setItem(cacheKey, JSON.stringify(resource))
        }
    } catch (error) {
        logger.error('Fetch widget error', { error })
        return new Response('Server error.', { status: 500 })
    }

    return new Response(ext === 'css' ? resource.data.styleSource : resource.data.scriptSource, {
        headers: { 
            'Content-Type': ext === 'css' ? 'text/css' : 'text/javascript',
            'ETag': resource.etag,
            'Cache-Control': 'must-revalidate',
        }
    })
})