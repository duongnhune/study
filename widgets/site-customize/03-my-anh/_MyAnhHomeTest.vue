<script setup lang="ts">
import MyAnhHeader from './MyAnhHeader.vue';
import MyAnhHeaderType from './MyAnhHeader';
import MyAnhIntro from './MyAnhIntro.vue';
import MyAnhIntroType from './MyAnhIntro';
import MyAnhNewAlbum from './MyAnhNewAlbum.vue';
import MyAnhNewAlbumType from './MyAnhNewAlbum';
import MyAnhNewsletter from './MyAnhNewsletter.vue';
import MyAnhNewsletterType from './MyAnhNewsletter';
import MyAnhPreOrder from './MyAnhPreOrder.vue';
import MyAnhPreOrderType from './MyAnhPreOrder';
import MyAnhFooter from './MyAnhFooter.vue';
import MyAnhFooterType from './MyAnhFooter';
import MyAnhMusic from './MyAnhMusic.vue';
import MyAnhMusicType from './MyAnhMusic';
import MyAnhGallery from './MyAnhGallery.vue';
import MyAnhGalleryType from './MyAnhGallery';
import MyAnhStore from './MyAnhStore.vue';
import MyAnhStoreType from './MyAnhStore';
import MyAnhProduct from './MyAnhProduct.vue';
import MyAnhProductType from './MyAnhProduct';
let css = `
      :root, [data-bs-theme="light"] {
        --bs-primary: #007bff;
        --bs-primary-rgb: 0, 123, 255;
        --bs-secondary: #6c757d;
        --bs-secondary-rgb: 108, 117, 125;
        --bs-dark: #000;
        --bs-dark-rgb: 0, 0, 0;
        --bs-light: #f8f9fa;
        --bs-light-rgb: 248, 249, 250;
        --font-site: 'Inter', sans-serif;
        --font-title: 'Inter', sans-serif;
        --font-desc: 'Inter', sans-serif;
        --font-detail: 'Inter', sans-serif;
        --text-color-site: #000;
        --text-color-title: #000;
        --text-color-desc: #6C6C6C;
        --text-color-detail: #555;
        --container-lg-width: 960px;
        --container-xl-width: 1140px;
        --container-xxl-width: 1320px;
        --bs-border-color: #333;
      }
      .bz-block {
        --padding-unit: 2rem;
        --padding-unit-md: 2.5rem;
        --padding-unit-lg: 3rem;
        --margin-unit: 1rem;
        --margin-unit-md: 1.5rem;
        --margin-unit-lg: 2rem;
      }
      .bz-box {
        --fontsize-unit: 1.25rem;
        --fontsize-unit-md: 1.25rem;
        --fontsize-unit-lg: 1.5rem;
      }
      .btn-primary {
        --bs-btn-bg: #007bff;
        --bs-btn-hover-bg: #0056b3;
        --bs-btn-hover-border-color: #004085;
      }
      .btn-secondary {
        --bs-btn-bg: #6c757d;
        --bs-btn-hover-bg: #5a6268;
        --bs-btn-hover-border-color: #545b62;
      }
`;

