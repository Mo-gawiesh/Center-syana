"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";

export default function RepairRequestsPage() {
  const roleData = useQuery(api.users.currentUserRole);
  
  const [statusFilter, setStatusFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const requests = useQuery(
    api.requests.listRequests,
    roleData
      ? {
          companyId: roleData.companyId,
          status: statusFilter || undefined,
          search: searchQuery || undefined,
        }
      : "skip"
  );

  const updateStatus = useMutation(api.requests.updateRequestStatus);
  const deleteRequest = useMutation(api.requests.deleteRequest);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (roleData === undefined || requests === undefined) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  const handleStatusChange = async (requestId: any, newStatus: string) => {
    try {
      await updateStatus({ requestId, status: newStatus });
    } catch (err: any) {
      alert("خطأ أثناء تحديث حالة الطلب: " + err.message);
    }
  };

  const handleDelete = async (requestId: any) => {
    if (!confirm("هل أنت متأكد من رغبتك في حذف هذا الطلب نهائياً؟")) return;
    setDeletingId(requestId);
    try {
      await deleteRequest({ requestId });
    } catch (err: any) {
      alert("خطأ أثناء حذف الطلب: " + err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-slate-100 mb-1">إدارة طلبات الصيانة</h2>
        <p className="text-slate-400 text-sm">متابعة وتحديث حالات طلبات صيانة الأجهزة المنزلية من العملاء.</p>
      </div>

      {/* Filters and search bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-900 bg-slate-900/50 p-6 shadow-sm">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="بحث باسم العميل، رقم الهاتف أو نوع الجهاز..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-xs font-semibold whitespace-nowrap">تصفية حسب الحالة:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none"
          >
            <option value="">الكل</option>
            <option value="pending">جديد / معلق</option>
            <option value="in_progress">قيد العمل</option>
            <option value="completed">مكتمل</option>
            <option value="cancelled">ملغي</option>
          </select>
        </div>
      </div>

      {/* Requests table card */}
      <div className="rounded-2xl border border-slate-900 bg-slate-900/50 p-6 shadow-sm">
        <div className="overflow-x-auto">
          {requests.length === 0 ? (
            <div className="flex h-32 items-center justify-center text-slate-500 text-sm">
              لا توجد طلبات مطابقة للبحث أو التصفية الحالية.
            </div>
          ) : (
            <table className="w-full text-right text-sm">
              <thead>
                <tr className="border-b border-slate-850 text-slate-400 font-medium pb-4">
                  <th className="pb-3 pr-2">العميل</th>
                  <th className="pb-3">رقم الهاتف</th>
                  <th className="pb-3">المدينة / المحافظة</th>
                  <th className="pb-3">نوع الجهاز</th>
                  <th className="pb-3">تاريخ الطلب</th>
                  <th className="pb-3">الحالة</th>
                  <th className="pb-3 pl-2">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {requests.map((req) => (
                  <tr key={req._id} className="text-slate-300 hover:bg-slate-900/20">
                    <td className="py-4 pr-2 font-medium">{req.name}</td>
                    <td className="py-4">
                      <a href={`tel:${req.phone}`} className="hover:text-emerald-400 hover:underline">
                        {req.phone}
                      </a>
                    </td>
                    <td className="py-4">{req.location}</td>
                    <td className="py-4">{req.appliance}</td>
                    <td className="py-4 text-xs text-slate-400">
                      {new Date(req.createdAt).toLocaleDateString("ar-EG")} -{" "}
                      {new Date(req.createdAt).toLocaleTimeString("ar-EG", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-4">
                      <select
                        value={req.status}
                        onChange={(e) => handleStatusChange(req._id, e.target.value)}
                        className={`rounded-lg border border-slate-800 bg-slate-950 px-2 py-1 text-xs font-bold focus:outline-none ${
                          req.status === "pending"
                            ? "text-amber-500"
                            : req.status === "in_progress"
                              ? "text-blue-400"
                              : req.status === "completed"
                                ? "text-emerald-400"
                                : "text-red-400"
                        }`}
                      >
                        <option value="pending" className="text-amber-500 font-bold">معلق / جديد</option>
                        <option value="in_progress" className="text-blue-400 font-bold">قيد العمل</option>
                        <option value="completed" className="text-emerald-400 font-bold">مكتمل</option>
                        <option value="cancelled" className="text-red-400 font-bold">ملغي</option>
                      </select>
                    </td>
                    <td className="py-4 pl-2">
                      <button
                        onClick={() => handleDelete(req._id)}
                        disabled={deletingId === req._id}
                        className="rounded-lg bg-red-500/10 p-2 text-xs font-semibold text-red-400 hover:bg-red-500/20 disabled:opacity-50"
                        title="حذف الطلب"
                      >
                        🗑️ {deletingId === req._id ? "حذف..." : "حذف"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
