<script setup lang="ts">
import { onMounted, useHead } from '#imports';
declare var Swiper: any

interface Slide {
  image: string
  title: string
  alt: string
}

interface Props {
  slides: Slide[]
  spaceBetween?: number
  slidesPerView?: number
  loop?: boolean
  autoplay?: boolean
  autoplayHoverPause?: boolean
  autoplayDelay?: number
  lazyLoad?: boolean
  grabCursor?: boolean
  centeredSlides?: boolean
  effect?: string
  coverflowEffect?: {
    rotate: number
    stretch: number
    depth: number
    modifier: number
    slideShadows: boolean
  }
  breakpoints?: {
    [key: string]: {
      slidesPerView: number
      spaceBetween: number
      coverflowEffect?: {
        rotate: number
        stretch: number
        depth: number
        modifier: number
        slideShadows: boolean
      }
    }
  }
}

const props = withDefaults(defineProps<Props>(), {
  spaceBetween: 10,
  slidesPerView: 2,
  loop: true,
  autoplay: true,
  autoplayHoverPause: true,
  autoplayDelay: 6000,
  lazyLoad: true,
  grabCursor: true,
  centeredSlides: true,
  effect: 'coverflow',
  coverflowEffect: () => ({
    rotate: 40,
    stretch: 0,
    depth: 200,
    modifier: 1,
    slideShadows: false
  }),
  breakpoints: () => ({
    '768': {
      slidesPerView: 3,
      spaceBetween: 5,
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 300,
        modifier: 1,
        slideShadows: false
      }
    }
  })
})

useHead({
  script: [
  { src: `/js/jquery-3.7.1.min.js`, type: 'text/javascript', tagPosition: 'bodyClose' },
    { src: `/js/jquery-migrate-3.5.2.min.js`, type: 'text/javascript', tagPosition: 'bodyClose' },
    { src: `/lib-js/jquery.scrollbar.js`, type: 'text/javascript', tagPosition: 'bodyClose' },
    { src: `/js/popper.min.js`, type: 'text/javascript', tagPosition: 'bodyClose' },
    { src: `/js/bootstrap.bundle.min.js`, type: 'text/javascript', tagPosition: 'bodyClose' },
    { src: '/js/owl.carousel.min.js', type: 'text/javascript', tagPosition: 'bodyClose' },
    { src: '/js/owl.carousel2.thumbs.min.js', type: 'text/javascript', tagPosition: 'bodyClose' },
    { src: '/js/jquery.lazyload.min.js', type: 'text/javascript', tagPosition: 'bodyClose' },
    { src: '/js/widget.js', type: 'text/javascript', tagPosition: 'bodyClose' },
    { src: '/js/swiper-bundle.min.js', type: 'text/javascript', tagPosition: 'bodyClose' },
  ],
  link: [
    { href: '/lib-css/swiper-bundle.css', rel: 'stylesheet', tagPriority: -1 },
  ],
})

onMounted(() => {
  $(document).ready(function () {
    const swiperConfig: any = {
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      direction: 'horizontal',
      slidesPerView: props.slidesPerView,
      spaceBetween: props.spaceBetween,
      loop: props.loop,
      lazy: props.lazyLoad,
      grabCursor: props.grabCursor,
      centeredSlides: props.centeredSlides,
      effect: props.effect,
      breakpoints: props.breakpoints,
      coverflowEffect: props.coverflowEffect
    }

    if (props.autoplay) {
      swiperConfig.autoplay = {
        delay: props.autoplayDelay,
        disableOnInteraction: false,
        pauseOnMouseEnter: props.autoplayHoverPause
      }
    }
    new Swiper('#vietverse-2-swiper-slider', swiperConfig)
  })
})

</script>

