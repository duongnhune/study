<script setup lang="ts">
interface Paragraph {
  text: string;
}

interface Props {
  title: string;
  paragraphs: Paragraph[];
  overviewImage?: string;
}

defineProps<Props>();
</script>

<template>
  <div class="bz-block is-padding-top is-padding-bottom-large bz-block-event-overview vvs-nic-block-event-overview"
    id="vvs-nic-block-event-overview">
    <div class="container">
      <div class="bz-box">
        <div class="bz-box__title">
          <div class="bz-box__title__main">
            <div class="bz-box__title__name">{{ title }}</div>
          </div>
        </div>
        <div class="bz-box__content">
          <div class="bz-event-overview-grid">
            <ul>
              <li v-for="(paragraph, index) in paragraphs" :key="index">
                <div class="bz-maincontent">{{ paragraph.text }}</div>
              </li>
            </ul>
          </div>
          <div class="bz-event-overview-img" v-if="overviewImage">
            <img :src="overviewImage" alt="event overview">
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
