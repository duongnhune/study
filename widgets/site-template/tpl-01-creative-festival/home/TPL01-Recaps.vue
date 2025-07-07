<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';

interface Recap {
	id: string;
	imageUrl: string;
	title?: string;
	description?: string;
}

interface Props {
	titleText: string;
	subtitleText?: string;
	recaps: Recap[];
	backgroundColor?: string;
	backgroundImage?: string;
}

const props = defineProps<Props>();

const activeIndex = ref<number | null>(null);
const lightboxOpen = ref(false);
const currentLightboxIndex = ref(0);

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

const setActiveImage = (index: number) => {
	activeIndex.value = index;
};

const resetActiveImage = () => {
	activeIndex.value = null;
};

const openLightbox = (index: number) => {
	currentLightboxIndex.value = index;
	lightboxOpen.value = true;
	document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
	lightboxOpen.value = false;
	document.body.style.overflow = '';
};

const nextLightboxImage = () => {
	if (currentLightboxIndex.value < props.recaps.length - 1) {
		currentLightboxIndex.value++;
	}
};

const prevLightboxImage = () => {
	if (currentLightboxIndex.value > 0) {
		currentLightboxIndex.value--;
	}
};

const handleKeyDown = (event: KeyboardEvent) => {
	if (event.key === 'Escape' && lightboxOpen.value) {
		closeLightbox();
	} else if (event.key === 'ArrowRight' && lightboxOpen.value) {
		nextLightboxImage();
	} else if (event.key === 'ArrowLeft' && lightboxOpen.value) {
		prevLightboxImage();
	}
};

onMounted(() => {
	window.addEventListener('keydown', handleKeyDown);
});

onBeforeUnmount(() => {
	window.removeEventListener('keydown', handleKeyDown);
	document.body.style.overflow = '';
});

watch(() => props.recaps, () => {
	activeIndex.value = null;
}, { deep: true });

</script>
<template>
	<div class="w-recaps" :style="backgroundStyle">
		<div class="w-recaps__container">
			<div class="w-recaps__header is-center">
				<div class="w-recaps__title-name">{{ titleText }}</div>
				<div class="w-recaps__line"></div>
				<div class="w-recaps__title-desc" v-if="subtitleText">{{ subtitleText }}</div>
			</div>
			<div class="w-recaps__content">
				<div class="w-recaps__gallery" @mouseleave="resetActiveImage">
					<div v-for="(recap, index) in recaps" :key="recap.id" class="w-recaps__item" :class="{
						'is-active': activeIndex === index,
						'is-main': index === 0,
						'is-thumb': index > 0
					}" @mouseenter="setActiveImage(index)" @click="openLightbox(index)">
						<div class="w-recaps__item-inner">
							<img :src="recap.imageUrl" :alt="recap.title || 'Event recap image'"
								class="w-recaps__image">
							<div class="w-recaps__overlay"
								v-if="activeIndex === index || (activeIndex === null && index === 0)">
								<div class="w-recaps__overlay-content">
									<h3 v-if="recap.title" class="w-recaps__overlay-title">{{ recap.title }}</h3>
									<p v-if="recap.description" class="w-recaps__overlay-description">{{
										recap.description }}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- Lightbox -->
				<div v-if="lightboxOpen" class="w-recaps__lightbox" @click="closeLightbox">
					<div class="w-recaps__lightbox-content" @click.stop>
						<button class="w-recaps__lightbox-close" @click="closeLightbox">
							<span class="material-symbols-outlined">close</span>
						</button>
						<div class="w-recaps__lightbox-image-container">
							<img :src="recaps[currentLightboxIndex]?.imageUrl"
								:alt="recaps[currentLightboxIndex]?.title || 'Event recap image'"
								class="w-recaps__lightbox-image">
						</div>
						<div v-if="recaps[currentLightboxIndex]?.title || recaps[currentLightboxIndex]?.description"
							class="w-recaps__lightbox-info">
							<h3 v-if="recaps[currentLightboxIndex]?.title" class="w-recaps__lightbox-title">
								{{ recaps[currentLightboxIndex]?.title }}
							</h3>
							<p v-if="recaps[currentLightboxIndex]?.description" class="w-recaps__lightbox-description">
								{{ recaps[currentLightboxIndex]?.description }}
							</p>
						</div>
						<div class="w-recaps__lightbox-nav">
							<button class="w-recaps__lightbox-prev" @click.stop="prevLightboxImage"
								:disabled="currentLightboxIndex === 0">
								<span class="material-symbols-outlined">chevron_left</span>
							</button>
							<div class="w-recaps__lightbox-counter">
								{{ currentLightboxIndex + 1 }} / {{ recaps.length }}
							</div>
							<button class="w-recaps__lightbox-next" @click.stop="nextLightboxImage"
								:disabled="currentLightboxIndex === recaps.length - 1">
								<span class="material-symbols-outlined">chevron_right</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
