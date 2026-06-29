import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { checkRole, logAction } from "./auth";

// Schema objects for validation
const generalSchema = v.object({
  companyName: v.string(),
  description: v.string(),
  logoMediaId: v.optional(v.string()),
});

const contactSchema = v.object({
  phone: v.string(),
  hotline: v.string(),
  address: v.string(),
  workingHours: v.string(),
});

const homepageSchema = v.object({
  heroTitle: v.string(),
  heroSubtitle: v.string(),
  heroImageMediaId: v.optional(v.string()),
  statistics: v.array(
    v.object({
      label: v.string(),
      value: v.string(),
      icon: v.string(),
    })
  ),
});

const socialSchema = v.object({
  whatsapp: v.string(),
  facebook: v.string(),
  instagram: v.string(),
});

const seoSchema = v.object({
  metaTitle: v.string(),
  metaDescription: v.string(),
  keywords: v.array(v.string()),
});

const themeSchema = v.object({
  primaryColor: v.string(),
  secondaryColor: v.string(),
  font: v.string(),
});

// Admin Query to get draft settings
export const getDraftSettings = query({
  args: { companyId: v.id("companies") },
  handler: async (ctx, args) => {
    await checkRole(ctx, ["super_admin", "admin", "editor"]);
    return await ctx.db
      .query("settings")
      .withIndex("by_company_status", (q) =>
        q.eq("companyId", args.companyId).eq("status", "draft")
      )
      .unique();
  },
});

// Admin Query to get published settings
export const getPublishedSettings = query({
  args: { companyId: v.id("companies") },
  handler: async (ctx, args) => {
    await checkRole(ctx, ["super_admin", "admin", "editor"]);
    return await ctx.db
      .query("settings")
      .withIndex("by_company_status", (q) =>
        q.eq("companyId", args.companyId).eq("status", "published")
      )
      .unique();
  },
});

// Admin Mutation to save draft settings
export const updateDraftSettings = mutation({
  args: {
    companyId: v.id("companies"),
    general: generalSchema,
    contact: contactSchema,
    homepage: homepageSchema,
    social: socialSchema,
    seo: seoSchema,
    theme: themeSchema,
  },
  handler: async (ctx, args) => {
    const { clerkUserId } = await checkRole(ctx, ["super_admin", "admin", "editor"]);

    const existingDraft = await ctx.db
      .query("settings")
      .withIndex("by_company_status", (q) =>
        q.eq("companyId", args.companyId).eq("status", "draft")
      )
      .unique();

    const newSettingsData = {
      companyId: args.companyId,
      status: "draft",
      general: args.general,
      contact: args.contact,
      homepage: args.homepage,
      social: args.social,
      seo: args.seo,
      theme: args.theme,
      updatedAt: Date.now(),
    };

    let settingsId;
    let oldData = null;

    if (existingDraft) {
      settingsId = existingDraft._id;
      oldData = existingDraft;
      await ctx.db.patch(existingDraft._id, newSettingsData);
    } else {
      settingsId = await ctx.db.insert("settings", newSettingsData);
    }

    await logAction(ctx, {
      userId: clerkUserId,
      companyId: args.companyId,
      action: "update",
      entity: "settings",
      entityId: settingsId,
      oldData,
      newData: newSettingsData,
    });

    return settingsId;
  },
});

// Admin Mutation to publish settings
export const publishSettings = mutation({
  args: { companyId: v.id("companies") },
  handler: async (ctx, args) => {
    const { clerkUserId } = await checkRole(ctx, ["super_admin", "admin"]);

    // Get the draft settings
    const draft = await ctx.db
      .query("settings")
      .withIndex("by_company_status", (q) =>
        q.eq("companyId", args.companyId).eq("status", "draft")
      )
      .unique();

    if (!draft) {
      throw new Error("No draft settings found to publish.");
    }

    // Get existing published settings
    const published = await ctx.db
      .query("settings")
      .withIndex("by_company_status", (q) =>
        q.eq("companyId", args.companyId).eq("status", "published")
      )
      .unique();

    const publishedData = {
      companyId: args.companyId,
      status: "published",
      general: draft.general,
      contact: draft.contact,
      homepage: draft.homepage,
      social: draft.social,
      seo: draft.seo,
      theme: draft.theme,
      updatedAt: Date.now(),
    };

    let publishedId;
    if (published) {
      publishedId = published._id;
      await ctx.db.patch(published._id, publishedData);
    } else {
      publishedId = await ctx.db.insert("settings", publishedData);
    }

    await logAction(ctx, {
      userId: clerkUserId,
      companyId: args.companyId,
      action: "publish",
      entity: "settings",
      entityId: publishedId,
      oldData: published || null,
      newData: publishedData,
    });

    return publishedId;
  },
});

// Public Query: Fetch settings without RBAC check (used by public API HTTP Action)
export const getSettingsPublic = query({
  args: { companyId: v.id("companies"), status: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("settings")
      .withIndex("by_company_status", (q) =>
        q.eq("companyId", args.companyId).eq("status", args.status)
      )
      .unique();
  },
});

