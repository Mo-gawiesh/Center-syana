import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  companies: defineTable({
    name: v.string(),
    slug: v.string(), // unique slug, e.g., "center-syana"
  }).index("by_slug", ["slug"]),

  settings: defineTable({
    companyId: v.id("companies"),
    status: v.string(), // "draft" | "published"
    general: v.object({
      companyName: v.string(),
      description: v.string(),
      logoMediaId: v.optional(v.string()), // refers to media.storageId or id
    }),
    contact: v.object({
      phone: v.string(),
      hotline: v.string(),
      address: v.string(),
      workingHours: v.string(),
    }),
    homepage: v.object({
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
    }),
    social: v.object({
      whatsapp: v.string(),
      facebook: v.string(),
      instagram: v.string(),
    }),
    seo: v.object({
      metaTitle: v.string(),
      metaDescription: v.string(),
      keywords: v.array(v.string()),
    }),
    theme: v.object({
      primaryColor: v.string(),
      secondaryColor: v.string(),
      font: v.string(),
    }),
    updatedAt: v.number(),
  }).index("by_company_status", ["companyId", "status"]),

  media: defineTable({
    companyId: v.id("companies"),
    storageId: v.string(), // Convex Storage ID
    url: v.string(),       // Resolved HTTPS URL
    type: v.string(),      // Mime-type
    folder: v.optional(v.string()), // "general", "hero", "brands"
    alt: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_company", ["companyId"]),

  auditLogs: defineTable({
    userId: v.string(), // Clerk User ID
    companyId: v.id("companies"),
    action: v.string(), // "create" | "update" | "delete" | "publish"
    entity: v.string(), // e.g. "settings", "repairRequests", "media"
    entityId: v.string(), // Document ID
    oldData: v.optional(v.any()),
    newData: v.optional(v.any()),
    createdAt: v.number(),
  }).index("by_company", ["companyId"]),

  repairRequests: defineTable({
    companyId: v.id("companies"),
    name: v.string(),
    phone: v.string(),
    location: v.string(),
    appliance: v.string(),
    status: v.string(), // "pending" | "in_progress" | "completed" | "cancelled"
    createdAt: v.number(),
  }).index("by_company", ["companyId"]),

  users: defineTable({
    clerkUserId: v.string(),
    companyId: v.id("companies"),
    role: v.string(), // "super_admin" | "admin" | "editor"
  })
    .index("by_clerkUserId", ["clerkUserId"])
    .index("by_company_clerkUserId", ["companyId", "clerkUserId"]),
});