.w-recaps {
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

	&__gallery {
		display: flex;
		height: 36rem;
		gap: 4px;
	}

	&__item {
		position: relative;
		overflow: hidden;
		cursor: pointer;
		height: 100%;
		transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);

		&.is-main {
			width: calc(100% - 5 * 120px - 4 * 4px);
		}

		&.is-thumb {
			width: 120px;
		}

		&.is-active {
			width: calc(100% - 5 * 120px - 4 * 4px) !important;
		}

		&-inner {
			position: relative;
			width: 100%;
			height: 100%;
			overflow: hidden;
			box-shadow: 0 4px 24px 0 rgba(31, 41, 55, 0.08);
			background: #fff;
		}

		&:hover .w-recaps__image {
			transform: scale(1.05);
		}
	}

	&__gallery:hover &__item {
		width: 120px;
		will-change: width;
	}

	&__image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		border-radius: 0.25rem;
	}

	&__overlay {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		min-height: 80px;
		width: 100%;
		background: linear-gradient(180deg, rgba(31, 41, 55, 0.00) 0%, rgba(31, 41, 55, 0.80) 100%);
		color: #fff;
		padding: 24px 20px 20px 20px;
		display: flex;
		align-items: flex-end;
		border-radius: 0 0 0.25rem 0.25rem;
		transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);

		&-content {
			width: 100%;
		}

		&-title {
			font-size: 1.125rem;
			font-weight: 700;
			margin-bottom: 4px;
			line-height: 1.2;
			color: #fff;
			text-shadow: 0 2px 8px rgba(31, 41, 55, 0.24);
		}

		&-description {
			font-size: 0.95rem;
			margin: 0;
			color: #fff;
			text-shadow: 0 2px 8px rgba(31, 41, 55, 0.18);
			line-height: 1.5;
		}
	}

	&__lightbox {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.9);
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
		animation: fadeIn 0.3s ease;

		&-content {
			position: relative;
			width: 90%;
			max-width: 1200px;
			max-height: 90vh;
			display: flex;
			flex-direction: column;
			animation: scaleIn 0.3s ease;
		}

		&-close {
			position: absolute;
			top: -40px;
			right: 0;
			background: transparent;
			border: none;
			color: white;
			font-size: 24px;
			cursor: pointer;
			z-index: 1010;
			transition: transform 0.2s ease;

			&:hover {
				transform: scale(1.1);
			}

			.material-symbols-outlined {
				font-size: 32px;
			}
		}

		&-image-container {
			width: 100%;
			height: auto;
			max-height: 70vh;
			display: flex;
			align-items: center;
			justify-content: center;
			overflow: hidden;
		}

		&-image {
			max-width: 100%;
			max-height: 70vh;
			object-fit: contain;
		}

		&-info {
			padding: 1rem 0;
			color: white;
			text-align: center;
		}

		&-title {
			font-size: 1.5rem;
			margin-bottom: 0.5rem;
		}

		&-description {
			font-size: 1rem;
			margin: 0;
		}

		&-nav {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 1rem 0;
		}

		&-counter {
			color: white;
			font-size: 0.875rem;
		}

		&-prev,
		&-next {
			background: transparent;
			border: none;
			color: white;
			font-size: 24px;
			cursor: pointer;
			padding: 0.5rem;
			transition: transform 0.2s ease;

			&:hover:not(:disabled) {
				transform: scale(1.1);
			}

			&:disabled {
				opacity: 0.3;
				cursor: not-allowed;
			}

			.material-symbols-outlined {
				font-size: 32px;
			}
		}
	}
}

@keyframes fadeIn {
	from {
		opacity: 0;
	}

	to {
		opacity: 1;
	}
}

@keyframes scaleIn {
	from {
		transform: scale(0.95);
		opacity: 0;
	}

	to {
		transform: scale(1);
		opacity: 1;
	}
}

/* Bootstrap 5 Responsive Breakpoints */
@media (max-width: 575.98px) {
	.w-recaps {
		&__gallery {
			flex-direction: column;
			height: auto;
			gap: 0.5rem;
		}

		&__item {
			width: 100% !important;
			height: 200px;
			min-width: 0 !important;
			max-width: 100% !important;
			display: block !important;

			&.is-main,
			&.is-active.is-main,
			&.is-thumb,
			&.is-active.is-thumb {
				width: 100% !important;
				display: block !important;
			}

			&-inner {
				border-radius: 10px;
			}
		}

		&__title-name {
			font-size: 1.375rem;
		}

		&__title-desc {
			font-size: 1rem;
		}
	}
}

@media (min-width: 576px) and (max-width: 991.98px) {
	.w-recaps {
		&__gallery {
			flex-wrap: wrap;
			height: auto;
			gap: 0.75rem;
		}

		&__item {
			width: calc(50% - 0.375rem) !important;
			height: 280px;
			min-width: 0 !important;
			max-width: 50% !important;

			&.is-main,
			&.is-active.is-main,
			&.is-thumb,
			&.is-active.is-thumb {
				width: calc(50% - 0.375rem) !important;
			}

			&-inner {
				border-radius: 10px;
			}
		}

		&__gallery:hover &__item {
			width: calc(50% - 0.375rem);
		}

		&__title-name {
			font-size: 1.5rem;
		}
	}
}

@media (min-width: 576px) {
	.w-recaps {
		&__title-name {
			font-size: 1.5rem;
		}
	}
}

@media (min-width: 768px) {
	.w-recaps {
		&__container {
			padding: 0 6.5rem 6.25rem;
		}

		&__title-name {
			font-size: 2rem;
		}

		&__title-desc {
			font-size: 1.125rem;
		}
	}
}

@media (min-width: 992px) {
	.w-recaps {
		&__gallery {
			display: flex;
			flex-wrap: nowrap;
			height: 36rem;
			gap: 4px;
		}

		&__item {
			position: relative;
			overflow: hidden;
			cursor: pointer;
			height: 100%;
			transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);

			&.is-main {
				width: calc(100% - 5 * 120px - 4 * 4px);
			}

			&.is-thumb {
				width: 120px;
			}

			&.is-active {
				width: calc(100% - 5 * 120px - 4 * 4px) !important;
			}
		}

		&__gallery:hover &__item {
			width: 120px;
			will-change: width;
		}

		&__title-name {
			font-size: 2.25rem;
		}
	}
}

@media (min-width: 1200px) {}

@media (min-width: 1400px) {}
</style>
