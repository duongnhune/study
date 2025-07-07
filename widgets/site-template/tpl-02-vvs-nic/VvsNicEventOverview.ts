import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __eventOverview: "Event Overview",
    __eventOverviewDesc: "Display the event overview section",
    __title: "Title",
    __paragraphs: "Paragraphs",
    __image: "Image"
  },
  vi: {
    __eventOverview: "Khối Tổng Quan Sự Kiện",
    __eventOverviewDesc: "Hiển thị phần tổng quan sự kiện",
    __title: "Tiêu Đề",
    __paragraphs: "Đoạn Văn",
    __image: "Hình Ảnh"
  }
};

const VvsNicEventOverview: WidgetType = {
  key: "VvsNicEventOverview",
  name: "__eventOverview",
  icon: "info",
  category: WidgetTypeCategory.General,
  desc: "__eventOverviewDesc",
  props: [
    { key: "title", name: "__title", inputType: WidgetPropInput.Text, category: WidgetPropCategory.Content, required: true },
    {
      key: "paragraphs",
      name: "__paragraphs",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
      props: [
        { key: "text", name: "__paragraphs", inputType: WidgetPropInput.Text, category: WidgetPropCategory.Content, required: true }
      ]
    },
    { key: "image", name: "__image", inputType: WidgetPropInput.Image, category: WidgetPropCategory.Content, required: true }
  ],
  defaultProps: JSON.stringify({
    title: "Event overview",
    paragraphs: [
      { text: "Vietnam Innovation and Private Capital Summit 2025 (VIPC Summit 2025) is an evolution of the Vietnam Venture Summit, first launched by the Ministry of Planning and Investment in 2019. Over four successful editions, the summit has connected nearly 10,000 participants from over 20 countries, including 170+ renowned speakers, top venture capital firms, and private equity investors. The 2025 edition aims to further enhance Vietnam’s position as a key destination for private capital investment in innovation." },
      { text: "Bringing together major international funds, financial institutions, and stock exchange representatives (NASDAQ, NYSE), the summit will explore investment trends, opportunities, and challenges in Vietnam’s private capital market. VIPC Summit 2025 will focus on pioneering sectors such as AI, semiconductors, green tech, and digital transformation, strengthening collaboration between the government, businesses, and investors. By fostering a sustainable financial ecosystem, the summit will drive innovation, accelerate commercialization, and support Vietnam’s vision for rapid and sustainable economic growth." }
    ],
    image: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vvs-nic/event-overview.jpg"
  }),
  translations
};

export default VvsNicEventOverview;