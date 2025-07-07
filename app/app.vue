<script setup lang="ts">
import type { SiteTheme } from '@breezingin/breezing-shared'

const siteStore = useSiteStore()
const { site } = storeToRefs(siteStore)

const applyTheme = (theme: SiteTheme) => {
  if (!theme) return

  let css = `:root, [data-bs-theme="light"] {`

  if (theme.primaryColor?.hexColor) css += `--bs-primary: ${theme.primaryColor.hexColor};`
  if (theme.primaryColor?.rgbColor) css += `--bs-primary-rgb: ${theme.primaryColor.rgbColor};`
  if (theme.secondaryColor?.hexColor) css += `--bs-secondary: ${theme.secondaryColor.hexColor};`
  if (theme.secondaryColor?.rgbColor) css += `--bs-secondary-rgb: ${theme.secondaryColor.rgbColor};`
  if (theme.darkColor?.hexColor) css += `--bs-dark: ${theme.darkColor.hexColor};`
  if (theme.darkColor?.rgbColor) css += `--bs-dark-rgb: ${theme.darkColor.rgbColor};`

  css += `}\n`

  css += `.bz-box {`
  if (theme.boxFontSize?.unit) css += `--fontsize-unit: ${theme.boxFontSize.unit};`
  if (theme.boxFontSize?.unitMd) css += `--fontsize-unit-md: ${theme.boxFontSize.unitMd};`
  if (theme.boxFontSize?.unitLg) css += `--fontsize-unit-lg: ${theme.boxFontSize.unitLg};`
  css += `}\n`

  css += `.btn-primary {`
  if (theme.primaryButton?.bgColor) css += `--bs-btn-bg: ${theme.primaryButton.bgColor};`
  if (theme.primaryButton?.hoverBgColor) css += `--bs-btn-hover-bg: ${theme.primaryButton.hoverBgColor};`
  if (theme.primaryButton?.hoverBorderColor) css += `--bs-btn-hover-border-color: ${theme.primaryButton.hoverBorderColor};`
  css += `}\n`

  css += `.btn-secondary {`
  if (theme.secondaryButton?.bgColor) css += `--bs-btn-bg: ${theme.secondaryButton.bgColor};`
  if (theme.secondaryButton?.hoverBgColor) css += `--bs-btn-hover-bg: ${theme.secondaryButton.hoverBgColor};`
  if (theme.secondaryButton?.hoverBorderColor) css += `--bs-btn-hover-border-color: ${theme.secondaryButton.hoverBorderColor};`
  css += `}\n`

  useHead({
    style: [{ innerHTML: css, tagPriority: 0 }]
  })
}

watchEffect(() => {
  if (site.value) { 
    useHead({
      title: site.value.title,
      meta: [
        { name: 'description', content: site.value.description || '' },
        { name: 'keywords', content: site.value.keywords?.join(',') || '' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: site.value.title },
        { property: 'og:description', content: site.value.description || '' },
        { property: 'og:image', content: site.value.socialImage || '' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: site.value.title },
        { name: 'twitter:description', content: site.value.description || '' },
        { name: 'twitter:image', content: site.value.socialImage || '' },
      ].filter(meta => meta.content),
      link: [
        { href: site.value.favicon, rel: 'shortcut icon' },
        {
          rel: 'stylesheet',
          href: `/assets/site/${site.value.slug}.css`,
          tagPriority: 0
        }
      ],
    })

    if (site.value.siteTheme) {
      applyTheme(site.value.siteTheme)
    }

    if (site.value.styleBody) {
      useHead({
        style: [{ innerHTML: site.value.styleBody, tagPriority: 1 }]
      })
    }
  }
})

useHead({
  link: [
    { href: `/css/bz-fonts.min.css`, rel: 'stylesheet', tagPriority: -1 },
    { href: `/css/bootstrap-custom.min.css`, rel: 'stylesheet', tagPriority: -1 },
    { href: `/css/bz-main.min.css`, rel: 'stylesheet', tagPriority: -1 },
  ],
  script: [
    { src: `/js/jquery-3.7.1.min.js`, type: 'text/javascript', tagPosition: 'bodyClose' },
    { src: `/lib-js/jquery.scrollbar.js`, type: 'text/javascript', tagPosition: 'bodyClose' },
    { src: `/js/jquery-migrate-3.5.2.min.js`, type: 'text/javascript', tagPosition: 'bodyClose' },
    { src: `/js/popper.min.js`, type: 'text/javascript', tagPosition: 'bodyClose' },
    { src: `/js/bootstrap.bundle.min.js`, type: 'text/javascript', tagPosition: 'bodyClose' },
  ]
})
</script>

<template>
  <NuxtPage />
</template>