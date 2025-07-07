import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __name: "Time & Location",
    __desc: "Display event time and location with map",
    __title_text: "Title Text",
    __subtitle_text: "Subtitle Text",
    __date_label: "Date Label",
    __time_label: "Time Label",
    __location_label: "Location Label",
    __time_locations: "Time & Locations",
    __time_location_id: "ID",
    __time_location_date: "Date",
    __time_location_time: "Time",
    __time_location_location: "Location",
    __time_location_description: "Description",
    __map_iframe_html: "Map Embed HTML (iframe)",
    __background_color: "Background Color",
    __background_image: "Background Image"
  },
  vi: {
    __name: "Thời gian & Địa điểm",
    __desc: "Hiển thị thời gian và địa điểm sự kiện với bản đồ",
    __title_text: "Văn bản tiêu đề",
    __subtitle_text: "Văn bản phụ đề",
    __date_label: "Nhãn ngày",
    __time_label: "Nhãn thời gian",
    __location_label: "Nhãn địa điểm",
    __time_locations: "Thời gian & Địa điểm",
    __time_location_id: "ID",
    __time_location_date: "Ngày",
    __time_location_time: "Thời gian",
    __time_location_location: "Địa điểm",
    __time_location_description: "Mô tả",
    __map_iframe_html: "HTML nhúng bản đồ (iframe)",
    __background_color: "Màu nền",
    __background_image: "Hình nền"
  }
};

const TPL01TimeLocation: WidgetType = {
  key: "TPL01-TimeLocation",
  name: "__name",
  icon: "schedule",
  category: WidgetTypeCategory.Location,
  desc: "__desc",
  props: [
    {
      key: "titleText",
      name: "__title_text",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "subtitleText",
      name: "__subtitle_text",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "dateLabel",
      name: "__date_label",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "timeLabel",
      name: "__time_label",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "locationLabel",
      name: "__location_label",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "timeLocations",
      name: "__time_locations",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
      props: [
        {
          key: "id",
          name: "__time_location_id",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "date",
          name: "__time_location_date",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "time",
          name: "__time_location_time",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "location",
          name: "__time_location_location",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "description",
          name: "__time_location_description",
          inputType: WidgetPropInput.Textarea,
          category: WidgetPropCategory.Content,
          required: false
        }
      ]
    },
    {
      key: "mapIframeHtml",
      name: "__map_iframe_html",
      inputType: WidgetPropInput.Textarea,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "backgroundColor",
      name: "__background_color",
      inputType: WidgetPropInput.Color,
      category: WidgetPropCategory.Style,
      required: false
    },
    {
      key: "backgroundImage",
      name: "__background_image",
      inputType: WidgetPropInput.Image,
      category: WidgetPropCategory.Style,
      required: false
    }
  ],
  defaultProps: JSON.stringify({
    titleText: "Time & Location",
    subtitleText: "",
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
    mapIframeHtml: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501725.41844908835!2d106.36556706426069!3d10.75529286052529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2zVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1748347490276!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    backgroundColor: "#FFFFFF",
    backgroundImage: ""
  }),
  translations: translations,
};

export default TPL01TimeLocation;
