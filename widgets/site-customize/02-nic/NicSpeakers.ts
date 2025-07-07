import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __nicSpeakers: "Speakers (NIC)",
    __speakersDesc: "Display a grid of speakers or team members",
    __titleText: "Title Text",
    __subtitleText: "Subtitle Text",
    __speakersList: "Speakers",
    __image: "Image",
    __name: "Name",
    __enterprise: "Enterprise",
    __position: "Position",
    __link: "Profile Link"
  },
  vi: {
    __nicSpeakers: "Diễn giả (NIC)",
    __speakersDesc: "Hiển thị lưới các diễn giả hoặc thành viên nhóm",
    __titleText: "Tiêu đề",
    __subtitleText: "Tiêu đề phụ",
    __speakersList: "Danh sách diễn giả",
    __image: "Hình ảnh",
    __name: "Tên",
    __enterprise: "Doanh nghiệp",
    __position: "Chức vụ",
    __link: "Liên kết hồ sơ"
  }
};

const Speakers: WidgetType = {
  key: "NicSpeakers",
  name: "__nicSpeakers",
  icon: "group",
  category: WidgetTypeCategory.Content,
  desc: "__speakersDesc",
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
      key: "speakers",
      name: "__speakersList",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
      props: [
        {
          key: "image",
          name: "__image",
          inputType: WidgetPropInput.Image,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "name",
          name: "__name",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "enterprise",
          name: "__enterprise",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: false
        },
        {
          key: "position",
          name: "__position",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: false
        },
        {
          key: "link",
          name: "__link",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: false
        }
      ]
    },
  ],
  defaultProps: JSON.stringify({
    titleText: "Meet our speakers",
    subtitleText: "Get to know our team members and find out who they are.",
    speakers: [
      {
        image: "upload/sites/vvs-nic/speaker_1.jpg",
        name: "Thomas Lanyi (Dr.)",
        position: "Managing Partner and Head of Southeast Asia",
        link: "#"
      },
      {
        image: "upload/sites/vvs-nic/speaker_2.jpg",
        name: "John Smith",
        position: "Chief Executive Officer",
        link: "#"
      }
    ]
  }),
  translations: translations,
};

export default Speakers;
