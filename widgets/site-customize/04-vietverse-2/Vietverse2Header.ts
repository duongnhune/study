import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __header: "Header",
    __headerDesc: "Display the site header with logo and navigation menu",
    __logoPrimary: "Primary Logo",
    __logoSecondary: "Secondary Logo",
    __menuItems: "Menu Items",
    __menuItemText: "Menu Item Text",
    __menuItemLink: "Menu Item Link"
  },
  vi: {
    __header: "Đầu Trang",
    __headerDesc: "Hiển thị phần đầu trang với logo và menu điều hướng",
    __logoPrimary: "Logo Chính",
    __logoSecondary: "Logo Phụ",
    __menuItems: "Mục Menu",
    __menuItemText: "Văn Bản Mục Menu",
    __menuItemLink: "Liên Kết Mục Menu"
  }
};

const Header: WidgetType = {
  key: "Vietverse2Header",
  name: "__header",
  icon: "menu",
  category: WidgetTypeCategory.Header,
  desc: "__headerDesc",
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
      key: "menuItems",
      name: "__menuItems",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
      props: [
        {
          key: "text",
          name: "__menuItemText",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "link",
          name: "__menuItemLink",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        }
      ]
    }
  ],
  defaultProps: JSON.stringify({
    logoPrimary: 'https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vietverse-2/logo-vietverse.svg',
    logoSecondary: 'https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vietverse-2/logo-vietverse-white.svg',
    menuItems: [
      { text: 'Home', link: '#' },
      { text: 'Experiences', link: '#' },
      { text: 'Bazaar', link: '#' },
      { text: 'Memories', link: '#' }
    ]
  }),
  translations: translations,
};

export default Header;
