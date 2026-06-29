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

      {/* ================================================
       CTA / CONTACT SECTION (Form from Design)
       ================================================ */}
      <section className="section cta-section" id="contact" aria-labelledby="cta-heading">
        <div className="container cta-form-container reveal revealed">
          {/* Left Side: Info & Hotline */}
          <div className="cta-form-info">
            <h2 className="cta-form-title" id="cta-heading">طلب صيانة فورية</h2>
            <p className="cta-form-subtitle">
              إذا واجهتك أي مشكلة في أجهزتك المنزلية، يمكنك حجز صيانة فورية الآن. نصلك خلال 3 ساعات من طلبك.
            </p>
            <div className="cta-form-hotline-card">
              <span className="hotline-label">الخط الساخن للصيانة السريعة</span>
              <a href={`tel:${contact.hotline || "16481"}`} className="hotline-btn">📞 {contact.hotline || "16481"} — اتصل الآن</a>
            </div>
          </div>

          {/* Right Side: Form Card */}
          <div className="cta-form-card">
            <h3 className="form-card-title">نموذج طلب الصيانة</h3>
            <InquiryForm companyId={company._id} whatsappNumber={social.whatsapp} />
          </div>
        </div>
      </section>
    </>
  );
}
