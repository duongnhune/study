<script setup lang="ts">
interface SliderItem {
    src: string;
    title: string;
}

interface Props {
    itemCount?: number;
    margin?: number;
    loop?: boolean;
    center?: boolean;
    nav?: boolean;
    dots?: boolean;
    autoPlay?: boolean;
    autoplayTimeout?: number;
    autoplaySpeed?: number;
    title?: string;
    items: SliderItem[];
}

defineProps<Props>();
</script>
<template>
    <div class="bz-block bg-secondary bz-block-owl-slider-image vietverse-block-partner">
        <div class="container">
            <div class="bz-box is-center">
                <div class="bz-box__title">
                    <div class="bz-box__title__main">
                        <div class="bz-box__title__name">{{ title }}</div>
                    </div>
                </div>
                <div class="bz-box__content">
                    <div class="bz-owl-slider">
                        <div v-mounted="'initOwlCarousel'" class="owl-carousel js-owl-slider" :data-items="itemCount"
                            :data-margin="margin" :data-loop="loop" :data-autoplay="autoPlay" data-autoplay-hover-pause="true"
                            :data-autoplay-timeout="autoplayTimeout" data-lazy-load="true"
                            data-responsive="{&quot;0&quot;:{&quot;items&quot;:3},&quot;768&quot;:{&quot;items&quot;:6},&quot;992&quot;:{&quot;items&quot;:9},&quot;1200&quot;:{&quot;items&quot;:12}}">
                            <div class="bz-owl-slider-image-item" v-for="(item, index) in items" :key="index">
                                <div class="bz-owl-slider-image-item__inner"><a href="javascript:void(0);"
                                        :title="item.title"><img class="owl-lazy" :data-src="item.src"
                                            src="images/transparent.gif" alt="Partner name"></a></div>
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
