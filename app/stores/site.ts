import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Widget } from '@breezingin/breezing-shared';
import type { Site } from '@breezingin/breezing-shared';
import type { Page } from '@breezingin/breezing-shared';
import type { WidgetType } from '@breezingin/breezing-shared';
import type { SiteTheme } from '@breezingin/breezing-shared';

export const useSiteStore = defineStore('site', () => {
  const site = ref<Site>();
  const pages = ref<Page[]>([]);
  const widgets = ref<Widget[]>([]);
  const widgetTypes = ref<WidgetType[]>([]);
  const selectedWidget = ref<Widget | null>(null);
  const currentPage = ref<Page>();
  const currentTheme = ref<SiteTheme>();

  const widgetDictionary = computed(() => {
    const dictionary = {} as Record<string, Widget>;
    widgets.value.forEach((widget: any) => {
      dictionary[widget.scopedID] =  widget;
    });
    return dictionary;
  });

  const widgetTypeDictionary = computed(() => {
    const dictionary = {} as Record<string, WidgetType>;
    widgetTypes.value.forEach((widgetType: WidgetType) => {
      dictionary[widgetType.key] = widgetType;
    });
    return dictionary;
  });

  function setSite(s: Site) {
    site.value = s;
  }

  function getSite() {
    return site.value;
  }

  function setCurrentTheme(t: SiteTheme) {
    currentTheme.value = t;
  }

  function getCurrentTheme() {
    return currentTheme.value;
  }

  function setCurrentPage(p: Page) {
    currentPage.value = p;
  }

  function getCurrentPage() {
    return currentPage.value;
  }

  function setPages(ps: Page[]) {
    pages.value = ps;
  }

  function getPages() {
    return pages.value;
  }

  function setWidgets(ws: Widget[]) {
    widgets.value = ws;
  }

  function getWidgets() {
    return widgets.value;
  }

  function setWidgetTypes(wts: WidgetType[]) {
    widgetTypes.value = wts;
  }

  function getWidgetTypes() {
    return widgetTypes.value;
  }

  function setSelectedWidget(w: Widget) {
    selectedWidget.value = w;
  }

  function getSelectedWidget() {
    return selectedWidget.value;
  }

  return {
    site,
    pages,
    widgets,
    widgetTypes,
    widgetDictionary,
    widgetTypeDictionary,
    currentPage,
    currentTheme,
    selectedWidget,
    setSite,
    getSite,
    setPages,
    getPages,
    setWidgets,
    getWidgets,
    setCurrentPage,
    getCurrentPage,
    setWidgetTypes,
    getWidgetTypes,
    setCurrentTheme,
    getCurrentTheme,
    getSelectedWidget,
    setSelectedWidget,
  };
});
