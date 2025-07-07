import { AccessLevel, WidgetPropCategory, WidgetPropInput, WidgetTypeCategory, type WidgetType } from "@breezingin/breezing-shared";

const translations = {
  en: {
    __pricingPlans: "Pricing Plans Section",
    __pricingPlansDesc: "Display pricing plans for yacht party and beach party with features and pricing",
    __yachtPartyTitle: "Yacht Party Title",
    __beachPartyTitle: "Beach Party Title",
    __yachtPartyPlans: "Yacht Party Plans",
    __beachPartyPlans: "Beach Party Plans",
    __backgroundImage: "Background Image",
	__buttonLink: "Button Link",
	__buttonText: "Button Text",
    __mobileBgImage: "Mobile Background Image",
	__title: "Title",
	__description: "Description",
	__price: "Price",
	__features: "Features"
  },
  vi: {
    __pricingPlans: "Phần Bảng Giá",
    __pricingPlansDesc: "Hiển thị bảng giá cho yacht party và beach party với tính năng và giá cả",
    __yachtPartyTitle: "Tiêu Đề Yacht Party",
    __beachPartyTitle: "Tiêu Đề Beach Party", 
    __yachtPartyPlans: "Gói Yacht Party",
    __beachPartyPlans: "Gói Beach Party",
    __backgroundImage: "Ảnh Nền",
	__buttonLink: "Liên Kết Button",
	__buttonText: "Text Button",
    __mobileBgImage: "Ảnh Nền Mobile",
	__title: "Tiêu Đề",
	__description: "Mô Tả",
	__price: "Giá",
	__features: "Tính Năng"
  }
};

