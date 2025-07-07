<script setup lang="ts">
import type { Order } from "@breezingin/breezing-shared";
import { loadScript } from "@paypal/paypal-js";
import { onMounted } from "vue";
const { $api } = useNuxtApp()
const config = useRuntimeConfig()

const sendboxClientID = 'AYVUFrtf1XLDUckN2dOPyapmhhX8durXTXLXbPiuciXnHZDc8RyEMYjwBwel0WA1hS44aebu2g7BSCH8'
const productionClientID = 'AbkYaqGjmEynewwHwd71vzw3sQkiFOC2RJUxsEL3aFzAMGvRoLhZCeKHfKKD0aiOmr0rRfM4rovpBvRK'

const environment = config.public.env == 'development' ? 'sandbox' : 'production';
const clientId = environment == 'sandbox' ? sendboxClientID : productionClientID;

const emit = defineEmits(['error', 'success'])

async function createOrderCallback() {
    try {
        const resp = await $api<any>("/paypal", {
            method: "POST",
            body: {
                'orderID': props.order.id,
            }
        })

        if (resp['paypalOrderID']) {
            return resp['paypalOrderID']
        }
        const paypalResp = resp['paypalResponse']
        const errorDetail = paypalResp?.details?.[0];
        const errorMessage = errorDetail
            ? `${errorDetail.issue} ${errorDetail.description} (${paypalResp.debug_id})`
            : JSON.stringify(paypalResp);
        throw new Error(errorMessage);


    } catch (error: any) {
        emit('error', error.message)
    }
}
async function onApproveCallback(data: any, actions: any) {
    try {
        const resp = await $api<any>('/paypal/capture', {
            method: 'POST',
            body: {
                'paypalOrderID': data.orderID,
                'orderID': props.order.id,
            }
        })
        if (resp.confirmTime) {
            setTimeout(() => {
                emit('success', resp)
            }, 1000)
            return
        }

        const paypalResp = resp['paypalResponse']
        const errorDetail = paypalResp?.details?.[0];

        if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
            return actions.restart();
        } else if (errorDetail) {
            throw new Error(`${errorDetail.description} (${paypalResp.debug_id})`)
        } else if (!paypalResp.purchase_units) {
            throw new Error(JSON.stringify(paypalResp))
        } else {
            console.log("Capture result", paypalResp, JSON.stringify(paypalResp, null, 2))
        }
    } catch (error: any) {
        emit('error', error.message)
        console.error(error);
    }
}


const props = defineProps<{
    order: Order;
    buttonId: string;
}>();

onMounted(() => {
    loadScript({
        environment: environment,
        clientId: clientId,
        components: "buttons,card-fields",
        disableFunding: "venmo,paylater",
        enableFunding: "card",
    })
        .then((paypal) => {
            if (paypal && paypal.Buttons) {
                paypal
                    .Buttons({
                        style: {
                            shape: "pill",
                            layout: "vertical",
                            color: "silver",
                            label: "pay",
                        },
                        createOrder: createOrderCallback,
                        onApprove: onApproveCallback
                    })
                    .render("#paypal-button-container")
                    .catch((error: any) => {
                        console.error("failed to render the PayPal Buttons", error);
                    });
            } else {
                console.error("PayPal Buttons is not available");
            }

            if (paypal && paypal?.CardFields) {
                const cardField = paypal.CardFields({
                    createOrder: createOrderCallback,
                    // @ts-ignore
                    onApprove: onApproveCallback,
                    style: {
                        input: {
                            "font-size": "16px",
                            "font-family": "courier, monospace",
                            "font-weight": "lighter",
                            color: "#ccc",
                        },
                        ".invalid": { color: "purple" },
                    },
                });

                if (cardField.isEligible()) {
                    const nameField = cardField.NameField({
                        style: { input: { color: "blue" }, ".invalid": { color: "purple" } },
                    });
                    nameField.render("#card-name-field-container");

                    const numberField = cardField.NumberField({
                        style: { input: { color: "blue" } },
                    });
                    numberField.render("#card-number-field-container");

                    const cvvField = cardField.CVVField({
                        style: { input: { color: "blue" } },
                    });
                    cvvField.render("#card-cvv-field-container");

                    const expiryField = cardField.ExpiryField({
                        style: { input: { color: "blue" } },
                    });
                    expiryField.render("#card-expiry-field-container");


                    document
                        .getElementById(props.buttonId)!
                        .addEventListener("click", () => {
                            document.getElementById(props.buttonId)!.setAttribute("disabled", "true");
                            cardField
                                .submit()
                                .then(() => { 
                                    document.getElementById(props.buttonId)!.removeAttribute("disabled");
                                })
                                .catch((error: any) => {
                                    console.error(error)
                                    document.getElementById(props.buttonId)!.removeAttribute("disabled");
                                    emit('error', error.message)
                                });
                        });
                } else {
                    console.error("Card fields are not eligible");
                }
            }
        })
        .catch((error) => {
            console.error("failed to load the PayPal JS SDK script", error);
        });
});
</script>

<template>
    <div>
        <div id="card-form" class="card_container">
            <div id="card-name-field-container"></div>
            <div id="card-number-field-container"></div>
            <div id="card-expiry-field-container"></div>
            <div id="card-cvv-field-container"></div>
        </div>
        <div class="mt-2" id="paypal-button-container"></div>
    </div>
</template>