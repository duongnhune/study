import { AccessLevel, WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __agenda: "Agenda Section",
    __agendaDesc: "Display the event agenda with timeline and activities",
    __title: "Section Title",
    __agendaItems: "Agenda Items",
    __itemTime: "Time",
    __itemTitle: "Activity Title",
    __itemDescription: "Activity Description",
    __itemDetails: "Activity Details",
    __backgroundImage: "Background Image",
    __backgroundImageMobile: "Background Image (Mobile)"
  },
  vi: {
    __agenda: "Phần Lịch Trình",
    __agendaDesc: "Hiển thị lịch trình sự kiện với thời gian và hoạt động",
    __title: "Tiêu Đề Phần",
    __agendaItems: "Mục Lịch Trình",
    __itemTime: "Thời Gian",
    __itemTitle: "Tiêu Đề Hoạt Động",
    __itemDescription: "Mô Tả Hoạt Động",
    __itemDetails: "Chi Tiết Hoạt Động",
    __backgroundImage: "Hình Nền",
    __backgroundImageMobile: "Hình Nền (Mobile)"
  }
};

const Agenda: WidgetType = {
  key: "BaynanzaAgenda",
  name: "__agenda",
  icon: "schedule",
  category: WidgetTypeCategory.General,
  accessLevel: AccessLevel.Public,
  desc: "__agendaDesc",
  props: [
    {
      key: "backgroundImage",
      name: "__backgroundImage",
      inputType: WidgetPropInput.Image,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "backgroundImageMobile",
      name: "__backgroundImageMobile",
      inputType: WidgetPropInput.Image,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "title",
      name: "__title",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "agendaItems",
      name: "__agendaItems",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
      props: [
        {
          key: "time",
          name: "__itemTime",
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
        },
        {
          key: "description",
          name: "__itemDescription",
          inputType: WidgetPropInput.Textarea,
          category: WidgetPropCategory.Content,
          required: false
        },
        {
          key: "details",
          name: "__itemDetails",
          inputType: WidgetPropInput.Textarea,
          category: WidgetPropCategory.Content,
          required: false,
          props: [
            {
              key: "detail",
              name: "Detail Item",
              inputType: WidgetPropInput.Text,
              category: WidgetPropCategory.Content,
              required: true
            }
          ]
        },
      ]
    }
  ],
  publicationProps: [
    {
      key: "agendaItems",
      name: "__agendaItems",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
      props: [
        {
          key: "time",
          name: "__itemTime",
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
        },
        {
          key: "description",
          name: "__itemDescription",
          inputType: WidgetPropInput.Textarea,
          category: WidgetPropCategory.Content,
          required: false
        },
        {
          key: "details",
          name: "__itemDetails",
          inputType: WidgetPropInput.Textarea,
          category: WidgetPropCategory.Content,
          required: false,
          props: [
            {
              key: "detail",
              name: "Detail Item",
              inputType: WidgetPropInput.Text,
              category: WidgetPropCategory.Content,
              required: true
            }
          ]
        }
      ]
    }
  ],
  defaultProps: JSON.stringify({
    backgroundImage: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/baynanza/desktop+background.png",
    backgroundImageMobile: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/baynanza/mobile+background.png",
    title: "AGENDA",
    agendaItems: [
      {
        time: "06:00",
        title: "WARM-UP & YACHT ACTIVITIES",
        description: "Welcome aboard! Start with a complimentary drink",
        details: [
          "Live DJ set to warm up the night",
          "Meet & greet with influencers & artists",
          "Food, cocktails & entertainment",
          "Photo booth & exclusive merch area"
        ].join("\n")
      },
      {
        time: "11:00",
        title: "CULINARY EXPERIENCE",
        description: "Savor the ultimate yacht experience featuring premium dishes",
        details: [
          "Premium cocktails & fine wines",
          "Gourmet food stations",
          "Social dining with breathtaking ocean views"
        ].join("\n")
      },
      {
        time: "08:00",
        title: "MV LAUNCH & ARTIST PERFORMANCES",
        description: "Exclusive first look at Manh artist music video premiere",
        details: [
          "Live performances by top artists",
          "Interactive artist meet & greets",
          "Behind-the-scenes footage screening"
        ].join("\n")
      },
      {
        time: "09:00",
        title: "LANG CHAI VUNG VIENG EXPERIENCE",
        description: "Yacht arrives at the floating fishing village",
        details: [
          "Explore traditional Vietnamese fishing culture",
          "Authentic meal & unique flavors experience",
          "Traditional talks & music dynamics showcase",
          "Drone light show over the sea"
        ].join("\n")
      },
      {
        time: "09:00",
        title: "RETURN TO YACHT - DINNER & DJ SET",
        description: "Enjoy optional exclusive dinner",
        details: [
          "Premium dinner service",
          "DJ performances",
          "Exclusive access to the night ocean views"
        ].join("\n")
      },
      {
        time: "05:00",
        title: "ARRIVAL AT THE CAVE RAVE (AFTER PARTY BEGINS)",
        description: "The most exclusive, underground experience at Ha Long Bay",
        details: [
          "Transition into 'The Cave' - an exclusive underground rave",
          "Top-tier DJs from Vietnam & international artists",
          "Unique lighting & sound systems in a cave setting",
          "Neon clothing & glow-paint entertainment",
          "Cave exploration & stunning photography opportunities"
        ].join("\n")
      },
      {
        time: "08:00",
        title: "CAVE RAVE ENDS",
        description: "A final adventure over the stunning seascape",
        details: [
          "Party winds down with stunning sunrise views",
          "Return journey with light breakfast"
        ].join("\n")
      }
    ]
  }),
  translations: translations,
};

export default Agenda;