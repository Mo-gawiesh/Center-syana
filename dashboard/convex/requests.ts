import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { checkRole, logAction } from "./auth";

// Query to list repair requests for a company (with filtering/search)
export const listRequests = query({
  args: {
    companyId: v.id("companies"),
    status: v.optional(v.string()), // Filter by status
    search: v.optional(v.string()), // Search name or phone
  },
  handler: async (ctx, args) => {
    await checkRole(ctx, ["super_admin", "admin", "editor"]);

    let requests = await ctx.db
      .query("repairRequests")
      .withIndex("by_company", (q) => q.eq("companyId", args.companyId))
      .order("desc")
      .collect();

    // Filter by status if provided
    if (args.status) {
      requests = requests.filter((r) => r.status === args.status);
    }

    // Filter by search query if provided
    if (args.search) {
      const searchLower = args.search.toLowerCase();
      requests = requests.filter(
        (r) =>
          r.name.toLowerCase().includes(searchLower) ||
          r.phone.includes(searchLower) ||
          r.location.toLowerCase().includes(searchLower) ||
          r.appliance.toLowerCase().includes(searchLower)
      );
    }

    return requests;
  },
});

// Mutation to update request status (needs editor, admin, or super_admin)
export const updateRequestStatus = mutation({
  args: {
    requestId: v.id("repairRequests"),
    status: v.string(), // "pending" | "in_progress" | "completed" | "cancelled"
  },
  handler: async (ctx, args) => {
    const { clerkUserId } = await checkRole(ctx, ["super_admin", "admin", "editor"]);

    const request = await ctx.db.get(args.requestId);
    if (!request) {
      throw new Error("Repair request not found");
    }

    const oldStatus = request.status;
    await ctx.db.patch(args.requestId, { status: args.status });

    await logAction(ctx, {
      userId: clerkUserId,
      companyId: request.companyId,
      action: "update",
      entity: "repairRequests",
      entityId: args.requestId,
      oldData: { status: oldStatus },
      newData: { status: args.status },
    });

    return request._id;
  },
});

// Mutation to delete a request (needs admin or super_admin)
export const deleteRequest = mutation({
  args: {
    requestId: v.id("repairRequests"),
  },
  handler: async (ctx, args) => {
    const { clerkUserId } = await checkRole(ctx, ["super_admin", "admin"]);

    const request = await ctx.db.get(args.requestId);
    if (!request) {
      throw new Error("Repair request not found");
    }

    await ctx.db.delete(args.requestId);

    await logAction(ctx, {
      userId: clerkUserId,
      companyId: request.companyId,
      action: "delete",
      entity: "repairRequests",
      entityId: args.requestId,
      oldData: request,
    });

    return request._id;
  },
});

// Public Mutation: Create a repair request without admin auth (used by public API HTTP Action)
export const createRequestPublic = mutation({
  args: {
    companyId: v.id("companies"),
    name: v.string(),
    phone: v.string(),
    location: v.string(),
    appliance: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("repairRequests", {
      companyId: args.companyId,
      name: args.name,
      phone: args.phone,
      location: args.location,
      appliance: args.appliance,
      status: "pending",
      createdAt: Date.now(),
    });
  },
});

