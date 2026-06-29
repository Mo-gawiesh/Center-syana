import Link from "next/link";
import { getSiteConfig } from "../../../lib/api";
import StatsCounter from "../../../components/StatsCounter";
import { generateSiteMetadata } from "../../../lib/seo";

export async function generateMetadata() {
  return await generateSiteMetadata("لماذا نحن؟ - مميزات خدماتنا", "تعرف على مميزات صيانة الأجهزة المنزلية لدى الهندسية للتوكيلات: قطع غيار أصلية، فنيون معتمدون، ضمان معتمد، وسرعة استجابة خلال 3 ساعات.");
}

export default async function WhyUsPage() {
  const { settings } = await getSiteConfig("published");
  const homepage = settings?.homepage || {};
  const stats = homepage.statistics || [];
  const contact = settings?.contact || {};

  return (
    <>
      <section className="brand-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">الرئيسية</Link>
            <span className="sep">←</span>
            <span className="current">لماذا نحن؟</span>
          </div>
          <h1 className="brand-hero-title">لماذا نحن؟</h1>
        </div>
      </section>

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

      {/* Inline CTA */}
      <section className="section" style={{ paddingBlock: "var(--sp-8) 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <Link href="/contact" className="btn btn-primary btn-lg" style={{ minWidth: "220px" }}>
            احجز زيارة منزلية الآن
          </Link>
        </div>
      </section>
    </>
  );
}
