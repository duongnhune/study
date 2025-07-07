import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __header_v1: "Header V1",
    __header_v1_desc: "Display header with logo, menu and call to action",
    __primary_logo: "Primary Logo",
    __secondary_logo: "Secondary Logo (white version)",
    __logo_link: "Logo Link",
    __menu_items: "Menu Items",
    __menu_item_text: "Menu Item Text",
    __menu_item_link: "Menu Item Link",
    __hover_color: "Hover Color",
    __active_color: "Active Color",
    __cta_text: "Button Text",
    __cta_link: "Button Link",
    __cta_icon: "Button Icon",
    __button_color: "Button Color",
    __text_color: "Text Color"
  },
  vi: {
    __header_v1: "Đầu trang V1",
    __header_v1_desc: "Hiển thị đầu trang với logo, menu và nút liên hệ",
    __primary_logo: "Logo chính",
    __secondary_logo: "Logo phụ (phiên bản trắng)",
    __logo_link: "Liên kết Logo",
    __menu_items: "Các mục menu",
    __menu_item_text: "Văn bản mục menu",
    __menu_item_link: "Liên kết mục menu",
    __hover_color: "Màu khi di chuột",
    __active_color: "Màu khi active",
    __cta_text: "Văn bản nút",
    __cta_link: "Liên kết nút",
    __cta_icon: "Biểu tượng nút",
    __button_color: "Màu nút",
    __text_color: "Màu văn bản"
  }
};

const HeaderV1: WidgetType = {
  key: "HeaderV1",
  name: "__header_v1",
  icon: "view_agenda",
  category: "header" as WidgetTypeCategory,
  desc: "__header_v1_desc",
  props: [
    // Logo props
    {
      key: "primaryLogo",
      name: "__primary_logo",
      inputType: WidgetPropInput.Image,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "secondaryLogo",
      name: "__secondary_logo",
      inputType: WidgetPropInput.Image,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "logoLink",
      name: "__logo_link",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    // Menu props
    {
      key: "menuItems",
      name: "__menu_items",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
      props: [
        {
          key: "text",
          name: "__menu_item_text",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "link",
          name: "__menu_item_link",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: false
        }
      ]
    },
    {
      key: "menuHoverColor",
      name: "__hover_color",
      inputType: WidgetPropInput.Color,
      category: WidgetPropCategory.Style,
      required: false
    },
    {
      key: "menuActiveColor",
      name: "__active_color",
      inputType: WidgetPropInput.Color,
      category: WidgetPropCategory.Style,
      required: false
    },
    // CTA props
    {
      key: "ctaText",
      name: "__cta_text",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "ctaLink",
      name: "__cta_link",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "ctaIcon",
      name: "__cta_icon",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "buttonColor",
      name: "__button_color",
      inputType: WidgetPropInput.Color,
      category: WidgetPropCategory.Style,
      required: false
    },
    {
      key: "textColor",
      name: "__text_color",
      inputType: WidgetPropInput.Color,
      category: WidgetPropCategory.Style,
      required: false
    }
  ],
  defaultProps: JSON.stringify({
    primaryLogo: "upload/templates/template_1/logo-breezing.png",
    secondaryLogo: "upload/templates/template_1/logo-breezing.png",
    logoLink: "#",
    menuItems: [
      {
        text: "Overview",
        link: "#"
      },
      {
        text: "Speakers",
        link: "#"
      },
      {
        text: "Agenda",
        link: "#"
      },
      {
        text: "Time & Location",
        link: "#"
      },
      {
        text: "Recap",
        link: "#"
      }
    ],
    menuHoverColor: "var(--bs-primary)",
    menuActiveColor: "var(--bs-primary)",
    ctaText: "Get Ticket",
    ctaLink: "#",
    ctaIcon: undefined,
    buttonColor: "var(--bs-primary)",
    textColor: "var(--bs-white)"
  }),
  translations: translations,
};

export default HeaderV1; 