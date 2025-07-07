<script setup lang="ts">
interface TicketType {
  price: string;
  label: string;
  isDefault: boolean;
}

interface Feature {
  icon: string;
  text: string;
}

interface NoteItem {
  icon: string;
  text: string;
  highlight: boolean;
}

interface ServiceOption {
  value: string;
  label: string;
}

interface PaymentMethod {
  title: string;
  description: string;
  icon: string;
  isDefault: boolean;
}

interface Props {
  ticketTypes: TicketType[];
  features?: Feature[];
  noteItems?: NoteItem[];
  deadline?: string;
  formTitle?: string;
  buyerInfoTitle?: string;
  showDateField?: boolean;
  showTimeField?: boolean;
  showServiceField?: boolean;
  serviceOptions?: ServiceOption[];
  paymentMethods: PaymentMethod[];
  submitButtonText?: string;
  submitButtonIcon?: string;
}

defineProps<Props>();
</script>

<template>
  <div>
    <FillInformation :ticket-types="ticketTypes" :features="features" :note-items="noteItems" :deadline="deadline"
      :form-title="formTitle" :buyer-info-title="buyerInfoTitle" :show-date-field="showDateField"
      :show-time-field="showTimeField" :show-service-field="showServiceField" :service-options="serviceOptions"
      :payment-methods="paymentMethods" :submit-button-text="submitButtonText" :submit-button-icon="submitButtonIcon" />
  </div>
</template>

<script lang="tsx">
import { defineComponent, ref } from 'vue';

