<script setup lang="ts">
import { ref, watch } from 'vue'

interface Option {
    value: any,
    text: String,
    icon?: String
}

const props = defineProps({
    modelValue: String,
    label: String,
    options: Array<Option>,
    readonly: Boolean,
    inline: Boolean,
    error: String,
});

const emit = defineEmits(["update:modelValue"]);
const id = 'input-' + (Math.random() + 1).toString(36).substring(2)

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
        <div v-for="option in options" :key="option.value" :class="{ 'form-check': true, 'form-check-inline': inline , 'is-invalid': error}">
            <label class="form-check-label" :for="option.value">
            <input class="form-check-input" type="radio" :name="id" :id="option.value" :value="option.value" v-model="value">
                <span v-if="option.icon" class="material-symbols-outlined">{{ option.icon }}</span>
                {{ option.text }}
            </label>
        </div>
        <div class="invalid-feedback">{{ error }}</div>
    </div>
</template>