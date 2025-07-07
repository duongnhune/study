<script setup lang="ts">
interface Props {
  ctaText: string;
  ctaLink?: string;
  ctaIcon?: string;
}

defineProps<Props>();
</script>

<template>
  <div class="bz-block bz-block-cta ms-3">
    <div class="bz-cta">
      <a class="btn btn-lg btn-secondary rounded-pill" :href="ctaLink || '#'">
        <span v-if="ctaIcon" class="material-symbols-outlined text-size-medium me-1">{{ ctaIcon }}</span>
        {{ ctaText }}
      </a>
    </div>
  </div>
</template>
