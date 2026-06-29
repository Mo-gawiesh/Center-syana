"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";

export default function UsersPage() {
  const roleData = useQuery(api.users.currentUserRole);
  const usersList = useQuery(
    api.users.listUsers,
    roleData ? { companyId: roleData.companyId } : "skip"
  );

  const addUser = useMutation(api.users.addUser);
  const updateUserRole = useMutation(api.users.updateUserRole);
  const deleteUser = useMutation(api.users.deleteUser);

  const [newClerkUserId, setNewClerkUserId] = useState("");
  const [newRole, setNewRole] = useState("editor");

  const [submitting, setSubmitting] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  if (roleData === undefined || usersList === undefined) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  if (roleData === null) {
    return null;
  }

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClerkUserId.trim() || !roleData) return;
    setSubmitting(true);

    try {
      await addUser({
        companyId: roleData.companyId,
        clerkUserId: newClerkUserId.trim(),
        role: newRole,
      });
      setNewClerkUserId("");
      alert("✓ تم إضافة المستخدم بنجاح.");
    } catch (err: any) {
      alert("خطأ أثناء إضافة المستخدم: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRoleChange = async (userId: any, role: string) => {
    setUpdatingId(userId);
    try {
      await updateUserRole({ userId, role });
    } catch (err: any) {
      alert("خطأ أثناء تعديل دور المستخدم: " + err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (userId: any) => {
    if (!confirm("هل أنت متأكد من سحب الصلاحيات وحذف هذا المستخدم نهائياً؟")) return;
    try {
      await deleteUser({ userId });
    } catch (err: any) {
      alert("خطأ أثناء حذف المستخدم: " + err.message);
    }
  };

  const isSuperAdmin = roleData.role === "super_admin";

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-slate-100 mb-1">إدارة المديرين والمستخدمين</h2>
        <p className="text-slate-400 text-sm">منح صلاحيات وتحديد أدوار لوحة التحكم (مدير عام، مدير، محرر).</p>
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Add User panel */}
        <div className="rounded-2xl border border-slate-900 bg-slate-900/50 p-6 shadow-sm h-fit">
          <h3 className="text-base font-bold text-emerald-400 border-b border-slate-800 pb-2 mb-4">منح صلاحية لمستخدم جديد</h3>
          
          {!isSuperAdmin ? (
            <div className="rounded-lg bg-amber-500/10 p-4 text-amber-400 text-xs border border-amber-500/20 leading-relaxed">
              ⚠️ عذراً، يجب أن تكون **مدير عام (Super Admin)** لتستطيع إضافة مستخدمين أو تغيير أدوارهم.
            </div>
          ) : (
            <form onSubmit={handleAddUser} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-400 font-medium">معرف مستخدم Clerk (Clerk User ID)</label>
                <input
                  type="text"
                  placeholder="مثال: user_2..."
                  value={newClerkUserId}
                  onChange={(e) => setNewClerkUserId(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 focus:outline-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-400 font-medium">الدور / الصلاحية</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 focus:outline-none"
                >
                  <option value="editor">محرر (تحديث مسودات، استعراض طلبات الصيانة)</option>
                  <option value="admin">مدير (نشر تعديلات، إدارة ميديا، استعراض طلبات)</option>
                  <option value="super_admin">مدير عام (تحكم كامل بالنظام والمستخدمين)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50 transition"
              >
                {submitting ? "جاري الإضافة..." : "➕ إضافة الصلاحية"}
              </button>
            </form>
          )}
        </div>

        {/* Users List panel */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-900 bg-slate-900/50 p-6 shadow-sm">
          <h3 className="text-base font-bold text-emerald-400 border-b border-slate-800 pb-2 mb-4">المدراء الفعليين للمركز</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-medium">
                  <th className="pb-3 pr-2">معرف المستخدم (Clerk ID)</th>
                  <th className="pb-3">الصلاحية</th>
                  {isSuperAdmin && <th className="pb-3 pl-2">إجراءات</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {usersList.map((user) => (
                  <tr key={user._id} className="text-slate-300 hover:bg-slate-900/20">
                    <td className="py-4 pr-2 font-mono text-xs text-slate-400" title={user.clerkUserId}>
                      {user.clerkUserId}
                    </td>
                    <td className="py-4">
                      {isSuperAdmin && user.clerkUserId !== roleData.clerkUserId ? (
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user._id, e.target.value)}
                          disabled={updatingId === user._id}
                          className="rounded border border-slate-800 bg-slate-950 px-2 py-1 text-xs text-slate-100 focus:outline-none"
                        >
                          <option value="editor">محرر</option>
                          <option value="admin">مدير</option>
                          <option value="super_admin">مدير عام</option>
                        </select>
                      ) : (
                        <span className="text-xs font-bold text-emerald-400">
                          {user.role === "super_admin"
                            ? "مدير عام"
                            : user.role === "admin"
                              ? "مدير"
                              : "محرر"}
                        </span>
                      )}
                    </td>
                    {isSuperAdmin && (
                      <td className="py-4 pl-2">
                        {user.clerkUserId !== roleData.clerkUserId ? (
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="rounded bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-400 hover:bg-red-500/20"
                            title="سحب الصلاحية"
                          >
                            🗑️ سحب
                          </button>
                        ) : (
                          <span className="text-slate-600 text-xs">-</span>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
