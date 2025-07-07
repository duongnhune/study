import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __timeLocation: "Time & Location",
    __timeLocationDesc: "Display event time and location with map",
    __titleText: "Title Text",
    __subtitleText: "Subtitle Text",
    __centerTitle: "Center Title",
    __showTitleUnderline: "Show Title Underline",
    __dateLabel: "Date Label",
    __timeLabel: "Time Label",
    __locationLabel: "Location Label",
    __timeLocations: "Time & Locations",
    __timeLocationId: "ID",
    __timeLocationDate: "Date",
    __timeLocationTime: "Time",
    __timeLocationLocation: "Location",
    __timeLocationDescription: "Description",
    __mapIframeHtml: "Map Embed HTML (iframe)",
    __backgroundColor: "Background Color",
    __backgroundImage: "Background Image"
  },
  vi: {
    __timeLocation: "Thời gian & Địa điểm",
    __timeLocationDesc: "Hiển thị thời gian và địa điểm sự kiện với bản đồ",
    __titleText: "Văn bản tiêu đề",
    __subtitleText: "Văn bản phụ đề",
    __centerTitle: "Tiêu đề trung tâm",
    __showTitleUnderline: "Hiển thị gạch chân tiêu đề",
    __dateLabel: "Nhãn ngày",
    __timeLabel: "Nhãn thời gian",
    __locationLabel: "Nhãn địa điểm",
    __timeLocations: "Thời gian & Địa điểm",
    __timeLocationId: "ID",
    __timeLocationDate: "Ngày",
    __timeLocationTime: "Thời gian",
    __timeLocationLocation: "Địa điểm",
    __timeLocationDescription: "Mô tả",
    __mapIframeHtml: "HTML nhúng bản đồ (iframe)",
    __backgroundColor: "Màu nền",
    __backgroundImage: "Hình nền"
  }
};

const TimeLocation: WidgetType = {
  key: "TimeLocation",
  name: "__timeLocation",
  icon: "schedule",
  category: WidgetTypeCategory.Location,
  desc: "__timeLocationDesc",
  props: [
    {
      key: "titleText",
      name: "__titleText",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "subtitleText",
      name: "__subtitleText",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "centerTitle",
      name: "__centerTitle",
      inputType: WidgetPropInput.Switch,
      category: WidgetPropCategory.Style,
      required: false
    },
    {
      key: "showTitleUnderline",
      name: "__showTitleUnderline",
      inputType: WidgetPropInput.Switch,
      category: WidgetPropCategory.Style,
      required: false
    },
    {
      key: "dateLabel",
      name: "__dateLabel",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "timeLabel",
      name: "__timeLabel",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "locationLabel",
      name: "__locationLabel",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "timeLocations",
      name: "__timeLocations",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
      props: [
        {
          key: "id",
          name: "__timeLocationId",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "date",
          name: "__timeLocationDate",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "time",
          name: "__timeLocationTime",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "location",
          name: "__timeLocationLocation",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "description",
          name: "__timeLocationDescription",
          inputType: WidgetPropInput.Textarea,
          category: WidgetPropCategory.Content,
          required: false
        }
      ]
    },
    {
      key: "mapIframeHtml",
      name: "__mapIframeHtml",
      inputType: WidgetPropInput.Textarea,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "backgroundColor",
      name: "__backgroundColor",
      inputType: WidgetPropInput.Color,
      category: WidgetPropCategory.Style,
      required: false
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
    titleText: "Time & Location",
    subtitleText: "",
    centerTitle: true,
    showTitleUnderline: true,
    dateLabel: "Date",
    timeLabel: "Vietnam Time",
    locationLabel: "Location",
    timeLocations: [
      {
        id: "timeLocation1",
        date: "Jan 12, 2025",
        time: "8:30 - 17:00",
        location: "Vietnam National Innovation Center - Hoa Lac",
        description: ""
      }
    ],
    mapIframeHtml: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125423.51942465708!2d106.70243839999999!3d10.774118399999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317525ce3182fe9f%3A0xf24844a274b7ab7d!2zS2h1IHZ1aSBjaMahaSBUdXnhur90IFNub3cgVG93biBTw6BpIEfDsm4!5e0!3m2!1svi!2s!4v1744950201277!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    backgroundColor: "",
    backgroundImage: ""
  }),
  translations: translations,
};

export default TimeLocation;
