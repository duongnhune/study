<script setup lang="ts">
import { onMounted } from '#imports';

interface MenuItem {
  text: string;
  link: string;
}

interface Props {
  menuItems: MenuItem[];
}

defineProps<Props>();

onMounted(() => {
  $('.js-menu-expand').click(function (e) {
    e.preventDefault();
    var menu = $('.bz-menu');
    if (menu.hasClass('has-menu-tiny')) {
      $(this).removeClass('active');
      $('.material-symbols-outlined', this).html('menu');
      menu.removeClass('has-menu-tiny')
        .slideUp();
    } else {
      $(this).addClass('active');
      $('.material-symbols-outlined', this).html('close');
      menu.addClass('has-menu-tiny')
        .slideDown();
    }
  });
});
</script>

<template>
  <div class="bz-header">
    <div class="container">
      <div class="bz-row">
        <div class="bz-col" data-col="12">
          <div class="bz-block bz-block-menu">
            <button class="bz-menu-expand js-menu-expand" type="button">
              <span class="material-symbols-outlined">menu</span>
            </button>
            <div class="bz-menu">
              <ul>
                <li v-for="(item, index) in menuItems" :key="index">
                  <a :href="item.link">{{ item.text }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bz-header {
  position: relative;
  z-index: 100;
}

.bz-block-menu {
  position: relative;
}

.bz-menu-expand {
  display: none;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.bz-menu {
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
  }

  li {
    margin: 0;
    padding: 0;
  }

  a {
    display: block;
    padding: 10px 15px;
    text-decoration: none;
    color: var(--text-color-site);
    font-weight: 500;
    transition: color 0.3s ease;

    &:hover {
      color: var(--bs-primary);
    }
  }
}

@media (max-width: 991px) {
  .bz-menu-expand {
    display: block;
  }

  .bz-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: none;

    &.is-active {
      display: block;
    }

    ul {
      flex-direction: column;
    }

    a {
      padding: 12px 15px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);

      &:last-child {
        border-bottom: none;
      }
    }
  }
}

.bz-header {
    background-color: #fff;
    min-height: 70px
}

.bz-header .bz-menu>ul>li>a {
    color: #000;
}

.bz-header .bz-menu-expand {
    top: 22px
}

body:has(.myanh-block-intro) .bz-header {
    background-color: transparent;
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0
}

body:has(.myanh-block-intro) .bz-header .bz-menu>ul>li>a {
    color: #fff
}

body:has(.myanh-block-intro) .bz-header .bz-menu-expand {
    color: #fff
}

@media (min-width: 992px) {
    .bz-header .bz-menu>ul {
        justify-content: center
    }

    .bz-header .bz-menu>ul>li>a {
        padding: 0 24px
    }
}

@media (min-width: 1200px) {
    .bz-header .bz-menu>ul>li>a {
        padding: 0 32px
    }
}

@media (max-width: 991px) {
    .bz-menu {
        border-top: none;
        background-color: var(--bs-secondary)
    }

    .bz-menu>ul>li>a {
        color: #fff
    }
}

</style>
