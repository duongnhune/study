import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType, EntityType } from "@breezingin/breezing-shared";

const translations = {
  en: {
  },
  vi: {
  }
};

const Hero: WidgetType = {
  key: "EventPublicationTest",
  name: "__eventPublicationTest",
  category: WidgetTypeCategory.Hero,
  desc: "__eventPublicationTestDesc",
  props: [],
  publicationProps: [
    {
      key: "entityType",
      name: "Entity Type",
      inputType: WidgetPropInput.Select,
      category: WidgetPropCategory.Content,
      options: [
        { value: "event", text: "Event" },
      ],
      required: true,
    },
    {
      key: "entityType",
      name: "Entity Type",
      inputType: WidgetPropInput.Select,
      category: WidgetPropCategory.Content,
      options: [
        { value: "event", text: "Event" },
      ],
      required: true,
    },
    {
      key: "entityType",
      name: "Entity Type",
      inputType: WidgetPropInput.Select,
      category: WidgetPropCategory.Content,
      options: [
        { value: EntityType.Event, text: "Event" },
      ],
      required: true,
    },
    {
      key: "entityType",
      name: "Entity Type",
      inputType: WidgetPropInput.Select,
      category: WidgetPropCategory.Content,
      options: [
        { value: EntityType.Event, text: "Event" },
      ],
      required: true,
    },
    {
      key: "entityType",
      name: "Entity Type",
      inputType: WidgetPropInput.Select,
      category: WidgetPropCategory.Content,
      options: [
        { value: EntityType.Event, text: "Event" },
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

export default Hero;
