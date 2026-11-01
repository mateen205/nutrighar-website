export const DEFAULT_PLANS = [
  {
    slug: "basic",
    name: "Basic Plan",
    tagline: "Perfect for a healthy start!",
    description:
      "Three fresh, home-style, calorie-checked meals every day for one week. A simple way to start eating better, delivered to your doorstep.",
    pricePkr: 8500,
    originalPricePkr: null,
    discountPercent: 0,
    durationDays: 7,
    mealsPerDay: 3,
    features: [
      "3 meals per day",
      "Breakfast + Lunch + Dinner",
      "Calorie-checked & balanced",
      "Fresh, hygienic, home-style food",
      "Doorstep delivery",
    ],
    highlights: ["1 week", "3 meals/day", "Healthy start"],
    whoIsFor: [
      "Anyone starting a healthier routine",
      "People who want to try NutriGhar first",
      "Busy people who need ready, balanced meals",
    ],
    mealStructure: [
      { name: "Breakfast", description: "A balanced start to fuel your morning." },
      { name: "Lunch", description: "Fresh, filling and calorie-checked." },
      { name: "Dinner", description: "Light, healthy and satisfying." },
    ],
    isPopular: false,
    sortOrder: 1,
    imageUrl: "/images/plan-basic.jpg",
  },
  {
    slug: "standard",
    name: "Standard Plan",
    tagline: "Balanced nutrition, better results!",
    description:
      "Three main meals plus healthy snacks every day for two weeks. Balanced nutrition that keeps your energy steady and cravings under control.",
    pricePkr: 15000,
    originalPricePkr: null,
    discountPercent: 0,
    durationDays: 14,
    mealsPerDay: 3,
    features: [
      "3 meals per day + snacks",
      "Breakfast + Lunch + Dinner",
      "Healthy snacks included",
      "Calorie-checked & balanced",
      "Doorstep delivery",
    ],
    highlights: ["2 weeks", "Snacks included", "Better results"],
    whoIsFor: [
      "People ready to build a healthy habit",
      "Anyone managing weight with balance",
      "Those who snack often and want better options",
    ],
    mealStructure: [
      { name: "Breakfast", description: "A balanced start to fuel your morning." },
      { name: "Lunch", description: "Fresh, filling and calorie-checked." },
      { name: "Dinner", description: "Light, healthy and satisfying." },
      { name: "Snacks", description: "Healthy options for cravings and energy." },
    ],
    isPopular: false,
    sortOrder: 2,
    imageUrl: "/images/plan-standard.jpg",
  },
  {
    slug: "premium",
    name: "Premium Plan",
    tagline: "For real, visible results!",
    description:
      "Three main meals, healthy snacks and refreshing healthy drinks every day for three weeks. Our most complete plan for real, visible results.",
    pricePkr: 21000,
    originalPricePkr: null,
    discountPercent: 0,
    durationDays: 21,
    mealsPerDay: 3,
    features: [
      "3 meals per day + snacks",
      "Healthy drinks included",
      "Breakfast + Lunch + Dinner",
      "Calorie-checked & balanced",
      "Doorstep delivery",
    ],
    highlights: ["3 weeks", "Snacks + drinks", "Visible results"],
    whoIsFor: [
      "People who want the full NutriGhar experience",
      "Anyone aiming for visible results",
      "Those who want meals, snacks and drinks sorted",
    ],
    mealStructure: [
      { name: "Breakfast", description: "A balanced start to fuel your morning." },
      { name: "Lunch", description: "Fresh, filling and calorie-checked." },
      { name: "Dinner", description: "Light, healthy and satisfying." },
      { name: "Snacks", description: "Healthy options for cravings and energy." },
      { name: "Healthy Drinks", description: "Refreshing drinks to keep you going." },
    ],
    isPopular: false,
    sortOrder: 3,
    imageUrl: "/images/plan-premium.jpg",
  },
  {
    slug: "custom",
    name: "Custom Plan",
    tagline: "Made just for you!",
    description:
      "A meal plan built around your body, goals and schedule, for weight loss or weight gain. Duration and price depend on your needs. Message us to get started.",
    pricePkr: 0,
    originalPricePkr: null,
    discountPercent: 0,
    durationDays: 0,
    mealsPerDay: 3,
    features: [
      "Flexible duration (as per your needs)",
      "Weight loss or weight gain",
      "Consultation before your plan",
      "Calorie-checked & balanced",
      "Price on request",
    ],
    highlights: ["Flexible duration", "Fully personalised", "Price on request"],
    whoIsFor: [
      "People with specific weight loss or gain goals",
      "Anyone with allergies or special requirements",
      "Those who need a plan longer than 3 weeks",
    ],
    mealStructure: [
      { name: "Your Meals", description: "Planned with you after a short consultation." },
    ],
    isPopular: false,
    sortOrder: 4,
    imageUrl: "/images/plan-family.jpg",
  },
] as const;

