import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
    en: {
        __myAnhProduct: "My Anh Product",
        __myAnhProductDesc: "Display products in a clean grid layout",
        __title: "Section Title",
        __products: "Products",
        __productName: "Product Name",
        __productCategory: "Product Category",
        __productPrice: "Product Price",
        __productImage: "Product Image",
        __productLink: "Product Link"
    },
    vi: {
        __myAnhProduct: "Sản Phẩm My Anh",
        __myAnhProductDesc: "Hiển thị sản phẩm theo dạng lưới sạch sẽ",
        __title: "Tiêu đề phần",
        __products: "Sản phẩm",
        __productName: "Tên sản phẩm",
        __productCategory: "Danh mục sản phẩm",
        __productPrice: "Giá sản phẩm",
        __productImage: "Hình ảnh sản phẩm",
        __productLink: "Liên kết sản phẩm"
    }
};

const MyAnhProduct: WidgetType = {
    key: "MyAnhProduct",
    name: "__myAnhProduct",
    icon: "inventory_2",
    category: WidgetTypeCategory.General,
    desc: "__myAnhProductDesc",
    props: [
        {
            key: "title",
            name: "__title",
            inputType: WidgetPropInput.Text,
            category: WidgetPropCategory.Content,
            required: true
        },
        {
            key: "products",
            name: "__products",
            inputType: WidgetPropInput.Array,
            category: WidgetPropCategory.Content,
            required: false,
            props: [
                {
                    key: "name",
                    name: "__productName",
                    inputType: WidgetPropInput.Text,
                    category: WidgetPropCategory.Content,
                    required: true
                },
                {
                    key: "category",
                    name: "__productCategory",
                    inputType: WidgetPropInput.Text,
                    category: WidgetPropCategory.Content,
                    required: true
                },
                {
                    key: "price",
                    name: "__productPrice",
                    inputType: WidgetPropInput.Text,
                    category: WidgetPropCategory.Content,
                    required: true
                },
                {
                    key: "image",
                    name: "__productImage",
                    inputType: WidgetPropInput.Image,
                    category: WidgetPropCategory.Content,
                    required: true
                },
                {
                    key: "link",
                    name: "__productLink",
                    inputType: WidgetPropInput.Text,
                    category: WidgetPropCategory.Content,
                    required: false
                }
            ]
        }
    ],
    defaultProps: JSON.stringify({
        title: "store",
        products: [
            {
                name: "Phase Of The Moon Album",
                category: "Album",
                price: "700.000 VND",
                image: "https://breezing-storage-staging.s3.ap-southeast-1.amazonaws.com/68297444086896298d2ed45a/upload/6632ec2822e9c6f7d6163a2ea1327777.jpg",
                link: "#"
            },
            {
                name: "Phase Of The Moon Album",
                category: "Album",
                price: "700.000 VND",
                image: "https://breezing-storage-staging.s3.ap-southeast-1.amazonaws.com/68297444086896298d2ed45a/upload/904bf5491bf86df1a6c5a6d4de583d54.jpg",
                link: "#"
            },
        ]
    }),
    translations: translations,
};

export default MyAnhProduct;