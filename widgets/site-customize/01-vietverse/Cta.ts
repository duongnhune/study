import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __cta: "CTA",
    __ctaDesc: "Call to Action button",
    __linkTo: "Link to",
    __title: "Title",
    __submit: "Submit",
    __cancel: "Cancel",
    __yes: "Yes",
    __no: "No"
  },
  vi: {
    __cta: "CTA",
    __ctaDesc: "Nút gọi hành động",
    __linkTo: "Liên kết đến",
    __title: "Tiêu đề",
    __submit: "Gửi đi",
    __cancel: "Hủy bỏ",
    __yes: "Có",
    __no: "Không"
  }
};

const Cta: WidgetType = {
  key: "Cta",
  name: "__cta",
  icon: "call",
  category: WidgetTypeCategory.Content,
  desc: "__ctaDesc",
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
  ],
  defaultProps: JSON.stringify({
    linkTo: "#contact",
    title: "Contact Us"
  }),
  translations: translations,
};

export default Cta;
