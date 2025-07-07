import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __nicHero: "Hero Section (NIC)",
    __heroDesc: "Display a hero section with event details and partners",
    __heroImage: "Hero Background Image",
    __eventTitle: "Event Title",
    __ticketButtonText: "Button Text",
    __ticketButtonLink: "Button Link",
    __ticketButtonIcon: "Button Icon",
    __eventDate: "Event Date",
    __eventLocation: "Event Location",
    __coOrganizerLabel: "Co-organizer Label",
    __sponsorLabel: "Sponsor Label",
    __hostLabel: "Host Label",
    __hosts: "Hosts",
    __hostImage: "Host Logo",
    __coOrganizers: "Co-organizers",
    __coOrganizerImage: "Co-organizer Logo",
    __sponsors: "Sponsors",
    __sponsorImage: "Sponsor Logo"
  },
  vi: {
    __nicHero: "Phần Hero (NIC)",
    __heroDesc: "Hiển thị phần hero với thông tin sự kiện và đối tác",
    __heroImage: "Hình nền Hero",
    __eventTitle: "Tiêu đề sự kiện",
    __ticketButtonText: "Văn bản nút",
    __ticketButtonLink: "Liên kết nút",
    __ticketButtonIcon: "Biểu tượng nút",
    __eventDate: "Ngày sự kiện",
    __eventLocation: "Địa điểm sự kiện",
    __coOrganizerLabel: "Nhãn đồng tổ chức",
    __sponsorLabel: "Nhãn nhà tài trợ",
    __hostLabel: "Nhãn đơn vị tổ chức",
    __hosts: "Đơn vị tổ chức",
    __hostImage: "Logo đơn vị tổ chức",
    __coOrganizers: "Đồng tổ chức",
    __coOrganizerImage: "Logo đồng tổ chức",
    __sponsors: "Nhà tài trợ",
    __sponsorImage: "Logo nhà tài trợ"
  }
};

const Hero: WidgetType = {
  key: "NicHero",
  name: "__nicHero",
  icon: "photo_size_select_actual",
  category: WidgetTypeCategory.Content,
  desc: "__heroDesc",
  props: [
    {
      key: "heroImage",
      name: "__heroImage",
      inputType: WidgetPropInput.Image,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "eventTitle",
      name: "__eventTitle",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "ticketButtonText",
      name: "__ticketButtonText",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "ticketButtonLink",
      name: "__ticketButtonLink",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "ticketButtonIcon",
      name: "__ticketButtonIcon",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "eventDate",
      name: "__eventDate",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "eventLocation",
      name: "__eventLocation",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "hostLabel",
      name: "__hostLabel",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "hosts",
      name: "__hosts",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: false,
      props: [
        {
          key: "image",
          name: "__hostImage",
          inputType: WidgetPropInput.Image,
          category: WidgetPropCategory.Content,
          required: true
        }
      ]
    },
    {
      key: "coOrganizerLabel",
      name: "__coOrganizerLabel",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "coOrganizers",
      name: "__coOrganizers",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: false,
      props: [
        {
          key: "image",
          name: "__coOrganizerImage",
          inputType: WidgetPropInput.Image,
          category: WidgetPropCategory.Content,
          required: true
        }
      ]
    },
    {
      key: "sponsorLabel",
      name: "__sponsorLabel",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "sponsors",
      name: "__sponsors",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: false,
      props: [
        {
          key: "image",
          name: "__sponsorImage",
          inputType: WidgetPropInput.Image,
          category: WidgetPropCategory.Content,
          required: true
        }
      ]
    }
  ],
  defaultProps: JSON.stringify({
    heroImage: "upload/site/vvs-nic/hero.jpg",
    eventTitle: "VIETNAM INNOVATION<br>AND PRIVATE CAPITAL SUMMIT 2025<br>(VIPC Summit 2025)",
    ticketButtonText: "Get Tickets",
    ticketButtonLink: "#",
    ticketButtonIcon: "confirmation_number",
    eventDate: "22.04.2025",
    eventLocation: "National convention center (ncc), Hanoi, vietnam",
    hostLabel: "Host",
    hosts: [
      {
        image: "upload/site/vvs-nic/host.png"
      }
    ],
    coOrganizerLabel: "Co-organizers",
    coOrganizers: [
      {
        image: "upload/site/vvs-nic/partner_1.png"
      },
      {
        image: "upload/site/vvs-nic/partner_2.png"
      }
    ],
    sponsorLabel: "Our sponsors",
    sponsors: [
      {
        image: "upload/site/vvs-nic/partner_3.png"
      },
      {
        image: "upload/site/vvs-nic/partner_4.png"
      },
      {
        image: "upload/site/vvs-nic/partner_5.png"
      },
      {
        image: "upload/site/vvs-nic/partner_6.png"
      }
    ]
  }),
  translations: translations,
};

export default Hero;
