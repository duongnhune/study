import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __nicGrowthStats: "Growth Statistics (NIC)",
    __growthStatsDesc: "Display key statistics and growth metrics with icons",
    __statsList: "Statistics List",
    __statIcon: "Statistic Icon",
    __statValue: "Statistic Value",
    __statDescription: "Statistic Description"
  },
  vi: {
    __nicGrowthStats: "Thống kê tăng trưởng (NIC)",
    __growthStatsDesc: "Hiển thị các số liệu thống kê và chỉ số tăng trưởng quan trọng với biểu tượng",
    __statsList: "Danh sách thống kê",
    __statIcon: "Biểu tượng thống kê",
    __statValue: "Giá trị thống kê",
    __statDescription: "Mô tả thống kê"
  }
};

const GrowthStats: WidgetType = {
  key: "NicGrowthStats",
  name: "__nicGrowthStats",
  icon: "trending_up",
  category: WidgetTypeCategory.Content,
  desc: "__growthStatsDesc",
  props: [
    {
      key: "stats",
      name: "__statsList",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
      props: [
        {
          key: "icon",
          name: "__statIcon",
          inputType: WidgetPropInput.Image,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "value",
          name: "__statValue",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "description",
          name: "__statDescription",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        }
      ]
    }
  ],
  defaultProps: JSON.stringify({
    stats: [
      {
        icon: "upload/sites/vvs-nic/growup_1.svg",
        value: "10,000",
        description: "Participants from over 20 countries"
      },
      {
        icon: "upload/sites/vvs-nic/growup_2.svg",
        value: "170+",
        description: "Renowned speakers, top venture capital firms, and private equity investors"
      }
    ]
  }),
  translations: translations,
};

export default GrowthStats;
