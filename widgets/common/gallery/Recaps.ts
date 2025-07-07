import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __recaps: "Recaps",
    __recapsDesc: "Display event recaps and photo gallery",
    __titleText: "Title Text",
    __subtitleText: "Subtitle Text",
    __centerTitle: "Center Title",
    __showTitleUnderline: "Show Title Underline",
    __recapId: "ID",
    __recapImageUrl: "Image URL",
    __recapTitle: "Title",
    __recapDescription: "Description",
    __showOverlay: "Show Text Overlay",
    __enableLightbox: "Enable Lightbox",
    __backgroundColor: "Background Color",
    __backgroundImage: "Background Image"
  },
  vi: {
    __recaps: "Tổng kết",
    __recapsDesc: "Hiển thị tổng kết sự kiện và thư viện ảnh",
    __titleText: "Văn bản tiêu đề",
    __subtitleText: "Văn bản phụ đề",
    __centerTitle: "Tiêu đề trung tâm",
    __showTitleUnderline: "Hiển thị gạch chân tiêu đề",
    __recapId: "ID",
    __recapImageUrl: "URL Hình ảnh",
    __recapTitle: "Tiêu đề",
    __recapDescription: "Mô tả",
    __showOverlay: "Hiển thị lớp phủ văn bản",
    __enableLightbox: "Bật Lightbox",
    __backgroundColor: "Màu nền",
    __backgroundImage: "Hình nền"
  }
};

const Recaps: WidgetType = {
  key: "Recaps",
  name: "__recaps",
  icon: "photo_library",
  category: WidgetTypeCategory.Gallery,
  desc: "__recapsDesc",
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
      key: "recaps",
      name: "__recaps",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
      props: [
        {
          key: "id",
          name: "__recapId",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "imageUrl",
          name: "__recapImageUrl",
          inputType: WidgetPropInput.Image,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "title",
          name: "__recapTitle",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: false
        },
        {
          key: "description",
          name: "__recapDescription",
          inputType: WidgetPropInput.Textarea,
          category: WidgetPropCategory.Content,
          required: false
        }
      ]
    },
    {
      key: "showOverlay",
      name: "__showOverlay",
      inputType: WidgetPropInput.Switch,
      category: WidgetPropCategory.Style,
      required: false
    },
    {
      key: "enableLightbox",
      name: "__enableLightbox",
      inputType: WidgetPropInput.Switch,
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
    titleText: "Recaps",
    subtitleText: "",
    centerTitle: true,
    showTitleUnderline: true,
    recaps: [
      {
        id: "recap1",
        imageUrl: "upload/templates/template_1/recap_1.jpg",
        title: "Opening Celebration",
        description: "Attendees celebrating the start of our event with confetti"
      },
      {
        id: "recap2",
        imageUrl: "upload/templates/template_1/recap_2.jpg",
        title: "Networking Session",
        description: "Participants connecting and sharing ideas"
      },
      {
        id: "recap3",
        imageUrl: "upload/templates/template_1/recap_3.jpg",
        title: "Workshop",
        description: "Hands-on learning experience"
      },
      {
        id: "recap4",
        imageUrl: "upload/templates/template_1/recap_4.jpg",
        title: "Panel Discussion",
        description: "Industry experts discussing future trends"
      },
      {
        id: "recap5",
        imageUrl: "upload/templates/template_1/recap_5.jpg",
        title: "Awards Ceremony",
        description: "Recognizing outstanding achievements"
      },
      {
        id: "recap6",
        imageUrl: "upload/templates/template_1/recap_6.jpg",
        title: "Closing Keynote",
        description: "Final insights and takeaways from our speakers"
      }
    ],
    showOverlay: true,
    enableLightbox: true,
    backgroundColor: "",
    backgroundImage: ""
  }),
  translations: translations,
};

export default Recaps;
