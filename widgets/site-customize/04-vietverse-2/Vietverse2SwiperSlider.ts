import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __swiperSlider: "Cover Gallery",
    __swiperSliderDesc: "Display a coverflow gallery slider",
    __slides: "Slides",
    __slideImage: "Slide image",
    __slideTitle: "Slide title",
    __slideAlt: "Slide alt text",
    __spaceBetween: "Space between slides",
    __slidesPerView: "Slides per view",
    __loop: "Loop",
    __autoplay: "Autoplay",
    __autoplayHoverPause: "Pause on Hover",
    __autoplayDelay: "Autoplay Delay (ms)",
    __lazyLoad: "Lazy Load",
    __grabCursor: "Grab Cursor",
    __centeredSlides: "Center Slides",
    __effect: "Effect",
    __breakpoints: "Breakpoints",
    __slideLink: "Slide Link"
  },
  vi: {
    __swiperSlider: "Thư viện ảnh",
    __swiperSliderDesc: "Hiển thị thanh trượt thư viện ảnh kiểu coverflow",
    __slides: "Danh sách ảnh",
    __slideImage: "Hình ảnh",
    __slideTitle: "Tiêu đề",
    __slideAlt: "Văn bản thay thế",
    __spaceBetween: "Khoảng cách giữa các ảnh",
    __slidesPerView: "Số ảnh hiển thị",
    __loop: "Lặp lại",
    __autoplay: "Tự động phát",
    __autoplayHoverPause: "Tạm dừng khi di chuột",
    __autoplayDelay: "Độ trễ tự động phát (ms)",
    __lazyLoad: "Tải lười",
    __grabCursor: "Con trỏ nắm",
    __centeredSlides: "Căn giữa ảnh",
    __effect: "Hiệu ứng",
    __breakpoints: "Điểm ngắt",
    __slideLink: "Liên kết"
  }
};

const SwiperSlider: WidgetType = {
  key: "Vietverse2SwiperSlider",
  name: "__swiperSlider",
  icon: "view_carousel",
  category: WidgetTypeCategory.Gallery,
  desc: "__swiperSliderDesc",
  props: [
    {
      key: "slides",
      name: "__slides",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
      isDefaultCollapse: false,
      props: [
        {
          key: "title",
          name: "__slideTitle",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "image",
          name: "__slideImage",
          inputType: WidgetPropInput.Image,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "link",
          name: "__slideLink",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: false
        },
        {
          key: "alt",
          name: "__slideAlt",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        }
      ]
    },
    {
      key: "spaceBetween",
      name: "__spaceBetween",
      inputType: WidgetPropInput.Number,
      category: WidgetPropCategory.Layout,
      required: false
    },
    {
      key: "slidesPerView",
      name: "__slidesPerView",
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
      key: "autoplay",
      name: "__autoplay",
      inputType: WidgetPropInput.Switch,
      category: WidgetPropCategory.Layout,
      required: false
    },
    {
      key: "autoplayHoverPause",
      name: "__autoplayHoverPause",
      inputType: WidgetPropInput.Switch,
      category: WidgetPropCategory.Layout,
      required: false
    },
    {
      key: "autoplayDelay",
      name: "__autoplayDelay",
      inputType: WidgetPropInput.Number,
      category: WidgetPropCategory.Advance,
      required: false
    },
    {
      key: "lazyLoad",
      name: "__lazyLoad",
      inputType: WidgetPropInput.Switch,
      category: WidgetPropCategory.Advance,
      required: false
    },
    {
      key: "grabCursor",
      name: "__grabCursor",
      inputType: WidgetPropInput.Switch,
      category: WidgetPropCategory.Advance,
      required: false
    },
    {
      key: "centeredSlides",
      name: "__centeredSlides",
      inputType: WidgetPropInput.Switch,
      category: WidgetPropCategory.Layout,
      required: false
    },
  ],
  defaultProps: JSON.stringify({
    slides: [
      {
        image: 'https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vietverse-2/cover_1.png',
        title: 'Gallery 1',
        alt: 'Gallery 1'
      },
      {
        image: 'https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vietverse-2/cover_1.png',
        title: 'Gallery 2',
        alt: 'Gallery 2'
      },
      {
        image: 'https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vietverse-2/cover_1.png',
        title: 'Gallery 3',
        alt: 'Gallery 3'
      },
      {
        image: 'https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vietverse-2/cover_1.png',
        title: 'Gallery 4',
        alt: 'Gallery 4'
      },
      {
        image: 'https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vietverse-2/cover_1.png',
        title: 'Gallery 5',
        alt: 'Gallery 5'
      },
      {
        image: 'https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vietverse-2/cover_1.png',
        title: 'Gallery 6',
        alt: 'Gallery 6'
      },
      {
        image: 'https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vietverse-2/cover_1.png',
        title: 'Gallery 7',
        alt: 'Gallery 7'
      },
      {
        image: 'https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vietverse-2/cover_1.png',
        title: 'Gallery 8',
        alt: 'Gallery 8'
      },
    ],
    spaceBetween: 10,
    slidesPerView: 2,
    loop: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayDelay: 6000,
    lazyLoad: true,
    grabCursor: true,
    centeredSlides: true,
  }),
  translations: translations,
};

export default SwiperSlider; 