import { AccessLevel, WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __hero: "Hero Section",
    __heroDesc: "Display the main hero section with title, subtitle and call-to-action",
    __volume: "Volume Text",
    __title: "Main Title",
    __subtitle: "Subtitle",
    __buttonText: "Button Text",
    __buttonLink: "Button Link",
    __eventDate: "Event Date",
    __eventLocation: "Event Location",
    __sponsors: "Sponsors",
    __cover: "Desktop Cover",
    __mobileCover: "Mobile Cover"
  },
  vi: {
    __hero: "Phần Hero",
    __heroDesc: "Hiển thị phần hero chính với tiêu đề, phụ đề và nút hành động",
    __volume: "Văn Bản Tập",
    __title: "Tiêu Đề Chính",
    __subtitle: "Phụ Đề",
    __buttonText: "Văn Bản Nút",
    __buttonLink: "Liên Kết Nút",
    __eventDate: "Ngày Sự Kiện",
    __eventLocation: "Địa Điểm Sự Kiện",
    __sponsors: "Nhà Tài Trợ",
    __cover: "Hình Ảnh Desktop",
    __mobileCover: "Hình Ảnh Mobile"
  }
};

const Hero: WidgetType = {
  key: "BaynanzaEventHero",
  name: "__hero",
  icon: "star",
  category: WidgetTypeCategory.Hero,
  accessLevel: AccessLevel.Public,
  desc: "__heroDesc",
  props: [
    {
      key: "cover",
      name: "__cover",
      inputType: WidgetPropInput.Image,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "mobileCover",
      name: "__mobileCover",
      inputType: WidgetPropInput.Image,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "eventDate",
      name: "__eventDate",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "eventLocation",
      name: "__eventLocation",
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
      key: "buttonLink",
      name: "__buttonLink",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
  ],
  publicationProps: [
    {
      key: "cover",
      name: "__cover",
      inputType: WidgetPropInput.Image,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "mobileCover",
      name: "__mobileCover",
      inputType: WidgetPropInput.Image,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "eventDate",
      name: "__eventDate",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "eventLocation",
      name: "__eventLocation",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
  ],
  defaultProps: JSON.stringify({
    cover: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/baynanza/desktop+background.png",
    mobileCover: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/baynanza/mobile-background.png",
    buttonText: "GET TICKET",
    buttonLink: "/event-registration",
    eventDate: "JULY 5, 2025",
    eventLocation: "HO CHI MINH CITY - HO TRAM",
  }),
  translations: translations,
};

export default Hero;