<script setup lang="ts">
import BaynanzaHeader from './BaynanzaHeader.vue';
import BaynanzaHeaderType from './BaynanzaHeader';
import BaynanzaFooter from './BaynanzaFooter.vue';
import BaynanzaFooterType from './BaynanzaFooter';
import BaynanzaTicketRegistration from './BaynanzaTicketRegistration.vue';
const route = useRoute();


const pageStore = usePageStore();
pageStore.setTicketRegistrationData({
  eventIDParam: '6836d16321d9e15d5af3e149',
  reservationIDParam: route.query.reservationID as string
});

const siteStore = useSiteStore();
siteStore.setSite({
  id: '6836d16321d9e15d5af3e149',
  name: 'Baynanza',
  scopedID: '6836d26',
  widgets: []
});

const css = `
:root, [data-bs-theme="light"] {
        --bs-primary: #FFC469;
        --bs-primary-rgb: 255, 196, 105;
        --bs-secondary: rgba(255, 255, 255, 0.50);
        --bs-secondary-rgb: 255, 255, 255;
        --bs-dark: #000;
        --bs-dark-rgb: 0, 0, 0;
        --bs-light: #f8f9fa;
        --bs-light-rgb: 248, 249, 250;
        --font-site: InterVariable, sans-serif;
        --font-title: InterVariable, sans-serif;
        --font-desc: InterVariable, sans-serif;
        --font-detail: InterVariable, sans-serif;
        --text-color-site: #fff;
        --text-color-title: #fff;
        --text-color-desc: rgba(255, 255, 255, 0.50);
        --text-color-detail: #fff;
        --container-lg-width: 960px;
        --container-xl-width: 1140px;
        --container-xxl-width: 1320px;
        --bs-border-color: #E5E7EB;
      }
      
      .bz-block {
        --padding-unit: 2rem;
        --padding-unit-md: 2.5rem;
        --padding-unit-lg: 3rem;
        --margin-unit: 1rem;
        --margin-unit-md: 1.5rem;
        --margin-unit-lg: 2rem;
      }
      
      .bz-box {
        --fontsize-unit: 1.25rem;
        --fontsize-unit-md: 1.25rem;
        --fontsize-unit-lg: 1.875rem;
      }
      

      .btn-primary {
        --bs-btn-color: #fff;
        --bs-btn-bg: radial-gradient(223.29% 244.62% at 34.05% -119.74%, rgba(255, 255, 255, 0.20) 0%, rgba(66, 66, 66, 0.02) 100%), rgba(0, 0, 0, 0.50);
        --bs-btn-border-color: #fff;
        --bs-btn-hover-color: var(--bs-primary);
        --bs-btn-hover-border-color: var(--bs-primary);
        --bs-btn-hover-bg: radial-gradient(223.29% 244.62% at 34.05% -119.74%, rgba(255, 255, 255, 0.20) 0%, rgba(66, 66, 66, 0.02) 100%), rgba(0, 0, 0, 0.50);
        --bs-btn-active-color: var(--bs-black);
        --bs-btn-active-bg: var(--bs-primary);
        --bs-btn-active-border-color: var(--bs-primary);
        --bs-btn-disabled-bg: var(--bs-btn-bg);
        --bs-btn-disabled-color: #fff;
        --bs-btn-disabled-border-color: #fff;
        border-radius: var(--bs-border-radius-pill) !important
      }
      

      .btn-secondary {
        --bs-btn-color: #fff;
        --bs-btn-bg: #fff;  
        --bs-btn-border-color: #fff;
        --bs-btn-hover-color: var(--bs-primary);
        --bs-btn-hover-border-color: var(--bs-primary);
        --bs-btn-active-color: var(--bs-black);
        --bs-btn-active-bg: var(--bs-primary);
        --bs-btn-active-border-color: var(--bs-primary);
        --bs-btn-disabled-bg: var(--bs-secondary);
        --bs-btn-disabled-color: var(--bs-secondary);
        --bs-btn-disabled-border-color: var(--bs-secondary);
      }

      .btn-link {
        --bs-btn-color: var(--text-color-site);
        --bs-btn-hover-color: var(--bs-primary);
        --bs-btn-active-color: var(--bs-primary);
        --bs-btn-disabled-color: var(--text-color-desc);
      }

      .form-label {
        font-weight: 400;
      }

      .form-control,
      .form-select {
        --bs-border-color: rgba(255, 255, 255, 0.1);
        --bs-body-bg: rgba(255, 255, 255, 0.10);
        --bs-body-color: #ffffff;
        --bs-form-control-bg: rgba(255, 255, 255, 0.05);
        --bs-form-control-color: #ffffff;
        --bs-form-control-border-color: rgba(255, 255, 255, 0.1);
        --bs-form-control-placeholder-color: rgba(255, 255, 255, 0.5);
        --bs-form-select-bg: rgba(255, 255, 255, 0.05);
        --bs-form-select-color: #ffffff;
        --bs-form-select-border-color: rgba(255, 255, 255, 0.1);
      }

      .form-control:focus,
      .form-select:focus {
        border: 1px solid var(--bs-primary);
      }

      .form-check-input:checked {
        background-color: var(--bs-primary);
        border-color: var(--bs-primary);
      }
`;


useHead({
  style: [{ innerHTML: css, tagPriority: 0 }]
});


</script>

<template>
  <BaynanzaHeader class="bz-header" v-bind="JSON.parse(BaynanzaHeaderType.defaultProps)" />
  <div class="bz-content">
    <BaynanzaTicketRegistration class="bz-ticket-registration" v-bind="{ formID: '6836d26921d9e15d5af3e15b', backgroundImage: 'https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/baynanza/baynanza-bg-1.png' }" />
  </div>
  <BaynanzaFooter class="bz-footer" v-bind="JSON.parse(BaynanzaFooterType.defaultProps)" />
</template>

<style>
</style>