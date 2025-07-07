import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __sponsors: "Sponsors",
    __sponsorsDesc: "Display event sponsors with auto-sliding effect",
    __titleText: "Title Text",
    __subtitleText: "Subtitle Text",
    __centerTitle: "Center Title",
    __showTitleUnderline: "Show Title Underline",
    __sponsorId: "ID",
    __sponsorName: "Name",
    __sponsorImageUrl: "Logo Image",
    __sponsorDescription: "Description",
    __sponsorUrls: "Sponsor URLs",
    __sponsorUrlId: "URL ID",
    __sponsorUrlSponsorId: "Sponsor ID",
    __sponsorUrlUrl: "URL",
    __displayMode: "Display Mode",
    __sponsorSize: "Sponsor Size",
    __autoSlide: "Auto Slide",
    __slideInterval: "Slide Interval (ms)",
    __slideSpeed: "Slide Speed (ms)",
    __slidesToShow: "Slides to Show",
    __backgroundColor: "Background Color",
    __backgroundImage: "Background Image"
  },
  vi: {
    __sponsors: "Nhà tài trợ",
    __sponsorsDesc: "Hiển thị nhà tài trợ sự kiện với hiệu ứng tự động trượt",
    __titleText: "Văn bản tiêu đề",
    __subtitleText: "Văn bản phụ đề",
    __centerTitle: "Tiêu đề trung tâm",
    __showTitleUnderline: "Hiển thị gạch chân tiêu đề",
    __sponsorId: "ID",
    __sponsorName: "Tên",
    __sponsorImageUrl: "Hình ảnh logo",
    __sponsorDescription: "Mô tả",
    __sponsorUrls: "URL nhà tài trợ",
    __sponsorUrlId: "ID URL",
    __sponsorUrlSponsorId: "ID nhà tài trợ",
    __sponsorUrlUrl: "URL",
    __displayMode: "Chế độ hiển thị",
    __sponsorSize: "Kích thước nhà tài trợ",
    __autoSlide: "Tự động trượt",
    __slideInterval: "Khoảng thời gian trượt (ms)",
    __slideSpeed: "Tốc độ trượt (ms)",
    __slidesToShow: "Số lượng hiển thị",
    __backgroundColor: "Màu nền",
    __backgroundImage: "Hình nền"
  }
};

const Sponsors: WidgetType = {
  key: "Sponsors",
  name: "__sponsors",
  icon: "handshake",
  category: WidgetTypeCategory.Gallery,
  desc: "__sponsorsDesc",
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
      key: "sponsors",
      name: "__sponsors",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
      props: [
        {
          key: "id",
          name: "__sponsorId",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "name",
          name: "__sponsorName",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "imageUrl",
          name: "__sponsorImageUrl",
          inputType: WidgetPropInput.Image,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "description",
          name: "__sponsorDescription",
          inputType: WidgetPropInput.Textarea,
          category: WidgetPropCategory.Content,
          required: false
        }
      ]
    },
    {
      key: "sponsorUrls",
      name: "__sponsorUrls",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: false,
      props: [
        {
          key: "id",
          name: "__sponsorUrlId",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "sponsorId",
          name: "__sponsorUrlSponsorId",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "url",
          name: "__sponsorUrlUrl",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        }
      ]
    },
    {
      key: "displayMode",
      name: "__displayMode",
      inputType: WidgetPropInput.Select,
      category: WidgetPropCategory.Style,
      required: false,
      options: [
        { value: "slider", text: "Slider" },
        { value: "grid", text: "Grid" }
      ]
    },
    {
      key: "sponsorSize",
      name: "__sponsorSize",
      inputType: WidgetPropInput.Select,
      category: WidgetPropCategory.Style,
      required: false,
      options: [
        { value: "small", text: "Small" },
        { value: "medium", text: "Medium" },
        { value: "large", text: "Large" }
      ]
    },
    {
      key: "autoSlide",
      name: "__autoSlide",
      inputType: WidgetPropInput.Switch,
      category: WidgetPropCategory.Style,
      required: false
    },
    {
      key: "slideInterval",
      name: "__slideInterval",
      inputType: WidgetPropInput.Number,
      category: WidgetPropCategory.Style,
      required: false
    },
    {
      key: "slideSpeed",
      name: "__slideSpeed",
      inputType: WidgetPropInput.Number,
      category: WidgetPropCategory.Style,
      required: false
    },
    {
      key: "slidesToShow",
      name: "__slidesToShow",
      inputType: WidgetPropInput.Number,
      category: WidgetPropCategory.Style,
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
    titleText: "Our Sponsors",
    subtitleText: "Thanks to our amazing sponsors for making this event possible",
    centerTitle: true,
    showTitleUnderline: true,
    sponsors: [
      {
        id: "sponsor1",
        name: "Acme Corporation",
        imageUrl: 'upload/templates/template_1/sponsor_7.png',
        description: "Global technology leader"
      },
      {
        id: "sponsor2",
        name: "TechCorp",
        imageUrl: 'upload/templates/template_1/sponsor_8.png',
        description: "Innovation partner"
      },
      {
        id: "sponsor3",
        name: "Future Systems",
        imageUrl: 'upload/templates/template_1/sponsor_9.png',
        description: "Digital transformation experts"
      },
      {
        id: "sponsor4",
        name: "Global Solutions",
        imageUrl: 'upload/templates/template_1/sponsor_10.png',
        description: "Enterprise software provider"
      },
      {
        id: "sponsor5",
        name: "Innovate Inc",
        imageUrl: 'upload/templates/template_1/sponsor_11.png',
        description: "Research and development"
      },
      {
        id: "sponsor6",
        name: "Breezing.in",
        imageUrl: 'upload/templates/template_1/logo-breezing.png',
        description: "Cloud infrastructure services"
      }
    ],
    sponsorUrls: [
      {
        id: "url1",
        sponsorId: "sponsor1",
        url: "https://example.com/sponsor1"
      },
      {
        id: "url2",
        sponsorId: "sponsor2",
        url: "https://example.com/sponsor2"
      },
      {
        id: "url3",
        sponsorId: "sponsor3",
        url: "https://example.com/sponsor3"
      },
      {
        id: "url4",
        sponsorId: "sponsor4",
        url: "https://example.com/sponsor4"
      },
      {
        id: "url5",
        sponsorId: "sponsor5",
        url: "https://example.com/sponsor5"
      },
      {
        id: "url6",
        sponsorId: "sponsor6",
        url: "https://example.com/sponsor6"
      }
    ],
    displayMode: "slider",
    sponsorSize: "medium",
    autoSlide: true,
    slideInterval: 3000,
    slideSpeed: 500,
    slidesToShow: 4,
    backgroundColor: "",
    backgroundImage: ""
  }),
  translations: translations,
};

export default Sponsors;
