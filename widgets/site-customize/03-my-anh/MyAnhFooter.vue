<script setup lang="ts">
import { defineProps } from 'vue';

interface Props {
    copyright: string;
    menuItems: { text: string; href: string }[];
}

defineProps<Props>();

</script>

<template>
    <div class="bz-footer">
        <div class="container">
            <div class="bz-row" data-gutter="1" data-gutter-md="2" data-gutter-lg="3">
                <div class="bz-col" data-col="12" data-col-lg="6">
                    <div class="bz-block bz-block-html-content myanh-block-copyright">
                        <div class="bz-html-content">
                            <p>{{ copyright }}</p>
                        </div>
                        <!--end bz-html-content-->
                    </div>
                    <!--end bz-block-->
                </div>
                <!--end bz-col-->
                <div class="bz-col" data-col="12" data-col-lg="6">
                    <div class="bz-block bz-block-menu-vertical myanh-block-footer-menu">
                        <div class="bz-menu-vertical">
                            <ul>
                                <li v-for="item in menuItems" :key="item.text"><a :href="item.href">{{ item.text }}</a>
                                </li>
                            </ul>
                            <!--end ul-->
                        </div>
                        <!--end bz-menu-vertical-->
                    </div>
                    <!--end bz-block-->
                </div>
                <!--end bz-col-->
            </div>
            <!--end bz-row-->
        </div>
        <!--end container-->
    </div>
</template>

<style scoped>
/*---------- block menu vertical css ----------*/
.bz-menu-vertical > ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.bz-menu-vertical > ul > li {
  position: relative;
  margin-bottom: 16px;
}
.bz-menu-vertical > ul > li:last-child {
  margin-bottom: 0;
}
.bz-menu-vertical > ul > li > a {
  display: block;
  color: #333;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
}
.bz-menu-vertical > ul > li > a.active {
  background-color: #007bff;
}

@media (min-width: 992px) {
  .bz-menu-vertical > ul > li > a:hover {
    color: #007bff;
  }
}
/*---------- end block menu vertical css ----------*/

.bz-footer {
    background-color: #fff;
    overflow: hidden
}

.bz-footer .bz-html-content {
    font-weight: 500;
    color: #000;
    font-size: 1rem;
    text-align: center
}

.bz-footer .bz-html-content p {
    font-size: 1rem
}

.bz-footer .bz-menu-vertical>ul>li>a {
    text-align: center;
    font-size: 1rem
}

@media (min-width: 992px) {
    .bz-footer .bz-html-content {
        text-align: left
    }

    .bz-footer .bz-menu-vertical>ul {
        display: flex;
        flex-direction: row;
        align-items: center
    }

    .bz-footer .bz-menu-vertical>ul>li {
        margin-left: 2.5rem
    }
}

@media (min-width: 1200px) {
    .bz-footer .container {
        padding-left: 2rem;
        padding-right: 2rem;
        width: auto;
        max-width: none
    }

    .bz-footer .bz-menu-vertical>ul {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end
    }

    .bz-footer .bz-menu-vertical>ul>li {
        margin-left: 5rem;
        margin-bottom: 0
    }
}

@media (max-width: 991px) {
    .bz-footer .bz-row .bz-col {
        margin-bottom: 1rem
    }

    .bz-footer .bz-row .bz-col:last-child {
        margin-bottom: 0
    }
}
</style>
