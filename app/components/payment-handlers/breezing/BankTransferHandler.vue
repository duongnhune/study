<script lang="ts" setup>
import type { Order, PaymentMethodSetting } from '@breezingin/breezing-shared';
const { $api } = useNuxtApp()
const { t } = useI18n()

const props = defineProps<{
    order: Order;
    paymentMethodSetting: PaymentMethodSetting
}>();

const emit = defineEmits(['error', 'success'])

const qrLink = ref('');
const submitLoading = ref(false);
const Loading = ref(true);

let pollInterval: NodeJS.Timeout | null = null;

async function checkPaymentStatus() {
    if (submitLoading.value) return;

    submitLoading.value = true;
    try {
        const orderDetails = await $api<Order>('/order/' + props.order.id);
        if (orderDetails?.confirmTime) {
            emit('success');
            clearPollInterval();
        }
    } finally {
        submitLoading.value = false;
    }
}

function startPolling() {
    pollInterval = setInterval(checkPaymentStatus, 5000);
}

function clearPollInterval() {
    if (pollInterval) {
        clearInterval(pollInterval);
        pollInterval = null;
    }
}

async function initialize() {
    try {
        const response = await $api<any>('/payment/breezing/bank-transfer', {
            method: 'POST',
            body: {
                orderID: props.order.id,
                paymentMethodSettingID: props.paymentMethodSetting.id,
            },
        });
        qrLink.value = response.qrLink;
        Loading.value = false
        startPolling();
    } catch (error: any) {
        emit('error', { message: t('somethingWentWrong') });
        console.log(error);
    }
}

onBeforeUnmount(() => {
    clearPollInterval()
})

defineExpose({ initialize });

</script>

<template>
    <div class="bz-breezing-bank-transfer-handler">
        <div class="bz-breezing-bank-transfer-handler__qr">
            <img :src="qrLink || 'images/transparent.gif'" width="200" alt="QR Code" />
        </div>
        <p class="bz-breezing-bank-transfer-handler__desc">{{ t('scanQrCodeInstruction') }}</p>
    </div>
</template>

<style lang="scss" scoped>
.bz-breezing-bank-transfer-handler {

    text-align: center;

    &__loading {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    &__qr {
        margin: 20px 0;
        min-height: 200px;
    }

    &__desc {
        margin: 0;
        color: var(--text-color-desc);
    }
}
</style>
