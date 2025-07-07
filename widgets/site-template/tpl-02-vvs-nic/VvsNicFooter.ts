import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __footer: "Footer",
    __footerDesc: "Display the footer section",
    __contacts: "Contacts",
    __locations: "Locations",
    __copyright: "Copyright"
  },
  vi: {
    __footer: "Khối Footer",
    __footerDesc: "Hiển thị phần chân trang",
    __contacts: "Liên Hệ",
    __locations: "Địa Điểm",
    __copyright: "Bản Quyền"
  }
};

const VvsNicFooter: WidgetType = {
  key: "VvsNicFooter",
  name: "__footer",
  icon: "footer",
  category: WidgetTypeCategory.Footer,
  desc: "__footerDesc",
  props: [
    {
      key: "contacts",
      name: "__contacts",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: false,
      props: [
        { key: "label", name: "__contacts", inputType: WidgetPropInput.Text, category: WidgetPropCategory.Content, required: true },
        { key: "value", name: "__contacts", inputType: WidgetPropInput.Text, category: WidgetPropCategory.Content, required: true }
      ]
    },
    {
      key: "locations",
      name: "__locations",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: false,
      props: [
        { key: "address", name: "__locations", inputType: WidgetPropInput.Text, category: WidgetPropCategory.Content, required: true }
      ]
    },
    { key: "copyright", name: "__copyright", inputType: WidgetPropInput.Text, category: WidgetPropCategory.Content, required: false }
  ],
  defaultProps: JSON.stringify({
    contacts: [
      { label: "call", value: "080 44838" },
      { label: "mail", value: "info@nic.gov.vn" }
    ],
    locations: [
      { address: "6B Hoàng Diệu, Quận Ba Đình, Hà Nội" },
      { address: "Tòa nhà NIC, Ngõ 7 Tôn Thất Thuyết, Cầu Giấy, Hà Nội" },
      { address: "Khu Công Nghệ Cao Hòa Lạc, Tân Xá, Thạch Thất, Hà Nội" }
    ],
    copyright: "Copyright ©2024 - Trung tâm Đổi mới sáng tạo Quốc gia. All rights reserved."
  }),
  translations
};

export default VvsNicFooter;