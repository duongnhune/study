<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useSitePublication, useI18n } from '#imports';
import { useSiteStore } from '#imports';
import { PageType } from '@breezingin/breezing-shared';
import type { Product } from '@breezingin/breezing-shared';

const { items, loading, error, fetchPublications } = useSitePublication<Product>();
const site = useSiteStore();
const { n } = useI18n();

onMounted(() => {
  fetchPublications({ entityType: 'product' });
});

const productDetailPageSlug = computed(() => {
  return site.pages.find(p => p.type === PageType.ProductDetail)?.slug || '';
});

const gridItems = computed(() =>
  items.value.map(pub => ({
    image: pub.entity?.images?.[0],
    currency: pub.entity?.currency,
    name: pub.entity?.name,
    price: pub.entity?.price,
    buttonText: 'View Detail',
    slug: pub.slug,
    id: pub.entity?.id,
  }))
);
</script>

<template>
  <div class="bz-block is-padding-top-small is-padding-bottom-small baynanza-block-product" id="baynanza-block-product">
    <div class="container">
      <div class="bz-product-grid">
        <ul>
          <li v-for="(item, idx) in gridItems" :key="idx">
            <div class="bz-product-item">
              <div class="bz-product-item__img">
                <NuxtLink :to="`${productDetailPageSlug}/${item.slug}`">
                  <img :src="item.image" :alt="item.name">
                </NuxtLink>
              </div>
              <div class="bz-product-item__content">
                <div class="bz-product-item__row">
                  <h3 class="bz-product-item__title">
                    <PageLink :to="`${productDetailPageSlug}/${item.slug}`">{{ item.name }}</PageLink>
                  </h3>
                  <div class="bz-product-item__price">{{ (item.price ?? 0) ? n(item.price ?? 0, 'currency' +
                    (item.currency ?? 'VND')) : n(0, 'currency' + (item.currency ?? 'VND')) }}</div>
                </div>
                <div class="bz-product-item__row">
                  <NuxtLink :to="`${productDetailPageSlug}/${item.slug}`" class="btn btn-outline-light">{{
                    item.buttonText }}</NuxtLink>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--end bz-product-grid-->
  </div>
</template>

<style lang="scss" scoped>
/*---------- baynanza-block-product css ----------*/
.bz-product-item .bz-product-item__img {
  padding-top: 113.8686131387%;
  position: relative;
  z-index: 1;
  overflow: hidden;
  margin-bottom: 1rem;
}

.bz-product-item .bz-product-item__img a {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.bz-product-item .bz-product-item__img img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}

.bz-product-item .bz-product-item__content {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
}

.bz-product-item h3.bz-product-item__title {
  margin-bottom: 0;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
}

.bz-product-item h3.bz-product-item__title a {
  color: #fff;
  text-decoration: none;
}

.bz-product-item .bz-product-item__price {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.bz-product-item .btn {
  min-width: 70px;
  text-transform: uppercase;
  -moz-border-radius: 0;
  -webkit-border-radius: 0;
  border-radius: 0;
}

.bz-product-grid>ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.bz-product-grid>ul>li {
  padding-bottom: 20px;
}

.baynanza-block-product {
  padding-left: 15px;
  padding-right: 15px;
}

@media (min-width: 768px) {
  .bz-product-grid>ul {
    margin-left: -12px;
    margin-right: -12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
  }

  .bz-product-grid>ul>li {
    padding-bottom: 24px;
    padding-left: 12px;
    padding-right: 12px;
    width: 50%;
  }

  .baynanza-block-product {
    padding-left: 24px;
    padding-right: 24px;
  }
}

@media (min-width: 992px) {
  .bz-product-grid>ul {
    margin-left: -16px;
    margin-right: -16px;
  }

  .bz-product-grid>ul>li {
    padding-left: 16px;
    padding-right: 16px;
  }
}

@media (min-width: 1200px) {
  .bz-product-grid>ul {
    margin-left: -24px;
    margin-right: -24px;
  }

  .bz-product-grid>ul>li {
    padding-bottom: 32px;
    padding-left: 24px;
    padding-right: 24px;
  }

  .baynanza-block-product {
    padding-left: 48px;
    padding-right: 48px;
  }
}

@media (min-width: 1600px) {
  .baynanza-block-product {
    max-width: 1512px;
    margin: 0 auto;
    padding-left: 0;
    padding-right: 0;
  }
}

/*---------- end baynanza-block-product css ----------*/
</style>