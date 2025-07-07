import { AccessLevel, WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __name: "Item Checkout",
    __desc: "Checkout widget for product purchases",
    __formID: "Form settings",
    __backgroundImage: "Background Image",
  },
  vi: {
    __name: "Thanh toán sản phẩm",
    __desc: "Widget thanh toán cho mua sản phẩm",
    __formID: "Cài đặt form",
    __backgroundImage: "Hình nền",
  }
};

const BaynanzaItemCheckout: WidgetType = {
  key: "BaynanzaCheckout",
  name: "__name",
  icon: "shopping_cart_checkout",
  accessLevel: AccessLevel.Public,
  category: WidgetTypeCategory.Form,
  desc: "__desc",
  props: [
    {
      key: "formID",
      name: "__formID",
      inputType: WidgetPropInput.CheckoutForm,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "backgroundImage",
      name: "__backgroundImage",
      inputType: WidgetPropInput.Image,
      category: WidgetPropCategory.Content,
      required: false
    }
  ],
  defaultProps: JSON.stringify({
    formID: "6846e8a01732257c38e3d242",
  }),
  translations: translations,
};

export default BaynanzaItemCheckout;