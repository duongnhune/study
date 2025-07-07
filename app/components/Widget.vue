<script lang="ts" setup>
import { onMounted } from 'vue';
import { WidgetDefaultType } from '@breezingin/breezing-shared';

const props = defineProps({
  scopedID: { type: String, required: true }
});
const siteStore = useSiteStore();
const { widgetTypeDictionary } = siteStore;

const widget = computed(() => siteStore.widgets.find(w => w.scopedID === props.scopedID)!); 
const widgetType = computed(() => widgetTypeDictionary[widget.value?.type || '']);

const classes = ['bz-block'];

const binding = computed(() => {
  const bindingObj: Record<string, string> = {
    scopedID: props.scopedID,
  };

  if (widget.value) {
    // add padding classes
    if (widget.value.padding) {
      if (widget.value.padding.top) {
        classes.push(`is-padding-top-${widget.value.padding.top}`);
      }
      if (widget.value.padding.bottom) {
        classes.push(`is-padding-bottom-${widget.value.padding.bottom}`);
      }
      if (widget.value.padding.left) {
        classes.push(`is-padding-left-${widget.value.padding.left}`);
      }
      if (widget.value.padding.right) {
        classes.push(`is-padding-right-${widget.value.padding.right}`);
      }
    }

    // add margin classes
    if (widget.value.margin) {
      if (widget.value.margin.top) {
        classes.push(`is-margin-top-${widget.value.margin.top}`);
      }
      if (widget.value.margin.bottom) {
        classes.push(`is-margin-bottom-${widget.value.margin.bottom}`);
      }
      if (widget.value.margin.left) {
        classes.push(`is-margin-left-${widget.value.margin.left}`);
      }
      if (widget.value.margin.right) {
        classes.push(`is-margin-right-${widget.value.margin.right}`);
      }
    }

    if (widget.value.domID) {
      bindingObj.id = widget.value.domID;
    }
    if (widget.value.domClass) {
      classes.push(widget.value.domClass);
    }

    if (widget.value.background) {
      bindingObj.style = `background: ${widget.value.background};`;
    }
  }

  bindingObj.class = classes.join(' ');
  bindingObj['data-w-' + props.scopedID] = '';
  bindingObj['data-w-widget-type'] = widgetType.value?.category || '';
  bindingObj['data-w-scoped-id'] = props.scopedID;

  return bindingObj;
});

const isDefault = Object.values(WidgetDefaultType).includes(widget.value?.type as WidgetDefaultType);

onMounted(() => {
  if (!widget) {
    console.error(`Widget with id ${props.scopedID} not found`);
  }
});

</script>
<template>
  <template v-if="widget">
      <component v-if="isDefault" :is="`${widget.type}Widget`" v-bind="binding" />
    <dynamic-widget v-else v-bind="{ ...binding, scopedID: props.scopedID }" />
  </template>
</template>