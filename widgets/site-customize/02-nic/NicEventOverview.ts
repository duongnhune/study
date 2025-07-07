import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __nicEventOverview: "Event Overview (NIC)",
    __eventOverviewDesc: "Display a detailed overview of the event with description and image",
    __title: "Title",
    __paragraphs: "Paragraphs",
    __paragraphText: "Paragraph Text",
    __overviewImage: "Overview Image"
  },
  vi: {
    __nicEventOverview: "Tổng quan sự kiện (NIC)",
    __eventOverviewDesc: "Hiển thị tổng quan chi tiết về sự kiện với mô tả và hình ảnh",
    __title: "Tiêu đề",
    __paragraphs: "Các đoạn văn",
    __paragraphText: "Nội dung đoạn văn",
    __overviewImage: "Hình ảnh tổng quan"
  }
};

const EventOverview: WidgetType = {
  key: "NicEventOverview",
  name: "__nicEventOverview",
  icon: "event_note",
  category: WidgetTypeCategory.Content,
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
      key: "paragraphs",
      name: "__paragraphs",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
      props: [
        {
          key: "text",
          name: "__paragraphText",
          inputType: WidgetPropInput.Textarea,
          category: WidgetPropCategory.Content,
          required: true
        }
      ]
    },
    {
      key: "overviewImage",
      name: "__overviewImage",
      inputType: WidgetPropInput.Image,
      category: WidgetPropCategory.Content,
      required: false
    }
  ],
  defaultProps: JSON.stringify({
    title: "Event overview",
    paragraphs: [
      {
        text: "Vietnam Innovation and Private Capital Summit 2025 (VIPC Summit 2025) is an evolution of the Vietnam Venture Summit, first launched by the Ministry of Planning and Investment in 2019. Over four successful editions, the summit has connected nearly 10,000 participants from over 20 countries, including 170+ renowned speakers, top venture capital firms, and private equity investors. The 2025 edition aims to further enhance Vietnam's position as a key destination for private capital investment in innovation."
      },
      {
        text: "Bringing together major international funds, financial institutions, and stock exchange representatives (NASDAQ, NYSE), the summit will explore investment trends, opportunities, and challenges in Vietnam's private capital market. VIPC Summit 2025 will focus on pioneering sectors such as AI, semiconductors, green tech, and digital transformation, strengthening collaboration between the government, businesses, and investors. By fostering a sustainable financial ecosystem, the summit will drive innovation, accelerate commercialization, and support Vietnam's vision for rapid and sustainable economic growth."
      }
    ],
    overviewImage: "upload/site/vvs-nic/event-overview.jpg"
  }),
  translations: translations,
};

export default EventOverview;
