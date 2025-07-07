import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, AccessLevel, WidgetColorType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __nicPartners: "Partners (NIC)",
    __partnersDesc: "Display a grid of partner logos",
    __title: "Title",
    __titleColor: "Title Color",
    __subtitle: "Subtitle",
    __backgroundColor: "Background Color",
    __backgroundImage: "Background Image",
    __partners: "Partners",
    __partnerLogo: "Partner Logo",
    __partnerLink: "Partner Link",
    __partnerSize: "Partner Size",
    __partnerSizeOptions_normal: "Normal",
    __partnerSizeOptions_big: "Big"
  },
  vi: {
    __nicPartners: "Đối tác (NIC)",
    __partnersDesc: "Hiển thị lưới logo các đối tác",
    __title: "Tiêu đề",
    __titleColor: "Màu tiêu đề",
    __subtitle: "Tiêu đề phụ",
    __backgroundColor: "Màu nền",
    __backgroundImage: "Hình nền",
    __partners: "Các đối tác",
    __partnerLogo: "Logo đối tác",
    __partnerLink: "Liên kết đối tác",
    __partnerSize: "Kích thước đối tác",
    __partnerSizeOptions_normal: "Bình thường",
    __partnerSizeOptions_big: "Lớn"
  }
};

const Partners = {
  key: "NicPartners",
  name: "__nicPartners",
  icon: "handshake",
  category: WidgetTypeCategory.Content,
  desc: "__partnersDesc",
  props: [
    {
      key: "title",
      name: "__title",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "titleColor",
      name: "__titleColor",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Style,
      required: false
    },
    {
      key: "subtitle",
      name: "__subtitle",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "backgroundColor",
      name: "__background_color",
      inputType: WidgetPropInput.Color,
      colorType: WidgetColorType.Background,
      category: WidgetPropCategory.Style,
      required: false
    },
    {
      key: "backgroundImage",
      name: "__backgroundImage",
      inputType: WidgetPropInput.Image,
      category: WidgetPropCategory.Style,
      required: false
    },
    {
      key: "partners",
      name: "__partners",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
      props: [
        {
          key: "logo",
          name: "__partnerLogo",
          inputType: WidgetPropInput.Image,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "link",
          name: "__partnerLink",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: false
        },
        {
          key: "size",
          name: "__partnerSize",
          inputType: WidgetPropInput.Select,
          category: WidgetPropCategory.Style,
          required: false,
          options: [
            {
              value: "normal",
              text: "__partnerSizeOptions_normal"
            },
            {
              value: "big",
              text: "__partnerSizeOptions_big"
            }
          ]
        }
      ]
    }
  ],
  defaultProps: JSON.stringify({
    title: "Partners",
    titleColor: "",
    subtitle: "",
    backgroundColor: "#f1f5f9",
    backgroundImage: "",
    partners: [
      {
        logo: "upload/site/vvs-nic/bcg.png",
        link: "#",
        size: "big"
      },
      {
        logo: "upload/site/vvs-nic/baker-mckenzie.svg",
        link: "#",
        size: "normal"
      },
      {
        logo: "upload/site/vvs-nic/marcumasia.png",
        link: "#",
        size: "normal"
      },
      {
        logo: "upload/site/vvs-nic/google-cloud.png",
        link: "#",
        size: "normal"
      },
      {
        logo: "upload/site/vvs-nic/techcombank.png",
        link: "#",
        size: "normal"
      },
      {
        logo: "upload/site/vvs-nic/mufg.png",
        link: "#",
        size: "normal"
      }
    ]
  }),
  translations: translations,
  accessLevel: AccessLevel.Public,
  customTemplateEnabled: false,
  styleBody: "",
  templateBody: "",
  position: 0,
  createTime: Date.now(),
  deleteTime: 0,
  punished: false
};

export default Partners;
