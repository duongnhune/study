<script setup lang="ts">
import { computed, onMounted } from '#imports';

interface MenuItem {
	text: string;
	link?: string;
}

interface Menu {
	menuHoverColor?: string;
	menuActiveColor?: string;
}

interface CTA {
	text: string;
	link: string;
}

interface Props {
	primaryLogo: string;
	secondaryLogo: string;
	logoLink?: string;

	menuItems: MenuItem[];
	menu: Menu;

	cta: CTA;
}

const props = defineProps<Props>()

onMounted(() => {
	const menuExpandBtn = document.querySelector('.js-menu-expand') as HTMLButtonElement;
	const menu = document.querySelector('.w-menu') as HTMLDivElement;

	if (menuExpandBtn && menu) {
		menuExpandBtn.addEventListener('click', (e: Event) => {
			e.preventDefault();
			const iconElement = menuExpandBtn.querySelector('.material-symbols-outlined') as HTMLElement;

			if (menu.classList.contains('w-menu--active')) {
				menuExpandBtn.classList.remove('active');
				if (iconElement) iconElement.textContent = 'menu';
				menu.classList.remove('w-menu--active');
			} else {
				menuExpandBtn.classList.add('active');
				if (iconElement) iconElement.textContent = 'close';
				menu.classList.add('w-menu--active');
			}
		});
	}
});

const menuStyles = computed(() => {
	return {
		'--w-hover-color': props.menu?.menuHoverColor || 'var(--bs-primary)',
		'--w-active-color': props.menu?.menuActiveColor || 'var(--bs-primary)',
	}
});
</script>

<template>
	<header class="w-header" :style="[menuStyles]">
		<div class="w-header__container">
			<div class="row align-items-center">
				<!-- Logo -->
				<div class="col-6 col-lg-3">
					<div class="w-logo">
						<a :href="logoLink">
							<img class="w-logo__primary" :src="primaryLogo" alt="logo">
							<img class="w-logo__secondary" :src="secondaryLogo" alt="logo">
						</a>
					</div>
				</div>

				<div class="col-6 col-lg-9">
					<div class="w-menu_wrapper">
						<!-- Burger Menu -->
						<button class="w-menu-expand js-menu-expand" type="button">
							<span class="material-symbols-outlined">menu</span>
						</button>
						<!-- Menu -->
						<div class="w-menu">
							<ul>
								<li v-for="(item, index) in menuItems" :key="index">
									<NuxtLink class="w-menu-link" :href="item.link || '#'">{{ item.text }}</NuxtLink>
								</li>
							</ul>
						</div>
						<!-- CTA -->
						<div class="w-cta">
							<NuxtLink class="btn btn-lg btn-primary rounded-pill" :href="cta?.link || '#'">
								<span class="material-symbols-outlined text-size-medium me-1">confirmation_number</span>
								{{ cta.text }}
							</NuxtLink>
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>

<style scoped lang="scss">
/*---------- CTA ----------*/
.w-cta {
	display: flex;
	align-items: center;
	justify-content: flex-end;
}

/*---------- Logo ----------*/
.w-logo {
	img {
		width: auto;
		height: auto;
		max-width: 100%;
		max-height: 40px;
	}

	.w-logo__secondary {
		display: none;
	}
}

/*---------- Menu ----------*/
.w-menu {
	position: absolute;
	z-index: 10;
	top: 100%;
	left: 0;
	right: 0;
	background: #fff;
	border-top: 1px solid #e5e7eb;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	display: none;
	transition: all 0.3s ease;

	&.w-menu--active {
		display: block;
	}

	>ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
	}
}

.w-menu-link {
	text-decoration: none;
	display: block;
	color: #1F2937;
	padding: 16px 20px;
	font-size: 1rem;
	font-weight: 500;
	border-bottom: 1px solid #f3f4f6;
	transition: all 0.2s ease;

	&:hover {
		background-color: #f9fafb;
		color: var(--w-hover-color, var(--bs-primary));
	}

	&.active {
		color: var(--w-active-color);
		background-color: #f0f9ff;
	}

	&:last-child {
		border-bottom: none;
	}
}

/*---------- Burger Menu ----------*/
.w-menu-expand {
	position: relative;
	background-color: transparent;
	border: none;
	padding: 8px;
	border-radius: 4px;
	transition: all 0.2s ease;
	z-index: 20;

	&:focus {
		outline: none;
	}

	&:hover {
		background-color: #f3f4f6;
	}

	.material-symbols-outlined {
		font-size: 24px;
		transition: transform 0.2s ease;
	}

	&.active {
		color: var(--w-active-color);

		.material-symbols-outlined {
			transform: rotate(90deg);
		}
	}
}

.w-header {
	position: sticky;
	top: 0;
	z-index: 1000;
	background: #ffffff;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

	&__container {
		padding: 1rem 6.5rem;
	}

	&:has(.w-menu) {
		z-index: 100;
	}

	/*---------- Header CSS ----------*/
	.w-logo {
		img {
			&.w-logo__secondary {
				display: inline;
			}

			&.w-logo__primary {
				display: none;
			}
		}
	}

	.w-menu {
		>ul>li>a {
			white-space: nowrap;
			font-family: var(--font-title);
		}
	}

	.w-menu-expand {
		color: #1F2937;

		&.active {
			color: var(--w-active-color);
		}
	}
}

/* Bootstrap 5 Responsive Breakpoints */
@media (max-width: 991.98px) {
	.w-header {
		&__container {
			padding: 1rem 2rem;
			position: relative;
		}
	}

	.w-menu_wrapper {
		position: static;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 12px;
	}

	.w-menu {
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
		background: #fff;
		border: 1px solid #e5e7eb;
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
		display: none;

		&.w-menu--active {
			display: block;
		}

		>ul {
			flex-direction: column;
		}
	}

	.w-menu-expand {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 20;
		display: block;
	}

	.w-cta {
		.btn {
			font-size: 0.875rem;
			padding: 0.5rem 1rem;
		}
	}
}

@media (max-width: 575.98px) {
	.w-header {
		&__container {
			padding: 1rem 1.5rem;
		}
	}

	.w-logo {
		img {
			height: 30px;
		}
	}

	.w-cta {
		.btn {
			font-size: 0.8rem;
			padding: 0.5rem 0.8rem;

			.material-symbols-outlined {
				font-size: 16px;
			}
		}
	}
}

@media (min-width: 992px) {
	.w-header {
		&__container {
			padding: 1rem 6.5rem;
		}
	}

	.w-menu_wrapper {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 20px;
		flex-wrap: nowrap;
		width: 100%;
	}

	.w-menu {
		position: static;
		background: transparent;
		display: flex !important;
		flex-grow: 1;
		border: none;
		box-shadow: none;

		&.w-menu--active {
			display: flex !important;
		}

		>ul {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			width: 100%;
			flex-wrap: wrap;
			gap: 0;
		}

		>ul>li {
			flex: 0 0 auto;
		}
	}

	.w-menu-link {
		line-height: 40px;
		padding: 0 16px;
		color: #1F2937;
		border-bottom: none;
		white-space: nowrap;

		&:hover {
			background-color: transparent;
			color: var(--w-hover-color, var(--bs-primary));
		}

		&.active {
			background-color: transparent;
		}
	}

	.w-menu-expand {
		display: none;
	}

	.w-cta {
		margin-left: auto;
		flex-shrink: 0;
	}
}

@media (min-width: 1200px) {
	.w-header {
		&__container {
			padding: 1rem 6.5rem;
		}
	}
}
</style>
