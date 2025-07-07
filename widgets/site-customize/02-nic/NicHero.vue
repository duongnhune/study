<script setup lang="ts">
interface Logo {
  image: string;
}

interface Props {
  heroImage: string;
  eventTitle: string;
  ticketButtonText: string;
  ticketButtonLink?: string;
  ticketButtonIcon?: string;
  eventDate: string;
  eventLocation: string;
  hostLabel?: string;
  hosts?: Logo[];
  coOrganizerLabel?: string;
  coOrganizers?: Logo[];
  sponsorLabel?: string;
  sponsors?: Logo[];
}

defineProps<Props>();
</script>

<template>
  <div class="bz-block bz-block-hero vvs-nic-block-hero" id="vvs-nic-block-hero">
    <div class="container">
      <div class="bz-box">
        <div class="bz-box__content">
          <div class="bz-hero-img"><img :src="heroImage" alt="hero"></div>
          <div class="bz-hero-box">
            <h1 class="bz-hero-box__title" style="line-height: 1;">
              VIPC SUMMIT 2025 <br>
              <span style="font-size: 0.7em;font-weight: 600;color: #23c2f1;">IGNITING INNOVATION, UNLOCKING
                CAPITAL</span> <br>
              <span style="font-size: 0.7em;font-weight: 600;color: #ea1228;">VIETNAM'S ERA OF NATIONAL RISE</span>
            </h1>
            <div class="bz-hero-box__btn">
              <a class="btn btn-lg btn-secondary rounded-pill" :href="ticketButtonLink || '#'">
                <span v-if="ticketButtonIcon" class="material-symbols-outlined text-size-medium me-1">{{
                  ticketButtonIcon }}</span>
                {{ ticketButtonText }}
              </a>
            </div>
            <div class="bz-hero-box__desc">
              <p><span class="material-symbols-outlined me-2">calendar_month</span> {{ eventDate }}</p>
              <p><span class="material-symbols-outlined me-2">location_on</span> {{ eventLocation }}</p>
            </div>
            <div class="bz-hero-box__partner">
              <div class="c-partner-small" v-if="hosts && hosts.length > 0 && hostLabel">
                <div class="c-partner-small__label">{{ hostLabel }}</div>
                <div class="c-partner-small__list">
                  <img v-for="(logo, index) in hosts" :key="'host-' + index" :src="logo.image" alt="host">
                </div>
              </div>
              <div class="c-partner-small" v-if="coOrganizers && coOrganizers.length > 0 && coOrganizerLabel">
                <div class="c-partner-small__label">{{ coOrganizerLabel }}</div>
                <div class="c-partner-small__list">
                  <img v-for="(logo, index) in coOrganizers" :key="'co-org-' + index" :src="logo.image"
                    alt="co-organizer">
                </div>
              </div>
              <div class="c-partner-small" v-if="sponsors && sponsors.length > 0 && sponsorLabel">
                <div class="c-partner-small__label">{{ sponsorLabel }}</div>
                <div class="c-partner-small__list">
                  <img v-for="(logo, index) in sponsors" :key="'sponsor-' + index" :src="logo.image" alt="sponsor">
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--end bz-box__content-->
      </div>
      <!--end container-->
    </div>
    <!--end bz-block-->
  </div>
</template>
