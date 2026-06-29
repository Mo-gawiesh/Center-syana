import Link from "next/link";

interface BrandItem {
  name: string;
  slug: string;
}

interface FooterProps {
  logoUrl?: string;
  hotline: string;
  phone: string;
  address: string;
  workingHours: string;
  whatsapp: string;
  brands: BrandItem[];
}

export default function Footer({ logoUrl, hotline, phone, address, workingHours, whatsapp, brands }: FooterProps) {
  const popularBrands = brands.slice(0, 5);

  return (
    <footer className="footer" role="contentinfo" aria-label="تذييل الصفحة">
      <div className="container">
        <div className="footer-grid">
          
          {/* Brand Info Column */}
          <div className="footer-brand-col">
            <img src={logoUrl || "/assets/Logo/logo.png"} width="533" height="800" alt="الهندسية للتوكيلات للصيانة" style={{ height: "45px", objectFit: "contain", marginBottom: "var(--sp-4)" }} />
            <p className="footer-brand-desc">
              الهندسية للتوكيلات هي مركز الصيانة المعتمد الأول للأجهزة المنزلية في مصر. نوفر قطع غيار أصلية وضمان معتمد يصل إلى عام.
            </p>
            <div className="footer-contact-info">
              <div className="footer-contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" width="16" height="16">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                <a href={`tel:${hotline || "16481"}`} style={{ color: "var(--clr-text-muted)" }}>الخط الساخن: {hotline || "16481"}</a>
              </div>
              <div className="footer-contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" width="16" height="16">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375 0 1 1-.75 0 .375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375 0 1 1-.75 0 .375 0 0 1 .75 0Zm0 0H12m4.125 0a.375 0 1 1-.75 0 .375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 18.09a2.6 2.6 0 0 1-.22-.047 5.977 5.977 0 0 0 1.93-3.21A8.561 8.561 0 0 1 6 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                </svg>
                <a href={`https://wa.me/${whatsapp || "201062842903"}`} target="_blank" rel="noopener noreferrer" style={{ color: "var(--clr-text-muted)" }}>واتساب: {phone || "01062842903"}</a>
              </div>
              <div className="footer-contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" width="16" height="16">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                {address || "المهندسين، الجيزة"} — تغطية جميع المحافظات
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="footer-col-title">خدماتنا</h3>
            <ul className="footer-links" role="list">
              <li><Link href="/services" className="footer-link">صيانة الثلاجات</Link></li>
              <li><Link href="/services" className="footer-link">صيانة الغسالات</Link></li>
              <li><Link href="/services" className="footer-link">صيانة الديب فريزر</Link></li>
              <li><Link href="/services" className="footer-link">صيانة التكييفات</Link></li>
            </ul>
            <h3 className="footer-col-title" style={{ marginTop: "var(--sp-4)" }}>الماركات الشائعة</h3>
            <ul className="footer-links" role="list">
              {popularBrands.map((brand) => (
                <li key={brand.slug}>
                  <Link href={`/brands/${brand.slug}`} className="footer-link">
                    صيانة {brand.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours & Important links Column */}
          <div>
            <h3 className="footer-col-title">مواعيد العمل</h3>
            <ul className="footer-links" role="list">
              <li><span className="footer-link" style={{ cursor: "default" }}>{workingHours || "السبت – الخميس: 9 ص – 10 م"}</span></li>
              <li><span className="footer-link" style={{ cursor: "default" }}>الجمعة: 11 ص – 8 م</span></li>
              <li><span className="footer-link" style={{ cursor: "default" }}>خدمة الطوارئ: 24/7</span></li>
            </ul>
            <h3 className="footer-col-title" style={{ marginTop: "var(--sp-4)" }}>روابط مهمة</h3>
            <ul className="footer-links" role="list">
              <li><Link href="/why-us" className="footer-link">لماذا نحن؟</Link></li>
              <li><Link href="/testimonials" className="footer-link">آراء العملاء</Link></li>
              <li><Link href="/brands" className="footer-link">الماركات المعتمدة</Link></li>
              <li><Link href="/contact" className="footer-link">تواصل معنا</Link></li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 الهندسية للتوكيلات للصيانة. جميع الحقوق محفوظة.
          </p>
          <p className="footer-disclaimer">
            <strong>إخلاء مسؤولية:</strong> هذا الموقع غير تابع لأي شركة صيانة رسمية معتمدة من الشركات المصنعة ولا يُعد ممثلاً قانونياً لها.
          </p>
        </div>
      </div>

      {/* Floating WhatsApp and Call Buttons */}
      <a href={`https://wa.me/${whatsapp || "201062842903"}`} target="_blank" rel="noopener noreferrer" className="floating-whatsapp-btn" aria-label="تواصل معنا عبر واتساب">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width="20" height="20">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
        </svg>
        <span className="tooltip-text">تواصل معنا عبر واتساب</span>
      </a>

      <a href={`tel:${hotline || "16481"}`} className="floating-call-btn" aria-label="اتصل مباشرة بالصيانة">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" width="20" height="20">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
        </svg>
        <span className="tooltip-text">اتصل مباشرة بالصيانة</span>
      </a>
    </footer>
  );
}
