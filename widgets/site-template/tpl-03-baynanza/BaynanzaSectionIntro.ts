import { AccessLevel, WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __intro: "Intro Block",
    __introDesc: "Display the intro section with title and description",
    __title: "Title",
    __description: "Description",
    __backgroundImage: "Background Image"
  },
  vi: {
    __intro: "Khối Giới Thiệu",
    __introDesc: "Hiển thị phần giới thiệu với tiêu đề và mô tả",
    __title: "Tiêu Đề",
    __description: "Mô Tả",
    __backgroundImage: "Hình Nền"
  }
};

const Intro: WidgetType = {
  key: "BaynanzaSectionIntro",
  accessLevel: AccessLevel.Public,
  name: "__intro",
  icon: "description",
  category: WidgetTypeCategory.General,
  desc: "__introDesc",
  props: [
    {
      key: "title",
      name: "__title",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
  ],
  defaultProps: JSON.stringify({
    title: "WELCOME TO BAYNANZA",
    description: "Baynanza is a unique, immersive experience designed to ignite creativity and celebration. It's a space where artists can connect with fans and like-minded individuals, sharing unforgettable moments in a vibrant and exclusive atmosphere. Only 150 exclusive packages are available, offering varying access levels from Standard to Premium to VIP. The essence of Baynanza is rooted in attracting abundance and good fortune, creating an event unlike any other.",
    backgroundImage: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/baynanza/baynanza-block-intro.jpg"
  }),
  translations: translations,
};

export default Intro; 