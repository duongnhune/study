import { AccessLevel, WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __myAnhShow: "MyAnh Show",
    __myAnhShowDesc: "Show section for website",
    __title: "Title",
    __description: "Description",
    __imageUrl: "Image URL",
    __buttonText: "Button Text",
    __buttonLink: "Button Link"
  },
  vi: {
    __myAnhShow: "MyAnh Show",
    __myAnhShowDesc: "Phần hiển thị cho trang web",
    __title: "Tiêu đề",
    __description: "Mô tả",
    __imageUrl: "URL hình ảnh",
    __buttonText: "Văn bản nút",
    __buttonLink: "Liên kết nút"
  }
};

const MyAnhShow: WidgetType = {
  key: "MyAnhShow",
  name: "__myAnhShow",
  icon: "show",
  category: WidgetTypeCategory.General,
  desc: "__myAnhShowDesc",
  accessLevel: AccessLevel.Public,
  props: [
    {
      key: "title",
      name: "__title",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "description",
      name: "__description",
      inputType: WidgetPropInput.Textarea,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "imageUrl",
      name: "__imageUrl",
      inputType: WidgetPropInput.Image,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "buttonText",
      name: "__buttonText",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "buttonLink",
      name: "__buttonLink",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    }
  ],
  defaultProps: JSON.stringify({
    title: "Welcome to MyAnh Show",
    description: "Experience the best shows and performances",
    imageUrl: "",
    buttonText: "Learn More",
    buttonLink: "#"
  }),
  translations: translations,
};

export default MyAnhShow; 