<script setup lang="ts">
import { useHead, onMounted } from '#imports';
interface Props {
    title: string
    description: string
    backgroundImage: string
}

onMounted(() => {
    useHead({
      bodyAttrs: {
        class: 'bg-dark'
      }
    })
})

defineProps<Props>()
</script>

<template>
    <div class="bz-block baynanza-block-intro bg-dark" :style="{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none' }">
        <div class="container">
            <div class="bz-box is-center">
                <div class="bz-box__title">
                    <div class="bz-box__title__main">
                        <div class="bz-box__title__name">{{ title }}</div>
                        <div v-if="description" class="bz-box__title__desc" v-html="description?.replaceAll('\n', '<br />')"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
/*---------- baynanza block intro css ----------*/
.baynanza-block-intro {
  padding-top: 13.125rem;
  padding-bottom: 4rem;
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: auto 125%;
}
.baynanza-block-intro .bz-box .bz-box__title {
  padding-bottom: 0;
}
.baynanza-block-intro .bz-box .bz-box__title .bz-box__title__name {
  font-weight: 300;
  margin-bottom: 18.125rem;
}
.baynanza-block-intro .bz-box .bz-box__title .bz-box__title__name:last-child {
  margin-bottom: 0;
}

@media (min-width: 768px) {
  .baynanza-block-intro {
    padding-top: 18.125rem;
    padding-bottom: 6rem;
  }
  .baynanza-block-intro .bz-box .bz-box__title .bz-box__title__name {
    margin-bottom: 23.125rem;
  }
}
@media (min-width: 992px) {
  .baynanza-block-intro {
    padding-top: 23.125rem;
    padding-bottom: 8rem;
    background-size: auto 115%;
  }
  .baynanza-block-intro .bz-box .bz-box__title .bz-box__title__name {
    margin-bottom: 28.125rem;
  }
}
@media (min-width: 1200px) {
  .baynanza-block-intro {
    padding-top: 28.75rem;
    padding-bottom: 10rem;
    background-size: auto auto;
  }
  .baynanza-block-intro .bz-box .bz-box__title .bz-box__title__name {
    margin-bottom: 33.125rem;
  }
}
/*---------- end baynanza block intro css ----------*/
.bz-box .bz-box__title .bz-box__title__name {
    color: #fff;
    font-weight: 500;
    letter-spacing: 3px
}

.bz-box .bz-box__title a.bz-box__title__name {
    color: #fff
}

.bz-box .bz-box__title .bz-box__title__desc {
    font-weight: 300;
    line-height: 1.6
}

@media (min-width: 1200px) {
    .bz-box .bz-box__title .bz-box__title__desc {
        max-width: 1020px;
        font-size: 1.25rem
    }

    .bz-box.is-center .bz-box__title__desc {
        margin-left: auto;
        margin-right: auto
    }
}

@media (min-width: 1600px) {
    .bz-box .bz-box__title .bz-box__title__desc {
        font-size: 1.5rem
    }
}
</style> 