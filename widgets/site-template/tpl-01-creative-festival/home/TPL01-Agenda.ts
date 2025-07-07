import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __agenda: "Event Agenda",
    __agendaDesc: "Display a detailed schedule of event sessions and speakers",
    __title: "Section Title",
    __eventDateRange: "Event Date Range",
    __days: "Days",
    __dayId: "Day ID",
    __dayName: "Day Name",
    __dayDate: "Day Date",
    __dayIsActive: "Is Active",
    __sessions: "Sessions",
    __sessionId: "Session ID",
    __sessionDayId: "Day ID",
    __sessionStartTime: "Start Time",
    __sessionEndTime: "End Time",
    __sessionTitle: "Session Title",
    __sessionDuration: "Duration",
    __sessionSpeakerId: "Speaker ID",
    __sessionDescription: "Description",
    __speakers: "Speakers",
    __speakerId: "Speaker ID",
    __speakerName: "Speaker Name",
    __speakerTitle: "Speaker Title",
    __speakerImage: "Speaker Image",
  },
  vi: {
    __agenda: "Lịch trình sự kiện",
    __agendaDesc: "Hiển thị lịch trình chi tiết các phiên và diễn giả của sự kiện",
    __title: "Tiêu đề phần",
    __eventDateRange: "Phạm vi ngày sự kiện",
    __days: "Các ngày",
    __dayId: "ID Ngày",
    __dayName: "Tên Ngày",
    __dayDate: "Ngày tháng",
    __dayIsActive: "Đang hoạt động",
    __sessions: "Các phiên",
    __sessionId: "ID Phiên",
    __sessionDayId: "ID Ngày",
    __sessionStartTime: "Thời gian bắt đầu",
    __sessionEndTime: "Thời gian kết thúc",
    __sessionTitle: "Tiêu đề phiên",
    __sessionDuration: "Thời lượng",
    __sessionSpeakerId: "ID Diễn giả",
    __sessionDescription: "Mô tả",
    __speakers: "Diễn giả",
    __speakerId: "ID Diễn giả",
    __speakerName: "Tên Diễn giả",
    __speakerTitle: "Chức danh Diễn giả",
    __speakerImage: "Hình ảnh Diễn giả",
  }
};

const TPL01Agenda: WidgetType = {
  key: "TPL01-Agenda",
  name: "__agenda",
  icon: "event",
  category: WidgetTypeCategory.Agenda,
  desc: "__agendaDesc",
  props: [
    {
      key: "title",
      name: "__title",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "eventDateRange",
      name: "__eventDateRange",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "days",
      name: "__days",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
      props: [
        {
          key: "id",
          name: "__dayId",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "name",
          name: "__dayName",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "date",
          name: "__dayDate",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "isActive",
          name: "__dayIsActive",
          inputType: WidgetPropInput.Switch,
          category: WidgetPropCategory.Content,
          required: false
        }
      ]
    },
    {
      key: "sessions",
      name: "__sessions",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
      props: [
        {
          key: "id",
          name: "__sessionId",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "dayId",
          name: "__sessionDayId",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "startTime",
          name: "__sessionStartTime",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "endTime",
          name: "__sessionEndTime",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "title",
          name: "__sessionTitle",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "duration",
          name: "__sessionDuration",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "speakerId",
          name: "__sessionSpeakerId",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: false
        },
        {
          key: "description",
          name: "__sessionDescription",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: false
        }
      ]
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
          key: "title",
          name: "__speakerTitle",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "image",
          name: "__speakerImage",
          inputType: WidgetPropInput.Image,
          category: WidgetPropCategory.Content,
          required: false
        }
      ]
    },
  ],
  defaultProps: JSON.stringify({
    title: "Agenda",
    eventDateRange: "Jan 12, 2025, 8:30 AM - 17:00 PM",
    days: [
      {
        id: "day1",
        name: "Day 1",
        date: "Monday, April 21, 2025",
        isActive: true
      },
      {
        id: "day2",
        name: "Day 2",
        date: "Tuesday, April 22, 2025",
        isActive: false
      },
      {
        id: "day3",
        name: "Day 3",
        date: "Wednesday, April 23, 2025",
        isActive: false
      }
    ],
    sessions: [
      {
        id: "session1",
        dayId: "day1",
        startTime: "20:00",
        endTime: "20:30",
        title: "How to build a startup",
        duration: "90 minutes",
        speakerId: "speaker1",
        description: "Lorem ipsum dolor sit amet consectetur. Auctor purus magna id maecenas platea. Pharetra aliquet viverra arcu diam. Sed leo urna enim euismod et. Eget ac diam arcu vulputate porttitor tempus."
      },
      {
        id: "session2",
        dayId: "day1",
        startTime: "21:00",
        endTime: "22:30",
        title: "Created \"Preline in React\" task",
        duration: "90 minutes",
        speakerId: "speaker1",
        description: "Lorem ipsum dolor sit amet consectetur. Auctor purus magna id maecenas platea. Pharetra aliquet viverra arcu diam. Sed leo urna enim euismod et. Eget ac diam arcu vulputate porttitor tempus."
      },
      {
        id: "session3",
        dayId: "day1",
        startTime: "22:30",
        endTime: "23:30",
        title: "Consult with James Collins",
        duration: "90 minutes",
        speakerId: "speaker1",
        description: "Lorem ipsum dolor sit amet consectetur. Auctor purus magna id maecenas platea. Pharetra aliquet viverra arcu diam. Sed leo urna enim euismod et. Eget ac diam arcu vulputate porttitor tempus."
      }
    ],
    speakers: [
      {
        id: "speaker1",
        name: "James Collins",
        title: "Founder, Acme Corp.",
        image: ""
      }
    ],
  }),
  translations: translations,
};

export default TPL01Agenda;
