import { useNuxtApp } from '#imports'

interface TranslationOptions {
    language?: string
    entityType: string
    entityID: string | string[],
}

interface LoadedKeys {
    [key: string]: boolean
}


export async function loadTranslation(options: TranslationOptions): Promise<boolean> {
    const nuxtApp = useNuxtApp()
    if (!nuxtApp.$i18nLoadedKeys) {
        nuxtApp.provide('i18nLoadedKeys', {});
    }

    const { $logger, $i18n } = nuxtApp
    const $i18nLoadedKeys = nuxtApp.$i18nLoadedKeys as LoadedKeys
    const { language = $i18n.locale.value, entityType, entityID } = options

    let entityIDs = Array.isArray(entityID) ? entityID : [entityID]
    entityIDs = entityIDs.filter((id) => $i18nLoadedKeys[getKey(language, entityType, id)] !== true)

    if (entityIDs.length === 0) {
        return true
    }

    const CHUNK_SIZE = 200
    const chunks = []

    for (let i = 0; i < entityIDs.length; i += CHUNK_SIZE) {
        chunks.push(entityIDs.slice(i, i + CHUNK_SIZE))
    }

    try {
        const fetchPromises = chunks.map(async (chunk) => {
            try {
                const messages = await $fetch<Record<string, string>>(`/translations/${language}`, {
                    params: {
                        entityType,
                        entityIDs: chunk.join(','),
                    }
                });

                return { chunk, messages, success: !!messages };
            } catch (error) {
                $logger.error('failed to load translation chunk', { error, entityType, chunkSize: chunk.length });
                return { chunk, messages: null, success: false };
            }
        });

        const results = await Promise.all(fetchPromises);

        let overallSuccess = true;

        for (const { chunk, messages, success } of results) {
            if (success && messages) {
                $i18n.mergeLocaleMessage(language, messages);

                for (const id of chunk) {
                    $i18nLoadedKeys[getKey(language, entityType, id)] = true;
                }
            } else {
                overallSuccess = false;
            }
        }

        return overallSuccess;
    } catch (err) {
        $logger.error('failed to load translations', { err, entityType, totalCount: entityIDs.length, chunkCount: chunks.length });
        return false;
    }
}

export async function switchLanguage(language: string): Promise<void> {
    const nuxtApp = useNuxtApp();
    const { $i18n } = nuxtApp;
    const $i18nLoadedKeys = nuxtApp.$i18nLoadedKeys as LoadedKeys;
 
    const loadedKeys = Object.keys($i18nLoadedKeys || {}); 
    const entityTypeMap = new Map<string, string[]>();
    
    for (const key of loadedKeys) {
        const { language: loadedLanguage, entityType, entityID } = parseKey(key);
        
        if (loadedLanguage !== language) {
            if (!entityTypeMap.has(entityType)) {
                entityTypeMap.set(entityType, []);
            }
            entityTypeMap.get(entityType)?.push(entityID);
        }
    }
    
    for (const [entityType, entityIDs] of entityTypeMap.entries()) {
        if (entityIDs.length > 0) {
            await loadTranslation({ language, entityType, entityID: entityIDs });
        }
    }
    $i18n.setLocale(language as any);
}

function getKey(language: string, entityType: string, entityID: string) {
    return `${language}-${entityType}-${entityID}`;
}

function parseKey(key: string)  {
    const parts = key.split('-');
    return {
        language: parts[0] || '',
        entityType: parts[1] || '',
        entityID: parts.slice(2).join('-'),
    }
}

