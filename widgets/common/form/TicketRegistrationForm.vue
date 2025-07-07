<script setup lang="ts">
import { useTicketRegistrationForm, usePaymentHandler, useI18n } from '#build/imports';
import { ref, watch } from 'vue';
import { type FormTicketRegistrationSetting, type Order } from '@breezingin/breezing-shared';

const { t, d, n } = useI18n({
  messages: {
    en: {
      'loading': 'Loading...',
      'selectTickets': 'Select Tickets',
      'processing': 'Processing...',
      'next': 'Next',
      'ticketInformation': 'Ticket information',
      'paymentSuccessful': 'Payment successful',
      'registrationSuccessful': 'Registration successful',
      'ticketsSentToEmail': 'Tickets have been sent to your email.',
      'orderCode': 'Order Code',
      'purchaseDate': 'Purchase date',
      'totalAmount': 'Total Amount',
      'downloadTicket': 'Download ticket',
      'backToHome': 'Back to home',
      'orderSummary': 'Order Summary',
      'noTicketsSelected': 'No tickets selected',
      'attendee': 'Attendee',
      'copyFromAbove': 'Copy from above',
      'back': 'Back',
      'payment': 'Payment',
      'total': 'Total',
      'name': 'Name',
      'email': 'Email',
      'phone': 'Phone'
    },
    vi: {
      'loading': 'Đang tải...',
      'selectTickets': 'Chọn vé',
      'processing': 'Đang xử lý...',
      'next': 'Tiếp theo',
      'ticketInformation': 'Thông tin vé',
      'paymentSuccessful': 'Thanh toán thành công',
      'registrationSuccessful': 'Đăng ký thành công',
      'ticketsSentToEmail': 'Vé đã được gửi đến email của bạn.',
      'orderCode': 'Mã đơn hàng',
      'purchaseDate': 'Ngày mua',
      'totalAmount': 'Tổng số tiền',
      'downloadTicket': 'Tải vé',
      'backToHome': 'Quay về trang chủ',
      'orderSummary': 'Tóm tắt đơn hàng',
      'noTicketsSelected': 'Không có vé nào được chọn',
      'attendee': 'Người tham dự',
      'copyFromAbove': 'Sao chép từ trên',
      'back': 'Quay lại',
      'payment': 'Thanh toán',
      'total': 'Tổng cộng',
      'name': 'Tên',
      'email': 'Email',
      'phone': 'Số điện thoại'
    }
  }
});


const props = defineProps({
  formID: {
    type: String,
    required: true
  }
});

const {
  step,
  form,
  formModel,
  formModelErrors,
  ticketCategories,
  ticketQuantityMap,
  firstLoading,
  submitLoading,
  order,
  orderSummary,
  createReservation,
  finalizeReservation,
  increaseTicketQuantity,
  decreaseTicketQuantity,
  resetForm
} = useTicketRegistrationForm(props.formID);


const errTxt = ref('');

function onPaymentSuccess(updatedOrder: Order) {
  order.value = updatedOrder;
  step.value = 'success';
}

function onPaymentError(error: any) {
  console.error("Payment error", error);
}

watch(step, (newStep) => {
  if (newStep === 'checkout') {
    initializePayment();
  }
});

const {
  initializePayment,
  paymentMethodChanging,
  selectedPaymentMethodSettingID,
  selectedPaymentMethodSetting,
  paymentMethodSettingOptions,
  selectedPaymentHandlerComponent,
} = usePaymentHandler(order);

</script>

