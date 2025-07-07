import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __speaker: "Speakers",
    __speakerDesc: "Display a grid of speakers or team members",
    __titleText: "Title Text",
    __subtitleText: "Subtitle Text",
    __speakers: "Speakers",
    __speakerId: "Speaker ID",
    __speakerName: "Name",
    __speakerPosition: "Position",
    __speakerImageUrl: "Image URL",
    __speakerBio: "Biography",
    __socialLinks: "Social Links",
    __socialLinkId: "Social Link ID",
    __socialLinkSpeakerId: "Speaker ID",
    __socialLinkPlatform: "Platform",
    __socialLinkUrl: "URL",
    __backgroundImage: "Background Image"
  },
  vi: {
    __speaker: "Diễn giả",
    __speakerDesc: "Hiển thị lưới diễn giả hoặc thành viên nhóm",
    __titleText: "Văn bản tiêu đề",
    __subtitleText: "Văn bản phụ đề",
    __speakers: "Diễn giả",
    __speakerId: "ID Diễn giả",
    __speakerName: "Tên",
    __speakerPosition: "Chức vụ",
    __speakerImageUrl: "URL Hình ảnh",
    __speakerBio: "Tiểu sử",
    __socialLinks: "Liên kết mạng xã hội",
    __socialLinkId: "ID Liên kết",
    __socialLinkSpeakerId: "ID Diễn giả",
    __socialLinkPlatform: "Nền tảng",
    __socialLinkUrl: "URL",
    __backgroundImage: "Hình nền"
  }
};

const Speakers: WidgetType = {
  key: "TPL01-Speakers",
  name: "__speakers",
  icon: "groups",
  category: WidgetTypeCategory.Gallery,
  desc: "__speakerDesc",
  props: [
    {
      key: "titleText",
      name: "__titleText",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "speakers",
      name: "__speakers",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
      props: [
        {
          key: "id",
          name: "__speakerId",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "name",
          name: "__speakerName",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "position",
          name: "__speakerPosition",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "imageUrl",
          name: "__speakerImageUrl",
          inputType: WidgetPropInput.Image,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "bio",
          name: "__speakerBio",
          inputType: WidgetPropInput.Textarea,
          category: WidgetPropCategory.Content,
          required: false
        }
      ]
    },
    {
      key: "backgroundImage",
      name: "__backgroundImage",
      inputType: WidgetPropInput.Image,
      category: WidgetPropCategory.Style,
      required: false
    },
    {
      key: "socialLinks",
      name: "__socialLinks",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: false,
      props: [
        {
          key: "id",
          name: "__socialLinkId",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "speakerId",
          name: "__socialLinkSpeakerId",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "platform",
          name: "__socialLinkPlatform",
          inputType: WidgetPropInput.Select,
          category: WidgetPropCategory.Content,
          required: true,
          options: [
            { value: "twitter", text: "Twitter" },
            { value: "linkedin", text: "LinkedIn" },
            { value: "facebook", text: "Facebook" },
            { value: "instagram", text: "Instagram" }
          ]
        },
        {
          key: "url",
          name: "__socialLinkUrl",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        }
      ]
    },
  ],
  defaultProps: JSON.stringify({
    titleText: "Meet Our Speakers",
    subtitleText: "",
    speakers: [
      {
        id: "speaker1",
        name: "Lam Thao Vi",
        position: "Deputy Minister of Planning and Investment",
        imageUrl: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/templates/template_1/speaker_1.jpg",
        bio: "Experienced leader with a background in economic development and policy making."
      },
      {
        id: "speaker2",
        name: "John Doe",
        position: "CEO & Founder",
        imageUrl: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/templates/template_1/speaker_2.jpg",
        bio: "Entrepreneur and innovator with over 15 years of experience in the tech industry."
      },
      {
        id: "speaker3",
        name: "Jane Smith",
        position: "CTO",
        imageUrl: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/templates/template_1/speaker_3.jpg",
        bio: "Technology expert specializing in AI and machine learning applications."
      },
      {
        id: "speaker4",
        name: "David Johnson",
        position: "Marketing Director",
        imageUrl: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/templates/template_1/speaker_4.jpg",
        bio: "Creative strategist with a passion for brand development and digital marketing."
      },
      {
        id: "speaker5",
        name: "Emily Davis",
        position: "Product Manager",
        imageUrl: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/templates/template_1/speaker_5.jpg",
        bio: "Skilled product manager with a focus on user experience and product design."
      },
      {
        id: "speaker6",
        name: "Michael Brown",
        position: "Data Scientist",
        imageUrl: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/templates/template_1/speaker_6.jpg",
        bio: "Data-driven decision maker with expertise in statistical analysis and data visualization."
      },
      {
        id: "speaker7",
        name: "Sarah Wilson",
        position: "UX/UI Designer",
        imageUrl: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/templates/template_1/speaker_7.jpg",
        bio: "Creative designer with a strong background in user experience and interface design."
      },
      {
        id: "speaker8",
        name: "Chris Lee",
        position: "Software Engineer",
        imageUrl: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/templates/template_1/speaker_8.jpg",
        bio: "Full-stack developer with a passion for building scalable web applications."
      }
    ],
    socialLinks: [
      {
        id: "social1",
        speakerId: "speaker1",
        platform: "linkedin",
        url: "https://linkedin.com/"
      },
      {
        id: "social2",
        speakerId: "speaker1",
        platform: "twitter",
        url: "https://twitter.com/"
      },
      {
        id: "social3",
        speakerId: "speaker2",
        platform: "facebook",
        url: "https://facebook.com/"
      },
      {
        id: "social4",
        speakerId: "speaker2",
        platform: "instagram",
        url: "https://instagram.com/"
      }
    ],
    columns: 4,
    hoverEffect: true,
    showOverlay: true,
    backgroundColor: "",
    backgroundImage: ""
  }),
  translations: translations,
};

export default Speakers;
