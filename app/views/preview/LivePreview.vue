<script lang="ts" setup>
import { useSiteStore } from '~/stores/site';
import { ref, onMounted, onUnmounted, onUpdated } from 'vue';
import { storeToRefs } from 'pinia';

import AddWidgetButton from '~/views/preview/AddSectionButton.vue';
import { PageType, WidgetTypeCategory } from '@breezingin/breezing-shared';
import Widget from '~/components/Widget.vue';

const siteStore = useSiteStore();
const pageStore = usePageStore();
const { currentPage } = storeToRefs(siteStore);
const activeWidgetID = ref<string>();

const appStore = useAppStore();
appStore.setIsPreviewMode(true);

const hoveredWidgetID = ref<string>();
const topLevelParentID = computed(() => {
  if (import.meta.client) {
    const $element = $(`[data-w-scoped-id="${hoveredWidgetID.value}"]`);
    const $parent = $element.parents("[data-w-scoped-id]").last();
    const widgetType = $element.attr("data-w-widget-type");

    if (widgetType === WidgetTypeCategory.Header) {
      return hoveredWidgetID.value;
    }

    return $parent.attr("data-w-scoped-id");
  }
  return undefined;
})

const colorClasses = {
  hover: "#FF8C42",
  active: "#FE5B00"
};

useHead({
  link: [
    { href: `/css/bz-fonts.min.css`, rel: 'stylesheet', tagPriority: -1 },
    { href: `/css/bootstrap-custom.min.css`, rel: 'stylesheet', tagPriority: -1 },
    { href: `/css/bz-main.min.css`, rel: 'stylesheet', tagPriority: -1 },
    { href: '/lib-css/owl.carousel.min.css', rel: 'stylesheet', tagPriority: -1 },
    { href: '/lib-css/swiper-bundle.css', rel: 'stylesheet', tagPriority: -1 },
  ],
  script: [
    { src: `/js/jquery-3.7.1.min.js`, type: 'text/javascript', tagPosition: 'bodyClose' },
    { src: `/js/jquery-migrate-3.5.2.min.js`, type: 'text/javascript', tagPosition: 'bodyClose' },
    { src: `/lib-js/jquery.scrollbar.js`, type: 'text/javascript', tagPosition: 'bodyClose' },
    { src: `/js/popper.min.js`, type: 'text/javascript', tagPosition: 'bodyClose' },
    { src: `/js/bootstrap.bundle.min.js`, type: 'text/javascript', tagPosition: 'bodyClose' },
    { src: '/js/owl.carousel.min.js', type: 'text/javascript', tagPosition: 'bodyClose' },
    { src: '/js/owl.carousel2.thumbs.min.js', type: 'text/javascript', tagPosition: 'bodyClose' },
    { src: '/js/jquery.lazyload.min.js', type: 'text/javascript', tagPosition: 'bodyClose' },
    { src: '/js/widget.js', type: 'text/javascript', tagPosition: 'bodyClose' },
    { src: '/js/swiper-bundle.min.js', type: 'text/javascript', tagPosition: 'bodyClose' },
  ]
});

const lastUpdateTime = ref(0);

function selectWidget(scopedID: string | undefined) {
  $("[data-w-scoped-id]").removeClass("w-active");
  $("[data-w-label-id]").css({
    'backgroundColor': colorClasses.hover,
    'zIndex': '0'
  });

  if (!scopedID) return;

  const $targetElement = $(`[data-w-scoped-id="${scopedID}"]`);
  const $targetLabel = $(`[data-w-label-id="${scopedID}"]`);

  $targetElement.addClass("w-active");
  $targetLabel.css({
    'backgroundColor': colorClasses.active,
    'zIndex': '1000'
  });

  activeWidgetID.value = scopedID;
}

function removeAddWidgetButton() {
  $(".add-widget-container").remove();
}

function isTopLevelWidget($element: any) {
  const parentWidgets = $element.parents("[data-w-scoped-id]").not(".w-active");
  return parentWidgets.length === 0;
}