export const WHAT_WE_OFFER = [
  "Customized meal plans (weight loss & weight gain)",
  "Three main meals per day (breakfast, lunch, dinner)",
  "Healthy snacks & refreshing drinks",
  "Calorie-checked and balanced meals",
  "Fresh, hygienic and home-style food",
  "Consultation before your meal plan (for your goals)",
] as const;

export const KEY_BENEFITS = [
  { title: "Helps in weight loss & weight gain", icon: "scale" },
  { title: "Improves overall health & energy", icon: "zap" },
  { title: "Boosts metabolism", icon: "flame" },
  { title: "Controls calorie intake", icon: "utensils" },
  { title: "Builds a strong and healthy lifestyle", icon: "heart" },
  { title: "Tastes great while keeping you fit!", icon: "smile" },
] as const;

export const WHY_CHOOSE = [
  "Personalized meal plans",
  "Fresh & hygienic ingredients",
  "Calorie-controlled meals",
  "Home-style taste",
  "Convenient doorstep delivery",
  "Support for your fitness goals",
] as const;

export const NUTRIGHAR_RULES = [
  "Place your order in advance (at least 24–48 hours).",
  "Follow the meal timing as per your plan.",
  "Stay hydrated (minimum 8–10 glasses of water).",
  "Avoid outside junk food & unhealthy snacks.",
  "Inform us about any allergies or medical conditions.",
  "No cancellation or refund once the meal plan starts.",
] as const;

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Message or Call Us",
    description: "DM us on WhatsApp or call us. Tell us which package you are interested in.",
  },
  {
    step: "02",
    title: "Fill the Short Consultation",
    description: "Share your goal (weight loss or weight gain), allergies and routine so we can personalise your plan.",
  },
  {
    step: "03",
    title: "Confirm Your Package",
    description: "Pick your plan, confirm the start date and place your order at least 24–48 hours in advance.",
  },
  {
    step: "04",
    title: "Start Your Healthy Journey",
    description: "Fresh, calorie-checked meals arrive at your doorstep. Eat better, feel better!",
  },
] as const;

export const FAQS = [
  {
    question: "What is NutriGhar?",
    answer:
      "NutriGhar is a healthy food provider offering fresh, home-style, nutrition-based meals designed for your fitness and wellness goals, delivered to your doorstep.",
  },
  {
    question: "Do you deliver the meals?",
    answer:
      "Yes. Your meals are prepared with care and delivered to your doorstep. Message us on WhatsApp to confirm delivery for your area.",
  },
  {
    question: "Can I use NutriGhar for both weight loss and weight gain?",
    answer:
      "Yes. We provide balanced, calorie-checked meals for both weight loss and weight gain, customised after a short consultation.",
  },
  {
    question: "What is included in each package?",
    answer:
      "Basic: 3 meals a day for 7 days. Standard: 3 meals + snacks for 14 days. Premium: 3 meals + snacks + healthy drinks for 21 days. Custom: flexible duration, price on request.",
  },
  {
    question: "How do I place an order?",
    answer:
      "DM or call us on WhatsApp, fill the short consultation form, then confirm your package. Please order at least 24–48 hours in advance.",
  },
  {
    question: "Can I cancel or get a refund?",
    answer: "No. There is no cancellation or refund once the meal plan starts, so please confirm your package carefully.",
  },
  {
    question: "I have an allergy or a medical condition. What should I do?",
    answer:
      "Please tell us before your plan starts so we can adjust your meals. NutriGhar is not a medical service, so if you have a medical condition, please also consult your doctor.",
  },
  {
    question: "What is the Custom Plan?",
    answer:
      "The Custom Plan is made just for you: flexible duration and a personalised menu. The price depends on your needs, so DM us for details.",
  },
] as const;

export const DISCLAIMER =
  "NutriGhar provides healthy meals and general nutrition support. Individual results may vary. If you have a medical condition, food allergy, are pregnant or breastfeeding, or take medication, please inform us and consult a qualified healthcare professional before starting a calorie-controlled plan.";
