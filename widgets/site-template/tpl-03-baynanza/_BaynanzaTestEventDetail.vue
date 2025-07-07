<script setup lang="ts">
import BaynanzaHeader from './BaynanzaHeader.vue';
import BaynanzaHeaderType from './BaynanzaHeader';
import BaynanzaFooter from './BaynanzaFooter.vue';
import BaynanzaFooterType from './BaynanzaFooter';
import BaynanzaEventHero from './event-detail/BaynanzaEventHero.vue';
import BaynanzaEventHeroType from './event-detail/BaynanzaEventHero';
import BaynanzaEventAgenda from './event-detail/BaynanzaEventAgenda.vue';
import BaynanzaEventAgendaType from './event-detail/BaynanzaEventAgenda';
import BaynanzaEventAbout from './event-detail/BaynanzaEventAbout.vue';
import BaynanzaEventAboutType from './event-detail/BaynanzaEventAbout';
import BaynanzaEventPartner from './event-detail/BaynanzaEventPartner.vue';
import BaynanzaEventPartnerType from './event-detail/BaynanzaEventPartner';
import BaynanzaEventPricingPlans from './event-detail/BaynanzaEventPricingPlans.vue';
import BaynanzaEventPricingPlansType from './event-detail/BaynanzaEventPricingPlans';
import BaynanzaSectionIntro from './BaynanzaSectionIntro.vue';
import BaynanzaSectionIntroType from './BaynanzaSectionIntro';
import BaynanzaEvent from './BaynanzaEvent.vue';
import BaynanzaEventType from './BaynanzaEvent';

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
        --bs-btn-bg: radial-gradient(223% 245% at 34% -120%, rgba(255,255,255,0.2) 0%, rgba(66,66,66,0.02) 100%), rgba(0,0,0,0.5);
        --bs-btn-border-color: #fff;
        --bs-btn-hover-color: var(--bs-primary);
        --bs-btn-hover-border-color: var(--bs-primary);
        --bs-btn-active-color: var(--bs-black);
        --bs-btn-active-bg: var(--bs-primary);
        --bs-btn-active-border-color: var(--bs-primary);
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
      }

      .form-control {
        --bs-body-bg: rgba(255, 255, 255, 0.10);
        --bs-body-color: #ffffff;
        --bs-form-control-bg: rgba(255, 255, 255, 0.05);
        --bs-form-control-color: #ffffff;
        --bs-form-control-border-color: rgba(255, 255, 255, 0.1);
      }
`;


useHead({
	style: [{ innerHTML: css, tagPriority: 0 }]
});


</script>

<template>
	<BaynanzaHeader class="bz-header" v-bind="JSON.parse(BaynanzaHeaderType.defaultProps)" />
	<div class="bz-content">
		<BaynanzaEventHero class="bz-hero" v-bind="JSON.parse(BaynanzaEventHeroType.defaultProps)" />
		<BaynanzaEventPartner class="bz-partner" v-bind="JSON.parse(BaynanzaEventPartnerType.defaultProps)" />
		<BaynanzaEventAbout class="bz-about" v-bind="JSON.parse(BaynanzaEventAboutType.defaultProps)" />
		<BaynanzaEventAgenda class="bz-agenda" v-bind="JSON.parse(BaynanzaEventAgendaType.defaultProps)" />
		<BaynanzaEventPricingPlans class="bz-pricing" v-bind="JSON.parse(BaynanzaEventPricingPlansType.defaultProps)" />
	</div>
	<BaynanzaFooter class="bz-footer" v-bind="JSON.parse(BaynanzaFooterType.defaultProps)" />
    <BaynanzaHeader class="bz-header" v-bind="JSON.parse(BaynanzaHeaderType.defaultProps)" />
    <div class="bz-content">
        <!-- <BaynanzaEvent class="bz-event" v-bind="JSON.parse(BaynanzaEventType.defaultProps)" /> -->
        <BaynanzaSectionIntro class="bz-intro" v-bind="JSON.parse(BaynanzaSectionIntroType.defaultProps)" />
        <BaynanzaEventHero class="bz-hero" v-bind="JSON.parse(BaynanzaEventHeroType.defaultProps)" />
        <BaynanzaEventPartner class="bz-partner" v-bind="JSON.parse(BaynanzaEventPartnerType.defaultProps)" />
        <BaynanzaEventAbout class="bz-about" v-bind="JSON.parse(BaynanzaEventAboutType.defaultProps)" />
        <BaynanzaEventAgenda class="bz-agenda" v-bind="JSON.parse(BaynanzaEventAgendaType.defaultProps)" />
    </div>
    <BaynanzaFooter class="bz-footer" v-bind="JSON.parse(BaynanzaFooterType.defaultProps)" />
</template>
