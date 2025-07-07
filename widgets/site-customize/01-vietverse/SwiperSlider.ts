import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
    en: {
        __swiperSlider: "Swiper Slider",
        __swiperSliderDesc: "Vertical swiper slider with images",
        __itemSize: "Image aspect ratio",
        __itemGroup: "Images per slide",
        __slidesPerView: "Number of slides",
        __spaceBetween: "Space between slides",
        __loop: "Loop slides",
        __autoplay: "Autoplay speed",
        __title: "Title",
        __subtitle: "Subtitle",
        __items: "Items",
        __image: "Image"
    },
    vi: {
        __swiperSlider: "Swiper Slider",
        __swiperSliderDesc: "Trình chiếu hình ảnh dọc",
        __itemSize: "Tỉ lệ khung ảnh",
        __itemGroup: "Số lượng ảnh trong 1 slide",
        __slidesPerView: "Số lượng phần tử",
        __spaceBetween: "Khoảng cách phần tử",
        __loop: "Lặp lại",
        __autoplay: "Tự động chạy",
        __title: "Tiêu đề",
        __subtitle: "Tiêu đề phụ",
        __items: "Các mục",
        __image: "Hình ảnh"
    }
};

const SwiperSlider: WidgetType = {
    key: "SwiperSlider",
    name: "__swiperSlider",
    icon: "trackpad_input",
    category: WidgetTypeCategory.Content,
    desc: "__swiperSliderDesc",
    props: [
        {
            key: "itemSize",
            name: "__itemSize",
            inputType: WidgetPropInput.Text,
            category: WidgetPropCategory.Layout,
            required: false
        },
        {
            key: "itemGroup",
            name: "__itemGroup",
            inputType: WidgetPropInput.Number,
            category: WidgetPropCategory.Layout,
            required: false
        },
        {
            key: "slidesPerView",
            name: "__slidesPerView",
            inputType: WidgetPropInput.Number,
            category: WidgetPropCategory.Layout,
            required: false
        },
        {
            key: "spaceBetween",
            name: "__spaceBetween",
            inputType: WidgetPropInput.Number,
            category: WidgetPropCategory.Layout,
            required: false
        },
        {
            key: "loop",
            name: "__loop",
            inputType: WidgetPropInput.Switch,
            category: WidgetPropCategory.Layout,
            required: false
        },
        {
            key: "autoplay",
            name: "__autoplay",
            inputType: WidgetPropInput.Number,
            category: WidgetPropCategory.Layout,
            required: false
        },
        {
            key: "title",
            name: "__title",
            inputType: WidgetPropInput.Text,
            category: WidgetPropCategory.Content,
            required: false
        },
        {
            key: "subtitle",
            name: "__subtitle",
            inputType: WidgetPropInput.Text,
            category: WidgetPropCategory.Content,
            required: false
        },
        {
            key: "items",
            name: "__items",
            inputType: WidgetPropInput.Array,
            category: WidgetPropCategory.Content,
            required: false,
            props: [
                {
                    key: "title",
                    name: "__title",
                    inputType: WidgetPropInput.Text,
                    category: WidgetPropCategory.Content,
                    required: false
                },
                {
                    key: "image",
                    name: "__image",
                    inputType: WidgetPropInput.Image,
                    category: WidgetPropCategory.Content,
                    required: false
                }
            ]
        }
    ],
    defaultProps: JSON.stringify({
        itemSize: "3-2",
        itemGroup: 2,
        slidesPerView: 1,
        spaceBetween: 16,
        loop: true,
        autoplay: 6000,
        title: "Our Gallery",
        subtitle: "Featured Works",
        items: [
            {
                title: "Image 1",
                image: "https://breezing-storage-staging.s3.ap-southeast-1.amazonaws.com/files/ad756f9d7887f909a8d8cb6fe5696208.jpg"
            },
            {
                title: "Image 2",
                image: "https://breezing-storage-staging.s3.ap-southeast-1.amazonaws.com/files/ad756f9d7887f909a8d8cb6fe5696208.jpg"
            },
            {
                title: "Image 3",
                image: "https://breezing-storage-staging.s3.ap-southeast-1.amazonaws.com/files/ad756f9d7887f909a8d8cb6fe5696208.jpg"
            },
            {
                title: "Image 4",
                image: "https://breezing-storage-staging.s3.ap-southeast-1.amazonaws.com/files/ad756f9d7887f909a8d8cb6fe5696208.jpg"
            }
        ]
    }),
    translations: translations,
};

export default SwiperSlider;
