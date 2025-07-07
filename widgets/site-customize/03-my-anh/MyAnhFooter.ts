import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __myAnhFooter: "MyAnh Footer",
    __myAnhFooterDesc: "Footer section for website",
    __copyright: "Copyright Text",
    __menuItems: "Menu Items",
    __text: "Text",
    __link: "Link"
  },
  vi: {
    __myAnhFooter: "MyAnh Footer",
    __myAnhFooterDesc: "Phần chân trang cho trang web",
    __copyright: "Văn bản bản quyền",
    __menuItems: "Các mục menu",
    __text: "Văn bản",
    __link: "Liên kết"
  }
};

const MyAnhFooter: WidgetType = {
  key: "MyAnhFooter",
  name: "__myAnhFooter",
  icon: "footer",
  category: WidgetTypeCategory.Footer,
  desc: "__myAnhFooterDesc",
  props: [
    {
      key: "copyright",
      name: "__copyright",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
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
          key: "href",
          name: "__link",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        }
      ]
    }
  ],
  defaultProps: JSON.stringify({
    copyright: "© 2024 MyAnh. All rights reserved.",
    menuItems: [
      { text: "PRIVACY POLICY", href: "#" },
      { text: "TERMS AND CONDITIONS", href: "#" }
    ]
  }),
  translations: translations,
};

export default MyAnhFooter;
