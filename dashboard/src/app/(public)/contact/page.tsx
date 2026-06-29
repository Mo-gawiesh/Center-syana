import Link from "next/link";
import { getSiteConfig } from "../../../lib/api";
import InquiryForm from "../../../components/InquiryForm";
import { generateSiteMetadata } from "../../../lib/seo";

export async function generateMetadata() {
  return await generateSiteMetadata("تواصل معنا - ارقام الخط الساخن", "اتصل بنا على الخط الساخن 16481 أو تواصل معنا عبر واتساب لحجز صيانة فورية للأجهزة المنزلية بجميع المحافظات.");
}

export default async function ContactPage() {
  const { company, settings } = await getSiteConfig("published");
  const contact = settings?.contact || {};
  const social = settings?.social || {};

  return (
    <>
      <section className="brand-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">الرئيسية</Link>
            <span className="sep">←</span>
            <span className="current">تواصل معنا</span>
          </div>
          <h1 className="brand-hero-title">تواصل معنا</h1>
        </div>
      </section>

      <section className="section contact" id="contact" aria-labelledby="contact-heading">
        <div className="container">
          <div className="reveal revealed" style={{ textAlign: "center" }}>
            <p className="section-label">تواصل معنا</p>
            <h2 className="section-title" id="contact-heading">طلب <span>صيانة فورية</span></h2>
            <p className="section-sub" style={{ marginInline: "auto", textAlign: "center", marginTop: "var(--sp-2)" }}>
              املأ النموذج أدناه لتسجيل طلب الصيانة الخاص بك وسنتواصل معك فوراً لتأكيد الموعد
            </p>
          </div>

          <div className="contact-grid">
            <div className="contact-info reveal revealed">
              <h3 className="contact-info-title">بيانات الاتصال السريع</h3>
              <p className="contact-info-desc">نسعد دائماً بخدمتكم وتلبية اتصالاتكم على مدار الساعة طوال أيام الأسبوع.</p>
              
              <div className="contact-info-list" role="list">
                <div className="contact-info-item" role="listitem">
                  <div className="contact-info-icon" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                  </div>
                  <div>
                    <div className="contact-item-label">الخط الساخن المباشر</div>
                    <a href={`tel:${contact.hotline || "16481"}`} className="contact-item-value">{contact.hotline || "16481"}</a>
                  </div>
                </div>

                <div className="contact-info-item" role="listitem">
                  <div className="contact-info-icon" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                    </svg>
                  </div>
                  <div>
                    <div className="contact-item-label">رقم الهاتف الجوال</div>
                    <a href={`tel:${contact.phone || "01062842903"}`} className="contact-item-value">{contact.phone || "01062842903"}</a>
                  </div>
                </div>

                <div className="contact-info-item" role="listitem">
                  <div className="contact-info-icon" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  </div>
                  <div>
                    <div className="contact-item-label">الفرع الرئيسي للشركة</div>
                    <div className="contact-item-value">{contact.address || "المهندسين، الجيزة"}</div>
                  </div>
                </div>
              </div>
            </div>

            <InquiryForm companyId={company._id} whatsappNumber={social.whatsapp} />
          </div>
        </div>
      </section>
    </>
  );
}
