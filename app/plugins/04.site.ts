export default defineNuxtPlugin(async () => {
    const siteStore = useSiteStore()

    if (import.meta.server) {
        const siteSlug = useRequestHeader('x-site-slug')

        if (siteSlug) {
            try {
                const site = await $fetch<any>('/api/site/' + siteSlug)

                if (site?.pages?.length) {
                    siteStore.setSite(site)
                    siteStore.setPages(site.pages)
                    siteStore.setWidgets((site.widgets || []).map((w: any) => WidgetFactory.parseWidget(w)))
                }
            } catch (error) {
                Logger.error('Failed to load site data', { siteSlug, error })
            }
        }
    }
})
