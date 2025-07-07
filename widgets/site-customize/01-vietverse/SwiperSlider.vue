<script setup lang="ts">
interface SliderItem {
    title: string;
    image: string;
}

interface Props {
    itemSize?: string;
    itemGroup?: number;
    slidesPerView?: number;
    spaceBetween?: number;
    loop?: boolean;
    autoplay?: number;
    title?: string;
    subtitle?: string;
    items: SliderItem[];
}

defineProps<Props>();
</script>
<template>
    <div class="bz-block is-padding-top-large is-padding-bottom-medium bz-block-swiper-slider-vertical-image vietverse-block-artist-gallery"
        id="vietverse-block-artist-gallery">
        <div class="container">
            <div class="bz-box">
                <div class="bz-box__title">
                    <div class="bz-box__title__main">
                        <div class="bz-box__title__before">{{ title }}</div>
                        <div class="bz-box__title__name">{{ subtitle }}</div>
                    </div>
                </div>
                <div class="bz-box__content">
                    <div class="bz-swiper-slider d-lg-none" data-items-size="3-2" data-items-group="1">
                        <div v-mounted="'initSwiperSlider'" class="swiper mySwiper js-swiper-slider" data-direction="vertical"
                            data-space-between="16" data-loop="true" data-autoplay="true" data-autoplay-hover-pause="true"
                            data-autoplay-delay="6000" data-lazy-load="true" data-breakpoints="{}">
                            <div class="swiper-wrapper" v-if="items && items.length">
                                <div class="swiper-slide" v-for="(item, index) in items" :key="index">
                                    <div class="bz-swiper-slider-image-item">
                                        <div class="bz-swiper-slider-image-item__inner"><a href="javascript:void(0);"
                                                :title="item.title"><img :src="item.image" loading="lazy"
                                                    :alt="item.title"></a></div>
                                    </div>
                                    <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                </div>
                            </div>
                            <!--end swiper-wrapper-->
                        </div>
                        <!--end swiper-container-->
                    </div>
                    <!--end bz-swiper-slider-->
                    <div class="bz-swiper-slider d-none d-lg-block" data-items-size="3-2" data-items-group="2">
                        <div v-mounted="'initSwiperSlider'" class="swiper mySwiper js-swiper-slider" data-direction="vertical"
                            data-slides-per-view="auto" data-space-between="0" data-loop="true" data-autoplay="true"
                            data-autoplay-hover-pause="true" data-autoplay-delay="6000" data-lazy-load="true"
                            data-breakpoints="{}">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide" v-for="index in Math.round(items.length / 2)" :key="index">
                                    <template v-if="items[index * 2 - 2]">
                                        <div class="bz-swiper-slider-image-item">
                                            <div class="bz-swiper-slider-image-item__inner"><a href="javascript:void(0);"
                                                    :title="items[index * 2 - 2].title"><img :src="items[index * 2 - 2].image"
                                                        loading="lazy" :alt="items[index * 2 - 2].title"></a></div>
                                        </div>
                                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                    </template>
                                    <template v-if="items[index * 2 - 1]">
                                        <div class="bz-swiper-slider-image-item">
                                            <div class="bz-swiper-slider-image-item__inner"><a href="javascript:void(0);"
                                                    :title="items[index * 2 - 1].title"><img :src="items[index * 2 - 1].image"
                                                        loading="lazy" :alt="items[index * 2 - 1].title"></a></div>
                                        </div>
                                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                    </template>
                                </div>
                            </div>
                            <!--end swiper-wrapper-->
                        </div>
                        <!--end swiper-container-->
                    </div>
                    <!--end bz-swiper-slider-->
                </div>
                <!--end bz-box__content-->
            </div>
            <!--end bz-box-->
        </div>
        <!--end container-->
    </div>
</template>
