import { mutation } from "./_generated/server";

export const seedDatabase = mutation({
  args: {},
  handler: async (ctx) => {
    // 1. Create company if not exists
    let company = await ctx.db
      .query("companies")
      .withIndex("by_slug", (q) => q.eq("slug", "center-syana"))
      .unique();

    let companyId;
    if (!company) {
      companyId = await ctx.db.insert("companies", {
        name: "الهندسية للتوكيلات للصيانة",
        slug: "center-syana",
      });
    } else {
      companyId = company._id;
    }

    // 2. Default Seed Data matching the current static website content
    const defaultData = {
      companyId,
      general: {
        companyName: "الهندسية للتوكيلات للصيانة",
        description: "مركز صيانة معتمد لجميع أنواع الأجهزة المنزلية في مصر. نخدم القاهرة والجيزة والإسكندرية وجميع المحافظات.",
        logoMediaId: undefined,
      },
      contact: {
        phone: "01062842903",
        hotline: "16481",
        address: "المهندسين، الجيزة",
        workingHours: "السبت – الخميس: 9 ص – 10 م",
      },
      homepage: {
        heroTitle: "مركز الصيانة المعتمد للأجهزة المنزلية في مصر",
        heroSubtitle: "الهندسية للتوكيلات هي خيارك الأول لإصلاح وصيانة جميع الأجهزة المنزلية بضمان معتمد وبسرعة تصل إلى 3 ساعات.",
        heroImageMediaId: undefined,
        statistics: [
          { label: "عدد فروع الصيانة بالمحافظات", value: "28+", icon: "🏢" },
          { label: "عدد المهندسين بكافة الفروع", value: "640+", icon: "🔧" },
          { label: "فريق خدمة العملاء", value: "130+", icon: "🎧" },
        ],
      },
      social: {
        whatsapp: "201062842903",
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
      },
      seo: {
        metaTitle: "تواصل معنا - الهندسية للتوكيلات للصيانة | 16481",
        metaDescription: "مركز صيانة معتمد للأجهزة المنزلية في مصر. إصلاح ثلاجات، غسالات، تكييفات، ديب فريزر بضمان. خدمة 7 أيام - اتصل على 16481.",
        keywords: [
          "صيانة أجهزة منزلية",
          "صيانة ثلاجات",
          "صيانة غسالات",
          "صيانة تكييفات",
          "مركز صيانة معتمد",
          "16481",
        ],
      },
      theme: {
        primaryColor: "#10B981", // Emerald Green
        secondaryColor: "#059669",
        font: "Cairo",
      },
      updatedAt: Date.now(),
    };

    // 3. Create/Patch Draft Settings
    const existingDraft = await ctx.db
      .query("settings")
      .withIndex("by_company_status", (q) =>
        q.eq("companyId", companyId).eq("status", "draft")
      )
      .unique();

    if (!existingDraft) {
      await ctx.db.insert("settings", {
        ...defaultData,
        status: "draft",
      });
    }

    // 4. Create/Patch Published Settings
    const existingPublished = await ctx.db
      .query("settings")
      .withIndex("by_company_status", (q) =>
        q.eq("companyId", companyId).eq("status", "published")
      )
      .unique();

    if (!existingPublished) {
      await ctx.db.insert("settings", {
        ...defaultData,
        status: "published",
      });
    }

    // 5. Seed Brands
    const brandsToSeed = [
      { name: "LG", logoUrl: "assets/Brands/LG Logo.png", order: 1 },
      { name: "Bosch", logoUrl: "assets/Brands/bosch-logo-39982.png", order: 2 },
      { name: "Sharp", logoUrl: "assets/Brands/SHARP Logo.png", order: 3 },
      { name: "Samsung", logoUrl: "assets/Brands/samsung-logo-png-1286.png", order: 4 },
      { name: "Kiriazi", logoUrl: "assets/Brands/Kiriazi.png", order: 5 },
      { name: "Carrier", logoUrl: "assets/Brands/Carrier Logo.png", order: 6 },
      { name: "Toshiba", logoUrl: "assets/Brands/Toshiba.png", order: 7 },
      { name: "Fresh", logoUrl: "assets/Brands/Fresh.png", order: 8 },
      { name: "Unionaire", logoUrl: "assets/Brands/union aire Logo.png", order: 9 },
      { name: "Tornado", logoUrl: "assets/Brands/Tornado.png", order: 10 },
      { name: "Midea", logoUrl: "assets/Brands/media.png", order: 11 },
      { name: "White Westinghouse", logoUrl: "assets/Brands/White Westinghouse.png", order: 12 },
      { name: "Panasonic", logoUrl: "assets/Brands/Panasonic.png", order: 13 },
      { name: "Beko", logoUrl: "assets/Brands/Beko.png", order: 14 },
      { name: "Zanussi", logoUrl: "assets/Brands/Zanussi.png", order: 15 },
      { name: "Electrolux", logoUrl: "assets/Brands/Electrolux.png", order: 16 },
      { name: "Indesit", logoUrl: "assets/Brands/Indesit.png", order: 17 },
      { name: "Whirlpool", logoUrl: "assets/Brands/Whirlpool.png", order: 18 },
      { name: "General Electric", logoUrl: "assets/Brands/GE.png", order: 19 },
      { name: "White Whale", logoUrl: "assets/Brands/White Whale.png", order: 20 },
      { name: "White Point", logoUrl: "assets/Brands/White Point.png", order: 21 },
      { name: "Electrostar", logoUrl: "assets/Brands/Electrostar.png", order: 22 },
      { name: "Siemens", logoUrl: "assets/Brands/Siemens.png", order: 23 },
      { name: "Hitachi", logoUrl: "assets/Brands/hitachi logo.png", order: 24 },
      { name: "Fagor", logoUrl: "assets/Brands/fagor logo.png", order: 25 },
      { name: "Hoover", logoUrl: "assets/Brands/Hoover.png", order: 26 },
      { name: "Ariston", logoUrl: "assets/Brands/Ariston.png", order: 27 },
      { name: "Daewoo", logoUrl: "assets/Brands/DAEWOO.png", order: 28 },
      { name: "Kelvinator", logoUrl: "assets/Brands/kelvinator.png", order: 29 },
      { name: "Siltal", logoUrl: "assets/Brands/siltal.png", order: 30 },
      { name: "Westinghouse", logoUrl: "assets/Brands/westinghouse.png", order: 31 },
      { name: "Frigidaire", logoUrl: "assets/Brands/Frigidaire.png", order: 32 },
      { name: "Alaska", logoUrl: "assets/Brands/Alaska.png", order: 33 },
      { name: "Candy", logoUrl: "assets/Brands/candy.png", order: 34 },
      { name: "Admiral", logoUrl: "assets/Brands/admiral.png", order: 35 },
      { name: "Haier", logoUrl: "assets/Brands/Haier.png", order: 36 },
      { name: "Hisense", logoUrl: "assets/Brands/Hisense.png", order: 37 },
    ];

    const existingBrands = await ctx.db
      .query("brands")
      .withIndex("by_company_status", (q) => q.eq("companyId", companyId))
      .first();

    if (!existingBrands) {
      for (const brand of brandsToSeed) {
        await ctx.db.insert("brands", {
          companyId,
          name: brand.name,
          logoUrl: brand.logoUrl,
          order: brand.order,
          status: "published",
        });
        await ctx.db.insert("brands", {
          companyId,
          name: brand.name,
          logoUrl: brand.logoUrl,
          order: brand.order,
          status: "draft",
        });
      }
    }

    // 6. Seed Services
    const servicesToSeed = [
      {
        title: "صيانة الثلاجات",
        description: "خدمات صيانة متكاملة لجميع أنواع الثلاجات ونوفروست. شحن فريون، تغيير موتور، صيانة الترموستات، وتوفير قطع غيار أصلية بضمان معتمد.",
        imageUrl: "assets/Main photos/Repairing Refrigerator.jpeg",
        icon: "🔧",
        order: 1,
      },
      {
        title: "صيانة الغسالات",
        description: "إصلاح جميع أعطال الغسالات فوق أوتوماتيك وهاف أوتوماتيك. تغيير طبلة، طرمبة طرد المياه، إصلاح الكارتات الإلكترونية، وتركيب مساعدين أصليين.",
        imageUrl: "assets/Main photos/Repairing Washing Machine.jpeg",
        icon: "🔧",
        order: 2,
      },
      {
        title: "صيانة ديب فريزر",
        description: "صيانة ديب فريزر أفقي ورأسي. علاج مشاكل التبريد الضعيف وتراكم الثلج، وإصلاح الكومبريسور والترموستات وشحن الفريون بالمنزل.",
        imageUrl: "assets/Main photos/Diagnostic Visit.jpeg",
        icon: "🔧",
        order: 3,
      },
      {
        title: "صيانة التكييفات",
        description: "تنظيف وشحن فريون وصيانة تكييفات سبليت وشباك. إصلاح كارتة التكييف وعلاج تسريبات المياه وتوفير صيانة وقائية قبل الصيف.",
        imageUrl: "assets/Products/conditioning.png",
        icon: "🔧",
        order: 4,
      },
      {
        title: "صيانة غسالات أطباق",
        description: "إصلاح أعطال غسالات الأطباق لجميع الماركات. تنظيف رشاشات المياه، تغيير طرمبات وسخانات المياه، وحل مشكلة عدم تنظيف الصحون بشكل جيد.",
        imageUrl: "assets/Products/Dishwasher.png",
        icon: "🔧",
        order: 5,
      },
      {
        title: "صيانة سخانات وبوتاجازات",
        description: "صيانة سخانات الغاز والكهرباء وتغيير الهيتر والترموستات. تسليك عيون البوتاجاز وإصلاح الفرن وتغيير المحابس ومفاتيح الأمان.",
        imageUrl: "assets/Products/Gas Cooker.png",
        icon: "🔧",
        order: 6,
      },
    ];

    const existingServices = await ctx.db
      .query("services")
      .withIndex("by_company_status", (q) => q.eq("companyId", companyId))
      .first();

    if (!existingServices) {
      for (const service of servicesToSeed) {
        await ctx.db.insert("services", {
          companyId,
          title: service.title,
          description: service.description,
          imageUrl: service.imageUrl,
          icon: service.icon,
          order: service.order,
          status: "published",
        });
        await ctx.db.insert("services", {
          companyId,
          title: service.title,
          description: service.description,
          imageUrl: service.imageUrl,
          icon: service.icon,
          order: service.order,
          status: "draft",
        });
      }
    }

    // 7. Seed FAQs
    const faqsToSeed = [
      {
        question: "هل تقدمون خدمة الصيانة بالمنزل بالكامل؟",
        answer: "نعم، جميع أعمال الفحص والصيانة تتم داخل منزلك تماماً دون الحاجة لنقل الجهاز، حفاظاً عليه من الخدوش والتلف وتوفيراً للوقت والجهد.",
        order: 1,
      },
      {
        question: "هل قطع الغيار المستخدمة أصلية؟",
        answer: "بالتأكيد، لا نستخدم سوى قطع الغيار الأصلية المعتمدة والمعبأة في عبواتها الأصلية والواردة من بلد المنشأ مباشرة، مع منحك ضمان معتمد ومكتب عليها.",
        order: 2,
      },
      {
        question: "ما هي مدة الضمان التي يحصل عليها العميل؟",
        answer: "تتراوح مدة الضمان بين 3 إلى 12 شهراً بناءً على نوع الصيانة وقطع الغيار المستبدلة، ويكون الضمان مكتوباً وموثقاً بفاتورة الشركة الرسمية.",
        order: 3,
      },
      {
        question: "كيف يتم احتساب تكلفة الصيانة والتشخيص؟",
        answer: "فحص وتشخيص الأعطال وتحديد تكلفة قطع الغيار مجاني تماماً في حال إتمام عملية الإصلاح معنا. في حالة الفحص فقط وعدم الرغبة في الإصلاح، يتم سداد رسوم فحص رمزية فقط.",
        order: 4,
      },
    ];

    const existingFaqs = await ctx.db
      .query("faqs")
      .withIndex("by_company_status", (q) => q.eq("companyId", companyId))
      .first();

    if (!existingFaqs) {
      for (const faq of faqsToSeed) {
        await ctx.db.insert("faqs", {
          companyId,
          question: faq.question,
          answer: faq.answer,
          order: faq.order,
          status: "published",
        });
        await ctx.db.insert("faqs", {
          companyId,
          question: faq.question,
          answer: faq.answer,
          order: faq.order,
          status: "draft",
        });
      }
    }

    // 8. Seed Testimonials
    const testimonialsToSeed = [
      {
        name: "محمد إبراهيم",
        role: "المهندسين، الجيزة",
        content: "خدمة ممتازة جداً، المهندس وصل في أقل من ساعتين ومعاه كل الأدوات. عمل التشخيص في دقيقتين وصلح الثلاجة على طول. الأسعار معقولة وفيه فاتورة وضمان. بالتأكيد هتصلح عندهم تاني.",
        rating: 5,
        order: 1,
      },
      {
        name: "نادية سامي",
        role: "مدينة نصر، القاهرة",
        content: "كنت متردد في الأول بس بعد ما اتصلت بالخط الساخن لقيت الرد فوري والخدمة محترمة. المهندس جه وصلح الغسالة وشرحلي المشكلة بالتفصيل. ربنا يخليكم.",
        rating: 5,
        order: 2,
      },
    ];

    const existingTestimonials = await ctx.db
      .query("testimonials")
      .withIndex("by_company_status", (q) => q.eq("companyId", companyId))
      .first();

    if (!existingTestimonials) {
      for (const t of testimonialsToSeed) {
        await ctx.db.insert("testimonials", {
          companyId,
          name: t.name,
          role: t.role,
          content: t.content,
          rating: t.rating,
          order: t.order,
          status: "published",
        });
        await ctx.db.insert("testimonials", {
          companyId,
          name: t.name,
          role: t.role,
          content: t.content,
          rating: t.rating,
          order: t.order,
          status: "draft",
        });
      }
    }

    return { success: true, companyId };
  },
});
