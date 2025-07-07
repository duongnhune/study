<template>
	<section class="w-speakers" :style="[backgroundStyle]">
		<div class="w-speakers__container">
			<!-- Header -->
			<div class="w-speakers__header" v-if="titleText">
				<h2 class="w-speakers__title">{{ titleText }}</h2>
				<div class="w-speakers__line"></div>
				<p class="w-speakers__subtitle" v-if="subtitleText">{{ subtitleText }}</p>
			</div>
			<!-- Speakers Grid -->
			<div class="w-speakers__grid">
				<div v-for="speaker in speakers" :key="speaker.id" class="w-speakers__item">
					<div class="w-speakers__item-inner">
						<!-- Image -->
						<div class="w-speakers__item-image">
							<img :src="speaker.imageUrl" :alt="speaker.name">
							<!-- Overlay with Info -->
							<div class="w-speakers__item-overlay">
								<div class="w-speakers__item-info">
									<h3 class="w-speakers__item-name">{{ speaker.name }}</h3>
									<p class="w-speakers__item-position">{{ speaker.position }}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script setup lang="ts">
import { computed } from 'vue';

interface Speakers {
	id: string;
	name: string;
	position: string;
	imageUrl: string;
	bio?: string;
}

interface SocialLink {
	id: string;
	speakerId: string;
	platform: string;
	url: string;
}

interface Props {
	titleText: string;
	subtitleText: string;
	speakers: Speakers[];
	socialLinks: SocialLink[];
	columns?: number;
	backgroundColor?: string;
	backgroundImage?: string;
}

const props = defineProps<Props>();

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
</script>

<style lang="scss" scoped>
.w-speakers {
	background-color: #FFFFFF;

	&__container {
		padding: 3rem 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		width: 100%;
	}

	&__header {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		width: 100%;
		margin-bottom: 1rem;
	}

	&__title {
		font-size: 1.375rem;
		font-weight: 700;
		line-height: 1.22;
		letter-spacing: -0.02em;
		text-align: center;
		color: var(--text-color-title, #1F2937);
		margin: 0;
	}

	&__line {
		width: 2rem;
		height: 0.1875rem;
		background-color: var(--bs-primary, #FE5B00);
	}

	&__subtitle {
		font-size: 1rem;
		color: var(--text-color-desc, #6B7280);
		text-align: center;
		margin: 0;
	}

	&__grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.5rem;
		width: 100%;
	}

	&__item {
		position: relative;
		border-radius: 4px;
		overflow: hidden;
		aspect-ratio: 1/1.2;

		&-inner {
			position: relative;
			height: 100%;
		}

		&-image {
			width: 100%;
			height: 100%;

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
				object-position: center;
			}
		}

		&-overlay {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			padding: 1rem 0.75rem;
			background: rgba(0, 0, 0, 0.7);
			opacity: 0;
			gap: 0.5rem;
			transition: opacity 0.3s ease;
		}

		&:hover &-overlay {
			opacity: 1;
		}

		&-info {
			text-align: center;
		}

		&-name {
			font-size: 1.125rem;
			font-weight: 600;
			line-height: 1.625rem;
			letter-spacing: -0.01125rem;
			color: var(--bs-white, #FFFFFF);
			margin: 0 0 0.5rem;
		}

		&-position {
			font-size: 1rem;
			font-weight: 400;
			line-height: 1.5rem;
			letter-spacing: -0.01rem;
			color: #9CA3AF;
			margin: 0;
		}

		&-hover {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			display: flex;
			align-items: center;
			gap: 0.25rem;
			padding: 0.5rem 1rem;
			background: #1F2937;
			border-radius: 100px;
			opacity: 0;
			transition: opacity 0.3s ease;

			.material-symbols-outlined {
				font-size: 1.25rem;
				color: #FFFFFF;
			}
		}
	}
}

/* Bootstrap 5 Responsive Breakpoints */
@media (max-width: 575.98px) {
	.w-speakers {
		&__header {
			margin-bottom: 0.5rem;
		}

		&__title {
			font-size: 1.375rem;
		}

		&__grid {
			grid-template-columns: 1fr;
			gap: 0.5rem;
		}
	}
}

@media (min-width: 576px) {
	.w-speakers {
		&__title {
			font-size: 1.5rem;
		}

		&__grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 0.75rem;
		}
	}
}

@media (min-width: 768px) {
	.w-speakers {
		&__container {
			padding: 5rem 6.5rem;
		}

		&__title {
			font-size: 2rem;
		}
	}
}

@media (min-width: 992px) {
	.w-speakers {
		&__title {
			font-size: 2.25rem;
		}

		&__grid {
			grid-template-columns: repeat(3, 1fr);
			gap: 1.25rem;
		}
	}
}

@media (min-width: 1200px) {
	.w-speakers {
		&__grid {
			grid-template-columns: repeat(4, 1fr);
			gap: 1.5rem;
		}
	}
}

@media (min-width: 1400px) {}
</style>
