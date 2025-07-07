<script setup lang="ts">
interface Paragraph { text: string }
interface Props {
  title: string
  paragraphs: Paragraph[]
  image: string
}
defineProps<Props>()
</script>

<template>
  <div class="bz-block is-padding-top is-padding-bottom-large bz-block-event-overview vvs-nic-block-event-overview" id="vvs-nic-block-event-overview">
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
              <li v-for="(p, idx) in paragraphs" :key="idx">
                <div class="bz-maincontent">{{ p.text }}</div>
              </li>
            </ul>
          </div>
          <div class="bz-event-overview-img">
            <img :src="image" alt="event overview" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bz-block-event-overview .bz-box {
  background-color: #070a4f;
  padding: 16px;
}
.vvs-nic-block-event-overview.bz-block-event-overview .bz-box {
  -moz-border-radius: 12px;
  -webkit-border-radius: 12px;
  border-radius: 12px;
}
.bz-box .bz-box__title .bz-box__title__name{
  text-transform: uppercase;
  font-weight: 700;
}
.bz-block-event-overview .bz-box .bz-box__title .bz-box__title__name {
  color: #fff;
}
.bz-block-event-overview .bz-box .bz-box__title .bz-box__title__before {
  color: #fff;
}
.bz-block-event-overview .bz-box .bz-box__title .bz-box__title__desc {
  color: #fff;
}
.bz-block-event-overview .bz-event-overview-grid .bz-maincontent {
  color: #9C9DB9;
  font-size: 16px;
}
.bz-block-event-overview .bz-event-overview-grid .bz-maincontent p {
  font-size: 16px;
}
.bz-block-event-overview .bz-event-overview-img {
  margin-left: -8px;
  margin-right: -8px;
  margin-bottom: -8px;
}

.bz-event-overview-grid {
  margin-bottom: 16px;
}
.bz-event-overview-grid:last-child {
  margin-bottom: 0;
}
.bz-event-overview-grid > ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.bz-event-overview-grid > ul > li {
  padding-bottom: 16px;
}

.bz-event-overview-img img {
  width: 100%;
  height: auto;
}

@media (min-width: 768px) {
  .bz-block-event-overview .bz-box {
    padding: 24px;
  }
  .bz-block-event-overview .bz-event-overview-img {
    margin-left: -16px;
    margin-right: -16px;
    margin-bottom: -16px;
  }
  .bz-event-overview-grid {
    margin-bottom: 24px;
  }
  .bz-event-overview-grid > ul > li {
    padding-bottom: 24px;
  }
}
@media (min-width: 992px) {
  .bz-block-event-overview .bz-box {
    padding: 32px;
  }
  .bz-block-event-overview .bz-event-overview-img {
    margin-left: -24px;
    margin-right: -24px;
    margin-bottom: -24px;
  }
  .bz-event-overview-grid {
    margin-bottom: 32px;
  }
  .bz-event-overview-grid > ul {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    flex-wrap: wrap;
    margin-left: -12px;
    margin-right: -12px;
    margin-bottom: -24px;
  }
  .bz-event-overview-grid > ul > li {
    width: 50%;
    padding-left: 12px;
    padding-right: 12px;
    padding-bottom: 24px;
  }
}
@media (min-width: 1200px) {
  .bz-block-event-overview .bz-box {
    padding: 48px;
  }
  .bz-block-event-overview .bz-event-overview-img {
    margin-left: -40px;
    margin-right: -40px;
    margin-bottom: -40px;
  }
  .bz-event-overview-grid {
    margin-bottom: 48px;
  }
  .bz-event-overview-grid .bz-maincontent {
    font-size: 18px;
  }
  .bz-event-overview-grid .bz-maincontent p {
    font-size: 18px;
  }
  .bz-event-overview-grid > ul {
    margin-left: -16px;
    margin-right: -16px;
    margin-bottom: -32px;
  }
  .bz-event-overview-grid > ul > li {
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 32px;
  }
}
@media (max-width: 991px) {
  .bz-event-overview-grid > ul > li:last-child {
    padding-bottom: 0;
  }
}
</style>