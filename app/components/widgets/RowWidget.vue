<script lang="ts" setup>
import Widget from '../Widget.vue';

const siteStore = useSiteStore();

const props = defineProps({ scopedID: { type: String, required: true } });
const widget = computed(() => siteStore.widgets.find(w => w.scopedID === props.scopedID)!); 

const binding = {} as Record<string, string>;
if (widget.value.props) {
    if (widget.value.props.gutter) {
        if (widget.value.props.gutter.default) {
            binding['data-gutter'] = widget.value.props.gutter.default
        }
        if (widget.value.props.gutter.sm) {
            binding['data-gutter-sm'] = widget.value.   props.gutter.sm
        }
        if (widget.value.props.gutter.md) {
            binding['data-gutter-md'] = widget.value.props.gutter.md
        }
        if (widget.value.props.gutter.lg) {
            binding['data-gutter-lg'] = widget.value.props.gutter.lg
        }
    }
}
</script>

<template>
    <div class="bz-row"
        v-bind="binding"
    >
        <template v-for="widgetID in widget.props.widgetScopedIDs">
            <Widget :scoped-i-d="widgetID" />
        </template>
    </div>
</template>
