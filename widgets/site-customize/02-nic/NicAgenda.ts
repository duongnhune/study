import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __nicAgenda: "Agenda (NIC)",
    __agendaDesc: "Display conference or event agenda with expandable sessions",
    __titleText: "Title",
    __date: "Date",
    __location: "Location",
    __backgroundImage: "Background Image",
    __backgroundColor: "Background Color",
    __sections: "Sections",
    __sectionTitle: "Section Title",
    __timeRange: "Time Range",
    __items: "Items",
    __sectionId: "Section ID",
    __startTime: "Start Time",
    __endTime: "End Time",
    __itemTitle: "Title",
    __duration: "Duration",
    __speakers: "Speakers",
    __speakerId: "Speaker ID",
    __itemId: "Item ID",
    __speakerName: "Name",
    __speakerPosition: "Position"
  },
  vi: {
    __nicAgenda: "Lịch trình (NIC)",
    __agendaDesc: "Hiển thị lịch trình hội nghị hoặc sự kiện với các phiên có thể mở rộng",
    __titleText: "Tiêu đề",
    __date: "Ngày",
    __location: "Địa điểm",
    __backgroundImage: "Hình nền",
    __backgroundColor: "Màu nền",
    __sections: "Các phần",
    __sectionTitle: "Tiêu đề phần",
    __timeRange: "Khung giờ",
    __items: "Các mục",
    __sectionId: "ID phần",
    __startTime: "Giờ bắt đầu",
    __endTime: "Giờ kết thúc",
    __itemTitle: "Tiêu đề",
    __duration: "Thời lượng",
    __speakers: "Diễn giả",
    __speakerId: "ID Diễn giả",
    __itemId: "ID Mục",
    __speakerName: "Tên",
    __speakerPosition: "Chức vụ"
  }
};

const Agenda: WidgetType = {
  key: "NicAgenda",
  name: "__nicAgenda",
  icon: "calendar_today",
  category: WidgetTypeCategory.Content,
  desc: "__agendaDesc",
  props: [
    {
      key: "titleText",
      name: "__titleText",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "date",
      name: "__date",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "location",
      name: "__location",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "backgroundImage",
      name: "__backgroundImage",
      inputType: WidgetPropInput.Image,
      category: WidgetPropCategory.Style,
      required: false
    },
    {
      key: "backgroundColor",
      name: "__backgroundColor",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Style,
      required: false
    },
    {
      key: "sections",
      name: "__sections",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
      props: [
        {
          key: "id",
          name: "ID",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "title",
          name: "__sectionTitle",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "timeRange",
          name: "__timeRange",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        }
      ]
    },
    {
      key: "items",
      name: "__items",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
      props: [
        {
          key: "id",
          name: "__itemId",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "sectionId",
          name: "__sectionId",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "startTime",
          name: "__startTime",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "endTime",
          name: "__endTime",
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
          key: "duration",
          name: "__duration",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        }
      ]
    },
    {
      key: "speakers",
      name: "__speakers",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: false,
      props: [
        {
          key: "id",
          name: "__speakerId",
          inputType: WidgetPropInput.Text,
          category: WidgetPropCategory.Content,
          required: true
        },
        {
          key: "itemId",
          name: "__itemId",
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
        }
      ]
    }
  ],
  defaultProps: JSON.stringify({
    titleText: "AGENDA",
    date: "22.04.2025",
    location: "National convention center (ncc), Hanoi, Vietnam",
    backgroundColor: "#0a1442",
    sections: [
      {
        id: "morning",
        title: "Morning Session",
        timeRange: "8:30 AM - 12:10 AM"
      },
      {
        id: "lunch",
        title: "Lunch",
        timeRange: "12:10 AM - 1:30 PM"
      },
      {
        id: "afternoon",
        title: "Afternoon Session",
        timeRange: "1:30 PM - 4:15 PM"
      },
      {
        id: "networking",
        title: "Networking Hour",
        timeRange: "4:15 PM - 5:30 PM"
      },
      {
        id: "party",
        title: "Private After Party",
        timeRange: "7:00 PM - 10:00 PM"
      }
    ],
    items: [
      {
        id: "item1",
        sectionId: "morning",
        startTime: "08:30",
        endTime: "09:00",
        title: "Đón tiếp Đại biểu",
        duration: "30 minutes"
      },
      {
        id: "item2",
        sectionId: "morning",
        startTime: "09:00",
        endTime: "09:10",
        title: "Giới thiệu Chương trình và Đại biểu tham dự",
        duration: "10 minutes"
      },
      {
        id: "item3",
        sectionId: "morning",
        startTime: "09:10",
        endTime: "09:15",
        title: "Clip khai mạc",
        duration: "5 minutes"
      },
      {
        id: "item4",
        sectionId: "morning",
        startTime: "09:15",
        endTime: "09:25",
        title: "Phát biểu khai mạc",
        duration: "10 minutes"
      },
      {
        id: "item5",
        sectionId: "afternoon",
        startTime: "13:30",
        endTime: "14:00",
        title: "Báo cáo xu hướng công nghệ",
        duration: "30 minutes"
      }
    ],
    speakers: [
      {
        id: "speaker1",
        itemId: "item4",
        name: "Ông Nguyễn Đức Tâm",
        position: "Thứ trưởng Bộ Kế hoạch"
      },
      {
        id: "speaker2",
        itemId: "item5",
        name: "Ông Vũ Quốc Huy",
        position: "Giám đốc Trung tâm Đổi mới sáng tạo Quốc gia"
      }
    ]
  }),
  translations: translations,
};

export default Agenda;
