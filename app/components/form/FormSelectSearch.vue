<script setup lang="ts">
import { ref, computed } from 'vue';
import { watch } from 'vue';
import type { PropType } from 'vue';

interface Option {
    value: any,
    text: String
}

const props = defineProps({
    modelValue: [String, Array] as PropType<any>,
    label: String,
    multiple: Boolean,
    options: Array<Option>,
    readonly: Boolean,
    error: String,
    placeholder: String,
    allowNull: Boolean
});

const emit = defineEmits(["update:modelValue"]);

const value = ref(props.modelValue)
const keyword = ref('')

function select(val: any) {
    if (props.multiple) {
        if (!value.value) {
            value.value = [val]
        }
        if (!value.value.includes(val)) {
            value.value.push(val)
        }
    } else {
        value.value = val
    }
}

const filteredOptions = computed(() => {
    const regex = new RegExp(keyword.value, 'i')
    return props.options?.filter(option => regex.test(String(option.value)) || regex.test(String(option.value)))
})

watch(() => props.modelValue, (val) => {
    value.value = val;
})
watch(value, (val) => {
    emit("update:modelValue", val);
})
</script>

<template>
    <div>
        <label v-if="label" class="form-label"><strong>{{ label }}</strong></label>
        <div class="c-smart-select dropdown">
            <div class="c-smart-select__inner" :class="{'form-select': !multiple}" data-bs-toggle="dropdown" aria-expanded="false">
                <template v-if="multiple">
                    <div class="c-smart-select__blank" v-if="!value || !value.length">{{ placeholder }}</div>
                    <div class="c-smart-select__current" v-else>
                        <label v-for="(item, index) in value" :key="index">
                            <span>{{ options?.find(option => option.value === item)?.text }}</span>
                            <i class="icon16-close-circle" @click="value.splice(index, 1)"></i>
                        </label>
                    </div>
                </template>
                <div v-else>
                    <div class="text-gray" v-if="!value">{{ placeholder }}&nbsp;</div>
                    <label v-else class="d-flex justify-content-between">
                        <span>{{ options?.find(option => option.value === value)?.text }}</span>
                        <span v-if="allowNull" role="button" @click="value = undefined"><i
                                class="ml-auto icon16-close-circle"></i></span>
                    </label>
                </div>
            </div>
            <ul class="dropdown-menu is-custom">
                <li class="mb-2">
                    <div class="dropdown-search" v-if="options?.length && options.length > 5">
                        <input v-model="keyword" class="form-control form-control-sm" type="text"
                            :placeholder="placeholder" :disabled="readonly" />
                    </div>
                </li>
                <li class="dropdown-max">
                    <a v-for="option in filteredOptions" :key="option.value" class="dropdown-item" role="button"
                        @click="select(option.value)">
                        {{ option.text }}
                    </a>
                    <p v-if="options?.length && !filteredOptions?.length" class="text-center pt-3">
                        No available options
                        <!-- {{ t('noAvailableOptions') }} -->
                    </p>
                </li>
            </ul>
        </div>
        <div v-if="error" class="invalid-feedback d-block">{{ error }}</div>
    </div>
</template>
