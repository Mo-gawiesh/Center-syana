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

// =====================================================
// 37 BRANDS — matching the original site exactly
// =====================================================
export const fallbackBrands = [
  { _id: "brand-lg",                name: "LG",                 logoUrl: "/assets/Brands/LG Logo.png" },
  { _id: "brand-bosch",             name: "Bosch",              logoUrl: "/assets/Brands/bosch-logo-39982.png" },
  { _id: "brand-sharp",             name: "Sharp",              logoUrl: "/assets/Brands/SHARP Logo.png" },
  { _id: "brand-samsung",           name: "Samsung",            logoUrl: "/assets/Brands/samsung-logo-png-1286.png" },
  { _id: "brand-kiriazi",           name: "Kiriazi",            logoUrl: "/assets/Brands/Kiriazi.png" },
  { _id: "brand-carrier",           name: "Carrier",            logoUrl: "/assets/Brands/Carrier Logo.png" },
  { _id: "brand-toshiba",           name: "Toshiba",            logoUrl: "/assets/Brands/Toshiba.png" },
  { _id: "brand-fresh",             name: "Fresh",              logoUrl: "/assets/Brands/Fresh.png" },
  { _id: "brand-unionaire",         name: "Unionaire",          logoUrl: "/assets/Brands/union aire Logo.png" },
  { _id: "brand-tornado",           name: "Tornado",            logoUrl: "/assets/Brands/Tornado.png" },
  { _id: "brand-midea",             name: "Midea",              logoUrl: "/assets/Brands/media.png" },
  { _id: "brand-white-westinghouse",name: "White Westinghouse", logoUrl: "/assets/Brands/White Westinghouse.png" },
  { _id: "brand-panasonic",         name: "Panasonic",          logoUrl: "/assets/Brands/Panasonic.png" },
  { _id: "brand-beko",              name: "Beko",               logoUrl: "/assets/Brands/Beko.png" },
  { _id: "brand-zanussi",           name: "Zanussi",            logoUrl: "/assets/Brands/Zanussi.png" },
  { _id: "brand-electrolux",        name: "Electrolux",         logoUrl: "/assets/Brands/Electrolux.png" },
  { _id: "brand-indesit",           name: "Indesit",            logoUrl: "/assets/Brands/Indesit.png" },
  { _id: "brand-whirlpool",         name: "Whirlpool",          logoUrl: "/assets/Brands/Whirlpool.png" },
  { _id: "brand-ge",                name: "GE",                 logoUrl: "/assets/Brands/GE.png" },
  { _id: "brand-white-whale",       name: "White Whale",        logoUrl: "/assets/Brands/White Whale.png" },
  { _id: "brand-white-point",       name: "White Point",        logoUrl: "/assets/Brands/White Point.png" },
  { _id: "brand-electrostar",       name: "Electrostar",        logoUrl: "/assets/Brands/Electrostar.png" },
  { _id: "brand-siemens",           name: "Siemens",            logoUrl: "/assets/Brands/Siemens.png" },
  { _id: "brand-hitachi",           name: "Hitachi",            logoUrl: "/assets/Brands/hitachi logo.png" },
  { _id: "brand-fagor",             name: "Fagor",              logoUrl: "/assets/Brands/fagor logo.png" },
  { _id: "brand-hoover",            name: "Hoover",             logoUrl: "/assets/Brands/Hoover.png" },
  { _id: "brand-ariston",           name: "Ariston",            logoUrl: "/assets/Brands/Ariston.png" },
  { _id: "brand-daewoo",            name: "Daewoo",             logoUrl: "/assets/Brands/DAEWOO.png" },
  { _id: "brand-kelvinator",        name: "Kelvinator",         logoUrl: "/assets/Brands/kelvinator.png" },
  { _id: "brand-siltal",            name: "Siltal",             logoUrl: "/assets/Brands/siltal.png" },
  { _id: "brand-westinghouse",      name: "Westinghouse",       logoUrl: "/assets/Brands/westinghouse.png" },
  { _id: "brand-frigidaire",        name: "Frigidaire",         logoUrl: "/assets/Brands/Frigidaire.png" },
  { _id: "brand-alaska",            name: "Alaska",             logoUrl: "/assets/Brands/Alaska.png" },
  { _id: "brand-candy",             name: "Candy",              logoUrl: "/assets/Brands/candy.png" },
  { _id: "brand-admiral",           name: "Admiral",            logoUrl: "/assets/Brands/admiral.png" },
  { _id: "brand-haier",             name: "Haier",              logoUrl: "/assets/Brands/Haier.png" },
  { _id: "brand-hisense",           name: "Hisense",            logoUrl: "/assets/Brands/Hisense.png" },
];

