<script setup lang="ts">
interface Props {
  title: string;
  phone?: string;
  phoneIcon?: string;
  email?: string;
  emailIcon?: string;
}

defineProps<Props>();
</script>

<template>
  <div class="bz-block bz-block-html-content">
    <div class="bz-html-content">
      <h3>{{ title }}</h3>
      <p v-if="phone">
        <span class="material-symbols-outlined text-size-medium me-1">{{ phoneIcon || 'call' }}</span>
        {{ phone }}
      </p>
      <p v-if="email">
        <span class="material-symbols-outlined text-size-medium me-1">{{ emailIcon || 'mail' }}</span>
        {{ email }}
      </p>
    </div>
    <!--end bz-html-content-->
  </div>
  <!--end bz-block-->
</template>
