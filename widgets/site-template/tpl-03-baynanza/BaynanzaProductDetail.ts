import { AccessLevel, WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared"

const translations = {
  en: {
    __productDetail: "Product Detail",
    __productDetailDesc: "Display product detail information",
    __slug: "Slug",
    __slugDesc: "Slug of the product",
    __backgroundImage: "Background Image",
    __backgroundImageDesc: "Background image of the product",
    __checkoutPath: "Checkout Path",
    __checkoutPathDesc: "Checkout path of the product",
  },
  vi: {
    __productDetail: "Chi tiết sản phẩm",
    __productDetailDesc: "Hiển thị chi tiết sản phẩm",
    __slug: "Slug",
    __slugDesc: "Slug của sản phẩm",
    __backgroundImage: "Hình nền",
    __backgroundImageDesc: "Hình nền của sản phẩm",
    __checkoutPath: "Đường dẫn thanh toán",
    __checkoutPathDesc: "Đường dẫn thanh toán của sản phẩm",
  }
}

const ProductDetail: WidgetType = {
  key: "BaynanzaProductDetail",
  accessLevel: AccessLevel.Public,
  name: "__productDetail",
  icon: "shopping_bag",
  category: WidgetTypeCategory.General,
  desc: "__productDetailDesc",
  props: [
    {
      key: "checkoutPath",
      name: "__checkoutPath",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
    },
    {
      key: "backgroundImage",
      name: "__backgroundImage",
      inputType: WidgetPropInput.Image,
      category: WidgetPropCategory.Content,
    },
  ],
  defaultProps: JSON.stringify({
    backgroundImage: '',
    slug: '',
  }),
  translations: translations,
}

export default ProductDetail
