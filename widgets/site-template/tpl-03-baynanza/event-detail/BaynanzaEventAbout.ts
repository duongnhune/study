import { AccessLevel, WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __about: "About Section",
    __aboutDesc: "Display the about section with title and description",
    __title: "Section Title",
    __description: "Description Text"
  },
  vi: {
    __about: "Phần Giới Thiệu",
    __aboutDesc: "Hiển thị phần giới thiệu với tiêu đề và mô tả",
    __title: "Tiêu Đề Phần",
    __description: "Văn Bản Mô Tả"
  }
};

const About: WidgetType = {
  key: "BaynanzaEventAbout",
  name: "__about",
  icon: "info",
  category: WidgetTypeCategory.General,
  accessLevel: AccessLevel.Public,
  desc: "__aboutDesc",
  props: [
    {
      key: "title",
      name: "__title",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "description",
      name: "__description",
      inputType: WidgetPropInput.Textarea,
      category: WidgetPropCategory.Content,
      required: true
    }
  ],
  publicationProps: [
    {
      key: "description",
      name: "__description",
      inputType: WidgetPropInput.Textarea,
      category: WidgetPropCategory.Content,
      required: true
    }
  ],
  defaultProps: JSON.stringify({
    title: "ABOUT",
    description: "Baynanza is a unique, immersive experience designed to ignite creativity and celebration. It's a space where artists can connect with fans and like-minded individuals, sharing unforgettable moments in a vibrant and exclusive atmosphere. Only 150 exclusive packages are available, offering varying access levels from Standard to Premium to VIP. The essence of Baynanza is rooted in attracting abundance and good fortune, creating an event unlike any other."
  }),
  translations: translations,
};

export default About;