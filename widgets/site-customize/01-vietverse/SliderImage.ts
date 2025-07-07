import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __sliderImage: "Slider Images",
    __sliderImageDesc: "Horizontal slider with multiple images",
    __itemCount: "Number of items",
    __margin: "Space between items",
    __loop: "Loop slides",
    __center: "Center items",
    __nav: "Navigation arrows",
    __dots: "Navigation dots",
    __autoPlay: "Auto play",
    __autoplayTimeout: "Autoplay timeout",
    __autoplaySpeed: "Autoplay speed",
    __title: "Title",
    __items: "Items",
    __image: "Image",
    __src: "Image source"
  },
  vi: {
    __sliderImage: "Trình chiếu hình ảnh",
    __sliderImageDesc: "Trình chiếu nhiều hình ảnh theo chiều ngang",
    __itemCount: "Số lượng item",
    __margin: "Khoảng cách phần tử",
    __loop: "Lặp lại",
    __center: "Căn giữa",
    __nav: "Nút điều khiển",
    __dots: "Nút tròn",
    __autoPlay: "Tự động chạy",
    __autoplayTimeout: "Thời gian nghỉ",
    __autoplaySpeed: "Thời gian chuyển",
    __title: "Tiêu đề",
    __items: "Các mục",
    __image: "Hình ảnh",
    __src: "Nguồn hình ảnh"
  }
};

const SliderImage: WidgetType = {
  key: "SliderImage",
  name: "__sliderImage",
  icon: "swipe_down",
  category: WidgetTypeCategory.Content,
  desc: "__sliderImageDesc",
  props: [
    {
      key: "itemCount",
      name: "__itemCount",
      inputType: WidgetPropInput.Number,
      category: WidgetPropCategory.Layout,
      required: false
    },
    {
      key: "margin",
      name: "__margin",
      inputType: WidgetPropInput.Number,
      category: WidgetPropCategory.Layout,
      required: false
    },
    {
      key: "loop",
      name: "__loop",
      inputType: WidgetPropInput.Switch,
      category: WidgetPropCategory.Layout,
      required: false
    },
    {
      key: "center",
      name: "__center",
      inputType: WidgetPropInput.Switch,
      category: WidgetPropCategory.Layout,
      required: false
    },
    {
      key: "nav",
      name: "__nav",
      inputType: WidgetPropInput.Switch,
      category: WidgetPropCategory.Layout,
      required: false
    },
    {
      key: "dots",
      name: "__dots",
      inputType: WidgetPropInput.Switch,
      category: WidgetPropCategory.Layout,
      required: false
    },
    {
      key: "autoPlay",
      name: "__autoPlay",
      inputType: WidgetPropInput.Switch,
      category: WidgetPropCategory.Layout,
      required: false
    },
    {
      key: "autoplayTimeout",
      name: "__autoplayTimeout",
      inputType: WidgetPropInput.Number,
      category: WidgetPropCategory.Layout,
      required: false
    },
    {
      key: "autoplaySpeed",
      name: "__autoplaySpeed",
      inputType: WidgetPropInput.Number,
      category: WidgetPropCategory.Layout,
      required: false
    },
    {
      key: "title",
      name: "__title",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "items",
      name: "__items",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: false,
      props: [
        {
          key: "src",
          name: "__src",
          inputType: WidgetPropInput.Image,
          category: WidgetPropCategory.Content,
          required: false
        },
        {
          key: "title",
          name: "__title",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: false
        }
      ]
    }
  ],
  defaultProps: JSON.stringify({
    itemCount: 6,
    margin: 16,
    loop: true,
    center: false,
    nav: true,
    dots: false,
    autoPlay: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 800,
    title: "Our Partners",
    items: [
      {
        src: "https://breezing-storage-staging.s3.ap-southeast-1.amazonaws.com/files/ad756f9d7887f909a8d8cb6fe5696208.jpg",
        title: "Partner 1"
      },
      {
        src: "https://breezing-storage-staging.s3.ap-southeast-1.amazonaws.com/files/ad756f9d7887f909a8d8cb6fe5696208.jpg",
        title: "Partner 2"
      },
      {
        src: "https://breezing-storage-staging.s3.ap-southeast-1.amazonaws.com/files/ad756f9d7887f909a8d8cb6fe5696208.jpg",
        title: "Partner 3"
      }
    ]
  }),
  translations: translations,
};

export default SliderImage;
