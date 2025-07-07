<script setup lang="ts">
import { defineProps } from 'vue';

interface Store {
    name: string;
    location: string;
    hotline: string;
    directionLink: string;
}

interface Props {
    title: string;
    stores: Store[];
}

defineProps<Props>();
</script>

<template>
  <div class="bz-block is-padding-top is-padding-bottom bz-block-html-content myanh-block-store" id="myanh-block-store">
    <div class="container">
      <div class="bz-html-content">
        <div class="bz-box is-center">
          <div class="bz-box__title">
            <div class="bz-box__title__main">
              <div class="bz-box__title__name">{{ title }}</div>
            </div>
          </div>
          <div class="bz-box__content">
            <div class="bz-store-list">
              <ul>
                <li v-for="(store, index) in stores" :key="index">
                  <div class="bz-store-item">
                    <div class="bz-store-item__left">
                      <div class="bz-store-item__title">{{ store.name }}</div>
                      <div class="bz-store-item__subtitle">{{ store.location }}</div>
                      <div class="bz-store-item__hotline">{{ store.hotline }}</div>
                    </div>
                    <div class="bz-store-item__right">
                      <div class="bz-store-item__btn">
                        <a class="btn btn-light rounded-pill" :href="store.directionLink" target="_blank">
                          <i class="material-symbols-outlined">location_on</i>
                          Direction
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <!--end bz-store-list-->
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
.bz-store-item .bz-store-item__left {
    margin-bottom: .75rem
}

.bz-store-item .bz-store-item__left:last-child {
    margin-bottom: 0
}

.bz-store-item .bz-store-item__title {
    font-size: 16px;
    color: var(--text-color-title);
    margin-bottom: 0.25rem;
}

.bz-store-item .bz-store-item__subtitle {
    font-size: 13px;
    color: var(--text-color-desc);
    margin-bottom: 0.25rem;
}

.bz-store-item .bz-store-item__hotline {
    font-size: 13px;
    color: var(--text-color-desc);
    margin-bottom: 0.5rem;
    text-decoration: underline;
}

.bz-store-item .bz-store-item__hotline:last-child {
    margin-bottom: 0
}

.bz-store-item .btn {
    min-width: 150px;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}

.bz-store-item .btn .material-symbols-outlined {
    font-size: 18px;
}

.bz-store-list>ul {
    list-style: none;
    margin: 0;
    padding: 0
}

.bz-store-list>ul>li {
    border-bottom: 1px solid #000;
    margin-bottom: 1.25rem;
    padding-bottom: 1.25rem
}

.bz-store-list>ul>li:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
}

@media (min-width: 768px) {
    .bz-store-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between
    }

    .bz-store-item .bz-store-item__left {
        margin-bottom: 0
    }

    .bz-store-item .bz-store-item__right {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end
    }

    .bz-store-item .bz-store-item__right>* {
        margin-left: 1rem
    }

    .bz-store-item .bz-store-item__right>*:first-child {
        margin-left: 0
    }

    .bz-store-item .bz-store-item__hotline {
        margin-bottom: 0;
        font-size: 14px
    }

    .bz-store-list>ul>li {
        margin-bottom: 1.5rem;
        padding-bottom: 1.5rem
    }

    .bz-store-list>ul>li:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
    }
}

@media (min-width: 992px) {
    .bz-store-item .bz-store-item__right>* {
        margin-left: 1.25rem
    }

    .bz-store-list>ul>li {
        margin-bottom: 1.75rem;
        padding-bottom: 1.75rem
    }

    .bz-store-list>ul>li:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
    }
}

@media (min-width: 1200px) {
    .bz-store-item .bz-store-item__right>* {
        margin-left: 1.5rem
    }

    .bz-store-list>ul>li {
        margin-bottom: 2rem;
        padding-bottom: 2rem
    }

    .bz-store-list>ul>li:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
    }
}
</style>