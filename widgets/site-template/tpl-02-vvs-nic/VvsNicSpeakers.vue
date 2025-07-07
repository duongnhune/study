<script setup lang="ts">
interface Speaker {
  name: string
  role?: string
  image: string
}
interface Props {
  title: string
  desc?: string
  speakers: Speaker[]
}
defineProps<Props>()
</script>

<template>
  <div class="bz-block is-padding-top-large is-padding-bottom bz-block-speakers vvs-nic-block-speakers" id="vvs-nic-block-speakers">
    <div class="container">
      <div class="bz-box is-center">
        <div class="bz-box__title">
          <div class="bz-box__title__main">
            <div class="bz-box__title__name">{{ title }}</div>
            <div class="bz-box__title__desc" v-if="desc">{{ desc }}</div>
          </div>
        </div>
        <div class="bz-box__content">
          <div class="bz-speakers-grid">
            <ul>
              <li v-for="(speaker, idx) in speakers" :key="idx">
                <div class="bz-grid">
                  <div class="bz-grid__img">
                    <a href="#"><img :src="speaker.image" alt="speaker" /></a>
                  </div>
                  <div class="bz-grid__content">
                    <div class="bz-grid__row">
                      <h3 class="bz-grid__title"><a href="#">{{ speaker.name }}</a></h3>
                    </div>
                    <div class="bz-grid__row bz-grid__desc" v-if="speaker.role">{{ speaker.role }}</div>
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

<style scoped>
.bz-speakers-grid .bz-grid {
  position: relative;
  z-index: 1;
}
.bz-speakers-grid .bz-grid .bz-grid__img {
  width: 100%;
  float: none;
  padding-top: 127.2131147541%;
  overflow: hidden;
  position: relative;
  z-index: 1;
}
.bz-speakers-grid .bz-grid .bz-grid__img a {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.bz-speakers-grid .bz-grid .bz-grid__img a img {
  width: 100%;
  height: auto;
  min-height: 100%;
  object-fit: cover;
}
.bz-speakers-grid .bz-grid .bz-grid__content {
  position: absolute;
  z-index: 3;
  bottom: 0;
  left: 0;
  right: 0;
  margin-left: 0;
  padding: 12px;
  background-color: rgba(0, 0, 0, 0.8);
  background: linear-gradient(to top, #ED1C24, rgba(237, 28, 36, 0));
  background: -webkit-linear-gradient(to top, #ED1C24, rgba(237, 28, 36, 0)); /* Firefox 3.6+ */
  background: -moz-linear-gradient(to top, #ED1C24, rgba(237, 28, 36, 0)); /* IE 10 */
  background: -ms-linear-gradient(to top, #ED1C24, rgba(237, 28, 36, 0)); /* Opera 11.10+ */
  background: -o-linear-gradient(to top, #ED1C24, rgba(237, 28, 36, 0));
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.vvs-nic-block-speakers .bz-speakers-grid .bz-grid .bz-grid__img {
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  border-radius: 10px;
}
.bz-grid .bz-grid__img {
  height: 50px;
  overflow: hidden;
  background-color: #ececec;
  background-repeat: no-repeat;
  background-position: center center;
}
.bz-box .bz-box__title .bz-box__title__name {
  color: #ED1C24;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 8px;
  text-transform: uppercase;
}
.bz-box__title__desc {
  color: #ccc;
  font-size: 16px;
  margin-bottom: 0;
}
.bz-speakers-grid .bz-grid .bz-grid__row {
  text-align: center;
  margin-bottom: 8px;
  color: #fff;
  font-size: 12px;
  line-height: 1.4;
}
.bz-speakers-grid .bz-grid .bz-grid__row:last-child {
  margin-bottom: 0;
}
.bz-speakers-grid .bz-grid .bz-grid__row.is-bold {
  font-weight: 700;
}
.bz-speakers-grid .bz-grid .bz-grid__title {
  margin-bottom: 0;
  font-size: 16px;
  color: #fff;
}
.bz-speakers-grid .bz-grid .bz-grid__title a {
  text-decoration: none;
  color: #fff;
}
.bz-speakers-grid > ul {
  list-style: none;
  margin: 0 -3px;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  flex-wrap: wrap;
}
.bz-speakers-grid > ul > li {
  padding-bottom: 6px;
  width: 50%;
  padding-left: 3px;
  padding-right: 3px;
}

@media (min-width: 576px) {
  .bz-speakers-grid .bz-grid .bz-grid__title {
    font-size: 18px;
  }
}
@media (min-width: 768px) {
  .bz-speakers-grid .bz-grid .bz-grid__content {
    padding: 16px;
  }
  .bz-speakers-grid .bz-grid .bz-grid__row {
    font-size: 14px;
  }
  .bz-speakers-grid .bz-grid .bz-grid__title {
    font-size: 20px;
  }
  .bz-speakers-grid > ul > li {
    width: 33.3333333333%;
  }
  .vvs-nic-block-speakers .bz-speakers-grid > ul > li {
    padding-bottom: 20px;
    padding-left: 10px;
    padding-right: 10px;
  }
}
@media (min-width: 992px) {
  .bz-speakers-grid .bz-grid .bz-grid__title {
    font-size: 22px;
  }
  .bz-speakers-grid .bz-grid .bz-grid__content {
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
    -moz-opacity: 0;
    -khtml-opacity: 0;
    opacity: 0;
  }
  .bz-speakers-grid .bz-grid:hover .bz-grid__content {
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    filter: alpha(opacity=100);
    -moz-opacity: 1;
    -khtml-opacity: 1;
    opacity: 1;
  }
  .bz-speakers-grid > ul > li {
    width: 25%;
  }
}
@media (min-width: 1200px) {
  .bz-box .bz-box__title .bz-box__title__desc {
    font-size: 24px;
  }
  .bz-speakers-grid .bz-grid .bz-grid__title {
    font-size: 24px;
  }
  .bz-speakers-grid .bz-grid .bz-grid__row {
    font-size: 16px;
  }
}
</style>