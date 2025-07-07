import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __agenda: "Agenda",
    __agendaDesc: "Display the agenda section with tabs and sessions",
    __title: "Title",
    __desc: "Description",
    __days: "Days",
    __dayLabel: "Day Label",
    __sessions: "Sessions",
    __sessionTime: "Session Time",
    __sessionTitle: "Session Title",
    __sessionSpeaker: "Speaker",
    __sessionDesc: "Description",
    __sessionImage: "Speaker Image"
  },
  vi: {
    __agenda: "Khối Lịch Trình",
    __agendaDesc: "Hiển thị phần lịch trình với các tab và phiên",
    __title: "Tiêu Đề",
    __desc: "Mô Tả",
    __days: "Các Ngày",
    __dayLabel: "Tên Ngày",
    __sessions: "Phiên",
    __sessionTime: "Thời Gian",
    __sessionTitle: "Tiêu Đề Phiên",
    __sessionSpeaker: "Diễn Giả",
    __sessionDesc: "Mô Tả",
    __sessionImage: "Hình Ảnh Diễn Giả"
  }
};

const VvsNicAgenda: WidgetType = {
  key: "VvsNicAgenda",
  name: "__agenda",
  icon: "event",
  category: WidgetTypeCategory.General,
  desc: "__agendaDesc",
  props: [
    { key: "title", name: "__title", inputType: WidgetPropInput.Text, category: WidgetPropCategory.Content, required: true },
    { key: "desc", name: "__desc", inputType: WidgetPropInput.Text, category: WidgetPropCategory.Content, required: false },
    {
      key: "days",
      name: "__days",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
      props: [
        { key: "label", name: "__dayLabel", inputType: WidgetPropInput.Text, category: WidgetPropCategory.Content, required: true },
        {
          key: "sessions",
          name: "__sessions",
          inputType: WidgetPropInput.Array,
          category: WidgetPropCategory.Content,
          required: true,
          props: [
            { key: "time", name: "__sessionTime", inputType: WidgetPropInput.Text, category: WidgetPropCategory.Content, required: true },
            { key: "title", name: "__sessionTitle", inputType: WidgetPropInput.Text, category: WidgetPropCategory.Content, required: true },
            { key: "speaker", name: "__sessionSpeaker", inputType: WidgetPropInput.Text, category: WidgetPropCategory.Content, required: false },
            { key: "desc", name: "__sessionDesc", inputType: WidgetPropInput.Text, category: WidgetPropCategory.Content, required: false },
            { key: "image", name: "__sessionImage", inputType: WidgetPropInput.Image, category: WidgetPropCategory.Content, required: false }
          ]
        }
      ]
    }
  ],
  defaultProps: JSON.stringify({
    title: "Agenda",
    desc: "Jan 12, 2025, 8:30 AM - 17:00 PM",
    days: [
      {
        label: "Monday, April 21, 2025",
        sessions: [
          {
            time: "08:30 - 09:00",
            title: "How to build a startup",
            speaker: "James Collins",
            desc: "Lorem ipsum dolor sit amet consectetur. Auctor purus magna id maecenas platea.",
            image: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vvs-nic/author_1.png"
          }
        ]
      }
    ]
  }),
  translations
};

export default VvsNicAgenda;