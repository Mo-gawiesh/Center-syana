import Link from "next/link";
import { getSiteConfig } from "../../lib/api";
import Hero from "../../components/Hero";
import BrandsMarquee from "../../components/BrandsMarquee";
import ServicesGrid from "../../components/ServicesGrid";
import StatsCounter from "../../components/StatsCounter";
import TestimonialsSlider from "../../components/TestimonialsSlider";
import FAQAccordion from "../../components/FAQAccordion";
import InquiryForm from "../../components/InquiryForm";
import BrandsGrid from "../../components/BrandsGrid";
import { generateSiteMetadata } from "../../lib/seo";

export async function generateMetadata() {
  return await generateSiteMetadata();
}

export default async function HomePage() {
  const { company, settings, brands, services, faqs, testimonials } = await getSiteConfig("published");

  const contact = settings?.contact || {};
  const homepage = settings?.homepage || {};
  const stats = homepage.statistics || [];

  return (
    <>
      <Hero
        heroTitle={homepage.heroTitle}
        heroSubtitle={homepage.heroSubtitle}
        hotline={contact.hotline}
      />

      <BrandsMarquee brands={brands} />

      {/* Why Choose Us */}
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
              <div className="why-icon red" aria-hidden="true" style={{ marginTop: "var(--sp-2)" }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 9.3l5.5-5.5a2.12 2.12 0 013 3l-5.5 5.5m-12 12l-1.5-1.5a3 3 0 010-4.24l6-6a3 3 0 014.24 0l1.5 1.5M14.7 9.3L4.2 19.8a2.12 2.12 0 003 3l10.5-10.5" />
                </svg>
              </div>
              <h3 className="why-card-title">قطع غيار أصلية 100%</h3>
              <p className="why-card-desc">نستخدم حصراً قطع الغيار الأصلية الصادرة من الشركات المصنعة مع ضمان على كل قطعة.</p>
              <Link href="/services" className="why-card-link">اعرف المزيد ←</Link>
            </article>

            <article className="glass-card why-card reveal revealed delay-2" role="listitem">
              <div className="why-icon gold" aria-hidden="true" style={{ marginTop: "var(--sp-2)" }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
                  <circle cx="12" cy="12" r="9" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
                </svg>
              </div>
              <h3 className="why-card-title">سرعة الاستجابة — 3 ساعات</h3>
              <p className="why-card-desc">نضمن وصول مهندس الصيانة إليك خلال 3 ساعات على الأكثر من وقت طلبك في أي مكان بمصر.</p>
              <Link href="/services" className="why-card-link">اعرف المزيد ←</Link>
            </article>

            <article className="glass-card why-card reveal revealed delay-3" role="listitem">
              <div className="why-icon red" aria-hidden="true" style={{ marginTop: "var(--sp-2)" }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
              <h3 className="why-card-title">فنيون معتمدون ومدربون</h3>
              <p className="why-card-desc">جميع فنيينا حاصلون على شهادات معتمدة من الشركات المصنعة ويخضعون لتدريب دوري مستمر.</p>
              <Link href="/services" className="why-card-link">اعرف المزيد ←</Link>
            </article>

            <article className="glass-card why-card reveal revealed delay-1" role="listitem">
              <div className="why-icon gold" aria-hidden="true" style={{ marginTop: "var(--sp-2)" }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
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
              <div className="why-icon red" aria-hidden="true" style={{ marginTop: "var(--sp-2)" }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              </div>
              <h3 className="why-card-title">تغطية جميع أنحاء مصر</h3>
              <p className="why-card-desc">شبكة من أكثر من 28 فرعاً تغطي القاهرة الكبرى، الإسكندرية، وباقي المحافظات.</p>
              <Link href="/services" className="why-card-link">اعرف المزيد ←</Link>
            </article>

            <article className="glass-card why-card reveal revealed delay-3" role="listitem">
              <div className="why-icon blue" aria-hidden="true" style={{ marginTop: "var(--sp-2)" }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
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

          {/* Stats Horizontal Card */}
          <div className="glass-card stats-strip-card reveal revealed" aria-label="إحصائيات">
            {stats.map((stat: any, idx: number) => (
              <div key={idx} className="stats-strip-col">
                <div className="stats-strip-icon">
                  {idx === 0 && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                    </svg>
                  )}
                  {idx === 1 && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                    </svg>
                  )}
                  {idx === 2 && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  )}
                </div>
                <div className="stats-strip-info">
                  <div className="stats-strip-num">
                    <StatsCounter value={stat.value} />
                  </div>
                  <div className="stats-strip-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section services-overview" id="services" aria-labelledby="services-heading">
        <div className="container services-overview-container">
          <div className="services-overview-content reveal revealed">
            <p className="section-label">تعهدنا وجودتنا</p>
            <h2 className="section-title" id="services-heading">خدمات <span>الهندسية للتوكيلات</span></h2>
            <p className="section-sub-bold">الالتزام والجودة هما مبدأنا الأساسي في كل أعمال الصيانة</p>
            <p className="section-desc">
              نقدم خدمات صيانة متكاملة لجميع الأجهزة المنزلية الكبيرة والصغيرة. فريقنا مدرب على أعلى مستوى لتشخيص الأعطال فوراً وإصلاحها بالمنزل باستخدام أفضل المعدات وقطع الغيار الأصلية.
            </p>
            
            <ServicesGrid services={services} variant="overview" />

            <div style={{ marginTop: "var(--sp-8)" }}>
              <Link href="/services" className="btn btn-outline" aria-label="عرض جميع الخدمات بالتفصيل">
                عرض جميع الخدمات بالتفصيل
              </Link>
            </div>
          </div>
          <div className="services-overview-image-wrap reveal revealed delay-1">
            <img src="/assets/Main photos/Air Conditioner Maintenance.jpeg" width="1200" height="800" alt="صيانة تكييفات الهندسية للتوكيلات" className="services-overview-img" loading="lazy" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-strip-section" aria-label="اتصال سريع">
        <div className="container">
          <div className="glass-card cta-strip-card reveal revealed">
            <div className="cta-strip-content">
              <h2 className="cta-strip-title">هل واجهت عطلاً مفاجئاً في أجهزتك المنزلية؟</h2>
              <p className="cta-strip-desc">تواصل معنا الآن، وسيقوم أحد مهندسي الصيانة بزيارتك خلال 3 ساعات فقط لإصلاح العطل فورا بالمنزل.</p>
            </div>
            <div className="cta-strip-actions">
              <a href={`tel:${contact.hotline || "16481"}`} className="btn btn-primary btn-lg" aria-label="اتصل بنا على الخط الساخن">
                اتصل بنا: {contact.hotline || "16481"}
              </a>
              <Link href="/contact" className="btn btn-outline btn-lg" aria-label="طلب صيانة عبر الإنترنت">
                طلب صيانة أونلاين
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" id="testimonials" aria-labelledby="testimonials-heading">
        <div className="container">
          <div className="reveal revealed" style={{ textAlign: "center" }}>
            <p className="section-label">تقييمات العملاء</p>
            <h2 className="section-title" id="testimonials-heading">ماذا يقول <span>عملاؤنا؟</span></h2>
          </div>

          <TestimonialsSlider testimonials={testimonials} />
        </div>
      </section>

      {/* Brands Grid Section */}
      <section className="section brands" id="brands" aria-labelledby="brands-heading">
        <div className="container">
          <div className="reveal revealed" style={{ textAlign: "center" }}>
            <p className="section-label">شركاء الجودة</p>
            <h2 className="section-title" id="brands-heading"><span>الماركات</span> المعتمدة لدينا</h2>
            <p className="section-sub" style={{ marginInline: "auto", textAlign: "center", marginTop: "var(--sp-2)" }}>
              معتمدون رسمياً لصيانة أكبر الماركات العالمية والمحلية
            </p>
          </div>

          <BrandsGrid brands={brands} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section faq" id="faq" aria-labelledby="faq-heading">
        <div className="container">
          <div className="reveal revealed" style={{ textAlign: "center" }}>
            <p className="section-label">الأسئلة الشائعة</p>
            <h2 className="section-title" id="faq-heading">إجابات <span>تساعدك</span></h2>
          </div>

          <div className="faq-grid">
            <FAQAccordion faqs={faqs} />
            
            <div className="faq-image-wrap reveal revealed delay-1">
              <img src="/assets/Main photos/Customer Interaction.jpeg" width="1200" height="798" alt="خدمة عملاء صيانة الهندسية للتوكيلات" className="faq-img" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form / Contact Section */}
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

            <InquiryForm companyId={company._id} whatsappNumber={settings.social?.whatsapp} />
          </div>
        </div>
      </section>
    </>
  );
}
