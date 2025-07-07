<script setup lang="ts">
import type { Order } from '@breezingin/breezing-shared';
const { $api } = useNuxtApp()
const config = useRuntimeConfig()

const props = defineProps<{
    order: Order
}>();

const emit = defineEmits(['error', 'success'])
const vietQrLink = config.public.env == 'development' ? 'https://api.vietqr.io/image/970422-0344617909-fXYCnmk.jpg' : 'https://img.vietqr.io/image/MB-202508198-qr_only.png'
const accountName = config.public.env == 'development' ? 'NGUYEN NGOC KHOA' : 'ARTECH GLOBAL JST'

const totalPrice = computed(() => {
    if (props.order?.isConverted && props.order.convertedCurrency == "VND") {
        return props.order.convertedTotalPrice
    } else {
        return props.order?.totalPrice
    }
})

const qrCodeLink = computed(() => {
    if (!props.order) {
        return ''
    }
    if (!totalPrice.value) {
        return ''
    }
    return `${vietQrLink}?accountName=${encodeURIComponent(accountName)}&amount=${encodeURIComponent(totalPrice.value)}&addInfo=${encodeURIComponent(props.order.code)}`
})

let interval: any = null;

onMounted(() => {
    interval = setInterval(() => {
        submit();
    }, 10000);
});


const submitLoading = ref(false);

function submit() {
    submitLoading.value = true
    $api('/order/' + props.order.id).then((resp: any) => {
        if (resp && resp.confirmTime) {
            emit('success', resp)
            clearInterval(interval)
        } 
    }).finally(() => {
        submitLoading.value = false
    })
}

onUnmounted(() => {
    if (interval) {
        clearInterval(interval)
    }
})

</script>

<template>
    <div style="text-align: center;">
        <figure><img style="max-width: 250px;" :src="qrCodeLink" alt="qrcode"></figure>
    </div>
</template>