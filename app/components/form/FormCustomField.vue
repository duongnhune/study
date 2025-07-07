<script lang="ts" setup>
import { computed } from 'vue';
import { type FormField } from '@breezingin/breezing-shared';
import { first, isArray } from 'lodash';

const props = defineProps({
    field: {
        type: Object as () => FormField,
        required: true
    },
    placeholder: {
        type: String,
        default: ''
    },
    modelValue: {
        type: null as any,
        default: null
    },
    error: {
        type: String,
        default: ''
    },
});


const emit = defineEmits(['update:modelValue']);

const customFieldOptions = computed(() => {
    if (props.field.options?.length) {
        return props.field.options.map((option) => {
            return { value: option, text: option };
        });
    }
    return [];
});

const updateValue = (value: any) => {
    emit('update:modelValue', isArray(value) ? value : [value]);
};

const isSingleValue = computed(() => {
    return ['text', 'textarea', 'number', 'radio', 'image', 'phone'].includes(props.field.type);
});

const currentValue = computed({
    get() {
        if (isSingleValue.value) {
            return Array.isArray(props.modelValue) ? props.modelValue[0] : props.modelValue;
        } else if (!isArray(props.modelValue)) {
            return []
        }
        return props.modelValue as any;
    },
    set(value) {
        updateValue(value);
    }
});
</script>

<template>
    <div> <!-- Text input -->
        <template v-if="field.type === 'phone'">
            <form-input v-model="currentValue" :label="field.label" :error="error" :placeholder="placeholder" />
        </template>

        <template v-if="field.type === 'text'">
            <form-input v-model="currentValue" :label="field.label" :error="error" :placeholder="placeholder" />
        </template>

        <!-- Textarea -->
        <template v-else-if="field.type === 'textarea'">
            <form-textarea v-model="currentValue" :label="field.label" :error="error" :placeholder="placeholder" />
        </template>

        <!-- Number input -->
        <template v-else-if="field.type === 'number'">
            <form-input v-model="currentValue" :label="field.label" :error="error" :placeholder="placeholder" />
        </template>

        <!-- Single select checkbox -->
        <template v-else-if="field.type === 'one'">
            <form-radio-group-border v-model="currentValue" :options="customFieldOptions" type="checkbox"
                :singleSelectMode="true" :label="field.label" :error="error" :placeholder="placeholder" />
        </template>

        <!-- Multiple select checkbox -->
        <template v-else-if="field.type === 'multiple'">
            <form-radio-group-border v-model="currentValue" :options="customFieldOptions" type="checkbox"
                :singleSelectMode="false" :label="field.label" :error="error" :placeholder="placeholder" />
        </template>

        <!-- Radio buttons -->
        <template v-else-if="field.type === 'radio'">
            <form-radio-group-border v-model="currentValue" :options="customFieldOptions" type="radio"
                :singleSelectMode="true" :label="field.label" :error="error" :placeholder="placeholder" />
        </template>
    </div>
</template>