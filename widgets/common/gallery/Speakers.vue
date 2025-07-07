<template>
  <div class="bz-block bz-block-speakers" :style="[backgroundStyle]">
    <div class="container py-5">
      <div class="bz-box" :class="{ 'is-center': centerTitle }">
        <div class="bz-box__title" v-if="titleText">
          <div class="bz-box__title__main" :class="{ 'text-left': !centerTitle }">
            <div class="bz-box__title__name" :class="{ 'title-with-underline': showTitleUnderline }">{{ titleText }}
            </div>
            <div class="bz-box__title__desc" v-if="subtitleText">{{ subtitleText }}</div>
          </div>
        </div>
        <div class="bz-box__content">
          <div class="bz-speakers-grid">
            <div v-for="speaker in speakers" :key="speaker.id" class="bz-speaker-item"
              :class="{ 'has-hover-effect': hoverEffect }">
              <div class="bz-speaker-item__inner">
                <div class="bz-speaker-item__image">
                  <img :src="speaker.imageUrl" :alt="speaker.name">
                  <div class="bz-speaker-item__overlay" v-if="showOverlay">
                    <div class="bz-speaker-item__info">
                      <h3 class="bz-speaker-item__name">{{ speaker.name }}</h3>
                      <p class="bz-speaker-item__position">{{ speaker.position }}</p>
                    </div>
                  </div>
                </div>
                <div class="bz-speaker-item__details" v-if="!showOverlay">
                  <h3 class="bz-speaker-item__name">{{ speaker.name }}</h3>
                  <p class="bz-speaker-item__position">{{ speaker.position }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';

interface Speakers {
  id: string;
  name: string;
  position: string;
  imageUrl: string;
  bio?: string;
}

interface SocialLink {
  id: string;
  speakerId: string;
  platform: string;
  url: string;
}

interface Props {
  titleText: string;
  subtitleText?: string;
  centerTitle?: boolean;
  showTitleUnderline?: boolean;
  speakers: Speakers[];
  socialLinks: SocialLink[];
  columns?: number;
  hoverEffect?: boolean;
  showOverlay?: boolean;
  backgroundColor?: string;
  backgroundImage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  centerTitle: true,
  showTitleUnderline: true,
  columns: 4,
  hoverEffect: true,
  showOverlay: true,
  speakers: () => [
    {
      id: '1',
      name: 'John Doe',
      position: 'CEO, Example Corp',
      imageUrl: 'upload/site/templates/speaker_1.jpg',
    },
    {
      id: '2',
      name: 'Jane Smith',
      position: 'CTO, Example Inc',
      imageUrl: 'upload/site/templates/speaker_2.jpg',
    },
    {
      id: '3',
      name: 'Alice Johnson',
      position: 'CMO, Example Ltd',
      imageUrl: 'upload/site/templates/speaker_3.jpg',
    },
    {
      id: '4',
      name: 'Bob Brown',
      position: 'COO, Example Group',
      imageUrl: 'upload/site/templates/speaker_4.jpg',
    },
    {
      id: '5',
      name: 'Charlie Black',
      position: 'CFO, Example LLC',
      imageUrl: 'upload/site/templates/speaker_5.jpg',
    },
    {
      id: '6',
      name: 'Diana White',
      position: 'CSO, Example AG',
      imageUrl: 'upload/site/templates/speaker_6.jpg',
    },
    {
      id: '7',
      name: 'Ethan Green',
      position: 'CIO, Example GmbH',
      imageUrl: 'upload/site/templates/speaker_7.jpg',
    },
    {
      id: '8',
      name: 'Fiona Blue',
      position: 'CDO, Example S.A.',
      imageUrl: 'upload/site/templates/speaker_8.jpg',
    },
  ],
  socialLinks: () => []
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
  }

  return style;
});
</script>

<style lang="scss" scoped>
.bz-speakers-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;

  @media (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 992px) {
    grid-template-columns: v-bind('`repeat(${props.columns}, 1fr)`');
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.bz-speaker-item {
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  aspect-ratio: 3/4;

  &__inner {
    position: relative;
    height: 100%;
    width: 100%;
  }

  &__image {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;
      transition: transform 0.3s ease;
    }
  }

  &__overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
    padding: 1.5rem;
    color: white;
    opacity: 1;
    transition: opacity 0.3s ease;
  }

  &__details {
    padding: 1rem;
    text-align: center;
  }

  &__name {
    font-weight: 600;
    margin-bottom: 0.25rem;
    font-size: 1.125rem;
  }

  &__position {
    font-size: 0.875rem;
    color: var(--bs-white, #FFFFFF);
    margin: 0;
  }

  &.has-hover-effect {
    &:hover {
      .bz-speaker-item__image img {
        transform: scale(1.05);
      }

      .bz-speaker-item__overlay {
        opacity: 1;
      }
    }

    .bz-speaker-item__overlay {
      opacity: 0;
    }
  }
}

.title-with-underline {
  position: relative;
  display: inline-block;
  padding-bottom: 0.5rem;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: var(--bs-primary, #FE5B00);
  }

  .text-left & {
    &:after {
      left: 0;
      transform: none;
    }
  }
}
</style>
