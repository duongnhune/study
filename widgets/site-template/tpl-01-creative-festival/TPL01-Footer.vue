<script setup lang="ts">
interface Location {
	address: string;
}

interface Props {
	logo: string;
	logoLink?: string;
	tagline: string;
	contactTitle: string;
	heading?: string;
	contactPhone?: string;
	contactEmail?: string;
	locationsTitle: string;
	locations: Location[];
	copyright: string;
	footerLogo: string;
}

defineProps<Props>();
</script>

<template>
	<footer class="w-footer">
		<div class="w-footer__main">
			<div class="w-footer__heading">{{ heading }}</div>
			<div class="w-footer__content">
				<!-- Logo Section -->
				<div class="w-footer__col">
					<div class="w-footer__logo">
						<a :href="logoLink">
							<img :src="logo" alt="logo">
						</a>
					</div>
					<p class="w-footer__tagline">{{ tagline }}</p>
				</div>

				<!-- Contact Section -->
				<div class="w-footer__col">
					<h3 class="w-footer__title">{{ contactTitle }}</h3>
					<div class="w-footer__info-group">
						<p v-if="contactPhone" class="w-footer__info">
							<span class="material-symbols-outlined">call</span>
							{{ contactPhone }}
						</p>
						<p v-if="contactEmail" class="w-footer__info">
							<span class="material-symbols-outlined">mail</span>
							{{ contactEmail }}
						</p>
					</div>
				</div>

				<!-- Locations Section -->
				<div class="w-footer__col">
					<h3 class="w-footer__title">{{ locationsTitle }}</h3>
					<div class="w-footer__info-group">
						<p v-for="(location, index) in locations" :key="index" class="w-footer__info">
							<span class="material-symbols-outlined">location_on</span>
							{{ location.address }}
						</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Copyright Section -->
		<div class="w-footer__copyright">
			<p class="w-footer__copyright-text">{{ copyright }}</p>
			<div class="w-footer__footer-logo">
				<img :src="footerLogo" alt="footer logo">
			</div>
		</div>
	</footer>
</template>

