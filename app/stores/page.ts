// stores/page.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SitePublication, Event, Product } from '@breezingin/breezing-shared'

export interface EventDetailData {
  event: Event | null
  eventPublication: SitePublication<Event> | null
}

export interface TicketRegistrationData {
  eventIDParam: string | null
  reservationIDParam: string | null
}

export interface ProductDetailData {
  product: Product | null
  productPublication: SitePublication<Product> | null
}

export interface CheckoutData {
  reservationIDParam: string | null
  URIPayload: any | null
}

export const usePageStore = defineStore('page', () => {

  const eventDetailData = ref<EventDetailData>({
    event: null,
    eventPublication: null
  })

  const checkoutData = ref<CheckoutData>({
    reservationIDParam: null,
    URIPayload: null
  })

  const ticketRegistrationData = ref<TicketRegistrationData>({
    eventIDParam: null,
    reservationIDParam: null
  })

  const productDetailData = ref<ProductDetailData>({
    product: null,
    productPublication: null
  })

  function setEventDetailData(data: EventDetailData) {
    eventDetailData.value = data
  }

  function setCheckoutData(data: CheckoutData) {
    checkoutData.value = data
  }

  function setTicketRegistrationData(data: TicketRegistrationData) {
    ticketRegistrationData.value = data
  }


  function getEventDetailData() {
    return eventDetailData.value
  }

  function getTicketRegistrationData() {
    return ticketRegistrationData.value
  }

  function getCheckoutData() {
    return checkoutData.value
  }

  function setProductDetailData(data: ProductDetailData) {
    productDetailData.value = data
  }

  return {
    eventDetailData,
    ticketRegistrationData,
    productDetailData,
    checkoutData,
    setEventDetailData,
    setCheckoutData,
    setTicketRegistrationData,
    setProductDetailData,
    getEventDetailData,
    getTicketRegistrationData,
    getCheckoutData
  } 
})