<script setup lang="ts">
interface TimeLocation {
  id: string;
  date: string;
  time: string;
  location: string;
  description?: string;
}

interface Props {
  titleText: string;
  subtitleText?: string;
  centerTitle?: boolean;
  showTitleUnderline?: boolean;
  dateLabel: string;
  timeLabel: string;
  locationLabel: string;
  timeLocations: TimeLocation[];
  mapIframeHtml: string;
  backgroundColor?: string;
  backgroundImage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  titleText: 'Time & Location',
  mapIframeHtml: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125423.51942465708!2d106.70243839999999!3d10.774118399999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317525ce3182fe9f%3A0xf24844a274b7ab7d!2zS2h1IHZ1aSBjaMahaSBUdXnhur90IFNub3cgVG93biBTw6BpIEfDsm4!5e0!3m2!1svi!2s!4v1744950201277!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  centerTitle: true,
  showTitleUnderline: true,
  dateLabel: 'Date',
  timeLabel: 'Time',
  timeLocations: () => [{
    id: '1',
    date: 'January 12, 2025',
    time: '9:00 AM - 5:00 PM',
    location: 'National Convention Center (NCC), Hanoi, Vietnam',
  }],
  locationLabel: 'Location'
});

import { computed } from 'vue';

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
<template>
  <div class="bz-block bz-block-time-location" :style="backgroundStyle">
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
          <div class="bz-time-location">
            <div class="bz-time-location__map" v-if="mapIframeHtml" v-html="mapIframeHtml"></div>
            <div class="bz-time-location__info">
              <div class="bz-time-location__details">
                <div v-for="(timeLocation, index) in timeLocations" :key="index" class="bz-time-location__item">
                  <div class="bz-time-location__columns">
                    <div class="bz-time-location__column">
                      <div class="bz-time-location__label">{{ dateLabel }}</div>
                      <div class="bz-time-location__value">{{ timeLocation.date }}</div>
                    </div>
                    <div class="bz-time-location__column">
                      <div class="bz-time-location__label">{{ timeLabel }}</div>
                      <div class="bz-time-location__value">{{ timeLocation.time }}</div>
                    </div>
                    <div class="bz-time-location__column">
                      <div class="bz-time-location__label">{{ locationLabel }}</div>
                      <div class="bz-time-location__value is-location">{{ timeLocation.location }}</div>
                    </div>
                  </div>
                  <div v-if="timeLocation.description" class="bz-time-location__description">
                    {{ timeLocation.description }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.is-location {
  color: var(--bs-primary, #FE5B00) !important;
}

.bz-time-location {
  display: flex;
  flex-direction: column;

  &__map {
    width: 100%;
    border-radius: 0.5rem;
    overflow: hidden;
    margin-bottom: 1rem;

    :deep(iframe) {
      width: 100%;
      height: 400px;
      display: block;
      border: 0;
    }
  }

  &__info {
    width: 100%;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  &__details {
    padding: 1.5rem;
  }

  &__item {
    &:not(:last-child) {
      margin-bottom: 1.5rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
  }

  &__columns {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (min-width: 768px) {
      flex-direction: row;
    }
  }

  &__column {
    flex: 1;
  }

  &__label {
    font-size: 0.875rem;
    margin-bottom: 0.25rem;
  }

  &__value {
    font-size: 1.125rem;
    font-weight: 600;
    color: #000;

    &:nth-child(3) {
      color: var(--bs-secondary, #E50914);
    }
  }

  &__description {
    margin-top: 1rem;
    font-size: 0.875rem;
    color: #6c757d;
  }

  @media (min-width: 992px) {
    &__map {
      margin-bottom: 0;
    }

    &__info {
      position: relative;
      margin-top: -4rem;
      margin-left: auto;
      margin-right: auto;
      width: 90%;
      max-width: 1000px;
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
