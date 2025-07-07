<script lang="ts" setup>
import { useSiteStore } from '~/stores/site';
import Widget from '../Widget.vue';
const siteStore = useSiteStore();

const props = defineProps({ scopedID: { type: String, required: true } });
const widget = computed(() => siteStore.widgets.find(w => w.scopedID === props.scopedID)!); 

</script>

<template>
    <div class="bz-col"
        :data-col="widget.props.width.default"
        :data-col-sm="widget.props.width.sm"
        :data-col-md="widget.props.width.md"
        :data-col-lg="widget.props.width.lg"
        :data-col-xl="widget.props.width.xl"
    >
        <template v-for="widgetID in widget.props.widgetScopedIDs">
            <Widget :scoped-i-d="widgetID" />
        </template>
    </div>
</template>
