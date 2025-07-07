import { AccessLevel, WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __myAnhGallery: "MyAnh Gallery",
    __myAnhGalleryDesc: "Gallery section for website",
    __title: "Title",
    __subtitle: "Subtitle",
    __images: "Images",
    __imageUrl: "Image URL",
    __imageTitle: "Image Title",
    __imageDescription: "Image Description"
  },
  vi: {
    __myAnhGallery: "MyAnh Gallery",
    __myAnhGalleryDesc: "Phần thư viện ảnh cho trang web",
    __title: "Tiêu đề",
    __subtitle: "Phụ đề",
    __images: "Hình ảnh",
    __imageUrl: "URL hình ảnh",
    __imageTitle: "Tiêu đề hình ảnh",
    __imageDescription: "Mô tả hình ảnh"
  }
};

const MyAnhGallery: WidgetType = {
  key: "MyAnhGallery",
  name: "__myAnhGallery",
  icon: "gallery",
  category: WidgetTypeCategory.General,
  accessLevel: AccessLevel.Public,
  desc: "__myAnhGalleryDesc",
  props: [
    {
      key: "title",
      name: "__title",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "subtitle",
      name: "__subtitle",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "images",
      name: "__images",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
      props: [
        {
          key: "url",
          name: "__imageUrl",
          inputType: WidgetPropInput.Image,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "title",
          name: "__imageTitle",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
      ]
    }
  ],
  defaultProps: JSON.stringify({
    title: "MyAnh Gallery",
    subtitle: "Explore our photo collection",
    images: [
      {
        image: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/myanh/gallery_1.jpg",
        title: "Image 1",
      },
      {
        image: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/myanh/gallery_2.jpg",
        title: "Image 2",
      },
      {
        image: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/myanh/gallery_1.jpg",
        title: "Image 3",
      }
    ]
  }),
  translations: translations,
};

export default MyAnhGallery; 