const PricingPlans: WidgetType = {
  key: "BaynanzaEventPricingPlans",
  name: "__pricingPlans",
  icon: "credit-card",
  category: WidgetTypeCategory.General,
  accessLevel: AccessLevel.Public,
  desc: "__pricingPlansDesc",
  props: [
    {
      key: "yachtPartyTitle",
      name: "__yachtPartyTitle",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "beachPartyTitle",
      name: "__beachPartyTitle",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true,
    },
	{
		key: "buttonText",
		name: "__buttonText",
		inputType: WidgetPropInput.Text,
		category: WidgetPropCategory.Content,
		required: true
	},
	{
		key: "buttonLink",
		name: "__buttonLink",
		inputType: WidgetPropInput.Text,
		category: WidgetPropCategory.Content,
		required: true
	},
    {
      key: "yachtPartyPlans",
      name: "__yachtPartyPlans",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
	  props: [
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
			required: true
		},
		{
			key: "price",
			name: "__price",
			inputType: WidgetPropInput.Text,
			category: WidgetPropCategory.Content,
			required: true
		},
		{
			key: "features",
			name: "__features",
			inputType: WidgetPropInput.Text,
			category: WidgetPropCategory.Content,
			required: true
		}
	]
    },
    {
      key: "beachPartyPlans",
      name: "__beachPartyPlans",
      inputType: WidgetPropInput.Array,
      category: WidgetPropCategory.Content,
      required: true,
	  props: [
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
			required: true
		},
		{
			key: "price",
			name: "__price",
			inputType: WidgetPropInput.Text,
			category: WidgetPropCategory.Content,
			required: true
		},
		{
			key: "features",
			name: "__features",
			inputType: WidgetPropInput.Text,
			category: WidgetPropCategory.Content,
			required: true
		}
	  ]
    },
    {
      key: "backgroundImage",
      name: "__backgroundImage",
      inputType: WidgetPropInput.Image,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "mobileBgImage",
      name: "__mobileBgImage",
      inputType: WidgetPropInput.Image,
      category: WidgetPropCategory.Content,
      required: true
    }
  ],
  publicationProps: [
    {
      key: "yachtPartyTitle",
      name: "__yachtPartyTitle",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "beachPartyTitle",
      name: "__beachPartyTitle",
      inputType: WidgetPropInput.Text,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "backgroundImage",
      name: "__backgroundImage",
      inputType: WidgetPropInput.Image,
      category: WidgetPropCategory.Content,
      required: true
    },
    {
      key: "mobileBgImage",
      name: "__mobileBgImage",
      inputType: WidgetPropInput.Image,
      category: WidgetPropCategory.Content,
      required: true
    }
  ],
  defaultProps: JSON.stringify({
    yachtPartyTitle: "YACHT PARTY",
    beachPartyTitle: "BEACH PARTY",
    yachtPartyPlans: [
      {
        title: "HUSTLER",
        description: "By offering a variety of pricing plans, sports training websites can cater to athletes of all levels and budgets, while also providing a sustainable business model for training facilities and coaches.",
        price: "15.000.000. VND",
        features: "Group Training Sessions//Weeks Memberships//Training program//E Book Courses//Video Online Training//Virtual Coaching"
        //   "Group Training Sessions",
        //   "Weeks Memberships",
        //   "Training program",
        //   "E Book Courses",
        //   "Video Online Training",
        //   "Virtual Coaching"
		
      },
      {
        title: "EMPEROR",
        description: "By offering a variety of pricing plans, sports training websites can cater to athletes of all levels and budgets, while also providing a sustainable business model for training facilities and coaches.",
        price: "15.000.000. VND",
        features: "Group Training Sessions//Weeks Memberships//Training program//E Book Courses//Video Online Training//Virtual Coaching"
        //   "Group Training Sessions",
        //   "Weeks Memberships",
        //   "Training program",
        //   "E Book Courses",
        //   "Video Online Training",
        //   "Virtual Coaching"
        
      },
      {
        title: "LEGEND",
        description: "By offering a variety of pricing plans, sports training websites can cater to athletes of all levels and budgets, while also providing a sustainable business model for training facilities and coaches.",
        price: "15.000.000. VND",
        features: "Group Training Sessions//Weeks Memberships//Training program//E Book Courses//Video Online Training//Virtual Coaching"
        //   "Group Training Sessions",
        //   "Weeks Memberships",
        //   "Training program",
        //   "E Book Courses",
        //   "Video Online Training",
        //   "Virtual Coaching"
        
      },
      {
        title: "ELITE",
        description: "By offering a variety of pricing plans, sports training websites can cater to athletes of all levels and budgets, while also providing a sustainable business model for training facilities and coaches.",
        price: "15.000.000. VND",
        features: "Group Training Sessions//Weeks Memberships//Training program//E Book Courses//Video Online Training//Virtual Coaching"
        //   "Group Training Sessions",
        //   "Weeks Memberships",
        //   "Training program",
        //   "E Book Courses",
        //   "Video Online Training",
        //   "Virtual Coaching"
        
      }
    ],
    beachPartyPlans: [
      {
        title: "HUSTLER",
        description: "By offering a variety of pricing plans, sports training websites can cater to athletes of all levels and budgets, while also providing a sustainable business model for training facilities and coaches.",
        price: "15.000.000. VND",
        features: "Group Training Sessions//Weeks Memberships//Training program//E Book Courses//Video Online Training//Virtual Coaching"
        //   "Group Training Sessions",
        //   "Weeks Memberships",
        //   "Training program",
        //   "E Book Courses",
        //   "Video Online Training",
        //   "Virtual Coaching"
        
      },
      {
        title: "EMPEROR",
        description: "By offering a variety of pricing plans, sports training websites can cater to athletes of all levels and budgets, while also providing a sustainable business model for training facilities and coaches.",
        price: "15.000.000. VND",
        features: "Group Training Sessions//Weeks Memberships//Training program//E Book Courses//Video Online Training//Virtual Coaching"
        //   "Group Training Sessions",
        //   "Weeks Memberships",
        //   "Training program",
        //   "E Book Courses",
        //   "Video Online Training",
        //   "Virtual Coaching"
      }
    ],
    backgroundImage: "upload/templates/tpl-03/baynanza_pricing.png",
    mobileBgImage: "upload/templates/tpl-03/baynanza_pricing.png",
	buttonText: "Get Ticket",
	buttonLink: "/event-registration"
  }),
  translations: translations,
};

export default PricingPlans; 