<template>
  <div class="bz-block bz-block-event-overview position-relative" :style="[customColor]">
    <!-- Background image -->
    <div class="bz-event-overview__background" v-if="backgroundImage">
      <img :src="backgroundImage" alt="Event background" class="bz-event-overview__background-image" />
    </div>

    <!-- Content container -->
    <div class="container py-5">
      <div class="bz-box is-center">
        <div class="bz-box__content">
          <div class="bz-event-overview__content">
            <!-- Title with accent -->
            <div class="bz-box__title">
              <div class="bz-box__title__main">
                <div class="bz-box__title__name title-with-underline">
                  {{ title }}
                </div>
              </div>
            </div>

            <!-- Description text -->
            <div class="bz-event-overview__body">
              <p class="bz-event-overview__description">
                {{ description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  title: string;
  description: string;
  backgroundColor: string;
  backgroundOpacity: number;
  textColor: string;
  backgroundImage: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Event Overview',
  description: 'This is a brief overview of the event.',
  backgroundColor: '',
  backgroundOpacity: 1,
  textColor: "#111827",
  backgroundImage: 'upload/templates/template_1/event_overview.jpg'
});
const customColor = computed(() => {
  return {
    '--w-background-color': props.backgroundColor || 'var(--bs-white)',
    '--w-text-color': props.textColor || 'var(--bs-black)',
    '--w-background-opacity': (typeof props.backgroundOpacity == 'number') ? props.backgroundOpacity : 1
  }
})
</script>

<style lang="scss" scoped>
.bz-block-event-overview {
  position: relative;
  width: 100%;
}

.bz-event-overview__background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.bz-event-overview__background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.bz-event-overview__content {
  padding: 3rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  background-color: var(--w-background-color, rgba(255, 255, 255, 0.9));
  opacity: var(--w-background-opacity, 1);
}

@media (max-width: 768px) {
  .bz-event-overview__content {
    padding: 2rem 1.5rem;
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
    width: 80px;
    height: 4px;
    border-radius: 2px;
    background-color: var(--bs-primary, #FE5B00);
  }

  .text-left & {
    &:after {
      left: 0;
      transform: none;
    }
  }
}

.bz-event-overview__description {
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 0;
  color: var(--w-text-color, #000);
}

@media (max-width: 768px) {
  .bz-event-overview__description {
    font-size: 1rem;
    line-height: 1.6;
  }
}
</style>
