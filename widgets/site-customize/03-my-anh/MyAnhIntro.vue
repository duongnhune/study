<script setup lang="ts">
interface SocialItem {
  icon: string;
  link: string;
  alt: string;
}

interface Props {
  videoUrl: string;
  videoUrlMobile: string;
  watchNowLink: string;
  socialItems: SocialItem[];
  watchNowText: string;
}

defineProps<Props>();
</script>

<template>
  <div class="bz-block bz-block-html-content myanh-block-intro" id="myanh-block-intro">
    <div class="container">
      <div class="bz-html-content">
        <div class="bz-video-frame">
          <div class="bz-video-frame__inner">
            <video autoplay muted loop playsinline class="d-none d-md-block">
              <source :src="videoUrl" type="video/mp4">
              Trình duyệt của bạn không hỗ trợ thẻ video.
            </video>
            <video autoplay muted loop playsinline class="d-md-none">
              <source :src="videoUrlMobile || videoUrl" type="video/mp4">
              Trình duyệt của bạn không hỗ trợ thẻ video.
            </video>
          </div>
          <div class="bz-video-frame__btn">
            <a :href="watchNowLink" target="_blank">{{ watchNowText }}</a>
          </div>
          <div class="bz-video-frame__social">
            <ul>
              <li v-for="(item, index) in socialItems" :key="index">
                <a :href="item.link" target="_blank">
                  <img :src="item.icon" :alt="item.alt">
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.myanh-block-intro {
    overflow: hidden
}

.myanh-block-intro .container {
    padding-left: 0;
    padding-right: 0;
    max-width: none;
    width: 100%
}

.myanh-block-intro .bz-video-frame {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden
}

.myanh-block-intro .bz-video-frame .bz-video-frame__inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    overflow: hidden
}

.myanh-block-intro .bz-video-frame .bz-video-frame__inner video {
    min-width: 100%;
    width: auto;
    height: auto;
    min-height: 100%;
    cursor: pointer;
    object-fit: cover;
    object-position: bottom
}

.myanh-block-intro .bz-video-frame .bz-video-frame__btn {
    position: absolute;
    bottom: 2.5rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2
}

.myanh-block-intro .bz-video-frame .bz-video-frame__btn a {
    display: inline-block;
    color: white;
    text-decoration: none;
    font-weight: bold;
    border-bottom: 1px solid white;
    font-size: 16px;
    text-transform: uppercase
}

.myanh-block-intro .bz-video-frame .bz-video-frame__social {
    position: absolute;
    z-index: 11;
    right: 1rem;
    bottom: 1.25rem
}

.myanh-block-intro .bz-video-frame .bz-video-frame__social ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center
}

.myanh-block-intro .bz-video-frame .bz-video-frame__social ul li {
    margin-bottom: 1.25rem
}

.myanh-block-intro .bz-video-frame .bz-video-frame__social ul li:last-child {
    margin-bottom: 0
}

.myanh-block-intro .bz-video-frame .bz-video-frame__social ul li a {
    color: #fff
}

@media (min-width: 768px) {
    .myanh-block-intro .bz-video-frame .bz-video-frame__btn {
        bottom: 3.75rem
    }
}

@media (min-width: 992px) {
    .myanh-block-intro .bz-video-frame .bz-video-frame__social {
        right: 1.25rem;
        bottom: 1.5rem
    }
}

@media (min-width: 1200px) {
    .myanh-block-intro .bz-video-frame .bz-video-frame__btn {
        bottom: 5rem
    }

    .myanh-block-intro .bz-video-frame .bz-video-frame__social {
        bottom: 1.75rem
    }

    .myanh-block-intro .bz-video-frame .bz-video-frame__social ul li {
        margin-bottom: 1.5rem
    }
}
</style>
