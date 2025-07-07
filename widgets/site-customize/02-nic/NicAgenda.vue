<script setup lang="ts">
interface Section {
  id: string;
  title: string;
  timeRange: string;
}

interface AgendaItem {
  id: string;
  sectionId: string;
  startTime: string;
  endTime: string;
  title: string;
  duration: string;
  description?: string;
}

interface Speaker {
  id: string;
  itemId: string;
  name: string;
  position: string;
  imageUrl?: string;
}

interface Props {
  titleText: string;
  date: string;
  location: string;
  backgroundImage?: string;
  backgroundColor?: string;
  sections: Section[];
  items: AgendaItem[];
  speakers: Speaker[];
}

const props = defineProps<Props>();

import { ref, computed } from 'vue';

const activeTabId = ref(props.sections.length > 0 ? props.sections[0]?.id : '');

const changeTab = (tabId: string) => {
  activeTabId.value = tabId;
};

const itemsBySection = computed(() => {
  const result: Record<string, AgendaItem[]> = {};

  props.sections.forEach(section => {
    result[section.id] = [];
  });

  props.items.forEach(item => {
    if (result[item.sectionId]) {
      result[item.sectionId]?.push(item);
    }
  });

  return result;
});

const speakersByItem = computed(() => {
  const result: Record<string, Speaker[]> = {};

  props.items.forEach(item => {
    result[item.id] = [];
  });

  props.speakers.forEach(speaker => {
    if (result[speaker.itemId]) {
      result[speaker.itemId]?.push(speaker);
    }
  });

  return result;
});

const backgroundStyle = computed(() => {
  const style: Record<string, string> = {};

  if (props.backgroundImage) {
    style.backgroundImage = `url(${props.backgroundImage})`;
    style.backgroundSize = 'cover';
    style.backgroundPosition = 'center';
    style.backgroundRepeat = 'no-repeat';
  }

  if (props.backgroundColor) {
    style.backgroundColor = props.backgroundColor;
  } else {
    style.backgroundColor = '#0a1442';
  }

  return style;
});
</script>

<template>
  <div class="bz-block is-padding-top-large is-padding-bottom-large bg-primary bz-block-agenda vvs-nic-block-agenda"
    :style="backgroundStyle" id="vvs-nic-block-agenda">
    <div class="container">
      <div class="bz-box">
        <div class="bz-box__title">
          <div class="bz-box__title__main">
            <div class="bz-box__title__name">{{ titleText }}</div>
            <div class="bz-box__title__desc">{{ date }}, {{ location }}</div>
          </div>
        </div>
        <div class="bz-box__content">
          <div class="bz-tabs">
            <!-- Tabs (Sections) -->
            <div class="bz-tabs__title">
              <ul>
                <li v-for="section in sections" :key="section.id" :class="{ active: activeTabId === section.id }">
                  <a href="#" @click.prevent="changeTab(section.id)">{{ section.title }}:<br><span>{{ section.timeRange
                      }}</span></a>
                </li>
              </ul>
            </div>

            <!-- Tab content container -->
            <div class="bz-tabs__container">
              <!-- Individual tab panes -->
              <div v-for="section in sections" :key="section.id" class="bz-tabs__pane"
                :class="{ 'is-current active': activeTabId === section.id }" :id="section.id">
                <div class="bz-agenda-grid">
                  <ul>
                    <li v-for="item in itemsBySection[section.id]" :key="item.id">
                      <div class="bz-agenda-item">
                        <div class="bz-agenda-item__head">
                          <div class="bz-agenda-item__time">{{ item.startTime }} - {{ item.endTime }}</div>
                          <span>{{ item.duration }}</span>
                        </div>
                        <div class="bz-agenda-item__content">
                          <h3 class="bz-agenda-item__title">{{ item.title }}</h3>

                          <!-- Speakers -->
                          <template v-if="speakersByItem[item.id] && speakersByItem[item.id].length > 0">
                            <div v-for="speaker in speakersByItem[item.id]" :key="speaker.id" class="bz-agenda-author">
                              <div class="bz-agenda-author__img">
                                <img :src="speaker.imageUrl || 'upload/site/vvs-nic/author_1.png'" alt="author">
                              </div>
                              <div class="bz-agenda-author__text">
                                <div class="bz-agenda-author__name">{{ speaker.name }}</div>
                                <span>{{ speaker.position }}</span>
                              </div>
                            </div>
                          </template>

                          <!-- Description -->
                          <p v-if="item.description" class="bz-agenda-item__desc">{{ item.description }}</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
