"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import "../globals.css";

const NAV_ITEMS = [
  { name: "لوحة التحكم", href: "/admin", icon: "📊" },
  { name: "طلبات الصيانة", href: "/admin/requests", icon: "🛠️" },
  { name: "الماركات المعتمدة", href: "/admin/brands", icon: "🏷️" },
  { name: "الخدمات", href: "/admin/services", icon: "💼" },
  { name: "الأسئلة الشائعة", href: "/admin/faqs", icon: "❓" },
  { name: "آراء العملاء", href: "/admin/testimonials", icon: "⭐" },
  { name: "مكتبة الوسائط", href: "/admin/media", icon: "🖼️" },
  { name: "تهيئة SEO", href: "/admin/seo", icon: "🔍" },
  { name: "المظهر والألوان", href: "/admin/appearance", icon: "🎨" },
  { name: "إعدادات الموقع", href: "/admin/settings", icon: "⚙️" },
  { name: "المديرين والمستخدمين", href: "/admin/users", icon: "👥" },
  { name: "سجل العمليات", href: "/admin/activity-log", icon: "🕒" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user: clerkUser, isLoaded: clerkLoaded } = useUser();
  const roleData = useQuery(api.users.currentUserRole);
  const bootstrap = useMutation(api.users.bootstrapUser);
  
  const [bootstrapping, setBootstrapping] = useState(false);
  const [bootstrapError, setBootstrapError] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 1. Loading state
  if (!clerkLoaded || roleData === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
          <p className="text-lg font-medium">جاري تحميل لوحة التحكم...</p>
        </div>
      </div>
    );
  }

  // 2. Unregistered User (Bootstrap needed or Access Denied)
  if (roleData === null) {
    const handleBootstrap = async () => {
      setBootstrapping(true);
      setBootstrapError("");
      try {
        const res = await bootstrap();
        if (res.success) {
          router.refresh();
        } else {
          setBootstrapError(res.reason || "فشل التسجيل التلقائي.");
        }
      } catch (err: any) {
        setBootstrapError(err.message || "حدث خطأ أثناء التسجيل.");
      } finally {
        setBootstrapping(false);
      }
    };

    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-100">
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center shadow-xl">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-3xl text-emerald-500">
            🔐
          </div>
          <h1 className="mb-2 text-2xl font-bold">مطلوب صلاحية الوصول</h1>
          <p className="mb-6 text-slate-400 text-sm leading-relaxed">
            مرحباً {clerkUser?.fullName || "بك"}. أنت مسجل دخولك ولكن ليس لديك صلاحية الوصول إلى لوحة التحكم حالياً.
          </p>

          {bootstrapError && (
            <div className="mb-4 rounded-lg bg-red-500/10 p-3 text-red-400 text-sm">
              {bootstrapError}
            </div>
          )}

          <div className="flex flex-col gap-3">
            <button
              onClick={handleBootstrap}
              disabled={bootstrapping}
              className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-50"
            >
              {bootstrapping ? "جاري التفعيل..." : "تفعيل حسابي كمدير للنظام (Super Admin)"}
            </button>
            <p className="text-slate-500 text-xs mt-2">
              *ملاحظة: هذا الزر متاح فقط لأول مستخدم يسجل دخوله على قاعدة البيانات لتأسيس النظام.
            </p>
            <div className="mt-4 border-t border-slate-800 pt-4 flex justify-center">
              <UserButton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authorized Admin panel layout
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      {/* Desktop Sidebar (Fixed on the right in RTL) */}
      <aside className="hidden w-64 border-l border-slate-900 bg-slate-900/50 backdrop-blur-xl lg:block">
        <div className="flex h-16 items-center justify-between border-b border-slate-900 px-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚙️</span>
            <div>
              <h2 className="font-bold text-sm text-emerald-400">لوحة تحكم CMS</h2>
              <p className="text-slate-500 text-xs">{roleData.companyName}</p>
            </div>
          </div>
        </div>
        <nav className="space-y-1 p-4">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all ${
                  active
                    ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/10"
                    : "text-slate-400 hover:bg-slate-850 hover:text-slate-100"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Sidebar overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Overlay backdrop */}
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          {/* Sidebar drawer */}
          <aside className="relative flex w-64 flex-col bg-slate-900 border-l border-slate-850 h-full p-4 z-50">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <span className="font-bold text-emerald-400">القائمة الرئيسية</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400 text-lg">✕</button>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto">
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all ${
                      active
                        ? "bg-emerald-500 text-slate-950"
                        : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex h-16 items-center justify-between border-b border-slate-900 bg-slate-900/30 px-6 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-slate-400 hover:text-slate-100 lg:hidden"
            >
              ☰
            </button>
            <h1 className="text-lg font-bold text-slate-100">
              {NAV_ITEMS.find((n) => n.href === pathname)?.name || "لوحة التحكم"}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-left hidden sm:block">
              <p className="text-xs text-slate-400">أهلاً بك، {clerkUser?.firstName}</p>
              <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                {roleData.role === "super_admin"
                  ? "مدير عام"
                  : roleData.role === "admin"
                    ? "مدير"
                    : "محرر"}
              </span>
            </div>
            <UserButton />
          </div>
        </header>

        {/* Dashboard Pages Render */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-950/50">
          {children}
        </main>
      </div>
    </div>
  );
}
