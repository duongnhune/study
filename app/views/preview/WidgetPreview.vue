<script lang="ts" setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { type WidgetProp, type WidgetType, type SiteTheme } from '@breezingin/breezing-shared';

const widgetType = ref<WidgetType | null>(null);
const widgetProps = ref<WidgetProp | null>(null);
const BuiltComponent = ref<any>(null);
const componentEl = ref<HTMLElement | null>(null);
const observerTimeout = ref<any>(null);

useHead({
  link: [
    { href: `/css/bz-fonts.min.css`, rel: 'stylesheet', tagPriority: -1 },
    { href: `/css/bootstrap-custom.min.css`, rel: 'stylesheet', tagPriority: -1 },
    { href: `/css/bz-main.min.css`, rel: 'stylesheet', tagPriority: -1 },
  ],
  script: [
    { src: `/js/jquery-3.7.1.min.js`, type: 'text/javascript', tagPosition: 'bodyClose' },
    { src: `/js/jquery-migrate-3.5.2.min.js`, type: 'text/javascript', tagPosition: 'bodyClose' },
    { src: `/js/popper.min.js`, type: 'text/javascript', tagPosition: 'bodyClose' },
    { src: `/js/bootstrap.bundle.min.js`, type: 'text/javascript', tagPosition: 'bodyClose' },
  ]
});

const loadComponent = async (key: string) => {
  try {
    BuiltComponent.value = markRaw(await loadModule(`~/widgets/${key}.vue`));
  } catch (error) {
    console.error(`Failed to load widget: ${key}`, error);
    BuiltComponent.value = null;
  }
};

const sendHeightToParent = () => {
  if (!componentEl.value) return;

  const height = componentEl.value.offsetHeight;
  window.parent.postMessage(JSON.stringify({
    type: 'widget-height',
    data: {
      naturalHeight: height,
      key: widgetType.value?.key
    }
  }), '*');
};

const setupHeightObserver = () => {
  if (!componentEl.value) return;

  sendHeightToParent();

  const resizeObserver = new ResizeObserver(() => {
    clearTimeout(observerTimeout.value);
    observerTimeout.value = setTimeout(() => {
      sendHeightToParent();
    }, 100);
  });

  resizeObserver.observe(componentEl.value);

  window.addEventListener('resize', () => {
    clearTimeout(observerTimeout.value);
    observerTimeout.value = setTimeout(() => {
      sendHeightToParent();
    }, 100);
  });

  return resizeObserver;
};

watch(() => BuiltComponent.value, async (newVal) => {
  if (newVal) {
    await nextTick();
    setupHeightObserver();
  }
});

onMounted(async () => {
  window.addEventListener('message', async (event) => {
    try {
      const message = JSON.parse(event.data);
      if (message.type === 'widget-data') {
        widgetType.value = message.data.widgetType;
        widgetProps.value = message.data.widgetProps || {};

        if (message.data.theme) {
          applyTheme(message.data.theme);
        }

        if (widgetType.value?.key) {
          await loadComponent(widgetType.value.key);
        }
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  window.parent.postMessage(JSON.stringify({
    type: 'widget-preview-ready'
  }), '*');

  setupHeightObserver();

  document.addEventListener('load', (event) => {
    if (event.target instanceof HTMLImageElement) {
      sendHeightToParent();
    }
  }, true);
});
</script>

<template>
  <div class="widget-container">
    <div ref="componentEl">
      <BuiltComponent v-bind="widgetProps" />
    </div>
  </div>
</template>

<style scoped>
.widget-container {
  display: block;
  position: relative;
  width: 100%;
  min-height: 200px;
}
</style>
