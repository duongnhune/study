<script setup lang="ts">
import { useHead } from '#imports'

interface Props {
    backgroundImage: string
    buttonText: string
    buttonLink: string
}

const props = defineProps<Props>()
</script>

<template>
    <div class="w-hero">
        <img :src="props.backgroundImage" alt="Event Image" class="w-hero__cover" />
        <div class="w-hero__content">
            <div class="w-hero__event-main">
                <div class="w-hero__actions">
                    <a :href="props.buttonLink" class="btn btn-lg btn-primary rounded-pill">{{ props.buttonText }}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.w-hero {
    position: relative;

    &__cover {
        width: 100%;
        height: auto;
    }

    &__content {
        position: absolute;
        top: 85%;
        width: 100%;
        text-align: center;
    }

    &__actions {

        .btn {
            padding: 7px 50px;
            font-size: 16px;
            font-weight: 300;
        }
    }
}

@media (max-width: 500px) {
    .w-hero {
        padding-bottom: 200px;

        &__content {
            top: 70%;
        }

        &__actions {
            .btn {
                padding: 6px 36px;
            }
        }
    }
}
</style>