css += `
@import url("https://fonts.cdnfonts.com/css/montserrat");
@import url("https://fonts.cdnfonts.com/css/futura-lt");
@import url("https://fonts.cdnfonts.com/css/futura-pt");

@font-face {
    font-family: 'SVN Gilroy';
    font-weight: 400;
    font-style: normal;
    font-display: swap;
    src: url("../fonts/svn-gilroy/SVNGilroyRegular.eot");
    src: url("../fonts/svn-gilroy/SVNGilroyRegular.eot") format("embedded-opentype"), url("../fonts/svn-gilroy/SVNGilroyRegular.woff2") format("woff2"), url("../fonts/svn-gilroy/SVNGilroyRegular.woff") format("woff"), url("../fonts/svn-gilroy/SVNGilroyRegular.ttf") format("truetype"), url("../fonts/svn-gilroy/SVNGilroyRegular.svg#SVNGilroyRegular") format("svg")
}

@font-face {
    font-family: 'SVN Gilroy';
    font-weight: 400;
    font-style: italic;
    font-display: swap;
    src: url("../fonts/svn-gilroy/SVNGilroyItalic.eot");
    src: url("../fonts/svn-gilroy/SVNGilroyItalic.eot") format("embedded-opentype"), url("../fonts/svn-gilroy/SVNGilroyItalic.woff2") format("woff2"), url("../fonts/svn-gilroy/SVNGilroyItalic.woff") format("woff"), url("../fonts/svn-gilroy/SVNGilroyItalic.ttf") format("truetype"), url("../fonts/svn-gilroy/SVNGilroyItalic.svg#SVNGilroyItalic") format("svg")
}

@font-face {
    font-family: 'SVN Gilroy';
    font-weight: 700;
    font-style: normal;
    font-display: swap;
    src: url("../fonts/svn-gilroy/SVNGilroyBold.eot");
    src: url("../fonts/svn-gilroy/SVNGilroyBold.eot") format("embedded-opentype"), url("../fonts/svn-gilroy/SVNGilroyBold.woff2") format("woff2"), url("../fonts/svn-gilroy/SVNGilroyBold.woff") format("woff"), url("../fonts/svn-gilroy/SVNGilroyBold.ttf") format("truetype"), url("../fonts/svn-gilroy/SVNGilroyBold.svg#SVNGilroyBold") format("svg")
}

@font-face {
    font-family: 'SVN Gilroy';
    font-weight: 700;
    font-style: italic;
    font-display: swap;
    src: url("../fonts/svn-gilroy/SVNGilroyBoldItalic.eot");
    src: url("../fonts/svn-gilroy/SVNGilroyBoldItalic.eot") format("embedded-opentype"), url("../fonts/svn-gilroy/SVNGilroyBoldItalic.woff2") format("woff2"), url("../fonts/svn-gilroy/SVNGilroyBoldItalic.woff") format("woff"), url("../fonts/svn-gilroy/SVNGilroyBoldItalic.ttf") format("truetype"), url("../fonts/svn-gilroy/SVNGilroyBoldItalic.svg#SVNGilroyBoldItalic") format("svg")
}

@font-face {
    font-family: 'SVN Gilroy';
    font-weight: 600;
    font-style: normal;
    font-display: swap;
    src: url("../fonts/svn-gilroy/SVNGilroySemiBold.eot");
    src: url("../fonts/svn-gilroy/SVNGilroySemiBold.eot") format("embedded-opentype"), url("../fonts/svn-gilroy/SVNGilroySemiBold.woff2") format("woff2"), url("../fonts/svn-gilroy/SVNGilroySemiBold.woff") format("woff"), url("../fonts/svn-gilroy/SVNGilroySemiBold.ttf") format("truetype"), url("../fonts/svn-gilroy/SVNGilroySemiBold.svg#SVNGilroySemiBold") format("svg")
}

@font-face {
    font-family: 'SVN Gilroy';
    font-weight: 600;
    font-style: italic;
    font-display: swap;
    src: url("../fonts/svn-gilroy/SVNGilroySemiBoldItalic.eot");
    src: url("../fonts/svn-gilroy/SVNGilroySemiBoldItalic.eot") format("embedded-opentype"), url("../fonts/svn-gilroy/SVNGilroySemiBoldItalic.woff2") format("woff2"), url("../fonts/svn-gilroy/SVNGilroySemiBoldItalic.woff") format("woff"), url("../fonts/svn-gilroy/SVNGilroySemiBoldItalic.ttf") format("truetype"), url("../fonts/svn-gilroy/SVNGilroySemiBoldItalic.svg#SVNGilroySemiBoldItalic") format("svg")
}

@font-face {
    font-family: 'SVN Gilroy';
    font-weight: 500;
    font-style: normal;
    font-display: swap;
    src: url("../fonts/svn-gilroy/SVNGilroyMedium.eot");
    src: url("../fonts/svn-gilroy/SVNGilroyMedium.eot") format("embedded-opentype"), url("../fonts/svn-gilroy/SVNGilroyMedium.woff2") format("woff2"), url("../fonts/svn-gilroy/SVNGilroyMedium.woff") format("woff"), url("../fonts/svn-gilroy/SVNGilroyMedium.ttf") format("truetype"), url("../fonts/svn-gilroy/SVNGilroyMedium.svg#SVNGilroyMedium") format("svg")
}

@font-face {
    font-family: 'SVN Gilroy';
    font-weight: 500;
    font-style: italic;
    font-display: swap;
    src: url("../fonts/svn-gilroy/SVNGilroyMediumItalic.eot");
    src: url("../fonts/svn-gilroy/SVNGilroyMediumItalic.eot") format("embedded-opentype"), url("../fonts/svn-gilroy/SVNGilroyMediumItalic.woff2") format("woff2"), url("../fonts/svn-gilroy/SVNGilroyMediumItalic.woff") format("woff"), url("../fonts/svn-gilroy/SVNGilroyMediumItalic.ttf") format("truetype"), url("../fonts/svn-gilroy/SVNGilroyMediumItalic.svg#SVNGilroyMediumItalic") format("svg")
}

:root,
[data-bs-theme="light"] {
    --bs-warning: #FFD031;
    --bs-warning-rgb: 255, 208, 49;
    --bs-info: #00C0F3;
    --bs-info-rgb: 0, 192, 243
}

.bz-box .bz-box__title .bz-box__title__name {
    font-weight: 600
}

.bz-box .bz-box__title .bz-box__title__before {
    font-weight: 450
}

.bz-box .bz-box__title {
    padding-bottom: 1.5rem
}

.bz-box .bz-box__title:has(.bz-box__title__name, .bz-box__title__before, .bz-box__title__desc, .bz-box__title__more) {
    padding-bottom: 1.5rem
}

.bz-box .bz-box__title .bz-box__title__name {
    font-weight: 400;
    color: #000
}

.bz-box .bz-box__title .bz-box__title__desc {
    font-size: 16px;
    font-weight: 500
}

@media (min-width: 768px) {
    .bz-box .bz-box__title {
        padding-bottom: 2.25rem
    }

    .bz-box .bz-box__title:has(.bz-box__title__name, .bz-box__title__before, .bz-box__title__desc, .bz-box__title__more) {
        padding-bottom: 2.25rem
    }

    .bz-box .bz-box__title .bz-box__title__desc {
        font-size: 20px
    }
}

@media (min-width: 992px) {
    .bz-box .bz-box__title {
        padding-bottom: 3rem
    }

    .bz-box .bz-box__title:has(.bz-box__title__name, .bz-box__title__before, .bz-box__title__desc, .bz-box__title__more) {
        padding-bottom: 3rem
    }

    .bz-box .bz-box__title .bz-box__title__desc {
        font-size: 22px
    }
}

@media (min-width: 1200px) {
    .bz-box .bz-box__title {
        padding-bottom: 4rem
    }

    .bz-box .bz-box__title:has(.bz-box__title__name, .bz-box__title__before, .bz-box__title__desc, .bz-box__title__more) {
        padding-bottom: 4rem
    }

    .bz-box .bz-box__title .bz-box__title__desc {
        font-size: 24px
    }
}

.modal .modal-header {
    border-bottom: none
}

.modal .modal-title {
    font-weight: 400;
}

.modal .modal-title.fs-5 {
    font-size: 14px !important
}

.modal .modal-footer {
    border-top: none
}

.modal .modal-footer>.d-grid {
    width: 100%
}

.modal .bz-form .form-label {
    color: #000;
    font-size: 1rem;
}

.modal .bz-form .form-check .form-check-label {
    color: #000;
}

.modal .bz-form .form-control {
    border-left: none;
    border-right: none;
    border-top: none;
    padding-left: 0;
    -moz-border-radius: 0;
    -webkit-border-radius: 0;
    border-radius: 0
}

.modal .bz-form .form-select {
    border-left: none;
    border-right: none;
    border-top: none;
    padding-left: 0;
    -moz-border-radius: 0;
    -webkit-border-radius: 0;
    border-radius: 0
}

.modal .bz-form p {
    color: #000;
    font-size: .75rem
}

.modal .bz-form .btn span {
    text-decoration: underline
}

@media (min-width: 768px) {
    .modal .modal-dialog {
        max-width: 675px
    }
}
`;

