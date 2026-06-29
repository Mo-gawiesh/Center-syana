import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { checkRole, logAction } from "./auth";

export const listFaqsAdmin = query({
  args: { companyId: v.id("companies") },
  handler: async (ctx, args) => {
    await checkRole(ctx, ["super_admin", "admin", "editor"]);
    return await ctx.db
      .query("faqs")
      .withIndex("by_company_status", (q) => q.eq("companyId", args.companyId))
      .collect();
  },
});

export const createFaq = mutation({
  args: {
    companyId: v.id("companies"),
    question: v.string(),
    answer: v.string(),
    order: v.optional(v.number()),
    status: v.string(), // "draft" | "published"
  },
  handler: async (ctx, args) => {
    const { clerkUserId } = await checkRole(ctx, ["super_admin", "admin", "editor"]);
    
    const faqId = await ctx.db.insert("faqs", {
      companyId: args.companyId,
      question: args.question,
      answer: args.answer,
      order: args.order,
      status: args.status,
    });

    await logAction(ctx, {
      userId: clerkUserId,
      companyId: args.companyId,
      action: "create",
      entity: "faqs",
      entityId: faqId,
      newData: args,
    });

    return faqId;
  },
});

export const updateFaq = mutation({
  args: {
    faqId: v.id("faqs"),
    question: v.string(),
    answer: v.string(),
    order: v.optional(v.number()),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const { clerkUserId } = await checkRole(ctx, ["super_admin", "admin", "editor"]);
    
    const existing = await ctx.db.get(args.faqId);
    if (!existing) {
      throw new Error("FAQ not found");
    }

    const { faqId, ...updateData } = args;
    await ctx.db.patch(faqId, updateData);

    await logAction(ctx, {
      userId: clerkUserId,
      companyId: existing.companyId,
      action: "update",
      entity: "faqs",
      entityId: faqId,
      oldData: existing,
      newData: updateData,
    });

    return faqId;
  },
});

export const deleteFaq = mutation({
  args: {
    faqId: v.id("faqs"),
  },
  handler: async (ctx, args) => {
    const { clerkUserId } = await checkRole(ctx, ["super_admin", "admin"]);
    
    const existing = await ctx.db.get(args.faqId);
    if (!existing) {
      throw new Error("FAQ not found");
    }

    await ctx.db.delete(args.faqId);

    await logAction(ctx, {
      userId: clerkUserId,
      companyId: existing.companyId,
      action: "delete",
      entity: "faqs",
      entityId: args.faqId,
      oldData: existing,
    });

    return args.faqId;
  },
});

export const getFaqsPublic = query({
  args: { companyId: v.id("companies"), status: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("faqs")
      .withIndex("by_company_status", (q) =>
        q.eq("companyId", args.companyId).eq("status", args.status)
      )
      .collect();
  },
});

