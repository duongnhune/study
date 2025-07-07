<script lang="ts" setup>
const siteStore = useSiteStore();

const props = defineProps({ scopedID: { type: String, required: true } });
const widget = computed(() => siteStore.widgets.find(w => w.scopedID === props.scopedID)!); 

const { $logger } = useNuxtApp();

const BuiltComponent = widget && widget.value.type ? defineComponent(await loadModule(`~/widgets/${widget.value.type}.vue`)) : null;

onMounted(() => {
    if (!widget) {
        $logger.error(`Widget with ID ${props.scopedID} not found in dictionary.`);
    }
})

</script>

<template>
    <template v-if="BuiltComponent && widget">
        <BuiltComponent v-bind="{ ...widget.props }" />
    </template>
</template>
