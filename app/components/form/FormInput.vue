<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
    modelValue: [String, Number],
    label: String,
    type: String,
    placeholder: String,
    readonly: Boolean,
    disabled: Boolean,
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
        <label class="form-label" v-if="label">{{ label }}</label>
        <input v-model.trim="value" :type="type" :readonly="readonly" :disabled="disabled" class="form-control"
            :placeholder="placeholder" :class="error ? 'is-invalid' : ''">
        <div class="invalid-feedback">{{ error }}</div>
    </div>
</template>