<style scoped lang="scss">
.w-footer {
	background-color: var(--bs-light, #F3F4F6);
	display: flex;
	flex-direction: column;
	padding: 3rem 0 1.5rem;
	color: #1F2937;

	&__main {
		border-bottom: 1px solid #D1D5DB;
		padding: 0 1rem 3rem;
	}

	&__content {
		display: flex;
		flex-wrap: wrap;
		gap: 2rem;
		justify-content: space-between;
	}

	&__col {
		flex: 1;
		min-width: 200px;
	}

	&__heading {
		color: var(--bs-primary, #FE5B00);
		display: block;
		font-size: 1.5rem;
		font-weight: 700;
		line-height: 1.22;
		letter-spacing: -0.02em;
		margin-bottom: 1.5rem;
	}

	&__logo {
		margin-bottom: 1rem;

		img {
			height: 32px;
			width: auto;
		}
	}

	&__tagline {
		color: #6B7280;
		font-size: 0.875rem;
		line-height: 1.43;
		letter-spacing: -0.01em;
		max-width: 260px;
	}

	&__title {
		font-size: 1.25rem;
		color: var(--bs-primary, #FE5B00);
		font-weight: 500;
		line-height: 1.33;
		letter-spacing: -0.02em;
		margin-bottom: 0.75rem;
	}

	&__info-group {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	&__info {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		line-height: 1.5;
		letter-spacing: -0.01em;
		margin: 0;

		.material-symbols-outlined {
			font-size: 0.875rem;
		}
	}

	&__copyright {
		display: flex;
		align-items: center;
		padding: 1.5rem 1rem 0;
		gap: 0.25rem;
	}

	&__copyright-text {
		color: #6B7280;
		font-size: 0.875rem;
		line-height: 1.5;
		letter-spacing: -0.01em;
		margin: 0;
	}

	&__footer-logo {
		img {
			height: 20px;
			width: auto;
		}
	}
}

/* Bootstrap 5 Responsive Breakpoints */
@media (max-width: 575.98px) {
	.w-footer {
		padding: 3rem 0 1.5rem;

		&__main {
			padding: 0 1rem 3rem;
		}

		&__content {
			gap: 2rem;
		}

		&__col {
			min-width: 200px;
		}

		&__heading {
			font-size: 1.375rem;
			margin-bottom: 1.5rem;
		}

		&__logo {
			margin-bottom: 1rem;

			img {
				height: 32px;
			}
		}

		&__tagline {
			font-size: 0.875rem;
		}

		&__title {
			font-size: 1.25rem;
			margin-bottom: 0.75rem;
		}

		&__info {
			font-size: 0.875rem;
			gap: 0.5rem;

			.material-symbols-outlined {
				font-size: 0.875rem;
			}
		}

		&__copyright {
			padding: 1.5rem 1rem 0;
			gap: 0.25rem;
		}

		&__copyright-text {
			font-size: 0.875rem;
		}

		&__footer-logo {
			img {
				height: 20px;
			}
		}
	}
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
	.w-footer {
		padding: 3.5rem 0 1.5rem;

		&__main {
			padding: 0 2rem 3.5rem;
		}

		&__content {
			gap: 2.5rem;
		}

		&__col {
			min-width: 220px;
		}

		&__heading {
			font-size: 1.75rem;
			margin-bottom: 1.5rem;
		}

		&__logo {
			img {
				height: 36px;
			}
		}

		&__tagline {
			font-size: 0.875rem;
		}

		&__title {
			font-size: 1.375rem;
		}

		&__info {
			font-size: 0.9rem;

			.material-symbols-outlined {
				font-size: 0.9rem;
			}
		}

		&__copyright {
			padding: 1.5rem 2rem 0;
		}

		&__copyright-text {
			font-size: 0.9rem;
		}

		&__footer-logo {
			img {
				height: 22px;
			}
		}
	}
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
	.w-footer {
		padding: 4rem 0 1.5rem;

		&__main {
			padding: 0 4rem 4rem;
		}

		&__content {
			gap: 3rem;
		}

		&__col {
			min-width: 240px;
		}

		&__heading {
			font-size: 2rem;
			margin-bottom: 1.5rem;
		}

		&__logo {
			img {
				height: 38px;
			}
		}

		&__tagline {
			font-size: 0.875rem;
		}

		&__title {
			font-size: 1.5rem;
		}

		&__info {
			font-size: 1rem;

			.material-symbols-outlined {
				font-size: 1rem;
			}
		}

		&__copyright {
			padding: 1.5rem 4rem 0;
		}

		&__copyright-text {
			font-size: 1rem;
		}

		&__footer-logo {
			img {
				height: 24px;
			}
		}
	}
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
	.w-footer {
		padding: 3.5rem 0 1.5rem;

		&__main {
			padding: 0 6.5rem 3.5rem;
		}

		&__content {
			gap: 2.5rem;
		}

		&__col {
			min-width: 250px;
		}

		&__heading {
			font-size: 2.25rem;
			margin-bottom: 1.5rem;
		}

		&__logo {
			img {
				height: 40px;
			}
		}

		&__tagline {
			font-size: 0.875rem;
		}

		&__title {
			font-size: 1.5rem;
			margin-bottom: 0.75rem;
		}

		&__info {
			font-size: 1rem;
			gap: 0.5rem;

			.material-symbols-outlined {
				font-size: 1rem;
			}
		}

		&__copyright {
			padding: 1.5rem 6.5rem 0;
			gap: 0.25rem;
		}

		&__copyright-text {
			font-size: 1rem;
		}

		&__footer-logo {
			img {
				height: 24px;
			}
		}
	}
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
	.w-footer {
		padding: 3.5rem 0 1.5rem;

		&__main {
			padding: 0 10.5rem 4rem;
		}

		&__content {
			gap: 2.5rem;
		}

		&__heading {
			font-size: 2.25rem;
			margin-bottom: 1.5rem;
		}

		&__copyright {
			padding: 1.5rem 10.5rem 0;
		}
	}
}

/* Extra extra large devices (larger desktops, 1400px and up) */
@media (min-width: 1400px) {
	.w-footer {
		padding: 3.5rem 0 1.5rem;

		&__main {
			padding: 0 12rem 4rem;
		}

		&__copyright {
			padding: 1.5rem 12rem 0;
		}
	}
}
</style>
