<script setup lang="ts">
interface Stat {
  id?: string;
  value: string;
  label: string;
  icon?: string;
}

interface Props {
  titleText?: string;
  subtitleText?: string;
  centerTitle?: boolean;
  showTitleUnderline?: boolean;
  stats: Stat[];
  valueColor?: string;
  labelColor?: string;
  hideStatDividers?: boolean;
  backgroundColor?: string;
  backgroundImage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  centerTitle: true,
  showTitleUnderline: true,
  hideStatDividers: false,
  stats: () => [
    { id: '1', value: '100', label: 'Attendees', icon: 'people' },
    { id: '2', value: '50', label: 'Speakers', icon: 'person' },
    { id: '3', value: '10', label: 'Sessions', icon: 'event_note' },
    { id: '4', value: '5', label: 'Sponsors', icon: 'business' }
  ],
});

import { computed } from 'vue';

const statColumnClass = computed(() => {
  const count = props.stats.length;

  switch (count) {
    case 1: return 'col-12 col-md-8 col-lg-6';
    case 2: return 'col-12 col-md-6';
    case 3: return 'col-12 col-md-4';
    case 4: return 'col-12 col-sm-6 col-md-3';
    default: return count > 4 ? 'col-12 col-sm-6 col-md-4 col-lg-3' : 'col-12 col-sm-6 col-md-3';
  }
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

const customColor = computed(() => {
  return {
    '--w-value-color': props.valueColor || 'var(--bs-primary, #FE5B00)',
    '--w-label-color': props.labelColor || 'var(--bs-black, #000)',
  };
});
</script>
<template>
  <div class="bz-block bz-block-event-stats" :style="[backgroundStyle, customColor]">
    <div class="container py-4">
      <div class="bz-box" :class="{ 'is-center': centerTitle }">
        <div class="bz-box__title" v-if="titleText">
          <div class="bz-box__title__main" :class="{ 'text-left': !centerTitle }">
            <div class="bz-box__title__name" :class="{ 'title-with-underline': showTitleUnderline }">{{ titleText }}
            </div>
            <div class="bz-box__title__desc" v-if="subtitleText">{{ subtitleText }}</div>
          </div>
        </div>
        <div class="bz-box__content">
          <div class="bz-event-stats">
            <div class="row justify-content-center">
              <div v-for="(stat, index) in stats" :key="index" :class="[
                statColumnClass,
                'mb-4 mb-md-0 position-relative'
              ]">
                <div class="bz-event-stats__item">
                  <div class="bz-event-stats__divider" v-if="index > 0 && !hideStatDividers"></div>
                  <div class="bz-event-stats__content">
                    <span v-if="stat.icon" class="material-symbols-outlined bz-event-stats__icon">{{ stat.icon }}</span>
                    <div class="bz-event-stats__value">
                      {{ stat.value }}
                    </div>
                    <div class="bz-event-stats__label">
                      {{ stat.label }}
                    </div>
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

.bz-event-stats {
  &__item {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    padding: 1.5rem;
    text-align: start;
  }

  &__divider {
    position: absolute;
    left: 0;
    top: 10%;
    bottom: 10%;
    width: 2px;
    background-color: var(--bs-primary, #FE5B00);
  }

  &__content {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  &__icon {
    font-size: 2rem;
    color: var(--w-value-color);
    margin-bottom: 0.5rem;
  }

  &__value {
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 0.5rem;
    color: var(--w-value-color);

    @media (min-width: 768px) {
      font-size: 2.5rem;
    }
  }

  &__label {
    font-size: 1rem;
    line-height: 1.5;
    color: var(--w-label-color);
    word-wrap: break-word;
    max-width: 100%;

    overflow-wrap: break-word;
    word-break: normal;
    hyphens: auto;

    @media (min-width: 768px) {
      font-size: 1.125rem;
      max-width: 90%;
    }
  }
}

@media (max-width: 767px) {
  .bz-event-stats__divider {
    display: none;
  }

  .bz-event-stats__item {
    align-items: start;
    border-bottom: 1px solid var(--bs-primary, #FE5B00);
    padding-bottom: 2rem;
    margin-bottom: 2rem;

    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
      margin-bottom: 0;
    }
  }

  .bz-event-stats__value {
    font-size: 3rem;
  }
}

@media (max-width: 575px) {
  .bz-event-stats__value {
    font-size: 2.5rem;
  }

  .bz-event-stats__label {
    font-size: 0.9rem;
  }
}
</style>
