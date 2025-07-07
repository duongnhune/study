<script setup lang="ts">
import { computed } from 'vue'
import { usePageStore, storeToRefs } from '#imports'

interface PlanItem {
	title: string
	description: string
	price: string
	features: string
}

interface Props {
	yachtPartyTitle: string
	beachPartyTitle: string
	yachtPartyPlans: PlanItem[]
	beachPartyPlans: PlanItem[]
	backgroundImage: string
	mobileBgImage: string
	buttonLink: string
	buttonText: string
}

const props = defineProps<Props>()
const pageStore = usePageStore()
const { eventDetailData } = storeToRefs(pageStore)


function splitFeatures(features: string) {
	return features.split('//').map(f => f.trim()).filter(Boolean)
}

const yachtPlansFeatures = computed(() =>
	props.yachtPartyPlans.map(plan => splitFeatures(plan.features))
)
const beachPlansFeatures = computed(() =>
	props.beachPartyPlans.map(plan => splitFeatures(plan.features))
)

const computedLink = computed(() => {
	return props.buttonLink?.trim().replace(/\/$/, '') + '?eventID=' + eventDetailData.value?.event?.id
})
</script>

<template>
	<div class="bz-block w-pricing-plans">
		<div class="w-pricing-plans__bg">
			<img :src="backgroundImage" alt="Background" class="w-pricing-plans__bg-desktop">
			<img :src="mobileBgImage" alt="Background" class="w-pricing-plans__bg-mobile">
		</div>

		<div class="w-pricing-plans__container">
			<div class="w-pricing-plans__section">
				<h2 class="w-pricing-plans__section-title">{{ yachtPartyTitle }}</h2>
				<div class="w-pricing-plans__grid w-pricing-plans__grid--yacht">
					<div v-for="(plan, index) in yachtPartyPlans" :key="index" class="w-pricing-plans__card">
						<div class="w-pricing-plans__card-header">
							<div class="w-pricing-plans__card-info">
								<h3 class="w-pricing-plans__card-title">{{ plan.title }}</h3>
								<p class="w-pricing-plans__card-description">{{ plan.description }}</p>
							</div>
							<div class="w-pricing-plans__card-price">
								{{ plan.price }}
							</div>
						</div>

						<div class="w-pricing-plans__card-divider"></div>
						<div class="w-pricing-plans__card-content">
							<h4 class="w-pricing-plans__features-title">Includes:</h4>
							<div class="w-pricing-plans__features">
								<div class="w-pricing-plans__features-column">
									<div v-for="(feature, featureIndex) in yachtPlansFeatures[index]?.slice(0, Math.ceil(yachtPlansFeatures[index].length / 2))"
										:key="featureIndex" class="w-pricing-plans__feature">
										<div class="w-pricing-plans__feature-icon">
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
												xmlns="http://www.w3.org/2000/svg">
												<path
													d="M20.3479 7.56384L9.7479 18.1638C9.65402 18.2585 9.52622 18.3117 9.3929 18.3117C9.25958 18.3117 9.13178 18.2585 9.0379 18.1638L3.6479 12.7738C3.55324 12.68 3.5 12.5522 3.5 12.4188C3.5 12.2855 3.55324 12.1577 3.6479 12.0638L4.3479 11.3638C4.44178 11.2692 4.56958 11.2159 4.7029 11.2159C4.83622 11.2159 4.96402 11.2692 5.0579 11.3638L9.3879 15.6938L18.9379 6.14384C19.1357 5.95205 19.4501 5.95205 19.6479 6.14384L20.3479 6.85384C20.4426 6.94772 20.4958 7.07552 20.4958 7.20884C20.4958 7.34216 20.4426 7.46995 20.3479 7.56384Z"
													fill="white" />
											</svg>
										</div>
										<span class="w-pricing-plans__feature-text">{{ feature }}</span>
									</div>
								</div>
								<div class="w-pricing-plans__features-column">
									<div v-for="(feature, featureIndex) in yachtPlansFeatures[index]?.slice(Math.ceil(yachtPlansFeatures[index].length / 2))"
										:key="featureIndex" class="w-pricing-plans__feature">
										<div class="w-pricing-plans__feature-icon">
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
												xmlns="http://www.w3.org/2000/svg">
												<path
													d="M20.3479 7.56384L9.7479 18.1638C9.65402 18.2585 9.52622 18.3117 9.3929 18.3117C9.25958 18.3117 9.13178 18.2585 9.0379 18.1638L3.6479 12.7738C3.55324 12.68 3.5 12.5522 3.5 12.4188C3.5 12.2855 3.55324 12.1577 3.6479 12.0638L4.3479 11.3638C4.44178 11.2692 4.56958 11.2159 4.7029 11.2159C4.83622 11.2159 4.96402 11.2692 5.0579 11.3638L9.3879 15.6938L18.9379 6.14384C19.1357 5.95205 19.4501 5.95205 19.6479 6.14384L20.3479 6.85384C20.4426 6.94772 20.4958 7.07552 20.4958 7.20884C20.4958 7.34216 20.4426 7.46995 20.3479 7.56384Z"
													fill="white" />
											</svg>
										</div>
										<span class="w-pricing-plans__feature-text">{{ feature }}</span>
									</div>
								</div>
							</div>
						</div>
						<div class="w-pricing-plans__card-action">
							<a :href="computedLink"
								class="btn btn-primary rounded-pill w-100 w-pricing-plans__get-ticket-btn"
								type="button">
								{{ buttonText }}
							</a>
						</div>
					</div>
				</div>
			</div>

			<div class="w-pricing-plans__section w-pricing-plans__section--beach">
				<h2 class="w-pricing-plans__section-title">{{ beachPartyTitle }}</h2>
				<div class="w-pricing-plans__grid w-pricing-plans__grid--beach">
					<div v-for="(plan, index) in beachPartyPlans" :key="index" class="w-pricing-plans__card">
						<div class="w-pricing-plans__card-header">
							<div class="w-pricing-plans__card-info">
								<h3 class="w-pricing-plans__card-title">{{ plan.title }}</h3>
								<p class="w-pricing-plans__card-description">{{ plan.description }}</p>
							</div>
							<div class="w-pricing-plans__card-price">
								{{ plan.price }}
							</div>
						</div>

						<div class="w-pricing-plans__card-divider"></div>

						<div class="w-pricing-plans__card-content">
							<h4 class="w-pricing-plans__features-title">Includes:</h4>
							<div class="w-pricing-plans__features w-pricing-plans__features--beach">
								<div class="w-pricing-plans__features-column">
									<div v-for="(feature, featureIndex) in beachPlansFeatures[index]?.slice(0, Math.ceil(beachPlansFeatures[index].length / 2))"
										:key="featureIndex" class="w-pricing-plans__feature">
										<div class="w-pricing-plans__feature-icon">
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
												xmlns="http://www.w3.org/2000/svg">
												<path
													d="M20.3479 7.56384L9.7479 18.1638C9.65402 18.2585 9.52622 18.3117 9.3929 18.3117C9.25958 18.3117 9.13178 18.2585 9.0379 18.1638L3.6479 12.7738C3.55324 12.68 3.5 12.5522 3.5 12.4188C3.5 12.2855 3.55324 12.1577 3.6479 12.0638L4.3479 11.3638C4.44178 11.2692 4.56958 11.2159 4.7029 11.2159C4.83622 11.2159 4.96402 11.2692 5.0579 11.3638L9.3879 15.6938L18.9379 6.14384C19.1357 5.95205 19.4501 5.95205 19.6479 6.14384L20.3479 6.85384C20.4426 6.94772 20.4958 7.07552 20.4958 7.20884C20.4958 7.34216 20.4426 7.46995 20.3479 7.56384Z"
													fill="white" />
											</svg>
										</div>
										<span class="w-pricing-plans__feature-text">{{ feature }}</span>
									</div>
								</div>
								<div class="w-pricing-plans__features-column">
									<div v-for="(feature, featureIndex) in beachPlansFeatures[index]?.slice(Math.ceil(beachPlansFeatures[index].length / 2))"
										:key="featureIndex" class="w-pricing-plans__feature">
										<div class="w-pricing-plans__feature-icon">
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
												xmlns="http://www.w3.org/2000/svg">
												<path
													d="M20.3479 7.56384L9.7479 18.1638C9.65402 18.2585 9.52622 18.3117 9.3929 18.3117C9.25958 18.3117 9.13178 18.2585 9.0379 18.1638L3.6479 12.7738C3.55324 12.68 3.5 12.5522 3.5 12.4188C3.5 12.2855 3.55324 12.1577 3.6479 12.0638L4.3479 11.3638C4.44178 11.2692 4.56958 11.2159 4.7029 11.2159C4.83622 11.2159 4.96402 11.2692 5.0579 11.3638L9.3879 15.6938L18.9379 6.14384C19.1357 5.95205 19.4501 5.95205 19.6479 6.14384L20.3479 6.85384C20.4426 6.94772 20.4958 7.07552 20.4958 7.20884C20.4958 7.34216 20.4426 7.46995 20.3479 7.56384Z"
													fill="white" />
											</svg>
										</div>
										<span class="w-pricing-plans__feature-text">{{ feature }}</span>
									</div>
								</div>
							</div>
						</div>
						<div class="w-pricing-plans__card-action">
							<a :href="computedLink"
								class="btn btn-primary rounded-pill w-100 w-pricing-plans__get-ticket-btn"
								type="button">
								{{ buttonText }}
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.w-pricing-plans {
	position: relative;
	padding: 0;
	min-height: 979px;

	&__bg {
		position: absolute;
		overflow: hidden;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;

		img {
			width: 100%;
			height: 100%;
			object-position: top;
			object-fit: cover;
		}

		&-mobile {
			display: none;
		}
	}

	&__section {
		position: relative;
		padding: 114px 0 0;

		&:first-child {}

		&:last-child {
			margin-bottom: 0;
		}

		&--yacht {
			padding-bottom: 79px;
		}

		&--beach {
			padding-bottom: 79px;
		}
	}

	&__section-title {
		text-align: center;
		position: absolute;
		top: 24px;
		left: 50%;
		transform: translateX(-50%);
		font-size: 24px;
		font-weight: 400;
		letter-spacing: 0.05em;
		color: #FFFFFF;
		margin: 0;
		text-transform: uppercase;
	}

	&__grid {
		display: grid;
		gap: 32px;
		margin: 0 auto;
		padding: 0 92px;
		justify-content: center;

		&--yacht,
		&--beach {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			gap: 32px;
		}
	}

	&__card {
		height: auto;
		border: 1px solid rgba(255, 255, 255, 0.20);
		border-radius: 8px;
		background: radial-gradient(232.37% 123.33% at 92.67% 4.15%, rgba(255, 255, 255, 0.20) 0%, rgba(66, 66, 66, 0.02) 100%), rgba(0, 0, 0, 0.20);
		box-shadow: -5px 5px 10px 0px rgba(0, 0, 0, 0.25);
		backdrop-filter: blur(15px);
		padding: 24px;
		display: flex;
		flex-direction: column;
		min-height: 400px;
		max-width: 308px;
	}

	&__card-header {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 59px;
		overflow: hidden;
		margin-bottom: 32px;
		min-height: 280px;
		max-height: 320px;
	}

	&__card-info {
		display: flex;
		flex-direction: column;
		max-height: 150px;
		gap: 16px;
	}

	&__card-title {
		font-weight: 600;
		font-size: 32px;
		line-height: 1em;
		letter-spacing: 0.05em;
		color: #FFFFFF;
		margin: 0;
		text-transform: uppercase;
	}

	&__card-description {
		font-weight: 300;
		font-size: 16px;
		display: -webkit-box;
		line-height: 1.4em;
		color: #FFFFFF;
		margin: 0;
		max-height: 150px;
	}

	&__card-price {
		font-weight: 300;
		font-size: 30px;
		line-height: 1em;
		color: #FFFFFF;
		text-transform: uppercase;
	}

	&__card-divider {
		height: 1px;
		background: #565656;
		margin-bottom: 32px;
	}

	&__card-content {
		display: flex;
		flex-direction: column;
		gap: 24px;
		flex: 1;
	}

	&__features-title {
		font-weight: 400;
		font-size: 24px;
		line-height: 1.5em;
		letter-spacing: 0.05em;
		color: #FFFFFF;
		margin: 0;
		text-transform: uppercase;
	}

	&__features {
		display: flex;
		flex-wrap: wrap;
		gap: 24px;

		&--beach {
			gap: 24px;
		}
	}

	&__features-column {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	&__feature {
		display: flex;
		align-items: flex-start;
		gap: 16px;
	}

	&__feature-icon {
		width: 24px;
		height: 24px;
		flex-shrink: 0;

		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
	}

	&__feature-text {
		font-weight: 300;
		font-size: 16px;
		line-height: 1.4em;
		color: #FFFFFF;

		&:first-child {
			letter-spacing: 0.05em;
		}
	}

	@media (min-width: 1200px) {
		&__grid {
			padding: 0 70px;

			&--yacht,
			&--beach {
				display: flex;
				flex-wrap: nowrap;
			}
		}

		&__card {
			width: 300px;
		}

	}

	@media (max-width: 768px) {
		min-height: auto;

		&__bg {
			&-desktop {
				display: none;
			}

			&-mobile {
				display: block;
			}
		}

		&__section {
			padding: 50px 0 0;

			&:first-child,
			&:last-child {
				height: auto;
				min-height: auto;
			}

			&--yacht {
				padding-bottom: 40px;
			}

			&--beach {
				padding-bottom: 40px;
			}
		}

		&__section-title {
			font-size: 16px;
			top: 20px;
			letter-spacing: 0.05em;
		}

		&__grid {
			gap: 8px;
			padding: 0 15px;

			&--yacht,
			&--beach {
				margin-top: 30px;
				gap: 8px;
			}
		}

		&__card {
			padding: 8px;
			min-height: 300px;
			border-radius: 2.19px;
			box-shadow: -1.368px 1.368px 1.095px 0px rgba(0, 0, 0, 0.25);
			width: 140px;
		}

		&__card-content {
			gap: 12px;
		}

		&__card-header {
			gap: 16.15px;
			margin-bottom: 12px;
			min-height: 100px;
		}

		&__card-info {
			gap: 4px;
		}

		&__card-title {
			font-size: 16px;
		}

		&__card-description {
			font-size: 7px;
			line-height: 1.4em;
		}

		&__card-price {
			font-size: 16px;
		}

		&__card-divider {
			margin-bottom: 12px;
		}

		&__features {
			flex-direction: column;
			gap: 8px;
			flex-wrap: wrap;

			&--beach {
				flex-direction: column;
			}
		}

		&__features-column {
			width: 100%;
			gap: 8px;
		}

		&__feature {
			gap: 8px;
			flex-wrap: nowrap;
			align-items: flex-start;

			&-text {
				flex: 1;
				word-break: break-word;
			}

			&-icon {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 15px;
				height: 15px;

				svg {
					width: 10px;
					height: 10px;
				}
			}
		}

		&__features-title {
			font-size: 12px;
		}

		&__feature-text {
			font-size: 7px;
			line-height: 1.4em;
		}
	}

	@media (max-width: 480px) {
		&__grid {
			gap: 8px;
			padding: 0 14px;

			&--yacht,
			&--beach {
				gap: 8px;
			}
		}

		&__section-title {
			font-size: 16px;
			top: 20px;
		}

		&__card {
			width: 130px;
		}

		&__card-header {
			gap: 16.15px;
			margin-bottom: 8px;
		}

		&__card-title {
			font-size: 8.758px;
		}

		&__card-price {
			font-size: 8.211px;
		}

		&__card-description {
			font-size: 7px;
			line-height: 1.4em;
		}

		&__card-divider {
			margin-bottom: 8px;
		}

		&__card-content {
			gap: 8px;
		}

		&__features {
			gap: 8px;

			&--beach {
				gap: 8px;
			}
		}

		&__features-column {
			gap: 8px;
		}

		&__feature {
			gap: 4px;
			align-items: flex-start;

			&-text {
				flex: 1;
				word-break: break-word;
			}

			&-icon {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 15px;
				height: 15px;

				svg {
					width: 10px;
					height: 10px;
				}
			}
		}

		&__features-title {
			font-size: 6px;
			letter-spacing: 0.05em;
		}
	}
}

.w-pricing-plans__card-action {
	margin-top: 24px;
}

.w-pricing-plans__get-ticket-btn {
	font-size: 16px;
	font-weight: 500;
	padding: 10px 0;
}

@media (max-width: 768px) {
	.w-pricing-plans__card-action {
		margin-top: 12px;
	}

	.w-pricing-plans__get-ticket-btn {
		font-size: 8px;
		padding: 6px 0;
	}
}
</style>