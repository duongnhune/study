import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __eventStats: "Event Statistics",
    __eventStatsDesc: "Display key event statistics and metrics",
    __title: "Section Title",
    __subtitle: "Section Subtitle",
    __centerTitle: "Center Title",
    __showTitleUnderline: "Show Title Underline",
    __stats: "Statistics",
    __statId: "Statistic ID",
    __statValue: "Value",
    __statLabel: "Label",
    __statIcon: "Icon (Material Symbol)",
    __valueColor: "Value Color",
    __labelColor: "Label Color",
    __hideStatDividers: "Hide Dividers Between Stats",
    __backgroundColor: "Background Color",
    __backgroundImage: "Background Image"
  },
  vi: {
    __eventStats: "Thống kê sự kiện",
    __eventStatsDesc: "Hiển thị các số liệu thống kê và chỉ số quan trọng của sự kiện",
    __title: "Tiêu đề phần",
    __subtitle: "Phụ đề phần",
    __centerTitle: "Căn giữa tiêu đề",
    __showTitleUnderline: "Hiển thị gạch chân tiêu đề",
    __stats: "Số liệu thống kê",
    __statId: "ID thống kê",
    __statValue: "Giá trị",
    __statLabel: "Nhãn",
    __statIcon: "Biểu tượng (Material Symbol)",
    __valueColor: "Màu giá trị",
    __labelColor: "Màu nhãn",
    __hideStatDividers: "Ẩn đường phân cách giữa các số liệu",
    __backgroundColor: "Màu nền",
    __backgroundImage: "Hình nền"
  }
};

const EventStats: WidgetType = {
  key: "EventStats",
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
        {
          key: "icon",
          name: "__statIcon",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: false
        }
      ]
    },
    {
      key: "valueColor",
      name: "__valueColor",
      inputType: WidgetPropInput.Color,
      category: WidgetPropCategory.Style,
      required: false
    },
    {
      key: "labelColor",
      name: "__labelColor",
      inputType: WidgetPropInput.Color,
      category: WidgetPropCategory.Style,
      required: false
    },
    {
      key: "hideStatDividers",
      name: "__hideStatDividers",
      inputType: WidgetPropInput.Switch,
      category: WidgetPropCategory.Style,
      required: false
    },
    {
      key: "backgroundColor",
      name: "__background_color",
      inputType: WidgetPropInput.Color,
      category: WidgetPropCategory.Style,
      required: false
    },
    {
      key: "textColor",
      name: "__text_color",
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
    titleText: "Event Statistics",
    subtitleText: "",
    centerTitle: true,
    showTitleUnderline: true,
    stats: [
      {
        label: "Participants from over 20 countries",
        value: "10,000",
        icon: ""
      },
      {
        label: "Renowned speakers, top venture capital firms, and private equity investors",
        value: "170+",
        icon: ""
      },
      {
        label: "Sessions and workshops across 3 days",
        value: "50+",
        icon: ""
      },
      {
        label: "Sponsoring companies and organizations",
        value: "25",
        icon: ""
      }
    ],
    valueColor: '',
    labelColor: "",
    hideStatDividers: false,
    backgroundColor: "",
    backgroundImage: ""
  }),
  translations: translations,
};

export default EventStats;
