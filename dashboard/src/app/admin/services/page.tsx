"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function ServicesCMSPage() {
  const roleData = useQuery(api.users.currentUserRole);
  const services = useQuery(
    api.services.listServicesAdmin,
    roleData?.companyId ? { companyId: roleData.companyId } : "skip"
  );
  const mediaItems = useQuery(
    api.media.listMedia,
    roleData?.companyId ? { companyId: roleData.companyId } : "skip"
  );

  const createService = useMutation(api.services.createService);
  const updateService = useMutation(api.services.updateService);
  const deleteService = useMutation(api.services.deleteService);
  const generateUploadUrl = useMutation(api.media.generateUploadUrl);
  const saveMedia = useMutation(api.media.saveMedia);

  const [isOpen, setIsOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [order, setOrder] = useState(0);
  const [status, setStatus] = useState("published");
  const [selectedImageId, setSelectedImageId] = useState("");
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (roleData === undefined || services === undefined || mediaItems === undefined) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  if (roleData === null) return null;

  const handleOpenNew = () => {
    setEditingService(null);
    setTitle("");
    setDescription("");
    setIcon("");
    setOrder((services?.length || 0) + 1);
    setStatus("published");
    setSelectedImageId("");
    setSelectedImageUrl("");
    setIsOpen(true);
  };

  const handleOpenEdit = (service: any) => {
    setEditingService(service);
    setTitle(service.title);
    setDescription(service.description);
    setIcon(service.icon || "");
    setOrder(service.order || 0);
    setStatus(service.status);
    setSelectedImageId(service.imageMediaId || "");
    setSelectedImageUrl(service.imageUrl || "");
    setIsOpen(true);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    setUploading(true);
    try {
      const postUrl = await generateUploadUrl();
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      const { storageId } = await result.json();

      const mediaId = await saveMedia({
        companyId: roleData.companyId,
        storageId,
        type: file.type,
        folder: "services",
        alt: file.name,
      });

      const matchingMedia = mediaItems.find((m) => m.storageId === storageId);
      setSelectedImageId(storageId);
      const tempUrl = URL.createObjectURL(file);
      setSelectedImageUrl(tempUrl);
      
      alert("✓ تم رفع الصورة بنجاح.");
    } catch (err: any) {
      alert("خطأ أثناء رفع الصورة: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setSubmitting(true);
    try {
      let finalImageUrl = selectedImageUrl;
      if (selectedImageId) {
        const matchingMedia = mediaItems.find((m) => m.storageId === selectedImageId);
        if (matchingMedia) {
          finalImageUrl = matchingMedia.url;
        }
      }

      if (editingService) {
        await updateService({
          serviceId: editingService._id,
          title: title.trim(),
          description: description.trim(),
          icon: icon.trim() || undefined,
          imageMediaId: selectedImageId || undefined,
          imageUrl: finalImageUrl || undefined,
          order,
          status,
        });
      } else {
        await createService({
          companyId: roleData.companyId,
          title: title.trim(),
          description: description.trim(),
          icon: icon.trim() || undefined,
          imageMediaId: selectedImageId || undefined,
          imageUrl: finalImageUrl || undefined,
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

  const handleDelete = async (serviceId: any) => {
    if (!confirm("هل أنت متأكد من حذف هذه الخدمة نهائياً؟")) return;
    try {
      await deleteService({ serviceId });
    } catch (err: any) {
      alert("خطأ أثناء الحذف: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 mb-1">إدارة الخدمات</h2>
          <p className="text-slate-400 text-sm">إضافة وتعديل خدمات الصيانة المنزلية والضمان المعروضة على موقعك.</p>
        </div>
        <button
          onClick={handleOpenNew}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-emerald-500 transition-colors cursor-pointer"
        >
          + إضافة خدمة جديدة
        </button>
      </div>

      {services.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/10 text-center p-8">
          <div className="mb-4 text-4xl">💼</div>
          <h3 className="mb-2 text-lg font-bold text-slate-200">لا توجد خدمات حالياً</h3>
          <p className="max-w-md text-slate-500 text-sm leading-relaxed mb-4">
            ابدأ بإضافة أول خدمة صيانة (مثال: صيانة غسالات، صيانة ثلاجات) لتظهر لزوار موقعك.
          </p>
          <button
            onClick={handleOpenNew}
            className="rounded-lg bg-slate-800 border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-750 cursor-pointer"
          >
            إضافة خدمة
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service._id}
              className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/30 p-6 backdrop-blur-xl transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/50"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-2xl">
                    {service.imageUrl ? (
                      <img src={service.imageUrl} alt="" className="h-full w-full object-cover rounded-xl" />
                    ) : (
                      <span>🔧</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-400">الترتيب: {service.order || 0}</span>
                    <span
                      className={`rounded px-1.5 py-0.5 font-semibold ${
                        service.status === "published"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {service.status === "published" ? "نشط" : "مسودة"}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-200">{service.title}</h3>
                  <p className="mt-2 text-sm text-slate-400 line-clamp-3 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 border-t border-slate-800/80 pt-4">
                <button
                  onClick={() => handleOpenEdit(service)}
                  className="flex-1 rounded-md bg-slate-800 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 transition cursor-pointer"
                >
                  تعديل
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
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
                {editingService ? "تعديل الخدمة" : "إضافة خدمة جديدة"}
              </h3>
              <p className="text-xs text-slate-400 mt-1">تعبئة البيانات لعرض تفاصيل الخدمة على الموقع.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm text-slate-350 block">عنوان الخدمة</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثال: صيانة غسالات LG المعتمدة"
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-slate-200 outline-none focus:border-emerald-500 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm text-slate-350 block">وصف الخدمة</label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="اكتب هنا شرحاً تفصيلياً للخدمة وما تشمله من ضمان وقطع غيار..."
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

              {/* Image Select */}
              <div className="space-y-2">
                <label className="text-sm text-slate-350 block">صورة الخدمة / الأيقونة</label>
                
                {/* Upload Section */}
                <div className="flex gap-4 items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded bg-slate-950 border border-slate-850 p-1">
                    {selectedImageUrl ? (
                      <img src={selectedImageUrl} alt="Preview" className="max-h-full max-w-full object-cover rounded" />
                    ) : (
                      <span className="text-xs text-slate-500">لا توجد صورة</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      id="service-file-upload"
                      className="hidden"
                      onChange={handleUpload}
                      disabled={uploading}
                    />
                    <label
                      htmlFor="service-file-upload"
                      className="inline-block rounded bg-slate-800 border border-slate-700 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-750 transition cursor-pointer"
                    >
                      {uploading ? "جاري الرفع..." : "تحميل صورة جديدة"}
                    </label>
                    <p className="text-[10px] text-slate-500 mt-1">تنسيقات مدعومة: JPG, PNG, WebP</p>
                  </div>
                </div>

                {/* Grid selection from media library */}
                <div className="border border-slate-850 rounded-lg p-3 bg-slate-950/30">
                  <span className="text-xs text-slate-400 block mb-2">أو اختر من مكتبة الميديا:</span>
                  <div className="grid grid-cols-5 gap-2 max-h-32 overflow-y-auto p-1 border border-slate-850 rounded bg-slate-950">
                    {mediaItems.map((item) => (
                      <button
                        key={item._id}
                        type="button"
                        onClick={() => {
                          setSelectedImageId(item.storageId);
                          setSelectedImageUrl(item.url);
                        }}
                        className={`relative aspect-square flex items-center justify-center border rounded p-1 bg-slate-900/60 hover:bg-slate-850/80 cursor-pointer ${
                          selectedImageId === item.storageId ? "border-emerald-500 ring-2 ring-emerald-500/20" : "border-slate-800"
                        }`}
                      >
                        <img src={item.url} alt={item.alt || ""} className="max-h-full max-w-full object-cover rounded" />
                      </button>
                    ))}
                  </div>
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
                  {submitting ? "جاري الحفظ..." : "حفظ الخدمة"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
