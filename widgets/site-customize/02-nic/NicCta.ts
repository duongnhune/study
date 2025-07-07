import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __nicCta: "Call to Action (NIC)",
    __ctaDesc: "Display a call to action button",
    __ctaText: "Button Text",
    __ctaLink: "Button Link",
    __ctaIcon: "Button Icon"
  },
  vi: {
    __nicCta: "Nút kêu gọi hành động (NIC)",
    __ctaDesc: "Hiển thị nút kêu gọi hành động",
    __ctaText: "Văn bản nút",
    __ctaLink: "Liên kết nút",
    __ctaIcon: "Biểu tượng nút"
  }
};

const Cta: WidgetType = {
  key: "NicCta",
  name: "__nicCta",
  icon: "smart_button",
  category: WidgetTypeCategory.Event,
  desc: "__ctaDesc",
  props: [
    {
      key: "ctaText",
      name: "__ctaText",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "ctaLink",
      name: "__ctaLink",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "ctaIcon",
      name: "__ctaIcon",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    }
  ],
  defaultProps: JSON.stringify({
    ctaText: "Get Tickets",
    ctaLink: "#",
    ctaIcon: "confirmation_number"
  }),
  translations: translations,
};

export default Cta;
