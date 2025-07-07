<template>
  <div>
    <label class="form-label" v-if="label">{{ label }}</label>
    <div :class="`form-group border  ${ error ? 'is-invalid' : '' }`">
      <div
        v-for="option in options"
        :key="option.value"
        class="form-check"
      >
        <input
          class="form-check-input"
          :type="type"
          :name="id"
          :id="id + option.value"
          :value="option.value"
          :readonly="readonly"
          :checked="type === 'radio' ? value === option.value : value.includes(option.value)"
          @change="(e) => handleInput(e, option.value)"
        >
        <label class="form-check-label" :for="id + option.value">{{ option.text }}</label>
      </div>
    </div>
    <div class="invalid-feedback">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface Option {
  value: any,
  text: string
}

const props = defineProps({
  modelValue: {
    type: [String, Array],
    default: () => []
  },
  label: String,
  options: {
    type: Array as () => Option[],
    required: true
  },
  type: {
    type: String as () => 'radio' | 'checkbox',
    required: true
  },
  singleSelectMode: {
    type: Boolean,
    default: true
  },
  error: String,
  readonly: Boolean,
  inline: Boolean
});

const emit = defineEmits(['update:modelValue']);
const id = 'input-' + (Math.random() + 1).toString(36).substring(2);

const value = ref(props.modelValue);

watch(() => props.modelValue, (val) => {
  value.value = val;
});

watch(value, (val) => {
  emit('update:modelValue', val);
});

function handleInput(event: Event, optionValue: any) {
  const target = event.target as HTMLInputElement;
  if (props.type === 'checkbox') {
    if (props.singleSelectMode) {
      value.value = target.checked ? [optionValue] : [];
    } else {
      if (target.checked) {
        value.value = [...(value.value as any[]), optionValue];
      } else {
        value.value = (value.value as any[]).filter((item: any) => item !== optionValue);
      }
    }
  } else if (props.type === 'radio') {
    value.value = optionValue;
  }
}
</script>
<style scoped>
.form-group {
  border-radius: 8px;
  padding: 8px;
}
</style>
