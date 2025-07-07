import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __myAnhPreOrder: "MyAnh Pre Order",
    __myAnhPreOrderDesc: "Pre-order button with modal form",
    __buttonText: "Button Text",
    __formID: "Form ID",
    __modalTitle: "Modal Title",
  },
  vi: {
    __myAnhPreOrder: "MyAnh Đặt Trước",
    __myAnhPreOrderDesc: "Nút đặt trước với form modal",
    __buttonText: "Văn bản nút",
    __formID: "ID Form",
    __modalTitle: "Tiêu đề Popup",
  }
};

const MyAnhPreOrder: WidgetType = {
  key: "MyAnhPreOrder",
  name: "__myAnhPreOrder",
  icon: "shopping_cart",
  category: WidgetTypeCategory.Form,
  desc: "__myAnhPreOrderDesc",
  props: [
    {
      key: "formID",
      name: "__formID",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "buttonText",
      name: "__buttonText",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "modalTitle",
      name: "__modalTitle",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
  ],
  defaultProps: JSON.stringify({
    buttonText: "PRE - ORDER NOW",
    modalId: "pre-order-information-modal"
  }),
  translations: translations,
};

export default MyAnhPreOrder; 