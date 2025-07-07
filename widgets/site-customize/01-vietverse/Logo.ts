import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
    en: {
        __logo: "Logo",
        __logoDesc: "Display Logo",
        __primaryLogo: "Primary Logo",
        __secondaryLogo: "Secondary Logo"
    },
    vi: {
        __logo: "Logo",
        __logoDesc: "Hiển thịLogo",
        __primaryLogo: "Logo chính",
        __secondaryLogo: "Logo phụ"
    }
};

const Logo: WidgetType = {
    key: "Logo",
    name: "__logo",
    icon: "language",
    category: WidgetTypeCategory.Content,
    desc: "__logoDesc",
    props: [
        {
            key: "primaryLogo",
            name: "__primaryLogo",
            inputType: WidgetPropInput.Image,
            category: WidgetPropCategory.Content,
            required: false
        },
        {
            key: "secondaryLogo",
            name: "__secondaryLogo",
            inputType: WidgetPropInput.Image,
            category: WidgetPropCategory.Content,
            required: false
        }
    ],
    defaultProps: JSON.stringify({
        primaryLogo: "https://breezing-storage-staging.s3.ap-southeast-1.amazonaws.com/files/logo-primary.png",
        secondaryLogo: "https://breezing-storage-staging.s3.ap-southeast-1.amazonaws.com/files/logo-secondary.png"
    }),
    translations: translations,
};

export default Logo;
