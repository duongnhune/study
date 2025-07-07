<script setup lang="ts">
interface Props {
  primaryLogo: string;
  secondaryLogo: string;
  logoLink?: string;
}

defineProps<Props>();
</script>
<template>
  <div class="bz-block bz-block-logo">
    <div class="bz-logo">
      <a href="#">
        <img class="bz-logo__primary" :src="primaryLogo" alt="logo">
        <img class="bz-logo__secondary" :src="secondaryLogo" alt="logo">

      </a>
    </div>
    <!--end bz-logo-->
  </div>
  <!--end bz-block-->
</template>
