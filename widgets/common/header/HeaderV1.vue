<script setup lang="ts">
import { computed } from 'vue';

interface MenuItem {
  text: string;
  link?: string;
}

interface Props {
  primaryLogo: string;
  secondaryLogo: string;
  logoLink?: string;

  menuItems: MenuItem[];
  menuHoverColor?: string;
  menuActiveColor?: string;

  ctaText?: string;
  ctaLink?: string;
  ctaIcon?: string;
  buttonColor?: string;
  textColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  logoLink: '#',
  menuHoverColor: 'var(--bs-primary)',
  menuActiveColor: 'var(--bs-primary)',
  ctaText: 'Get Ticket',
  ctaLink: '#',
  ctaIcon: undefined,
  buttonColor: 'var(--bs-primary)',
  textColor: 'var(--bs-white)'
});

const menuStyles = computed(() => ({
  '--w-hover-color': props.menuHoverColor || 'var(--bs-primary)',
  '--w-active-color': props.menuActiveColor || 'var(--bs-primary)',
}));

const ctaStyles = computed(() => ({
  '--w-button-bg-color': props.buttonColor || 'var(--bs-primary)',
  '--w-button-text-color': props.textColor || 'var(--bs-white)'
}));
</script>

<template>
  <header class="bz_header_v1">
    <div class="container">
      <div class="bz-row align-items-center">
        <!-- Logo -->
        <div class="bz-col">
          <div class="bz_block bz_block_logo">
            <div class="bz_logo">
              <NuxtLink :href="logoLink">
                <img class="bz_logo__primary" :src="primaryLogo" alt="logo">
                <img class="bz_logo__secondary" :src="secondaryLogo" alt="logo">
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Menu -->
        <div class="bz-col">
          <div class="bz_block bz_block_menu" :style="menuStyles">
            <button class="bz_menu_expand js_menu_expand" type="button">
              <span class="material-symbols-outlined">menu</span>
            </button>
            <div class="bz_menu">
              <ul>
                <li v-for="(item, index) in menuItems" :key="index">
                  <NuxtLink :href="item.link || '#'">{{ item.text }}</NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="bz-col">
          <div class="bz_block bz_block_cta" :style="ctaStyles">
            <div class="bz_cta">
              <NuxtLink class="btn btn-lg btn-primary rounded-pill" :href="ctaLink">
                <span v-if="ctaIcon" class="material-symbols-outlined text-size-medium me-1">{{ ctaIcon }}</span>
                {{ ctaText }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.bz_header_v1 {
  padding: 20px 0;
  background-color: var(--bs-white);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .bz-row {
    align-items: center;
  }
}

/* Logo styles */
.bz_logo img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 40px;
}

.bz_logo .bz_logo__secondary {
  display: none;
}

/* Menu styles */
.bz_menu {
  position: absolute;
  z-index: 10;
  top: 100%;
  left: 0;
  right: 0;
  display: none;
}

.bz_menu>ul {
  list-style: none;
  padding: 0;
  margin: 0;

  &>li {
    white-space: nowrap;
  }
}

.bz_menu>ul>li>a {
  text-decoration: none;
  display: block;
  color: #333;
  padding: 12px 15px;
  font-size: 16px;
  font-weight: 500;
}

.bz_menu>ul>li.active>a {
  color: var(--w-active-color);
}

.bz_menu_expand {
  position: absolute;
  z-index: 2;
  top: 25px;
  left: 15px;
  background-color: transparent;
  border: none;
  padding: 0;
}

.bz_menu_expand:focus {
  outline: none;
}

/* CTA styles */
.bz_cta {
  .btn {
    background-color: var(--w-button-bg-color);
    color: var(--w-button-text-color);
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      border: 1px solid var(--w-button-bg-color);
    }
  }
}

/* Responsive styles */
@media (min-width: 992px) {
  .bz_menu {
    position: static;
    background: transparent;
    display: block !important;
  }

  .bz_menu>ul {
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }

  .bz_menu>ul>li>a {
    line-height: 40px;
    padding: 0 16px;
    color: #333;
  }

  .bz_menu>ul>li>a:hover {
    color: var(--w-hover-color);
  }

  .bz_header_v1 .bz-row .bz-col+.bz-col .bz_menu>ul {
    justify-content: center;
  }

  .bz_header_v1 .bz-row .bz-col+.bz-col:last-child .bz_menu>ul {
    justify-content: flex-end;
  }

  .bz_menu_expand {
    display: none;
  }
}

@media (max-width: 991px) {
  .bz_menu {
    border-top: 1px solid #e5e5e5;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .bz_menu>ul {
    padding-top: 8px;
    padding-bottom: 8px;
  }

  .bz_header_v1 .bz-row:has(.bz_logo) .bz-col:first-child {
    padding-left: 35px;
  }
}
</style>