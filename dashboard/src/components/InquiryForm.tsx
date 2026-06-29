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
  const [appliance, setAppliance] = useState("ثلاجات");
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
    setAppliance("ثلاجات");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="inquiry-form glass-card reveal delay-1" id="inquiry-form">
      <div className="form-group">
        <label htmlFor="form-name">الاسم بالكامل</label>
        <input
          type="text"
          id="form-name"
          placeholder="أدخل اسمك ثلاثي"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="form-phone">رقم الهاتف</label>
        <input
          type="tel"
          id="form-phone"
          placeholder="رقم الهاتف للتواصل"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="form-loc">المحافظة / المدينة</label>
        <input
          type="text"
          id="form-loc"
          placeholder="أدخل عنوانك بالتفصيل"
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="form-appliance">الجهاز المراد صيانته</label>
        <select
          id="form-appliance"
          required
          value={appliance}
          onChange={(e) => setAppliance(e.target.value)}
        >
          <option value="ثلاجات">ثلاجات</option>
          <option value="غسالات">غسالات</option>
          <option value="ديب فريزر">ديب فريزر</option>
          <option value="تكييفات">تكييفات</option>
          <option value="غسالات أطباق">غسالات أطباق</option>
          <option value="بوتاجازات وسخانات">بوتاجازات وسخانات</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
        {loading ? "جاري تحويلك لواتساب..." : "تقديم طلب صيانة الآن ←"}
      </button>
    </form>
  );
}
