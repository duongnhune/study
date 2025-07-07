<script lang="ts" setup>
const siteStore = useSiteStore();

const props = defineProps({ scopedID: { type: String, required: true } });
const widget = computed(() => siteStore.widgets.find(w => w.scopedID === props.scopedID)!); 

</script>

<template>
  <div class="bz-block bz-block-html-content">
    <div class="bz-html-content" v-html="widget.props.content"></div>
  </div>
</template>
