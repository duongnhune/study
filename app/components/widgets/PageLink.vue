<script setup lang="ts">
import { WidgetDefaultType } from '@breezingin/breezing-shared';
import { ref } from 'vue';

interface Props {
    to: string;
    prefetch?: boolean;
    replace?: boolean;
    external?: boolean;
    target?: string;
    rel?: string;
    noRel?: boolean;
    activeClass?: string;
    exactActiveClass?: string;
    ariaCurrentValue?: string;
}

const props = withDefaults(defineProps<Props>(), {
    prefetch: true
});

const router = useRouter();
const siteStore = useSiteStore();
const isPreloaded = ref(false);

function getPageID(path: string): string | null {
    try {
        const resolved = router.resolve(path);
        return resolved.meta?.pageID as string || null;
    } catch (error) {
        return null;
    }
}

function preloadPage() {
    if (!props.prefetch || isPreloaded.value || props.external) return;

    const pageID = getPageID(props.to);
    if (!pageID || !siteStore.widgets) return;

    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => loadWidgets(pageID));
    } else {
        setTimeout(() => loadWidgets(pageID), 2500);
    }
}

async function loadWidgets(pageID: string) {
    const page = siteStore.pages.find(p => p.id === pageID);
    if (!page) return;

    const pageWidgets = siteStore.widgets.filter(widget =>
        page.headerScopedID === widget.scopedID ||
        page.footerScopedID === widget.scopedID ||
        page.widgetScopedIDs.includes(widget.scopedID)
    );

    const promises = []
    try {
        for (const widget of pageWidgets) {
            const isDefault = Object.values(WidgetDefaultType).includes(widget?.type as WidgetDefaultType);
            if (!isDefault) {
                promises.push(loadModule(`~/widgets/${widget.type}.vue`));
            }
        }
        await Promise.all(promises);
        if (import.meta.dev) {
            console.log(`Preloaded ${pageWidgets.map(w => w.type).join(', ')}`);
        }
    } catch (error) {
        // Silent error handling
    }

    isPreloaded.value = true;
}

onMounted(() => {
    preloadPage();
});
</script>

<template>
    <NuxtLink :to="to" :replace="replace" :external="external" :target="target" :rel="rel" :no-rel="noRel"
        :active-class="activeClass" :exact-active-class="exactActiveClass" :aria-current-value="ariaCurrentValue">
        <slot />
    </NuxtLink>
</template>