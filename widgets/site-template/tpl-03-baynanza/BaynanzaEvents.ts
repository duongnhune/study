import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

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
  key: "BaynanzaEvents",
  name: "__events",
  icon: "event",
  category: WidgetTypeCategory.General,
  desc: "__eventsDesc",
  props: [
    {
      key: "title",
      name: "__title",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "backgroundImage",
      name: "__backgroundImage",
      inputType: WidgetPropInput.Image,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "comingSoonItem",
      name: "__comingSoonItem",
      inputType: WidgetPropInput.Number,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "events",
      name: "__eventsList",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
      props: [
        {
          key: "title",
          name: "__eventTitle",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "date",
          name: "__eventDate",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "description",
          name: "__eventDescription",
          inputType: WidgetPropInput.Textarea,
          category: WidgetPropCategory.Content,
          required: true
        },
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
    title: "TAKE A LOOK AT OUR EVENTS",
    backgroundImage: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/baynanza/baynanza-block-album.jpg",
    comingSoonItem: 8,
    events: [
      {
        title: "SEACRET SOCIETY",
        date: "June 14, 2025",
        description: "Is a unique, immersive experience designed to ignite creativity and celebration. It's a space where artists can connect with fans and like-minded individuals, sharing unforgettable moments in a vibrant and exclusive atmosphere",
        image: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/baynanza/baynanza-album_1.jpg",
        link: "#"
      },
      {
        title: "SEACRET SOCIETY",
        date: "June 14, 2025",
        description: "Is a unique, immersive experience designed to ignite creativity and celebration. It's a space where artists can connect with fans and like-minded individuals, sharing unforgettable moments in a vibrant and exclusive atmosphere",
        image: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/baynanza/baynanza-album_1.jpg",
        link: "#"
      }
    ]
  }),
  translations: translations,
};

export default Events; 