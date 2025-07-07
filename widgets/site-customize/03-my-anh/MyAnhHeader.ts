import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __myAnhHeader: "MyAnh Header",
    __myAnhHeaderDesc: "Header navigation menu for website",
    __menuItems: "Menu Items",
    __text: "Text",
    __link: "Link"
  },
  vi: {
    __myAnhHeader: "MyAnh Header",
    __myAnhHeaderDesc: "Menu điều hướng cho trang web",
    __menuItems: "Các mục menu",
    __text: "Văn bản",
    __link: "Liên kết"
  }
};

const MyAnhHeader: WidgetType = {
  key: "MyAnhHeader",
  name: "__myAnhHeader",
  icon: "menu",
  category: WidgetTypeCategory.Header,
  desc: "__myAnhHeaderDesc",
  props: [
    {
      key: "menuItems",
      name: "__menuItems",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
      props: [
        {
          key: "text",
          name: "__text",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "link",
          name: "__link",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        }
      ]
    }
  ],
  defaultProps: JSON.stringify({
    menuItems: [
      { text: "Home", link: "#" },
      { text: "Show", link: "#" },
      { text: "Shop", link: "#" },
      { text: "Gallery/Blog", link: "#" },
      { text: "Newsletter", link: "#" },
      { text: "Contact", link: "#" }
    ]
  }),
  translations: translations,
};

export default MyAnhHeader;
