import { defineNuxtPlugin } from '#app';
import { NuxtLink, PageLink } from '#components';

export default defineNuxtPlugin((app) => {
  // components
  app.vueApp.component('NuxtLink', NuxtLink);
  app.vueApp.component('PageLink', PageLink);

  // directives
  app.vueApp.directive('mounted', {
    mounted(el, binding) {
      if (import.meta.client) {
        const value = binding.value
        if (typeof value === 'function') {
        } else if (window[value]) {
          if (typeof window[value] === 'function') {
            (window[value] as Function)(el)
          }
        }
      }
    },
  })
});