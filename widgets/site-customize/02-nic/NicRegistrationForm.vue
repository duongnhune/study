<script setup lang="ts">
import type { Order } from '@breezingin/breezing-shared';
import { useNuxtApp } from '#build/imports';
import { resolveComponent, reactive, ref, watch, onMounted } from 'vue'
const { $api } = useNuxtApp()

const props = defineProps({
  eventID: {
    type: String,
    required: true
  },
  ticketCategoryID: {
    type: String,
    required: true
  },
  featureTitle: {
    type: String,
    default: () => 'What we provide'
  },
  features: {
    type: Array as () => Array<{ feature: string }>,
    default: () => [
      { feature: 'Early Bird Special - Admission to the conference.' },
      { feature: 'Exclusive lunch' },
      { feature: 'After party and second day agenda (additional event access will be sent following your ticket purchase; refer to website for agenda details)' }
    ]
  }
})

const PaypalPayment = resolveComponent('PaypalPayment')
const BankTransferPayment = resolveComponent('BankTransferPayment')

const errMsg = ref('')

const firstName = ref('')
const lastName = ref('')
const phoneNumber = ref('')
const position = ref('')

const defaultForm = {
  id: '',
  name: '',
  phone: '',
  eventID: props.eventID,
  email: '',
  reservationTickets: [
    {
      name: '',
      email: '',
      phone: '',
      ticketCategoryID: props.ticketCategoryID,
    }
  ],
  customFields: {
    'company-name': [''],
    'position': [''],
  },
  refCode: "WEB",
  image: null,
  reservationStatus: null
}

const submitLoading = ref(false)
const formErrors = ref<any>({})
const form = reactive({ ...defaultForm })

const order = ref<Order | null>(null)

function finalizeReservation() {
  submitLoading.value = true;
  if (firstName.value && lastName.value) {
    form.name = `${firstName.value} ${lastName.value}`
  } else {
    form.name = ''
  }
  form.phone = phoneNumber.value
  form.customFields['position'][0] = position.value

  const payload = {
    ...form,
    reservationTickets: form.reservationTickets.map((ticket) => ({
      ...ticket,
      name: form.name,
      email: form.email,
      phone: form.phone,
    })),
  }

  $api('/reservation/final', { method: 'PUT', body: payload })
    .then((resp: any) => {
      if (resp.order) {
        order.value = resp.order
        paymentMethodInput.value = resp.order.paymentMethod
      }
    })
    .catch((resp) => {
      if (resp.status === 422) {
        formErrors.value = resp.data.details;
      }
    })
    .finally(() => {
      submitLoading.value = false;
    });
}

function createReservation() {
  submitLoading.value = true
  $api('/reservation', { method: 'POST', body: form })
    .then(((res: any) => {
      if (res) {
        if (!res.customFields) {
          res.customFields = {
            'company-name': [''],
            'position': [''],
          }
        } else if (!res.customFields['position']) {
          res.customFields['position'] = ['']
        }
        Object.assign(form, res)
      }
    })
    ).catch((err) => {
      if (err.status === 422) {
        formErrors.value = err.data.details;
      }
    }).finally(() => {
      submitLoading.value = false;
    })
}


const paymentMethodInput = ref('bank-transfer')
const isCheckoutEnabled = ref(true)

function changePaymentMethod() {
  if (!order.value) {
    return
  }
  isCheckoutEnabled.value = false
  $api('/order/payment-method', {
    method: 'PUT',
    body: {
      id: order.value.id,
      paymentMethod: paymentMethodInput.value
    }
  }).then((resp: any) => {
    if (order.value && resp) {
      order.value = {
        ...order.value,
        paymentMethod: resp.paymentMethod,
        isConverted: resp.isConverted,
        convertedTotalPrice: resp.convertedTotalPrice,
        convertedCurrency: resp.convertedCurrency,
        conversionRate: resp.conversionRate
      }
    }
    isCheckoutEnabled.value = true
  })
}

watch(paymentMethodInput, (newValue) => {
  changePaymentMethod()
})


function success(newOrder: Order) {
  order.value = newOrder
}

function error(err: string) {
  errMsg.value = err
}

function reset() {
  firstName.value = ''
  lastName.value = ''
  phoneNumber.value = ''
  position.value = ''
  order.value = null
  formErrors.value = {}
  submitLoading.value = false
  Object.assign(form, defaultForm)
  createReservation()
}

onMounted(() => {
  createReservation()
})
</script>

