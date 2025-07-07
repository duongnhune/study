import { AccessLevel, WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __myAnhMusic: "MyAnh Music",
    __myAnhMusicDesc: "Music section for website",
    __title: "Title",
    __songs: "Songs",
    __songTitle: "Song Title",
    __songArtist: "Artist",
    __songUrl: "Song URL",
    __songImage: "Song Image"
  },
  vi: {
    __myAnhMusic: "MyAnh Music",
    __myAnhMusicDesc: "Phần âm nhạc cho trang web",
    __title: "Tiêu đề",
    __songs: "Bài hát",
    __songTitle: "Tên bài hát",
    __songArtist: "Nghệ sĩ",
    __songUrl: "URL bài hát",
    __songImage: "Hình ảnh bài hát"
  }
};

const MyAnhMusic: WidgetType = {
  key: "MyAnhMusic",
  name: "__myAnhMusic",
  icon: "music",
  category: WidgetTypeCategory.General,
  accessLevel: AccessLevel.Public,
  desc: "__myAnhMusicDesc",
  props: [
    {
      key: "title",
      name: "__title",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "songs",
      name: "__songs",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
      props: [
        {
          key: "title",
          name: "__songTitle",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "artist",
          name: "__songArtist",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "url",
          name: "__songUrl",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "image",
          name: "__songImage",
          inputType: WidgetPropInput.Image,
          category: WidgetPropCategory.Content,
          required: true
        }
      ]
    }
  ],
  defaultProps: JSON.stringify({
    title: "Music",
    songs: [
      {
        title: "Sample Song 1",
        artist: "MyAnh, g0nny",
        url: "#",
        image: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/myanh/music_1.jpg"
      },
      {
        title: "Sample Song 2",
        artist: "MyAnh",
        url: "#",
        image: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/myanh/music_2.jpg"
      },
      {
        title: "Sample Song 2",
        artist: "MyAnh, g0nny",
        url: "#",
        image: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/myanh/music_2.jpg"
      }
    ]
  }),
  translations: translations,
};

export default MyAnhMusic; 