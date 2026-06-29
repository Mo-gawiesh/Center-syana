import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { checkRole } from "./auth";

// Public Query: Get company metadata by slug
export const getCompanyBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("companies")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

// Admin Query: List all companies (Super Admin only)
export const listCompanies = query({
  args: {},
  handler: async (ctx) => {
    await checkRole(ctx, ["super_admin"]);
    return await ctx.db.query("companies").collect();
  },
});

// Admin Mutation: Create a company
export const createCompany = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    // Only super admin can create new company tenants in the SaaS
    // (If the database is empty, we can bypass this check to seed the first user)
    const emptyDb = (await ctx.db.query("users").first()) === null;
    if (!emptyDb) {
      await checkRole(ctx, ["super_admin"]);
    }

    // Check if slug is unique
    const existing = await ctx.db
      .query("companies")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();

    if (existing) {
      throw new Error("Company slug already exists");
    }

    const companyId = await ctx.db.insert("companies", {
      name: args.name,
      slug: args.slug,
    });

    return companyId;
  },
});
