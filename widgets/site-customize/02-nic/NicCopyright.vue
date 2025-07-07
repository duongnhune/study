<script setup lang="ts">
interface Props {
  copyrightText: string;
  poweredByText?: string;
  poweredByLink?: string;
  poweredByIcon?: string;
}

defineProps<Props>();
</script>

<template>
  <div class="bz-block bz-block-html-content">
    <div class="bz-html-content">
      <p>
        {{ copyrightText }}
        <template v-if="poweredByText">
          {{ poweredByText }}
          <a v-if="poweredByLink" :href="poweredByLink" target="_blank" rel="noopener noreferrer">
            <i v-if="poweredByIcon" :class="poweredByIcon"></i>
          </a>
        </template>
      </p>
    </div>
    <!--end bz-html-content-->
  </div>
  <!--end bz-block-->
</template>
