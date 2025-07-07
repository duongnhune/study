<script lang="ts" setup>
import type { Order, PaymentMethodSetting } from '@breezingin/breezing-shared';
import { loadStripe } from '@stripe/stripe-js';

const { $api } = useNuxtApp();
const { t } = useI18n();
const stripeElementID = "breezing-card-element";

const props = defineProps<{
    order: Order;
    paymentMethodSetting: PaymentMethodSetting
}>();

const emit = defineEmits(['error', 'success']);

const submitLoading = ref(false);
let stripe: any;
let elements: any;

function extractBootstrapStyles() {

    const createElement = (tag: string, className: string) => {
        const el = document.createElement(tag);
        el.className = className;
        el.style.cssText = 'position:absolute;visibility:hidden;';
        document.body.appendChild(el);
        return el;
    };

    const elements = {
        input: createElement('input', 'form-control'),
        invalidInput: createElement('input', 'form-control is-invalid'),
        label: createElement('label', 'form-label'),
        error: createElement('div', 'invalid-feedback d-block'),
        variables: createElement('div', ''),
    };

    elements.variables.style.cssText += 'color:var(--bs-primary);background-color:var(--bs-danger);';

    const computedStyles = {
        input: window.getComputedStyle(elements.input),
        invalidInput: window.getComputedStyle(elements.invalidInput),
        label: window.getComputedStyle(elements.label),
        error: window.getComputedStyle(elements.error),
        variables: window.getComputedStyle(elements.variables),
    };

    elements.input.focus();
    const focusStyles = window.getComputedStyle(elements.input);
    elements.invalidInput.focus();
    const invalidFocusStyles = window.getComputedStyle(elements.invalidInput);

    const styles = {
        bsPrimary: computedStyles.variables.color,
        bsDanger: computedStyles.variables.backgroundColor,
        input: {
            fontSize: computedStyles.input.fontSize,
            fontFamily: computedStyles.input.fontFamily,
            padding: computedStyles.input.padding,
            borderRadius: computedStyles.input.borderRadius,
            borderWidth: computedStyles.input.borderWidth,
            borderColor: computedStyles.input.borderColor,
            backgroundColor: computedStyles.input.backgroundColor,
            color: computedStyles.input.color,
            lineHeight: computedStyles.input.lineHeight,
        },
        focus: {
            borderColor: focusStyles.borderColor,
            boxShadow: focusStyles.boxShadow,
        },
        invalid: {
            borderColor: computedStyles.invalidInput.borderColor,
        },
        invalidFocus: {
            borderColor: invalidFocusStyles.borderColor,
            boxShadow: invalidFocusStyles.boxShadow,
        },
        label: {
            color: computedStyles.label.color,
            fontSize: computedStyles.label.fontSize,
            fontWeight: computedStyles.label.fontWeight,
            fontFamily: computedStyles.label.fontFamily,
            marginBottom: computedStyles.label.marginBottom,
        },
        error: {
            color: computedStyles.error.color,
            fontSize: computedStyles.error.fontSize,
            marginTop: computedStyles.error.marginTop,
            fontWeight: computedStyles.error.fontWeight,
            lineHeight: computedStyles.error.lineHeight,
        },
    };

    // Cleanup
    Object.values(elements).forEach(el => document.body.removeChild(el));

    return styles;
}

