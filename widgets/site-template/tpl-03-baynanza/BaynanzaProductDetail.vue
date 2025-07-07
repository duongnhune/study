<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePageStore, storeToRefs, useI18n, useRouter } from '#imports'

const props = defineProps<{
  checkoutPath: string
  backgroundImage: string
}>()

const { n } = useI18n()
const router = useRouter()

const pageStore = usePageStore()
const { productDetailData } = storeToRefs(pageStore)
const product = computed(() => productDetailData.value.product)

const quantity = ref<number>(1)

function increase() {
  if (quantity.value < 20) {
    quantity.value++
  }
}

function decrease() {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const buyLoading = ref(false)

function buyNow() {
  const payload = {
    products: [
      {
        productID: product.value?.id,
        quantity: quantity.value
      }
    ]
  }

  const encodedPayload = encodeURIComponent(JSON.stringify(payload));
  return router.push({
    path: props.checkoutPath,
    query: { payload: encodedPayload }
  });

}
</script>

<template>
  <div class="bz-block w-product-detail">
    <!-- Background Image -->
    <div class="w-product-detail__bg" :style="{ backgroundImage: `url(${props.backgroundImage})` }"></div>

    <div class="container">
      <!-- Breadcrumb Navigation -->
      <nav class="w-breadcrumb">
        <a href="/" class="w-breadcrumb__item">Home</a>
        <span class="w-breadcrumb__separator">&gt;</span>
        <span class="w-breadcrumb__item w-breadcrumb__item--current">
          {{ product?.name }}
        </span>
      </nav>

      <!-- Product Content -->
      <div class="w-product-detail__content" v-if="product">
        <!-- Product Image -->
        <div class="w-product-detail__image-section">
          <div class="w-product-detail__image-wrapper">
            <img v-if="product.images?.[0]" :src="product.images[0]" :alt="product.name"
              class="w-product-detail__image" />
          </div>
        </div>

        <!-- Product Info -->
        <div class="w-product-detail__info-section">
          <div class="w-product-detail__info">
            <!-- Product Title -->
            <h1 class="w-product-detail__title">{{ product.name }}</h1>

            <!-- Product Price -->
            <div class="w-product-detail__price">
              {{ n(product.price || 0, 'currencyVND') }}
            </div>

            <!-- Product Description -->
            <div class="w-product-detail__description" v-html="product.description"></div>

            <!-- Divider -->
            <hr class="w-product-detail__divider">

            <!-- Purchase Actions -->
            <div class="w-product-detail__actions">
              <!-- Quantity Selector -->
              <div class="w-quantity-selector">
                <button class="w-quantity-selector__btn w-quantity-selector__btn--decrease" @click="decrease"
                  :disabled="quantity <= 1">
                  -
                </button>
                <span class="w-quantity-selector__value">
                  {{ quantity.toString().padStart(2, '0') }}
                </span>
                <button class="w-quantity-selector__btn w-quantity-selector__btn--increase" @click="increase"
                  :disabled="quantity >= 20">
                  +
                </button>
              </div>

              <!-- Buy Button -->
              <button class="btn btn-lg btn-primary rounded-pill w-product-detail__buy-btn" @click="buyNow">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// =============================================================================
// PRODUCT DETAIL WIDGET
// =============================================================================

.w-product-detail {
  position: relative;
  padding-top: 40px;
  padding-bottom: 100px;

  background-color: var(--bs-dark);
  color: var(--text-color-site);

  @media (min-width: 768px) {
    padding-top: 40px;
    padding-bottom: 120px;
  }

  @media (min-width: 992px) {
    padding-top: 40px;
    padding-bottom: 160px;
  }

  // Background image
  &__bg {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  // Main content grid
  &__content {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr;
    gap: 48px;
    align-items: start;

    @media (min-width: 992px) {
      grid-template-columns: 1fr 1fr;
      gap: 48px;
    }
  }

  // Image section
  &__image-section {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__image-wrapper {
    width: 100%;
    max-width: 480px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__image {
    width: 100%;
    height: auto;
    max-height: 420px;
    object-fit: contain;
    display: block;
  }

  // Info section
  &__info-section {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__info {
    width: 100%;
    max-width: 520px;
  }

  &__title {
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--text-color-title);
    margin-bottom: 8px;

    @media (min-width: 768px) {
      font-size: 20px;
    }

    @media (min-width: 992px) {
      font-size: 24px;
    }
  }

  &__price {
    margin-bottom: 16px;
    font-size: 20px;
    font-weight: 300;
    color: var(--text-color-site);

    @media (max-width: 480px) {
      font-size: 18px;
    }
  }

  &__description {
    font-size: 16px;
    font-weight: 300;
    color: var(--text-color-desc);
    line-height: 1.6;

    @media (max-width: 480px) {
      font-size: 14px;
    }
  }

  &__divider {
    width: 100%;
    height: 1px;
    background-color: var(--text-color-site);
    border: none;
    margin: 16px 0;
    opacity: 0.5;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 16px;

    @media (max-width: 480px) {
      flex-direction: column;
      align-items: stretch;
      gap: 8px;
    }
  }

  &__buy-btn {
    height: 44px;
    min-width: 140px;
    font-size: 16px;
    font-weight: 300;
    letter-spacing: 1px;
    padding: 0 32px;

    @media (max-width: 480px) {
      width: 100%;
      height: 36px;
      font-size: 15px;
      min-width: unset;
    }
  }

  // Error state
  &__error {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 48px 0;
  }

  &__error-text {
    color: var(--text-color-site);
    font-size: 16px;
    margin: 0;
  }
}

// =============================================================================
// BREADCRUMB WIDGET
// =============================================================================

.w-breadcrumb {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  margin-bottom: 32px;

  @media (max-width: 480px) {
    font-size: 13px;
    margin-bottom: 18px;
  }

  &__item {
    color: var(--text-color-site);
    text-decoration: none;
    opacity: 0.7;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 1;
    }

    &--current {
      opacity: 1;
      font-weight: 400;
    }
  }

  &__separator {
    color: var(--text-color-site);
    opacity: 0.5;
  }
}

// =============================================================================
// QUANTITY SELECTOR WIDGET
// =============================================================================

.w-quantity-selector {
  display: flex;
  align-items: center;
  border: 1px solid var(--text-color-site);
  border-radius: 24px;
  overflow: hidden;
  height: 44px;
  min-width: 120px;
  background: transparent;

  @media (max-width: 480px) {
    width: 100%;
    height: 36px;
    min-width: unset;
  }

  &__btn {
    width: 44px;
    height: 44px;
    background: transparent;
    color: var(--text-color-site);
    border: none;
    font-size: 22px;
    font-weight: 400;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 480px) {
      width: 36px;
      height: 36px;
      font-size: 18px;
    }

    &:hover:not(:disabled) {
      color: var(--bs-primary);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &__value {
    flex: 1;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 2px;
    color: var(--text-color-site);
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 48px;

    @media (max-width: 480px) {
      font-size: 15px;
      min-width: 36px;
    }
  }
}
</style>