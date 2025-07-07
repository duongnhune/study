<script setup lang="ts">
interface Session {
  time: string
  title: string
  speaker?: string
  desc?: string
  image?: string
}
interface Day {
  label: string
  sessions: Session[]
}
interface Props {
  title: string
  desc?: string
  days: Day[]
}
defineProps<Props>()
</script>

<template>
  <div class="bz-block is-padding-top-large is-padding-bottom-large bg-primary bz-block-agenda vvs-nic-block-agenda" id="vvs-nic-block-agenda">
    <div class="container">
      <div class="bz-box">
        <div class="bz-box__title">
          <div class="bz-box__title__main">
            <div class="bz-box__title__name">{{ title }}</div>
            <div class="bz-box__title__desc" v-if="desc">{{ desc }}</div>
          </div>
        </div>
        <div class="bz-box__content">
          <div class="bz-tabs">
            <div class="bz-tabs__title">
              <ul>
                <li v-for="(day, idx) in days" :key="idx" :class="{ active: idx === 0 }">
                  <a :href="'#day-' + idx">Day {{ idx + 1 }}:<br><span>{{ day.label }}</span></a>
                </li>
              </ul>
            </div>
            <div class="bz-tabs__container">
              <div v-for="(day, idx) in days" :key="idx" class="bz-tabs__pane" :class="{ 'is-current active': idx === 0 }" :id="'day-' + idx">
                <div class="bz-agenda-grid">
                  <ul>
                    <li v-for="(session, sidx) in day.sessions" :key="sidx">
                      <div class="bz-agenda-item">
                        <div class="bz-agenda-item__head">
                          <div class="bz-agenda-item__time">{{ session.time }}</div>
                        </div>
                        <div class="bz-agenda-item__content">
                          <h3 class="bz-agenda-item__title">{{ session.title }}</h3>
                          <div class="bz-agenda-author" v-if="session.speaker">
                            <div class="bz-agenda-author__img" v-if="session.image"><img :src="session.image" alt="author" /></div>
                            <div class="bz-agenda-author__text">
                              <div class="bz-agenda-author__name">{{ session.speaker }}</div>
                            </div>
                          </div>
                          <p class="bz-agenda-item__desc" v-if="session.desc">{{ session.desc }}</p>
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
.bg-primary {
  background-color: #070a4f !important;
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
</style>