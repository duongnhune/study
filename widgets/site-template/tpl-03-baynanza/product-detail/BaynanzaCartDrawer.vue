<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useCartStore, storeToRefs, useSiteStore } from '#imports';
import { PageType } from '@breezingin/breezing-shared';

const open = ref(false)

defineProps<{
  backgroundImage: string,
  formID?: string
}>()

const cartStore = useCartStore()
const site = useSiteStore()
const { items, total } = storeToRefs(cartStore)

function closeDrawer() {
  open.value = false
}

const checkoutLink = computed(() => {
  return site.pages.find(p => p.type === PageType.ItemsCheckout)?.slug || ''
})

function increase(item: any) {
  cartStore.increase(item.id, item.type)
}

function decrease(item: any) {
  if (item.stock === 1) {
    cartStore.remove(item.id, item.type)
  } else {
    cartStore.decrease(item.id, item.type)
  }
}

onMounted(() => {
  cartStore.loadCart()

  // Add product to cart
  $(window).on('open-baynanza-cart-drawer', function() {
    open.value = true
  })
})
</script>

<template>
  <div>
    <!-- Cart Open Button -->
    <button
      class="bz-cart-drawer__open-btn"
      @click="open = true"
      v-show="!open"
      aria-label="Open cart"
    >
      <span class="material-symbols-outlined">shopping_cart</span>
    </button>
    <!-- Drawer -->
    <transition name="bz-cart-drawer-fade">
      <div
        v-show="open"
        class="bz-cart-drawer"
        tabindex="-1"
        aria-modal="true"
        role="dialog"
      >
        <div class="bz-cart-drawer__overlay" @click="closeDrawer"></div>
        <aside class="bz-cart-drawer__panel">
          <header class="bz-cart-drawer__header">
            <span class="bz-cart-drawer__title">Your Cart</span>
            <button class="bz-cart-drawer__close" @click="closeDrawer">
              <span class="material-symbols-outlined">close</span>
            </button>
          </header>
          <div class="bz-cart-drawer__body">
            <div v-if="items.length === 0" class="bz-cart-drawer__empty">
              Cart is empty
            </div>
            <ul v-else class="bz-cart-drawer__list">
              <li v-for="item in items" :key="item.id + '-' + item.type" class="bz-cart-drawer__item">
                <img :src="item.image" :alt="item.name" class="bz-cart-drawer__item-img" />
                <div class="bz-cart-drawer__item-info">
                  <div class="bz-cart-drawer__item-name">{{ item.name }}</div>
                  <div class="bz-cart-drawer__item-price">
                    {{ (item.price ?? 0).toLocaleString() }} {{ item.currency ?? 'VND' }}
                  </div>
                  <div class="bz-cart-drawer__item-qty">
                    <button @click="decrease(item)" class="bz-cart-drawer__qty-btn">-</button>
                    <span class="bz-cart-drawer__qty-value">{{ item.stock }}</span>
                    <button @click="increase(item)" class="bz-cart-drawer__qty-btn">+</button>
                  </div>
                </div>
                <button
                  @click="cartStore.remove(item.id, item.type)"
                  class="bz-cart-drawer__remove-btn"
                  aria-label="Remove item"
                >
                  <span class="material-symbols-outlined">delete</span>
                </button>
              </li>
            </ul>
          </div>
          <footer class="bz-cart-drawer__footer" v-if="items.length > 0">
            <div class="bz-cart-drawer__total-row">
              <span>Total</span>
              <span class="bz-cart-drawer__total-amount">
                {{ (total ?? 0).toLocaleString() }} {{ (items[0]?.currency ?? 'VND') }}
              </span>
            </div>
            <NuxtLink class="btn btn-primary btn-lg rounded-pill bz-cart-drawer__checkout" :to="checkoutLink">
              Checkout
            </NuxtLink>
          </footer>
        </aside>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.bz-cart-drawer {
  position: fixed;
  inset: 0;
  z-index: 1200;
  display: flex;
  justify-content: flex-end;
  pointer-events: auto;
  font-family: var(--font-site, InterVariable, sans-serif);

  &__overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.5);
    z-index: 0;
    cursor: pointer;
  }

  &__panel {
    position: relative;
    z-index: 1;
    width: 400px;
    max-width: 100vw;
    height: 100%;
    background: #181818;
    color: #fff;
    display: flex;
    flex-direction: column;
    box-shadow: -8px 0 24px rgba(0,0,0,0.25);
    animation: bz-cart-drawer-slide-in 0.3s cubic-bezier(.4,0,.2,1);
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 28px 28px 16px 28px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }

  &__title {
    font-size: 22px;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  &__close {
    background: transparent;
    border: none;
    color: #fff;
    font-size: 28px;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
  }

  &__body {
    flex: 1 1 auto;
    overflow-y: auto;
    padding: 24px 28px;
    min-height: 120px;
  }

  &__empty {
    text-align: center;
    color: #fff;
    opacity: 0.7;
    font-size: 16px;
    margin-top: 60px;
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__item {
    display: flex;
    gap: 18px;
    align-items: center;
    position: relative;
  }

  &__item-img {
    width: 72px;
    height: 72px;
    object-fit: cover;
    border-radius: 12px;
    background: #222;
    flex-shrink: 0;
  }

  &__item-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__item-name {
    font-size: 15px;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  &__item-price {
    font-size: 15px;
    font-weight: 300;
    color: var(--text-color-desc, rgba(255,255,255,0.7));
  }

  &__item-qty {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 4px;
  }

  &__qty-btn {
    width: 32px;
    height: 32px;
    border: none;
    background: #232323;
    color: #fff;
    font-size: 18px;
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
      background: #fff;
      color: #000;
    }
  }

  &__qty-value {
    width: 32px;
    text-align: center;
    font-size: 15px;
    font-weight: 400;
    user-select: none;
  }

  &__footer {
    padding: 24px 28px;
    border-top: 1px solid rgba(255,255,255,0.1);
    background: #181818;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  &__total-row {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 8px;
  }

  &__total-amount {
    font-size: 18px;
    font-weight: 600;
    color: #fff;
  }

  &__checkout {
    width: 100%;
    font-size: 17px;
    font-weight: 500;
    padding: 12px 0;
    border-radius: 24px;
    margin-top: 8px;
  }
}

.bz-cart-drawer__open-btn {
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1199;
  background: #232323;
  color: #fff;
  border: none;
  border-radius: 24px 0 0 24px;
  box-shadow: 2px 2px 8px rgba(0,0,0,0.15);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 28px;
  opacity: 0.85;
  &:hover {
    background: #fff;
    color: #232323;
    opacity: 1;
  }
}

@media (max-width: 600px) {
  .bz-cart-drawer__panel {
    width: 100vw;
    padding: 0;
  }
  .bz-cart-drawer__header,
  .bz-cart-drawer__body,
  .bz-cart-drawer__footer {
    padding-left: 16px;
    padding-right: 16px;
  }
  .bz-cart-drawer__open-btn {
    width: 40px;
    height: 40px;
    font-size: 22px;
  }
}

@keyframes bz-cart-drawer-slide-in {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.bz-cart-drawer-fade-enter-active,
.bz-cart-drawer-fade-leave-active {
  transition: opacity 0.2s;
}
.bz-cart-drawer-fade-enter-from,
.bz-cart-drawer-fade-leave-to {
  opacity: 0;
}

.bz-cart-drawer__item {
  display: flex;
  gap: 18px;
  align-items: center;
  position: relative;
}
.bz-cart-drawer__remove-btn {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 28px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 8px;
  transition: background 0.2s, color 0.2s;
}
.bz-cart-drawer__remove-btn:hover {
  background: rgba(255,255,255,0.12);
  color: #c62828;
}
</style>