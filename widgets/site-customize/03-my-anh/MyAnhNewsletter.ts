import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __myAnhNewsletter: "MyAnh Newsletter",
    __myAnhNewsletterDesc: "Newsletter subscription form",
    __title: "Title",
    __countries: "Countries",
    __value: "Value",
    __label: "Label",
    __privacyText: "Privacy Text",
    __submitButtonText: "Submit Button Text"
  },
  vi: {
    __myAnhNewsletter: "MyAnh Newsletter",
    __myAnhNewsletterDesc: "Biểu mẫu đăng ký nhận bản tin",
    __title: "Tiêu đề",
    __countries: "Quốc gia",
    __value: "Giá trị",
    __label: "Nhãn",
    __privacyText: "Văn bản bảo mật",
    __submitButtonText: "Văn bản nút gửi"
  }
};

const MyAnhNewsletter: WidgetType = {
  key: "MyAnhNewsletter",
  name: "__myAnhNewsletter",
  icon: "mail",
  category: WidgetTypeCategory.Form,
  desc: "__myAnhNewsletterDesc",
  props: [
    {
      key: "title",
      name: "__title",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "countries",
      name: "__countries",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
      props: [
        {
          key: "value",
          name: "__value",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "label",
          name: "__label",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        }
      ]
    },
    {
      key: "privacyText",
      name: "__privacyText",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "submitButtonText",
      name: "__submitButtonText",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    }
  ],
  defaultProps: JSON.stringify({
    title: "Newsletter",
    countries: [
      { value: "vn", label: "Vietnam" },
      { value: "us", label: "United States" },
      { value: "uk", label: "United Kingdom" }
    ],
    privacyText: "Emails will be sent by or on behalf of Nimbus Creative Solutions, 987 Maple Ridge Drive, Portland, ME 04101 (207) 555-0138. You may withdraw your consent at any time. Privacy Policy / Do Not Sell My Personal Information",
    submitButtonText: "REGISTER"
  }),
  translations: translations,
};

export default MyAnhNewsletter; 