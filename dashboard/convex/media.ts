import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { checkRole, logAction } from "./auth";

// Query to list all media items for a company
export const listMedia = query({
  args: {
    companyId: v.id("companies"),
    folder: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await checkRole(ctx, ["super_admin", "admin", "editor"]);

    let query = ctx.db
      .query("media")
      .withIndex("by_company", (q) => q.eq("companyId", args.companyId))
      .order("desc");

    const mediaList = await query.collect();

    if (args.folder) {
      return mediaList.filter((m) => m.folder === args.folder);
    }

    return mediaList;
  },
});

// Mutation to generate a secure file upload URL
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    await checkRole(ctx, ["super_admin", "admin"]);
    return await ctx.storage.generateUploadUrl();
  },
});

// Mutation to save an uploaded file entry in the database
export const saveMedia = mutation({
  args: {
    companyId: v.id("companies"),
    storageId: v.string(), // Convex Storage ID
    type: v.string(),      // Mime type (e.g. image/png)
    folder: v.optional(v.string()),
    alt: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { clerkUserId } = await checkRole(ctx, ["super_admin", "admin"]);

    // Resolve public URL for the stored file
    const url = await ctx.storage.getUrl(args.storageId);
    if (!url) {
      throw new Error("Failed to generate file URL from storage");
    }

    const mediaData = {
      companyId: args.companyId,
      storageId: args.storageId,
      url,
      type: args.type,
      folder: args.folder || "general",
      alt: args.alt || "",
      createdAt: Date.now(),
    };

    const mediaId = await ctx.db.insert("media", mediaData);

    await logAction(ctx, {
      userId: clerkUserId,
      companyId: args.companyId,
      action: "create",
      entity: "media",
      entityId: mediaId,
      newData: mediaData,
    });

    return mediaId;
  },
});

// Mutation to delete file from DB and storage
export const deleteMedia = mutation({
  args: {
    mediaId: v.id("media"),
  },
  handler: async (ctx, args) => {
    const { clerkUserId } = await checkRole(ctx, ["super_admin", "admin"]);

    const mediaItem = await ctx.db.get(args.mediaId);
    if (!mediaItem) {
      throw new Error("Media item not found");
    }

    // Delete from Convex File Storage
    await ctx.storage.delete(mediaItem.storageId);

    // Delete database entry
    await ctx.db.delete(args.mediaId);

    await logAction(ctx, {
      userId: clerkUserId,
      companyId: mediaItem.companyId,
      action: "delete",
      entity: "media",
      entityId: args.mediaId,
      oldData: mediaItem,
    });

    return args.mediaId;
  },
});
