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
    <div class="dropdown is-custom">
        <button class="btn btn-outline-gray dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <span>{{ options?.find(option => option.value == value)?.text }}</span>
        </button>
        <ul class="dropdown-menu is-custom">
        <li v-for="option in options" :key="option.value" @click="value = option.value">
            <a :class="{'dropdown-item': true, 'active': value && option.value === value}">{{ option.text }}</a></li>
        </ul>
        <div class="invalid-feedback">{{ error }}</div>
    </div>
</template>
