import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __menu: "Menu",
    __menuDesc: "Navigation menu component",
    __menuItems: "Menu items",
    __linkTo: "Link to",
    __title: "Title"
  },
  vi: {
    __menu: "Menu",
    __menuDesc: "Thành phần menu",
    __menuItems: "Các mục menu",
    __linkTo: "Liên kết đến",
    __title: "Tiêu đề"
  }
};

const Menu: WidgetType = {
  key: "Menu",
  name: "__menu",
  icon: "list",
  category: WidgetTypeCategory.Content,
  desc: "__menuDesc",
  props: [
    {
      key: "menuItems",
      name: "__menuItems",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: false,
      props: [
        {
          key: "linkTo",
          name: "__linkTo",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: false
        },
        {
          key: "title",
          name: "__title",
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
        linkTo: "/about-us",
        title: "About us"
      },
      {
        linkTo: "/our-solution",
        title: "Our solution"
      },
      {
        linkTo: "/artist-profile",
        title: "Artist profile"
      }
    ]
  }),
  translations: translations,
};

export default Menu;
