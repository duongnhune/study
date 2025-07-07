<script setup lang="ts">
import { defineProps } from 'vue';

interface Product {
    name: string;
    category: string;
    price: string;
    image: string;
    link?: string;
}

interface Props {
    title: string;
    products: Product[];
}

defineProps<Props>();
</script>

<template>
  <div class="bz-block is-padding-top is-padding-bottom bz-block-html-content myanh-block-product" id="myanh-block-product">
    <div class="container">
      <div class="bz-html-content">
        <div class="bz-box is-center">
          <div class="bz-box__title">
            <div class="bz-box__title__main">
              <div class="bz-box__title__name">{{ title }}</div>
            </div>
          </div>
          <div class="bz-box__content">
            <div class="bz-product-grid">
              <div class="row">
                <div v-for="(product, index) in products" :key="index" class="col-12 col-sm-6 col-lg-3">
                  <div class="bz-product-item">
                    <div class="bz-product-item__image">
                      <a :href="product.link || '#'">
                        <img :src="product.image" :alt="product.name">
                      </a>
                    </div>
                    <div class="bz-product-item__content">
                      <div class="bz-product-item__name">{{ product.name }}</div>
                      <div class="bz-product-item__category">{{ product.category }}</div>
                      <div class="bz-product-item__price">{{ product.price }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--end bz-product-grid-->
          </div>
          <!--end bz-box__content-->
        </div>
        <!--end bz-box-->
      </div>
      <!--end bz-html-content-->
    </div>
    <!--end container-->
  </div>
</template>

<style scoped>
.bz-product-grid {
  margin-top: 2rem;
}

.bz-product-item {
  margin-bottom: 2rem;
  text-align: center;
}

.bz-product-item__image {
  margin-bottom: 1rem;
  overflow: hidden;
  border-radius: 0;
  background-color: #f5f5f5;
  aspect-ratio: 1;
}

.bz-product-item__image a {
  display: block;
  width: 100%;
  height: 100%;
}

.bz-product-item__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.bz-product-item:hover .bz-product-item__image img {
  transform: scale(1.02);
}

.bz-product-item__content {
  padding: 0 0.5rem;
}

.bz-product-item__name {
  font-size: 16px;
  line-height: 1.4;
  margin-bottom: 0.25rem;
  color: var(--text-color-title);
  font-weight: 400;
}

.bz-product-item__category {
  font-size: 14px;
  color: var(--text-color-desc);
  margin-bottom: 0.5rem;
  text-transform: capitalize;
}

.bz-product-item__price {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color-site);
}

/* Responsive adjustments */
@media (min-width: 576px) {
  .bz-product-item {
    margin-bottom: 2.5rem;
  }
}

@media (min-width: 768px) {
  .bz-product-item__name {
    font-size: 17px;
  }
  
  .bz-product-item__price {
    font-size: 17px;
  }
}

@media (min-width: 992px) {
  .bz-product-grid {
    margin-top: 2.5rem;
  }
  
  .bz-product-item {
    margin-bottom: 3rem;
  }
  
  .bz-product-item__name {
    font-size: 18px;
  }
  
  .bz-product-item__category {
    font-size: 15px;
  }
  
  .bz-product-item__price {
    font-size: 18px;
  }
}

@media (min-width: 1200px) {
  .bz-product-grid {
    margin-top: 3rem;
  }
}
</style>