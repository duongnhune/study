import { AccessLevel, WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
    en: {
        __myAnhStore: "My Anh Store",
        __myAnhStoreDesc: "Display store locations with contact information and directions",
        __title: "Store Title",
        __stores: "Store Locations",
        __storeName: "Store Name",
        __storeLocation: "Location/Address",
        __storeHotline: "Hotline",
        __directionLink: "Direction Link"
    },
    vi: {
        __myAnhStore: "Cửa Hàng My Anh",
        __myAnhStoreDesc: "Hiển thị các địa điểm cửa hàng với thông tin liên hệ và chỉ đường",
        __title: "Tiêu đề cửa hàng",
        __stores: "Địa điểm cửa hàng",
        __storeName: "Tên cửa hàng",
        __storeLocation: "Địa chỉ",
        __storeHotline: "Đường dây nóng",
        __directionLink: "Liên kết chỉ đường"
    }
};

const MyAnhStore: WidgetType = {
    key: "MyAnhStore",
    name: "__myAnhStore",
    icon: "store",
    category: WidgetTypeCategory.General,
    accessLevel: AccessLevel.Public,
    desc: "__myAnhStoreDesc",
    props: [
        {
            key: "title",
            name: "__title",
            inputType: WidgetPropInput.Text,
            category: WidgetPropCategory.Content,
            required: true
        },
        {
            key: "stores",
            name: "__stores",
            inputType: WidgetPropInput.Array,
            category: WidgetPropCategory.Content,
            required: false,
            props: [
                {
                    key: "name",
                    name: "__storeName",
                    inputType: WidgetPropInput.Text,
                    category: WidgetPropCategory.Content,
                    required: true
                },
                {
                    key: "location",
                    name: "__storeLocation",
                    inputType: WidgetPropInput.Text,
                    category: WidgetPropCategory.Content,
                    required: true
                },
                {
                    key: "hotline",
                    name: "__storeHotline",
                    inputType: WidgetPropInput.Text,
                    category: WidgetPropCategory.Content,
                    required: true
                },
                {
                    key: "directionLink",
                    name: "__directionLink",
                    inputType: WidgetPropInput.Text,
                    category: WidgetPropCategory.Content,
                    required: true
                }
            ]
        }
    ],
    defaultProps: JSON.stringify({
        title: "Find us",
        stores: [
            {
                name: "MY ANH HANOI FLAGSHIP",
                location: "TẦNG 2 TTTM AEON MALL LONG BIÊN 27 CỔ LINH, PHƯỜNG LONG BIÊN, QUẬN LONG BIÊN, THÀNH PHỐ HÀ NỘI",
                hotline: "HOTLINE: 02388",
                directionLink: "https://maps.google.com"
            },
            {
                name: "MY ANH HO CHI MINH",
                location: "TẦNG 3 TTTM VINCOM CENTER 72 NGUYỄN TRÃI, PHƯỜNG BẾN THÀNH, QUẬN 1, TP HCM",
                hotline: "HOTLINE: 02888",
                directionLink: "https://maps.google.com"
            },
            {
                name: "MY ANH DA NANG",
                location: "TẦNG 2 TTTM LOTTE MART 06 ĐƯỜNG 2/9, PHƯỜNG BẾN THÀNH, QUẬN HẢI CHÂU, TP ĐÀ NẴNG",
                hotline: "HOTLINE: 02366",
                directionLink: "https://maps.google.com"
            },
            {
                name: "MY ANH CAN THO",
                location: "TẦNG 1 TTTM SENSE CITY 36 ĐƯỜNG 30/4, PHƯỜNG XUÂN KHÁNH, QUẬN NINH KIỀU, TP CẦN THƠ",
                hotline: "HOTLINE: 02977",
                directionLink: "https://maps.google.com"
            }
        ]
    }),
    translations: translations,
};

export default MyAnhStore;