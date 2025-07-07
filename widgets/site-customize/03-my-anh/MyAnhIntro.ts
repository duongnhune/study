import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __myAnhIntro: "MyAnh Intro",
    __myAnhIntroDesc: "Introduction section with video and social links",
    __videoUrl: "Video URL",
    __watchNowLink: "Watch Now Link",
    __socialItems: "Social Items",
    __icon: "Icon",
    __link: "Background video link",
    __alt: "Alt Text",
    __watchNowText: "Watch Now Text",
    __videoUrlMobile: "Video URL for mobile"
  },
  vi: {
    __myAnhIntro: "MyAnh Intro",
    __myAnhIntroDesc: "Phần giới thiệu với video và liên kết mạng xã hội",
    __videoUrl: "URL Video",
    __watchNowLink: "Liên kết Watch Now",
    __socialItems: "Các mục mạng xã hội",
    __icon: "Biểu tượng",
    __link: "Liên kết",
    __alt: "Văn bản thay thế",
    __watchNowText: "Nhãn nút",
    __videoUrlMobile: "URL video cho điện thoại"
  }
};

const MyAnhIntro: WidgetType = {
  key: "MyAnhIntro",
  name: "__myAnhIntro",
  icon: "play_circle",
  category: WidgetTypeCategory.Hero,
  desc: "__myAnhIntroDesc",
  props: [
    {
      key: "videoUrl",
      name: "__videoUrl",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "videoUrlMobile",
      name: "__videoUrlMobile",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "watchNowLink",
      name: "__watchNowLink",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "watchNowText",
      name: "__watchNowText",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "socialItems",
      name: "__socialItems",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
      props: [
        {
          key: "icon",
          name: "__icon",
          inputType: WidgetPropInput.Image,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "link",
          name: "__link",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "linkMobile",
          name: "__linkMobile",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "alt",
          name: "__alt",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        }
      ]
    }
  ],
  defaultProps: JSON.stringify({
    videoUrl: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/myanh/video-intro.mp4",
    watchNowLink: "#",
    watchNowText: "Watch Now",
    socialItems: [
      { icon: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/myanh/facebook.svg", link: "#", alt: "facebook" },
      { icon: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/myanh/instagram.svg", link: "#", alt: "instagram" },
      { icon: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/myanh/soundcloud.svg", link: "#", alt: "soundcloud" },
      { icon: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/myanh/apple-music.svg", link: "#", alt: "apple-music" },
      { icon: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/myanh/spotify.svg", link: "#", alt: "spotify" },
      { icon: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/myanh/twitter.svg", link: "#", alt: "twitter" },
      { icon: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/myanh/youtube.svg", link: "#", alt: "youtube" }
    ]
  }),
  translations: translations,
};

export default MyAnhIntro; 