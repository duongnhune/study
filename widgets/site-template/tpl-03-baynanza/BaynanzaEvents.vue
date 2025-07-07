<script setup lang="ts">
interface Props {
    title: string
    backgroundImage: string
    comingSoonItem: number
    events: {
        title: string
        date: string
        description: string
        image: string
        link: string
    }[]
}
defineProps<Props>()
</script>

<template>
    <div class="bz-block baynanza-block-album" id="baynanza-block-album"
        :style="{ backgroundImage: `url(${backgroundImage})` }">
        <div class="bz-album-grid">
            <ul>
                <li v-for="(event, index) in events" :key="index">
                    <div class="bz-album-item">
                        <div class="bz-album-item__img">
                            <a :href="event.link">
                                <img :src="event.image" :alt="event.title">
                            </a>
                        </div>
                        <div class="bz-album-item__content">
                            <h3 class="bz-album-item__title">
                                <a :href="event.link">{{ event.title }}</a>
                            </h3>
                            <div class="bz-album-item__time">{{ event.date }}</div>
                            <div class="bz-album-item__desc">{{ event.description }}</div>
                        </div>
                    </div>
                </li>
                <li v-for="i in comingSoonItem" :key="`coming-soon-${i}`">
                    <div class="bz-album-item is-coming-soon">
                        <div class="bz-album-item__content">
                            <h3 class="bz-album-item__title">Coming soon</h3>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="css" scoped>
/*---------- baynanza block album css ----------*/
.baynanza-block-album {
  background-repeat: no-repeat;
  background-position: bottom center;
  background-size: cover;
}
.baynanza-block-album .bz-album-grid > ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.baynanza-block-album .bz-album-item {
  overflow: hidden;
  position: relative;
  z-index: 1;
}
.baynanza-block-album .bz-album-item .bz-album-item__img {
  padding-top: 64.8111332008%;
  position: relative;
  z-index: 1;
}
.baynanza-block-album .bz-album-item .bz-album-item__img a {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.baynanza-block-album .bz-album-item .bz-album-item__img a:before {
  content: "";
  z-index: 3;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  -webkit-transition: all 0.2s ease;
  -moz-transition: all 0.2s ease;
  transition: all 0.2s ease;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
  -moz-opacity: 0;
  -khtml-opacity: 0;
  opacity: 0;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.baynanza-block-album .bz-album-item .bz-album-item__img img {
  width: 100%;
  height: auto;
  min-height: 100%;
  object-fit: cover;
}
.baynanza-block-album .bz-album-item .bz-album-item__content {
  position: absolute;
  z-index: 4;
  top: 0;
  left: 0;
  right: 0;
  padding: 0.9375rem;
  -webkit-transition: all 0.2s ease;
  -moz-transition: all 0.2s ease;
  transition: all 0.2s ease;
}
.baynanza-block-album .bz-album-item .bz-album-item__title {
  margin-bottom: 0;
  font-size: 15px;
  line-height: 1.5;
  text-transform: uppercase;
  font-weight: 500;
  color: #fff;
}
.baynanza-block-album .bz-album-item .bz-album-item__title a {
  color: #fff;
  text-decoration: none;
}
.baynanza-block-album .bz-album-item .bz-album-item__time {
  color: #fff;
  font-size: 12px;
  line-height: 1.5;
}
.baynanza-block-album .bz-album-item .bz-album-item__desc {
  color: rgba(255, 255, 255, 0.7);
  font-size: 10px;
  line-height: 1.5;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
  -moz-opacity: 0;
  -khtml-opacity: 0;
  opacity: 0;
  -webkit-transition: all 0.2s ease;
  -moz-transition: all 0.2s ease;
  transition: all 0.2s ease;
}
.baynanza-block-album .bz-album-item:hover .bz-album-item__img a:before {
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
  filter: alpha(opacity=100);
  -moz-opacity: 1;
  -khtml-opacity: 1;
  opacity: 1;
}
.baynanza-block-album .bz-album-item:hover .bz-album-item__content {
  top: auto;
  bottom: 0;
}
.baynanza-block-album .bz-album-item:hover .bz-album-item__desc {
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
  filter: alpha(opacity=100);
  -moz-opacity: 1;
  -khtml-opacity: 1;
  opacity: 1;
}
.baynanza-block-album .bz-album-item.is-coming-soon {
  padding-top: 64.8111332008%;
}
.baynanza-block-album .bz-album-item.is-coming-soon:before {
  content: "";
  z-index: 3;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  -webkit-transition: all 0.2s ease;
  -moz-transition: all 0.2s ease;
  transition: all 0.2s ease;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
}
.baynanza-block-album .bz-album-item.is-coming-soon .bz-album-item__content {
  bottom: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

@media (min-width: 768px) {
  .baynanza-block-album .bz-album-grid > ul {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: stretch;
    justify-content: center;
  }
  .baynanza-block-album .bz-album-grid > ul > li {
    width: 50%;
  }
}
@media (min-width: 992px) {
  .baynanza-block-album .bz-album-grid > ul > li {
    width: 33.3333333333%;
  }
}
@media (min-width: 1600px) {
  .baynanza-block-album {
    max-width: 1512px;
    margin: 0 auto;
  }
}
/*---------- end baynanza block album css ----------*/
</style>