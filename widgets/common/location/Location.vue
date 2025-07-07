<script setup lang="ts">
interface Location {
  address: string;
  icon?: string;
}

interface Props {
  title: string;
  locations: Location[];
}

defineProps<Props>();
</script>

<template>
  <div class="bz-block bz-block-html-content">
    <div class="bz-html-content">
      <h3>{{ title }}</h3>
      <p v-for="(location, index) in locations" :key="index">
        <span class="material-symbols-outlined text-size-medium me-1">{{ location.icon || 'location_on' }}</span>
        {{ location.address }}
      </p>
    </div>
    <!--end bz-html-content-->
  </div>
  <!--end bz-block-->
</template>
