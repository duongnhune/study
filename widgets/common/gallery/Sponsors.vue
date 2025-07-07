<script setup lang="ts">
interface Sponsor {
  id: string;
  name: string;
  imageUrl: string;
  description?: string;
}

interface SponsorUrl {
  id: string;
  sponsorId: string;
  url: string;
}

interface Props {
  titleText: string;
  subtitleText?: string;
  centerTitle?: boolean;
  showTitleUnderline?: boolean;
  sponsors: Sponsor[];
  sponsorUrls: SponsorUrl[];
  sponsorSize?: 'small' | 'medium' | 'large';
  autoSlide?: boolean;
  slideInterval?: number;
  slideSpeed?: number;
  slidesToShow?: number;
  backgroundColor?: string;
  backgroundImage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  titleText: 'Our Sponsors',
  centerTitle: true,
  showTitleUnderline: true,
  sponsorSize: 'medium',
  autoSlide: true,
  sponsors: () => [{
    id: '1',
    name: 'Sponsor 1',
    imageUrl: 'upload/site/templates/sponsor_7.png',
  }, {
    id: '2',
    name: 'Sponsor 2',
    imageUrl: 'upload/site/templates/sponsor_8.png',
  }, {
    id: '3',
    name: 'Sponsor 3',
    imageUrl: 'upload/site/templates/sponsor_9.png',
  }, {
    id: '4',
    name: 'Sponsor 4',
    imageUrl: 'upload/site/templates/sponsor_10.png',
  }, {
    id: '5',
    name: 'Sponsor 5',
    imageUrl: 'upload/site/templates/sponsor_11.png',
  }, {
    id: '6',
    name: 'Sponsor 6',
    imageUrl: 'upload/site/templates/logo-breezing.png',
  }],
  slideInterval: 3000,
  slideSpeed: 500,
  slidesToShow: 6,
  sponsorUrls: () => []
});

import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';

const sliderRef = ref<HTMLElement | null>(null);
const sliderPosition = ref(0);
const slideWidth = ref<number>(0);
const totalSlides = ref(0);
const currentSlide = ref(0);
const isSliding = ref(false);
const autoSlideTimer = ref<number | null>(null);

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

const getSponsorUrl = (sponsorId: string): string => {
  const sponsorUrl = props.sponsorUrls.find(url => url.sponsorId === sponsorId);
  return sponsorUrl ? sponsorUrl.url : '#';
};

const calculateSliderDimensions = () => {
  if (!sliderRef.value) return;

  const slider = sliderRef.value;
  const slideElements = slider.querySelectorAll('.bz-sponsors__slide');

  if (slideElements.length === 0) return;

  totalSlides.value = slideElements.length;

  slideWidth.value = slider.clientWidth / (props.slidesToShow || 1);
};

const nextSlide = () => {
  if (currentSlide.value >= totalSlides.value - (props.slidesToShow || 1)) {
    currentSlide.value = 0;
  } else {
    currentSlide.value++;
  }

  updateSliderPosition();
};

const updateSliderPosition = () => {
  isSliding.value = true;
  sliderPosition.value = -currentSlide.value * slideWidth.value;

  setTimeout(() => {
    isSliding.value = false;
  }, props.slideSpeed);
};

const startAutoSlide = () => {
  if (!props.autoSlide) return;

  stopAutoSlide();

  autoSlideTimer.value = window.setInterval(() => {
    nextSlide();
  }, props.slideInterval);
};

const stopAutoSlide = () => {
  if (autoSlideTimer.value !== null) {
    clearInterval(autoSlideTimer.value);
    autoSlideTimer.value = null;
  }
};

const handleResize = () => {
  calculateSliderDimensions();
  updateSliderPosition();
};

onMounted(() => {
  calculateSliderDimensions();
  startAutoSlide();

  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  stopAutoSlide();
  window.removeEventListener('resize', handleResize);
});

