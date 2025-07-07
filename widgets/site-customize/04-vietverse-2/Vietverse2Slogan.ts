import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __slogan: "Large Links",
    __sloganDesc: "Display large slogan links",
    __items: "Slogan Items",
    __itemText: "Slogan Text",
    __itemLink: "Slogan Link",
    __itemTitle: "Slogan Title"
  },
  vi: {
    __slogan: "Liên Kết Lớn",
    __sloganDesc: "Hiển thị các liên kết slogan lớn",
    __items: "Các Slogan",
    __itemText: "Văn Bản Slogan",
    __itemLink: "Liên Kết Slogan",
    __itemTitle: "Tiêu Đề Slogan"
  }
};

const Slogan: WidgetType = {
  key: "Vietverse2Slogan",
  name: "__slogan",
  icon: "format_quote",
  category: WidgetTypeCategory.General,
  desc: "__sloganDesc",
  props: [
    {
      key: "items",
      name: "__items",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
      props: [
        {
          key: "text",
          name: "__itemText",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "link",
          name: "__itemLink",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "title",
          name: "__itemTitle",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        }
      ]
    }
  ],
  defaultProps: JSON.stringify({
    items: [
      {
        text: 'Creator Unlock',
        link: '#',
        title: 'Creator Unlock'
      },
      {
        text: 'Heritage Unleased',
        link: '#',
        title: 'Heritage Unleased'
      }
    ]
  }),
  translations: translations,
};

export default Slogan; 