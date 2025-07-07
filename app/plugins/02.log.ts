import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
    const url = useRequestURL()
    const event = useRequestEvent()

    const staticExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot', '.map']
    const isStaticFile = staticExtensions.some(ext => url.pathname.endsWith(ext)) 

    if (isStaticFile) {
        return
    }
    
    const logger = getLogger()
    const startTime = performance.now()
    
    const logParams = {
        "site": `"${useRequestHeader('x-site-slug') || 'default'}"`,
        'url': `"${event?.method || 'GET'} ${url.pathname}"`,
        'duration': ''
    }
    
    nuxtApp.hooks.hook('app:rendered', () => {
        const endTime = performance.now()
        const duration = Math.round(endTime - startTime)
        logParams.duration = `${duration}ms`
        logger.info('SSR finished', logParams)
    })
    
    return {
        provide: {
            logger
        }
    }
})