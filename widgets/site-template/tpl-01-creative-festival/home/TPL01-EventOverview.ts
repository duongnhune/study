import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __eventOverview: "Event Overview",
    __eventOverviewDesc: "Display an event overview section with title and description",
    __title: "Title",
    __description: "Description",
    __backgroundImage: "Background Image"
  },
  vi: {
    __eventOverview: "Tổng quan sự kiện",
    __eventOverviewDesc: "Hiển thị phần tổng quan sự kiện với tiêu đề và mô tả",
    __title: "Tiêu đề",
    __description: "Mô tả",
    __backgroundImage: "Hình nền"
  }
};

const TPL01EventOverview: WidgetType = {
  key: "TPL01-EventOverview",
  name: "__eventOverview",
  icon: "info",
  category: WidgetTypeCategory.General,
  desc: "__eventOverviewDesc",
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
    },
    {
      key: "backgroundImage",
      name: "__backgroundImage",
      inputType: WidgetPropInput.Image,
      category: WidgetPropCategory.Style,
      required: false
    }
  ],
  defaultProps: JSON.stringify({
    title: "Event Overview",
    description: "The Creative Festival Hanoi 2024 is set to be a vibrant celebration of art, innovation, and culture. This year's festival will feature a diverse lineup of workshops, exhibitions, and performances, showcasing both local and international talent. Attendees can engage with interactive art installations, participate in creative workshops, and enjoy live music and performances across various genres. The festival aims to foster collaboration among artists, creators, and the community, making it a must-visit event for anyone passionate about the creative arts. Don't miss this unique opportunity to immerse yourself in Hanoi's dynamic cultural scene!",
    backgroundImage: 'https://breezing-upload.s3.ap-southeast-1.amazonaws.com/templates/template_1/event_overview_bg.jpg'
  }),
  translations: translations,
};

export default TPL01EventOverview;
