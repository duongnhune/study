import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType, EntityType } from "@breezingin/breezing-shared";

const translations = {
  en: {
  },
  vi: {
  }
};

const ProductPublicationTest: WidgetType = {
  key: "ProductPublicationTest",
  name: "__productPublicationTest",
  category: WidgetTypeCategory.Hero,
  desc: "__productPublicationTestDesc",
  props: [],
  publicationProps: [
    {
      key: "entityType",
      name: "Entity Type",
      inputType: WidgetPropInput.Select,
      category: WidgetPropCategory.Content,
      options: [
        { value: "product", text: "Product" },
      ],
      required: true,
    },
    {
      key: "entityType",
      name: "Entity Type",
      inputType: WidgetPropInput.Select,
      category: WidgetPropCategory.Content,
      options: [
        { value: "product", text: "Product" },
      ],
      required: true,
    },
    {
      key: "entityType",
      name: "Entity Type",
      inputType: WidgetPropInput.Select,
      category: WidgetPropCategory.Content,
      options: [
        { value: EntityType.Product, text: "Product" },
      ],
      required: true,
    },
    {
      key: "entityType",
      name: "Entity Type",
      inputType: WidgetPropInput.Select,
      category: WidgetPropCategory.Content,
      options: [
        { value: EntityType.Product, text: "Product" },
      ],
      required: true,
    },
    {
      key: "entityType",
      name: "Entity Type",
      inputType: WidgetPropInput.Select,
      category: WidgetPropCategory.Content,
      options: [
        { value: EntityType.Product, text: "Product" },
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

export default ProductPublicationTest; 