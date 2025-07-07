import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __partners: "Partners",
    __partnersDesc: "Display the partners section",
    __title: "Title",
    __partnersList: "Partners",
    __partnerImage: "Image",
    __isBig: "Is Big"
  },
  vi: {
    __partners: "Khối Đối Tác",
    __partnersDesc: "Hiển thị phần đối tác",
    __title: "Tiêu Đề",
    __partnersList: "Đối Tác",
    __partnerImage: "Hình Ảnh",
    __isBig: "Nổi Bật"
  }
};

const VvsNicPartnersGrid: WidgetType = {
  key: "VvsNicPartnersGrid",
  name: "__partners",
  icon: "handshake",
  category: WidgetTypeCategory.General,
  desc: "__partnersDesc",
  props: [
    { key: "title", name: "__title", inputType: WidgetPropInput.Text, category: WidgetPropCategory.Content, required: true },
    {
      key: "partners",
      name: "__partnersList",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
      props: [
        { key: "image", name: "__partnerImage", inputType: WidgetPropInput.Image, category: WidgetPropCategory.Content, required: true },
        { key: "isBig", name: "__isBig", inputType: WidgetPropInput.Switch, category: WidgetPropCategory.Content, required: false }
      ]
    }
  ],
  defaultProps: JSON.stringify({
    title: "Partners",
    partners: [
      { image: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vvs-nic/bcg.png", isBig: true },
      { image: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vvs-nic/baker-mckenzie.svg" },
      { image: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vvs-nic/marcumasia.png" },
      { image: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vvs-nic/google-cloud.png" },
      { image: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vvs-nic/techcombank.png" },
      { image: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vvs-nic/mufg.png" }
    ]
  }),
  translations
};

export default VvsNicPartnersGrid;