const FillInformation = defineComponent({
  name: 'FillInformation',
  props: {
    ticketTypes: { type: Array, required: true },
    features: { type: Array, default: () => [] },
    noteItems: { type: Array, default: () => [] },
    deadline: { type: String, default: '' },
    formTitle: { type: String, default: 'REGISTER NOW' },
    buyerInfoTitle: { type: String, default: 'Buyer information' },
    showDateField: { type: Boolean, default: true },
    showTimeField: { type: Boolean, default: true },
    showServiceField: { type: Boolean, default: true },
    serviceOptions: { type: Array, default: () => [] },
    paymentMethods: { type: Array, required: true },
    submitButtonText: { type: String, default: 'Send Request' },
    submitButtonIcon: { type: String, default: '📤' }
  },
  setup(props) {
    // Current step (1 = Fill Information, 2 = Payment)
    const currentStep = ref(1);

    // Form data
    const selectedTicket = ref(
      props.ticketTypes.find((ticket: any) => ticket.isDefault)?.price ||
      (props.ticketTypes.length > 0 ? props.ticketTypes[0].price : '')
    );
    const date = ref('');
    const time = ref('');
    const service = ref('');
    const fullName = ref('');
    const email = ref('');
    const phoneNumber = ref('');
    const paymentMethod = ref(
      props.paymentMethods.find((method: any) => method.isDefault)?.title ||
      (props.paymentMethods.length > 0 ? props.paymentMethods[0].title : '')
    );

    const selectTicket = (ticket: string) => {
      selectedTicket.value = ticket;
    };

    const handleDateChange = (event: Event) => {
      date.value = (event.target as HTMLInputElement).value;
    };

    const handleTimeChange = (event: Event) => {
      time.value = (event.target as HTMLInputElement).value;
    };

    const handleServiceChange = (event: Event) => {
      service.value = (event.target as HTMLInputElement).value;
    };

    const goToPayment = () => {
      // Validate form if needed
      currentStep.value = 2;
    };

    const goBackToForm = () => {
      currentStep.value = 1;
    };

    const handleSubmit = () => {
      console.log('Form submitted', {
        selectedTicket: selectedTicket.value,
        date: date.value,
        time: time.value,
        service: service.value,
        fullName: fullName.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        paymentMethod: paymentMethod.value
      });
      // Success message or redirect logic
    };

    // Step 1: Fill Information Form
    const renderFillInformationStep = () => {
      return (
        <div class="bz-block is-padding-top is-padding-bottom-large bz-block-registration-form" id="registration-form">
          <div class="container">
            <div class="bz-registration">
              <div class="bz-registration__content">
                <div class="bz-registration__ticket">
                  <h2 class="bz-registration__title">TICKET</h2>

                  <div class="bz-registration__section">
                    <h3 class="bz-registration__section-title">Select your ticket type</h3>

                    <div class="bz-registration__ticket-options">
                      {props.ticketTypes.map((ticket, index) => (
                        <div
                          key={index}
                          class={[
                            'bz-registration__ticket-option',
                            selectedTicket.value === ticket.price ? 'bz-registration__ticket-option--active' : ''
                          ].join(' ')}
                        >
                          <label class="bz-registration__ticket-label">
                            <input
                              type="radio"
                              name="ticketType"
                              value={ticket.price}
                              checked={selectedTicket.value === ticket.price}
                              onChange={() => selectTicket(ticket.price)}
                              class="bz-registration__ticket-input"
                            />
                            <div class="bz-registration__ticket-content">
                              <div class="bz-registration__ticket-price">{ticket.price}</div>
                              <div class="bz-registration__ticket-type">{ticket.label}</div>
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {props.features && props.features.length > 0 && (
                    <div class="bz-registration__section">
                      <h3 class="bz-registration__section-title">What we provide</h3>

                      <ul class="bz-registration__features">
                        {props.features.map((feature, index) => (
                          <li key={index} class="bz-registration__feature">
                            <span class="bz-registration__feature-icon">{feature.icon}</span>
                            <span class="bz-registration__feature-text">{feature.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {props.noteItems && props.noteItems.length > 0 && (
                    <div class="bz-registration__section">
                      <h3 class="bz-registration__section-title">Note</h3>

                      <div class="bz-registration__note">
                        {props.noteItems.map((note, index) => (
                          <div key={index} class="bz-registration__note-item">
                            <span class="bz-registration__note-icon">{note.icon}</span>
                            <span class={[
                              'bz-registration__note-text',
                              note.highlight ? 'bz-registration__note-text--highlight' : ''
                            ].join(' ')}>
                              {note.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div class="bz-registration__form">
                  <h2 class="bz-registration__form-title">{props.formTitle}</h2>

                  <div class="bz-registration__form-section">
                    <h3 class="bz-registration__form-subtitle">{props.buyerInfoTitle}</h3>

                    {(props.showDateField || props.showTimeField) && (
                      <div class="bz-registration__form-row">
                        {props.showDateField && (
                          <div class="bz-registration__form-group">
                            <label class="bz-registration__form-label">Date<span class="bz-registration__required">*</span></label>
                            <div class="bz-registration__form-input-wrapper">
                              <input
                                type="text"
                                placeholder="Choose date"
                                class="bz-registration__form-input"
                                value={date.value}
                                onChange={handleDateChange}
                              />
                              <span class="bz-registration__form-icon bz-registration__form-icon--calendar">📅</span>
                            </div>
                          </div>
                        )}

                        {props.showTimeField && (
                          <div class="bz-registration__form-group">
                            <label class="bz-registration__form-label">Time<span class="bz-registration__required">*</span></label>
                            <div class="bz-registration__form-input-wrapper">
                              <input
                                type="text"
                                placeholder="Choose time"
                                class="bz-registration__form-input"
                                value={time.value}
                                onChange={handleTimeChange}
                              />
                              <span class="bz-registration__form-icon bz-registration__form-icon--clock">🕒</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {props.showServiceField && props.serviceOptions && props.serviceOptions.length > 0 && (
                      <div class="bz-registration__form-group bz-registration__form-group--full">
                        <label class="bz-registration__form-label">Service</label>
                        <div class="bz-registration__form-select-wrapper">
                          <select
                            class="bz-registration__form-select"
                            value={service.value}
                            onChange={handleServiceChange}
                          >
                            <option value="">Choose a service</option>
                            {props.serviceOptions.map((option, index) => (
                              <option key={index} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <span class="bz-registration__form-icon bz-registration__form-icon--dropdown">▼</span>
                        </div>
                      </div>
                    )}

                    <div class="bz-registration__form-group bz-registration__form-group--full">
                      <label class="bz-registration__form-label">Your full name<span class="bz-registration__required">*</span></label>
                      <input
                        type="text"
                        placeholder="Your name"
                        class="bz-registration__form-input"
                        value={fullName.value}
                        onChange={(e) => fullName.value = (e.target as HTMLInputElement).value}
                      />
                    </div>

                    <div class="bz-registration__form-row">
                      <div class="bz-registration__form-group">
                        <label class="bz-registration__form-label">Contact email<span class="bz-registration__required">*</span></label>
                        <input
                          type="email"
                          placeholder="Your email"
                          class="bz-registration__form-input"
                          value={email.value}
                          onChange={(e) => email.value = (e.target as HTMLInputElement).value}
                        />
                      </div>

                      <div class="bz-registration__form-group">
                        <label class="bz-registration__form-label">Phone number<span class="bz-registration__required">*</span></label>
                        <input
                          type="tel"
                          placeholder="Your phone number"
                          class="bz-registration__form-input"
                          value={phoneNumber.value}
                          onChange={(e) => phoneNumber.value = (e.target as HTMLInputElement).value}
                        />
                      </div>
                    </div>
                  </div>

                  <div class="bz-registration__form-section">
                    <h3 class="bz-registration__form-subtitle">Payment method</h3>

                    <div class="bz-registration__payment-options">
                      {props.paymentMethods.map((method, index) => (
                        <div
                          key={index}
                          class={[
                            'bz-registration__payment-option',
                            paymentMethod.value === method.title ? 'bz-registration__payment-option--active' : ''
                          ].join(' ')}
                        >
                          <label class="bz-registration__payment-label">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={method.title}
                              checked={paymentMethod.value === method.title}
                              onChange={() => paymentMethod.value = method.title}
                              class="bz-registration__payment-input"
                            />
                            <div class="bz-registration__payment-content">
                              <div class="bz-registration__payment-header">
                                <div class="bz-registration__payment-title">{method.title}</div>
                              </div>
                              <div class="bz-registration__payment-description">
                                {method.description}
                              </div>
                              <div class="bz-registration__payment-cards">
                                <img src={method.icon} alt={method.title} class="bz-registration__payment-card-icon" />
                              </div>
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>

                    <button class="bz-registration__submit-btn" onClick={goToPayment}>
                      <span class="bz-registration__submit-icon">{props.submitButtonIcon}</span>
                      {props.submitButtonText}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    };

    // Step 2: Payment Step
    const renderPaymentStep = () => (
      <div class="bz-block is-padding-top is-padding-bottom-large bz-block-registration-form" id="registration-payment">
        <div class="container">
          <div class="bz-registration">
            <div class="bz-registration__payment">
              <h2 class="bz-registration__payment-title">Complete Your Payment</h2>

              <div class="bz-registration__payment-summary">
                <h3 class="bz-registration__payment-subtitle">Order Summary</h3>

                <div class="bz-registration__payment-details">
                  <div class="bz-registration__payment-item">
                    <span class="bz-registration__payment-label">Ticket:</span>
                    <span class="bz-registration__payment-value">{selectedTicket.value}</span>
                  </div>

                  <div class="bz-registration__payment-item">
                    <span class="bz-registration__payment-label">Name:</span>
                    <span class="bz-registration__payment-value">{fullName.value}</span>
                  </div>

                  <div class="bz-registration__payment-item">
                    <span class="bz-registration__payment-label">Email:</span>
                    <span class="bz-registration__payment-value">{email.value}</span>
                  </div>

                  <div class="bz-registration__payment-item">
                    <span class="bz-registration__payment-label">Payment Method:</span>
                    <span class="bz-registration__payment-value">{paymentMethod.value}</span>
                  </div>
                </div>
              </div>

              <div class="bz-registration__payment-form">
                <h3 class="bz-registration__payment-subtitle">Payment Information</h3>

                {paymentMethod.value === 'Credit/Debit Card' && (
                  <div class="bz-registration__payment-card-form">
                    <div class="bz-registration__form-group bz-registration__form-group--full">
                      <label class="bz-registration__form-label">Card Number<span class="bz-registration__required">*</span></label>
                      <input
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        class="bz-registration__form-input"
                      />
                    </div>

                    <div class="bz-registration__form-row">
                      <div class="bz-registration__form-group">
                        <label class="bz-registration__form-label">Expiry Date<span class="bz-registration__required">*</span></label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          class="bz-registration__form-input"
                        />
                      </div>

                      <div class="bz-registration__form-group">
                        <label class="bz-registration__form-label">CVV<span class="bz-registration__required">*</span></label>
                        <input
                          type="text"
                          placeholder="123"
                          class="bz-registration__form-input"
                        />
                      </div>
                    </div>

                    <div class="bz-registration__form-group bz-registration__form-group--full">
                      <label class="bz-registration__form-label">Cardholder Name<span class="bz-registration__required">*</span></label>
                      <input
                        type="text"
                        placeholder="Name on card"
                        class="bz-registration__form-input"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod.value === 'PayPal' && (
                  <div class="bz-registration__payment-paypal-form">
                    <p class="bz-registration__payment-message">
                      You will be redirected to PayPal to complete your payment securely.
                    </p>
                  </div>
                )}

                <div class="bz-registration__payment-actions">
                  <button class="bz-registration__back-btn" onClick={goBackToForm}>
                    Back to Information
                  </button>

                  <button class="bz-registration__submit-btn" onClick={handleSubmit}>
                    Complete Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    return () => (
      <div>
        {currentStep.value === 1 && renderFillInformationStep()}
        {currentStep.value === 2 && renderPaymentStep()}
      </div>
    );
  }
});

export default defineComponent({
  components: {
    FillInformation
  }
});
</script>

<style lang="scss">
.bz-registration {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  &__content {
    display: flex;
    flex-direction: row;

    @media (max-width: 992px) {
      flex-direction: column;
    }
  }

  &__ticket {
    width: 40%;
    background-color: #051562;
    color: white;
    padding: 40px 32px;

    @media (max-width: 992px) {
      width: 100%;
    }
  }

  &__form {
    width: 60%;
    background-color: white;
    padding: 40px 32px;

    @media (max-width: 992px) {
      width: 100%;
    }
  }

  &__payment {
    background-color: white;
    padding: 40px 32px;
  }

  &__title {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 32px;
    color: white;
  }

  &__form-title,
  &__payment-title {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 32px;
    color: #051562;
  }

  &__section,
  &__payment-summary,
  &__payment-form {
    margin-bottom: 32px;
  }

  &__section-title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 16px;
    color: white;
  }

  &__form-section {
    margin-bottom: 32px;
  }

  &__form-subtitle,
  &__payment-subtitle {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 20px;
    color: #051562;
  }

  &__ticket-options {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
  }

  &__ticket-option {
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 16px;
    transition: all 0.3s ease;

    &--active {
      background-color: #00C3FF;
      border-color: #00C3FF;

      .bz-registration__ticket-price,
      .bz-registration__ticket-type {
        color: #051562;
      }
    }
  }

  &__ticket-label {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  &__ticket-input {
    margin-right: 12px;
  }

  &__ticket-content {
    flex-grow: 1;
  }

  &__ticket-price {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 4px;
  }

  &__ticket-type {
    font-size: 12px;
    opacity: 0.8;
  }

  &__features {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__feature {
    display: flex;
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__feature-icon {
    margin-right: 12px;
    font-size: 18px;
  }

  &__feature-text {
    font-size: 14px;
    line-height: 1.4;
  }

  &__note {
    font-size: 14px;
  }

  &__note-item {
    display: flex;
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__note-icon {
    margin-right: 12px;
    font-size: 18px;
  }

  &__note-text {
    line-height: 1.4;

    &--highlight {
      color: #00C3FF;
    }
  }

  &__form-row {
    display: flex;
    gap: 16px;
    margin-bottom: 20px;

    @media (max-width: 576px) {
      flex-direction: column;
    }
  }

  &__form-group {
    flex: 1;
    margin-bottom: 20px;

    &--full {
      width: 100%;
    }
  }

  &__form-label {
    display: block;
    font-size: 14px;
    margin-bottom: 8px;
    color: #333;
  }

  &__required {
    color: #F03D3E;
    margin-left: 2px;
  }

  &__form-input-wrapper {
    position: relative;
  }

  &__form-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    color: #777;
  }

  &__form-input,
  &__form-select {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #DDD;
    border-radius: 8px;
    font-size: 16px;

    &::placeholder {
      color: #AAA;
    }

    &:focus {
      outline: none;
      border-color: #00C3FF;
    }
  }

  &__form-select-wrapper {
    position: relative;
  }

  &__form-select {
    appearance: none;
    padding-right: 40px;
  }

  &__payment-options {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    margin-bottom: 24px;
  }

  &__payment-option {
    border: 1px solid #DDD;
    border-radius: 8px;
    padding: 16px;

    &--active {
      border-color: #00C3FF;
      background-color: rgba(0, 195, 255, 0.05);
    }
  }

  &__payment-label {
    display: flex;
    width: 100%;
    cursor: pointer;
  }

  &__payment-input {
    margin-right: 12px;
    margin-top: 2px;
  }

  &__payment-content {
    flex-grow: 1;
  }

  &__payment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  &__payment-title {
    font-weight: 600;
    font-size: 16px;
    color: #333;
  }

  &__payment-description {
    font-size: 14px;
    color: #666;
    margin-bottom: 12px;
  }

  &__payment-cards {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__payment-card-icon {
    height: 24px;
    width: auto;
  }

  &__payment-details {
    background-color: #F8F9FA;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 24px;
  }

  &__payment-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
      padding-top: 12px;
      border-top: 1px solid #DDD;
      font-weight: 600;
    }
  }

  &__payment-label {
    color: #666;
  }

  &__payment-value {
    font-weight: 500;
  }

  &__payment-message {
    text-align: center;
    font-size: 16px;
    padding: 20px;
    background-color: #F8F9FA;
    border-radius: 8px;
    margin-bottom: 24px;
  }

  &__payment-actions {
    display: flex;
    justify-content: space-between;
    gap: 16px;
  }

  &__back-btn {
    flex: 1;
    background-color: #F8F9FA;
    color: #333;
    border: 1px solid #DDD;
    border-radius: 32px;
    padding: 16px;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #E9ECEF;
    }
  }

  &__submit-btn {
    width: 100%;
    flex: 2;
    background-color: #F03D3E;
    color: white;
    border: none;
    border-radius: 32px;
    padding: 16px;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: darken(#F03D3E, 5%);
    }
  }

  &__submit-icon {
    margin-right: 8px;
  }
}
</style>