async function initialize() {
    try {
        stripe = await loadStripe(useRuntimeConfig().public.stripePublishableKey);
        if (!stripe) throw new Error('Failed to load Stripe');

        const styles = extractBootstrapStyles();
        const { order } = props;
        const amount = Math.round((order.isConverted ? order.convertedTotalPrice : order.totalPrice) * 100);
        const currency = (order.isConverted ? order.convertedCurrency : order.currency).toLowerCase();

        elements = stripe.elements({
            mode: 'payment',
            amount,
            currency,
            paymentMethodCreation: 'manual',
            paymentMethodTypes: ['card'],
            appearance: {
                theme: 'stripe',
                variables: {
                    fontFamily: styles.input.fontFamily,
                    fontSizeBase: styles.input.fontSize,
                    borderRadius: styles.input.borderRadius,
                    colorPrimary: styles.bsPrimary,
                    colorBackground: styles.input.backgroundColor,
                    colorText: styles.input.color,
                    colorDanger: styles.bsDanger,
                },
                rules: {
                    '.Tab': {
                        backgroundColor: styles.input.backgroundColor,
                        border: `${styles.input.borderWidth} solid ${styles.input.borderColor}`,
                        borderRadius: styles.input.borderRadius,
                        padding: '12px 16px',
                        fontSize: styles.input.fontSize,
                        fontFamily: styles.input.fontFamily,
                        color: styles.input.color,
                        transition: 'all 0.15s ease-in-out',
                    },
                    '.Tab--selected': {
                        backgroundColor: styles.input.backgroundColor,
                        borderColor: styles.bsPrimary,
                        color: styles.bsPrimary,
                        fontWeight: '500',
                    },
                    '.Label': {
                        color: styles.label.color,
                        fontSize: styles.label.fontSize,
                        fontWeight: styles.label.fontWeight,
                        fontFamily: styles.label.fontFamily,
                        marginBottom: styles.label.marginBottom,
                    },
                    '.Input': {
                        padding: styles.input.padding,
                        border: `${styles.input.borderWidth} solid ${styles.input.borderColor}`,
                        borderRadius: styles.input.borderRadius,
                        backgroundColor: styles.input.backgroundColor,
                        fontSize: styles.input.fontSize,
                        fontFamily: styles.input.fontFamily,
                        color: styles.input.color,
                        lineHeight: styles.input.lineHeight,
                        marginBottom: '6px',
                    },
                    '.Input:focus': {
                        borderColor: styles.focus.borderColor,
                        boxShadow: styles.focus.boxShadow,
                    },
                    '.Input--invalid': {
                        borderColor: styles.invalid.borderColor,
                    },
                    '.Input--invalid:focus': {
                        borderColor: styles.invalidFocus.borderColor,
                        boxShadow: styles.invalidFocus.boxShadow,
                    },
                    '.Error': {
                        color: styles.error.color,
                        fontSize: styles.error.fontSize,
                        marginTop: styles.error.marginTop,
                        fontWeight: styles.error.fontWeight,
                        lineHeight: styles.error.lineHeight,
                    },
                },
            },
        });

        const paymentElement = elements.create('payment', { layout: 'tabs' });
        await paymentElement.mount(`#${stripeElementID}`);

    } catch (error: any) {
        emit('error', error);
    }
}

async function handlePayment() {
    if (submitLoading.value || !stripe || !elements) return;

    submitLoading.value = true;

    try {
        const { error: submitError } = await elements.submit();
        if (submitError) {
            // not throw error, just return because stripe will show error message
            return;
        };

        const { error, confirmationToken } = await stripe.createConfirmationToken({ elements });
        if (error) throw new Error(error.message);

        const response = await $api('/payment/breezing/card', {
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
        emit('error', error);
        console.log(error);
    } finally {
        submitLoading.value = false;
    }
}

async function handleServerResponse(response: any) {
    if (response.error) {
        throw new Error(response.error);
    } else if (response.status === 'requires_action') {
        const { error } = await stripe.handleNextAction({ clientSecret: response.clientSecret });
        if (error) throw new Error(error.message);
        emit('success');
    } else {
        emit('success');
    }
}

onBeforeUnmount(() => {
    console.log('CardHandler destroyed')
})

defineExpose({ initialize });
</script>

<template>
    <div class="bz-breezing-card-handler">
        <div :id="stripeElementID" class="bz-breezing-card-handler__stripe-element mb-3"></div>

        <button @click="handlePayment" :disabled="submitLoading"
            class="bz-breezing-card-handler__button btn btn-primary btn-lg w-100">
            <template v-if="submitLoading">
                <span class="spinner-border spinner-border-sm"></span>
                {{ t('processing') }}
            </template>
            <template v-else>
                {{ t('payNow') }}
            </template>
        </button>
    </div>
</template>

<style scoped>
.bz-breezing-card-handler__stripe-element {
    min-height: 250px;
}
</style>