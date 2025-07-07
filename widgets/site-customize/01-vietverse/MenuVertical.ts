import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __menuVertical: "Menu Vertical",
    __menuVerticalDesc: "Vertical navigation menu",
    __items: "Items",
    __linkTo: "Link To",
    __title: "Title",
    __iconCode: "Icon code"
  },
  vi: {
    __menuVertical: "Menu dọc",
    __menuVerticalDesc: "Menu điều hướng dọc",
    __items: "Các mục",
    __linkTo: "Liên kết đến",
    __title: "Tiêu đề",
    __iconCode: "Mã biểu tượng"
  }
};

const MenuVertical: WidgetType = {
  key: "MenuVertical",
  name: "__menuVertical",
  icon: "menu",
  category: WidgetTypeCategory.Content,
  desc: "__menuVerticalDesc",
  props: [
    {
      key: "items",
      name: "__items",
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
        },
        {
          key: "iconCode",
          name: "__iconCode",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: false
        }
      ]
    }
  ],
  defaultProps: JSON.stringify({
    items: [
      {
        linkTo: "#home",
        title: "Home",
        iconCode: "home"
      },
      {
        linkTo: "#about",
        title: "About Us",
        iconCode: "info"
      },
    ]
  }),
  translations: translations,
};

export default MenuVertical;
