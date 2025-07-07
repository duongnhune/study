import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __growup: "Growup",
    __growupDesc: "Display the growup section with statistics",
    __items: "Items",
    __icon: "Icon",
    __title: "Title",
    __desc: "Description"
  },
  vi: {
    __growup: "Khối Growup",
    __growupDesc: "Hiển thị phần growup với các thống kê",
    __items: "Các Mục",
    __icon: "Biểu Tượng",
    __title: "Tiêu Đề",
    __desc: "Mô Tả"
  }
};

const VvsNicGrowup: WidgetType = {
  key: "VvsNicGrowup",
  name: "__growup",
  icon: "bar_chart",
  category: WidgetTypeCategory.General,
  desc: "__growupDesc",
  props: [
    {
      key: "items",
      name: "__items",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
      props: [
        { key: "icon", name: "__icon", inputType: WidgetPropInput.Image, category: WidgetPropCategory.Content, required: true },
        { key: "title", name: "__title", inputType: WidgetPropInput.Text, category: WidgetPropCategory.Content, required: true },
        { key: "desc", name: "__desc", inputType: WidgetPropInput.Text, category: WidgetPropCategory.Content, required: true }
      ]
    }
  ],
  defaultProps: JSON.stringify({
    items: [
      { icon: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vvs-nic/growup_1.svg", title: "10,000", desc: "Participants from over 20 countries" },
      { icon: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vvs-nic/growup_2.svg", title: "170+", desc: "Renowned speakers, top venture capital firms, and private equity investors" }
    ]
  }),
  translations
};

export default VvsNicGrowup;