function isValidHoverTarget($element: any) {
  const widgetType = $element.attr("data-w-widget-type");

  if (widgetType && !["Row", "Col", WidgetTypeCategory.Footer].includes(widgetType)) {
    return true;
  }

  return isTopLevelWidget($element) || isInsideActiveWidget($element);
}

function isInsideActiveWidget($element: any) {
  return $element.parents(".w-active").length > 0;
}

function addWidgetHoverListener() {
  $(document).on("mouseenter", "[data-w-scoped-id]:not(.add-widget-container)", function (event) {
    event.stopPropagation();

    const $this = $(this);
    const scopedID = $this.attr("data-w-scoped-id");
    const widgetType = $this.attr("data-w-widget-type");

    const isParentSleep = $this.closest('.w-sleep').length > 0;

    if (isValidHoverTarget($this) && !isParentSleep) {
      $("[data-w-scoped-id]").removeClass("w-hover");

      $this.addClass("w-hover");

      const isDefaultWidget = ["Row", "Col", WidgetTypeCategory.Footer].includes(widgetType || "");

      removeAddWidgetButton();

      if (!isDefaultWidget) {
        hoveredWidgetID.value = scopedID;

        const $container = $("<div>").addClass("add-widget-container");

        if ($this.css("position") === "static") {
          $this.css("position", "relative");
        }

        $container.css({
          "position": "absolute",
          "left": "50%",
          "transform": "translateX(-50%)",
          "bottom": "-12px",
          "z-index": "102",
          "width": "100%",
          "display": "flex",
          "justify-content": "center"
        });

        $container.css("pointer-events", "auto");

        $this.append($container);

        setTimeout(() => {
          if (hoveredWidgetID.value === scopedID) {
            const tempValue = hoveredWidgetID.value;
            hoveredWidgetID.value = undefined;
            setTimeout(() => {
              hoveredWidgetID.value = tempValue;
            }, 0);
          }
        }, 10);
      }
    }
  });

  $(document).on("mouseleave", "[data-w-scoped-id]", function (event) {
    const $this = $(this);
    const relatedTarget = event.relatedTarget;

    const isHoveringAddWidgetButton = relatedTarget ?
      $(relatedTarget).closest(".add-widget-container, .add-widget, .add-widget__modal, .add-widget__connector, .add-widget__wrapper").length > 0 :
      false;

    if (!isHoveringAddWidgetButton) {
      $this.removeClass("w-hover");
      hoveredWidgetID.value = undefined;
      removeAddWidgetButton();
    }
  });

  $(document).on("mouseenter mouseleave mousemove click", ".add-widget, .add-widget__modal, .add-widget__connector, .add-widget__wrapper, .add-widget__button", function (event) {
    event.stopPropagation();
  });
}

function addWidgetActiveListener() {
  $(document).on("click", "[data-w-scoped-id]", function (event) {
    if ($(event.target).closest(".add-widget, .add-widget__modal, .add-widget__connector, .add-widget__wrapper, .add-widget__button").length > 0) {
      event.stopPropagation();
      return;
    }

    event.stopPropagation();
    const $this = $(this);
    const scopedID = $this.attr("data-w-scoped-id");

    if (isValidHoverTarget($this) && !$this.closest('.w-sleep').length) {
      selectWidget(scopedID);

      window.parent.postMessage(JSON.stringify({
        type: "widget-selected",
        data: {
          scopedID,
          mouseX: event.clientX,
          mouseY: event.clientY
        }
      }), "*");
    }
  });
}

function preventLinkAndButtonClicks() {
  $(document).on("click", "a, button, [role='button'], input[type='submit'], input[type='button']", function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  });
}

function initListeners() {
  $(document).off("mouseenter", "[data-w-scoped-id]");
  $(document).off("mouseleave", "[data-w-scoped-id]");
  $(document).off("click", "[data-w-scoped-id]");
  $(document).off("mouseenter", ".add-widget, .add-widget__modal");
  $(document).off("click", ".add-widget, .add-widget__modal");

  addWidgetHoverListener();
  addWidgetActiveListener();
  preventLinkAndButtonClicks();
}

