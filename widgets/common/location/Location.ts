
import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __location: "Location",
    __locationDesc: "Display location information in the footer",
    __title: "Title",
    __locations: "Locations",
    __address: "Address",
    __locationIcon: "Location Icon"
  },
  vi: {
    __location: "Vị trí",
    __locationDesc: "Hiển thị thông tin vị trí ở chân trang",
    __title: "Tiêu đề",
    __locations: "Các địa điểm",
    __address: "Địa chỉ",
    __locationIcon: "Biểu tượng vị trí"
  }
};

const Location: WidgetType = {
  key: "Location",
  name: "__location",
  icon: "location_on",
  category: WidgetTypeCategory.Location,
  desc: "__locationDesc",
  props: [
    {
      key: "title",
      name: "__title",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "locations",
      name: "__locations",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
      props: [
        {
          key: "address",
          name: "__address",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "icon",
          name: "__locationIcon",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: false
        }
      ]
    }
  ],
  defaultProps: JSON.stringify({
    title: "Location",
    locations: [
      {
        address: "6B Hoàng Diệu, Quận Ba Đình, Hà Nội",
        icon: "location_on"
      },
      {
        address: "Tòa nhà NIC, Ngõ 7 Tôn Thất Thuyết, Cầu Giấy, Hà Nội",
        icon: "location_on"
      },
      {
        address: "Khu Công Nghệ Cao Hòa Lạc, Tân Xá, Thạch Thất, Hà Nội",
        icon: "location_on"
      }
    ]
  }),
  translations: translations,
};

export default Location;
