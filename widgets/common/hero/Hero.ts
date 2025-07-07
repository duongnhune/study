import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __hero: "Hero Banner",
    __heroDesc: "Display a hero banner with title, subtitle, and call to action",
    __title: "Title",
    __subtitle: "Subtitle",
    __eventDate: "Event Date",
    __eventLocation: "Event Location",
    __ctaText: "Button Text",
    __ctaIcon: "Button Icon",
    __ctaLink: "Button Link",
    __backgroundImage: "Background Image",
    __textColor: "Text Color",
    __buttonColor: "Button Color",
    __buttonTextColor: "Button Text Color"
  },
  vi: {
    __hero: "Banner Chính",
    __heroDesc: "Hiển thị banner chính với tiêu đề, phụ đề và nút hành động",
    __title: "Tiêu đề",
    __subtitle: "Phụ đề",
    __eventDate: "Ngày sự kiện",
    __eventLocation: "Địa điểm sự kiện",
    __ctaText: "Văn bản nút",
    __ctaIcon: "Biểu tượng nút",
    __ctaLink: "Liên kết nút",
    __backgroundImage: "Hình nền",
    __textColor: "Màu văn bản",
    __buttonColor: "Màu nút",
    __buttonTextColor: "Màu văn bản nút"
  }
};

const Hero: WidgetType = {
  key: "Hero",
  name: "__hero",
  icon: "view_carousel",
  category: WidgetTypeCategory.Hero,
  desc: "__heroDesc",
  props: [
    {
      key: "title",
      name: "__title",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "subtitle",
      name: "__subtitle",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "eventDate",
      name: "__eventDate",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "eventLocation",
      name: "__eventLocation",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "ctaText",
      name: "__ctaText",
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
    },
    {
      key: "ctaLink",
      name: "__ctaLink",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "backgroundImage",
      name: "__backgroundImage",
      inputType: WidgetPropInput.Image,
      category: WidgetPropCategory.Style,
      required: false
    },
    {
      key: "textColor",
      name: "__textColor",
      inputType: WidgetPropInput.Color,
      category: WidgetPropCategory.Style,
      required: false
    },
    {
      key: "buttonColor",
      name: "__buttonColor",
      inputType: WidgetPropInput.Color,
      category: WidgetPropCategory.Style,
      required: false
    },
    {
      key: "buttonTextColor",
      name: "__buttonTextColor",
      inputType: WidgetPropInput.Color,
      category: WidgetPropCategory.Style,
      required: false
    }
  ],
  defaultProps: JSON.stringify({
    title: "CREATIVE FESTIVAL HANOI 2024",
    subtitle: "CREATIVE MINDS COME TOGETHER",
    eventDate: "Jan 12, 2025, 9:00AM",
    eventLocation: "National convention center (ncc), Hanoi, vietnam",
    ctaText: "Get Tickets",
    ctaIcon: "confirmation_number",
    ctaLink: "#",
    backgroundImage: 'upload/templates/template_1/hero_banner.jpg',
    textColor: "#ffffff",
    buttonColor: null,
    buttonTextColor: null
  }),
  translations: translations,
};

export default Hero;
