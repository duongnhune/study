import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
    en: {
        __social: "Social",
        __socialDesc: "Social media links component",
        __facebook: "Facebook",
        __twitter: "Twitter",
        __instagram: "Instagram"
    },
    vi: {
        __social: "Mạng xã hội",
        __socialDesc: "Thành phần liên kết mạng xã hội",
        __facebook: "Facebook",
        __twitter: "Twitter",
        __instagram: "Instagram"
    }
};

const Social: WidgetType = {
    key: "Social",
    name: "__social",
    icon: "share",
    category: WidgetTypeCategory.Content,
    desc: "__socialDesc",
    props: [
        {
            key: "facebook",
            name: "__facebook",
            inputType: WidgetPropInput.Text,
            category: WidgetPropCategory.Content,
            required: false
        },
        {
            key: "twitter",
            name: "__twitter",
            inputType: WidgetPropInput.Text,
            category: WidgetPropCategory.Content,
            required: false
        },
        {
            key: "instagram",
            name: "__instagram",
            inputType: WidgetPropInput.Text,
            category: WidgetPropCategory.Content,
            required: false
        }
    ],
    defaultProps: JSON.stringify({
        facebook: "https://facebook.com",
        twitter: "https://twitter.com",
        instagram: "https://instagram.com"
    }),
    translations: translations,
};

export default Social;