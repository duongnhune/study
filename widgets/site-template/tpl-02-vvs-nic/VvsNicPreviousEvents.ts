import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __previousEvents: "Previous Events",
    __previousEventsDesc: "Display the previous events section with title and event items",
    __title: "Title",
    __desc: "Description",
    __eventsList: "Events",
    __eventImage: "Event Image",
    __eventLink: "Event Link"
  },
  vi: {
    __previousEvents: "Khối Sự Kiện Trước",
    __previousEventsDesc: "Hiển thị phần sự kiện trước với tiêu đề và các mục sự kiện",
    __title: "Tiêu Đề",
    __desc: "Mô Tả",
    __eventsList: "Sự Kiện",
    __eventImage: "Hình Ảnh Sự Kiện",
    __eventLink: "Liên Kết Sự Kiện"
  }
};

const VvsNicPreviousEvents: WidgetType = {
  key: "VvsNicPreviousEvents",
  name: "__previousEvents",
  icon: "event_repeat",
  category: WidgetTypeCategory.General,
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
      key: "desc",
      name: "__desc",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "events",
      name: "__eventsList",
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
    desc: "An event that unites the entire private capital industry in Viet Nam",
    events: [
      {
        image: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vvs-nic/event-thumb_1.jpg",
        link: "#"
      },
      {
        image: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vvs-nic/event-thumb_2.jpg",
        link: "#"
      },
      {
        image: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vvs-nic/event-thumb_3.jpg",
        link: "#"
      },
      {
        image: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vvs-nic/event-thumb_4.jpg",
        link: "#"
      },
      {
        image: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vvs-nic/event-thumb_5.jpg",
        link: "#"
      }
    ]
  }),
  translations: translations,
};

export default VvsNicPreviousEvents;