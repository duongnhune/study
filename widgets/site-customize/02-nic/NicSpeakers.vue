<script setup lang="ts">
interface Speaker {
  image: string;
  name: string;
  enterprise?: string;
  position?: string;
  link?: string;
}

interface Props {
  titleText: string;
  subtitleText?: string;
  speakers: Speaker[];
}

defineProps<Props>();
</script>
<template>
  <div class="bz-block is-padding-top-large is-padding-bottom bz-block-speakers vvs-nic-block-speakers" id="vvs-nic-block-speakers">
    <div class="container">
      <div class="bz-box is-center">
        <div class="bz-box__title">
          <div class="bz-box__title__main text-left">
            <div class="bz-box__title__name title-with-underline">{{ titleText.toUpperCase() }}</div>
          </div>
        </div>
        <div class="bz-box__content">
          <div class="bz-speakers-grid">
            <ul>
              <li v-for="(speaker, index) in speakers" :key="index">
                <div class="bz-grid">
                  <div class="bz-grid__img">
                    <a :href="speaker.link || '#'"><img :src="speaker.image" :alt="speaker.name"></a>
                  </div>
                  <div class="bz-grid__content">
                    <div class="bz-grid__row">
                      <h3 class="bz-grid__title"><a :href="speaker.link || '#'">{{ speaker.name }}</a></h3>
                    </div>
                    <div class="bz-grid__row bz-grid__desc is-bold" v-if="speaker.position">{{ speaker.position }}</div>
                    <div class="bz-grid__row bz-grid__text" v-if="speaker.enterprise">{{ speaker.enterprise }}</div>

                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="css">
.is-bold {
  font-weight: 600;
}

.title-with-underline {
  position: relative;
  padding-bottom: 10px;
  margin-bottom: 15px;
  font-weight: bold;
  font-size: 2.5rem;
  display: inline-block;
  text-align: left;
  color: #070a4f !important;
}

.title-with-underline::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 140px;
  height: 3px;
  background-color: #070a4f !important;
}

.text-left {
  text-align: left !important;
}
</style>
