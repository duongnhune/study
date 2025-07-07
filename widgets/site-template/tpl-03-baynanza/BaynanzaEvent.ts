import { AccessLevel, WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __events: "Events Block",
    __eventsDesc: "Display the events section with title and event items",
    __title: "Title",
    __backgroundImage: "Background Image",
    __eventsList: "Events",
    __eventTitle: "Event Title",
    __eventDate: "Event Date",
    __eventDescription: "Event Description",
    __eventImage: "Event Image",
    __eventLink: "Event Link",
    __comingSoonItem: "Coming Soon Item"
  },
  vi: {
    __events: "Khối Sự Kiện",
    __eventsDesc: "Hiển thị phần sự kiện với tiêu đề và các mục sự kiện",
    __title: "Tiêu Đề",
    __backgroundImage: "Hình Nền",
    __eventsList: "Sự Kiện",
    __eventTitle: "Tiêu Đề Sự Kiện",
    __eventDate: "Ngày Sự Kiện",
    __eventDescription: "Mô Tả Sự Kiện",
    __eventImage: "Hình Ảnh Sự Kiện",
    __eventLink: "Liên Kết Sự Kiện",
    __comingSoonItem: "Sự Kiện Sắp Ra Mắt"
  }
};

const Events: WidgetType = {
  key: "BaynanzaEvent",
  name: "__events",
  icon: "event",
  category: WidgetTypeCategory.General,
  accessLevel: AccessLevel.Public,
  desc: "__eventsDesc",
  props: [
    {
      key: "backgroundImage",
      name: "__backgroundImage",
      inputType: WidgetPropInput.Image,
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
  defaultProps: JSON.stringify({
    backgroundImage: "https://breezing-storage-staging.s3.ap-southeast-1.amazonaws.com/67b36a7ea1b0baf4873ad871/upload/c902d78ebff877d2e2c6e03b1b9cc025.jpg",
    buttonText: "View More",
    buttonLink: "/event-detail/seacret-society-1", 
  }),
  translations: translations,
};

export default Events; 