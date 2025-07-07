<script setup lang="ts">
import TPL01Header from '../TPL01-Header.vue';
import TPL01HeaderType from '../TPL01-Header';
import TPL01Footer from '../TPL01-Footer.vue';
import TPL01FooterType from '../TPL01-Footer';
import TPL01Registration from './TPL01-Registration.vue';
import TPL01RegistrationType from './TPL01-Registration';
const route = useRoute();

const pageStore = usePageStore();
pageStore.setTicketRegistrationData({
	eventIDParam: '6836d16321d9e15d5af3e149',
	reservationIDParam: route.query.reservationID as string
});

const siteStore = useSiteStore();
siteStore.setSite({
	id: '6836d16321d9e15d5af3e149',
	name: 'Creative Festival',
	scopedID: '6836d26',
	widgets: []
});

const css = `
:root, [data-bs-theme="light"] {
        --bs-primary: #FE5B00;
        --bs-primary-rgb: 254, 91, 0;
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
        --text-color-site: #000;
        --text-color-title: #000;
        --text-color-desc: #666;
        --text-color-detail: #000;
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
        --bs-btn-bg: var(--bs-primary);
        --bs-btn-border-color: var(--bs-primary);
        --bs-btn-hover-color: #fff;
        --bs-btn-hover-bg: #e44e00;
        --bs-btn-hover-border-color: #e44e00;
        --bs-btn-active-color: #fff;
        --bs-btn-active-bg: #d44600;
        --bs-btn-active-border-color: #d44600;
      }

      .btn-secondary {
        --bs-btn-color: var(--bs-primary);
        --bs-btn-bg: transparent;
        --bs-btn-border-color: var(--bs-primary);
        --bs-btn-hover-color: #fff;
        --bs-btn-hover-bg: var(--bs-primary);
        --bs-btn-hover-border-color: var(--bs-primary);
        --bs-btn-active-color: #fff;
        --bs-btn-active-bg: var(--bs-primary);
        --bs-btn-active-border-color: var(--bs-primary);
      }

      .form-control {
        --bs-body-bg: #fff;
        --bs-body-color: #000;
        --bs-form-control-bg: #fff;
        --bs-form-control-color: #000;
        --bs-form-control-border-color: #E5E7EB;
      }
`;

useHead({
	style: [{ innerHTML: css, tagPriority: 0 }]
});
</script>

<template>
	<TPL01Header v-bind="JSON.parse(TPL01HeaderType.defaultProps)" />
	<TPL01Registration v-bind="JSON.parse(TPL01RegistrationType.defaultProps)" />
	<TPL01Footer v-bind="JSON.parse(TPL01FooterType.defaultProps)" />
</template>
