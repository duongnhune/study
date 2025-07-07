import { WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __copyright: "Copyright",
    __copyrightDesc: "Copyright and powered by component"
  },
  vi: {
    __copyright: "Bản quyền",
    __copyrightDesc: "Thành phần bản quyền và được cung cấp bởi"
  }
};

const Copyright: WidgetType = {
  key: "Copyright",
  name: "__copyright",
  icon: "copyright",
  category: WidgetTypeCategory.Content,
  desc: "__copyrightDesc",
  props: [],
  defaultProps: JSON.stringify({}),
  translations: translations,
};

export default Copyright;
