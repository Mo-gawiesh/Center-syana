"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function FAQsCMSPage() {
  const roleData = useQuery(api.users.currentUserRole);
  const faqs = useQuery(
    api.faqs.listFaqsAdmin,
    roleData?.companyId ? { companyId: roleData.companyId } : "skip"
  );

  const createFaq = useMutation(api.faqs.createFaq);
  const updateFaq = useMutation(api.faqs.updateFaq);
  const deleteFaq = useMutation(api.faqs.deleteFaq);

  const [isOpen, setIsOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<any>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [order, setOrder] = useState(0);
  const [status, setStatus] = useState("published");
  
  const [submitting, setSubmitting] = useState(false);

  if (roleData === undefined || faqs === undefined) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  if (roleData === null) return null;

  const handleOpenNew = () => {
    setEditingFaq(null);
    setQuestion("");
    setAnswer("");
    setOrder((faqs?.length || 0) + 1);
    setStatus("published");
    setIsOpen(true);
  };

  const handleOpenEdit = (faq: any) => {
    setEditingFaq(faq);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setOrder(faq.order || 0);
    setStatus(faq.status);
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;

    setSubmitting(true);
    try {
      if (editingFaq) {
        await updateFaq({
          faqId: editingFaq._id,
          question: question.trim(),
          answer: answer.trim(),
          order,
          status,
        });
      } else {
        await createFaq({
          companyId: roleData.companyId,
          question: question.trim(),
          answer: answer.trim(),
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

  const handleDelete = async (faqId: any) => {
    if (!confirm("هل أنت متأكد من حذف هذا السؤال الشائع نهائياً؟")) return;
    try {
      await deleteFaq({ faqId });
    } catch (err: any) {
      alert("خطأ أثناء الحذف: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 mb-1">إدارة الأسئلة الشائعة</h2>
          <p className="text-slate-400 text-sm">إضافة وتعديل الأسئلة والأجوبة لمساعدة العملاء وتوفير الوقت.</p>
        </div>
        <button
          onClick={handleOpenNew}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-emerald-500 transition-colors cursor-pointer"
        >
          + إضافة سؤال جديد
        </button>
      </div>

      {faqs.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/10 text-center p-8">
          <div className="mb-4 text-4xl">❓</div>
          <h3 className="mb-2 text-lg font-bold text-slate-200">لا توجد أسئلة حالياً</h3>
          <p className="max-w-md text-slate-500 text-sm leading-relaxed mb-4">
            ابدأ بإضافة أول سؤال شائع (مثال: هل تستخدمون قطع غيار أصلية؟) لتظهر للعملاء على موقعك.
          </p>
          <button
            onClick={handleOpenNew}
            className="rounded-lg bg-slate-800 border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-750 cursor-pointer"
          >
            إضافة سؤال
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq._id}
              className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/20 p-5 backdrop-blur-xl transition-all duration-300 hover:border-slate-700"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded bg-slate-850 px-2 py-0.5 font-medium text-slate-300">
                      ترتيب: {faq.order || 0}
                    </span>
                    <span
                      className={`rounded px-1.5 py-0.5 font-semibold ${
                        faq.status === "published"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {faq.status === "published" ? "نشط" : "مسودة"}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-200">
                    <span className="text-emerald-450 mr-1">س:</span> {faq.question}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed pr-4">
                    <span className="text-slate-550 mr-1 font-semibold">ج:</span> {faq.answer}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end md:self-start">
                  <button
                    onClick={() => handleOpenEdit(faq)}
                    className="rounded-lg bg-slate-800 border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 cursor-pointer"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(faq._id)}
                    className="rounded-lg bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 text-xs font-medium text-rose-450 hover:bg-rose-500/20 cursor-pointer"
                  >
                    حذف
                  </button>
                </div>
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
                {editingFaq ? "تعديل السؤال الشائع" : "إضافة سؤال شائع جديد"}
              </h3>
              <p className="text-xs text-slate-400 mt-1">تعبئة البيانات لعرض السؤال وإجابته على الموقع.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm text-slate-350 block">السؤال</label>
                <input
                  type="text"
                  required
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="مثال: هل جميع قطع الغيار أصلية ولها ضمان؟"
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-slate-200 outline-none focus:border-emerald-500 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm text-slate-350 block">الإجابة</label>
                <textarea
                  required
                  rows={5}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="اكتب هنا إجابة تفصيلية وواضحة للعميل..."
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-slate-200 outline-none focus:border-emerald-500 text-sm resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                  {submitting ? "جاري الحفظ..." : "حفظ السؤال"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
