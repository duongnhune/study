import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __product: "Product",
    __productDesc: "Display a grid of site products",
    __title: "Title",
  },
  vi: {
    __productDesc: "Hiển thị lưới sản phẩm của website",
    __title: "Tiêu đề",
  }
};

const BaynanzaProduct: WidgetType = {
  key: "BaynanzaProduct",
  name: "__product",
  icon: "grid_view",
  category: WidgetTypeCategory.General,
  desc: "__productDesc",
  props: [
    {
      key: "title",
      name: "__title",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
  ],
  defaultProps: JSON.stringify({
  }),
  translations: translations,
};

export default BaynanzaProduct; 