/*---------- block-agenda css ----------*/
.bz-agenda-author {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.bz-agenda-author .bz-agenda-author__img {
  width: 42px;
  height: 42px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
.bz-agenda-author .bz-agenda-author__img img {
  width: 100%;
  height: auto;
  object-fit: cover;
  min-height: 100%;
}
.bz-agenda-author .bz-agenda-author__text {
  padding-left: 8px;
  width: calc(100% - 42px);
  line-height: 1.5;
}
.bz-agenda-author .bz-agenda-author__text span {
  font-size: 12px;
  color: #666;
}
.bz-agenda-author .bz-agenda-author__name {
  color: #333;
  font-weight: 700;
  margin-bottom: 0;
}
.bz-agenda-author .bz-agenda-author__desc {
  color: #666;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
}

.bz-agenda-item .bz-agenda-item__head {
  margin-bottom: 8px;
}
.bz-agenda-item .bz-agenda-item__head span {
  color: #666;
  font-size: 14px;
}
.bz-agenda-item .bz-agenda-item__time {
  font-size: 18px;
  color: #333;
  font-weight: 500;
  line-height: 1.5;
}
.bz-agenda-item .bz-agenda-item__title {
  font-weight: 600;
  line-height: 1.5;
  margin-bottom: 8px;
  color: #333;
  font-size: 18px;
}
.bz-agenda-item .bz-agenda-item__title:last-child {
  margin-bottom: 0;
}
.bz-agenda-item .bz-agenda-author {
  margin-bottom: 12px;
}
.bz-agenda-item .bz-agenda-author:last-child {
  margin-bottom: 0;
}
.bz-agenda-item .bz-agenda-item__desc {
  color: #666;
  line-height: 1.5;
}

.bz-agenda-grid > ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.bz-agenda-grid > ul > li {
  margin-bottom: 16px;
  padding-left: 28px;
  position: relative;
  z-index: 1;
}
.bz-agenda-grid > ul > li:before {
  content: "";
  position: absolute;
  z-index: 2;
  width: 9px;
  height: 9px;
  left: 0;
  top: 10px;
  background-color: var(--bs-primary);
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
.bz-agenda-grid > ul > li:after {
  content: "";
  position: absolute;
  z-index: 1;
  width: 1px;
  left: 4px;
  top: 29px;
  bottom: 0;
  background-color: #e5e5e5;
}
.bz-agenda-grid > ul > li:last-child {
  margin-bottom: 0;
}

.bz-block-agenda.bg-primary .bz-box .bz-box__title .bz-box__title__name {
  color: #fff;
}
.bz-block-agenda.bg-primary .bz-box .bz-box__title .bz-box__title__before {
  color: #fff;
}
.bz-block-agenda.bg-primary .bz-box .bz-box__title .bz-box__title__desc {
  color: #fff;
}
.bz-block-agenda.bg-primary .bz-tabs .bz-tabs__title > ul > li > a {
  background-color: transparent;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.bz-block-agenda.bg-primary .bz-tabs .bz-tabs__title > ul > li > a span {
  color: rgba(255, 255, 255, 0.5);
}
.bz-block-agenda.bg-primary .bz-tabs .bz-tabs__title > ul > li.active > a {
  background-color: var(--bs-info);
  color: var(--bs-primary);
  border-color: var(--bs-info);
}
.bz-block-agenda.bg-primary .bz-tabs .bz-tabs__title > ul > li.active > a span {
  color: var(--bs-primary);
}
.bz-block-agenda.bg-primary .bz-agenda-author .bz-agenda-author__text span {
  color: rgba(255, 255, 255, 0.5);
}
.bz-block-agenda.bg-primary .bz-agenda-author .bz-agenda-author__name {
  color: #fff;
}
.bz-block-agenda.bg-primary .bz-agenda-item .bz-agenda-item__head span {
  color: rgba(255, 255, 255, 0.5);
}
.bz-block-agenda.bg-primary .bz-agenda-item .bz-agenda-item__time {
  color: #fff;
}
.bz-block-agenda.bg-primary .bz-agenda-item .bz-agenda-item__title {
  color: #fff;
}
.bz-block-agenda.bg-primary .bz-agenda-item .bz-agenda-item__desc {
  color: rgba(255, 255, 255, 0.5);
}
.bz-block-agenda.bg-primary .bz-agenda-grid > ul > li:before {
  background-color: #ED1C24;
}
.bz-block-agenda.bg-primary .bz-agenda-grid > ul > li:after {
  background-color: rgba(255, 255, 255, 0.2);
}

@media (min-width: 576px) {
  .bz-agenda-item {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }
  .bz-agenda-item .bz-agenda-item__head {
    width: 125px;
  }
  .bz-agenda-item .bz-agenda-item__content {
    width: calc(100% - 125px);
  }
}
@media (min-width: 768px) {
  .bz-agenda-grid > ul {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    flex-wrap: wrap;
    margin: 0 -16px 0 0;
  }
  .bz-agenda-grid > ul > li {
    width: 50%;
    padding-right: 16px;
  }
}
@media (min-width: 992px) {
  .bz-block-agenda .bz-tabs {
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }
  .bz-block-agenda .bz-tabs .bz-tabs__title {
    width: 210px;
  }
  .bz-block-agenda .bz-tabs .bz-tabs__title > ul {
    display: block;
  }
  .bz-block-agenda .bz-tabs .bz-tabs__title > ul > li {
    margin-right: 0;
    margin-bottom: 16px;
  }
  .bz-block-agenda .bz-tabs .bz-tabs__title > ul > li > a {
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    border-radius: 10px;
  }
  .bz-block-agenda .bz-tabs .bz-tabs__container {
    width: calc(100% - 210px);
    padding-left: 24px;
  }
}
@media (min-width: 1200px) {
  .bz-agenda-item .bz-agenda-item__desc {
    font-size: 16px;
  }
  .bz-agenda-grid > ul {
    margin: 0;
  }
  .bz-agenda-grid > ul > li {
    padding-left: 32px;
    padding-right: 40px;
  }
}
/*---------- end block-agenda css ----------*/

/*---------- tabs css ----------*/
.bz-tabs .bz-tabs__title {
  margin-left: -15px;
  margin-right: -15px;
  padding-left: 15px;
  padding-right: 0;
  overflow-x: auto;
  overflow-y: hidden;
  margin-bottom: 16px;
}
.bz-tabs .bz-tabs__title > ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: stretch;
}
.bz-tabs .bz-tabs__title > ul > li {
  margin-right: 8px;
}
.bz-tabs .bz-tabs__title > ul > li:last-child {
  margin-right: 0;
  padding-right: 15px;
}
.bz-tabs .bz-tabs__title > ul > li > a {
  display: block;
  text-decoration: none;
  padding: 8px 16px;
  font-size: 16px;
  color: var(--text-color-site);
  font-weight: 700;
  white-space: nowrap;
  background-color: #fff;
  line-height: 1.5;
  border-radius: 4px;
}
.bz-tabs .bz-tabs__title > ul > li > a span {
  font-weight: 400;
  font-size: 14px;
  color: #666;
}
.bz-tabs .bz-tabs__title > ul > li.active > a {
  color: #fff;
  background-color: var(--bs-primary);
}
.bz-tabs .bz-tabs__title > ul > li.active > a span {
  color: #fff;
}
.bz-tabs:has(.bz-tabs__title > ul > li:only-child) .bz-tabs__title {
  display: none;
}
.bz-tabs .bz-tabs__pane {
  display: none;
}
.bz-tabs .bz-tabs__pane.is-current {
  display: block;
}

@media (min-width: 992px) {
  .bz-tabs .bz-tabs__title {
    margin-left: 0;
    margin-right: 0;
    padding-left: 0;
  }
  .bz-tabs .bz-tabs__title > ul {
    margin: 0;
    flex-wrap: wrap;
  }
  .bz-tabs .bz-tabs__title > ul > li {
    margin-right: 16px;
    margin-bottom: 8px;
  }
  .bz-tabs .bz-tabs__title > ul > li:last-child {
    padding-right: 0;
    margin-right: 0;
  }
}
/*---------- end tabs css ----------*/
</style>
