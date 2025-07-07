<script lang="ts" setup>
import { useSiteStore } from '~/stores/site';
import Widget from '../Widget.vue';
const siteStore = useSiteStore();

const props = defineProps({ scopedID: { type: String, required: true } });
const widget = computed(() => siteStore.widgets.find(w => w.scopedID === props.scopedID)!); 

</script>

<template>
    <div class="bz-header">
        <template v-for="widgetID in widget.props.widgetScopedIDs">
            <Widget :scoped-i-d="widgetID" />
        </template>
    </div>
</template>
