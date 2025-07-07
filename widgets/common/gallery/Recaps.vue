<script setup lang="ts">
interface Recap {
  id: string;
  imageUrl: string;
  title?: string;
  description?: string;
}

interface Props {
  titleText: string;
  subtitleText?: string;
  centerTitle?: boolean;
  showTitleUnderline?: boolean;
  recaps: Recap[];
  showOverlay?: boolean;
  enableLightbox?: boolean;
  backgroundColor?: string;
  backgroundImage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  centerTitle: true,
  showTitleUnderline: true,
  showOverlay: true,
  enableLightbox: true
});

import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';

const activeIndex = ref<number | null>(null);
const lightboxOpen = ref(false);
const currentLightboxIndex = ref(0);

const backgroundStyle = computed(() => {
  const style: Record<string, string> = {};

  if (props.backgroundImage) {
    style.backgroundImage = `url(${props.backgroundImage})`;
    style.backgroundSize = 'cover';
    style.backgroundPosition = 'center';
    style.backgroundRepeat = 'no-repeat';
  }

  if (props.backgroundColor) {
    style.backgroundColor = props.backgroundColor;
  }

  return style;
});

const setActiveImage = (index: number) => {
  activeIndex.value = index;
};

const resetActiveImage = () => {
  activeIndex.value = null;
};

const openLightbox = (index: number) => {
  if (!props.enableLightbox) return;

  currentLightboxIndex.value = index;
  lightboxOpen.value = true;
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  lightboxOpen.value = false;
  document.body.style.overflow = '';
};

const nextLightboxImage = () => {
  if (currentLightboxIndex.value < props.recaps.length - 1) {
    currentLightboxIndex.value++;
  }
};

const prevLightboxImage = () => {
  if (currentLightboxIndex.value > 0) {
    currentLightboxIndex.value--;
  }
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && lightboxOpen.value) {
    closeLightbox();
  } else if (event.key === 'ArrowRight' && lightboxOpen.value) {
    nextLightboxImage();
  } else if (event.key === 'ArrowLeft' && lightboxOpen.value) {
    prevLightboxImage();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);
  document.body.style.overflow = '';
});

watch(() => props.recaps, () => {
  activeIndex.value = null;
}, { deep: true });