<template>
  <div
    class="bz-block is-padding-top-large is-padding-bottom-large bg-primary bz-block-quick-payment-method vvs-nic-block-quick-payment-method"
    id="vvs-nic-block-quick-payment-method">
    <div class="container">
      <div class="registration">
        <div class="registration__container">
          <div class="ticket">
            <h2 class="ticket__title">TICKET</h2>

            <div class="ticket__price-box">
              <div class="ticket__price">$108</div>
              <div class="ticket__type">GENERAL ACCESS</div>
            </div>

            <div class="ticket__details" v-if="features.length">
              <h3 class="ticket__subtitle">{{ featureTitle }}</h3>
              <ul class="ticket__features">
                <li v-for="(feature, index) in features" :key="index" class="ticket__feature">
                  <span class="material-symbols-outlined ticket__icon">check_circle</span>
                  {{ feature.feature }}
                </li>
              </ul>
            </div>

          </div>

          <div class="form">

            <template v-if="!order">
              <h2 class="big-title">REGISTER NOW</h2>
              <div class="form__section">
                <div class="form__rows">
                  <div class="form__row mb-0">
                    <div class="form__field">
                      <label class="form__label" for="firstname">First Name<span class="form__required">*</span></label>
                      <input v-model="firstName" type="text" id="firstname" class="form__input"
                        placeholder="Your first name">
                      <small v-if="!firstName && formErrors['name']" class="text-danger mt-1">{{
                        formErrors['name'] }}</small>
                    </div>

                    <div class="form__field">
                      <label class="form__label" for="lastname">Last Name<span class="form__required">*</span></label>
                      <input v-model="lastName" type="text" id="lastname" class="form__input"
                        placeholder="Your last name">
                      <small v-if="!lastName && formErrors['name']" class="text-danger mt-1">{{
                        formErrors['name'] }}</small>
                    </div>
                  </div>

                  <div class="form__field">
                    <label class="form__label" for="email">Email<span class="form__required">*</span></label>
                    <input v-model="form.email" type="email" id="email" class="form__input" placeholder="Your email">
                    <small v-if="formErrors['email']" class="text-danger mt-1">{{
                      formErrors['email'] }}</small>
                  </div>

                  <div class="form__field">
                    <label class="form__label" for="phone">Phone Number<span class="form__required">*</span></label>
                    <input v-model="phoneNumber" type="tel" id="phone" class="form__input"
                      placeholder="Your phone number">
                    <small v-if="formErrors['phone']" class="text-danger mt-1">{{
                      formErrors['phone'] }}</small>
                  </div>

                  <div class="form__field">
                    <label class="form__label" for="company">Company name<span class="form__required">*</span></label>
                    <input v-model="form.customFields['company-name'][0]" type="text" id="company" class="form__input"
                      placeholder="Your company name">
                    <small v-if="formErrors['customFields.company-name']" class="text-danger mt-1">{{
                      formErrors['customFields.company-name']
                    }}</small>
                  </div>

                  <div class="form__field">
                    <label class="form__label" for="position">Position<span class="form__required">*</span></label>
                    <input v-model="position" type="text" id="position" class="form__input" placeholder="Your position">
                    <small v-if="formErrors['customFields.position']" class="text-danger mt-1">{{
                      formErrors['customFields.position']
                    }}</small>
                  </div>
                </div>
              </div>
              <button class="form__submit-btn rounded-pill" @click="finalizeReservation"
                :disabled="submitLoading">Continue</button>
            </template>
            <template v-else-if="!order.confirmTime && order.totalPrice">
              <h2 class="big-title">PAYMENT</h2>
              <div class="form__payment-options">
                <div class="form-check form__payment-option"
                  :class="{ 'form__payment-option--selected': paymentMethodInput === 'bank-transfer' }"
                  @click="paymentMethodInput = 'bank-transfer'">
                  <input class="form-check-input" id="flexRadioDefault11" type="radio" name="flexRadioDefault"
                    v-model="paymentMethodInput" value="bank-transfer">
                  <div class="form__payment-option-content">
                    <span class="form__payment-option-title">Bank transfer (Vietnam)</span>
                    <span class="form__payment-option-description">Use your bank to make secure
                      transactions.</span>
                    <div class="form__payment-icons">
                    </div>
                  </div>
                </div>
              </div>
              <template v-if="isCheckoutEnabled">
                <template v-if="order.paymentMethod.toString() == 'bank-transfer'">
                  <div style="text-align: center;">
                    <BankTransferPayment :order="order" @success="success" />
                    <p>Open your bank and scan QRCode</p>
                  </div>
                </template>
                <template v-if="order.paymentMethod.toString() == 'paypal'">
                  <PaypalPayment :order="order" button-id="paypal-sumbit-button" @success="success" @error="error" />
                  <!-- <small v-if="errMsg" class="text-danger ps-1">{{ errMsg }}</small> -->
                  <!-- <button class="btn form__submit-btn rounded-pill mt-2"
id="paypal-sumbit-button">Submit</button> -->
                </template>
              </template>
            </template>
            <template v-else>
              <div class="success__section">
                <div class="success__section-icon">
                  <span class="material-symbols-outlined">email</span>
                </div>
                <div class="success__section-title"> Thank you for your register </div>
                <div class="success__section-desc">Your ticket has been successfully registered and sent
                  to your email.</div>
                <button class="form__submit-btn rounded-pill" @click="reset">Back</button>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>


