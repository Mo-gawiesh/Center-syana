import { v } from "convex/values";
import { query } from "./_generated/server";
import { checkRole } from "./auth";

// Query to list audit logs for a company
export const listLogs = query({
  args: {
    companyId: v.id("companies"),
  },
  handler: async (ctx, args) => {
    await checkRole(ctx, ["super_admin", "admin"]);

    return await ctx.db
      .query("auditLogs")
      .withIndex("by_company", (q) => q.eq("companyId", args.companyId))
      .order("desc")
      .take(100); // return the latest 100 entries
  },
});
