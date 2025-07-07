import { AccessLevel, WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __name: "Ticket registration form",
    __formID: "Form settings",
  },
  vi: {
    __name: "Form đăng ký vé",
    __formID: "Cài đặt",
  }
};

const BaynanzaTicketRegistration: WidgetType = {
  key: "BaynanzaTicketRegistration",
  name: "__name",
  icon: "call",
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
    formID: "",
    backgroundImage: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/baynanza/baynanza-bg-1.png",
  }),
  translations: translations,
};

export default BaynanzaTicketRegistration;
