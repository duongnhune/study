import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __partnerSlider: "Partner Slider",
    __partnerSliderDesc: "Display a partner logo slider",
    __partners: "Partners",
    __partnerImage: "Partner image",
    __partnerTitle: "Partner title",
    __partnerAlt: "Partner alt text",
    __items: "Items per view",
    __margin: "Space between items",
    __loop: "Loop",
    __autoplay: "Autoplay",
    __autoplayHoverPause: "Pause on Hover",
    __autoplayTimeout: "Autoplay Timeout (ms)",
    __lazyLoad: "Lazy Load",
    __responsive: "Responsive Breakpoints"
  },
  vi: {
    __partnerSlider: "Thanh trượt đối tác",
    __partnerSliderDesc: "Hiển thị thanh trượt logo đối tác",
    __partners: "Đối tác",
    __partnerImage: "Hình ảnh đối tác",
    __partnerTitle: "Tên đối tác",
    __partnerAlt: "Văn bản thay thế",
    __items: "Số mục hiển thị",
    __margin: "Khoảng cách giữa các mục",
    __loop: "Lặp lại",
    __autoplay: "Tự động phát",
    __autoplayHoverPause: "Tạm dừng khi di chuột",
    __autoplayTimeout: "Thời gian tự động phát (ms)",
    __lazyLoad: "Tải lười",
    __responsive: "Điểm ngắt responsive"
  }
};

const PartnerSlider: WidgetType = {
  key: "Vietverse2Partner",
  name: "__partnerSlider",
  icon: "view_carousel",
  category: WidgetTypeCategory.Gallery,
  desc: "__partnerSliderDesc",
  props: [
    {
      key: "partners",
      name: "__partners",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
      isDefaultCollapse: false,
      props: [
        {
          key: "title",
          name: "__partnerTitle",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "image",
          name: "__partnerImage",
          inputType: WidgetPropInput.Image,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "alt",
          name: "__partnerAlt",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        }
      ]
    },
    {
      key: "items",
      name: "__items",
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
      key: "autoplayTimeout",
      name: "__autoplayTimeout",
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
  ],
  defaultProps: JSON.stringify({
    partners: [
      {
        image: 'https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vietverse-2/partner_1.png',
        title: 'Partner 1',
        alt: 'Partner 1'
      },
      {
        image: 'https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vietverse-2/partner_2.png',
        title: 'Partner 2',
        alt: 'Partner 2'
      },
      {
        image: 'https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vietverse-2/partner_3.png',
        title: 'Partner 3',
        alt: 'Partner 3'
      },
      {
        image: 'https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vietverse-2/partner_4.png',
        title: 'Partner 4',
        alt: 'Partner 4'
      },
      {
        image: 'https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vietverse-2/partner_5.png',
        title: 'Partner 5',
        alt: 'Partner 5'
      }
    ],
    items: 3,
    margin: 12,
    loop: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 6000,
    lazyLoad: true,
  }),
  translations: translations,
};

export default PartnerSlider; 