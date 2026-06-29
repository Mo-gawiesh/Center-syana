import { QueryCtx } from "./_generated/server";

export async function checkRole(ctx: QueryCtx, allowedRoles: ("super_admin" | "admin" | "editor")[]) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Unauthenticated. Please sign in.");
  }
  
  const clerkUserId = identity.subject;
  const user = await ctx.db
    .query("users")
    .withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", clerkUserId))
    .unique();
    
  if (!user || !allowedRoles.includes(user.role as any)) {
    throw new Error(`Unauthorized. Required role: ${allowedRoles.join(" or ")}`);
  }
  return { user, clerkUserId };
}

// Log audit actions to database
export async function logAction(
  ctx: any,
  params: {
    userId: string;
    companyId: any;
    action: "create" | "update" | "delete" | "publish";
    entity: string;
    entityId: string;
    oldData?: any;
    newData?: any;
  }
) {
  await ctx.db.insert("auditLogs", {
    userId: params.userId,
    companyId: params.companyId,
    action: params.action,
    entity: params.entity,
    entityId: params.entityId,
    oldData: params.oldData,
    newData: params.newData,
    createdAt: Date.now(),
  });
}
