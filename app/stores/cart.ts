import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface CartItem {
  id: string
  type: string
  image: string
  name: string
  price: number
  currency: string
  stock: number | null
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  function loadCart() {
    if (typeof window !== 'undefined') {
      const data = window.localStorage.getItem('baynanza_cart')
      if (data) {
        try {
          items.value = JSON.parse(data)
        } catch {
          items.value = []
        }
      }
    }
  }

  function saveCart() {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('baynanza_cart', JSON.stringify(items.value))
    }
  }

  function addToCart(item: CartItem) {
    const idx = items.value.findIndex(i => i.id === item.id && i.type === item.type)
    if (idx !== -1 && items.value[idx]) {
      items.value[idx].stock = (items.value[idx].stock ?? 0) + (item.stock ?? 0)
    } else {
      items.value.push({ ...item })
    }
    saveCart()
  }

  function increase(id: string, type: string) {
    const idx = items.value.findIndex(i => i.id === id && i.type === type)
    if (idx !== -1 && items.value[idx]) {
      if ((items.value[idx].stock ?? 0) < 20) {
        items.value[idx].stock = (items.value[idx].stock ?? 0) + 1
      }
      saveCart()
    }
  }

  function decrease(id: string, type: string) {
    const idx = items.value.findIndex(i => i.id === id && i.type === type)
    if (idx !== -1 && items.value[idx] && (items.value[idx].stock ?? 0) > 1) {
      items.value[idx].stock = (items.value[idx].stock ?? 0) - 1
      saveCart()
    }
  }

  function remove(id: string, type: string) {
    items.value = items.value.filter(i => !(i.id === id && i.type === type))
    saveCart()
  }

  const total = computed(() =>
	items.value.reduce(
	  (sum, item) =>
		sum + (Number(item.stock) || 0) * (Number(item.price) || 0),
	  0
	)
  )

  function clearCart() {
    items.value = []
    saveCart()
  }

  return {
    items,
    total,
    addToCart,
    increase,
    decrease,
    remove,
    loadCart,
    saveCart,
    clearCart
  }
})