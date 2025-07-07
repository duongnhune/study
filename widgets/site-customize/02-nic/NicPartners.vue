<script setup lang="ts">
interface Partner {
  logo: string;
  link?: string;
  size?: string; // 'normal' | 'big'
}

interface Props {
  title: string;
  titleColor?: string;
  subtitle?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  partners: Partner[];
}

import { computed } from 'vue';

const props = defineProps<Props>();

const blockStyle = computed(() => {
  const style: Record<string, string> = {};

  if (props.backgroundColor) {
    style.backgroundColor = props.backgroundColor;
  }

  if (props.backgroundImage) {
    style.backgroundImage = `url(${props.backgroundImage})`;
    style.backgroundSize = 'cover';
    style.backgroundPosition = 'center';
    style.backgroundRepeat = 'no-repeat';
  }

  return style;
});

const titleStyle = computed(() => {
  const style: Record<string, string> = {};

  if (props.titleColor) {
    style.color = props.titleColor;
  }

  return style;
});

const isBigPartner = (partner: Partner) => {
  return partner.size === 'big';
};
</script>

<template>
  <div
    class="bz-block is-padding-top is-padding-bottom bz-block-partners-grid vvs-nic-block-partners-grid"
    id="vvs-nic-block-partners-grid"
    :style="blockStyle">
    <div class="container">
      <div class="bz-box is-center">
        <div class="bz-box__title">
          <div class="bz-box__title__main">
            <div class="bz-box__title__name" :style="titleStyle">{{ title }}</div>
            <div class="bz-box__title__desc" v-if="subtitle">{{ subtitle }}</div>
          </div>
        </div>
        <div class="bz-box__content">
          <div class="bz-partners-grid">
            <ul>
              <li v-for="(partner, index) in partners" :key="index" :class="{'is-big': isBigPartner(partner)}">
                <div class="bz-partners-item">
                  <div class="bz-partners-item__inner">
                    <figure>
                      <a :href="partner.link || '#'">
                        <img :src="partner.logo" alt="partner">
                      </a>
                    </figure>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!--end bz-partners-grid-->
        </div>
        <!--end bz-box__content-->
      </div>
      <!--end bz-box-->
    </div>
    <!--end container-->
  </div>
  <!--end bz-block-->
</template>
