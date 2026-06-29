"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState, useEffect } from "react";

export default function SEOPage() {
  const roleData = useQuery(api.users.currentUserRole);
  const draftSettings = useQuery(
    api.settings.getDraftSettings,
    roleData ? { companyId: roleData.companyId } : "skip"
  );

  const saveSettings = useMutation(api.settings.updateDraftSettings);

  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywordsString, setKeywordsString] = useState("");

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (draftSettings) {
      setMetaTitle(draftSettings.seo.metaTitle || "");
      setMetaDescription(draftSettings.seo.metaDescription || "");
      setKeywordsString(draftSettings.seo.keywords.join(", ") || "");
    }
  }, [draftSettings]);

  if (roleData === undefined || draftSettings === undefined) {
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

    const keywords = keywordsString
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k !== "");

    try {
      await saveSettings({
        companyId: roleData.companyId,
        general: draftSettings.general,
        contact: draftSettings.contact,
        homepage: draftSettings.homepage,
        social: draftSettings.social,
        seo: {
          metaTitle,
          metaDescription,
          keywords,
        },
        theme: draftSettings.theme,
      });
      setMessage("✓ تم حفظ إعدادات SEO كمسودة بنجاح.");
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
        <h2 className="text-2xl font-bold text-slate-100 mb-1">تهيئة الأرشفة (SEO)</h2>
        <p className="text-slate-400 text-sm">تحسين نتائج موقعك في محركات بحث Google وإعداد الكلمات الدلالية والوصف.</p>
      </div>

      {message && (
        <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/25 p-4 text-emerald-400 text-sm">
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="rounded-2xl border border-slate-900 bg-slate-900/50 p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-emerald-400 border-b border-slate-800 pb-2">محركات البحث والتهيئة</h3>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-slate-400 font-medium">عنوان الموقع المميز (SEO Title)</label>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-slate-400 font-medium">وصف الأرشفة التعريفي (Meta Description)</label>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-slate-400 font-medium">الكلمات الدلالية (Keywords - افصل بينها بفاصلة)</label>
            <input
              type="text"
              value={keywordsString}
              onChange={(e) => setKeywordsString(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none"
              placeholder="صيانة أجهزة, تصليح ثلاجات, صيانة LG"
              required
            />
          </div>
        </div>

        {/* Action */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50 transition"
          >
            {saving ? "جاري الحفظ..." : "💾 حفظ كمسودة الأرشفة"}
          </button>
        </div>
      </form>
    </div>
  );
}