function initMessageListener() {
  window.addEventListener("message", async (e) => {
    try {
      const message = JSON.parse(e.data);

      switch (message.type) {
        case "changed":
          const site = message.data.site;
          const page = message.data.page;
          const theme = message.data.theme;
          const widgets = (message.data.widgets || []).map((widget: any) => {
            let props = widget.props;
            if (props && typeof props === "string") {
              try {
                props = JSON.parse(props);
              } catch (error) {
                console.error("Parsing widget props:\n id:", widget.id, "\n props:", props, "\n error:", error);
              }
            }
            return { ...widget, props }
          });

          if (!site || !page) {
            return
          }
          siteStore.setSite(site);
          siteStore.setCurrentPage(page);
          siteStore.setWidgets(widgets || []);
          siteStore.setWidgetTypes(message.data.widgetTypes || []);
          lastUpdateTime.value = Date.now();

          if (theme) applyTheme(theme);
          if (site?.styleBody) useHead({ style: [{ innerHTML: site.styleBody, tagPriority: 0 }] });
          document.body.className = page.bodyClass || "";

          if (page.type === PageType.EventDetail) {
            const sitePublication = message.data.sitePublication;
            if (sitePublication) {
              pageStore.setEventDetailData({
                event: sitePublication.entity,
                eventPublication: sitePublication
              });
            }
          } else if (page.type === PageType.ProductDetail) {
            const sitePublication = message.data.sitePublication;
            if (sitePublication) {
              pageStore.setProductDetailData({
                product: sitePublication.entity,
                productPublication: sitePublication
              });
            }
          }
          break;

        case "widget-selected":
          selectWidget(message.data.scopedID);
          if (message.data.scopedID) {
            const $element = $(`[data-w-scoped-id="${message.data.scopedID}"]`);
            if ($element.length) {
              const elementOffset = $element.offset()?.top || 0;
              const windowHeight = $(window).height() || 0;
              const scrollTo = elementOffset - (windowHeight / 2) + ($element.height() || 0) / 2;
              $('html, body').animate({
                scrollTop: scrollTo,
                scrollBehavior: 'smooth'
              }, 50);
            }
          }

          break;
      }
    } catch (error) {
      console.error("Error processing message:", error);
    }
  });

  window.parent.postMessage(JSON.stringify({
    type: "iframe-initialized",
  }), "*");
}

onMounted(() => {
  initListeners();
  initMessageListener();
});

onUnmounted(() => {
  $(document).off("mouseenter", "[data-w-scoped-id]");
  $(document).off("mouseleave", "[data-w-scoped-id]");
  $(document).off("click", "[data-w-scoped-id]");
  $(document).off("mouseenter", ".add-widget, .add-widget__modal");
  $(document).off("click", ".add-widget, .add-widget__modal");
  $(document).off("click", "a, button, [role='button'], input[type='submit'], input[type='button']");
});

function applyActiveState() {
  if (activeWidgetID.value) {
    selectWidget(activeWidgetID.value);
  }
}

onUpdated(() => {
  applyActiveState();
});
</script>
<template>
  <Teleport v-if="topLevelParentID" to=".add-widget-container">
    <AddWidgetButton :widget-i-d="topLevelParentID" />
  </Teleport>

  <div v-if="currentPage">
    <Widget v-if="currentPage.headerScopedID" :scoped-i-d="currentPage.headerScopedID" />
    <div class="bz-content">
      <template v-for="widgetID in currentPage.widgetScopedIDs" :key="widgetID">
        <Widget :scoped-i-d="widgetID" />
      </template>
    </div>
    <Widget v-if="currentPage.footerScopedID" :scoped-i-d="currentPage.footerScopedID" />
  </div>
  <div v-else>
    <div class="loading-container">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
[data-w-scoped-id] {
  position: relative;
  transition: background-color 0.15s ease;
}

.w-hover {
  border: 2px solid #0253e8 !important;
  background: rgba(2, 83, 232, 0.08);
}

.w-active {
  border: 3px solid #FE5B00 !important;
  z-index: 3;
  position: relative;
}

.add-widget,
.add-widget__button {
  opacity: 1 !important;
}

.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: #FE5B00;
}
</style>
