import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __footer: "Footer",
    __footerDesc: "Display the site footer with logo, contact information and location",
    __logoPrimary: "Primary Logo",
    __logoSecondary: "Secondary Logo",
    __phone: "Phone Number",
    __email: "Email Address",
    __address: "Location Address"
  },
  vi: {
    __footer: "Chân Trang",
    __footerDesc: "Hiển thị phần chân trang với logo, thông tin liên hệ và địa chỉ",
    __logoPrimary: "Logo Chính",
    __logoSecondary: "Logo Phụ",
    __phone: "Số Điện Thoại",
    __email: "Địa Chỉ Email",
    __address: "Địa Chỉ"
  }
};

const Footer: WidgetType = {
  key: "Vietverse2Footer",
  name: "__footer",
  icon: "footer",
  category: WidgetTypeCategory.Footer,
  desc: "__footerDesc",
  props: [
    {
      key: "logoPrimary",
      name: "__logoPrimary",
      inputType: WidgetPropInput.Image,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "logoSecondary",
      name: "__logoSecondary",
      inputType: WidgetPropInput.Image,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "phone",
      name: "__phone",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "email",
      name: "__email",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "address",
      name: "__address",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    }
  ],
  defaultProps: JSON.stringify({
    logoPrimary: 'https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vietverse-2/logo-vietverse.svg',
    logoSecondary: 'https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vietverse-2/logo-vietverse-white.svg',
    phone: '(+84) 903396901',
    email: 'hello@vietverse.world',
    address: 'No. 1, Nguyen Tat Thanh Street, Ward 12, District 4, Ho Chi Minh City'
  }),
  translations: translations,
};

export default Footer;
