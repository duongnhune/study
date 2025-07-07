<script setup lang="ts">
import { useHead, usePageStore, storeToRefs, computed} from '#imports'

const pageStore = usePageStore()
const {eventDetailData} = storeToRefs(pageStore)

interface Props {
    cover: string
    mobileCover: string
    buttonText: string
    buttonLink: string
    eventDate: string
    eventLocation: string
}

const computedLink = computed(() => {
    return props.buttonLink?.trim().replace(/\/$/, '') + '?eventID=' + eventDetailData.value?.event?.id
})

const props = defineProps<Props>()

useHead({
    bodyAttrs: {
        class: 'bg-dark'
    }
})

</script>

<template>
    <div class="w-hero">
        <div class="container">
            <div class="w-hero__cover" :style="{ backgroundImage: `url(${cover})` }"></div>
            <div class="w-hero__cover is-mobile" :style="{ backgroundImage: `url(${mobileCover})` }"></div>
            <div class="w-hero__content">
                <div class="w-hero__content">
                    <div class="w-hero__actions">
                        <PageLink :to="computedLink" class="btn btn-lg btn-primary rounded-pill">{{ buttonText }}</PageLink>
                    </div>
                    <div class="w-hero__event-info">
                        <div class="w-hero__info-item">
                            <div class="w-hero__info-label">EVENT DATE:&nbsp;</div>
                            <div class="w-hero__info-value">{{ eventDate }}</div>
                        </div>
                        <div class="w-hero__info-item">
                            <div class="w-hero__info-label">LOCATION:&nbsp;</div>
                            <div class="w-hero__info-value">{{ eventLocation }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.w-hero {
    position: relative;
    width: 100vw;
    min-height: 110vh;

    &__cover {
        position: absolute;
        top: -60px;
        left: 0;
        width: 100vw;
        height: calc(100% + 60px);
        background-size: 100% auto;
        background-position: top;
        z-index: -1;

        img {
            width: 100%;
            height: auto;
            object-fit: cover;
        }

        &.is-mobile {
            display: none;
        }

        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 30%;
            background: linear-gradient(to bottom, transparent, black);
        }
    }


    &__content {
        padding-top: 28vh;
        text-align: center;
    }

    &__actions {
        padding: 80px 0;

        .btn {
            padding: 7px 50px;
            font-size: 16px;
            font-weight: 300;
        }
    }


    &__event-info {
        padding: 80px 0;
        fill: linear-gradient(0deg, rgba(0, 0, 0, 0.60) 31.71%, rgba(0, 0, 0, 0.00) 74.5%);
    }

    &__info-item {
        display: flex;
        justify-content: center;
        align-items: top;
        text-align: center;
    }

    &__info-label {
        font-size: 16px;
        text-transform: uppercase;
        font-weight: 500;
        line-height: 1.25;
    }

    &__info-value {
        font-size: 16px;
        text-transform: uppercase;
        font-weight: 300;
        line-height: 1.25;
    }

    @media (max-width: 768px) {}

    @media (max-width: 480px) {

        &__content {
            padding-top: 33vh;
        }

        &__cover {
            display: none;

            &.is-mobile {
                display: block;
            }
        }

        &__info-label {
            font-size: 12px;
        }

        &__info-value {
            font-size: 12px;
        }

        &__actions {
            .btn {
                padding: 6px 36px;
            }
        }
    }
}
</style>