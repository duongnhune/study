import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType, EntityType } from "@breezingin/breezing-shared";

const translations = {
  en: {
  },
  vi: {
  }
};

const ProductCategoryPublicationTest: WidgetType = {
  key: "ProductCategoryPublicationTest",
  name: "__productCategoryPublicationTest",
  category: WidgetTypeCategory.Hero,
  desc: "__productCategoryPublicationTestDesc",
  props: [],
  publicationProps: [
    {
      key: "entityType",
      name: "Entity Type",
      inputType: WidgetPropInput.Select,
      category: WidgetPropCategory.Content,
      options: [
        { value: "productCategory", text: "Product Category" },
      ],
      required: true,
    },
    {
      key: "entityType",
      name: "Entity Type",
      inputType: WidgetPropInput.Select,
      category: WidgetPropCategory.Content,
      options: [
        { value: "productCategory", text: "Product Category" },
      ],
      required: true,
    },
    {
      key: "entityType",
      name: "Entity Type",
      inputType: WidgetPropInput.Select,
      category: WidgetPropCategory.Content,
      options: [
        { value: EntityType.ProductCategory, text: "Product Category" },
      ],
      required: true,
    },
    {
      key: "entityType",
      name: "Entity Type",
      inputType: WidgetPropInput.Select,
      category: WidgetPropCategory.Content,
      options: [
        { value: EntityType.ProductCategory, text: "Product Category" },
      ],
      required: true,
    },
    {
      key: "entityType",
      name: "Entity Type",
      inputType: WidgetPropInput.Select,
      category: WidgetPropCategory.Content,
      options: [
        { value: EntityType.ProductCategory, text: "Product Category" },
      ],
      required: true,
    },
    {
      key: "title",
      name: "__title",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "description",
      name: "__description",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
    },
  ],
  defaultProps: JSON.stringify({}),
  translations: translations,
};

export default ProductCategoryPublicationTest; 