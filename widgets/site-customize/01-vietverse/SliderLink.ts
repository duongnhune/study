import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __sliderLink: "Slider Link",
    __sliderLinkDesc: "Slider Link Description",
    __beforeText: "Before Text",
    __titleText: "Title Text",
    __description: "Description",
    __items: "Items",
    __index: "Index",
    __image: "Image",
    __title: "Title"
  },
  vi: {
    __sliderLink: "Slider Link",
    __sliderLinkDesc: "Mô tả Slider Link",
    __beforeText: "Văn bản trước",
    __titleText: "Tiêu đề",
    __description: "Mô tả",
    __items: "Các mục",
    __index: "Số thứ tự",
    __image: "Hình ảnh",
    __title: "Tiêu đề"
  }
};

const SliderLink: WidgetType = {
  key: "SliderLink",
  name: "__sliderLink",
  icon: "trackpad_input_2",
  category: WidgetTypeCategory.Content,
  desc: "__sliderLinkDesc",
  props: [
    {
      key: "beforeText",
      name: "__beforeText",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "titleText",
      name: "__titleText",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "description",
      name: "__description",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "items",
      name: "__items",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
      props: [
        {
          key: "index",
          name: "__index",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "image",
          name: "__image",
          inputType: WidgetPropInput.Image,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "title",
          name: "__title",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        }
      ]
    },
  ],
  defaultProps: JSON.stringify({
    beforeText: "Our",
    titleText: "Solution",
    description: "Provides advanced digital tools for audience insight and remote commercial management",
    items: [
      {
        index: "[1]",
        image: "https://breezing-storage-staging.s3.ap-southeast-1.amazonaws.com/files/ad756f9d7887f909a8d8cb6fe5696208.jpg",
        title: "Title 1"
      }
    ]
  }),
  translations: translations,
};

export default SliderLink;
