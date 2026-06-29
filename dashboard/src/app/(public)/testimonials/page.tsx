import Link from "next/link";
import { getSiteConfig } from "../../../lib/api";
import TestimonialsSlider from "../../../components/TestimonialsSlider";
import InquiryForm from "../../../components/InquiryForm";
import { generateSiteMetadata } from "../../../lib/seo";

export async function generateMetadata() {
  return await generateSiteMetadata("آراء العملاء - تقييمات الخدمة", "شاهد تقييمات وآراء عملائنا في القاهرة والجيزة وجميع محافظات مصر حول سرعة وجودة صيانة الأجهزة المنزلية.");
}

export default async function TestimonialsPage() {
  const { company, settings, testimonials } = await getSiteConfig("published");
  const contact = settings?.contact || {};
  const social = settings?.social || {};

  return (
    <>
      <section className="brand-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">الرئيسية</Link>
            <span className="sep">←</span>
            <span className="current">آراء العملاء</span>
          </div>
          <h1 className="brand-hero-title">آراء العملاء</h1>
        </div>
      </section>

      <section className="section" id="testimonials" aria-labelledby="testimonials-heading">
        <div className="container">
          <div className="reveal revealed" style={{ textAlign: "center" }}>
            <p className="section-label">تقييمات العملاء</p>
            <h2 className="section-title" id="testimonials-heading">ماذا يقول <span>عملاؤنا؟</span></h2>
          </div>

          <TestimonialsSlider testimonials={testimonials} />
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
