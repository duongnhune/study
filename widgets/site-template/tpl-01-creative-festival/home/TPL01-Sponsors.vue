<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from '#imports';

interface Sponsor {
	id: string;
	name: string;
	imageUrl: string;
	description?: string;
}

interface SponsorUrl {
	id: string;
	sponsorId: string;
	url: string;
}

interface Props {
	titleText: string;
	subtitleText?: string;
	sponsors: Sponsor[];
	sponsorUrls: SponsorUrl[];
	slidesToShow: number;
	backgroundColor?: string;
	backgroundImage?: string;
}

const props = defineProps<Props>();

const sponsorSize = 'medium';
const autoSlide = true;
const slideInterval = 3000;
const slideSpeed = 500;

const sliderRef = ref<HTMLElement | null>(null);
const sliderPosition = ref(0);
const slideWidth = ref<number>(0);
const totalSlides = ref(0);
const currentSlide = ref(0);
const isSliding = ref(false);
const autoSlideTimer = ref<number | null>(null);

const backgroundStyle = computed(() => {
	const style: Record<string, string> = {};

	if (props.backgroundImage) {
		style.backgroundImage = `url(${props.backgroundImage})`;
		style.backgroundSize = 'cover';
		style.backgroundPosition = 'center';
		style.backgroundRepeat = 'no-repeat';
	}

	if (props.backgroundColor) {
		style.backgroundColor = props.backgroundColor;
	}

	return style;
});

const getSponsorUrl = (sponsorId: string): string => {
	const sponsorUrl = props.sponsorUrls.find(url => url.sponsorId === sponsorId);
	return sponsorUrl ? sponsorUrl.url : '#';
};

const calculateSliderDimensions = () => {
	if (!sliderRef.value) return;

	const slider = sliderRef.value;
	const slideElements = slider.querySelectorAll('.w-sponsors__slide');

	if (slideElements.length === 0) return;

	totalSlides.value = slideElements.length;
	slideWidth.value = slider.clientWidth / props.slidesToShow;
};

const nextSlide = () => {
	if (currentSlide.value >= totalSlides.value - props.slidesToShow) {
		currentSlide.value = 0;
	} else {
		currentSlide.value++;
	}

	updateSliderPosition();
};

const updateSliderPosition = () => {
	isSliding.value = true;
	sliderPosition.value = -currentSlide.value * slideWidth.value;

	setTimeout(() => {
		isSliding.value = false;
	}, slideSpeed);
};

const startAutoSlide = () => {
	if (!autoSlide) return;

	stopAutoSlide();

	autoSlideTimer.value = window.setInterval(() => {
		nextSlide();
	}, slideInterval);
};

const stopAutoSlide = () => {
	if (autoSlideTimer.value !== null) {
		clearInterval(autoSlideTimer.value);
		autoSlideTimer.value = null;
	}
};

const handleResize = () => {
	calculateSliderDimensions();
	updateSliderPosition();
};

onMounted(() => {
	calculateSliderDimensions();
	startAutoSlide();

	window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
	stopAutoSlide();
	window.removeEventListener('resize', handleResize);
});

watch(() => props.slidesToShow, () => {
	calculateSliderDimensions();
	updateSliderPosition();
});
</script>

