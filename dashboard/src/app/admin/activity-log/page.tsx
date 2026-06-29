"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function ActivityLogPage() {
  const roleData = useQuery(api.users.currentUserRole);
  const logs = useQuery(
    api.logs.listLogs,
    roleData ? { companyId: roleData.companyId } : "skip"
  );

  if (roleData === undefined || logs === undefined) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-slate-100 mb-1">سجل العمليات</h2>
        <p className="text-slate-400 text-sm">مراقبة وتدقيق عمليات التعديل والإدخال التي قام بها المدراء.</p>
      </div>

      {/* Table Card */}
      <div className="rounded-2xl border border-slate-900 bg-slate-900/50 p-6 shadow-sm">
        <div className="overflow-x-auto">
          {logs.length === 0 ? (
            <div className="flex h-32 items-center justify-center text-slate-500 text-sm">
              لا توجد أي عمليات مسجلة حالياً.
            </div>
          ) : (
            <table className="w-full text-right text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-medium pb-4">
                  <th className="pb-3 pr-2">المدير (ID)</th>
                  <th className="pb-3">النوع</th>
                  <th className="pb-3">القسم</th>
                  <th className="pb-3">البيانات المعدلة</th>
                  <th className="pb-3 pl-2">الوقت والتاريخ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {logs.map((log) => (
                  <tr key={log._id} className="text-slate-300 hover:bg-slate-900/20">
                    <td className="py-4 pr-2 font-medium text-xs text-slate-400" title={log.userId}>
                      {log.userId}
                    </td>
                    <td className="py-4 font-bold text-xs">
                      <span
                        className={`inline-block rounded px-2.5 py-0.5 ${
                          log.action === "create"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : log.action === "update"
                              ? "bg-blue-500/10 text-blue-400"
                              : log.action === "publish"
                                ? "bg-purple-500/10 text-purple-400"
                                : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {log.action === "create" && "➕ إضافة جديد"}
                        {log.action === "update" && "✏️ تعديل مسودة"}
                        {log.action === "publish" && "🚀 اعتماد ونشر"}
                        {log.action === "delete" && "❌ حذف نهائي"}
                      </span>
                    </td>
                    <td className="py-4 text-xs font-semibold text-emerald-400">{log.entity}</td>
                    <td className="py-4 max-w-xs truncate text-xs text-slate-400" title={JSON.stringify(log.newData || log.oldData)}>
                      {JSON.stringify(log.newData || log.oldData || {})}
                    </td>
                    <td className="py-4 pl-2 text-xs text-slate-400">
                      {new Date(log.createdAt).toLocaleDateString("ar-EG")} -{" "}
                      {new Date(log.createdAt).toLocaleTimeString("ar-EG", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
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
