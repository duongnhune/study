import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __name: "Header",
    __desc: "Display header with logo, menu and call to action",
    __primary_logo: "Primary Logo",
    __secondary_logo: "Secondary Logo (white version)",
    __logo_link: "Logo Link",
    __menu_items: "Menu Items",
    __menu_item_text: "Menu Item Text",
    __menu_item_link: "Menu Item Link",
    __menu: "Menu",
    __menu_hover_color: "Hover Color",
    __menu_active_color: "Active Color",
    __cta: "CTA",
    __cta_text: "Button Text",
    __cta_link: "Button Link",
    __cta_icon: "Button Icon"
  },
  vi: {
    __name: "Đầu trang",
    __dc: "Hiển thị đầu trang với logo, menu và nút liên hệ",
    __primary_logo: "Logo chính",
    __secondary_logo: "Logo phụ (phiên bản trắng)",
    __logo_link: "Liên kết Logo",
    __menu_items: "Các mục menu",
    __menu_item_text: "Văn bản mục menu",
    __menu_item_link: "Liên kết mục menu",
    __menu: "Menu",
    __menu_hover_color: "Màu khi di chuột",
    __menu_active_color: "Màu khi active",
    __cta: "Nút liên hệ",
    __cta_text: "Văn bản nút",
    __cta_link: "Liên kết nút",
    __cta_icon: "Biểu tượng nút"
  }
};

const TPL01Header: WidgetType = {
  key: "TPL01-Header",
  name: "__name",
  icon: "view_agenda",
  category: "header" as WidgetTypeCategory,
  desc: "__dc",
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
      isCollapsible: true,
      isDefaultCollapse: true,
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
      key: "menu",
      name: "__menu",
      inputType: WidgetPropInput.Object,
      category: WidgetPropCategory.Style,
      isCollapsible: true,
      isDefaultCollapse: true,
      required: false,
      props: [
        {
          key: "menuHoverColor",
          name: "__menu_hover_color",
          inputType: WidgetPropInput.Color,
          category: WidgetPropCategory.Style,
          required: false
        },
        {
          key: "menuActiveColor",
          name: "__menu_active_color",
          inputType: WidgetPropInput.Color,
          category: WidgetPropCategory.Style,
          required: false
        }
      ]
    },
    // CTA props
    {
      key: "cta",
      name: "__cta",
      inputType: WidgetPropInput.Object,
      category: WidgetPropCategory.Content,
      required: true,
      props: [
        {
          key: "text",
          name: "__cta_text",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "link",
          name: "__cta_link",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        }
      ]
    },
  ],
  defaultProps: JSON.stringify({
    primaryLogo: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/templates/tpl-01/logo-breezing.png",
    secondaryLogo: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/templates/tpl-01/logo-breezing.png",
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
    menu: {
      menuHoverColor: "",
      menuActiveColor: ""
    },
    cta: {
      text: "Get Ticket",
      link: "#",
    }
  }),
  translations: translations,
};

export default TPL01Header; 