<template>
	<div class="w-sponsors" :style="backgroundStyle">
		<div class="w-sponsors__container">
			<div class="w-sponsors__header is-center">
				<div class="w-sponsors__title-name">{{ titleText }}</div>
				<div class="w-sponsors__line"></div>
			</div>
			<div class="w-sponsors__content">
				<div class="w-sponsors__slider" ref="sliderRef">
					<div class="w-sponsors__track" :style="{
						transform: `translateX(${sliderPosition}px)`,
						transition: isSliding ? `transform ${slideSpeed}ms ease` : 'none',
						display: 'flex',
						flexWrap: 'nowrap'
					}">
						<div v-for="sponsor in sponsors" :key="sponsor.id" class="w-sponsors__slide"
							:class="[`w-sponsors__slide--${sponsorSize}`]" :style="{ width: `${slideWidth}px` }">
							<div class="w-sponsors__item">
								<a :href="getSponsorUrl(sponsor.id)" target="_blank" rel="noopener noreferrer"
									class="w-sponsors__item-link">
									<img :src="sponsor.imageUrl" :alt="sponsor.name" class="w-sponsors__item-image">
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.w-sponsors {
	position: relative;

	&__container {
		padding: 3rem 1rem;
		box-sizing: border-box;
		background: transparent;
	}

	&__line {
		width: 2rem;
		height: 0.1875rem;
		background-color: var(--bs-primary, #FE5B00);
	}

	&__header {
		margin-bottom: 32px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		text-align: center;

		&.is-center {
			text-align: center;
		}
	}

	&__title {
		margin-bottom: 0;

		&-name {
			font-size: 2.25rem;
			font-weight: 700;
			line-height: 1.1;
			color: var(--text-color-title, #1F2937);
			letter-spacing: -0.02em;
		}

		&-desc {
			font-size: 1.125rem;
			color: var(--text-color-desc, #6B7280);
			margin-top: 8px;
			font-weight: 400;
			line-height: 1.5;
		}
	}

	&__content {
		width: 100%;
		margin: 0 auto;
		padding: 0;
	}

	&__slider {
		position: relative;
		width: 100%;
		overflow: hidden;
	}

	&__track {
		display: flex;
		flex-wrap: nowrap;
	}

	&__slide {
		flex: 0 0 auto;
		padding: 0.5rem;
		box-sizing: border-box;
	}

	&__item {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.75rem;
		border-radius: 16px;
		background: #fff;
		box-shadow: 0 4px 24px 0 rgba(31, 41, 55, 0.08);

		&-link {
			display: block;
			align-content: center;
			width: 100%;
			height: 100%;
			transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

			&:hover {
				transform: scale(1.05);
			}
		}

		&-image {
			width: 100%;
			height: auto;
			object-fit: contain;
			transition: filter 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);

			&:hover {
				filter: grayscale(0%);
				opacity: 1;
			}
		}
	}
}

/* Bootstrap 5 Responsive Breakpoints */
@media (max-width: 575.98px) {
	.w-sponsors {
		&__container {
			padding: 3rem 1rem;
		}

		&__title {
			&-name {
				font-size: 1.375rem;
			}

			&-desc {
				font-size: 1rem;
			}
		}

		&__slide {
			padding: 0.25rem;

			&--medium .w-sponsors__item {
				max-width: 80px;
			}
		}

		&__item {
			padding: 0.5rem;
			border-radius: 10px;
		}
	}
}

@media (min-width: 576px) {
	.w-sponsors {
		&__container {
			padding: 4rem 2rem;
		}

		&__title {
			&-name {
				font-size: 1.5rem;
			}

			&-desc {
				font-size: 1rem;
			}
		}

		&__slide--medium .w-sponsors__item {
			max-width: 100px;
		}
	}
}

@media (min-width: 768px) {
	.w-sponsors {
		&__title {
			&-name {
				font-size: 2rem;
			}

			&-desc {
				font-size: 1.125rem;
			}
		}

		&__slide--medium .w-sponsors__item {
			max-width: 120px;
		}
	}
}

@media (min-width: 992px) {
	.w-sponsors {
		&__container {
			padding: 5rem 6.5rem;
		}

		&__title-name {
			font-size: 2.25rem;
		}

		&__slide--medium .w-sponsors__item {
			max-width: 160px;
		}
	}
}

@media (min-width: 1200px) {
	.w-sponsors {
		&__title-name {
			font-size: 2.25rem;
		}
	}
}

@media (min-width: 1400px) {
	/* Extra large styles if needed */
}
</style>