useHead({
    style: [{ innerHTML: css, tagPriority: 0 }]
});
</script>

<template>
    <MyAnhHeader class="bz-header" v-bind="JSON.parse(MyAnhHeaderType.defaultProps)" />
    <div class="bz-content">
        <MyAnhIntro class="bz-intro" v-bind="JSON.parse(MyAnhIntroType.defaultProps)" />
        <MyAnhMusic class="bz-music" v-bind="JSON.parse(MyAnhMusicType.defaultProps)" />
        <MyAnhNewAlbum class="bz-new-album" v-bind="JSON.parse(MyAnhNewAlbumType.defaultProps)" />
        <!-- <MyAnhProduct class="bz-product" v-bind="JSON.parse(MyAnhProductType.defaultProps)" />   -->
        <MyAnhPreOrder class="bz-pre-order" v-bind="JSON.parse(MyAnhPreOrderType.defaultProps)" />
        <!-- <MyAnhShow class="bz-show" v-bind="JSON.parse(MyAnhShowType.defaultProps)" /> -->
        <MyAnhStore class="bz-store" v-bind="JSON.parse(MyAnhStoreType.defaultProps)" />
        <MyAnhGallery class="bz-gallery" v-bind="JSON.parse(MyAnhGalleryType.defaultProps)" />
        <MyAnhNewsletter class="bz-newsletter" v-bind="JSON.parse(MyAnhNewsletterType.defaultProps)" />
    </div>
    <MyAnhFooter class="bz-footer" v-bind="JSON.parse(MyAnhFooterType.defaultProps)" />
</template>
