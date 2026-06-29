import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { checkRole, logAction } from "./auth";

// Public check for the current user's role (called on dashboard load)
export const currentUserRole = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", identity.subject))
      .unique();

    if (!user) return null;

    // Load company details as well
    const company = await ctx.db.get(user.companyId);

    return {
      role: user.role,
      companyId: user.companyId,
      companyName: company?.name || "",
      companySlug: company?.slug || "",
      clerkUserId: user.clerkUserId,
    };
  },
});

// Admin Query: List users in a company
export const listUsers = query({
  args: { companyId: v.id("companies") },
  handler: async (ctx, args) => {
    await checkRole(ctx, ["super_admin", "admin"]);
    return await ctx.db
      .query("users")
      .withIndex("by_company_clerkUserId", (q) => q.eq("companyId", args.companyId))
      .collect();
  },
});

// Super Admin Mutation: Add user role
export const addUser = mutation({
  args: {
    companyId: v.id("companies"),
    clerkUserId: v.string(),
    role: v.string(), // "super_admin" | "admin" | "editor"
  },
  handler: async (ctx, args) => {
    const { clerkUserId } = await checkRole(ctx, ["super_admin"]);

    // Check if user already exists
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", args.clerkUserId))
      .unique();

    if (existing) {
      throw new Error("User already assigned a role");
    }

    const userData = {
      clerkUserId: args.clerkUserId,
      companyId: args.companyId,
      role: args.role,
    };

    const userId = await ctx.db.insert("users", userData);

    await logAction(ctx, {
      userId: clerkUserId,
      companyId: args.companyId,
      action: "create",
      entity: "users",
      entityId: userId,
      newData: userData,
    });

    return userId;
  },
});

// Super Admin Mutation: Update user role
export const updateUserRole = mutation({
  args: {
    userId: v.id("users"),
    role: v.string(), // "super_admin" | "admin" | "editor"
  },
  handler: async (ctx, args) => {
    const { clerkUserId } = await checkRole(ctx, ["super_admin"]);

    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new Error("User not found");
    }

    const oldRole = user.role;
    await ctx.db.patch(args.userId, { role: args.role });

    await logAction(ctx, {
      userId: clerkUserId,
      companyId: user.companyId,
      action: "update",
      entity: "users",
      entityId: args.userId,
      oldData: { role: oldRole },
      newData: { role: args.role },
    });

    return args.userId;
  },
});

// Super Admin Mutation: Delete user
export const deleteUser = mutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const { clerkUserId } = await checkRole(ctx, ["super_admin"]);

    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.delete(args.userId);

    await logAction(ctx, {
      userId: clerkUserId,
      companyId: user.companyId,
      action: "delete",
      entity: "users",
      entityId: args.userId,
      oldData: user,
    });

    return args.userId;
  },
});

// Mutation to bootstrap the very first user as super_admin linked to center-syana
export const bootstrapUser = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated");
    }

    // Check if the users table is completely empty
    const firstUser = await ctx.db.query("users").first();
    if (firstUser) {
      // If table is NOT empty, we check if this specific user already has a role
      const existing = await ctx.db
        .query("users")
        .withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", identity.subject))
        .unique();
      if (existing) {
        return { success: false, reason: "Already registered", user: existing };
      }
      throw new Error("Database already bootstrapped. Ask a Super Admin to add you.");
    }

    // Resolve center-syana company
    const company = await ctx.db
      .query("companies")
      .withIndex("by_slug", (q) => q.eq("slug", "center-syana"))
      .unique();

    if (!company) {
      throw new Error("Company 'center-syana' not found. Please run seedDatabase first.");
    }

    const userData = {
      clerkUserId: identity.subject,
      companyId: company._id,
      role: "super_admin",
    };

    const userId = await ctx.db.insert("users", userData);

    await logAction(ctx, {
      userId: identity.subject,
      companyId: company._id,
      action: "create",
      entity: "users",
      entityId: userId,
      newData: userData,
    });

    return { success: true, user: userData };
  },
});

