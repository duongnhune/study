<script lang="ts" setup>
import type { Order, PaymentMethodSetting } from '@breezingin/breezing-shared';
import { loadStripe } from '@stripe/stripe-js';
const { $api } = useNuxtApp();

const props = defineProps<{
    order: Order;
    paymentMethodSetting: PaymentMethodSetting
}>();

const emit = defineEmits(['error', 'success']);

const submitLoading = ref(false);
const errorMsg = ref('');
let stripe: any;
let elements: any;

async function initializeStripe() {
    try {
        stripe = await loadStripe(useRuntimeConfig().public.stripePublishableKey);
        
        elements = stripe?.elements({
            mode: 'payment',
            amount: props.order.totalPrice * 100, // Convert to cents
            currency: props.order.currency?.toLowerCase() || 'usd',
            paymentMethodCreation: 'manual',
            appearance: {
                theme: 'stripe',
                rules: {
                    '.Label': {
                        fontWeight: '600',
                        fontSize: '14px',
                        marginBottom: '8px',
                    },
                    '.Input': {
                        fontSize: '15px',
                        padding: '0.75rem 0.75rem',
                        borderRadius: '6px',
                        MozBorderRadius: '6px',
                        WebkitBorderRadius: '6px',
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                    },
                    '.Error': {
                        fontSize: '.875em',
                        margin: '4px'
                    },
                },
                variables: {
                    colorPrimary: '#FE5B00',
                    colorBackground: '#fff',
                    colorText: '#1F2937',
                    colorDanger: '#dc3545',
                    fontFamily: 'Inter, sans-serif',
                    fontSizeBase: '16px',
                    spacingUnit: '4px',
                },
            },
        });

        const paymentElementOptions = { layout: 'accordion' };
        const paymentElement = elements.create('payment', paymentElementOptions);
        paymentElement.mount('#stripe-payment-element');
    } catch (error: any) {
        console.log(error);
        emit('error', error.message || 'Failed to initialize payment');
    }
}

async function handlePayment() {
    if (submitLoading.value || !stripe || !elements) return;
    
    submitLoading.value = true;
    errorMsg.value = '';
    
    try {
        // Submit the form
        const submitResult = await elements.submit();
        if (submitResult.error) {
            // not throw error, just return
            return;
        }

        // Create confirmation token
        const { error, confirmationToken } = await stripe.createConfirmationToken({
            elements,
            params: {}
        });

        if (error) {
            throw new Error(error.message);
        }

        // Process the payment
        const response = await $api('/payment/stripe', {
            method: 'POST',
            body: {
                confirmationTokenID: confirmationToken.id,
                orderID: props.order.id,
                paymentMethodSettingID: props.paymentMethodSetting.id,
                returnURL: window.location.href,
            },
        });

        await handleServerResponse(response);
    } catch (error: any) {
        errorMsg.value = error.message || 'Payment failed';
        emit('error', error);
    } finally {
        submitLoading.value = false;
    }
}

async function handleServerResponse(response: any) {
    if (response.error) {
        throw new Error(response.error);
    } else if (response.status === "requires_action") {
        const { error } = await stripe.handleNextAction({ clientSecret: response.clientSecret });
        if (error) {
            throw new Error(error.message);
        } else {
            emit('success', props.order);
        }
    } else {
        emit('success', props.order);
    }
}

// Expose method for parent components
defineExpose({
    handlePayment
});

onMounted(() => {
    initializeStripe();
});
</script>

<template>
    <div>
        <p v-if="errorMsg" class="text-danger">{{ errorMsg }}</p>  
        <div id="stripe-payment-element"></div> 
        <div class="mt-4">
            <button 
                @click="handlePayment" 
                :disabled="submitLoading"
                class="btn btn-primary btn-lg w-100"
            >
                <span v-if="submitLoading">Processing...</span>
                <span v-else>Pay Now</span>
            </button>
        </div>
    </div>
</template>