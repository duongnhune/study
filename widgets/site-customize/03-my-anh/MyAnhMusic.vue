<script setup lang="ts">
import { defineProps } from 'vue';

interface Song {
    title: string;
    artist: string;
    url: string;
    image: string;
}

interface Props {
    title: string;
    songs: Song[];
}

defineProps<Props>();
</script>

<template>
      <div class="bz-block is-padding-top is-padding-bottom bz-block-html-content myanh-block-music" id="myanh-block-music">
        <div class="container">
          <div class="bz-box is-center">
            <div class="bz-box__title">
              <div class="bz-box__title__main">
                <div class="bz-box__title__name">{{ title }}</div>
              </div>
            </div>
            <div class="bz-box__content">
              <div class="bz-music-grid">
                <ul>
                  <li v-for="song in songs" :key="song.url">
                    <div class="bz-music-item" >
                      <div class="bz-music-item__img"><a :href="song.url" target="_blank"><img :src="song.image" alt="music"><span class="bz-music-item__img-before"><span class="small text-uppercase">Listening to</span><br><span>{{ song.title }}</span></span><span class="bz-music-item__img-after"><span>{{ song.title }}</span><img src="https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/myanh/music-icon.svg" alt="spotify"></span></a></div>
                      <div class="bz-music-item__content"><a class="bz-music-item__title" href="#"><span class="bz-music-item__name">{{ song.title }}</span><span class="bz-music-item__subname">{{ song.artist }}</span><span class="bz-music-item__play"><img src="https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/myanh/music-play.png" alt="music"></span></a></div>
                    </div>
                  </li>
                </ul>
              </div>
              <!--end bz-music-grid-->
            </div>
            <!--end bz-box__content-->
          </div>
          <!--end bz-box-->
        </div>
        <!--end container-->
      </div>
</template> 

<style scoped>
.bz-music-item .bz-music-item__img {
    padding-top: 100%;
    overflow: hidden;
    position: relative;
    z-index: 1;
    -moz-border-radius: 8px;
    -webkit-border-radius: 8px;
    border-radius: 8px;
    -webkit-box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2)
}

.bz-music-item .bz-music-item__img a {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center
}

.bz-music-item .bz-music-item__img img {
    width: 100%;
    min-height: 100%;
    height: auto;
    object-fit: cover
}

.bz-music-item .bz-music-item__content {
    padding-top: 1rem
}

.bz-music-item .bz-music-item__title {
    display: block;
    min-height: 30px;
    position: relative;
    z-index: 1;
    padding-right: 25px;
    line-height: 1.2
}

.bz-music-item a.bz-music-item__title {
    color: #000;
    text-decoration: none
}

.bz-music-item .bz-music-item__name {
    display: block;
    font-size: 1rem
}

.bz-music-item .bz-music-item__subname {
    font-size: .75rem;
    color: var(--text-color-desc)
}

.bz-music-item .bz-music-item__play {
    width: 22px;
    height: 29px;
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0
}

.bz-music-item .bz-music-item__play img {
    max-width: 22px;
    max-height: 29px;
    width: auto;
    height: auto
}

.bz-music-item .bz-music-item__img-after {
    z-index: 3;
    bottom: .75rem;
    right: .75rem;
    left: .75rem;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    position: absolute
}

.bz-music-item .bz-music-item__img-after span {
    font-weight: 700;
    color: #fff;
    font-size: 2rem
}

.bz-music-item .bz-music-item__img-after img {
    max-height: 42px;
    max-width: 42px;
    width: auto;
    height: auto
}

.bz-music-item .bz-music-item__img-before {
    position: absolute;
    z-index: 3;
    top: .75rem;
    left: .75rem;
    right: .75rem;
    font-weight: 700;
    color: #fff;
    line-height: 1.2;
    font-size: 1.25rem;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=30)";
    filter: alpha(opacity=30);
    -moz-opacity: .3;
    -khtml-opacity: .3;
    opacity: .3
}

.bz-music-item .bz-music-item__img-before span.small {
    font-size: .71875rem;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
    filter: alpha(opacity=50);
    -moz-opacity: .5;
    -khtml-opacity: .5;
    opacity: .5
}

.bz-music-grid>ul {
    list-style: none;
    margin: 0;
    padding: 0
}

.bz-music-grid>ul>li {
    padding-bottom: 1.5rem
}

@media (min-width: 768px) {
    .bz-music-grid>ul {
        margin: 0 -12px;
        display: flex;
        flex-direction: row;
        align-items: stretch;
        flex-wrap: wrap
    }

    .bz-music-grid>ul>li {
        width: 33.3333333333%;
        padding-left: 12px;
        padding-right: 12px
    }
}

@media (min-width: 1200px) {
    .bz-music-item {
        max-width: 290px;
        margin: 0 auto;
        min-width: 290px
    }

    .bz-music-grid>ul>li:nth-child(3n+1) .bz-music-item {
        margin: 0
    }

    .bz-music-grid>ul>li:nth-child(3n+3) {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-end
    }

    .bz-music-grid>ul>li:nth-child(3n+3) .bz-music-item {
        margin: 0
    }
}
</style>