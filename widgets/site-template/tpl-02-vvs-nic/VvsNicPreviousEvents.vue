<script setup lang="ts">
interface EventItem {
  image: string
  link?: string
}
interface Props {
  title: string
  desc?: string
  events: EventItem[]
}
defineProps<Props>()
</script>

<template>
  <div class="bz-block is-padding-top-large is-padding-bottom-large bz-block-previous-events vvs-nic-block-previous-events" id="vvs-nic-block-previous-events">
    <div class="container">
      <div class="bz-box is-center">
        <div class="bz-box__title">
          <div class="bz-box__title__main">
            <div class="bz-box__title__name">{{ title }}</div>
            <div class="bz-box__title__desc" v-if="desc">{{ desc }}</div>
          </div>
        </div>
        <div class="bz-box__content">
          <div class="bz-previous-events-grid">
            <ul>
              <li v-for="(event, idx) in events" :key="idx">
                <div class="bz-previous-events-item">
                  <a :href="event.link || '#'">
                    <img :src="event.image" alt="previous event">
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bz-previous-events-item {
  padding-top: 66.2251655629%;
  position: relative;
  z-index: 1;
}
.bz-box .bz-box__title .bz-box__title__name {
  text-transform: uppercase;
  font-weight: 700;
  color: #ED1C24;
  font-size: 36px;
}
.bz-previous-events-item a, .bz-previous-events-item figure {
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.bz-previous-events-item img {
  width: 100%;
  height: auto;
  min-height: 100%;
  object-fit: cover;
}

.bz-previous-events-grid > ul {
  list-style: none;
  padding: 0;
  margin: 0 -4px -4px;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
}
.bz-previous-events-grid > ul > li {
  width: 50%;
  padding-left: 4px;
  padding-right: 4px;
  padding-bottom: 8px;
}
.bz-previous-events-grid > ul > li:first-child {
  width: 100%;
}
.bz-previous-events-grid > ul > li:first-child .bz-previous-events-item {
  padding-top: 40.5844155844%;
}

@media (min-width: 992px) {
  .bz-previous-events-grid > ul > li {
    width: 25%;
  }
}

@media (min-width: 1200px) {
  .bz-box .bz-box__title .bz-box__title__desc {
      font-size: 24px;
  }
}
</style>