<style scoped>
.registration__container {
  display: flex;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

/* Ticket Styles */
.ticket {
  background-color: #0f1a4a;
  color: #fff;
  width: 45%;
  padding: 30px;
}

.ticket__title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
}

.ticket__price-box {
  background-color: #12cdf9;
  color: #0f1a4a;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.ticket__price {
  font-size: 32px;
  font-weight: 700;
}

.ticket__type {
  font-weight: 600;
}

.ticket__details {
  margin-bottom: 30px;
}

.ticket__subtitle {
  font-size: 18px;
  margin-bottom: 15px;
}

.ticket__features {
  list-style-type: none;
  padding-left: 0;
}

.ticket__feature {
  margin-bottom: 8px;
  display: flex;
  align-items: start;
  line-height: 1.4;
}

.ticket__icon {
  line-height: 24px;
  font-size: 18px;
  color: #12cdf9;
  margin-right: 8px;
  flex-shrink: 0;
}

.ticket__note {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 20px;
}

.ticket__note-title {
  font-size: 18px;
  margin-bottom: 15px;
  color: #12cdf9;
}

.ticket__note-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  line-height: 1.4;
}

.ticket__icon-info,
.ticket__icon-calendar {
  color: #777;
  margin-right: 10px;
  flex-shrink: 0;
}

/* Form Styles */
.form {
  width: 55%;
  padding: 30px;
}

.form__title {
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  margin-bottom: 20px;
}

.form__section {
  min-height: 300px;
  margin-bottom: 30px;
}

.form__section-title {
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  margin-bottom: 15px;
}

.form__rows {
  flex-grow: 1;
}


.form__row {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
}

.form__field {
  flex: 1;
  margin-bottom: 15px;
}

.form__label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
}

.form__required {
  color: #f52937;
  margin-left: 2px;
}

.form__input-wrapper,
.form__select-wrapper {
  position: relative;
}

.form__input,
.form__select {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 16px;
  color: #333;
}

.form__input::placeholder {
  color: #aaa;
}

.form__icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
}


.form__submit-btn {
  width: 100%;
  padding: 15px;
  background-color: #f52937;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  transition: background-color 0.2s;
}

.form__submit-btn:hover {
  background-color: #d81f29;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .registration__container {
    flex-direction: column;
  }

  .ticket,
  .form {
    width: 100%;
  }

  .form__row {
    flex-direction: column;
    gap: 10px;
  }
}

.success__section {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.success__section-icon>span {
  font-size: 60px !important;
  color: #12cdf9;
  margin-bottom: 24px;
}

.success__section-title {
  font-size: 32px;
  font-weight: 700;
  color: #12cdf9;
  margin-bottom: 10px;
}

.success__section-desc {
  font-size: 16px;
  color: #666;
  text-align: center;
  margin-bottom: 40px;
}

/* Payment options container */
.form__payment-options {
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 12px;
  margin-bottom: 24px;
}


/* Payment option container */
.form__payment-option {
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: #f4f4f6;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
}

.form__payment-option:hover {
  background-color: #eeeef0;
}

/* Selected payment option styling */
.form__payment-option--selected {
  border: 2px solid #e74c3c;
}


.form__payment-option-content {
  display: flex;
  flex-direction: column;
  margin-left: 12px;
}

/* Payment option title */
.form__payment-option-title {
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  margin-bottom: 4px;
}

/* Payment option description */
.form__payment-option-description {
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
}


.form-check-input {
  appearance: none;
  width: 18px;
  height: 20px;
  border: 2px solid #aaa;
  border-radius: 50%;
  margin-left: 8px;
  position: relative;
}

.form-check-input:checked {
  background-color: #e74c3c;
  border: 4px solid #e74c3c;
}

.big-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
}
</style>

<!--   <div class="form-check form__payment-option" -->
<!--     :class="{ 'form__payment-option--selected': paymentMethodInput === 'paypal' }" -->
<!--     @click="paymentMethodInput = 'paypal'"> -->
<!--     <input class="form-check-input" id="flexRadioDefault14" type="radio" name="flexRadioDefault" -->
<!--       v-model="paymentMethodInput" value="paypal"> -->
<!--     <div class="form__payment-option-content"> -->
<!--       <span class="form__payment-option-title">PayPal, Credit card</span> -->
<!--       <span class="form__payment-option-description">Use PayPal to make simple and -->
<!--         secure transactions.</span> -->
<!--       <div class="form__payment-icons"> -->
<!-- <img src="path/to/paypal.svg" alt="PayPal" class="form__payment-icon"> This is commented -->
<!--       </div> -->
<!--     </div> -->
<!--   </div> -->
<!-- </div> -->
