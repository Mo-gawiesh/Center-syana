"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState, useEffect } from "react";

export default function AppearancePage() {
  const roleData = useQuery(api.users.currentUserRole);
  const draftSettings = useQuery(
    api.settings.getDraftSettings,
    roleData ? { companyId: roleData.companyId } : "skip"
  );
  const mediaItems = useQuery(
    api.media.listMedia,
    roleData ? { companyId: roleData.companyId } : "skip"
  );

  const saveSettings = useMutation(api.settings.updateDraftSettings);
  const publishSettings = useMutation(api.settings.publishSettings);

  const [primaryColor, setPrimaryColor] = useState("");
  const [secondaryColor, setSecondaryColor] = useState("");
  const [logoMediaId, setLogoMediaId] = useState("");
  const [heroImageMediaId, setHeroImageMediaId] = useState("");

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (draftSettings) {
      setPrimaryColor(draftSettings.theme.primaryColor || "");
      setSecondaryColor(draftSettings.theme.secondaryColor || "");
      setLogoMediaId(draftSettings.general.logoMediaId || "");
      setHeroImageMediaId(draftSettings.homepage.heroImageMediaId || "");
    }
  }, [draftSettings]);

  if (roleData === undefined || draftSettings === undefined || mediaItems === undefined) {
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
    setMessage("");

    try {
      await saveSettings({
        companyId: roleData.companyId,
        general: {
          ...draftSettings.general,
          logoMediaId: logoMediaId || undefined,
        },
        contact: draftSettings.contact,
        homepage: {
          ...draftSettings.homepage,
          heroImageMediaId: heroImageMediaId || undefined,
        },
        social: draftSettings.social,
        seo: draftSettings.seo,
        theme: {
          primaryColor,
          secondaryColor,
          font: draftSettings.theme.font,
        },
      });
      setMessage("✓ تم حفظ تغييرات المظهر كمسودة.");
    } catch (err: any) {
      alert("خطأ أثناء الحفظ: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-slate-100 mb-1">المظهر والألوان</h2>
        <p className="text-slate-400 text-sm">تخصيص الهوية البصرية للموقع، الشعار (Logo)، الألوان والخطوط.</p>
      </div>

      {message && (
        <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/25 p-4 text-emerald-400 text-sm">
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Colors Section */}
        <div className="rounded-2xl border border-slate-900 bg-slate-900/50 p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-emerald-400 border-b border-slate-800 pb-2">لوحة الألوان</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-400 font-medium">اللون الأساسي (أزرار، روابط، تظليلات)</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="h-10 w-12 rounded border border-slate-800 bg-slate-950 p-1"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-4 text-sm text-slate-100 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-400 font-medium">اللون الثانوي (تأثيرات الحوم، خلفيات إضافية)</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="h-10 w-12 rounded border border-slate-800 bg-slate-950 p-1"
                />
                <input
                  type="text"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-4 text-sm text-slate-100 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Media Selectors (Logo & Hero) */}
        <div className="rounded-2xl border border-slate-900 bg-slate-900/50 p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-emerald-400 border-b border-slate-800 pb-2">الشعار والصور المميزة</h3>
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Logo Select */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-400 font-medium">اختر شعار الموقع (Logo)</label>
              <select
                value={logoMediaId}
                onChange={(e) => setLogoMediaId(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 focus:outline-none"
              >
                <option value="">-- بدون شعار (استخدام الشعار الافتراضي) --</option>
                {mediaItems.map((item) => (
                  <option key={item._id} value={item.url}>
                    {item.alt || "صورة " + item.createdAt}
                  </option>
                ))}
              </select>
              {logoMediaId && (
                <div className="mt-2 h-16 w-32 border border-slate-800 rounded bg-slate-950 flex items-center justify-center p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logoMediaId} alt="Logo preview" className="max-h-full object-contain" />
                </div>
              )}
            </div>

            {/* Hero Image Select */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-400 font-medium">اختر صورة واجهة الهيرو (Hero Image)</label>
              <select
                value={heroImageMediaId}
                onChange={(e) => setHeroImageMediaId(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 focus:outline-none"
              >
                <option value="">-- بدون صورة --</option>
                {mediaItems.map((item) => (
                  <option key={item._id} value={item.url}>
                    {item.alt || "صورة " + item.createdAt}
                  </option>
                ))}
              </select>
              {heroImageMediaId && (
                <div className="mt-2 h-16 w-32 border border-slate-800 rounded bg-slate-950 flex items-center justify-center p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={heroImageMediaId} alt="Hero preview" className="max-h-full object-contain" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50 transition"
          >
            {saving ? "جاري الحفظ..." : "💾 حفظ كمسودة المظهر"}
          </button>
        </div>
      </form>
    </div>
  );
}
