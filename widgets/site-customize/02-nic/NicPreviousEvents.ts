import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __nicPreviousEvents: "Previous Events (NIC)",
    __previousEventsDesc: "Display a grid of previous event images",
    __title: "Title",
    __subtitle: "Subtitle",
    __backgroundImage: "Background Image",
    __events: "Events",
    __eventImage: "Event Image",
    __eventLink: "Event Link"
  },
  vi: {
    __nicPreviousEvents: "Sự kiện trước đây (NIC)",
    __previousEventsDesc: "Hiển thị lưới hình ảnh các sự kiện trước đây",
    __title: "Tiêu đề",
    __subtitle: "Tiêu đề phụ",
    __backgroundImage: "Hình nền",
    __events: "Các sự kiện",
    __eventImage: "Hình ảnh sự kiện",
    __eventLink: "Liên kết sự kiện"
  }
};

const PreviousEvents: WidgetType = {
  key: "NicPreviousEvents",
  name: "__nicPreviousEvents",
  icon: "event",
  category: WidgetTypeCategory.Content,
  desc: "__previousEventsDesc",
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
      key: "backgroundImage",
      name: "__backgroundImage",
      inputType: WidgetPropInput.Image,
      category: WidgetPropCategory.Style,
      required: false
    },
    {
      key: "events",
      name: "__events",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
      props: [
        {
          key: "image",
          name: "__eventImage",
          inputType: WidgetPropInput.Image,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "link",
          name: "__eventLink",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: false
        }
      ]
    }
  ],
  defaultProps: JSON.stringify({
    title: "Previous events",
    subtitle: "An event that unites the entire private capital industry in Viet Nam",
    events: [
      {
        image: "upload/sites/vvs-nic/event-thumb_1.jpg",
        link: "#"
      },
      {
        image: "upload/sites/vvs-nic/event-thumb_2.jpg",
        link: "#"
      },
      {
        image: "upload/sites/vvs-nic/event-thumb_3.jpg",
        link: "#"
      },
      {
        image: "upload/sites/vvs-nic/event-thumb_4.jpg",
        link: "#"
      },
      {
        image: "upload/sites/vvs-nic/event-thumb_5.jpg",
        link: "#"
      }
    ]
  }),
  translations: translations,
};

export default PreviousEvents;
