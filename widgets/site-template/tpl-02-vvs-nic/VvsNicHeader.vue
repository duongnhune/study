<script setup lang="ts">
interface MenuItem {
  text: string
  link: string
}
interface Props {
  logoPrimary: string
  logoSecondary: string
 menuItems: MenuItem[]
}
defineProps<Props>()
</script>

<template>
  <div class="bz-header">
    <div class="container">
      <div class="bz-row">
        <div class="bz-col" data-col="6" data-col-lg="3">
          <div class="bz-block bz-block-logo">
            <div class="bz-logo">
              <a href="#">
                <img class="bz-logo__primary" :src="logoPrimary" alt="logo" />
                <img class="bz-logo__secondary" :src="logoSecondary" alt="logo" />
              </a>
            </div>
          </div>
        </div>
        <div class="bz-col justify-content-end" data-col="6" data-col-lg="9">
          <div class="bz-block bz-block-menu">
            <button class="bz-menu-expand js-menu-expand" type="button">
              <span class="material-symbols-outlined">menu</span>
            </button>
            <div class="bz-menu">
              <ul>
                <li v-for="item in menuItems" :key="item.text">
                  <a :href="item.link">{{ item.text }}</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="bz-block bz-block-cta ms-3">
            <div class="bz-cta">
              <a class="btn btn-lg btn-secondary rounded-pill" href="#">
                <span class="material-symbols-outlined text-size-medium me-1">confirmation_number</span>
                Get Tickets
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bz-header {
  background: #070A4F;
  border-bottom: 1px solid #eee;
  padding: 0.5rem 0;
}
.bz-logo img {
  height: 48px;
  max-width: 100%;
}
.bz-menu {
  /* Always show menu for now */
  display: block;
  position: static;
  background: transparent;
}
.bz-menu > ul {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  list-style: none;
  margin: 0;
  padding: 0;
}
.bz-menu > ul > li > a {
  text-decoration: none;
  display: block;
  color: #fff;
  padding: 12px 15px;
  font-size: 16px;
  font-weight: 500;
  line-height: 40px;
}
.bz-menu > ul > li > a:hover {
  color: #00bcd4;
}
.bz-menu-expand {
  display: none;
}

@media (min-width: 992px) {
  .bz-menu {
    position: static;
    background: transparent;
    display: block !important;
  }
  .bz-menu > ul {
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }
  .bz-menu > ul > li > a {
    line-height: 40px;
    padding: 0 16px;
    color: #333;
  }
  .bz-menu > ul > li > a:hover {
    color: #007bff;
  }
  .bz-header .bz-row .bz-col + .bz-col .bz-menu > ul {
    justify-content: center;
  }
  .bz-header .bz-row .bz-col + .bz-col:last-child .bz-menu > ul {
    justify-content: flex-end;
  }
  .bz-menu-expand {
    display: none;
  }
}
@media (max-width: 991px) {
  .bz-menu {
    border-top: 1px solid #e5e5e5;
    -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .bz-menu > ul {
    padding-top: 8px;
    padding-bottom: 8px;
  }
  .bz-header .bz-row:has(.bz-logo) .bz-col:first-child {
    padding-left: 35px;
  }
}
</style>