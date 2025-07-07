<script setup lang="ts">
import { computed } from 'vue';

interface Props {
	titleText?: string;
	subtitleText?: string;
	stats: {
		value: string;
		label: string;
	}[];
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

	return style;
});
</script>

<template>
	<section class="w-event-stats" :style="backgroundStyle">

		<div class="w-event-stats__container">
			<!-- Title -->
			<div class="w-event-stats__title is-center" v-if="titleText">
				<div class="w-event-stats__title__name">{{ titleText }}</div>
				<div class="w-event-stats__title__desc" v-if="subtitleText">{{ subtitleText }}</div>
			</div>

			<!-- Content -->
			<div class="w-event-stats__content">
				<div class="w-event-stats__row">
					<div v-for="(stat, index) in stats" :key="index" class="w-event-stats__col">
						<div class="w-event-stats__item">
							<div class="w-event-stats__content">
								<div class="w-event-stats__value">{{ stat.value }}</div>
								<div class="w-event-stats__label">{{ stat.label }}</div>
							</div>
						</div>
						<div v-if="index < stats.length - 1" class="w-event-stats__divider"></div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped>
.w-event-stats {
	&__container {
		width: 100%;
		padding: 3rem 1rem 2.5rem;
	}

	&__row {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 2rem;
		justify-content: space-between;
		align-items: stretch;
		position: relative;
	}

	&__col {
		flex: 1;
		display: flex;
		width: 100%;
		align-items: stretch;
		position: relative;
	}

	&__item {
		display: flex;
		flex-direction: column;
		text-align: left;
		width: 100%;
		padding: 1.5rem;
	}

	&__content {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	&__value {
		font-size: 3rem;
		font-weight: 700;
		line-height: 1.1;
		margin-bottom: 0.5rem;
		color: var(--bs-primary, #4F46E5);
	}

	&__label {
		font-size: 1rem;
		line-height: 1.5;
		color: var(--bs-dark, #1F2937);
	}

	&__divider {
		display: none;
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 3px;
		height: 100%;
		background-color: var(--bs-primary, #4F46E5);
	}
}

/* Bootstrap 5 Responsive Breakpoints */
@media (max-width: 575px) {
	.w-event-stats {
		&__value {
			font-size: 2.5rem;
		}

		&__label {
			font-size: 1rem;
		}
	}
}

@media (min-width: 576px) {
	.w-event-stats {
		&__row {
			flex-direction: column;
		}
	}
}

@media (min-width: 768px) {
	.w-event-stats {
		&__container {
			padding: 2.5rem 6.5rem;
		}
	}
}

@media (min-width: 992px) {
	.w-event-stats {
		&__row {
			flex-direction: row;
			align-items: stretch;
		}

		&__divider {
			display: block;
		}

		&__content {
			align-items: flex-start;
			text-align: left;
		}
	}
}

@media (min-width: 1200px) {
	.w-event-stats {
		&__value {
			font-size: 2.5rem;
		}

		&__label {
			font-size: 1.125rem;
		}
	}
}

@media (min-width: 1400px) {
	.w-event-stats {
		&__value {
			font-size: 3rem;
		}
	}
}
</style>
