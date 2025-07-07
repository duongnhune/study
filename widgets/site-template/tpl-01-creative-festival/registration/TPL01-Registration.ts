import { AccessLevel, WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __name: "Registration form",
    __formID: "Form settings",
    __backgroundImage: "Background image",
  },
  vi: {
    __name: "Form đăng ký",
    __formID: "Cài đặt form",
    __backgroundImage: "Hình nền",
  }
};

const TPL01Registration: WidgetType = {
  key: "TPL01-Registration",
  name: "__name",
  icon: "how_to_reg",
  accessLevel: AccessLevel.Public,
  category: WidgetTypeCategory.Form,
  props: [
    {
      key: "formID",
      name: "__formID",
      inputType: WidgetPropInput.TicketRegistrationForm,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "backgroundImage",
      name: "__backgroundImage",
      inputType: WidgetPropInput.Image,
      category: WidgetPropCategory.Content,
      required: false
    }
  ],
  defaultProps: JSON.stringify({
    formID: "6836d26921d9e15d5af3e15b",
    backgroundImage: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/templates/tpl-01/hero_banner.jpg",
  }),
  translations: translations,
};

export default TPL01Registration;