watch(() => props.autoSlide, (newValue) => {
  if (newValue) {
    startAutoSlide();
  } else {
    stopAutoSlide();
  }
});

watch(() => props.slidesToShow, () => {
  calculateSliderDimensions();
  updateSliderPosition();
});
</script>
<template>
  <div class="bz-block bz-block-sponsors" :style="backgroundStyle">
    <div class="container py-5">
      <div class="bz-box" :class="{ 'is-center': centerTitle }">
        <div class="bz-box__title" v-if="titleText">
          <div class="bz-box__title__main" :class="{ 'text-left': !centerTitle }">
            <div class="bz-box__title__name" :class="{ 'title-with-underline': showTitleUnderline }">{{ titleText }}
            </div>
            <div class="bz-box__title__desc" v-if="subtitleText">{{ subtitleText }}</div>
          </div>
        </div>
        <div class="bz-box__content">
          <div class="bz-sponsors bz-sponsors--slider">
            <div class="bz-sponsors__slider" ref="sliderRef">
              <div class="bz-sponsors__track" :style="{
                transform: `translateX(${sliderPosition}px)`,
                transition: isSliding ? `transform ${slideSpeed}ms ease` : 'none',
                display: 'flex',
                flexWrap: 'nowrap'
              }">
                <div v-for="sponsor in sponsors" :key="sponsor.id" class="bz-sponsors__slide"
                  :class="[`bz-sponsors__slide--${sponsorSize}`]" :style="{ width: `${slideWidth}px` }">
                  <div class="bz-sponsor-item">
                    <a :href="getSponsorUrl(sponsor.id)" target="_blank" rel="noopener noreferrer"
                      class="bz-sponsor-item__link">
                      <img :src="sponsor.imageUrl" :alt="sponsor.name" class="bz-sponsor-item__image">
                    </a>
                  </div>
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
.bz-sponsors {
  position: relative;

  &__slider {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  &__track {
    display: flex;
    flex-wrap: nowrap;
  }

  &__slide {
    flex: 0 0 auto;
    padding: 0.5rem;
    box-sizing: border-box;
  }

  &__grid {
    display: grid;
    gap: 2rem;

    &--small {
      grid-template-columns: repeat(6, 1fr);

      @media (max-width: 1199px) {
        grid-template-columns: repeat(4, 1fr);
      }

      @media (max-width: 767px) {
        grid-template-columns: repeat(3, 1fr);
      }

      @media (max-width: 575px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    &--medium {
      grid-template-columns: repeat(4, 1fr);

      @media (max-width: 991px) {
        grid-template-columns: repeat(3, 1fr);
      }

      @media (max-width: 767px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 575px) {
        grid-template-columns: 1fr;
      }
    }

    &--large {
      grid-template-columns: repeat(3, 1fr);

      @media (max-width: 991px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 575px) {
        grid-template-columns: 1fr;
      }
    }
  }

  &__controls {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    display: flex;
    justify-content: space-between;
    pointer-events: none;
    z-index: 10;
  }

  &__control {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    pointer-events: auto;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: var(--bs-light, #f8f9fa);
    }

    &--prev {
      margin-left: -20px;
    }

    &--next {
      margin-right: -20px;
    }

    .material-symbols-outlined {
      font-size: 24px;
    }
  }
}

.bz-sponsor-item {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;

  .bz-sponsors__slide--small & {
    max-width: 120px;
    margin: 0 auto;
  }

  .bz-sponsors__slide--medium & {
    max-width: 160px;
    margin: 0 auto;
  }

  .bz-sponsors__slide--large & {
    max-width: 200px;
    margin: 0 auto;
  }

  &__link {
    display: block;
    width: 100%;
    height: 100%;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  &__image {
    width: 100%;
    height: auto;
    object-fit: contain;
    transition: filter 0.3s ease, opacity 0.3s ease;

    &:hover {
      filter: grayscale(0%);
      opacity: 1;
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
