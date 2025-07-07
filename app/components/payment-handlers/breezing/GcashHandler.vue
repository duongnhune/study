<script lang="ts" setup>
import type { Order, PaymentMethodSetting } from '@breezingin/breezing-shared';

const { $api } = useNuxtApp();
const { t } = useI18n();

const props = defineProps<{
    order: Order;
    paymentMethodSetting: PaymentMethodSetting
}>();

const emit = defineEmits(['error', 'success']);

const submitLoading = ref(false);
const formData = ref({
    name: '',
    email: '',
    mobileNo: ''
});

const formErrors = ref<{
    name?: string;
    email?: string;
    mobileNo?: string;
}>({});

function validateForm() {
    const errors: typeof formErrors.value = {};
    
    // Validate name
    if (!formData.value.name.trim()) {
        errors.name = t('nameIsRequired');
    } else if (!/^(?!\s*$)[-a-zA-Z' ''.']{1,}$/.test(formData.value.name)) {
        errors.name = t('invalidName');
    }
    
    // Validate email
    if (!formData.value.email.trim()) {
        errors.email = t('required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
        errors.email = t('invalidEmail');
    }
    
    // Validate mobile number (optional)
    if (formData.value.mobileNo && !/^[0-9]+$/.test(formData.value.mobileNo)) {
        errors.mobileNo = t('invalidMobileNumber');
    }
    
    formErrors.value = errors;
    return Object.keys(errors).length === 0;
}

async function handlePayment() {
    if (submitLoading.value) return;

    if (!validateForm()) {
        return;
    }

    submitLoading.value = true;
    try {
        const currentUrl = window.location.origin + window.location.pathname + window.location.search;
        
        const response = await $api('/payment/breezing/gcash/init', {
            method: 'POST',
            body: {
                orderID: props.order.id,
                paymentMethodSettingID: props.paymentMethodSetting.id,
                name: formData.value.name.trim(),
                email: formData.value.email.trim(),
                mobileNo: formData.value.mobileNo.trim() || undefined,
                frontendReturnURL: currentUrl,
            },
        });

        handleServerResponse(response);
    } catch (error: any) {
        console.error('Payment initialization failed:', error);
        emit('error', error);
    } finally {
        submitLoading.value = false;
    }
}

function handleServerResponse(response: any) {
    if (response.error) {
        throw new Error(response.error);
    }

    if (response.respCode === '0000' || response.respCode === '1001') {
        if (response.redirectUrl) {
            storePaymentData(response.orderCode);
            window.location.href = response.redirectUrl;
        } else {
            throw new Error(response.respDesc || t('paymentInitializationFailed'));
        }
    } else {
        throw new Error(response.respDesc || t('paymentInitializationFailed'));
    }
}

function storePaymentData(orderCode: string) {
    const paymentData = {
        orderId: props.order.id,
        orderCode: orderCode,
        timestamp: Date.now()
    };
    sessionStorage.setItem('gcash_payment_order', JSON.stringify(paymentData));
}

function checkPaymentResult() {
    const urlParams = new URLSearchParams(window.location.search);
    const respCode = urlParams.get('respCode');
    const invoiceNo = urlParams.get('invoiceNo');

    if (!respCode || !invoiceNo) return;

    const storedPayment = sessionStorage.getItem('gcash_payment_order');
    if (!storedPayment) return;

    try {
        const paymentData = JSON.parse(storedPayment);
        if (paymentData.orderCode !== invoiceNo) return;

        // Clear stored data
        sessionStorage.removeItem('gcash_payment_order');

        // Process payment result
        if (respCode === '0000' || respCode === '2000') {
            emit('success', props.order);
        } else {
            const respDesc = urlParams.get('respDesc') || 'Payment failed';
            emit('error', new Error(respDesc));
        }
    } catch (error) {
        console.error('Error parsing stored payment data:', error);
    } finally {
        // Clean up URL parameters
        const cleanUrl = window.location.href.split('?')[0];
        window.history.replaceState({}, document.title, cleanUrl);
    }
}

defineExpose({
    handlePayment
});

onMounted(() => {
    checkPaymentResult();
});
</script>

<template>
    <div class="gcash-payment-handler">
        <form @submit.prevent="handlePayment" class="gcash-form">
            <!-- Name Field -->
            <div class="mb-3">
                <form-input 
                    :label="t('fullName')" 
                    v-model="formData.name" 
                    :errors="formErrors.name"
                    :disabled="submitLoading" 
                    :placeholder="t('enterYourName')" 
                    required 
                />
            </div>

            <!-- Email Field -->
            <div class="mb-3">
                <form-input 
                    :label="t('email')" 
                    v-model="formData.email" 
                    :errors="formErrors.email"
                    :disabled="submitLoading" 
                    :placeholder="t('enterYourEmail')" 
                    type="email" 
                    required 
                />
            </div>

            <!-- Mobile Number Field -->
            <div class="mb-4">
                <form-input 
                    :label="t('mobileNumber')" 
                    v-model="formData.mobileNo" 
                    :errors="formErrors.mobileNo"
                    :disabled="submitLoading" 
                    :placeholder="t('enterYourMobileNumber')" 
                    type="tel" 
                />
            </div>

            <!-- Submit Button -->
            <button 
                type="submit" 
                :disabled="submitLoading" 
                class="btn btn-primary w-100 rounded-pill"
            >
                <span v-if="submitLoading">
                    {{ t('processing') }}
                </span>
                <span v-else>
                    {{ t('payNow') }}
                </span>
            </button>
        </form>
    </div>
</template>