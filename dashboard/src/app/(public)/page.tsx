import Link from "next/link";
import Hero from "../../components/Hero";
import OffersStrip from "../../components/OffersStrip";
import ServicesGrid from "../../components/ServicesGrid";
import StatsCounter from "../../components/StatsCounter";
import TestimonialsSlider from "../../components/TestimonialsSlider";
import FAQAccordion from "../../components/FAQAccordion";
import BlogTips from "../../components/BlogTips";
import InquiryForm from "../../components/InquiryForm";
import BrandsGrid from "../../components/BrandsGrid";
import { fallbackBrands, fallbackFaqs, fallbackServices, fallbackSettings, fallbackTestimonials } from "../../lib/static-site";
import { generateSiteMetadata } from "../../lib/seo";

export async function generateMetadata() {
  return await generateSiteMetadata();
}

export default function HomePage() {
  const contact = fallbackSettings.contact;
  const social = fallbackSettings.social;
  const homepage = fallbackSettings.homepage;
  const stats = homepage.statistics || [];

  return (
    <>
      <Hero
        heroTitle={homepage.heroTitle}
        heroSubtitle={homepage.heroSubtitle}
        hotline={contact.hotline}
        brands={fallbackBrands}
      />

      <OffersStrip />

      <section className="section why-us" id="why-us" aria-labelledby="why-heading">
        <div className="container">
          <div className="reveal revealed" style={{ textAlign: "center" }}>
            <p className="section-label">مميزاتنا</p>
            <h2 className="section-title" id="why-heading">لماذا تختار <span>الهندسية للتوكيلات؟</span></h2>
            <p className="section-sub" style={{ marginInline: "auto", textAlign: "center", marginTop: "var(--sp-2)" }}>
              بنقدر نفرق لأننا بنهتم بكل تفصيلة في خدمة عميلنا
            </p>
          </div>

          <div className="why-grid" role="list">
            <article className="glass-card why-card reveal revealed delay-1" role="listitem">
              <div className="why-icon red" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" width="28" height="28">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 9.3l5.5-5.5a2.12 2.12 0 013 3l-5.5 5.5m-12 12l-1.5-1.5a3 3 0 010-4.24l6-6a3 3 0 014.24 0l1.5 1.5M14.7 9.3L4.2 19.8a2.12 2.12 0 003 3l10.5-10.5" />
                </svg>
              </div>
              <h3 className="why-card-title">قطع غيار أصلية 100%</h3>
              <p className="why-card-desc">نستخدم حصرياً قطع الغيار الأصلية الصادرة من الشركات المصنعة مع ضمان على كل قطعة.</p>
              <Link href="/services" className="why-card-link">اعرف المزيد ←</Link>
            </article>

            <article className="glass-card why-card reveal revealed delay-2" role="listitem">
              <div className="why-icon gold" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" width="28" height="28">
                  <circle cx="12" cy="12" r="9" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
                </svg>
              </div>
              <h3 className="why-card-title">سرعة الاستجابة — 3 ساعات</h3>
              <p className="why-card-desc">نضمن وصول مهندس الصيانة إليك خلال 3 ساعات على الأكثر من وقت طلبك في أي مكان بمصر.</p>
              <Link href="/contact" className="why-card-link">احجز الآن ←</Link>
            </article>

            <article className="glass-card why-card reveal revealed delay-3" role="listitem">
              <div className="why-icon red" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" width="28" height="28">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
              <h3 className="why-card-title">فنيون معتمدون ومدربون</h3>
              <p className="why-card-desc">جميع فنيينا حاصلون على شهادات معتمدة من الشركات المصنعة ويخضعون لتدريب دوري مستمر.</p>
              <Link href="/services" className="why-card-link">اعرف المزيد ←</Link>
            </article>

            <article className="glass-card why-card reveal revealed delay-1" role="listitem">
              <div className="why-icon gold" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" width="28" height="28">
                  <circle cx="12" cy="9" r="6" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5.5l1.2 2.4 2.6.4-1.9 1.8.5 2.6-2.4-1.3-2.4 1.3.5-2.6-1.9-1.8 2.6-.4L12 5.5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.5L6.5 21l5.5-2 5.5 2-2.5-6.5" />
                </svg>
              </div>
              <h3 className="why-card-title">ضمان على جميع الأعمال</h3>
              <p className="why-card-desc">نقدم ضمان مكتوب على كل خدمة صيانة وقطعة غيار — راحتك هي أولويتنا.</p>
              <Link href="/services" className="why-card-link">اعرف المزيد ←</Link>
            </article>

            <article className="glass-card why-card reveal revealed delay-2" role="listitem">
              <div className="why-icon red" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" width="28" height="28">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              </div>
              <h3 className="why-card-title">تغطية جميع أنحاء مصر</h3>
              <p className="why-card-desc">شبكة من أكثر من 28 فرعاً تغطي القاهرة الكبرى، الإسكندرية، وباقي المحافظات.</p>
              <Link href="/services" className="why-card-link">اعرف المزيد ←</Link>
            </article>

            <article className="glass-card why-card reveal revealed delay-3" role="listitem">
              <div className="why-icon blue" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" width="28" height="28">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path strokeLinecap="round" d="M3 10h18" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 8h3a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-3V8z" />
                  <circle cx="18.5" cy="12" r="1" />
                </svg>
              </div>
              <h3 className="why-card-title">أسعار شفافة ومعقولة</h3>
              <p className="why-card-desc">لا مصاريف خفية. نقدم تقرير تشخيص مجاني وفاتورة واضحة قبل بدء أي عمل.</p>
              <Link href="/services" className="why-card-link">اعرف المزيد ←</Link>
            </article>
          </div>

          <div className="glass-card stats-strip-card reveal revealed" aria-label="إحصائيات">
            {stats.map((stat) => (
              <div key={stat.label} className="stats-strip-col">
                <div className="stats-strip-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" width="38" height="38">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </div>
                <div className="stats-strip-info">
                  <div className="stats-strip-num"><StatsCounter value={stat.value} /></div>
                  <div className="stats-strip-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section services-overview" id="services" aria-labelledby="services-heading">
        <div className="container services-overview-container">
          <div className="services-overview-content reveal revealed">
            <p className="section-label">تعهّدنا وجودتنا</p>
            <h2 className="section-title" id="services-heading">خدمات <span>الهندسية للتوكيلات</span></h2>
            <p className="section-sub-bold">الالتزام والجودة هما مبدأنا الأساسي في كل أعمال الصيانة</p>
            <p className="section-desc">
              نقدم خدمات صيانة متكاملة لجميع الأجهزة المنزلية الكبيرة والصغيرة. فريقنا مدرب على أعلى مستوى لتشخيص الأعطال فوراً وإصلاحها بالمنزل باستخدام أفضل المعدات وقطع الغيار الأصلية.
            </p>
            <ServicesGrid services={fallbackServices} variant="overview" />
            <div style={{ marginTop: "var(--sp-4)" }}>
              <Link href="/services" className="btn btn-primary" aria-label="عرض جميع الخدمات بالتفصيل">
                عرض جميع الخدمات بالتفصيل ←
              </Link>
            </div>
          </div>
          <div className="services-overview-image-wrap reveal revealed delay-2">
            <img src="/assets/Main photos/Technician Portrait.jpeg" width="1200" height="669" alt="فني صيانة الهندسية للتوكيلات" className="services-overview-image" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="section brands" id="brands" aria-labelledby="brands-heading">
        <div className="container">
          <div className="reveal revealed" style={{ textAlign: "center" }}>
            <p className="section-label">شركاء الجودة</p>
            <h2 className="section-title" id="brands-heading"><span>الماركات</span> المعتمدة لدينا</h2>
            <p className="section-sub" style={{ marginInline: "auto", textAlign: "center", marginTop: "var(--sp-2)" }}>
              معتمدون رسمياً لصيانة أكبر الماركات العالمية والمحلية
            </p>
          </div>
          <BrandsGrid brands={fallbackBrands} />
        </div>
      </section>

      <section className="section" id="testimonials" aria-labelledby="testimonials-heading">
        <div className="container">
          <div className="reveal revealed" style={{ textAlign: "center" }}>
            <p className="section-label">تقييمات العملاء</p>
            <h2 className="section-title" id="testimonials-heading">ماذا يقول <span>عملاؤنا؟</span></h2>
          </div>
          <TestimonialsSlider testimonials={fallbackTestimonials} />
        </div>
      </section>

      <section className="section faq" id="faq" aria-labelledby="faq-heading">
        <div className="container">
          <div className="reveal revealed" style={{ textAlign: "center" }}>
            <p className="section-label">الأسئلة الشائعة</p>
            <h2 className="section-title" id="faq-heading">لديك استفسار؟ <span>أجوبة لأسئلتك</span></h2>
          </div>

          <div className="faq-container">
            <div className="faq-graphic reveal revealed">
              <div className="faq-graphic-wrap">
                <div className="faq-graphic-dots" aria-hidden="true"></div>
                <div className="faq-bubble faq-bubble-main" aria-hidden="true"><span className="faq-question-mark">؟</span></div>
                <div className="faq-bubble faq-bubble-sub" aria-hidden="true"><span className="faq-question-mark">؟</span></div>
              </div>
            </div>
            <div className="faq-accordion">
              <FAQAccordion faqs={fallbackFaqs} />
            </div>
          </div>
        </div>
      </section>

      <BlogTips />

      <section className="section cta-section" id="contact" aria-labelledby="cta-heading">
        <div className="container cta-form-container reveal revealed">
          <div className="cta-form-info">
            <h2 className="cta-form-title" id="cta-heading">طلب صيانة فورية</h2>
            <p className="cta-form-subtitle">إذا واجهتك أي مشكلة في أجهزتك المنزلية، يمكنك حجز صيانة فورية الآن. نصلك خلال 3 ساعات من طلبك.</p>
            <div className="cta-form-hotline-card">
              <span className="hotline-label">الخط الساخن للصيانة السريعة</span>
              <a href={`tel:${contact.hotline}`} className="hotline-btn">📞 {contact.hotline} — اتصل الآن</a>
            </div>
          </div>

          <div className="cta-form-card">
            <h3 className="form-card-title">نموذج طلب الصيانة</h3>
            <InquiryForm whatsappNumber={social.whatsapp} />
          </div>
        </div>
      </section>
    </>
  );
}
