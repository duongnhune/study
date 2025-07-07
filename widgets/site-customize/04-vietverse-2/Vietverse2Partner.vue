<script setup lang="ts">
import { onMounted, useHead } from '#imports';
declare var $: any

interface Partner {
  image: string
  title: string
  alt: string
}

interface Props {
  partners: Partner[]
  items?: number
  margin?: number
  loop?: boolean
  autoplay?: boolean
  autoplayHoverPause?: boolean
  autoplayTimeout?: number
  lazyLoad?: boolean
  responsive?: {
    [key: string]: {
      items: number
    }
  }
}

const props = withDefaults(defineProps<Props>(), {
  items: 3,
  margin: 12,
  loop: true,
  autoplay: true,
  autoplayHoverPause: true,
  autoplayTimeout: 6000,
  lazyLoad: true,
  responsive: () => ({
    '0': { items: 3 },
    '768': { items: 4 },
    '992': { items: 5 }
  })
})

useHead({
  link: [
    { href: '/lib-css/owl.carousel.min.css', rel: 'stylesheet', tagPriority: -1 },
  ],
  script: [
    { src: '/js/owl.carousel.min.js', type: 'text/javascript', tagPosition: 'bodyClose' },
    { src: '/js/owl.carousel2.thumbs.min.js', type: 'text/javascript', tagPosition: 'bodyClose' },
    { src: '/js/jquery.lazyload.min.js', type: 'text/javascript', tagPosition: 'bodyClose' },
  ]
})

onMounted(() => {
  $(document).ready(function () {
    $('.js-owl-slider').owlCarousel({
      items: props.items,
      margin: props.margin,
      loop: props.loop,
      autoplay: props.autoplay,
      autoplayHoverPause: props.autoplayHoverPause,
      autoplayTimeout: props.autoplayTimeout,
      lazyLoad: props.lazyLoad,
      responsive: props.responsive,
      nav: false,
      dots: false
    })
  })
})
</script>

<template>
  <div class="bz-block is-padding-top-small is-padding-bottom-small bz-block-owl-slider-image vietverse-2-block-partner">
    <div class="container">
      <div class="bz-box is-center">
        <div class="bz-box__content">
          <div class="bz-owl-slider" data-items-size="3-2">
            <div 
              class="owl-carousel js-owl-slider"
              :data-items="items"
              :data-margin="margin"
              :data-loop="loop"
              :data-autoplay="autoplay"
              :data-autoplay-hover-pause="autoplayHoverPause"
              :data-autoplay-timeout="autoplayTimeout"
              :data-lazy-load="lazyLoad"
              :data-responsive="JSON.stringify(responsive)"
            >
              <div 
                v-for="(partner, index) in partners" 
                :key="index"
                class="bz-owl-slider-image-item"
              >
                <div class="bz-owl-slider-image-item__inner">
                  <a href="javascript:void(0);" :title="partner.title">
                    <img 
                      class="owl-lazy" 
                      :data-src="partner.image" 
                      src="images/transparent.gif" 
                      :alt="partner.alt"
                    >
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
/*---------- block owl slider image css ----------*/
.bz-owl-slider-image-item .bz-owl-slider-image-item__inner {
  overflow: hidden;
  position: relative;
  z-index: 1;
  padding-top: 100%;
}
.bz-owl-slider-image-item .bz-owl-slider-image-item__inner a, .bz-owl-slider-image-item .bz-owl-slider-image-item__inner figure {
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
.bz-owl-slider-image-item .bz-owl-slider-image-item__inner img {
  display: inline !important;
  width: auto !important;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}

.bz-owl-slider[data-items-size="3-2"] .bz-owl-slider-image-item .bz-owl-slider-image-item__inner {
  padding-top: 66.6666666667%;
}

.bz-owl-slider[data-items-size="16-9"] .bz-owl-slider-image-item .bz-owl-slider-image-item__inner {
  padding-top: 56.25%;
}

/*---------- end block-owl-slider-image css ----------*/
</style> 