import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __hero: "Hero Banner",
    __heroDesc: "Display a hero banner with title, subtitle, and call to action",
    __title: "Title",
    __subtitle: "Subtitle",
    __eventDate: "Event date",
    __eventLocation: "Event location",
    __cta: "Call to Action",
    __ctaText: "Button text",
    __ctaIcon: "Button icon",
    __ctaLink: "Button link",
    __backgroundImage: "Background image",
    __textColor: "Text color",
    __buttonColor: "Button color",
    __buttonTextColor: "Button text color"
  },
  vi: {
    __hero: "Banner Chính",
    __heroDesc: "Hiển thị banner chính với tiêu đề, phụ đề và nút hành động",
    __title: "Tiêu đề",
    __subtitle: "Phụ đề",
    __eventDate: "Ngày sự kiện",
    __eventLocation: "Địa điểm sự kiện",
    __cta: "Nút Hành Động",
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
  key: "TPL01-Hero",
  name: "__hero",
  icon: "view_carousel",
  category: WidgetTypeCategory.Hero,
  desc: "__heroDesc",
  props: [
    {
      key: "backgroundImage",
      name: "__backgroundImage",
      inputType: WidgetPropInput.Image,
      category: WidgetPropCategory.Content,
      required: false
    },
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
      key: "cta",
      name: "__cta",
      inputType: WidgetPropInput.Object,
      category: WidgetPropCategory.Content,
      isCollapsible: true,
      isDefaultCollapse: true,
      required: false,
      props: [
        {
          key: "text",
          name: "__ctaText",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "icon",
          name: "__ctaIcon",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: false
        },
        {
          key: "link",
          name: "__ctaLink",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        }
      ]
    },
    {
      key: "textColor",
      name: "__textColor",
      inputType: WidgetPropInput.Color,
      category: WidgetPropCategory.Style,
      isCollapsible: true,
      isDefaultCollapse: true,
      required: false,
    },
  ],
  defaultProps: JSON.stringify({
    title: "CREATIVE FESTIVAL HANOI 2025",
    subtitle: "CREATIVE MINDS COME TOGETHER",
    eventDate: "Jan 12, 2025, 9:00AM",
    eventLocation: "National convention center (ncc), Hanoi, vietnam",
    cta: {
      text: "Get Tickets",
      icon: "confirmation_number",
      link: "#"
    },
    backgroundImage: 'https://breezing-upload.s3.ap-southeast-1.amazonaws.com/templates/tpl-01/hero_banner.jpg',
    textColor: "#fff",
  }),
  translations: translations,
};

export default Hero;
