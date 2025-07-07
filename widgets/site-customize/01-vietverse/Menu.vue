<script setup lang="ts">
interface MenuItem {
    linkTo: string;
    title: string;
}

interface Props {
    menuItems: MenuItem[];
}

defineProps<Props>();
</script>
<template>
    <div class="bz-block bz-block-menu">
        <button class="bz-menu-expand js-menu-expand" type="button"><span class="material-symbols-outlined">menu</span></button>
        <div class="bz-menu" v-if="menuItems && menuItems.length">
            <ul>
                <li v-for="(item, index) in menuItems" :key="index"><a :href="item.linkTo">{{ item.title }}</a></li>
            </ul>
        </div>
    </div>
</template>
