<script setup lang="ts">
import { computed } from 'vue'

interface CTA {
	text: string
	icon?: string
	link: string
}

interface Props {
	title: string
	subtitle: string
	eventDate: string
	eventLocation: string
	backgroundImage: string
	cta: CTA
	textColor?: string
}

const props = defineProps<Props>()

const cssVariables = computed(() => ({
	'--w-text-color': props.textColor,
}))
</script>

<template>
	<div :style="cssVariables" class="w-hero">
		<!-- Background Image -->
		<div class="w-hero__background">
			<img v-if="backgroundImage" :src="backgroundImage" alt="Hero background" class="w-hero__background-image" />
		</div>

		<!-- Top Section -->
		<section class="w-hero__section w-hero__section--top">
			<div class="w-hero__overlay w-hero__overlay--dark"></div>
		</section>

		<!-- Content Section -->
		<section class="w-hero__section w-hero__section--content">
			<div class="w-hero__overlay w-hero__overlay--medium"></div>
			<div class="w-hero__container">
				<div class="w-hero__content">
					<h1 class="w-hero__title">
						{{ title }}
					</h1>

					<p class="w-hero__subtitle">
						{{ subtitle }}
					</p>

					<div class="w-hero__cta">
						<a :href="cta.link" class="btn btn-lg btn-primary rounded-pill">
							<span v-if="cta.icon" class="material-symbols-outlined text-size-medium me-1">
								{{ cta.icon }}
							</span>
							{{ cta.text }}
						</a>
					</div>
				</div>
			</div>
		</section>

		<!-- Bottom Section -->
		<section class="w-hero__section w-hero__section--bottom">
			<div class="w-hero__details">
				<div class="w-hero__date">{{ eventDate }}</div>
				<div class="w-hero__separator">|</div>
				<div class="w-hero__location">{{ eventLocation }}</div>
			</div>
			<div class="w-hero__overlay w-hero__overlay--light"></div>
		</section>
	</div>
</template>

<style scoped lang="scss">
.w-hero {
	position: relative;
	display: flex;
	flex-direction: column;
	width: 100%;

	&__background {
		position: absolute;
		inset: 0;
		z-index: -1;

		&-image {
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: center;
		}
	}

	&__section {
		position: relative;

		&--top,
		&--bottom {
			height: 5rem;
		}

		&--content {
			flex-grow: 1;
			padding: 2.5rem 0;
			z-index: 2;
		}
	}

	&__overlay {
		position: absolute;
		inset: 0;

		&--dark {
			background-color: rgba(0, 0, 0, 0.6);
		}

		&--medium {
			background-color: rgba(0, 0, 0, 0.4);
		}

		&--light {
			background-color: rgba(0, 0, 0, 0.5);
			z-index: -1;
		}
	}

	&__container {
		width: 100%;
		margin: 0 auto;
		padding: 0 1rem;
		box-sizing: border-box;
		max-width: 100vw;
	}

	&__content {
		position: relative;
		z-index: 1;
		text-align: center;
		padding: 2rem 0;
	}

	&__title {
		max-width: 50rem;
		margin: 0 auto 1.5rem;
		font-size: 2rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 1px;
		color: var(--w-text-color);
		white-space: pre-line;
	}

	&__subtitle {
		max-width: 50rem;
		margin: 0 auto 2rem;
		font-size: 1.1rem;
		color: var(--w-text-color);
	}

	&__cta {
		margin-bottom: 3rem;
	}

	&__details {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
		padding: 1.5rem 0;
		font-size: 0.8rem;
		color: var(--w-text-color);
	}

	&__separator {
		display: none;
	}

	&__location {
		color: var(--bs-primary);
	}
}

/* Bootstrap 5 Responsive Breakpoints */
@media (max-width: 575.98px) {
	.w-hero {
		&__container {
			padding: 0 1rem;
		}

		&__content {
			padding: 1.2rem 0;
		}

		&__title {
			font-size: 1.5rem;
			margin-bottom: 0.7rem;
		}

		&__subtitle {
			font-size: 0.95rem;
			margin-bottom: 0.8rem;
		}

		&__cta {
			margin-bottom: 1.5rem;

			.btn {
				font-size: 0.8rem;
				padding: 0.5rem 0.8rem;
			}
		}

		&__details {
			font-size: 0.85rem;
			gap: 0.5rem;
			padding: 0.7rem 0;
		}
	}
}

@media (min-width: 576px) {
	.w-hero {
		&__section {

			&--top,
			&--bottom {
				height: 6rem;
			}
		}

		&__container {
			padding: 0 1.5rem;
		}

		&__title {
			font-size: 2.2rem;
		}

		&__subtitle {
			font-size: 1rem;
		}

		&__details {
			font-size: 1rem;
		}
	}
}

@media (min-width: 768px) {
	.w-hero {
		&__section {

			&--top,
			&--bottom {
				height: 8rem;
			}
		}

		&__container {
			padding: 0 2rem;
		}

		&__title {
			font-size: 2.2rem;
			margin-bottom: 1rem;
		}

		&__subtitle {
			font-size: 1rem;
			margin-bottom: 1.2rem;
		}

		&__details {
			font-size: 1.2rem;
		}

		&__separator {
			display: block;
		}
	}
}

@media (min-width: 992px) {
	.w-hero {
		&__section {

			&--top,
			&--bottom {
				height: 10rem;
			}
		}

		&__container {
			padding: 0 2rem;
		}

		&__title {
			font-size: 4rem;
		}

		&__subtitle {
			font-size: 1.5rem;
		}
	}
}

@media (min-width: 1200px) {
	.w-hero {
		&__container {
			padding: 0 2rem;
		}
	}
}

@media (min-width: 1400px) {
	.w-hero {
		&__container {
			padding: 0 2rem;
		}
	}
}
</style>
