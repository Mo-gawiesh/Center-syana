import Link from "next/link";
import { getSiteConfig } from "../../../lib/api";
import ServicesGrid from "../../../components/ServicesGrid";
import InquiryForm from "../../../components/InquiryForm";
import { generateSiteMetadata } from "../../../lib/seo";

export async function generateMetadata() {
  return await generateSiteMetadata("خدماتنا - صيانة الأجهزة المنزلية", "صيانة احترافية لثلاجات، غسالات، تكييفات، وديب فريزر لجميع الماركات بقطع غيار أصلية وضمان.");
}

export default async function ServicesPage() {
  const { company, settings, services } = await getSiteConfig("published");
  const contact = settings?.contact || {};
  const social = settings?.social || {};

  return (
    <>
      <section className="brand-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">الرئيسية</Link>
            <span className="sep">←</span>
            <span className="current">خدماتنا</span>
          </div>
          <h1 className="brand-hero-title">خدماتنا</h1>
        </div>
      </section>

      <section className="section" id="services" aria-labelledby="services-heading">
        <div className="container">
          <div className="reveal revealed" style={{ textAlign: "center" }}>
            <p className="section-label">خدماتنا</p>
            <h2 className="section-title" id="services-heading">نصلح كل جهاز <span>بمهنية عالية</span></h2>
            <p className="section-sub" style={{ marginInline: "auto", textAlign: "center", marginTop: "var(--sp-2)" }}>
              خبرة متراكمة في صيانة جميع أنواع الأجهزة المنزلية لكل الماركات
            </p>
          </div>

          <ServicesGrid services={services} variant="detailed" hotline={contact.hotline} />
        </div>
      </section>

      {/* Inquiry Form CTA */}
      <section className="section cta-section" id="contact" aria-labelledby="cta-heading" style={{ marginTop: "var(--sp-12)" }}>
        <div className="container cta-form-container reveal revealed">
          <div className="cta-form-info">
            <h2 className="cta-form-title" id="cta-heading">طلب صيانة فورية</h2>
            <p className="cta-form-subtitle">إذا واجهتك أي مشكلة في أجهزتك المنزلية، يمكنك حجز صيانة فورية الآن. نصلك خلال 3 ساعات من طلبك.</p>
            <div className="cta-form-hotline-card">
              <span className="hotline-label">الخط الساخن للصيانة السريعة</span>
              <a href={`tel:${contact.hotline || "16481"}`} className="hotline-btn">📞 {contact.hotline || "16481"} — اتصل الآن</a>
            </div>
          </div>

          <div className="cta-form-card">
            <h3 className="form-card-title">نموذج طلب الصيانة</h3>
            <InquiryForm companyId={company._id} whatsappNumber={social.whatsapp} />
          </div>
        </div>
      </section>
    </>
  );
}
