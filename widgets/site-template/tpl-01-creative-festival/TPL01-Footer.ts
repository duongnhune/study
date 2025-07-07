import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __name: "Footer",
    __desc: "Display footer with logo, contact information and locations",
    __logo: "Logo",
    __logo_link: "Logo Link",
    __tagline: "Tagline",
	__heading: "Heading",
    __contact_title: "Contact Title",
    __contact_phone: "Phone Number",
    __contact_email: "Email Address",
    __locations_title: "Locations Title",
    __location_address: "Address",
    __copyright: "Copyright Text",
    __footer_logo: "Footer Logo",
  },
  vi: {
    __name: "Chân trang",
    __desc: "Hiển thị chân trang với logo, thông tin liên hệ và địa điểm",
    __logo: "Logo",
    __logo_link: "Liên kết Logo",
    __tagline: "Dòng mô tả",
	__heading: "Tiêu đề",
    __contact_title: "Tiêu đề liên hệ",
    __contact_phone: "Số điện thoại",
    __contact_email: "Địa chỉ email",
    __locations_title: "Tiêu đề địa điểm",
    __location_address: "Địa chỉ",
    __copyright: "Chữ bản quyền",
    __footer_logo: "Logo chân trang",
  }
};

const TPL01Footer: WidgetType = {
  key: "TPL01-Footer",
  name: "__name",
  icon: "view_agenda",
  category: "footer" as WidgetTypeCategory,
  desc: "__desc",
  props: [
    {
      key: "logo",
      name: "__logo",
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
    {
      key: "tagline",
      name: "__tagline",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
	{
		key: "heading",
		name: "__heading",
		inputType: WidgetPropInput.Text,
		category: WidgetPropCategory.Content,
		required: false
	},
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
      key: "contactEmail",
      name: "__contact_email",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
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
      ]
    },
    {
      key: "copyright",
      name: "__copyright",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "footerLogo",
      name: "__footer_logo",
      inputType: WidgetPropInput.Image,
      category: WidgetPropCategory.Content,
      required: true
    }
  ],
  defaultProps: JSON.stringify({
    logo: "upload/templates/template_1/logo-breezing.png",
    logoLink: "#",
    tagline: "NIC là đơn vị trực thuộc Bộ Kế hoạch và Đầu tư được thành lập theo Quyết định số 1269/QĐ-TTg ngày 02/10/2019 của Thủ tướng Chính phủ",
    heading: "Get in touch with us",
	contactTitle: "Contact Us",
    contactPhone: "080 44838",
    contactEmail: "info@nic.gov.vn",
    locationsTitle: "Location",
    locations: [
      {
        address: "Tòa nhà NIC, Ngõ 7 Tôn Thất Thuyết, Cầu Giấy, Hà Nội"
      },
      {
        address: "Khu Công Nghệ Cao Hòa Lạc, Tân Xá, Thạch Thất, Hà Nội"
      }
    ],
    copyright: "Copyright ©2024 - Trung tâm Đổi mới sáng tạo Quốc gia. All rights reserved. Powered by",
    footerLogo: "upload/templates/template_1/logo-breezing-dark.png"
  }),
  translations: translations,
};

export default TPL01Footer;
