"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState, useEffect } from "react";

export default function SettingsPage() {
  const roleData = useQuery(api.users.currentUserRole);
  const draftSettings = useQuery(
    api.settings.getDraftSettings,
    roleData ? { companyId: roleData.companyId } : "skip"
  );
  const publishedSettings = useQuery(
    api.settings.getPublishedSettings,
    roleData ? { companyId: roleData.companyId } : "skip"
  );

  const saveSettings = useMutation(api.settings.updateDraftSettings);
  const publishSettings = useMutation(api.settings.publishSettings);

  // Local state form fields
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  
  const [phone, setPhone] = useState("");
  const [hotline, setHotline] = useState("");
  const [address, setAddress] = useState("");
  const [workingHours, setWorkingHours] = useState("");

  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");

  const [whatsapp, setWhatsapp] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");

  // Stats
  const [stats, setStats] = useState<{ label: string; value: string; icon: string }[]>([]);

  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Sync state from query when loaded
  useEffect(() => {
    if (draftSettings) {
      setCompanyName(draftSettings.general.companyName || "");
      setDescription(draftSettings.general.description || "");

      setPhone(draftSettings.contact.phone || "");
      setHotline(draftSettings.contact.hotline || "");
      setAddress(draftSettings.contact.address || "");
      setWorkingHours(draftSettings.contact.workingHours || "");

      setHeroTitle(draftSettings.homepage.heroTitle || "");
      setHeroSubtitle(draftSettings.homepage.heroSubtitle || "");
      
      setWhatsapp(draftSettings.social.whatsapp || "");
      setFacebook(draftSettings.social.facebook || "");
      setInstagram(draftSettings.social.instagram || "");

      setStats(draftSettings.homepage.statistics || []);
    }
  }, [draftSettings]);

  if (roleData === undefined || draftSettings === undefined || publishedSettings === undefined) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleData || !draftSettings) return;
    setSaving(true);
    setMessage(null);

    try {
      await saveSettings({
        companyId: roleData.companyId,
        general: {
          companyName,
          description,
          logoMediaId: draftSettings?.general.logoMediaId,
        },
        contact: {
          phone,
          hotline,
          address,
          workingHours,
        },
        homepage: {
          heroTitle,
          heroSubtitle,
          heroImageMediaId: draftSettings?.homepage.heroImageMediaId,
          statistics: stats,
        },
        social: {
          whatsapp,
          facebook,
          instagram,
        },
        seo: draftSettings?.seo || {
          metaTitle: "تواصل معنا - الهندسية للتوكيلات للصيانة | 16481",
          metaDescription: "مركز صيانة معتمد للأجهزة المنزلية في مصر.",
          keywords: ["صيانة", "أجهزة"],
        },
        theme: draftSettings?.theme || {
          primaryColor: "#10B981",
          secondaryColor: "#059669",
          font: "Cairo",
        },
      });
      setMessage({ text: "✓ تم حفظ التغييرات كمسودة بنجاح.", type: "success" });
    } catch (err: any) {
      setMessage({ text: "❌ خطأ أثناء الحفظ: " + err.message, type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!roleData) return;
    setPublishing(true);
    setMessage(null);
    try {
      await publishSettings({ companyId: roleData.companyId });
      setMessage({ text: "🚀 تم نشر التغييرات وأصبحت حية على الموقع الاستاتيكي بنجاح!", type: "success" });
    } catch (err: any) {
      setMessage({ text: "❌ خطأ أثناء النشر: " + err.message, type: "error" });
    } finally {
      setPublishing(false);
    }
  };

  const updateStatField = (index: number, field: "label" | "value" | "icon", val: string) => {
    const newStats = [...stats];
    newStats[index] = { ...newStats[index], [field]: val };
    setStats(newStats);
  };

  // Check if draft has unpublished changes
  const hasChanges = draftSettings?.updatedAt !== publishedSettings?.updatedAt;

  return (
    <div className="space-y-6">
      {/* Header & Publish banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 mb-1">إعدادات الموقع</h2>
          <p className="text-slate-400 text-sm">تعديل نصوص وبيانات الموقع. التعديلات تحفظ كمسودة حتى تقوم بنشرها.</p>
        </div>

        <div className="flex items-center gap-3">
          {hasChanges && (
            <span className="rounded bg-amber-500/10 px-3 py-1.5 text-xs font-bold text-amber-400 border border-amber-500/20">
              ⚠️ هناك تعديلات غير منشورة
            </span>
          )}
          <button
            onClick={handlePublish}
            disabled={publishing}
            className="rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50 transition"
          >
            {publishing ? "جاري النشر..." : "🚀 نشر التعديلات"}
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`rounded-xl p-4 border text-sm ${
            message.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-400"
              : "bg-red-500/10 border-red-500/25 text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* General Settings */}
        <div className="rounded-2xl border border-slate-900 bg-slate-900/50 p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-emerald-400 border-b border-slate-800 pb-2">بيانات الشركة العامة</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-400 font-medium">اسم المركز / الشركة</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-400 font-medium">وصف مختصر (يظهر في التذييل والأرشفة)</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>
          </div>
        </div>

        {/* Contact info */}
        <div className="rounded-2xl border border-slate-900 bg-slate-900/50 p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-emerald-400 border-b border-slate-800 pb-2">بيانات الاتصال والعناوين</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-400 font-medium">الخط الساخن للصيانة</label>
              <input
                type="text"
                value={hotline}
                onChange={(e) => setHotline(e.target.value)}
                className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-400 font-medium">رقم الهاتف المحمول</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-400 font-medium">العنوان الرئيسي</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-400 font-medium">مواعيد العمل</label>
              <input
                type="text"
                value={workingHours}
                onChange={(e) => setWorkingHours(e.target.value)}
                className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>
          </div>
        </div>

        {/* Hero Section settings */}
        <div className="rounded-2xl border border-slate-900 bg-slate-900/50 p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-emerald-400 border-b border-slate-800 pb-2">محتوى واجهة الموقع (Hero Section)</h3>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-slate-400 font-medium">عنوان الهيرو الرئيسي</label>
            <input
              type="text"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-slate-400 font-medium">العنوان الفرعي للهيرو</label>
            <textarea
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Social settings */}
        <div className="rounded-2xl border border-slate-900 bg-slate-900/50 p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-emerald-400 border-b border-slate-800 pb-2">روابط التواصل الاجتماعي والواتساب</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-400 font-medium">رقم الواتساب (للتحويل المباشر مع رمز الدولة)</label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-400 font-medium">رابط فيسبوك</label>
              <input
                type="text"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-400 font-medium">رابط إنستغرام</label>
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>
          </div>
        </div>

        {/* Statistics settings */}
        <div className="rounded-2xl border border-slate-900 bg-slate-900/50 p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-emerald-400 border-b border-slate-800 pb-2">إحصائيات الموقع الشريطية (Statistics)</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {stats.map((stat, i) => (
              <div key={i} className="rounded-xl border border-slate-850 bg-slate-950 p-4 space-y-3">
                <span className="text-xs font-bold text-slate-400">الإحصائية #{i + 1}</span>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-500">الأيقونة (رمز التعبير)</label>
                  <input
                    type="text"
                    value={stat.icon}
                    onChange={(e) => updateStatField(i, "icon", e.target.value)}
                    className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-sm text-slate-100 focus:outline-none"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-500">القيمة الإحصائية (مثال: +28)</label>
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => updateStatField(i, "value", e.target.value)}
                    className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-sm text-slate-100 focus:outline-none"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-500">اسم الإحصائية بالعربية</label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => updateStatField(i, "label", e.target.value)}
                    className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-sm text-slate-100 focus:outline-none"
                    required
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Submission */}
        <div className="flex justify-end gap-3 border-t border-slate-900 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-slate-800 border border-slate-700 px-6 py-3 font-semibold text-slate-200 hover:bg-slate-700 disabled:opacity-50 transition"
          >
            {saving ? "جاري الحفظ..." : "💾 حفظ كمسودة"}
          </button>
        </div>
      </form>
    </div>
  );
}
