import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { checkRole, logAction } from "./auth";

export const listServicesAdmin = query({
  args: { companyId: v.id("companies") },
  handler: async (ctx, args) => {
    await checkRole(ctx, ["super_admin", "admin", "editor"]);
    return await ctx.db
      .query("services")
      .withIndex("by_company_status", (q) => q.eq("companyId", args.companyId))
      .collect();
  },
});

export const createService = mutation({
  args: {
    companyId: v.id("companies"),
    title: v.string(),
    description: v.string(),
    icon: v.optional(v.string()),
    imageMediaId: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    order: v.optional(v.number()),
    status: v.string(), // "draft" | "published"
  },
  handler: async (ctx, args) => {
    const { clerkUserId } = await checkRole(ctx, ["super_admin", "admin", "editor"]);
    
    const serviceId = await ctx.db.insert("services", {
      companyId: args.companyId,
      title: args.title,
      description: args.description,
      icon: args.icon,
      imageMediaId: args.imageMediaId,
      imageUrl: args.imageUrl,
      order: args.order,
      status: args.status,
    });

    await logAction(ctx, {
      userId: clerkUserId,
      companyId: args.companyId,
      action: "create",
      entity: "services",
      entityId: serviceId,
      newData: args,
    });

    return serviceId;
  },
});

export const updateService = mutation({
  args: {
    serviceId: v.id("services"),
    title: v.string(),
    description: v.string(),
    icon: v.optional(v.string()),
    imageMediaId: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    order: v.optional(v.number()),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const { clerkUserId } = await checkRole(ctx, ["super_admin", "admin", "editor"]);
    
    const existing = await ctx.db.get(args.serviceId);
    if (!existing) {
      throw new Error("Service not found");
    }

    const { serviceId, ...updateData } = args;
    await ctx.db.patch(serviceId, updateData);

    await logAction(ctx, {
      userId: clerkUserId,
      companyId: existing.companyId,
      action: "update",
      entity: "services",
      entityId: serviceId,
      oldData: existing,
      newData: updateData,
    });

    return serviceId;
  },
});

export const deleteService = mutation({
  args: {
    serviceId: v.id("services"),
  },
  handler: async (ctx, args) => {
    const { clerkUserId } = await checkRole(ctx, ["super_admin", "admin"]);
    
    const existing = await ctx.db.get(args.serviceId);
    if (!existing) {
      throw new Error("Service not found");
    }

    await ctx.db.delete(args.serviceId);

    await logAction(ctx, {
      userId: clerkUserId,
      companyId: existing.companyId,
      action: "delete",
      entity: "services",
      entityId: args.serviceId,
      oldData: existing,
    });

    return args.serviceId;
  },
});

export const getServicesPublic = query({
  args: { companyId: v.id("companies"), status: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("services")
      .withIndex("by_company_status", (q) =>
        q.eq("companyId", args.companyId).eq("status", args.status)
      )
      .collect();
  },
});

