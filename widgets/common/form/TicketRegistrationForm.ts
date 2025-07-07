import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

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

const TicketRegistrationForm: WidgetType = {
  key: "TicketRegistrationForm",
  name: "__name ",
  icon: "call",
  category: WidgetTypeCategory.Form,
  props: [
    {
      key: "formID",
      name: "__formID",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
  ],
  defaultProps: JSON.stringify({
    formID: "678dfe4fdf142f499b9e1772",
  }),
  translations: translations,
};

export default TicketRegistrationForm;
