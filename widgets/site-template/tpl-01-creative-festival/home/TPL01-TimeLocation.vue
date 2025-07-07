<script setup lang="ts">
interface TimeLocation {
	id: string;
	date: string;
	time: string;
	location: string;
	description?: string;
}

interface Props {
	titleText: string;
	subtitleText?: string;
	dateLabel: string;
	timeLabel: string;
	locationLabel: string;
	timeLocations: TimeLocation[];
	mapIframeHtml: string;
	backgroundColor?: string;
	backgroundImage?: string;
}

const props = defineProps<Props>()

import { computed } from 'vue';

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
<template>
	<section class="w-time-location" :style="backgroundStyle">
		<div class="w-time-location__container">
			<!-- Header -->
			<div class="w-time-location__header is-center">
				<h2 class="w-time-location__title">{{ titleText }}</h2>
				<div class="w-time-location__line"></div>
				<div class="w-time-location__subtitle">{{ subtitleText }}</div>
			</div>

			<div class="w-time-location__content">
				<!-- Map -->
				<div class="w-time-location__map" v-if="mapIframeHtml" v-html="mapIframeHtml"></div>

				<!-- Details Card -->
				<div class="w-time-location__details-wrapper">
					<div class="w-time-location__details">
						<div v-for="(timeLocation, index) in timeLocations" :key="index" class="w-time-location__info">
							<div class="w-time-location__group">
								<!-- Date -->
								<div class="w-time-location__block">
									<div class="w-time-location__label">{{ dateLabel }}</div>
									<div class="w-time-location__value">{{ timeLocation.date }}</div>
								</div>
								<!-- Time -->
								<div class="w-time-location__block">
									<div class="w-time-location__label">{{ timeLabel }}</div>
									<div class="w-time-location__value">{{ timeLocation.time }}</div>
								</div>
								<!-- Location -->
								<div class="w-time-location__block">
									<div class="w-time-location__label">{{ locationLabel }}</div>
									<div class="w-time-location__value w-time-location__value--highlight">{{
										timeLocation.location }}</div>
								</div>
							</div>
							<!-- Description -->
							<div v-if="timeLocation.description" class="w-time-location__description">
								{{ timeLocation.description }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped>
.w-time-location {
	background-color: var(--bs-light, #FFFFFF);

	&__container {
		padding: 3rem 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
	}

	&__header {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;

		&.is-center {
			text-align: center;
		}
	}

	&__title {
		font-weight: 700;
		font-size: 1.5rem;
		line-height: 1.22;
		letter-spacing: -0.02em;
		color: var(--text-color-title, #1F2937);
		margin: 0;
		position: relative;
		padding-bottom: 0.5rem;

		&.text-left {
			align-self: flex-start;
		}
	}

	&__line {
		width: 2rem;
		height: 0.1875rem;
		background-color: var(--bs-primary, #FE5B00);
	}

	&__subtitle {
		font-size: 1rem;
		line-height: 1.5;
		color: var(--text-color-desc, #6B7280);
	}

	&__content {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
	}

	&__map {
		width: 100%;
		border-radius: 8px;
		overflow: hidden;
		z-index: 1;

		:deep(iframe) {
			width: 100%;
			height: 36.5rem;
			border: 0;
			display: block;
		}
	}

	&__details-wrapper {
		width: 100%;
		display: flex;
		justify-content: center;
		z-index: 2;
	}

	&__details {
		width: 90%;
		background: #FFFFFF;
		border-radius: 8px;
		box-shadow: 0px 10px 70px rgba(0, 0, 0, 0.08);
		padding: 1.5rem 2rem;
	}

	&__info:not(:last-child) {
		margin-bottom: 1.5rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}

	&__group {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	&__block {
		flex: 1;
	}

	&__label {
		font-weight: 600;
		font-size: 0.875rem;
		line-height: 1.5;
		letter-spacing: -0.01em;
		margin-bottom: 0.25rem;
	}

	&__value {
		font-weight: 600;
		font-size: 1.25rem;
		line-height: 1.33;
		letter-spacing: -0.02em;

		&--highlight {
			color: var(--bs-primary, #FE5B00);
		}
	}

	&__description {
		margin-top: 1rem;
		font-size: 0.875rem;
		line-height: 1.5;
		letter-spacing: -0.01em;
		color: var(--text-color-desc, #6B7280);
	}

	/* Bootstrap 5 Responsive Breakpoints */
	@media (max-width: 575.98px) {
		.w-time-location {
			&__title {
				font-size: 1.375rem;
			}

			&__details {
				width: 100%;
				padding: 1.5rem 2rem;
			}
		}
	}

	@media (min-width: 576px) {
		.w-time-location {
			&__title {
				font-size: 1.5rem;
			}
		}
	}

	@media (min-width: 768px) {
		.w-time-location {
			&__container {
				padding: 5rem 6.5rem;
			}

			&__title {
				font-size: 2rem;
			}

			&__group {
				flex-direction: row;
			}

			&__content {
				position: relative;
			}

			&__details-wrapper {
				position: absolute;
				bottom: 6rem;
				left: 0;
				right: 0;
			}

			&__details {
				width: 80%;
				padding: 1.5rem 3rem;
			}
		}
	}

	@media (min-width: 992px) {
		.w-time-location {
			&__title {
				font-size: 2.25rem;
			}

			&__map {
				margin-bottom: 4rem;
			}
		}
	}

	@media (min-width: 1200px) {
		.w-time-location {
			&__title {
				font-size: 2.25rem;
			}
		}
	}

	@media (min-width: 1400px) {}
}
</style>
