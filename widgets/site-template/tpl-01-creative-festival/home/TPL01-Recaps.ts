import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __recaps: "Recaps",
    __recapsDesc: "Display event recaps and photo gallery",
    __titleText: "Title Text",
    __subtitleText: "Subtitle Text",
    __recapId: "ID",
    __recapImageUrl: "Image URL",
    __recapTitle: "Title",
    __recapDescription: "Description",
    __backgroundImage: "Background Image"
  },
  vi: {
    __recaps: "Tổng kết",
    __recapsDesc: "Hiển thị tổng kết sự kiện và thư viện ảnh",
    __titleText: "Văn bản tiêu đề",
    __subtitleText: "Văn bản phụ đề",
    __recapId: "ID",
    __recapImageUrl: "URL Hình ảnh",
    __recapTitle: "Tiêu đề",
    __recapDescription: "Mô tả",
    __backgroundImage: "Hình nền"
  }
};

const Recaps: WidgetType = {
  key: "TPL01-Recaps",
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
        imageUrl: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/templates/template_1/recap_1.jpg",
        title: "Opening Celebration",
        description: "Attendees celebrating the start of our event with confetti"
      },
      {
        id: "recap2",
        imageUrl: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/templates/template_1/recap_2.jpg",
        title: "Networking Session",
        description: "Participants connecting and sharing ideas"
      },
      {
        id: "recap3",
        imageUrl: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/templates/template_1/recap_3.jpg",
        title: "Workshop",
        description: "Hands-on learning experience"
      },
      {
        id: "recap4",
        imageUrl: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/templates/template_1/recap_4.jpg",
        title: "Panel Discussion",
        description: "Industry experts discussing future trends"
      },
      {
        id: "recap5",
        imageUrl: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/templates/template_1/recap_5.jpg",
        title: "Awards Ceremony",
        description: "Recognizing outstanding achievements"
      },
      {
        id: "recap6",
        imageUrl: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/templates/template_1/recap_6.jpg",
        title: "Closing Keynote",
        description: "Final insights and takeaways from our speakers"
      }
    ],
    backgroundImage: ""
  }),
  translations: translations,
};

export default Recaps;
