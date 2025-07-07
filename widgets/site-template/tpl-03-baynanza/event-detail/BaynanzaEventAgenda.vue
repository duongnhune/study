<script setup lang="ts">
import { useHead, onMounted } from '#imports';
declare var gsap: any;
declare var ScrollTrigger: any;

interface Props {
    title: string
    backgroundImage: string
    backgroundImageMobile: string
    agendaItems: {
        time: string
        title: string
        description?: string
        details?: string
    }[]
}

useHead({
    script: [
        { src: 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js', tagPosition: 'bodyClose' },
        { src: 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js', tagPosition: 'bodyClose' }
    ]
})

function getDetailItems(details: string) {
    return details.split('\n').map(detail => ({
        detail: detail.trim()
    }));
}

onMounted(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".bz-agenda__item").forEach((item: any, index: number) => {
        gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: "top 40%",
                end: "bottom -100px",
                toggleActions: "play reverse play reverse",
                onEnter: () => {
                    item.classList.add('is-active');
                },
                onLeave: () => {
                    item.classList.remove('is-active');
                },
                onEnterBack: () => {
                    item.classList.add('is-active');
                },
                onLeaveBack: () => {
                    item.classList.remove('is-active');
                }
            }
        });
    });

    const title = document.querySelector('.bz-agenda__title');

    if (title) {
        ScrollTrigger.create({
            trigger: title,
            start: 'top 60%',
            end: 'bottom -100px',
            toggleActions: "play reverse play reverse",
            onEnter: () => {
                title.classList.add('text-primary');
            },
            onLeave: () => {
                title.classList.remove('text-primary');
            },
            onEnterBack: () => {
                title.classList.add('text-primary');
            },
            onLeaveBack: () => {
                title.classList.remove('text-primary');
            }
        });
    }
})

defineProps<Props>()
</script>

<template>
    <div class="bz-block bz-agenda is-padding-top-medium is-padding-bottom-large">
        <div class="bz-agenda__cover" :style="{ backgroundImage: `url(${backgroundImage})` }"> </div>
        <div class="bz-agenda__cover is-mobile" :style="{ backgroundImage: `url(${backgroundImageMobile})` }"> </div>
        <div class="container">
            <div class="bz-agenda__header">
                <h2 class="bz-agenda__title">{{ title }}</h2>
            </div>

            <div class="bz-agenda__timeline">
                <div class="bz-agenda__item" v-for="(item, index) in agendaItems" :key="index">
                    <div class="bz-agenda__time">
                        <span class="bz-agenda__time-text">{{ item.time }}</span>
                    </div>
                    <div class="bz-agenda__content">
                        <h3 class="bz-agenda__item-title">{{ item.title }}</h3>
                        <ul class="bz-agenda__details" v-if="item.details && item.details.length">
                            <li class="bz-agenda__detail" v-for="detail in getDetailItems(item.details)"
                                :key="detail.detail">
                                {{ detail.detail }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.bz-agenda {
    position: relative;

    &__cover {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: 100% auto;
        background-position: top;
        object-position: bottom;
        z-index: -1;

        &.is-mobile {
            display: none;
        }
    }

    &__header {
        text-align: center;
        margin-bottom: 60px;
    }

    &__title {
        color: var(--text-color-desc);
        font-size: 24px;
        font-weight: 500;
    }

    &__timeline {
        max-width: 600px;
        margin: 0 auto;

    }

    &__item {
        display: flex;


        &.is-active {
            .bz-agenda__time {
                color: var(--bs-primary);

                &::before {
                    background: var(--bs-primary);
                }

                &::after {
                    background: var(--bs-primary);
                }
            }

            .bz-agenda__item-title {
                color: var(--bs-primary);
            }

            .bz-agenda__details {
                li {
                    color: var(--bs-primary);
                }
            }
        }
    }

    &__time {
        width: 160px;
        position: relative;
        color: var(--text-color-desc);
        transition: color 0.5s ease-in-out;

        &::before {
            content: '';
            position: absolute;
            right: -3px;
            top: 10px;
            width: 8px;
            height: 8px;
            background: var(--text-color-desc);
            border-radius: 50%;
            z-index: 2;
            transition: color 0.5s ease-in-out;
        }

        &::after {
            content: '';
            position: absolute;
            right: 0;
            top: 14px;
            bottom: 0;
            height: 100%;
            width: 1px;
            background-color: var(--text-color-desc);
            transition: background-color 0.5s ease-in-out;
        }

        &-text {
            font-size: 24px;
        }
    }

    &__content {
        flex: 1;
        padding-left: 64px;
        padding-bottom: 64px;
    }

    &__item-title {
        color: var(--text-color-desc);
        font-size: 24px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 1.25rem;
        transition: color 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &__details {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    &__detail {
        font-size: 16px;
        color: var(--text-color-desc);
        margin-bottom: 0.5rem;
        padding-left: 1.5rem;
        position: relative;
        line-height: 1.5;
        transition: color 0.4s ease-in-out;

        &::before {
            content: '•';
            color: var(--text-color-desc);
            font-weight: bold;
            position: absolute;
            left: 0;
        }
    }

    @media (max-width: 768px) {}


    @media (max-width: 480px) {

        &__title {
            font-size: 16px;
        }

        &__item-title {
            font-size: 16px;
        }

        &__time {
            width: 80px;

            &-text {
                font-size: 16px;
            }

            &::before {
                top: 8px;
                width: 6px;
                height: 6px;
                right: -3px;
            }

            &::after {
                right: 0;
                top: 14px;
            }


        }

        &__content {
            padding-left: 32px;
            padding-bottom: 32px;
        }

        &__detail {
            font-size: 14px;
        }

        &__cover {
            display: none;

            &.is-mobile {
                display: block;
            }
        }
    }
}
</style>