<script setup lang="ts">
import { useHead } from '#imports';
interface AlbumItem {
  image: string;
  title: string;
  subtitle: string;
  link: string;
}

interface Props {
  title: string;
  items: AlbumItem[];
}

useHead({
  link: [
    { href: '/lib-css/owl.carousel.min.css', rel: 'stylesheet', tagPriority: -1 },
  ],
  script: [
    { src: '/js/owl.carousel.min.js', type: 'text/javascript', tagPosition: 'bodyClose' },
    { src: '/js/owl.carousel2.thumbs.min.js', type: 'text/javascript', tagPosition: 'bodyClose' },
    { src: '/js/jquery.lazyload.min.js', type: 'text/javascript', tagPosition: 'bodyClose' },
    { src: '/js/widget.js', type: 'text/javascript', tagPosition: 'bodyClose' },
  ]
});

defineProps<Props>();
</script>

<template>
  <div class="bz-block is-padding-top is-padding-bottom bz-block-owl-slider-image myanh-block-new-album"
    id="myanh-block-new-album">
    <div class="container">
      <div class="bz-box is-center">
        <div class="bz-box__title">
          <div class="bz-box__title__main">
            <div class="bz-box__title__name">{{ title }}</div>
          </div>
        </div>
        <div class="bz-box__content">
          <div class="bz-owl-slider" >
            <div v-mounted="'initOwlCarousel'" class="owl-carousel js-owl-slider" data-items="1" data-margin="12"
              data-loop="false" data-autoplay="true" data-autoplay-hover-pause="true" data-autoplay-timeout="6000"
              data-lazy-load="true"
              data-responsive="{&quot;0&quot;:{&quot;items&quot;:1},&quot;768&quot;:{&quot;items&quot;:2}}">
              <div class="bz-owl-slider-image-item" v-for="(item, index) in items" :key="index">
                <div class="bz-owl-slider-image-item__inner"><a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#pre-order-information-modal" title="Partner name"><img
                      class="owl-lazy" :data-src="item.image" src="images/transparent.gif"
                      alt="New album"></a></div>
              </div>
            </div>
            <!--end owl-carousel-->
          </div>
          <!--end bz-owl-slider-->
        </div>
        <!--end bz-box__content-->
      </div>
      <!--end bz-box-->
    </div>
    <!--end container-->
  </div>
</template>

<style scoped lang="scss">
:deep() .bz-owl-slider-image-item .bz-owl-slider-image-item__inner {
  overflow: hidden;
  position: relative;
  z-index: 1;
  padding-top: 100%;
}

:deep() .bz-owl-slider-image-item .bz-owl-slider-image-item__inner a,
.bz-owl-slider-image-item .bz-owl-slider-image-item__inner figure {
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

:deep() .bz-owl-slider-image-item .bz-owl-slider-image-item__inner img {
  display: inline !important;
  width: auto !important;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}

:deep() .bz-owl-slider[data-items-size="3-2"] .bz-owl-slider-image-item .bz-owl-slider-image-item__inner {
  padding-top: 66.6666666667%;
}

:deep() .bz-owl-slider[data-items-size="16-9"] .bz-owl-slider-image-item .bz-owl-slider-image-item__inner {
  padding-top: 56.25%;
}

.myanh-block-new-album .bz-owl-slider-image-item .bz-owl-slider-image-item__inner {
    padding-top: 0;
    height: 255px
}
</style>