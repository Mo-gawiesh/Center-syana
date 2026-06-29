import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { checkRole, logAction } from "./auth";

export const listTestimonialsAdmin = query({
  args: { companyId: v.id("companies") },
  handler: async (ctx, args) => {
    await checkRole(ctx, ["super_admin", "admin", "editor"]);
    return await ctx.db
      .query("testimonials")
      .withIndex("by_company_status", (q) => q.eq("companyId", args.companyId))
      .collect();
  },
});

export const createTestimonial = mutation({
  args: {
    companyId: v.id("companies"),
    name: v.string(),
    role: v.optional(v.string()),
    content: v.string(),
    rating: v.number(),
    order: v.optional(v.number()),
    status: v.string(), // "draft" | "published"
  },
  handler: async (ctx, args) => {
    const { clerkUserId } = await checkRole(ctx, ["super_admin", "admin", "editor"]);
    
    const testimonialId = await ctx.db.insert("testimonials", {
      companyId: args.companyId,
      name: args.name,
      role: args.role,
      content: args.content,
      rating: args.rating,
      order: args.order,
      status: args.status,
    });

    await logAction(ctx, {
      userId: clerkUserId,
      companyId: args.companyId,
      action: "create",
      entity: "testimonials",
      entityId: testimonialId,
      newData: args,
    });

    return testimonialId;
  },
});

export const updateTestimonial = mutation({
  args: {
    testimonialId: v.id("testimonials"),
    name: v.string(),
    role: v.optional(v.string()),
    content: v.string(),
    rating: v.number(),
    order: v.optional(v.number()),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const { clerkUserId } = await checkRole(ctx, ["super_admin", "admin", "editor"]);
    
    const existing = await ctx.db.get(args.testimonialId);
    if (!existing) {
      throw new Error("Testimonial not found");
    }

    const { testimonialId, ...updateData } = args;
    await ctx.db.patch(testimonialId, updateData);

    await logAction(ctx, {
      userId: clerkUserId,
      companyId: existing.companyId,
      action: "update",
      entity: "testimonials",
      entityId: testimonialId,
      oldData: existing,
      newData: updateData,
    });

    return testimonialId;
  },
});

export const deleteTestimonial = mutation({
  args: {
    testimonialId: v.id("testimonials"),
  },
  handler: async (ctx, args) => {
    const { clerkUserId } = await checkRole(ctx, ["super_admin", "admin"]);
    
    const existing = await ctx.db.get(args.testimonialId);
    if (!existing) {
      throw new Error("Testimonial not found");
    }

    await ctx.db.delete(args.testimonialId);

    await logAction(ctx, {
      userId: clerkUserId,
      companyId: existing.companyId,
      action: "delete",
      entity: "testimonials",
      entityId: args.testimonialId,
      oldData: existing,
    });

    return args.testimonialId;
  },
});

export const getTestimonialsPublic = query({
  args: { companyId: v.id("companies"), status: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("testimonials")
      .withIndex("by_company_status", (q) =>
        q.eq("companyId", args.companyId).eq("status", args.status)
      )
      .collect();
  },
});

