import * as vue from 'vue';
import * as imports from '#build/imports';
import * as shared from '@breezingin/breezing-shared';

type ModuleExport = any | null

class Loading {
    promise: Promise<ModuleExport>;

    constructor(promise: Promise<ModuleExport>) {
        this.promise = promise;
    }
}

export function createJSModule(source: string, moduleCache: any): ModuleExport {

    const require = function (id: string) {
        if (moduleCache[id])
            return moduleCache[id];

        throw new Error(`require(${id})) failed. module not found in moduleCache`);
    }

    const importFunction = async function (id: string) {
        return await loadModule(id);
    }

    const module = {
        exports: {}
    }

    const moduleFunction = Function('exports', 'require', 'module', '__bz_import__', source);
    moduleFunction.call(module.exports, module.exports, require, module, importFunction);

    return module.exports;
}

export async function loadModule(id: string): Promise<ModuleExport> {
    const nuxtApp = useNuxtApp();
    const logger = getLogger()
    const widgetPattern = /^~\/widgets\/(.*)\.vue$/i;
    const isWidget = widgetPattern.test(id);

    if (!nuxtApp.$moduleCache) {
        nuxtApp.provide('moduleCache', {
            'vue': vue,
            '#imports': imports,
            '#build/imports': imports,
            '@breezingin/breezing-shared': shared,
        });
    }
    const moduleCache = nuxtApp.$moduleCache as any;

    let module: ModuleExport;

    if (moduleCache[id]) {
        const cached = moduleCache[id];

        if (cached instanceof Loading) {
            module = await cached.promise;
        } else {
            module = cached as ModuleExport;
        }
    } else {
        const loadingPromise = (async (): Promise<ModuleExport> => {
            try {
                if (isWidget) {
                    const match = id.match(widgetPattern);
                    const key = match![1];
                    const scriptSource = await $fetch<string>(`/assets/widget-type/${key}.js`);
                    return createJSModule(scriptSource, moduleCache)?.default;
                }
                throw new Error(`Module ${id} not found`);
            } catch (error) {
                logger.error("load module", { id: id, error: error }) 
                return undefined;
            }
        })();

        moduleCache[id] = loadingPromise;
        module = await loadingPromise;
        moduleCache[id] = module;
    }

    if (isWidget && module && module.__scopeId) {
        const match = id.match(widgetPattern);
        const key = match![1];

        nuxtApp.runWithContext(() => {
            useHead({
                link: [
                    {
                        rel: 'stylesheet',
                        href: `/assets/widget-type/${key}.css`,
                        tagPriority: -1,
                    }
                ],
            });
        });
    }

    return module;
}