<template>
  <div class="bz-block">
    <div class="container">

      <!-- Loading State -->
      <div v-if="firstLoading" class="text-center p-5">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">{{ t('loading') }}</span>
        </div>
      </div>

      <div v-else>
        <!-- Step navigation -->
        <div v-if="step !== 'select-ticket'" class="mb-2">
          <button class="btn btn-link text-decoration-none ps-0" @click="resetForm">
            <span class="material-symbols-outlined">arrow_back</span>&nbsp;{{ t('back') }}
          </button>
        </div>

        <!-- Main content container -->
        <div class="row g-4">
          <!-- Left column - Form content based on step -->
          <div class="col-12 col-lg-8">
            <!-- Select Ticket Step -->
            <div v-if="step === 'select-ticket'">
              <div class="card mb-4">
                <div class="card__header">
                  <h2 class="card__title">{{ t('selectTickets') }}</h2>
                </div>
                <div class="card__content p-0">
                  <div class="ticket__list">
                    <div class="ticket__item" v-for="category in ticketCategories" :key="category.id">
                      <div class="ticket__info">
                        <div class="ticket__name">{{ category.name }}</div>
                        <div class="ticket__price">{{ n(category.price, 'currency' + form?.event?.currency) }}</div>
                        <div class="ticket__description" v-if="category.description">{{ category.description }}</div>
                      </div>
                      <div class="ticket__quantity">
                        <div class="input-group ticket__quantity-control">
                          <button class="btn ticket__quantity-button" @click="decreaseTicketQuantity(category.id)">
                            <span class="material-symbols-outlined ticket__quantity-button-icon">remove</span>
                          </button>
                          <input type="text" class="form-control ticket__quantity-input"
                            :value="ticketQuantityMap[category.id] || 0" readonly>
                          <button class="btn ticket__quantity-button" @click="increaseTicketQuantity(category.id)">
                            <span class="material-symbols-outlined ticket__quantity-button-icon">add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button class="btn btn-primary w-100" @click="createReservation"
                :disabled="submitLoading || orderSummary.items.length === 0">
                {{ submitLoading ? t('processing') : t('next') }}
              </button>
            </div>

            <!-- Fill Information Step -->
            <div v-if="step === 'fill-info'" class="ticket__form">
              <div class="card">
                <div class="card__header">
                  <h2 class="card__title">{{ t('ticketInformation') }}</h2>
                </div>
                <div class="card__content pb-0">
                  <!-- Receiver information -->
                  <div class="mb-3">
                    <form-input :label="t('name')" v-model="formModel.name" :error="formModelErrors['name']" />
                  </div>
                  <div class="mb-3">
                    <form-input :label="t('email')" v-model="formModel.email" :error="formModelErrors['email']" />
                  </div>
                  <template v-if="!form?.ticketRegistrationSetting?.ticketFieldEnabled">
                    <div v-for="field in form?.formFields" :key="field.id" class="mb-3">
                      <form-custom-field v-model="formModel.customFields[field.key]" :field="field"
                        :error="formModelErrors[`customFields.${field.key}`]" />
                    </div>
                  </template>
                </div>
              </div>
              <!-- Individual tickets information -->
              <template v-if="form?.ticketRegistrationSetting?.ticketFieldEnabled">
                <div v-for="(ticket, index) in formModel.reservationTickets" :key="ticket.id" class="card">
                  <div class="card__header attendee__header">
                    <h3 class="card__title attendee__title">
                      {{ t('attendee') }} {{ index + 1 }} - {{ticketCategories.find(c => c.id ===
                        ticket.ticketCategoryID)?.name}}
                    </h3>
                    <button class="btn btn-link text-decoration-none p-0 attendee__copy-button"
                      @click="ticket.name = formModel.name; ticket.email = formModel.email; ticket.phone = formModel.phone">
                      <span class="material-symbols-outlined">content_copy</span> {{ t('copyFromAbove') }}
                    </button>
                  </div>
                  <div class="card__content pb-0">
                    <div class="mb-3">
                      <form-input :label="t('name')" v-model="ticket.name"
                        :error="formModelErrors[`reservationTickets[${index}].name`]" />
                    </div>
                    <div class="mb-3">
                      <form-input :label="t('email')" v-model="ticket.email"
                        :error="formModelErrors[`reservationTickets[${index}].email`]" />
                    </div>
                    <template v-if="form?.formFields?.length">
                      <div v-for="field in form?.formFields" :key="field.id" class="mb-3">
                        <form-custom-field v-model="ticket.customFields[field.key]" :field="field"
                          :error="formModelErrors[`reservationTickets[${index}].customFields.${field.key}`]" />
                      </div>
                    </template>
                  </div>
                </div>

              </template>
              <button class="btn btn-primary w-100" @click="finalizeReservation" :disabled="submitLoading">
                {{ submitLoading ? t('processing') : t('next') }}
              </button>
            </div>

            <!-- Checkout Step -->
            <div class="card" v-if="step === 'checkout'">
              <div class="card__header">
                <h2 class="card__title">{{ t('payment') }}</h2>
              </div>
              <div class="card__content p-0">
                <div class="payment">
                  <div v-if="errTxt" class="alert alert-danger mt-3">{{ errTxt }}</div>
                  <div class="payment__method">
                    <form-radio-group v-model="selectedPaymentMethodSettingID"
                      :options="paymentMethodSettingOptions.map(option => { return { ...option, text: t(option.text) } })" />
                  </div>
                  <div class="payment__divider"></div>
                  <div v-if="paymentMethodChanging || !selectedPaymentMethodSetting" class="payment__loading">
                    {{ t('loading') }}
                  </div>
                  <div v-show="!paymentMethodChanging" class="payment__processor"
                    v-if="selectedPaymentHandlerComponent && selectedPaymentMethodSetting">
                    <component :is="selectedPaymentHandlerComponent" :order="order"
                      :payment-method-setting="selectedPaymentMethodSetting" @success="onPaymentSuccess"
                      @error="onPaymentError">
                    </component>
                  </div>
                </div>
              </div>
            </div>

            <!-- Success Step -->
            <div v-if="step === 'success'" class="card">
              <div class="card__content success__container">
                <div class="success__icon">
                  <span class="material-symbols-outlined success__icon-symbol">check_circle</span>
                </div>
                <h2 class="success__title">{{ order?.totalPrice ? t('paymentSuccessful') : t('registrationSuccessful')
                }}</h2>
                <p class="success__message">{{ t('ticketsSentToEmail') }}<br>
                  <strong>{{ formModel.email }}</strong>
                </p>

                <div class="order-summary" v-if="order">
                  <div class="order-summary__grid">
                    <div class="order-summary__row">
                      <div class="order-summary__label">{{ t('orderCode') }}</div>
                      <div class="order-summary__value">{{ order?.code }}</div>
                    </div>
                    <div class="order-summary__row">
                      <div class="order-summary__label">{{ t('purchaseDate') }}</div>
                      <div class="order-summary__value">{{ d(order.confirmTime * 1000) }}</div>
                    </div>
                    <div class="order-summary__row">
                      <div class="order-summary__label">{{ t('totalAmount') }}</div>
                      <div class="order-summary__value">{{ n(order.totalPrice, 'currency' + order.currency) }}</div>
                    </div>
                  </div>
                </div>

                <div class="success__actions">
                  <button class="btn btn-primary w-100 success__button">
                    <span class="material-symbols-outlined success__button-icon">download</span> {{ t('downloadTicket') }}
                  </button>

                  <button class="btn btn-outline-primary success__button">
                    <span class="material-symbols-outlined success__button-icon">keyboard_backspace</span> {{
                      t('backToHome') }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Right column - Order summary -->
          <div class="col-12 col-lg-4">
            <div class="card">
              <div class="card__header">
                <h2 class="card__title">{{ t('orderSummary') }}</h2>
              </div>
              <div class="card__content">
                <!-- Order items -->
                <div class="summary__list" v-if="orderSummary.items.length > 0">
                  <div class="summary__item" v-for="item in orderSummary.items" :key="item.ticketCategoryID">
                    <div class="summary__details">{{ item.ticketCategoryName }} x {{ item.quantity }}</div>
                    <div class="summary__price">{{ n(item.totalPrice, 'currency' + form?.event?.currency) }}</div>
                  </div>
                </div>
                <div v-else class="text-center text-desc">
                  {{ t('noTicketsSelected') }}
                </div>
                <div class="summary__divider"></div>
                <!-- Total -->
                <div class="summary__total">
                  <div>{{ t('total') }}</div>
                  <div class="summary__total-amount">
                    {{ n(orderSummary.totalPrice, 'currency' + form?.event?.currency) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  margin-bottom: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--bs-border-color);
  overflow: hidden;

  &__header {
    padding: 0.9375rem 1.5rem;
    border-bottom: 1px solid var(--bs-border-color);
  }

  &__title {
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 0;
    color: var(--text-color-title);
  }

  &__content {
    padding: 1.5rem;
  }

  &__footer {
    padding: 1.25rem 1.5rem;
  }
}

.ticket {

  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid var(--bs-border-color);

    &:last-child {
      border-bottom: none;
    }
  }

  &__info {
    flex: 1;
  }

  &__name {
    font-size: 0.875rem;
    color: var(--text-color-title);
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  &__price {
    font-size: 1.25rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.25rem;

    &-currency {
      font-size: 0.75rem;
      font-weight: 500;
    }
  }

  &__description {
    margin-top: 0.25rem;
    color: var(--text-color-desc);
  }

  &__quantity {
    &-control {
      width: 7.5rem;
    }

    &-input {
      text-align: center;
      font-weight: 500;
    }

    &-button {
      border: 1px solid var(--bs-border-color);
      padding: 0.375rem 0.5rem;

      &-icon {
        font-size: 1.125rem;
      }
    }
  }

}

// Attendee Block
.attendee {
  &__header {
    display: flex;
    align-items: center;
  }

  &__title {
    flex-grow: 1;
  }

}

// Success Block
.success {
  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 2rem 1rem;
  }

  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background-color: #4CAF50;
    color: white;
    margin-bottom: 1.5rem;

    &-symbol {
      font-size: 2.25rem;
    }
  }

  &__title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  &__message {
    font-size: 1rem;
    color: var(--text-color-desc);
    margin-bottom: 2rem;
  }

  &__actions {
    width: 100%;
    max-width: 31.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    &-icon {
      font-size: 1.25rem;
    }
  }
}

