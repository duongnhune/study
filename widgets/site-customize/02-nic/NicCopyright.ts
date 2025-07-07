import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __nicCopyright: "Copyright (NIC)",
    __copyrightDesc: "Display copyright information in the footer",
    __copyrightText: "Copyright Text",
    __poweredByText: "Powered By Text",
    __poweredByLink: "Powered By Link",
    __poweredByIcon: "Powered By Icon"
  },
  vi: {
    __nicCopyright: "Bản quyền (NIC)",
    __copyrightDesc: "Hiển thị thông tin bản quyền ở chân trang",
    __copyrightText: "Văn bản bản quyền",
    __poweredByText: "Văn bản cung cấp bởi",
    __poweredByLink: "Liên kết cung cấp bởi",
    __poweredByIcon: "Biểu tượng cung cấp bởi"
  }
};

const Copyright: WidgetType = {
  key: "NicCopyright",
  name: "__nicCopyright",
  icon: "copyright",
  category: WidgetTypeCategory.Event,
  desc: "__copyrightDesc",
  props: [
    {
      key: "copyrightText",
      name: "__copyrightText",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "poweredByText",
      name: "__poweredByText",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "poweredByLink",
      name: "__poweredByLink",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    },
    {
      key: "poweredByIcon",
      name: "__poweredByIcon",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: false
    }
  ],
  defaultProps: JSON.stringify({
    copyrightText: "Copyright ©2024 - Trung tâm Đổi mới sáng tạo Quốc gia. All rights reserved.",
    poweredByText: "Powered by",
    poweredByLink: "https://breezing.in",
    poweredByIcon: "icon-breezing-white"
  }),
  translations: translations,
};

export default Copyright;
