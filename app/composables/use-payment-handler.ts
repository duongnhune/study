import { PaymentMethod, type Order, type PaymentMethodSetting } from "@breezingin/breezing-shared";
import { camelCase } from "lodash-es";

const methodIcons = {
    [PaymentMethod.Card]: 'credit_card',
    [PaymentMethod.BankTransferVN]: 'qr_code',
    [PaymentMethod.Gcash]: 'wallet',
}

export function usePaymentHandler(order: Ref<Order | null>) {

    const {t} = useI18n()
    const { $api } = useNuxtApp()

    const paymentMethodLoading = ref(false)
    const paymentMethodSettings = ref<PaymentMethodSetting[]>([])

    const paymentMethodSettingOptions = computed(() => {
        return paymentMethodSettings.value
            .filter((setting) => {
                return paymentHandlerComponents.some((handler) => {
                    return handler.paymentMethod === setting.paymentMethod &&
                    handler.paymentProviderID === setting.paymentProviderSetting?.paymentProviderID
                })
            })
            .map((setting) => {
                return {
                    text: t(`paymentMethod.${camelCase(setting.paymentMethod)}`),
                    value: setting.id || '',
                    icon: methodIcons[setting.paymentMethod as keyof typeof methodIcons] || '',
                }
            })
    }
    )

    function getPaymentMethodSetting(id: string) {
        return paymentMethodSettings.value.find((setting) => {
            return setting.id == id
        })
    }

    const paymentHandlerComponents  = [
        {
            paymentMethod: PaymentMethod.Card,
            paymentProviderID: "breezing",
            // @ts-ignore
            component: defineAsyncComponent(() => import('~/components/payment-handlers/breezing/CardHandler.vue')),
        },
        {
            paymentMethod: PaymentMethod.BankTransferVN,
            paymentProviderID: "breezing",
             // @ts-ignore
            component: defineAsyncComponent(() => import('~/components/payment-handlers/breezing/BankTransferHandler.vue')),
        },
        {
            paymentMethod: PaymentMethod.Gcash,
            paymentProviderID: "breezing",
            // @ts-ignore
            component: defineAsyncComponent(() => import('~/components/payment-handlers/breezing/GcashHandler.vue')),
        },
    ]

    function getPaymentHandlerComponent(paymentMethodSettingID: string) {
        const paymentMethodSetting = paymentMethodSettings.value.find((setting) => {
            return setting.id == paymentMethodSettingID
        })
        if (paymentMethodSetting) {
            const paymentHandler = paymentHandlerComponents.find((handler) => {
                return handler.paymentMethod === paymentMethodSetting.paymentMethod &&
                    handler.paymentProviderID === paymentMethodSetting.paymentProviderSetting?.paymentProviderID
            })
            if (paymentHandler) {
                return paymentHandler.component
            }
        }
        return null
    }

    const paymentMethodChanging = ref(false)

    function changePaymentMethod(paymentMethodSettingID: string) {
        if (!order.value) {
            console.error('Order is not loaded')
            return
        }
        const paymentMethodSetting = getPaymentMethodSetting(paymentMethodSettingID)
        if (paymentMethodSetting) {
            paymentMethodChanging.value = true
            return $api<Order>('/payment-method/change', {
                method: 'PUT',
                body: {
                    orderID: order.value!.id,
                    paymentMethodSettingID: paymentMethodSetting.id,
                },
            })
                .then((updatedOrder) => {
                    order.value = {
                        ...order.value!,
                        paymentMethod: updatedOrder.paymentMethod,
                        currency: updatedOrder.currency,
                        totalPrice: updatedOrder.totalPrice,
                        isConverted: updatedOrder.isConverted,
                        convertedCurrency: updatedOrder.convertedCurrency,
                        convertedTotalPrice: updatedOrder.convertedTotalPrice,
                        conversionRate: updatedOrder.conversionRate,
                    }
                    selectedPaymentMethodSetting.value = getPaymentMethodSetting(selectedPaymentMethodSettingID.value)
                    selectedPaymentHandlerComponent.value = getPaymentHandlerComponent(selectedPaymentMethodSettingID.value)
                    paymentMethodChanging.value = false
                })
                .catch((err) => {
                    console.error('Failed to change payment method', err)
                })
                .finally(() => {
                    paymentMethodChanging.value = false
                })
        }
    }


    function loadPaymentMethodSettings() {
        if (!order.value) {
            console.error('Order is not loaded')
            return
        }
        paymentMethodLoading.value = true
        return $api<PaymentMethodSetting[]>('/payment-method/setting', {
            params: {
                'workspaceID': order.value!.workspaceID,
            }
        })
            .then((resp) => {
                paymentMethodSettings.value = resp
                paymentMethodLoading.value = false
            }).catch((err) => {
                console.error('Failed to load payment method settings', err)
            }).finally(() => {
                paymentMethodLoading.value = false
            })
    }


    const selectedPaymentMethodSettingID = ref('')
    const selectedPaymentMethodSetting = ref<PaymentMethodSetting>()
    const selectedPaymentHandlerInstance = ref<any>()
    const selectedPaymentHandlerComponent = shallowRef() 

    watch(selectedPaymentMethodSettingID, (newValue) => {
        if (newValue) {
            changePaymentMethod(newValue)?.then(() => {
                nextTick(() => {
                    if (selectedPaymentHandlerInstance.value) {
                        selectedPaymentHandlerInstance.value?.initialize()
                    } else {
                        const interval = setInterval(() => {
                            if (selectedPaymentHandlerInstance.value) {
                                selectedPaymentHandlerInstance.value?.initialize()
                                clearInterval(interval)
                            }
                        }, 100)
                    }
                })
             })
        }
    })

    function initializePayment() {
        if (!order.value) {
            console.error('Order is not loaded')
            return
        }
        loadPaymentMethodSettings()?.then(() => {
            if (paymentMethodSettingOptions.value.length > 0) {
                if (!order.value?.paymentMethod) {
                    selectedPaymentMethodSettingID.value = paymentMethodSettingOptions.value[0]!.value
                } else {
                    const paymentMethodSetting = paymentMethodSettings.value.find((setting) => {
                        return setting.paymentMethod === order.value?.paymentMethod
                    })
                    if (paymentMethodSetting?.id) {
                        selectedPaymentMethodSettingID.value = paymentMethodSetting.id
                    }
                }
            }
        })
    }

    watch(order, (newOrder) => {
        if (!newOrder) {
            selectedPaymentMethodSettingID.value = ''
            selectedPaymentMethodSetting.value = undefined
            selectedPaymentHandlerComponent.value = undefined
            selectedPaymentHandlerInstance.value = undefined
        }
    })


    return {
        paymentHandlerComponents,
        paymentMethodChanging,
        paymentMethodLoading,
        paymentMethodSettings,
        paymentMethodSettingOptions,
        selectedPaymentMethodSettingID,
        selectedPaymentMethodSetting,
        selectedPaymentHandlerInstance,
        selectedPaymentHandlerComponent,
        initializePayment,
        getPaymentMethodSetting,
        getPaymentHandlerComponent,
        changePaymentMethod,
        loadPaymentMethodSettings,
    }
}