import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __ticketCategoryID: "Ticket Category ID",
    __eventID: "Event ID",
    __nicRegistrationForm: "Registration Form",
    __featureTitle: "Feature Title",
    __features: "Benefits",
    __feature: "Content"
  },
  vi: {
    __ticketCategoryID: "ID danh mục vé",
    __eventID: "ID sự kiện",
    __nicRegistrationForm: "Biểu mẫu đăng ký",
    __featureTitle: "Tiêu đề tính năng",
    __features: "Quyền lợi",
    __feature: "Nội dung"
  }
};

const RegistrationForm: WidgetType = {
  key: "NicRegistrationForm",
  name: "__nicRegistrationForm",
  icon: "call",
  category: WidgetTypeCategory.Content,
  props: [
    {
      key: "ticketCategoryID",
      name: "__ticketCategoryID",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "eventID",
      name: "__eventID",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "featureTitle",
      name: "__featureTitle",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "features",
      name: "__features",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      props: [
        {
          key: "feature",
          name: "__feature",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: false
        }
      ]
    }
  ],
  defaultProps: JSON.stringify({
    featureTitle: "What we provide",
    features: [
      {feature: "Early Bird Special - Admission to the conference."},
      {feature: "Exclusive lunch"},
      {feature: "After party and second day agenda"}
    ]
  }),
  translations: translations,
};

export default RegistrationForm;
