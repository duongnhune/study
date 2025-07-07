<script setup lang="ts">
interface Props {
    content: string;
    image: string;
}

defineProps<Props>();
</script>
<template>
    <div class="bz-block is-padding-top is-padding-bottom-large bz-block-article-single vietverse-block-about"
        id="vietverse-block-about">
        <div class="container">
            <div class="bz-box">
                <div class="bz-box__content">
                    <div class="bz-article-single-box" data-align="flex-start" data-direction="row-reverse">
                        <div class="bz-article-single-box__left">
                            <div class="bz-article-single-box__img">
                                <figure><img :src="image" alt="about"></figure>
                            </div>
                        </div>
                        <!--end bz-article-single-box__left-->
                        <div class="bz-article-single-box__right">
                            <div class="bz-maincontent" v-if="content"
                                v-html="content.split('\n').map(line => `<p>${line.trim()}</p>`).join('')">
                            </div>
                            <!--end bz-maincontent-->
                        </div>
                        <!--end bz-article-single-box__right-->
                    </div>
                    <!--end bz-article-single-box-->
                </div>
                <!--end bz-box__content-->
            </div>
            <!--end bz-box-->
        </div>
        <!--end container-->
    </div>
</template>