export const fallbackServices = [
  {
    _id: "service-fridge",
    title: "صيانة الثلاجات",
    description: "الثلاجة مش بتبرد\nصوت الموتور عالي\nتجمع جليد زيادة\nمشكلة الترموستات\nتسريب فريون",
    imageUrl: "/assets/Products/refrigerator.png",
  },
  {
    _id: "service-washer",
    title: "صيانة الغسالات",
    description: "الغسالة مش بتشتغل\nطبلة مش بتدور\nمشكلة في التصريف\nتسريب ماء\nضوضاء أثناء التشغيل",
    imageUrl: "/assets/Products/Washer.png",
  },
  {
    _id: "service-freezer",
    title: "صيانة ديب فريزر",
    description: "الفريزر مش بيجمد\nارتفاع درجة الحرارة\nمشكلة في الكمبريسور\nالباب مش بيقفل\nتسريب غاز فريون",
    imageUrl: "/assets/Products/Chest Freezer.png",
  },
  {
    _id: "service-ac",
    title: "صيانة التكييفات",
    description: "التكييف مش بيبرد\nضعف الهواء\nشحن فريون\nصيانة دورية وتنظيف\nمشكلة الريموت",
    imageUrl: "/assets/Products/conditioning.png",
  },
  {
    _id: "service-dishwasher",
    title: "صيانة غسالات الأطباق",
    description: "غسالة أطباق مش بتنظف\nمشكلة تصريف المياه\nتسريب مياه من الغسالة\nأصوات غريبة أثناء التشغيل\nعطل في طلمبة المياه",
    imageUrl: "/assets/Products/Dishwasher.png",
  },
  {
    _id: "service-cooker",
    title: "صيانة بوتاجازات",
    description: "الشعلات لا تعمل\nتسرب غاز خفيف\nفرن البوتاجاز لا يعمل\nمفاتيح البوتاجاز ثقيلة\nمشكلة بالإشعال الذاتي",
    imageUrl: "/assets/Products/Gas Cooker.png",
  },
];

export const fallbackFaqs = [
  {
    _id: "faq-home-service",
    question: "هل تقدمون خدمة الصيانة بالمنزل بالكامل؟",
    answer: "نعم، جميع أعمال الفحص والصيانة تتم داخل منزلك تماماً دون الحاجة لنقل الجهاز، حفاظاً عليه من الخدوش والتلف وتوفيراً للوقت والجهد.",
  },
  {
    _id: "faq-parts",
    question: "هل قطع الغيار المستخدمة أصلية؟",
    answer: "بالتأكيد، لا نستخدم سوى قطع الغيار الأصلية المعتمدة والمعبأة في عبواتها الأصلية والواردة من بلد المنشأ مباشرة، مع منحك ضمان معتمد ومكتوب عليها.",
  },
  {
    _id: "faq-warranty",
    question: "ما هي مدة الضمان التي يحصل عليها العميل؟",
    answer: "تتراوح مدة الضمان بين 3 إلى 12 شهراً بناءً على نوع الصيانة وقطع الغيار المستبدلة، ويكون الضمان مكتوباً وموثقاً بفاتورة الشركة الرسمية.",
  },
  {
    _id: "faq-price",
    question: "كيف يتم احتساب تكلفة الصيانة والتشخيص؟",
    answer: "فحص وتشخيص الأعطال وتحديد تكلفة قطع الغيار مجاني تماماً في حال إتمام عملية الإصلاح معنا. في حالة الفحص فقط وعدم الرغبة في الإصلاح، يتم سداد رسوم فحص رمزية فقط.",
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
