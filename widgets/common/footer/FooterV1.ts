import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __footer_v1: "Footer V1",
    __footer_v1_desc: "Display footer with logo, contact information and locations",
    __primary_logo: "Primary Logo",
    __secondary_logo: "Secondary Logo (white version)",
    __logo_link: "Logo Link",
    __contact_title: "Contact Title",
    __contact_phone: "Phone Number",
    __contact_phone_icon: "Phone Icon",
    __contact_email: "Email Address",
    __contact_email_icon: "Email Icon",
    __locations_title: "Locations Title",
    __location_address: "Address",
    __location_icon: "Location Icon",
    __background_color: "Background Color",
    __text_color: "Text Color"
  },
  vi: {
    __footer_v1: "Chân trang V1",
    __footer_v1_desc: "Hiển thị chân trang với logo, thông tin liên hệ và địa điểm",
    __primary_logo: "Logo chính",
    __secondary_logo: "Logo phụ (phiên bản trắng)",
    __logo_link: "Liên kết Logo",
    __contact_title: "Tiêu đề liên hệ",
    __contact_phone: "Số điện thoại",
    __contact_phone_icon: "Biểu tượng điện thoại",
    __contact_email: "Địa chỉ email",
    __contact_email_icon: "Biểu tượng email",
    __locations_title: "Tiêu đề địa điểm",
    __location_address: "Địa chỉ",
    __location_icon: "Biểu tượng địa điểm",
    __background_color: "Màu nền",
    __text_color: "Màu văn bản"
  }
};

const FooterV1: WidgetType = {
  key: "FooterV1",
  name: "__footer_v1",
  icon: "view_agenda",
  category: "footer" as WidgetTypeCategory,
  desc: "__footer_v1_desc",
  props: [
    // Logo props
    {
      key: "primaryLogo",
      name: "__primary_logo",
      inputType: WidgetPropInput.Image,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "secondaryLogo",
      name: "__secondary_logo",
      inputType: WidgetPropInput.Image,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "logoLink",
      name: "__logo_link",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    // Contact props
    {
      key: "contactTitle",
      name: "__contact_title",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "contactPhone",
      name: "__contact_phone",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "contactPhoneIcon",
      name: "__contact_phone_icon",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "contactEmail",
      name: "__contact_email",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "contactEmailIcon",
      name: "__contact_email_icon",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    // Locations props
    {
      key: "locationsTitle",
      name: "__locations_title",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "locations",
      name: "Locations",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
      props: [
        {
          key: "address",
          name: "__location_address",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "icon",
          name: "__location_icon",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: false
        }
      ]
    },
    // Style props
    {
      key: "backgroundColor",
      name: "__background_color",
      inputType: WidgetPropInput.Color,
      category: WidgetPropCategory.Style,
      required: false
    },
    {
      key: "textColor",
      name: "__text_color",
      inputType: WidgetPropInput.Color,
      category: WidgetPropCategory.Style,
      required: false
    }
  ],
  defaultProps: JSON.stringify({
    primaryLogo: "upload/templates/template_1/logo-breezing.png",
    secondaryLogo: "upload/templates/template_1/logo-breezing.png",
    logoLink: "#",
    contactTitle: "Contact Us",
    contactPhone: "(555) 123-4567",
    contactPhoneIcon: "call",
    contactEmail: "info@example.com",
    contactEmailIcon: "mail",
    locationsTitle: "Our Locations",
    locations: [
      {
        address: "123 Main St, City, State 12345",
        icon: "location_on"
      }
    ],
    backgroundColor: "var(--bs-dark)",
    textColor: "var(--bs-white)"
  }),
  translations: translations,
};

export default FooterV1; 