<script setup lang="ts">
import { ref } from 'vue';
import { watch } from 'vue';

interface Option {
    value: any,
    text: String
}

const props = defineProps({
    modelValue: String,
    label: String,
    options: Array<Option>,
    readonly: Boolean,
    error: String,
});

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
        <select v-model="value" :readonly="readonly" class="form-select"
            :class="{ 'is-invalid': error }">
            <option v-for="option in options" :key="option.value" :value="option.value">
                {{ option.text }}
            </option>
        </select>
        <div class="invalid-feedback">{{ error }}</div>
    </div>
</template>
