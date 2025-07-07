import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __speakers: "Speakers",
    __speakersDesc: "Display the speakers section",
    __title: "Title",
    __desc: "Description",
    __speakersList: "Speakers",
    __speakerName: "Name",
    __speakerRole: "Role",
    __speakerImage: "Image"
  },
  vi: {
    __speakers: "Khối Diễn Giả",
    __speakersDesc: "Hiển thị phần diễn giả",
    __title: "Tiêu Đề",
    __desc: "Mô Tả",
    __speakersList: "Diễn Giả",
    __speakerName: "Tên",
    __speakerRole: "Vai Trò",
    __speakerImage: "Hình Ảnh"
  }
};

const VvsNicSpeakers: WidgetType = {
  key: "VvsNicSpeakers",
  name: "__speakers",
  icon: "groups",
  category: WidgetTypeCategory.General,
  desc: "__speakersDesc",
  props: [
    { key: "title", name: "__title", inputType: WidgetPropInput.Text, category: WidgetPropCategory.Content, required: true },
    { key: "desc", name: "__desc", inputType: WidgetPropInput.Text, category: WidgetPropCategory.Content, required: false },
    {
      key: "speakers",
      name: "__speakersList",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
      props: [
        { key: "name", name: "__speakerName", inputType: WidgetPropInput.Text, category: WidgetPropCategory.Content, required: true },
        { key: "role", name: "__speakerRole", inputType: WidgetPropInput.Text, category: WidgetPropCategory.Content, required: false },
        { key: "image", name: "__speakerImage", inputType: WidgetPropInput.Image, category: WidgetPropCategory.Content, required: true }
      ]
    }
  ],
  defaultProps: JSON.stringify({
    title: "Meet our speakers",
    desc: "Get to know our team members and find out who they are.",
    speakers: [
      { name: "Thomas Lanyi (Dr.)", role: "Managing Partner and Head of Southeast Asia", image: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vvs-nic/speaker_1.jpg" }
    ]
  }),
  translations
};

export default VvsNicSpeakers;