import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __nicLogo: "NIC Logo",
    __logoDesc: "Display organization logo with primary and secondary versions",
    __primaryLogo: "Primary Logo",
    __secondaryLogo: "Secondary Logo (white version)",
    __logoLink: "Logo Link"
  },
  vi: {
    __nicLogo: "NIC Logo",
    __logoDesc: "Hiển thị logo tổ chức với phiên bản chính và phụ",
    __primaryLogo: "Logo chính",
    __secondaryLogo: "Logo phụ (phiên bản trắng)",
    __logoLink: "Liên kết Logo"
  }
};

const Logo: WidgetType = {
  key: "NicLogo",
  name: "__nicLogo",
  icon: "image",
  category: WidgetTypeCategory.Event,
  desc: "__logoDesc",
  props: [
    {
      key: "primaryLogo",
      name: "__primaryLogo",
      inputType: WidgetPropInput.Image,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "secondaryLogo",
      name: "__secondaryLogo",
      inputType: WidgetPropInput.Image,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "logoLink",
      name: "__logoLink",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    }
  ],
  defaultProps: JSON.stringify({
    primaryLogo: "upload/sites/vvs-nic/logo-nic.png",
    secondaryLogo: "upload/sites/vvs-nic/logo-nic-white.svg",
    logoLink: "#"
  }),
  translations: translations,
};

export default Logo;
