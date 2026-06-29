import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { checkRole, logAction } from "./auth";

export const listBrandsAdmin = query({
  args: { companyId: v.id("companies") },
  handler: async (ctx, args) => {
    await checkRole(ctx, ["super_admin", "admin", "editor"]);
    return await ctx.db
      .query("brands")
      .withIndex("by_company_status", (q) => q.eq("companyId", args.companyId))
      .collect();
  },
});

export const createBrand = mutation({
  args: {
    companyId: v.id("companies"),
    name: v.string(),
    logoMediaId: v.optional(v.string()),
    logoUrl: v.optional(v.string()),
    order: v.optional(v.number()),
    status: v.string(), // "draft" | "published"
  },
  handler: async (ctx, args) => {
    const { clerkUserId } = await checkRole(ctx, ["super_admin", "admin", "editor"]);
    
    const brandId = await ctx.db.insert("brands", {
      companyId: args.companyId,
      name: args.name,
      logoMediaId: args.logoMediaId,
      logoUrl: args.logoUrl,
      order: args.order,
      status: args.status,
    });

    await logAction(ctx, {
      userId: clerkUserId,
      companyId: args.companyId,
      action: "create",
      entity: "brands",
      entityId: brandId,
      newData: args,
    });

    return brandId;
  },
});

export const updateBrand = mutation({
  args: {
    brandId: v.id("brands"),
    name: v.string(),
    logoMediaId: v.optional(v.string()),
    logoUrl: v.optional(v.string()),
    order: v.optional(v.number()),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const { clerkUserId } = await checkRole(ctx, ["super_admin", "admin", "editor"]);
    
    const existing = await ctx.db.get(args.brandId);
    if (!existing) {
      throw new Error("Brand not found");
    }

    const { brandId, ...updateData } = args;
    await ctx.db.patch(brandId, updateData);

    await logAction(ctx, {
      userId: clerkUserId,
      companyId: existing.companyId,
      action: "update",
      entity: "brands",
      entityId: brandId,
      oldData: existing,
      newData: updateData,
    });

    return brandId;
  },
});

export const deleteBrand = mutation({
  args: {
    brandId: v.id("brands"),
  },
  handler: async (ctx, args) => {
    const { clerkUserId } = await checkRole(ctx, ["super_admin", "admin"]);
    
    const existing = await ctx.db.get(args.brandId);
    if (!existing) {
      throw new Error("Brand not found");
    }

    await ctx.db.delete(args.brandId);

    await logAction(ctx, {
      userId: clerkUserId,
      companyId: existing.companyId,
      action: "delete",
      entity: "brands",
      entityId: args.brandId,
      oldData: existing,
    });

    return args.brandId;
  },
});

export const getBrandsPublic = query({
  args: { companyId: v.id("companies"), status: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("brands")
      .withIndex("by_company_status", (q) =>
        q.eq("companyId", args.companyId).eq("status", args.status)
      )
      .collect();
  },
});