<template>
  <div
    class="bz-block is-padding-top-small is-padding-bottom-small bz-block-swiper-slider-image vietverse-2-block-cover-gallery">
    <div class="container">
      <div class="bz-box">
        <div class="bz-box__content">
          <div class="bz-swiper-slider" data-items-group="1">
            <div :class="`swiper`" id="vietverse-2-swiper-slider" data-space-between="10" data-slides-per-view="2" data-loop="true" data-autoplay="true" data-autoplay-hover-pause="true" data-autoplay-delay="6000" data-lazy-load="true" data-grab-cursor="true" data-centered-slides="true">
              <div class="swiper-wrapper">
                <div v-for="(slide, index) in slides" :key="index" class="swiper-slide">
                  <div class="bz-swiper-slider-image-item">
                    <div class="bz-swiper-slider-image-item__inner">
                      <a href="javascript:void(0);" :title="slide.title">
                        <img :src="slide.image" loading="lazy" :alt="slide.alt">
                      </a>
                    </div>
                  </div>
                  <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
/*---------- block swiper slider image css ----------*/
.bz-swiper-slider-image-item .bz-swiper-slider-image-item__inner {
  overflow: hidden;
  position: relative;
  z-index: 1;
  padding-top: 100%;
}

.bz-swiper-slider-image-item .bz-swiper-slider-image-item__inner a,
.bz-swiper-slider-image-item .bz-swiper-slider-image-item__inner figure {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  margin: 0;
  padding: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.bz-swiper-slider-image-item .bz-swiper-slider-image-item__inner img {
  display: inline;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  height: 100%;
}

.bz-swiper-slider:has(.swiper[data-direction=vertical]) {
  position: relative;
  z-index: 1;
  padding-top: 100%;
}

.bz-swiper-slider:has(.swiper[data-direction=vertical]) .swiper[data-direction=vertical] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.bz-swiper-slider[data-items-group] .swiper-slide {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  margin-left: -8px;
  margin-right: -8px;
}

.bz-swiper-slider[data-items-group] .swiper-slide .bz-swiper-slider-image-item {
  flex: 1 0 0;
  padding-left: 8px;
  padding-right: 8px;
}

.bz-swiper-slider[data-items-group="1"] .swiper-slide {
  display: block;
  margin-left: 0;
  margin-right: 0;
}

.bz-swiper-slider[data-items-group="1"] .swiper-slide .bz-swiper-slider-image-item {
  flex: none;
  padding-left: 0;
  padding-right: 0;
}

.bz-swiper-slider[data-items-size="3-2"] .swiper-slide {
  overflow: hidden;
}

.bz-swiper-slider[data-items-size="3-2"] .bz-swiper-slider-image-item .bz-swiper-slider-image-item__inner {
  padding-top: 66.6666666667%;
}

.bz-swiper-slider[data-items-size="3-2"]:has(.swiper[data-direction=vertical]) {
  padding-top: 66.6666666667%;
}

.bz-swiper-slider[data-items-size="16-9"] .swiper-slide {
  overflow: hidden;
}

.bz-swiper-slider[data-items-size="16-9"] .bz-swiper-slider-image-item .bz-swiper-slider-image-item__inner {
  padding-top: 56.25%;
}

.bz-swiper-slider[data-items-size="16-9"]:has(.swiper[data-direction=vertical]) {
  padding-top: 56.25%;
}

/*---------- end block swiper slider image css ----------*/
/*---------- block cover gallery css ----------*/
.vietverse-2-block-cover-gallery .swiper-slide {
  width: 180px;
  height: 180px;
}
.vietverse-2-block-cover-gallery .bz-swiper-slider-image-item img {
  display: block;
  width: 100%;
  overflow: hidden;
  -moz-border-radius: 20px;
  -webkit-border-radius: 20px;
  border-radius: 20px;
}

@media (min-width: 768px) {
  .vietverse-2-block-cover-gallery .swiper-slide {
    width: 300px;
    height: 300px;
  }
}
@media (min-width: 992px) {
  .vietverse-2-block-cover-gallery .swiper-slide {
    width: 400px;
    height: 400px;
  }
}
@media (min-width: 1200px) {
  .vietverse-2-block-cover-gallery .swiper-slide {
    width: 490px;
    height: 490px;
  }
}
/*---------- end block cover gallery css ----------*/
</style>