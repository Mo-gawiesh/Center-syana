"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Image from "next/image";

export default function BrandsCMSPage() {
  const roleData = useQuery(api.users.currentUserRole);
  const brands = useQuery(
    api.brands.listBrandsAdmin,
    roleData?.companyId ? { companyId: roleData.companyId } : "skip"
  );
  const mediaItems = useQuery(
    api.media.listMedia,
    roleData?.companyId ? { companyId: roleData.companyId } : "skip"
  );

  const createBrand = useMutation(api.brands.createBrand);
  const updateBrand = useMutation(api.brands.updateBrand);
  const deleteBrand = useMutation(api.brands.deleteBrand);
  const generateUploadUrl = useMutation(api.media.generateUploadUrl);
  const saveMedia = useMutation(api.media.saveMedia);

  const [isOpen, setIsOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<any>(null);
  const [name, setName] = useState("");
  const [order, setOrder] = useState(0);
  const [status, setStatus] = useState("published");
  const [selectedLogoId, setSelectedLogoId] = useState("");
  const [selectedLogoUrl, setSelectedLogoUrl] = useState("");
  
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (roleData === undefined || brands === undefined || mediaItems === undefined) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  if (roleData === null) return null;

  const handleOpenNew = () => {
    setEditingBrand(null);
    setName("");
    setOrder((brands?.length || 0) + 1);
    setStatus("published");
    setSelectedLogoId("");
    setSelectedLogoUrl("");
    setIsOpen(true);
  };

  const handleOpenEdit = (brand: any) => {
    setEditingBrand(brand);
    setName(brand.name);
    setOrder(brand.order || 0);
    setStatus(brand.status);
    setSelectedLogoId(brand.logoMediaId || "");
    setSelectedLogoUrl(brand.logoUrl || "");
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
        folder: "brands",
        alt: file.name,
      });

      // Get the url for the uploaded media
      const uploadedItem = mediaItems.find((m) => m.storageId === storageId) || { url: "" };
      setSelectedLogoId(storageId);
      
      // Look up generated url from database fallback or direct post url response
      const tempUrl = URL.createObjectURL(file);
      setSelectedLogoUrl(tempUrl);
      
      alert("✓ تم رفع الشعار وحفظه في الميديا.");
    } catch (err: any) {
      alert("خطأ أثناء رفع الصورة: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitting(true);
    try {
      // Find logo URL from selected media ID if uploading fallback
      let finalLogoUrl = selectedLogoUrl;
      if (selectedLogoId) {
        const matchingMedia = mediaItems.find((m) => m.storageId === selectedLogoId);
        if (matchingMedia) {
          finalLogoUrl = matchingMedia.url;
        }
      }

      if (editingBrand) {
        await updateBrand({
          brandId: editingBrand._id,
          name: name.trim(),
          logoMediaId: selectedLogoId || undefined,
          logoUrl: finalLogoUrl || undefined,
          order,
          status,
        });
      } else {
        await createBrand({
          companyId: roleData.companyId,
          name: name.trim(),
          logoMediaId: selectedLogoId || undefined,
          logoUrl: finalLogoUrl || undefined,
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

  const handleDelete = async (brandId: any) => {
    if (!confirm("هل أنت متأكد من حذف هذه الماركة نهائياً؟")) return;
    try {
      await deleteBrand({ brandId });
    } catch (err: any) {
      alert("خطأ أثناء الحذف: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 mb-1">إدارة الماركات المعتمدة</h2>
          <p className="text-slate-400 text-sm">إضافة ماركات جديدة، شعاراتها، وحالة تفعيلها على الموقع.</p>
        </div>
        <button
          onClick={handleOpenNew}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-emerald-500 transition-colors cursor-pointer"
        >
          + إضافة ماركة جديدة
        </button>
      </div>

      {brands.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/10 text-center p-8">
          <div className="mb-4 text-4xl">🏷️</div>
          <h3 className="mb-2 text-lg font-bold text-slate-200">لا توجد ماركات حالياً</h3>
          <p className="max-w-md text-slate-500 text-sm leading-relaxed mb-4">
            ابدأ بإضافة أول ماركة معتمدة لتعرض في الشريط المتحرك وقوائم الصيانة في موقعك.
          </p>
          <button
            onClick={handleOpenNew}
            className="rounded-lg bg-emerald-600 border border-emerald-500 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-emerald-500 cursor-pointer transition-colors shadow-lg shadow-emerald-500/20"
          >
            + إضافة ماركة
          </button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/50 text-slate-400">
                  <th className="py-4 px-6 font-semibold w-24">الشعار</th>
                  <th className="py-4 px-6 font-semibold">الماركة</th>
                  <th className="py-4 px-6 font-semibold">الترتيب</th>
                  <th className="py-4 px-6 font-semibold">الحالة</th>
                  <th className="py-4 px-6 font-semibold w-32">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {brands.map((brand) => (
                  <tr
                    key={brand._id}
                    className="group transition-colors hover:bg-slate-800/30"
                  >
                    <td className="py-3 px-6">
                      <div className="flex h-12 w-20 items-center justify-center rounded-lg bg-slate-950/60 p-2 border border-slate-800 group-hover:border-slate-700 transition-colors">
                        {brand.logoUrl ? (
                          <img
                            src={brand.logoUrl}
                            alt={brand.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <span className="text-xl">🏷️</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-6 font-bold text-slate-200">
                      {brand.name}
                    </td>
                    <td className="py-3 px-6 text-slate-400 font-medium">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/50 text-xs">
                        {brand.order || 0}
                      </div>
                    </td>
                    <td className="py-3 px-6">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border ${
                          brand.status === "published"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        }`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${brand.status === "published" ? "bg-emerald-400" : "bg-amber-400"}`}></span>
                        {brand.status === "published" ? "نشط" : "مسودة"}
                      </span>
                    </td>
                    <td className="py-3 px-6">
                      <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
                        <button
                          onClick={() => handleOpenEdit(brand)}
                          className="rounded-lg bg-slate-800 p-2 text-slate-300 hover:bg-emerald-500 hover:text-slate-950 transition-colors cursor-pointer"
                          title="تعديل"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                        </button>
                        <button
                          onClick={() => handleDelete(brand._id)}
                          className="rounded-lg bg-slate-800 p-2 text-slate-300 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
                          title="حذف"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-6">
            <div className="border-b border-slate-850 pb-4">
              <h3 className="text-xl font-bold text-slate-100">
                {editingBrand ? "تعديل الماركة" : "إضافة ماركة جديدة"}
              </h3>
              <p className="text-xs text-slate-400 mt-1">تعبئة البيانات لربط الماركة وحفظ التعديلات.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm text-slate-350 block">اسم الماركة</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: LG, Samsung"
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-slate-200 outline-none focus:border-emerald-500 text-sm"
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

              {/* Logo Select */}
              <div className="space-y-2">
                <label className="text-sm text-slate-350 block">شعار الماركة</label>
                
                {/* Upload Section */}
                <div className="flex gap-4 items-center">
                  <div className="flex h-16 w-24 items-center justify-center rounded bg-slate-950 border border-slate-850 p-1">
                    {selectedLogoUrl ? (
                      <img src={selectedLogoUrl} alt="Preview" className="max-h-full max-w-full object-contain" />
                    ) : (
                      <span className="text-xs text-slate-500">لا يوجد شعار</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      id="brand-file-upload"
                      className="hidden"
                      onChange={handleUpload}
                      disabled={uploading}
                    />
                    <label
                      htmlFor="brand-file-upload"
                      className="inline-block rounded bg-slate-800 border border-slate-700 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-750 transition cursor-pointer"
                    >
                      {uploading ? "جاري الرفع..." : "تحميل شعار جديد"}
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
                          setSelectedLogoId(item.storageId);
                          setSelectedLogoUrl(item.url);
                        }}
                        className={`relative aspect-square flex items-center justify-center border rounded p-1 bg-slate-900/60 hover:bg-slate-850/80 cursor-pointer ${
                          selectedLogoId === item.storageId ? "border-emerald-500 ring-2 ring-emerald-500/20" : "border-slate-800"
                        }`}
                      >
                        <img src={item.url} alt={item.alt || ""} className="max-h-full max-w-full object-contain" />
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
                  {submitting ? "جاري الحفظ..." : "حفظ الماركة"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
