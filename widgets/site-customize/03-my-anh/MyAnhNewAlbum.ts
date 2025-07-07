import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __myAnhNewAlbum: "MyAnh New Album",
    __myAnhNewAlbumDesc: "New album slider section",
    __title: "Title",
    __items: "Album Items",
    __image: "Image",
    __subtitle: "Subtitle",
    __link: "Link",
  },
  vi: {
    __myAnhNewAlbum: "MyAnh Album Mới",
    __myAnhNewAlbumDesc: "Phần trình chiếu album mới",
    __title: "Tiêu đề",
    __items: "Các mục album",
    __image: "Hình ảnh",
    __subtitle: "Phụ đề",
    __link: "Liên kết"
  }
};

const MyAnhNewAlbum: WidgetType = {
  key: "MyAnhNewAlbum",
  name: "__myAnhNewAlbum",
  icon: "album",
  category: WidgetTypeCategory.Gallery,
  desc: "__myAnhNewAlbumDesc",
  props: [
    {
      key: "title",
      name: "__title",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "items",
      name: "__items",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
      props: [
        {
          key: "image",
          name: "__image",
          inputType: WidgetPropInput.Image,
          category: WidgetPropCategory.Content,
          required: true
        },
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
          key: "link",
          name: "__link",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        }
      ]
    }
  ],
  defaultProps: JSON.stringify({
    title: "New album",
    items: [
      {
        image: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/myanh/new-album_1.png",
        title: "Album 1",
        subtitle: "Subtitle 1",
        link: "#"
      },
      {
        image: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/myanh/new-album_2.png",
        title: "Album 2",
        subtitle: "Subtitle 2",
        link: "#"
      }
    ]
  }),
  translations: translations,
};

export default MyAnhNewAlbum; 