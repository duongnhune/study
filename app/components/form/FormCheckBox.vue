<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
    modelValue: Boolean,
    label: String,
    type: String,
    readonly: Boolean,
    error: String,
})

const emit = defineEmits(["update:modelValue"]);

const value = ref(props.modelValue);

watch(() => props.modelValue, (val) => {
    value.value = val;
})
watch(value, (val) => {
    emit("update:modelValue", val);
})
</script>

<template>
    <div class="form-group">
        <input v-model.trim="value" type="checkbox" :readonly="readonly" :class="error ? 'is-invalid' : ''">
        &nbsp;
        <label v-if="label">{{ label }}</label>
        <div class="invalid-feedback">{{ error }}</div>
    </div>
</template>
