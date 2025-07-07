<script setup lang="ts">
interface MenuItem {
    linkTo: string;
    title: string;
    iconCode?: string;
}

interface Props {
    items: MenuItem[];
}

defineProps<Props>();
</script>
<template>
    <div class="bz-block bz-block-menu-vertical">
        <div class="bz-menu-vertical">
            <ul v-if="items">
                <li v-for="(item, index) in items" :key="index">
                    <a :href="item.linkTo">{{ item.title }}
                        <span v-if="item.iconCode" class="material-symbols-outlined text-size-medium ms-1">{{ item.iconCode }}</span>
                    </a>
                </li>
            </ul>
            <!--end ul-->
        </div>
        <!--end bz-menu-vertical-->
    </div>
</template>
