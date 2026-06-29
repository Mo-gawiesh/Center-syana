"use client";

import React, { useState } from "react";

interface InquiryFormProps {
  companyId?: string;
  whatsappNumber?: string;
}

export default function InquiryForm({ whatsappNumber = "201062842903" }: InquiryFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [appliance, setAppliance] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !location) return;

    setLoading(true);

    const message = `طلب صيانة جديد 🛠️\n- الاسم: ${name}\n- رقم الهاتف: ${phone}\n- المحافظة/المدينة: ${location}\n- الجهاز المراد صيانته: ${appliance}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setName("");
    setPhone("");
    setLocation("");
    setAppliance("");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="cta-inquiry-form" id="inquiry-form">
      <div className="form-group">
        <label htmlFor="form-name" className="form-label">الاسم بالكامل</label>
        <input
          type="text"
          id="form-name"
          className="form-input"
          placeholder="أدخل اسمك ثلاثياً"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="form-phone" className="form-label">رقم الهاتف</label>
        <input
          type="tel"
          id="form-phone"
          className="form-input"
          placeholder="أدخل رقم الهاتف المحمول"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="form-loc" className="form-label">المحافظة / المدينة</label>
          <select
            id="form-loc"
            className="form-input"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="" disabled>اختر محافظتك</option>
            <option value="القاهرة">القاهرة</option>
            <option value="الجيزة">الجيزة</option>
            <option value="الإسكندرية">الإسكندرية</option>
            <option value="القليوبية">القليوبية</option>
            <option value="الدقهلية">الدقهلية</option>
            <option value="الشرقية">الشرقية</option>
            <option value="المنوفية">المنوفية</option>
            <option value="الغربية">الغربية</option>
            <option value="البحيرة">البحيرة</option>
            <option value="دمياط">دمياط</option>
            <option value="بورسعيد">بورسعيد</option>
            <option value="الإسماعيلية">الإسماعيلية</option>
            <option value="السويس">السويس</option>
            <option value="كفر الشيخ">كفر الشيخ</option>
            <option value="الفيوم">الفيوم</option>
            <option value="بني سويف">بني سويف</option>
            <option value="المنيا">المنيا</option>
            <option value="أسيوط">أسيوط</option>
            <option value="سوهاج">سوهاج</option>
            <option value="قنا">قنا</option>
            <option value="الأقصر">الأقصر</option>
            <option value="أسوان">أسوان</option>
            <option value="البحر الأحمر">البحر الأحمر</option>
            <option value="مطروح">مطروح</option>
            <option value="الوادي الجديد">الوادي الجديد</option>
            <option value="شمال سيناء">شمال سيناء</option>
            <option value="جنوب سيناء">جنوب سيناء</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="form-appliance" className="form-label">الجهاز المراد صيانته</label>
          <select
            id="form-appliance"
            className="form-input"
            required
            value={appliance}
            onChange={(e) => setAppliance(e.target.value)}
          >
            <option value="" disabled>اختر نوع الجهاز</option>
            <option value="ثلاجة">ثلاجة</option>
            <option value="غسالة ملابس">غسالة ملابس</option>
            <option value="غسالة أطباق">غسالة أطباق</option>
            <option value="ديب فريزر">ديب فريزر</option>
            <option value="تكييف">تكييف</option>
            <option value="بوتاجاز أو سخان">بوتاجاز أو سخان</option>
            <option value="مايكروويف">مايكروويف</option>
          </select>
        </div>
      </div>

      <button type="submit" className="btn btn-primary form-submit-btn" disabled={loading}>
        {loading ? "جاري تحويلك لواتساب..." : "إرسال طلب الصيانة ←"}
      </button>
    </form>
  );
}
