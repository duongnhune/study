<template>
  <div class="checkout-form">
    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-if="!reservation" class="selection-step">
      <h2>Select Tickets and Products</h2>

      <!-- Ticket Selection -->
      <div v-if="form?.checkoutSetting?.ticketEnabled && ticketCategories.length > 0" class="ticket-section">
        <h3>Tickets</h3>
        <div v-for="category in ticketCategories" :key="category.id" class="ticket-category">
          <div class="ticket-info">
            <h4>{{ category.name }}</h4>
            <p>{{ category.description }}</p>
            <p class="price">{{ category.price }} {{ event?.currency }}</p>
          </div>
          <div class="ticket-actions">
            <button @click="removeTicket(category)" :disabled="getTicketQuantity(category.id) === 0">-</button>
            <span>{{ getTicketQuantity(category.id) }}</span>
            <button @click="addTicket(category)">+</button>
          </div>
        </div>
      </div>

      <!-- Product Selection -->
      <div v-if="form?.checkoutSetting?.productEnabled && products.length > 0" class="product-section">
        <h3>Products</h3>
        <div v-for="product in products" :key="product.id" class="product">
          <div class="product-info">
            <h4>{{ product.name }}</h4>
            <p>{{ product.description }}</p>
            <p class="price">{{ product.price }} {{ event?.currency }}</p>
          </div>
          <div class="product-actions">
            <button @click="removeProduct(product)" :disabled="getProductQuantity(product.id) === 0">-</button>
            <span>{{ getProductQuantity(product.id) }}</span>
            <button @click="addProduct(product)">+</button>
          </div>
        </div>
      </div>

      <div class="total-price">
        Total: {{ totalPrice }} {{ event?.currency }}
      </div>

      <button
        class="proceed-button"
        :disabled="!canProceed"
        @click="createReservation"
      >
        Proceed to Checkout
      </button>
    </div>

    <!-- Checkout Form -->
    <div v-else class="checkout-step">
      <h2>Complete Your Order</h2>
      <form @submit.prevent="submitForm">
        <!-- Personal Information -->
        <div class="form-section">
          <h3>Personal Information</h3>
          <div class="form-group">
            <label for="name">Name *</label>
            <input 
              id="name"
              v-model="formData.name"
              type="text"
              required
            >
          </div>
          <div class="form-group">
            <label for="email">Email *</label>
            <input 
              id="email"
              v-model="formData.email"
              type="email"
              required
            >
          </div>
          <div class="form-group">
            <label for="phone">Phone</label>
            <input 
              id="phone"
              v-model="formData.phone"
              type="tel"
            >
          </div>
        </div>

        <!-- Ticket Information -->
        <div v-if="reservation?.reservationTickets?.length" class="ticket-info">
          <h4>Selected Tickets</h4>
          <div v-for="ticket in reservation.reservationTickets" :key="ticket.id">
            <p>{{ getTicketCategoryName(ticket.ticketCategoryID) }}</p>
            <p>Name: {{ ticket.name }}</p>
            <p>Email: {{ ticket.email }}</p>
            <p v-if="ticket.phone">Phone: {{ ticket.phone }}</p>
          </div>
        </div>

        <!-- Product Information -->
        <div v-if="reservation?.reservationProducts?.length" class="product-info">
          <h4>Selected Products</h4>
          <div v-for="product in reservation.reservationProducts" :key="product.id">
            <p>{{ product.productName }}</p>
            <p>Quantity: {{ product.quantity }}</p>
          </div>
        </div>

        <!-- Custom Fields -->
        <div v-for="field in form?.customFields" :key="field.key" class="form-group">
          <label :for="field.key">{{ field.label }}</label>
          <input
            v-if="field.type === 'text'"
            :id="field.key"
            v-model="formData.customFields[field.key]"
            type="text"
            :required="field.required"
          />
          <select
            v-else-if="field.type === 'select'"
            :id="field.key"
            v-model="formData.customFields[field.key]"
            :required="field.required"
          >
            <option value="">Select an option</option>
            <option v-for="option in field.options" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>

        <!-- Submit Button -->
        <div class="form-actions">
          <button 
            type="submit"
            class="submit-button"
            :disabled="loading"
          >
            {{ loading ? 'Processing...' : 'Complete Order' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Form, Event, TicketCategory, Product, Reservation } from '@breezing/shared/src/schemas'
import { useCheckoutForm } from '../../composables/use-checkout-form'

const props = defineProps<{
  form: Form
  event: Event
  ticketCategories: TicketCategory[]
  products: Product[]
}>()

const {
  state,
  createReservation,
  finalizeReservation,
  addTicket,
  removeTicket,
  addProduct,
  removeProduct,
  getTotalPrice
} = useCheckoutForm()

const formData = ref({
  name: '',
  email: '',
  phone: '',
  customFields: {} as Record<string, string>
})

const loading = computed(() => state.value.loading)
const error = computed(() => state.value.error)
const reservation = computed(() => state.value.reservation)
const totalPrice = computed(() => getTotalPrice.value)

const canProceed = computed(() => {
  const hasTickets = Array.from(state.value.selectedTickets.values()).some(qty => qty > 0)
  const hasProducts = Array.from(state.value.selectedProducts.values()).some(qty => qty > 0)
  return hasTickets || hasProducts
})

const getTicketQuantity = (ticketCategoryId: string) => {
  return state.value.selectedTickets.get(ticketCategoryId) || 0
}

const getProductQuantity = (productId: string) => {
  return state.value.selectedProducts.get(productId) || 0
}

const getTicketCategoryName = (ticketCategoryId: string) => {
  const category = props.ticketCategories.find(c => c.id === ticketCategoryId)
  return category?.name || ''
}

const submitForm = async () => {
  if (!reservation.value) return

  await finalizeReservation(
    formData.value.name,
    formData.value.email,
    formData.value.phone
  )
}
</script>

<style scoped>
.checkout-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.error-message {
  color: red;
  margin-bottom: 20px;
}

.selection-step,
.checkout-step {
  margin-bottom: 30px;
}

.ticket-section,
.product-section {
  margin-bottom: 30px;
}

.ticket-category,
.product {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  border-radius: 4px;
}

.ticket-info,
.product-info {
  flex: 1;
}

.ticket-actions,
.product-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

button {
  padding: 5px 10px;
  border: 1px solid #ddd;
  background: #fff;
  cursor: pointer;
  border-radius: 4px;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.proceed-button {
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  margin-top: 20px;
}

.total-price {
  font-size: 1.2em;
  font-weight: bold;
  margin: 20px 0;
}

.form-section {
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.ticket-info,
.product-info {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

h3 {
  margin-bottom: 15px;
  color: #444;
}

h4 {
  margin-bottom: 10px;
  color: #555;
}

.form-actions {
  margin-top: 20px;
}

.submit-button {
  width: 100%;
  padding: 12px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.submit-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style> 