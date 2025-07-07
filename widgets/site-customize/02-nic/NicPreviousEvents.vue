<script setup lang="ts">
interface Event {
  image: string;
  link?: string;
}

interface Props {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  events: Event[];
}

import { computed } from 'vue';

const backgroundStyle = computed(() => {
  const style: Record<string, string> = {};

  if (props.backgroundImage) {
    style.backgroundImage = `url(${props.backgroundImage})`;
    style.backgroundSize = 'cover';
    style.backgroundPosition = 'center';
    style.backgroundRepeat = 'no-repeat';
  }

  return style;
});

const props = defineProps<Props>();
</script>

<template>
  <div
    class="bz-block is-padding-top-large is-padding-bottom-large bz-block-previous-events vvs-nic-block-previous-events"
    id="vvs-nic-block-previous-events" :style="backgroundImage ? backgroundStyle : {}">
    <div class="container">
      <div class="bz-box is-center">
        <div class="bz-box__title">
          <div class="bz-box__title__main text-left">
            <div class="bz-box__title__name title-with-underline">{{ title.toUpperCase() }}</div>
          </div>
        </div>
        <div class="bz-box__content">
          <div class="bz-previous-events-grid">
            <ul>
              <li v-for="(event, index) in events" :key="index">
                <div class="bz-previous-events-item">
                  <a :href="event.link || '#'">
                    <img :src="event.image" alt="previous event">
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!--end bz-box__content-->
      </div>
      <!--end bz-box-->
    </div>
    <!--end container-->
  </div>
  <!--end bz-block-->
</template>

<style scoped lang="css">
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
