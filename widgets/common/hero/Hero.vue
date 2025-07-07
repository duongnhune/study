<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  title: string;
  subtitle: string;
  eventDate: string;
  eventLocation: string;
  ctaText: string;
  ctaIcon: string;
  ctaLink: string;
  backgroundImage: string;
  textColor: string;
  buttonColor: string;
  buttonTextColor: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'CREATIVE FESTIVAL\nHANOI 2024',
  subtitle: 'CREATIVE MINDS COME TOGETHER',
  eventDate: 'Jan 12, 2025, 9:00AM',
  eventLocation: 'National convention center (ncc), Hanoi, vietnam',
  ctaText: 'Get Tickets',
  ctaIcon: 'arrow_forward',
  ctaLink: '#',
  backgroundImage: 'upload/site/templates/hero_banner.jpg',
  textColor: '',
  buttonColor: '',
  buttonTextColor: ''
});

const customColor = computed(() => {
  return {
    '--w-button-bg-color': props.buttonColor || 'var(--bs-primary)',
    '--w-text-color': props.textColor || 'var(--bs-white)',
    '--w-button-text-color': props.buttonTextColor || '#fff',
  }
})
</script>
<template>
  <div :style="[customColor]" class="bz-block bz-block-hero position-relative">
    <!-- Background image -->
    <div class="bz-hero__background">
      <img v-if="backgroundImage" :src="backgroundImage" alt="Hero background" class="bz-hero__background-image" />
    </div>

    <!-- Top section with overlay -->
    <div class="bz-hero__top-section">
      <div class="bz-hero__top-overlay"></div>
    </div>

    <!-- Middle section with content and its own overlay -->
    <div class="bz-hero__middle-section">
      <div class="bz-hero__middle-overlay"></div>
      <div class="container">
        <div class="bz-hero__content text-center">
          <!-- Main title with whitespace preserved -->
          <h1 class="bz-hero__title display-3 fw-bold mb-3" style="white-space: pre-line;">
            {{ title }}
          </h1>

          <!-- Subtitle -->
          <p class="bz-hero__subtitle fs-4 mb-4">
            {{ subtitle }}
          </p>

          <!-- CTA Button -->
          <div class="bz-hero__cta mb-5">
            <a class="btn btn-lg rounded-pill" :href="ctaLink || '#'">
              <span v-if="ctaIcon" class="material-symbols-outlined me-2">{{ ctaIcon }}</span>
              {{ ctaText }}
            </a>
          </div>

        </div>
      </div>
    </div>

    <!-- Bottom section with overlay -->
    <div class="bz-hero__bottom-section">
      <!-- Event details -->
      <div class="bz-hero__details d-flex justify-content-center align-items-center flex-wrap">
        <div class="bz-hero__date me-3">
          {{ eventDate }}
        </div>
        <div class="bz-hero__separator d-none d-md-block">|</div>
        <div class="bz-hero__location ms-md-3">
          {{ eventLocation }}
        </div>
      </div>
      <div class="bz-hero__bottom-overlay"></div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.bz-block-hero {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  .bz-hero__background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;

    &-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  /* Top section */
  .bz-hero__top-section {
    position: relative;
    height: 5rem;

    .bz-hero__top-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 0;
    }
  }

  /* Middle section - auto height */
  .bz-hero__middle-section {
    position: relative;
    padding: 40px 0;
    flex-grow: 1;
    z-index: 2;

    .bz-hero__middle-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: 0;
    }
  }

  /* Bottom section */
  .bz-hero__bottom-section {
    position: relative;
    height: 5rem;

    .bz-hero__bottom-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: -1;
    }
  }

  /* Content */
  .bz-hero__content {
    justify-items: center;
    position: relative;
    z-index: 1;

    .bz-hero__title {
      max-width: 50rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--w-text-color);
    }

    .bz-hero__subtitle {
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
      color: var(--w-text-color);
    }

    .bz-hero__cta {
      .btn {
        padding: 0.75rem 2rem;
        font-weight: 500;
        transition: all 0.3s ease;
        background-color: var(--w-button-bg-color);
        color: var(--w-button-text-color);

        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
      }
    }
  }

  .bz-hero__details {
    padding: 1.5rem 0;
    font-size: 0.8rem;
    color: var(--w-text-color);

    .bz-hero__location {
      color: var(--bs-primary);
    }
  }

  /* Mobile, small devices */
  @media (min-width: 576px) {
    .bz-hero__top-section {
      height: 6rem;
    }

    .bz-hero__bottom-section {
      height: 6rem;
    }

    .bz-hero__details {
      font-size: 1rem;
    }
  }

  /* Tablet */
  @media (min-width: 768px) {
    .bz-hero__top-section {
      height: 8rem;
    }

    .bz-hero__bottom-section {
      height: 8rem;
    }

    .bz-hero__details {
      font-size: 1.2rem;
    }
  }

  /* Laptop */
  @media (min-width: 992px) {
    .bz-hero__title {
      font-size: 4rem;
    }

    .bz-hero__subtitle {
      font-size: 1.5rem;
    }

    .bz-hero__top-section {
      height: 10rem;
    }

    .bz-hero__bottom-section {
      height: 10rem;
    }
  }
}
</style>
