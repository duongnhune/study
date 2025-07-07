<script setup lang="ts">
interface Props {
    linkTo?: string;
    title?: string;
}

defineProps<Props>();
</script>
<template>
    <div class="bz-block bz-block-cta">
        <div class="bz-cta">
            <a class="btn btn-lg btn-dark rounded-pill" :href="linkTo">{{ title }} <span
                    class="material-symbols-outlined text-size-medium ms-1">arrow_outward</span></a>
        </div>
    </div>
</template>
