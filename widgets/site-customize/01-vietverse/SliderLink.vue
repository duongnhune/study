<script setup lang="ts">
interface Item {
  index: string;
  image: string;
  title: string;
}

interface Props {
  beforeText?: string;
  titleText: string;
  description?: string;
  items: Item[];
}

defineProps<Props>();
</script>
<template>

  <div class="bz-block is-padding-top is-padding-bottom-large bz-block-owl-slider-link vietverse-block-solution"
    id="vietverse-block-solution">
    <div class="container">
      <div class="bz-box">
        <div class="bz-box__title">
          <div class="bz-box__title__before">{{ beforeText }}</div>
          <div class="bz-box__title__name">{{ titleText }}</div>
          <div class="bz-box__title__desc">{{ description }}</div>
        </div>
        <div class="bz-box__content">
          <div class="bz-owl-slider">
            <div v-mounted="'initOwlCarousel'" class="owl-carousel js-owl-slider" data-items="2"
              data-margin="32" data-loop="true" data-dots="true" data-autoplay="false"
              data-autoplay-hover-pause="true" data-autoplay-timeout="6000" data-lazy-load="true"
              data-responsive="{&quot;0&quot;:{&quot;items&quot;:1,&quot;margin&quot;:0},&quot;768&quot;:{&quot;items&quot;:2,&quot;margin&quot;:16},&quot;992&quot;:{&quot;items&quot;:2,&quot;margin&quot;:24},&quot;1200&quot;:{&quot;items&quot;:2,&quot;margin&quot;:48}}">
              <div class="bz-grid" v-for="(item, index) in items" :key="index">
                <div class="bz-grid__index">{{ item.index }}</div>
                <div class="bz-grid__img"><a href="javascript:void(0);"
                  title="Meticulous product curation fitting their brand and image"><img
                    class="owl-lazy" :data-src="item.image" src="images/transparent.gif"
                    alt="image"></a></div>
                <div class="bz-grid__content">
                  <div class="bz-grid__row">
                    <h3 class="bz-grid__title"><a href="javascript:void(0);">{{ item.title }}</a>
                    </h3>
                  </div>
                </div>
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
