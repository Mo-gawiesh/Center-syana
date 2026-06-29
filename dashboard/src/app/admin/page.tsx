"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";

export default function DashboardPage() {
  const roleData = useQuery(api.users.currentUserRole);
  const requests = useQuery(api.requests.listRequests, 
    roleData ? { companyId: roleData.companyId } : "skip"
  );
  const logs = useQuery(api.logs.listLogs, 
    roleData ? { companyId: roleData.companyId } : "skip"
  );

  if (requests === undefined || roleData === undefined || logs === undefined) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  if (roleData === null) {
    return null;
  }

  // Calculate metrics
  const total = requests.length;
  const pending = requests.filter((r) => r.status === "pending").length;
  const inProgress = requests.filter((r) => r.status === "in_progress").length;
  const completed = requests.filter((r) => r.status === "completed").length;

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-slate-100 mb-2">مرحباً بك في لوحة تحكم {roleData.companyName}! 👋</h2>
        <p className="text-slate-400 text-sm">هنا يمكنك إدارة طلبات الصيانة الواردة وتعديل إعدادات وبيانات الموقع ديناميكياً.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-900 bg-slate-900/50 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-sm font-medium">إجمالي الطلبات</span>
            <span className="text-2xl">📋</span>
          </div>
          <span className="text-3xl font-bold">{total}</span>
        </div>

        <div className="rounded-2xl border border-slate-900 bg-slate-900/50 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-sm font-medium">طلبات جديدة</span>
            <span className="text-2xl text-amber-500">🟡</span>
          </div>
          <span className="text-3xl font-bold text-amber-500">{pending}</span>
        </div>

        <div className="rounded-2xl border border-slate-900 bg-slate-900/50 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-sm font-medium">قيد الإصلاح</span>
            <span className="text-2xl text-blue-500">🔵</span>
          </div>
          <span className="text-3xl font-bold text-blue-500">{inProgress}</span>
        </div>

        <div className="rounded-2xl border border-slate-900 bg-slate-900/50 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-sm font-medium">تمت صيانتها</span>
            <span className="text-2xl text-emerald-500">🟢</span>
          </div>
          <span className="text-3xl font-bold text-emerald-500">{completed}</span>
        </div>
      </div>

      {/* Main Grid: Recent requests & Activity Log */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Requests list */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-900 bg-slate-900/50 p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-100">آخر طلبات الصيانة</h3>
            <Link href="/admin/requests" className="text-xs font-semibold text-emerald-400 hover:underline">
              عرض الكل ←
            </Link>
          </div>

          <div className="flex-1 overflow-x-auto">
            {requests.length === 0 ? (
              <div className="flex h-32 items-center justify-center text-slate-500 text-sm">
                لا توجد طلبات صيانة حالياً.
              </div>
            ) : (
              <table className="w-full text-right text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-medium">
                    <th className="pb-3 pr-2">العميل</th>
                    <th className="pb-3">الهاتف</th>
                    <th className="pb-3">الجهاز</th>
                    <th className="pb-3 pl-2">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {requests.slice(0, 5).map((req) => (
                    <tr key={req._id} className="text-slate-300 hover:bg-slate-900/20">
                      <td className="py-4 pr-2 font-medium">{req.name}</td>
                      <td className="py-4">{req.phone}</td>
                      <td className="py-4">{req.appliance}</td>
                      <td className="py-4 pl-2">
                        <span
                          className={`inline-block rounded px-2.5 py-0.5 text-xs font-bold ${
                            req.status === "pending"
                              ? "bg-amber-500/10 text-amber-500"
                              : req.status === "in_progress"
                                ? "bg-blue-500/10 text-blue-500"
                                : req.status === "completed"
                                  ? "bg-emerald-500/10 text-emerald-500"
                                  : "bg-red-500/10 text-red-500"
                          }`}
                        >
                          {req.status === "pending"
                            ? "جديد"
                            : req.status === "in_progress"
                              ? "قيد العمل"
                              : req.status === "completed"
                                ? "مكتمل"
                                : "ملغي"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Activity Log list */}
        <div className="rounded-2xl border border-slate-900 bg-slate-900/50 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-100">سجل العمليات الأخير</h3>
            <Link href="/admin/activity-log" className="text-xs font-semibold text-emerald-400 hover:underline">
              السجل الكامل ←
            </Link>
          </div>

          <div className="space-y-4">
            {logs.length === 0 ? (
              <div className="flex h-32 items-center justify-center text-slate-500 text-sm">
                لا توجد عمليات مسجلة حالياً.
              </div>
            ) : (
              logs.slice(0, 4).map((log) => (
                <div key={log._id} className="flex flex-col gap-1 border-b border-slate-800 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">مستخدم ID: {log.userId.slice(-6)}</span>
                    <span className="text-[10px] text-slate-500">
                      {new Date(log.createdAt).toLocaleTimeString("ar-EG")}
                    </span>
                  </div>
                  <p className="text-sm font-medium">
                    {log.action === "create" ? "➕ إنشاء" : log.action === "update" ? "✏️ تعديل" : log.action === "publish" ? "🚀 نشر" : "❌ حذف"}{" "}
                    في قسم <span className="text-emerald-400 font-bold">{log.entity}</span>
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
