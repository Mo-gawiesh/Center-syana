"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function TestimonialsCMSPage() {
  const roleData = useQuery(api.users.currentUserRole);
  const testimonials = useQuery(
    api.testimonials.listTestimonialsAdmin,
    roleData?.companyId ? { companyId: roleData.companyId } : "skip"
  );

  const createTestimonial = useMutation(api.testimonials.createTestimonial);
  const updateTestimonial = useMutation(api.testimonials.updateTestimonial);
  const deleteTestimonial = useMutation(api.testimonials.deleteTestimonial);

  const [isOpen, setIsOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("عميل");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [order, setOrder] = useState(0);
  const [status, setStatus] = useState("published");
  
  const [submitting, setSubmitting] = useState(false);

  if (roleData === undefined || testimonials === undefined) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  if (roleData === null) return null;

  const handleOpenNew = () => {
    setEditingTestimonial(null);
    setName("");
    setRole("عميل");
    setContent("");
    setRating(5);
    setOrder((testimonials?.length || 0) + 1);
    setStatus("published");
    setIsOpen(true);
  };

  const handleOpenEdit = (t: any) => {
    setEditingTestimonial(t);
    setName(t.name);
    setRole(t.role || "عميل");
    setContent(t.content);
    setRating(t.rating || 5);
    setOrder(t.order || 0);
    setStatus(t.status);
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    setSubmitting(true);
    try {
      if (editingTestimonial) {
        await updateTestimonial({
          testimonialId: editingTestimonial._id,
          name: name.trim(),
          role: role.trim() || undefined,
          content: content.trim(),
          rating,
          order,
          status,
        });
      } else {
        await createTestimonial({
          companyId: roleData.companyId,
          name: name.trim(),
          role: role.trim() || undefined,
          content: content.trim(),
          rating,
          order,
          status,
        });
      }
      setIsOpen(false);
    } catch (err: any) {
      alert("خطأ أثناء الحفظ: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (testimonialId: any) => {
    if (!confirm("هل أنت متأكد من حذف هذا التقييم نهائياً؟")) return;
    try {
      await deleteTestimonial({ testimonialId });
    } catch (err: any) {
      alert("خطأ أثناء الحذف: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 mb-1">إدارة آراء العملاء</h2>
          <p className="text-slate-400 text-sm">مراجعة وتعديل التقييمات والآراء التي تظهر للزوار على موقعك.</p>
        </div>
        <button
          onClick={handleOpenNew}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-emerald-500 transition-colors cursor-pointer"
        >
          + إضافة تقييم جديد
        </button>
      </div>

      {testimonials.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/10 text-center p-8">
          <div className="mb-4 text-4xl">⭐</div>
          <h3 className="mb-2 text-lg font-bold text-slate-200">لا توجد تقييمات حالياً</h3>
          <p className="max-w-md text-slate-500 text-sm leading-relaxed mb-4">
            ابدأ بإضافة أول تقييم إيجابي لعميل لتكسب ثقة الزوار الجدد لموقعك.
          </p>
          <button
            onClick={handleOpenNew}
            className="rounded-lg bg-slate-800 border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-750 cursor-pointer"
          >
            إضافة تقييم
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/30 p-6 backdrop-blur-xl transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/50"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: t.rating || 5 }).map((_, i) => (
                      <span key={i} className="text-lg">★</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-400">الترتيب: {t.order || 0}</span>
                    <span
                      className={`rounded px-1.5 py-0.5 font-semibold ${
                        t.status === "published"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {t.status === "published" ? "نشط" : "مسودة"}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-slate-350 italic leading-relaxed">
                    &quot;{t.content}&quot;
                  </p>
                  <div>
                    <h4 className="font-bold text-slate-200">{t.name}</h4>
                    <span className="text-xs text-slate-500">{t.role || "عميل"}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 border-t border-slate-800/80 pt-4">
                <button
                  onClick={() => handleOpenEdit(t)}
                  className="flex-1 rounded-md bg-slate-800 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 transition cursor-pointer"
                >
                  تعديل
                </button>
                <button
                  onClick={() => handleDelete(t._id)}
                  className="rounded-md bg-rose-500/15 py-2 px-3 text-xs font-medium text-rose-400 hover:bg-rose-500/25 transition cursor-pointer"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-6">
            <div className="border-b border-slate-850 pb-4">
              <h3 className="text-xl font-bold text-slate-100">
                {editingTestimonial ? "تعديل التقييم" : "إضافة تقييم جديد"}
              </h3>
              <p className="text-xs text-slate-400 mt-1">تعبئة البيانات لعرض رأي العميل وتقييمه للمركز.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm text-slate-350 block">اسم العميل</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: أحمد محمد"
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-slate-200 outline-none focus:border-emerald-500 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm text-slate-350 block">الصفة / الوظيفة</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="مثال: عميل، موظف شركة"
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-slate-200 outline-none focus:border-emerald-500 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm text-slate-350 block">رأي العميل (التقييم)</label>
                <textarea
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="مثال: خدمة ممتازة وسريعة، والمهندس وصل في الميعاد المحدد وقام بتركيب قطعة الغيار الأصلية مع الضمان..."
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-slate-200 outline-none focus:border-emerald-500 text-sm resize-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm text-slate-350 block">التقييم (النجوم)</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value, 10))}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-slate-200 outline-none focus:border-emerald-500 text-sm"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                    <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                    <option value={3}>⭐⭐⭐ (3/5)</option>
                    <option value={2}>⭐⭐ (2/5)</option>
                    <option value={1}>⭐ (1/5)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm text-slate-350 block">ترتيب العرض</label>
                  <input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(parseInt(e.target.value, 10) || 0)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-slate-200 outline-none focus:border-emerald-500 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm text-slate-350 block">الحالة</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-slate-200 outline-none focus:border-emerald-500 text-sm"
                  >
                    <option value="published">نشط (Published)</option>
                    <option value="draft">مسودة (Draft)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-slate-850 pt-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-750 transition cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-slate-100 hover:bg-emerald-500 transition disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? "جاري الحفظ..." : "حفظ التقييم"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
