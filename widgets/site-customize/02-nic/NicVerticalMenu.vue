<script setup lang="ts">
interface MenuItem {
  text: string;
  link?: string;
}

interface Props {
  menuItems: MenuItem[];
}

defineProps<Props>();
</script>

<template>
  <div class="bz-block bz-block-menu">
    <button class="bz-menu-expand js-menu-expand" type="button">
      <span class="material-symbols-outlined">menu</span>
    </button>
    <div class="bz-menu">
      <ul>
        <li v-for="(item, index) in menuItems" :key="index">
          <a :href="item.link || '#'">{{ item.text }}</a>
        </li>
      </ul>
      <!--end ul-->
    </div>
    <!--end bz-menu-vertical-->
  </div>
  <!--end bz-block-->
</template>
