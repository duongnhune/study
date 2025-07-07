import { WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType, EntityType } from "@breezingin/breezing-shared";

const translations = {
  en: {
  },
  vi: {
  }
};

const EventCategoryPublicationTest: WidgetType = {
  key: "EventCategoryPublicationTest",
  name: "__eventCategoryPublicationTest",
  category: WidgetTypeCategory.Hero,
  desc: "__eventCategoryPublicationTestDesc",
  props: [],
  publicationProps: [
    {
      key: "entityType",
      name: "Entity Type",
      inputType: WidgetPropInput.Select,
      category: WidgetPropCategory.Content,
      options: [
        { value: "eventCategory", text: "Event Category" },
      ],
      required: true,
    },
    {
      key: "entityType",
      name: "Entity Type",
      inputType: WidgetPropInput.Select,
      category: WidgetPropCategory.Content,
      options: [
        { value: "eventCategory", text: "Event Category" },
      ],
      required: true,
    },
    {
      key: "entityType",
      name: "Entity Type",
      inputType: WidgetPropInput.Select,
      category: WidgetPropCategory.Content,
      options: [
        { value: EntityType.EventCategory, text: "Event Category" },
      ],
      required: true,
    },
    {
      key: "entityType",
      name: "Entity Type",
      inputType: WidgetPropInput.Select,
      category: WidgetPropCategory.Content,
      options: [
        { value: EntityType.EventCategory, text: "Event Category" },
      ],
      required: true,
    },
    {
      key: "entityType",
      name: "Entity Type",
      inputType: WidgetPropInput.Select,
      category: WidgetPropCategory.Content,
      options: [
        { value: EntityType.EventCategory, text: "Event Category" },
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

export default EventCategoryPublicationTest; 