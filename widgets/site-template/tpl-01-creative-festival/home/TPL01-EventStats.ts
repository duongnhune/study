import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __eventStats: "Event Statistics",
    __eventStatsDesc: "Display key event statistics and metrics",
    __title: "Section Title",
    __subtitle: "Section Subtitle",
    __stats: "Statistics",
    __statValue: "Value",
    __statLabel: "Label",
    __backgroundColor: "Background Color",
    __backgroundImage: "Background Image"
  },
  vi: {
    __eventStats: "Thống kê sự kiện",
    __eventStatsDesc: "Hiển thị các số liệu thống kê và chỉ số quan trọng của sự kiện",
    __title: "Tiêu đề phần",
    __subtitle: "Phụ đề phần",
    __stats: "Số liệu thống kê",
    __statValue: "Giá trị",
    __statLabel: "Nhãn",
    __backgroundColor: "Màu nền",
    __backgroundImage: "Hình nền"
  }
};

const TPL01EventStats: WidgetType = {
  key: "TPL01-EventStats",
  name: "__eventStats",
  icon: "analytics",
  category: WidgetTypeCategory.General,
  desc: "__eventStatsDesc",
  props: [
    {
      key: "titleText",
      name: "__title",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "subtitleText",
      name: "__subtitle",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "backgroundImage",
      name: "__backgroundImage",
      inputType: WidgetPropInput.Image,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "stats",
      name: "__stats",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
      props: [
        {
          key: "value",
          name: "__statValue",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "label",
          name: "__statLabel",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
      ]
    },
  ],
  defaultProps: JSON.stringify({
    titleText: "",
    subtitleText: "",
    stats: [
      {
        value: "10,000",
        label: "Participants from over 20 countries",
      },
      {
        value: "170+",
        label: "Renowned speakers, top venture capital firms, and private equity investors",
      },
      {
        value: "50+",
        label: "Sessions and workshops across 3 days",
      },
      {
        value: "25",
        label: "Sponsoring companies and organizations",
      }
    ],
    backgroundImage: ""
  }),
  translations: translations,
};

export default TPL01EventStats;
