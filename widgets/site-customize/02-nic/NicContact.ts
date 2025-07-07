import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __nicContact: "Contact (NIC)",
    __contactDesc: "Display contact information in the footer",
    __title: "Title",
    __phone: "Phone Number",
    __phoneIcon: "Phone Icon",
    __email: "Email Address",
    __emailIcon: "Email Icon"
  },
  vi: {
    __nicContact: "Liên hệ (NIC)",
    __contactDesc: "Hiển thị thông tin liên hệ ở chân trang",
    __title: "Tiêu đề",
    __phone: "Số điện thoại",
    __phoneIcon: "Biểu tượng điện thoại",
    __email: "Địa chỉ email",
    __emailIcon: "Biểu tượng email"
  }
};

const Contact: WidgetType = {
  key: "NicContact",
  name: "__nicContact",
  icon: "contact_phone",
  category: WidgetTypeCategory.Event,
  desc: "__contactDesc",
  props: [
    {
      key: "title",
      name: "__title",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "phone",
      name: "__phone",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "phoneIcon",
      name: "__phoneIcon",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "email",
      name: "__email",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "emailIcon",
      name: "__emailIcon",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    }
  ],
  defaultProps: JSON.stringify({
    title: "Contact",
    phone: "080 44838",
    phoneIcon: "call",
    email: "info@nic.gov.vn",
    emailIcon: "mail"
  }),
  translations: translations,
};

export default Contact;
