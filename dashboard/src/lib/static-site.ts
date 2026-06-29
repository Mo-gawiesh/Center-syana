import { DEFAULT_HOTLINE, DEFAULT_WHATSAPP } from "./constants";

export const fallbackCompany = {
  _id: "fallback-center-syana",
  name: "الهندسية للتوكيلات",
  slug: "center-syana",
};

export const fallbackSettings = {
  contact: {
    hotline: DEFAULT_HOTLINE,
    phone: "01062842903",
    address: "المهندسين، الجيزة",
    workingHours: "السبت - الخميس: 9 ص - 10 م",
  },
  social: {
    whatsapp: DEFAULT_WHATSAPP,
  },
  general: {
    companyName: "الهندسية للتوكيلات",
    description: "صيانة معتمدة للأجهزة المنزلية في مصر",
    logoMediaId: "/assets/Logo/logo.png",
  },
  homepage: {
    heroTitle: "الهندسية للتوكيلات",
    heroSubtitle:
      "مركز الصيانة المعتمد الأول في مصر لجميع الأجهزة المنزلية. نوفر لك خدمة احترافية فورية داخل منزلك بقطع غيار أصلية 100% وضمان معتمد.",
    statistics: [
      { value: "+20", label: "عامًا من الخبرة" },
      { value: "24/7", label: "خدمة فورية" },
      { value: "60+", label: "مهندسًا متخصصًا" },
    ],
  },
  seo: {
    metaTitle: "الهندسية للتوكيلات",
    metaDescription: "صيانة معتمدة للأجهزة المنزلية في مصر بخدمة سريعة وقطع غيار أصلية.",
    keywords: [
      "صيانة أجهزة منزلية",
      "صيانة ثلاجات",
      "صيانة غسالات",
      "صيانة تكييفات",
      "الهندسية للتوكيلات",
    ],
  },
};

export const fallbackBrands = [
  { _id: "brand-lg", name: "LG", logoUrl: "/assets/Brands/LG Logo.png" },
  { _id: "brand-samsung", name: "Samsung", logoUrl: "/assets/Brands/samsung-logo-png-1286.png" },
  { _id: "brand-bosch", name: "Bosch", logoUrl: "/assets/Brands/bosch-logo-39982.png" },
  { _id: "brand-whirlpool", name: "Whirlpool", logoUrl: "/assets/Brands/Whirlpool.png" },
  { _id: "brand-carrier", name: "Carrier", logoUrl: "/assets/Brands/Carrier Logo.png" },
  { _id: "brand-toshiba", name: "Toshiba", logoUrl: "/assets/Brands/Toshiba.png" },
  { _id: "brand-beko", name: "Beko", logoUrl: "/assets/Brands/Beko.png" },
  { _id: "brand-zanussi", name: "Zanussi", logoUrl: "/assets/Brands/Zanussi.png" },
];

export const fallbackServices = [
  {
    _id: "service-fridge",
    title: "صيانة الثلاجات",
    description: "تشخيص أعطال التبريد، الشحن، وحلول الترموستات والفريون.",
    imageUrl: "/assets/Products/refrigerator.png",
  },
  {
    _id: "service-washer",
    title: "صيانة الغسالات",
    description: "حل مشاكل الدوران، التسريب، لوحات التحكم، والموتور.",
    imageUrl: "/assets/Products/Washer.png",
  },
  {
    _id: "service-ac",
    title: "صيانة التكييفات",
    description: "تنظيف، شحن فريون، معالجة ضعف التبريد، وصيانة دورية كاملة.",
    imageUrl: "/assets/Products/conditioning.png",
  },
  {
    _id: "service-dishwasher",
    title: "صيانة غسالات الأطباق",
    description: "إصلاح مشاكل الفلتر، الرشاشات، وتصريف المياه.",
    imageUrl: "/assets/Products/Dishwasher.png",
  },
  {
    _id: "service-freezer",
    title: "صيانة ديب فريزر",
    description: "معالجة ضعف التجميد، المؤشرات، والدوائر الداخلية.",
    imageUrl: "/assets/Products/Chest Freezer.png",
  },
  {
    _id: "service-cooker",
    title: "صيانة بوتاجازات",
    description: "إصلاح الشعلات، الإشعال الذاتي، وتسربات الغاز البسيطة.",
    imageUrl: "/assets/Products/Gas Cooker.png",
  },
];

export const fallbackFaqs = [
  {
    _id: "faq-response",
    question: "هل تصلون إلى المنزل بسرعة؟",
    answer: "نعم، نستهدف الوصول خلال 3 ساعات حسب المنطقة وتوفر الفني.",
  },
  {
    _id: "faq-parts",
    question: "هل قطع الغيار أصلية؟",
    answer: "نستخدم قطع غيار أصلية أو معتمدة حسب الجهاز، مع توضيح ذلك قبل البدء.",
  },
  {
    _id: "faq-price",
    question: "هل يوجد فحص مبدئي؟",
    answer: "الفحص والتشخيص مبدئيًا يتم قبل تنفيذ الإصلاح لتوضيح التكلفة بشكل شفاف.",
  },
];

export const fallbackTestimonials = [
  {
    _id: "testimonial-1",
    name: "أحمد محمود",
    role: "القاهرة",
    content: "الخدمة كانت سريعة جدًا، والفني وصل في نفس اليوم وتم الإصلاح من أول زيارة.",
    rating: 5,
  },
  {
    _id: "testimonial-2",
    name: "مها علي",
    role: "الجيزة",
    content: "التعامل محترم والأسعار واضحة، والأهم إن العطل اتصلح بقطع أصلية.",
    rating: 5,
  },
  {
    _id: "testimonial-3",
    name: "محمد سامي",
    role: "الإسكندرية",
    content: "أفضل تجربة صيانة مرّت عليّ، والمتابعة بعد الإصلاح كانت ممتازة.",
    rating: 5,
  },
];

