import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared"

const translations = {
  en: {
    __cartDrawer: "Cart Drawer",
    __cartDrawerDesc: "Display the right-side cart drawer for Baynanza shop",
    __backgroundImage: "Background Image",
    __backgroundImageDesc: "Background image for the cart drawer",
  },
  vi: {
    __cartDrawer: "Giỏ hàng",
    __cartDrawerDesc: "Hiển thị ngăn kéo giỏ hàng bên phải cho shop Baynanza",
    __backgroundImage: "Hình nền",
    __backgroundImageDesc: "Hình nền cho ngăn kéo giỏ hàng",
  }
}

const BaynanzaCartDrawer: WidgetType = {
  key: "BaynanzaCartDrawer",
  name: "__cartDrawer",
  icon: "shopping_cart",
  category: WidgetTypeCategory.General,
  desc: "__cartDrawerDesc",
  props: [
    {
      key: "backgroundImage",
      name: "__backgroundImage",
      inputType: WidgetPropInput.Image,
      category: WidgetPropCategory.Content,
      desc: "__backgroundImageDesc",
    },
  ],
  defaultProps: JSON.stringify({
    backgroundImage: '',
  }),
  translations: translations,
}

export default BaynanzaCartDrawer