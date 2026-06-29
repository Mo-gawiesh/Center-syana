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

    return { success: true, companyId };
  },
});
