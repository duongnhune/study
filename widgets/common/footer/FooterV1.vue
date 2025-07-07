<script setup lang="ts">
import { computed } from 'vue';

interface Location {
  address: string;
  icon?: string;
}

interface Props {
  primaryLogo: string;
  secondaryLogo: string;
  logoLink?: string;

  contactTitle: string;
  contactPhone?: string;
  contactPhoneIcon?: string;
  contactEmail?: string;
  contactEmailIcon?: string;

  locationsTitle: string;
  locations: Location[];

  backgroundColor?: string;
  textColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  logoLink: '#',
  contactPhoneIcon: 'call',
  contactEmailIcon: 'mail',
  backgroundColor: '',
  textColor: ''
});

const footerStyles = computed(() => ({
  '--w-bg-color': props.backgroundColor || 'var(--bs-dark)',
  '--w-text-color': props.textColor || 'var(--bs-white)'
}));
</script>

<template>
  <footer class="bz_footer_v1" :style="footerStyles">
    <div class="container">
      <div class="bz-row">
        <!-- Logo Section -->
        <div class="bz-col">
          <div class="bz_block bz_block_logo">
            <div class="bz_logo">
              <a :href="logoLink">
                <img class="bz_logo__primary" :src="primaryLogo" alt="logo">
                <img class="bz_logo__secondary" :src="secondaryLogo" alt="logo">
              </a>
            </div>
          </div>
        </div>

        <!-- Contact Section -->
        <div class="bz-col">
          <div class="bz_block bz_block_contact">
            <div class="bz_contact">
              <h3>{{ contactTitle }}</h3>
              <p v-if="contactPhone">
                <span class="material-symbols-outlined text-size-medium me-1">{{ contactPhoneIcon }}</span>
                {{ contactPhone }}
              </p>
              <p v-if="contactEmail">
                <span class="material-symbols-outlined text-size-medium me-1">{{ contactEmailIcon }}</span>
                {{ contactEmail }}
              </p>
            </div>
          </div>
        </div>

        <!-- Locations Section -->
        <div class="bz-col">
          <div class="bz_block bz_block_locations">
            <div class="bz_locations">
              <h3>{{ locationsTitle }}</h3>
              <p v-for="(location, index) in locations" :key="index">
                <span class="material-symbols-outlined text-size-medium me-1">{{ location.icon || 'location_on'
                }}</span>
                {{ location.address }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.bz_footer_v1 {
  background-color: var(--w-bg-color);
  color: var(--w-text-color);
  padding: 60px 0;

  .bz-row {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
  }

  .bz-col {
    flex: 1;
    min-width: 250px;
  }

  h3 {
    color: var(--w-text-color);
    margin-bottom: 20px;
    font-size: 1.25rem;
    font-weight: 600;
  }

  p {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .material-symbols-outlined {
    font-size: 20px;
  }
}

/* Logo styles */
.bz_logo img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 40px;
  margin-bottom: 20px;
}

.bz_logo .bz_logo__secondary {
  display: none;
}

/* Responsive styles */
@media (max-width: 991px) {
  .bz_footer_v1 {
    padding: 40px 0;
    margin-top: 40px;

    .bz-col {
      flex: 100%;
      text-align: center;
    }

    .bz_logo {
      display: flex;
      justify-content: center;
    }

    p {
      justify-content: center;
    }
  }
}
</style>