// Order Summary Block
.order-summary {
  max-width: 31.25rem;
  border: 1px solid var(--bs-border-color);
  border-radius: 0.5rem;
  padding: 1.25rem 1.5rem;
  margin-bottom: 2rem;

  &__title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    text-align: left;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0;
  }

  &__row {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--bs-border-color);

    &:last-child {
      border-bottom: none;
    }
  }

  &__label {
    font-weight: 500;
    color: var(--text-color-desc);
  }

  &__value {
    font-weight: 600;
    text-align: right;
  }
}

// Summary Block
.summary {
  &__list {
    margin-bottom: 1.5rem;
  }

  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.25rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__details {
    font-size: 0.875rem;
    color: var(--text-color-desc);
    flex: 1;
  }

  &__price {
    color: var(--text-color-title);
    font-weight: 600;
  }

  &__divider {
    margin: 1.25rem 0;
    border-top: 1px solid var(--bs-border-color);
  }

  &__total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.125rem;
    font-weight: 600;

    &-amount {
      display: flex;
      align-items: center;
    }
  }
}

// Payment Block
.payment {
  &__method {
    padding: 1.25rem 1.5rem;
  }

  &__loading {
    padding: 1.5rem;
    text-align: center;
    font-size: 0.875rem;
  }

  &__divider {
    border-top: 1px solid var(--bs-border-color);
  }

  &__processor {
    padding: 1.25rem 1.5rem;
  }
}
</style>