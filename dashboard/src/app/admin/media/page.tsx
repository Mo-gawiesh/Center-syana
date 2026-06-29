"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState, useRef } from "react";

export default function MediaLibraryPage() {
  const roleData = useQuery(api.users.currentUserRole);
  const mediaItems = useQuery(
    api.media.listMedia,
    roleData ? { companyId: roleData.companyId } : "skip"
  );

  const generateUploadUrl = useMutation(api.media.generateUploadUrl);
  const saveMedia = useMutation(api.media.saveMedia);
  const deleteMedia = useMutation(api.media.deleteMedia);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [copiedUrlId, setCopiedUrlId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (roleData === undefined || mediaItems === undefined) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !roleData) return;
    const file = files[0];

    setUploading(true);
    try {
      // 1. Get secure upload URL
      const postUrl = await generateUploadUrl();

      // 2. Upload file to Convex storage
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      const { storageId } = await result.json();

      // 3. Save details to database
      await saveMedia({
        companyId: roleData.companyId,
        storageId,
        type: file.type,
        folder: "general",
        alt: file.name,
      });

      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: any) {
      alert("حدث خطأ أثناء رفع الملف: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (mediaId: any) => {
    if (!confirm("هل تريد حذف هذا الملف نهائياً من مكتبة الميديا والتخزين السحابي؟")) return;
    setDeletingId(mediaId);
    try {
      await deleteMedia({ mediaId });
    } catch (err: any) {
      alert("خطأ أثناء حذف الملف: " + err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleCopyUrl = (url: string, mediaId: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrlId(mediaId);
    setTimeout(() => setCopiedUrlId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 mb-1">مكتبة الوسائط</h2>
          <p className="text-slate-400 text-sm">رفع وإدارة الصور والملفات لاستخدامها في محتوى الموقع.</p>
        </div>

        <div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleUpload}
            className="hidden"
            id="file-upload-input"
            disabled={uploading}
          />
          <label
            htmlFor="file-upload-input"
            className={`inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-slate-950 transition cursor-pointer hover:bg-emerald-400 ${
              uploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {uploading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent"></div>
                جاري الرفع...
              </>
            ) : (
              <>
                <span>📤</span> رفع صورة جديدة
              </>
            )}
          </label>
        </div>
      </div>

      {/* Media Grid */}
      <div className="rounded-2xl border border-slate-900 bg-slate-900/50 p-6 shadow-sm">
        {mediaItems.length === 0 ? (
          <div className="flex h-48 flex-col items-center justify-center text-slate-500 gap-2">
            <span className="text-4xl">🖼️</span>
            <p className="text-sm">لا توجد صور في مكتبة الوسائط حالياً. ابدأ برفع أول صورة.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {mediaItems.map((item) => (
              <div
                key={item._id}
                className="group relative rounded-xl border border-slate-850 bg-slate-950 p-2 overflow-hidden hover:border-slate-700 transition"
              >
                {/* Image Wrapper */}
                <div className="aspect-square relative rounded-lg bg-slate-900 overflow-hidden flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.url}
                    alt={item.alt || "صورة"}
                    className="object-contain max-h-full max-w-full"
                  />
                </div>

                {/* Info & hover controls */}
                <div className="mt-3 space-y-2">
                  <p className="text-[10px] text-slate-500 truncate" title={item.alt}>
                    {item.alt || "صورة بدون عنوان"}
                  </p>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopyUrl(item.url, item._id)}
                      className={`flex-1 rounded-lg py-1.5 text-center text-xs font-semibold transition ${
                        copiedUrlId === item._id
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      {copiedUrlId === item._id ? "✓ تم النسخ" : "🔗 رابط"}
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      disabled={deletingId === item._id}
                      className="rounded-lg bg-red-500/10 px-2.5 py-1.5 text-center text-xs font-semibold text-red-400 hover:bg-red-500/20 disabled:opacity-50"
                      title="حذف الصورة"
                    >
                      {deletingId === item._id ? "..." : "🗑️"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
