"use client";

export default function TestimonialsCMSPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-100 mb-1">إدارة آراء العملاء</h2>
        <p className="text-slate-400 text-sm">مراجعة وتعديل التقييمات والآراء التي تظهر في شريط المراجعات.</p>
      </div>

      <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/10 text-center p-8">
        <div className="mb-4 text-4xl">⭐</div>
        <h3 className="mb-2 text-lg font-bold text-slate-200">القسم قيد التجهيز للمرحلة القادمة</h3>
        <p className="max-w-md text-slate-500 text-sm leading-relaxed">
          هذا القسم مهيأ بالكامل في بنية الـ CMS الدائمة. في المرحلة القادمة، سيتم ربطه بقاعدة البيانات Convex لتمكينك من إضافة تقييمات جديدة، حذف المراجعات القديمة، أو تصفية الآراء الإيجابية التي تظهر على الموقع.
        </p>
      </div>
    </div>
  );
}
