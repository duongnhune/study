<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
    modelValue: String,
    label: String,
    placeholder: String,
    readonly: Boolean,
    error: String,
    row: { 
        type: Number, 
        default: 3 
    },
})

const emit = defineEmits(["update:modelValue"]);

const value = ref(props.modelValue);

watch(() => props.modelValue, (val) => {
    value.value = val;
})
watch(value, (val) => {
    emit("update:modelValue", val)
})
</script>

<template>
    <div class="form-group">
        <label v-if="label">{{ label }}</label>
        <textarea v-model.trim="value" :rows="row" :readonly="readonly" class="form-control"
            :placeholder="placeholder" :class="error ? 'is-invalid' : ''">
        </textarea>
        <div class="invalid-feedback">{{ error }}</div>
    </div>
</template>