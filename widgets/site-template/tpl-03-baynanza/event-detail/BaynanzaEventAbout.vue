<script setup lang="ts">
interface Props {
    title: string
    description: string
}
defineProps<Props>()
</script>

<template>
    <div class="bz-block w-about bg-dark">
        <div class="container">
            <div class="w-about__content">
                <div class="w-about__header">
                    <h2 class="w-about__title">{{ title }}</h2>
                </div>
                <div class="w-about__body">
                    <p class="w-about__description" v-html="description?.replaceAll('\n', '<br />')"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.w-about {
    margin: 0;
    padding: 150px 0;
    
    &__content {
        max-width: 800px;
        margin: 0 auto;
        text-align: center;
    }
    
    &__header {
        margin-bottom: 60px;
    }
    
    &__title {
        font-size: 24px;
        font-weight: 500;
    }
    
    &__description {
        font-size: 24px;
        line-height: 1.8;
        color: var(--text-color-site);
        font-weight: 300;
        margin: 0;
        padding: 0.5rem;
        text-align: justify;
    }

    @media (max-width: 768px) {
        padding: 200px 0;
    }

    @media (max-width: 480px) {
        padding: 100px 0;

        &__title {
            font-size: 16px;
        }

        &__description {
            font-size: 16px;
        }
    }
}
</style>