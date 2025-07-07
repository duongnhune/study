import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __hero: "Hero",
    __heroDesc: "Display the hero section with title, date, location, and partners",
    __title: "Title",
    __date: "Date",
    __location: "Location",
    __image: "Hero Image",
    __coOrganizers: "Co-organizers",
    __sponsors: "Sponsors"
  },
  vi: {
    __hero: "Khối Hero",
    __heroDesc: "Hiển thị phần hero với tiêu đề, ngày, địa điểm và đối tác",
    __title: "Tiêu Đề",
    __date: "Ngày",
    __location: "Địa Điểm",
    __image: "Hình Hero",
    __coOrganizers: "Đồng tổ chức",
    __sponsors: "Nhà tài trợ"
  }
};

const VvsNicHero: WidgetType = {
  key: "VvsNicHero",
  name: "__hero",
  icon: "star",
  category: WidgetTypeCategory.Hero,
  desc: "__heroDesc",
  props: [
    { key: "title", name: "__title", inputType: WidgetPropInput.Text, category: WidgetPropCategory.Content, required: true },
    { key: "date", name: "__date", inputType: WidgetPropInput.Text, category: WidgetPropCategory.Content, required: true },
    { key: "location", name: "__location", inputType: WidgetPropInput.Text, category: WidgetPropCategory.Content, required: true },
    { key: "image", name: "__image", inputType: WidgetPropInput.Image, category: WidgetPropCategory.Content, required: true },
    {
      key: "coOrganizers",
      name: "__coOrganizers",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: false,
      props: [
        { key: "img", name: "__image", inputType: WidgetPropInput.Image, category: WidgetPropCategory.Content, required: true }
      ]
    },
    {
      key: "sponsors",
      name: "__sponsors",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: false,
      props: [
        { key: "img", name: "__image", inputType: WidgetPropInput.Image, category: WidgetPropCategory.Content, required: true }
      ]
    }
  ],
  defaultProps: JSON.stringify({
    title: "VIETNAM INNOVATION AND PRIVATE CAPITAL SUMMIT 2025 (VIPC Summit 2025)",
    date: "22.04.2025",
    location: "National convention center (ncc), Hanoi, vietnam",
    image: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vvs-nic/hero.jpg",
    coOrganizers: [
      { img: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vvs-nic/partner_1.png" },
      { img: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vvs-nic/partner_2.png" }
    ],
    sponsors: [
      { img: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vvs-nic/partner_3.png" },
      { img: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vvs-nic/partner_4.png" },
      { img: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vvs-nic/partner_5.png" },
      { img: "https://breezing-upload.s3.ap-southeast-1.amazonaws.com/site/vvs-nic/partner_6.png" }
    ]
  }),
  translations
};

export default VvsNicHero;