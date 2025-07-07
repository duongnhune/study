<script setup lang="ts">
import { onMounted, useHead } from '#imports';

interface Props {
    logoPrimary: string
    logoSecondary: string
    menuItems: {
        text: string
        link: string
    }[]
}
defineProps<Props>()

useHead({
    script: [
        {
            innerHTML: `
            var CALLIO_LIVECHAT_API = {
                autoStart: false, //Tự động bắt đầu phiên chat khi mở popup
                //callback: function() { Điền thông tin mặc định nếu có
                //  CALLIO_LIVECHAT_API.setAttributes({
                //    'name': 'Nguyễn Văn A',
                //    'email': 'demo@domain.vn',
                //    'phone': '0367883573' // 'Key trong trường tuỳ biến': 'Giá trị'
                //  });
                //}
                }, CALLIO_LoadStart = new Date();
                (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = 'https://clientapi.phonenet.io/livechat/683ff1cf84f7f1e8c609c043/embed.js';
                fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'callioLivechat'));
            `,
            tagPosition: 'bodyClose'
        }
    ],
    bodyAttrs: {
        class: 'bg-dark'
    }
})

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
    <div class="bz-header bg-dark">
        <div class="container">
            <div class="bz-row">
                <div class="bz-col" data-col="10" data-col-lg="3">
                    <div class="bz-block bz-block-logo">
                        <div class="bz-logo">
                            <PageLink to="/">
                                <img class="bz-logo__primary" :src="logoPrimary" alt="logo">
                                <img class="bz-logo__secondary" :src="logoSecondary" alt="logo">
                            </PageLink>
                        </div>
                    </div>
                </div>
                <div class="bz-col" data-col="2" data-col-lg="9">
                    <div class="bz-block bz-block-menu">
                        <button class="bz-menu-expand js-menu-expand" type="button">
                            <span class="material-symbols-outlined">menu</span>
                        </button>
                        <div class="bz-menu">
                            <ul>
                                <li v-for="item in menuItems" :key="item.text">
                                    <PageLink :to="item.link">{{ item.text }}</PageLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
/*---------- block logo css ----------*/
.bz-logo img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 40px;
}

.bz-logo .bz-logo__secondary {
    display: none;
}

/*---------- end block logo css ----------*/
/*---------- block-menu css ----------*/
.bz-menu {
    position: absolute;
    z-index: 10;
    top: 100%;
    left: 0;
    right: 0;
    background: #fff;
    display: none;
}

.bz-menu>ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.bz-menu>ul>li>a {
    text-decoration: none;
    display: block;
    color: #333;
    padding: 12px 15px;
    font-size: 16px;
    font-weight: 500;
}

.bz-menu>ul>li.active>a {
    color: #007bff;
}

.bz-menu-expand {
    position: absolute;
    z-index: 2;
    top: 25px;
    left: 15px;
    background-color: transparent;
    border: none;
    padding: 0;
}

.bz-menu-expand:focus {
    outline: none;
}

.bz-header:has(.bz-menu) {
    position: relative;
    z-index: 100;
}

@media (min-width: 992px) {
    .bz-menu {
        position: static;
        background: transparent;
        display: block !important;
    }

    .bz-menu>ul {
        display: flex;
        flex-direction: row;
        align-items: stretch;
    }

    .bz-menu>ul>li>a {
        line-height: 40px;
        padding: 0 16px;
        color: #333;
    }

    .bz-menu>ul>li>a:hover {
        color: #007bff;
    }

    .bz-header .bz-row .bz-col+.bz-col .bz-menu>ul {
        justify-content: center;
    }

    .bz-header .bz-row .bz-col+.bz-col:last-child .bz-menu>ul {
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

    .bz-menu>ul {
        padding-top: 8px;
        padding-bottom: 8px;
    }

    .bz-header .bz-row:has(.bz-logo) .bz-col:first-child {
        padding-left: 35px;
    }
}

/*---------- end block-menu css ----------*/
/*---------- header css ----------*/
.bz-header {
    position: sticky !important;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    transition: all 0.3s ease;
}

.bz-header .bz-logo {
    min-height: 40px
}

.bz-header .bz-logo a {
    display: inline-flex;
    min-height: 40px;
    align-items: center;
}

.bz-header .bz-menu>ul>li>a {
    text-transform: uppercase
}

.bz-header .bz-menu-expand {
    color: #fff
}

.bz-header .bz-menu-expand.active {
    color: var(--bs-secondary)
}

@media (min-width: 992px) {
    .bz-header .bz-block-menu {
        width: 100%
    }

    .bz-header .bz-menu>ul {
        justify-content: space-between !important
    }

    .bz-header .bz-menu>ul>li>a {
        color: var(--text-color-title);
        font-weight: 300;
    }

    .bz-header .bz-menu>ul>li>a:hover {
        color: #fff
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

/*---------- end header css ----------*/
</style>