import type { RouterConfig } from '@nuxt/schema'

const devRoutes = [
  {
    path: '/test',
    component: () => import('../widgets/test/Test.vue'),
  },
]

export default {
  scrollBehavior: () => {
    return { top: 0, behavior: 'instant' }
  },
  routes: (_routes) => [
    {
      path: '/live-preview',
      component: () => import('./views/preview/LivePreview.vue'),
    },
    {
      path: '/widget-preview',
      component: () => import('./views/preview/WidgetPreview.vue'),
    },
    ...(process.env.NODE_ENV == 'development' ? devRoutes : []),
  ],
} satisfies RouterConfig
