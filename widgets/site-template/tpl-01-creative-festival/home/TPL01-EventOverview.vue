<template>
	<section class="w-event-overview">
		<div class="w-event-overview__container">
			<div class="w-event-overview__background" v-if="backgroundImage">
				<img :src="backgroundImage" alt="Event background" class="w-event-overview__background-image" />
				<div class="w-event-overview__background-overlay"></div>
			</div>

			<div class="w-event-overview__content">
				<div class="w-event-overview__header">
					<h2 class="w-event-overview__title">{{ title }}</h2>
					<div class="w-event-overview__line"></div>
				</div>
				<div class="w-event-overview__body">
					<p class="w-event-overview__description">{{ description }}</p>
				</div>
			</div>

		</div>
	</section>
</template>

<script setup lang="ts">
interface Props {
	title: string;
	description: string;
	backgroundImage: string;
}
defineProps<Props>();
</script>

<style lang="scss" scoped>
.w-event-overview {
	position: relative;
	width: 100%;

	&__container {
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
		max-width: 100vw;
	}

	&__background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;

		&-image {
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: center;
		}

		&-overlay {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.2);
		}
	}

	&__wrapper {
		display: flex;
		justify-content: center;
		width: 100%;
		padding: 0;
	}

	&__content {
		width: 100%;
		padding: 1.5rem 1rem;
		border-radius: 0.5rem;
		background: rgba(255, 255, 255, 0.80);
		backdrop-filter: blur(10px);
		min-width: 0;
	}

	&__header {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	&__title {
		font-weight: 700;
		line-height: 1.22;
		letter-spacing: -0.02em;
		text-align: center;
		color: var(--text-color-title, #1F2937);
		margin: 0;
		font-size: 1.5rem;
	}

	&__line {
		width: 2rem;
		height: 0.1875rem;
		background-color: var(--bs-primary, #FE5B00);
		border-radius: 0.125rem;
	}

	&__description {
		font-weight: 400;
		line-height: 1.5;
		letter-spacing: -0.01em;
		color: var(--text-color-desc, #6B7280);
		margin: 0;
		font-size: 0.95rem;
	}
}

/* Bootstrap 5 Responsive Breakpoints */
@media (max-width: 575.98px) {
	.w-event-overview {
		&__container {
			padding: 3rem 1rem;
		}

		&__content {
			width: 100%;
			border-radius: 4px;
			min-width: 0;
			padding: 1.5rem 1rem;
		}

		&__header {
			margin-bottom: 1.375rem;
		}

		&__title {
			font-size: 1.375rem;
		}

		&__description {
			font-size: 0.95rem;
			line-height: 1.5;
		}
	}
}

@media (min-width: 576px) {
	.w-event-overview {
		&__container {
			padding: 4rem 2rem;
		}

		&__content {
			width: 100%;
			padding: 2rem 1rem;
		}

		&__title {
			font-size: 1.5rem;
		}

		&__description {
			font-size: 1rem;
		}
	}
}

@media (min-width: 768px) {
	.w-event-overview {
		&__container {
			padding: 6.5rem 6.25rem;
		}

		&__content {
			padding: 2rem 1rem;
		}

		&__title {
			font-size: 2rem;
		}

		&__description {
			font-size: 1rem;
		}
	}
}

@media (min-width: 992px) {
	.w-event-overview {
		&__content {
			padding: 2rem 1rem;
		}

		&__title {
			font-size: 2.25rem;
		}

		&__description {
			font-size: 1.125rem;
		}
	}
}

@media (min-width: 1200px) {
	.w-event-overview {
		&__content {
			padding: 2rem 2rem;
		}

		&__description {
			font-size: 1.25rem;
		}
	}
}

@media (min-width: 1400px) {
	.w-event-overview {
		&__content {
			padding: 2rem 2rem;
		}
	}
}
</style>
