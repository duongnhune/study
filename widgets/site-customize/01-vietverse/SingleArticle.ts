import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __singleArticle: "Single Article",
    __singleArticleDesc: "Component to display article with text and image",
    __content: "Content",
    __image: "Image"
  },
  vi: {
    __singleArticle: "Bài viết đơn",
    __singleArticleDesc: "Thành phần hiển thị bài viết với văn bản và hình ảnh",
    __content: "Nội dung",
    __image: "Hình ảnh"
  }
};

const SingleArticle: WidgetType = {
  key: "SingleArticle",
  name: "__singleArticle",
  icon: "article",
  category: WidgetTypeCategory.Content,
  desc: "__singleArticleDesc",
  props: [
    {
      key: "content",
      name: "__content",
      inputType: WidgetPropInput.Textarea,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "image",
      name: "__image",
      inputType: WidgetPropInput.Image,
      category: WidgetPropCategory.Content,
      required: false
    }
  ],
  defaultProps: JSON.stringify({
    content: "Your article content goes here.\nMultiple paragraphs can be created by adding line breaks.",
    image: "https://breezing-storage-staging.s3.ap-southeast-1.amazonaws.com/files/ad756f9d7887f909a8d8cb6fe5696208.jpg"
  }),
  translations: translations,
};

export default SingleArticle;
