<script setup lang="ts">
interface GalleryImage {
    image: string;
    title: string;
}

interface Props {
    title: string;
    subtitle: string;
    images: GalleryImage[];
}

defineProps<Props>();
</script>

<template>
      <div class="bz-block is-padding-top is-padding-bottom bz-block-owl-slider-image myanh-block-gallery" id="myanh-block-gallery">
        <div class="container">
          <div class="bz-box is-center">
            <div class="bz-box__title">
              <div class="bz-box__title__main">
                <div class="bz-box__title__name">{{ title }}</div>
              </div>
            </div>
            <div class="bz-box__content">
              <div class="bz-owl-slider">
                <div v-mounted="'initOwlCarousel'" class="owl-carousel js-owl-slider" data-items="2" data-margin="12" data-loop="true" data-autoplay="true" data-autoplay-hover-pause="true" data-autoplay-timeout="6000" data-lazy-load="true" data-responsive="{&quot;0&quot;:{&quot;items&quot;:2},&quot;768&quot;:{&quot;items&quot;:3}}">
                  <div class="bz-owl-slider-image-item" v-for="image in images" :key="image.image">
                    <div class="bz-owl-slider-image-item__inner"><a href="javascript:void(0);" title="Partner name"><img class="owl-lazy" :data-src="image.image" src="images/transparent.gif" :alt="image.title"></a></div>
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

<style scoped>
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