</script>
<template>
  <div class="bz-block bz-block-recaps" :style="backgroundStyle">
    <div class="container py-5">
      <div class="bz-box" :class="{ 'is-center': centerTitle }">
        <div class="bz-box__title" v-if="titleText">
          <div class="bz-box__title__main" :class="{ 'text-left': !centerTitle }">
            <div class="bz-box__title__name" :class="{ 'title-with-underline': showTitleUnderline }">{{ titleText }}</div>
            <div class="bz-box__title__desc" v-if="subtitleText">{{ subtitleText }}</div>
          </div>
        </div>
        <div class="bz-box__content">
          <div class="bz-recaps">
            <div
              class="bz-recaps__gallery"
              @mouseleave="resetActiveImage"
            >
              <div
                v-for="(recap, index) in recaps"
                :key="recap.id"
                class="bz-recaps__item"
                :class="{
                  'is-active': activeIndex === index,
                  'is-main': index === 0,
                  'is-thumb': index > 0
                }"
                @mouseenter="setActiveImage(index)"
                @click="openLightbox(index)"
              >
                <div class="bz-recaps__item-inner">
                  <img
                    :src="recap.imageUrl"
                    :alt="recap.title || 'Event recap image'"
                    class="bz-recaps__image"
                  >
                  <div class="bz-recaps__overlay" v-if="showOverlay && (activeIndex === index || (activeIndex === null && index === 0))">
                    <div class="bz-recaps__content">
                      <h3 v-if="recap.title" class="bz-recaps__title">{{ recap.title }}</h3>
                      <p v-if="recap.description" class="bz-recaps__description">{{ recap.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Lightbox -->
            <div v-if="lightboxOpen" class="bz-recaps__lightbox" @click="closeLightbox">
              <div class="bz-recaps__lightbox-content" @click.stop>
                <button class="bz-recaps__lightbox-close" @click="closeLightbox">
                  <span class="material-symbols-outlined">close</span>
                </button>
                <div class="bz-recaps__lightbox-image-container">
                  <img
                    :src="recaps[currentLightboxIndex]?.imageUrl"
                    :alt="recaps[currentLightboxIndex]?.title || 'Event recap image'"
                    class="bz-recaps__lightbox-image"
                  >
                </div>
                <div v-if="recaps[currentLightboxIndex]?.title || recaps[currentLightboxIndex]?.description" class="bz-recaps__lightbox-info">
                  <h3 v-if="recaps[currentLightboxIndex]?.title" class="bz-recaps__lightbox-title">
                    {{ recaps[currentLightboxIndex]?.title }}
                  </h3>
                  <p v-if="recaps[currentLightboxIndex]?.description" class="bz-recaps__lightbox-description">
                    {{ recaps[currentLightboxIndex]?.description }}
                  </p>
                </div>
                <div class="bz-recaps__lightbox-nav">
                  <button
                    class="bz-recaps__lightbox-prev"
                    @click.stop="prevLightboxImage"
                    :disabled="currentLightboxIndex === 0"
                  >
                    <span class="material-symbols-outlined">chevron_left</span>
                  </button>
                  <div class="bz-recaps__lightbox-counter">
                    {{ currentLightboxIndex + 1 }} / {{ recaps.length }}
                  </div>
                  <button
                    class="bz-recaps__lightbox-next"
                    @click.stop="nextLightboxImage"
                    :disabled="currentLightboxIndex === recaps.length - 1"
                  >
                    <span class="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.bz-recaps {
  position: relative;

  &__gallery {
    display: flex;
    height: 400px;
    gap: 4px;
  }

  &__item {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    height: 100%;
    transition: width 0.3s ease;

    &.is-main {
      width: calc(100% - 5 * 120px - 4 * 4px);

      @media (max-width: 1199px) {
        width: calc(100% - 4 * 120px - 3 * 4px);
      }

      @media (max-width: 991px) {
        width: calc(100% - 3 * 120px - 2 * 4px);
      }

      @media (max-width: 767px) {
        width: calc(100% - 2 * 120px - 1 * 4px);
      }

      @media (max-width: 575px) {
        width: 100%;
      }
    }

    &.is-thumb {
      width: 120px;

      @media (max-width: 1199px) {
        &:nth-child(n+6) {
          display: none;
        }
      }

      @media (max-width: 991px) {
        &:nth-child(n+5) {
          display: none;
        }
      }

      @media (max-width: 767px) {
        &:nth-child(n+4) {
          display: none;
        }
      }

      @media (max-width: 575px) {
        &:nth-child(n+3) {
          display: none;
        }
      }
    }

    .bz-recaps__gallery:hover & {
      width: 120px;
      /* Add will-change to improve performance */
      will-change: width;
    }

    &.is-active {
      width: calc(100% - 5 * 120px - 4 * 4px) !important;

      @media (max-width: 1199px) {
        width: calc(100% - 4 * 120px - 3 * 4px) !important;
      }

      @media (max-width: 991px) {
        width: calc(100% - 3 * 120px - 2 * 4px) !important;
      }

      @media (max-width: 767px) {
        width: calc(100% - 2 * 120px - 1 * 4px) !important;
      }

      @media (max-width: 575px) {
        width: 100% !important;
      }
    }

    &-inner {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &__item:hover .bz-recaps__image {
    transform: scale(1.05);
  }

  &__overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
    color: white;
    padding: 2rem 1.5rem 1.5rem;
    transition: opacity 0.3s ease;
  }

  &__title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  &__description {
    font-size: 0.875rem;
    margin: 0;
  }

  @media (max-width: 575px) {
    &__gallery {
      flex-direction: column;
      height: auto;
    }

    &__item {
      height: 250px;

      &.is-main,
      &.is-thumb,
      &.is-active.is-main,
      &.is-active.is-thumb {
        width: 100% !important;
      }

      &.is-thumb {
        display: block !important;
      }
    }
  }

  &__lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
  }

  &__lightbox-content {
    position: relative;
    width: 90%;
    max-width: 1200px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    animation: scaleIn 0.3s ease;
  }

  @keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
  }

  &__lightbox-close {
    position: absolute;
    top: -40px;
    right: 0;
    background: transparent;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    z-index: 1010;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.1);
    }

    .material-symbols-outlined {
      font-size: 32px;
    }
  }

  &__lightbox-image-container {
    width: 100%;
    height: auto;
    max-height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  &__lightbox-image {
    max-width: 100%;
    max-height: 70vh;
    object-fit: contain;
  }

  &__lightbox-info {
    padding: 1rem 0;
    color: white;
    text-align: center;
  }

  &__lightbox-title {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  &__lightbox-description {
    font-size: 1rem;
    margin: 0;
  }

  &__lightbox-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
  }

  &__lightbox-counter {
    color: white;
    font-size: 0.875rem;
  }

  &__lightbox-prev,
  &__lightbox-next {
    background: transparent;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    padding: 0.5rem;
    transition: transform 0.2s ease;

    &:hover:not(:disabled) {
      transform: scale(1.1);
    }

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    .material-symbols-outlined {
      font-size: 32px;
    }
  }
}

.title-with-underline {
  position: relative;
  display: inline-block;
  padding-bottom: 0.5rem;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: var(--bs-primary, #FE5B00);
  }

  .text-left & {
    &:after {
      left: 0;
      transform: none;
    }
  }
}
</style>
