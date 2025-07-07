import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __nicVerticalMenu: "Vertical Menu (NIC)",
    __verticalMenuDesc: "Display a vertical menu with expandable items",
    __menuItems: "Menu Items",
    __menuItemText: "Menu Item Text",
    __menuItemLink: "Menu Item Link"
  },
  vi: {
    __nicVerticalMenu: "Menu dọc (NIC)",
    __verticalMenuDesc: "Hiển thị menu dọc với các mục có thể mở rộng",
    __menuItems: "Các mục menu",
    __menuItemText: "Văn bản mục menu",
    __menuItemLink: "Liên kết mục menu"
  }
};

const VerticalMenu: WidgetType = {
  key: "NicVerticalMenu",
  name: "__nicVerticalMenu",
  icon: "menu",
  category: WidgetTypeCategory.Event,
  desc: "__verticalMenuDesc",
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
          name: "__menuItemText",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "link",
          name: "__menuItemLink",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: false
        }
      ]
    }
  ],
  defaultProps: JSON.stringify({
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
        text: "Previous events",
        link: "#"
      }
    ]
  }),
  translations: translations,
};

export default VerticalMenu;
