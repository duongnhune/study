import { PageType, type Page } from '@breezingin/breezing-shared'

// Constants outside the plugin
const PageConfig: Record<string, any> = {
  [PageType.EventDetail]: { pathSuffix: '/:slug' },
  [PageType.ProductDetail]: { pathSuffix: '/:slug' },
  [PageType.ProductCategoryDetail]: { pathSuffix: '/:slug' },
  [PageType.EventCategoryDetail]: { pathSuffix: '/:slug' },
  [PageType.TicketRegistration]: {},
  [PageType.Checkout]: {}
}

const buildRoute = (page: Page) => {
  const config = PageConfig[page.type]
  const basePath = normalizeSlug(page.slug)

  return {
    name: `page-${page.scopedID}`,
    path: config?.pathSuffix ? `${basePath}${config.pathSuffix}`.replace(/\/+/g, '/') : basePath,
    meta: {
      pageID: page.id,
      pageType: page.type,
    },
    // @ts-ignore
    component: () => import('~/views/PageView.vue'),
  }
}

export default defineNuxtPlugin(() => {
  const router = useRouter()
  const siteStore = useSiteStore()

  if (!siteStore.site) {
    return
  }

  const registerRoute = (page: Page): boolean => {
    try {
      const route = buildRoute(page)
      const existingRoute = router.getRoutes().find(r => r.path === route.path)
      if (existingRoute) {
        Logger.error('route already exists', { path: route.path })
        return false
      }
      router.addRoute(route)
      return true
    } catch (error) {
      Logger.error('failed to register route', { pageID: page.id, error })
      return false
    }
  }

  const pages = siteStore.pages
  for (const page of pages) {
    registerRoute(page)
  }
})