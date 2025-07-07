import { Translation } from "@breezingin/breezing-shared";

export default defineEventHandler(async (event) => {
    const logger = getLogger();
    const config = useRuntimeConfig();
    const apiURL = config.public.apiURL;

    const language = getRouterParam(event, 'language');
    if (!language) {
        return new Response('Missing language', { status: 400 });
    }

    const query = getQuery(event);
    const entityType = query.entityType?.toString();
    if (!entityType) {
        return new Response('Missing entityType', { status: 400 });
    }

    let entityIDs: string[] = [];
    if (query.entityIDs) {
        entityIDs = query.entityIDs.toString().split(',').map(id => id.trim()).filter(Boolean);
    }

    if (entityIDs.length === 0) {
        return new Response('Missing entityIDs parameter', { status: 400 });
    }

    const cacheKey = generateCacheKey(CacheKey.Translation, language, entityType, entityIDs.sort().join(','));
    const ifNoneMatch = getRequestHeader(event, 'If-None-Match');

    if (query['clearCache'] === 'true') {
        await useStorage('lru-cache').removeItem(cacheKey);
    }

    let resource;
    try {
        const cache = await useStorage('lru-cache').getItem(cacheKey);
        if (cache) {
            resource = parseEtagResource(cache);
            if (ifNoneMatch && resource.etag === ifNoneMatch) {
                return new Response(null, { status: 304 });
            }
        }

        if (!resource) {
            const queryParams = new URLSearchParams({
                language,
                entityType,
                entityIDs: entityIDs.join(','),
            });

            const res = await fetch(`${apiURL}/translation?${queryParams}`);
            if (!res.ok) {
                logger.error('Translation API error', {
                    status: res.status,
                    entityIDs,
                });
                return new Response(`Translation not found.`, { status: 404 });
            }

            const data = await res.json();
            const result: Record<string, any> = {};

            if (data.items && data.items.length) {
                data.items.forEach((translation: Translation) => {
                    const entityID = translation.entityID;
                    if (translation.messages) {
                        Object.keys(translation.messages).forEach((key) => {
                            const value = translation.messages[key];
                            const messageKey = `${entityType}.${entityID}.${key}`;
                            if (key && value) {
                                result[messageKey] = value;
                            }
                        });
                    }
                });
            }

            resource = createEtagResource(result);
            await useStorage('lru-cache').setItem(cacheKey, JSON.stringify(resource));
        }
    } catch (error) {
        logger.error('Fetch translation error', { error });
        return new Response('Server error.', { status: 500 });
    }

    return new Response(JSON.stringify(resource.data), {
        headers: {
            'Content-Type': 'application/json',
            'ETag': resource.etag,
            'Cache-Control': 'must-revalidate',
        },
    });
});