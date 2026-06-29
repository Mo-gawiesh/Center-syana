import Link from "next/link";
import { getSiteConfig } from "../../../../lib/api";
import InquiryForm from "../../../../components/InquiryForm";
import { generateSiteMetadata } from "../../../../lib/seo";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const { brands } = await getSiteConfig("published");
  const brand = brands.find((b: any) => b.name.toLowerCase().replace(/\s+/g, "-") === slug);
  
  if (!brand) return {};

  return await generateSiteMetadata(
    `صيانة ${brand.name} المعتمدة في مصر | 16481`,
    `مركز صيانة ${brand.name} معتمد في مصر. إصلاح ثلاجات، غسالات، تكييفات، وديب فريزر ${brand.name} بقطع غيار أصلية وضمان. اتصل الآن على 16481.`
  );
}

export default async function BrandDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const { company, settings, brands } = await getSiteConfig("published");
  const brand = brands.find((b: any) => b.name.toLowerCase().replace(/\s+/g, "-") === slug);

  if (!brand) {
    notFound();
  }

  const contact = settings?.contact || {};
  const social = settings?.social || {};
  const brandName = brand.name;

  // Custom-tailored services list
  const brandServices = [
    {
      title: `ثلاجات ${brandName}`,
      img: "/assets/Products/refrigerator.png",
      problems: [
        "الثلاجة مش بتبرد كفاية",
        "صوت عالي من الكمبريسور",
        "تجمع ثلج زيادة",
        "مشكلة لوحة التحكم",
        `شحن فريون ${brandName}`,
      ],
    },
    {
      title: `غسالات ${brandName}`,
      img: "/assets/Products/Washer.png",
      problems: [
        "الغسالة وقفت فجأة",
        "مشكلة في البرنامج",
        "الطبلة مش بتدور",
        "تسريب ماء",
        "خطأ على الشاشة",
      ],
    },
    {
      title: `تكييفات ${brandName}`,
      img: "/assets/Products/conditioning.png",
      problems: [
        "التكييف مش بيبرد",
        "ضعف في الهواء",
        "شحن فريون",
        "صيانة دورية وتنظيف",
        "مشكلة الريموت",
      ],
    },
    {
      title: `غسالات أطباق ${brandName}`,
      img: "/assets/Products/Dishwasher.png",
      problems: [
        "انسداد الفلتر والصرف",
        "الصحون غير نظيفة",
        "تسريب مياه سفلي",
        "توقف الرشاشات عن الدوران",
        "صوت اهتزاز قوي",
      ],
    },
    {
      title: `ديب فريزر ${brandName}`,
      img: "/assets/Products/Chest Freezer.png",
      problems: [
        "اللمبة الحمراء تضيء",
        "ضعف التجميد العام",
        "صوت اهتزاز الكباس",
        "تراكم جليد كثيف",
        "تلف مؤشر التيمر",
      ],
    },
    {
      title: `بوتاجازات ${brandName}`,
      img: "/assets/Products/Gas Cooker.png",
      problems: [
        "عيون الغاز لا تعمل",
        "ضعف شعلة الفرن",
        "عمل شواية البوتاجاز",
        "عطل الإشعال الذاتي",
        "تسريب غاز طفيف",
      ],
    },
  ];

  return (
    <>
      {/* Brand Hero */}
      <section className="brand-hero">
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/">الرئيسية</Link>
            <span className="sep">←</span>
            <Link href="/brands">الماركات</Link>
            <span className="sep">←</span>
            <span className="current">صيانة {brandName}</span>
          </nav>
          
          <div className="brand-hero-logo-wrap" style={{ marginBottom: "var(--sp-4)" }}>
            <img 
              src={brand.logoUrl || "/assets/Logo/logo.png"} 
              width={400} 
              height={98} 
              alt={`${brandName} Logo`} 
              style={{ height: "110px", objectFit: "contain" }} 
              fetchPriority="high" 
              loading="eager" 
            />
          </div>
          <div className="brand-hero-badge">{brandName} — Authorized Service Center</div>
          <h1 className="brand-hero-title">صيانة <span className="brand-name-accent">{brandName}</span> المعتمدة في مصر</h1>
          <p className="brand-hero-sub">مركز الصيانة الأول لأجهزة {brandName} في مصر. فريق متخصص، قطع غيار أصلية 100%، وضمان مكتوب على كل خدمة.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--sp-2)" }}>
            <a href={`tel:${contact.hotline || "16481"}`} className="btn btn-primary btn-lg">اتصل الآن — {contact.hotline || "16481"}</a>
            <a href={`https://wa.me/${social.whatsapp || "201062842903"}`} className="btn btn-outline btn-lg" target="_blank" rel="noopener noreferrer">واتساب</a>
          </div>
        </div>
      </section>

      {/* PRODUCT MARQUEE SECTION */}
      <section className="product-marquee-section">
        <div className="container">
          <div className="product-marquee-container">
            <div className="product-marquee-track">
              {[
                { name: "ثلاجات", img: "/assets/Products/refrigerator.png" },
                { name: "غسالات ملابس", img: "/assets/Products/Washer.png" },
                { name: "تكييفات", img: "/assets/Products/conditioning.png" },
                { name: "غسالات أطباق", img: "/assets/Products/Dishwasher.png" },
                { name: "ديب فريزر", img: "/assets/Products/Chest Freezer.png" },
                { name: "بوتاجازات", img: "/assets/Products/Gas Cooker.png" }
              ].concat([
                { name: "ثلاجات", img: "/assets/Products/refrigerator.png" },
                { name: "غسالات ملابس", img: "/assets/Products/Washer.png" },
                { name: "تكييفات", img: "/assets/Products/conditioning.png" },
                { name: "غسالات أطباق", img: "/assets/Products/Dishwasher.png" },
                { name: "ديب فريزر", img: "/assets/Products/Chest Freezer.png" },
                { name: "بوتاجازات", img: "/assets/Products/Gas Cooker.png" }
              ]).map((prod, idx) => (
                <div key={idx} className="product-marquee-item">
                  <img src={prod.img} width={400} height={600} alt={prod.name} loading="lazy" style={{ objectFit: "contain" }} />
                  <span className="product-marquee-label">{prod.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brand Services Grid */}
      <section className="section" id="services" aria-labelledby="brand-services-heading">
        <div className="container">
          <div className="reveal revealed" style={{ textAlign: "center" }}>
            <p className="section-label">خدمات {brandName}</p>
            <h2 className="section-title" id="brand-services-heading">أجهزة <span>{brandName}</span> التي نصلحها</h2>
          </div>

          <div className="brand-services-grid">
            {brandServices.map((service, i) => (
              <article key={i} className={`glass-card brand-service-card reveal revealed delay-${(i % 3) + 1}`}>
                <img
                  src={service.img}
                  width={400}
                  height={600}
                  alt={service.title}
                  className="service-product-img"
                  style={{ display: "block", marginBottom: "var(--sp-2)", objectFit: "contain" }}
                  loading="lazy"
                />
                <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--clr-text)", marginBottom: "var(--sp-2)" }}>
                  {service.title}
                </h3>
                <ul className="service-problems" aria-label={`أعطال ${service.title}`}>
                  {service.problems.map((p, idx) => (
                    <li key={idx} className="service-problem">{p}</li>
                  ))}
                </ul>
                <a href={`tel:${contact.hotline || "16481"}`} className="btn btn-outline" style={{ marginTop: "var(--sp-3)", width: "100%" }}>
                  احجز صيانة
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="section cta-section" id="contact" aria-labelledby="contact-heading">
        <div className="container cta-form-container reveal revealed">
          {/* Left Side: Info & Hotline */}
          <div className="cta-form-info">
            <h2 className="cta-form-title" id="contact-heading">طلب صيانة فورية</h2>
            <p className="cta-form-subtitle">
              إذا واجهتك أي مشكلة في أجهزتك المنزلية، يمكنك حجز صيانة فورية الآن. نصلك خلال 3 ساعات من طلبك.
            </p>
            <div className="cta-form-hotline-card">
              <span className="hotline-label">الخط الساخن المباشر لـ {brandName}</span>
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

      {/* LG OFFICIAL DETAILED INFO SECTION */}
      <section className="section info-details-section" style={{ background: "var(--clr-surface)", borderTop: "1px solid var(--clr-border)" }} aria-labelledby="info-details-heading">
        <div className="container">
          <div className="reveal revealed" style={{ textAlign: "center", maxWidth: "700px", marginInline: "auto", marginBottom: "var(--sp-6)" }}>
            <p className="section-label">الدعم الفني المعتمد</p>
            <h2 className="section-title" id="info-details-heading">خدمات مركز صيانة <span>{brandName}</span> الرئيسي في مصر</h2>
            <p style={{ color: "var(--clr-text-muted)", fontSize: "0.95rem", marginTop: "var(--sp-2)", fontFamily: "var(--font-arabic)" }}>
              نوفر لكم أرقى خدمات الدعم الفني والصيانة المنزلية المعتمدة لجميع أجهزة {brandName} بأحدث التقنيات وقطع الغيار الأصلية.
            </p>
          </div>

          <div className="why-grid">
            <div className="glass-card why-card reveal revealed delay-1" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <div className="info-details-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="28" height="28">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
              <div style={{ width: "32px", height: "3px", background: "var(--clr-primary)", marginBottom: "var(--sp-3)", borderRadius: "2px" }}></div>
              <h3 className="why-card-title" style={{ fontFamily: "var(--font-arabic)", textAlign: "center" }}>توكيل صيانة {brandName} في مصر</h3>
              <p className="why-card-desc" style={{ fontFamily: "var(--font-arabic)", fontSize: "0.88rem", lineHeight: "1.7", color: "var(--clr-text-muted)" }}>
                بمجرد التواصل معنا، نتيح لك أحدث التقنيات والأساليب المتطورة في إصلاح وصيانة أعطال {brandName} في جمهورية مصر العربية. لقد شهدت شركة {brandName} تطورات كبيرة في خطوط إنتاج الأجهزة المنزلية، وتعتبر شركتنا من أنجح مراكز صيانة غسالات، ثلاجات، ميكروويف، ديب فريزر، وبوتاجازات {brandName} في مصر.
              </p>
            </div>

            <div className="glass-card why-card reveal revealed delay-2" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <div className="info-details-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="28" height="28">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065Z" />
                </svg>
              </div>
              <div style={{ width: "32px", height: "3px", background: "var(--clr-primary)", marginBottom: "var(--sp-3)", borderRadius: "2px" }}></div>
              <h3 className="why-card-title" style={{ fontFamily: "var(--font-arabic)", textAlign: "center" }}>ضمان قطع غيار {brandName}</h3>
              <p className="why-card-desc" style={{ fontFamily: "var(--font-arabic)", fontSize: "0.88rem", lineHeight: "1.7", color: "var(--clr-text-muted)" }}>
                ضمان أجهزة {brandName} في مصر حقيقي ومعتمد، ويتم تفعيله فوراً بعد إتمام عملية الصيانة. يكون الضمان حسب قطع الغيار المستبدلة وقد يصل إلى سنة على أعمال الصيانة. نعتمد على قطع غيار أصلية مستوردة من بلد المنشأ لشركة {brandName} لضمان تفادي حدوث الخلل مرة أخرى.
              </p>
            </div>

            <div className="glass-card why-card reveal revealed delay-3" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <div className="info-details-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="28" height="28">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div style={{ width: "32px", height: "3px", background: "var(--clr-primary)", marginBottom: "var(--sp-3)", borderRadius: "2px" }}></div>
              <h3 className="why-card-title" style={{ fontFamily: "var(--font-arabic)", textAlign: "center" }}>خدمة عملاء {brandName} الموحدة</h3>
              <p className="why-card-desc" style={{ fontFamily: "var(--font-arabic)", fontSize: "0.88rem", lineHeight: "1.7", color: "var(--clr-text-muted)" }}>
                بمجرد التواصل مع خدمة عملاء صيانة {brandName} في مصر المتاحة على مدار الساعة 24/7، ستجد دعماً كاملاً من فريق ممثلي خدمة العملاء في القاهرة والجيزة والإسكندرية والمحافظات. ويتكون فريقنا من قسم بلاغات صيانة {brandName}، وقسم المتابعة الدورية، وقسم الشكاوى لضمان أعلى مستوى من الخدمة والرضا.
              </p>
            </div>

            <div className="glass-card why-card reveal revealed delay-1" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <div className="info-details-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="28" height="28">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div style={{ width: "32px", height: "3px", background: "var(--clr-primary)", marginBottom: "var(--sp-3)", borderRadius: "2px" }}></div>
              <h3 className="why-card-title" style={{ fontFamily: "var(--font-arabic)", textAlign: "center" }}>دعم منتجات {brandName} وتفعيل الضمان</h3>
              <p className="why-card-desc" style={{ fontFamily: "var(--font-arabic)", fontSize: "0.88rem", lineHeight: "1.7", color: "var(--clr-text-muted)" }}>
                دعم المنتجات من المحاور الأساسية لدينا لتطوير خدمات ما بعد البيع. بمجرد إتمام عملية الإصلاح المنزلية، يترك الفني للعميل شهادة ضمان معتمدة وفاتورة تفصيلية بقطع الغيار المستبدلة التالفة لضمان الشفافية وتفعيل الضمان الفعلي والكامل للمنتج.
              </p>
            </div>

            <div className="glass-card why-card reveal revealed delay-2" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <div className="info-details-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="28" height="28">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div style={{ width: "32px", height: "3px", background: "var(--clr-primary)", marginBottom: "var(--sp-3)", borderRadius: "2px" }}></div>
              <h3 className="why-card-title" style={{ fontFamily: "var(--font-arabic)", textAlign: "center" }}>كيفية تقديم طلب صيانة {brandName}</h3>
              <p className="why-card-desc" style={{ fontFamily: "var(--font-arabic)", fontSize: "0.88rem", lineHeight: "1.7", color: "var(--clr-text-muted)" }}>
                يمكن تقديم بلاغ صيانة معتمد بسهولة تامة عن طريق الاتصال بالخط الساخن لصيانة {brandName} في مصر {contact.hotline || "16481"}، أو عبر أرقام هواتف الدعم السريع {contact.phone || "01062842903"}، أو من خلال إرسال نموذج بلاغات الأعطال الإلكتروني المتاح في أسفل هذه الصفحة وسنقوم بالتواصل معك لتأكيد الموعد فوراً.
              </p>
            </div>

            <div className="glass-card why-card reveal revealed delay-3" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <div className="info-details-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="28" height="28">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.25.588 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.97-2.883a1 1 0 00-1.176 0l-3.97 2.883c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.97-2.883c-.77-.57-.372-1.81.588-1.81h4.906a1 1 0 00.95-.69l1.519-4.674z" />
                </svg>
              </div>
              <div style={{ width: "32px", height: "3px", background: "var(--clr-primary)", marginBottom: "var(--sp-3)", borderRadius: "2px" }}></div>
              <h3 className="why-card-title" style={{ fontFamily: "var(--font-arabic)", textAlign: "center" }}>ما يميز مركزنا في مصر</h3>
              <p className="why-card-desc" style={{ fontFamily: "var(--font-arabic)", fontSize: "0.88rem", lineHeight: "1.7", color: "var(--clr-text-muted)" }}>
                نحقق المعادلة الصعبة للسوق المصري بتوفير أفضل جودة صيانة وخبرة مهندسين مع تكنولوجيا {brandName} العالمية بأسعار اقتصادية وتنافسية تناسب الجميع. نصلك أينما كنت في القاهرة، الجيزة، القليوبية، البحيرة، الإسكندرية، طنطا، الدقهلية، الشرقية، وجميع محافظات مصر.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPREHENSIVE GUIDE SECTION */}
      <section className="section guide-section" style={{ background: "var(--clr-glass)", borderTop: "1px solid var(--clr-border)" }} aria-labelledby="guide-heading">
        <div className="container">
          <div className="reveal revealed" style={{ textAlign: "center", maxWidth: "700px", marginInline: "auto", marginBottom: "var(--sp-6)" }}>
            <p className="section-label">الدليل الشامل</p>
            <h2 className="section-title" id="guide-heading">دليل تشغيل وصيانة أجهزة <span>{brandName}</span> المنزلية</h2>
            <p style={{ color: "var(--clr-text-muted)", fontSize: "0.95rem", marginTop: "var(--sp-2)", fontFamily: "var(--font-arabic)" }}>
              إرشادات التشغيل الصحيحة وأبرز الأعطال الشائعة وطرق الوقاية منها المقدمة من توكيل صيانة {brandName} في مصر.
            </p>
          </div>

          <div className="guide-grid">
            {/* Column 1: Operation Guides */}
            <div className="guide-col reveal revealed delay-1">
              <h3 className="guide-col-title" style={{ fontFamily: "var(--font-arabic)" }}>📋 إرشادات التشغيل لأول مرة</h3>
              <div className="seo-accordion">
                <details className="seo-details">
                  <summary className="seo-summary">إرشادات تشغيل ثلاجات {brandName}</summary>
                  <div className="seo-content-box">
                    <p>ينصح مركز صيانة ثلاجات {brandName} في مصر بالآتي عند التشغيل لأول مرة:</p>
                    <ul style={{ listStyle: "decimal", paddingRight: "20px", marginTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
                      <li>التأكد من مصدر الكهرباء وقدرته على تحمل جهد تشغيل ثلاجات {brandName}.</li>
                      <li>وضع الثلاجة في مكان جيد التهوية لتفادي سخونة الجوانب والمكثف.</li>
                      <li>ترك الثلاجة لمدة لا تقل عن 8 ساعات بعد النقل قبل تشغيلها لثبات زيت الماتور في الكباس.</li>
                      <li>ترك الثلاجة تعمل فارغة لمدة 10 ساعات على الأقل لتجميع التبريد في الفريزر والكبينة.</li>
                      <li>تغطية الأطعمة المكشوفة داخل الثلاجة لتفادي اختلاط الروائح والحفاظ عليها طازجة.</li>
                      <li>في حالة ضعف التبريد، ينصح توكيل ثلاجات {brandName} بتعلية مؤشر الترموستات لدرجة أعلى.</li>
                    </ul>
                  </div>
                </details>

                <details className="seo-details">
                  <summary className="seo-summary">إرشادات تشغيل غسالات ملابس وأطباق {brandName}</summary>
                  <div className="seo-content-box">
                    <p>توجيهات تشغيل الغسالات الأوتوماتيك والـ Top Load وغسالات الأطباق من {brandName}:</p>
                    <ul style={{ listStyle: "decimal", paddingRight: "20px", marginTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
                      <li>توصيل الكابل بمصدر كهربائي مباشر ومستقر دون استخدام مشتركات ضعيفة.</li>
                      <li>التأكد من سلامة صمامات المياه وخرطوم الإمداد لمنع التسريب.</li>
                      <li>التأكد من وضع خرطوم الصرف في مستوى أعلى من ماسورة الصرف لضمان عدم تصريف المياه تلقائياً.</li>
                      <li>تشغيل دورة غسيل فارغة بالخل (دورة تعقيم وتنظيف) قبل الاستخدام الأول لإزالة أي رواسب مصنعية.</li>
                      <li>تجنب الحمل الزائد للملابس داخل الحلة لحماية المساعدين ورولمان البلي وتجنب الاهتزاز والصوت العالي.</li>
                      <li>فصل الألوان وفرد الملابس قبل وضعها لضمان نظافة مثالية.</li>
                      <li>لغسالات الأطباق: استخدم الملح ومساعد الشطف والصابون المخصص لتفادي تكلس الأملاح والانسداد.</li>
                    </ul>
                  </div>
                </details>

                <details className="seo-details">
                  <summary className="seo-summary">إرشادات تشغيل ميكروويف {brandName}</summary>
                  <div className="seo-content-box">
                    <p>تعليمات الاستخدام الآمن لميكروويف {brandName} لتفادي المخاطر والأعطال:</p>
                    <ul style={{ listStyle: "decimal", paddingRight: "20px", marginTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
                      <li>التأكد من استقرار جهد التيار الكهربائي المغذي للميكروويف.</li>
                      <li>يُحظر تماماً وضع أي أواني معدنية، ألومنيوم، فويل، أو بلاستيك غير مخصص للميكروويف بالداخل.</li>
                      <li>ترك الأطعمة المجمدة والمثلجة قليلاً لتذوب قبل إدخالها للتسخين.</li>
                      <li>تنظيف الميكروويف باستمرار لإزالة بقايا الطعام والدهون وتجنب تجمع البكتيريا والحشرات.</li>
                      <li>عند التنظيف، تأكد من فصل الكهرباء تماماً وتجنب ملامسة أجزاء التوصيل الداخلي للمياه.</li>
                      <li>في حالة حدوث عطل في التاتش أو توقف التسخين، اتصل فوراً بمركز صيانة ميكروويف {brandName} على {contact.hotline || "16481"} ولا تحاول إصلاحه بنفسك لخطورة الشحنات الكهربائية المخزنة بالداخل.</li>
                    </ul>
                  </div>
                </details>

                <details className="seo-details">
                  <summary className="seo-summary">إرشادات تشغيل شاشات وبوتاجازات {brandName}</summary>
                  <div className="seo-content-box">
                    <p>توجيهات توكيل {brandName} لشاشات التلفزيون وبوتاجازات البيلت إن:</p>
                    <ul style={{ listStyle: "decimal", paddingRight: "20px", marginTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
                      <li>حمل شاشات {brandName} بحذر شديد وتجنب الضغط على البانل (الشاشة الداخلية) لمنع الكسر أو ظهور خطوط عمودية.</li>
                      <li>توصيل الشاشة بمشترك حماية لمنع تلف كارت الباور عند تذبذب الكهرباء.</li>
                      <li>لالبوتاجازات: عند العمل بالغاز الطبيعي، يجب استدعاء فني صيانة بوتاجازات {brandName} لتغيير الفواني وضبط ضغط الغاز بدقة.</li>
                      <li>تحذير من تحريك البوتاجاز بالجر على الأرض لعدم كسر أرجل التثبيت أو إحداث خلل في وصلات الغاز.</li>
                    </ul>
                  </div>
                </details>

                <details className="seo-details">
                  <summary className="seo-summary">إرشادات تشغيل ديب فريزر {brandName}</summary>
                  <div className="seo-content-box">
                    <p>نصائح تشغيل الديب فريزر الأفقي والرأسي من {brandName}:</p>
                    <ul style={{ listStyle: "decimal", paddingRight: "20px", marginTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
                      <li>عدم تشغيل الديب فريزر بعد النقل إلا بعد مرور 24 ساعة لضمان استقرار الزيت في الكباس.</li>
                      <li>ترك الجهاز يعمل بدون أطعمة لمدة 8 إلى 12 ساعة حتى يصل لدرجة التجميد المثالية قبل تخزين الطعام.</li>
                      <li>التأكد من وضع الجهاز في مكان جيد التهوية وبعيد عن مصادر الحرارة وأشعة الشمس المباشرة.</li>
                      <li>ضبط مؤشر التبريد من خلال لوحة التحكم أو التيمر السفلي حسب درجة الحرارة الخارجية وفصول السنة.</li>
                    </ul>
                  </div>
                </details>
              </div>
            </div>

            {/* Column 2: Common Faults */}
            <div className="guide-col reveal revealed delay-2">
              <h3 className="guide-col-title" style={{ fontFamily: "var(--font-arabic)" }}>⚠️ دليل الأعطال الشائعة والحلول</h3>
              <div className="seo-accordion">
                <details className="seo-details">
                  <summary className="seo-summary">أعطال ثلاجات {brandName} الشائعة</summary>
                  <div className="seo-content-box">
                    <ul style={{ listStyle: "disc", paddingRight: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                      <li><strong>عدم التبريد في الكبينة أو الفريزر:</strong> ناتج عن تسريب غاز الفريون، انسداد فلتر التبريد، أو تلف المروحة.</li>
                      <li><strong>توقف الموتور (الكباس) عن العمل:</strong> بسبب تلف الريليه، أو الأوفرلود، أو احتراق ملفات الكباس نتيجة تذبذب التيار الكهربائي.</li>
                      <li><strong>تراكم الثلج في الفريزر (النوفروست):</strong> ناتج عن تلف هيتر إذابة الثلج، أو الثرموديسك، أو تايمر النوفروست.</li>
                      <li><strong>تسريب مياه أسفل الثلاجة:</strong> يرجع لانسداد مجرى صرف مياه إذابة الثلج (مجرى الدرين).</li>
                      <li><strong>تلف جوان الباب (الكاوتش):</strong> يسبب تسريب الهواء البارد ودخول الهواء الساخن، مما يجعل الموتور يعمل دون توقف.</li>
                    </ul>
                  </div>
                </details>

                <details className="seo-details">
                  <summary className="seo-summary">أعطال غسالات {brandName} الشائعة</summary>
                  <div className="seo-content-box">
                    <ul style={{ listStyle: "disc", paddingRight: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                      <li><strong>الغسالة لا تطرد المياه:</strong> ناتج عن انسداد فلتر الصرف، أو تلف طلمبة الطرد (الطرومبة).</li>
                      <li><strong>توقف الحلة عن الدوران:</strong> بسبب انقطاع سير الحركة، أو تلف الموتور، أو عطل في كارت التشغيل الرئيسي.</li>
                      <li><strong>اهتزاز شديد وصوت عالي أثناء العصر:</strong> ناتج عن تلف رولمان البلي الداخلي، أو عدم استواء أرجل الغسالة، أو تلف المساعدين.</li>
                      <li><strong>سحب المياه مستمر دون توقف:</strong> تلف صمام دخول المياه (بوابة المياه) أو عطل بميزان الضغط (البرشر).</li>
                      <li><strong>ظهور أكواد خطأ (Error Codes) على الشاشة:</strong> مثل OE (مشكلة صرف)، IE (مشكلة سحب مياه)، dE (باب الغسالة غير مغلق).</li>
                    </ul>
                  </div>
                </details>

                <details className="seo-details">
                  <summary className="seo-summary">أعطال ديب فريزر وشاشات {brandName}</summary>
                  <div className="seo-content-box">
                    <ul style={{ listStyle: "disc", paddingRight: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                      <li><strong>اللمبة الحمراء أو الصفراء تضيء في الديب فريزر:</strong> إشارة إلى انخفاض درجة التبريد عن الحد المطلوب أو وجود تسريب فريون.</li>
                      <li><strong>شاشات {brandName} - صوت بدون صورة:</strong> أشهر أعطال شاشات LED نتيجة تلف مساطر الليدات الخلفية (Backlight).</li>
                      <li><strong>بقع بيضاء مضيئة في الشاشة:</strong> ناتج عن تحرك أو سقوط عواكس الإضاءة الخاصة بالليدات الداخلية.</li>
                      <li><strong>الشاشة متوقفة على اللوجو (Logo Loop):</strong> عطل في سوفت وير الشاشة أو تلف في الفلاشة الرئيسية (شحن فلاشة).</li>
                    </ul>
                  </div>
                </details>

                <details className="seo-details">
                  <summary className="seo-summary">أعطال ميكروويف {brandName} الشائعة</summary>
                  <div className="seo-content-box">
                    <ul style={{ listStyle: "disc", paddingRight: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                      <li><strong>الميكروويف يعمل ولكن لا يسخن:</strong> تلف المغناطيس المولد للأشعة (الميجنترون) أو احتراق فيوز الضغط العالي.</li>
                      <li><strong>توقف دوران الطبق الزجاجي:</strong> ناتج عن تلف ماتور الطبق السفلي أو تراكم الدهون تحت الترس.</li>
                      <li><strong>حدوث شرار كهربائي داخل الفرن:</strong> تلف شريحة الميكا العازلة أو استخدام أواني معدنية غير مخصصة للجهاز.</li>
                      <li><strong>أزرار التاتش لا تستجيب:</strong> تلف في شريط التاتش (تاتش سكرين) نتيجة الرطوبة أو الاستخدام المتكرر.</li>
                    </ul>
                  </div>
                </details>
              </div>
            </div>
          </div>

          {/* Hotline Banner */}
          <div className="glass-card guide-cta-banner reveal revealed" style={{ marginTop: "var(--sp-6)", textAlign: "center", padding: "var(--sp-4)", border: "1px solid var(--clr-primary-faint)", background: "radial-gradient(circle at top left, rgba(16,185,129,0.05), transparent)" }}>
            <h4 style={{ fontSize: "1.2rem", fontWeight: "700", color: "var(--clr-text)", marginBottom: "var(--sp-2)", fontFamily: "var(--font-arabic)" }}>هل يواجه جهازك أي من هذه الأعطال؟</h4>
            <p style={{ color: "var(--clr-text-muted)", fontSize: "0.9rem", marginBottom: "var(--sp-3)", fontFamily: "var(--font-arabic)" }}>
              لا تتردد في الاتصال بمهندسينا المتخصصين فوراً للحصول على خدمة صيانة منزلية فورية بقطع غيار أصلية وضمان سنة.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "var(--sp-3)", flexWrap: "wrap" }}>
              <a href={`tel:${contact.hotline || "16481"}`} className="btn btn-primary">📞 اتصل بالخط الساخن: {contact.hotline || "16481"}</a>
              <a href={`https://wa.me/${social.whatsapp || "201062842903"}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline">💬 تواصل معنا واتساب</a>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Locations Accordion Section */}
      <section className="section seo-locations-section" aria-labelledby="seo-locations-heading">
        <div className="container">
          <h2 className="section-title-sm" id="seo-locations-heading" style={{ textAlign: "center", marginBottom: "var(--sp-4)", fontSize: "1.5rem", fontWeight: "800", color: "var(--clr-text)" }}>فروع ومراكز الخدمة والصيانة لـ {brandName}</h2>
          
          <div className="seo-accordion">
            <details className="seo-details">
              <summary className="seo-summary">عناوين فروع توكيل {brandName} في القاهرة والجيزة</summary>
              <div className="seo-content-box">
                <p>توكيل {brandName} القاهرة – عنوان توكيل {brandName} الجيزة – رقم صيانة غسالات {brandName} في القاهرة – رقم صيانة ثلاجات {brandName} في الجيزة – رقم فرع توكيل {brandName} امبابة – الوراق - الكيت كات - القومية العربية – ارقام صيانة مجففات {brandName} في الدقي - مركز غسالات {brandName} العجوزة – رقم تليفون {brandName} المقطم – الرقم المختصر لصيانة {brandName} في مدينة نصر – مركز صيانة غسالة اطباق {brandName} في المقطم – البساتين – السيدة زينب - السيدة عائشة – ارقام توكيل {brandName} المعادي – خدمة عملاء {brandName} بالمهندسين – ارقام مراكز اعطال {brandName} في عين شمس – مراكز {brandName} حدائق القبة – توكيل {brandName} سراي القبة – فرع {brandName} في شبرا مصر وشبرا الخيمة – ارقم تليفون شركة {brandName} دار السلام - خدمة صيانة اعطال {brandName} في الهرم – الفرع الرئيسي لشركة {brandName} في فيصل – المريوطية – اللبيني – عمل بلاغ صيانة اعطال {brandName} العياط – ابو النمرس</p>
              </div>
            </details>
            
            <details className="seo-details">
              <summary className="seo-summary">صيانة ثلاجات وديب فريزر {brandName} في 6 اكتوبر</summary>
              <div className="seo-content-box">
                <p>صيانة ثلاجات وديب فريزر {brandName} في 6 اكتوبر – فرع الشيخ زايد لصيانة ثلاجات {brandName} – اماكن بيع اجهزة {brandName} في الشيراتون – مراكز صيانة غسالات {brandName} في الشروق والعبور والعاشر من رمضان – رقم تليفون خدمات اعطال اجهزة {brandName} في السلام – رقم صيانه {brandName} في المنيب المنيل المرج – اسأل عن اماكن صيانة اجهزة {brandName} في وسط البلد – رقم صيانة {brandName} في التحرير – اماكن صيانة درايير {brandName} القطامية – ورش انتاج اجهزة {brandName} في المنطقة الصناعية – فرع توكيل {brandName} بولاق وارض اللواء – اقرب مركز صيانة غسالات {brandName} في حدائق الهرم واكتوبر – مبيعات {brandName} في مول مصر – معرض سخانات {brandName} في ارض المعارض</p>
              </div>
            </details>
            
            <details className="seo-details">
              <summary className="seo-summary">عناوين فروع وكيل {brandName} في الاسكندرية</summary>
              <div className="seo-content-box">
                <p>موقع {brandName} الرسمي بالعجمي – خدمة عملاء {brandName} بالنخيل – مركز صيانه {brandName} بالبيطاش – توكيل {brandName} بالهانوفيل – - مركز خدمة {brandName} المعمورة – تليفون توكيل {brandName} بالشاطبي – الخط الساخن لصيانه {brandName} بالازاريطة – صيانة {brandName} الاسكندرية – رقم صيانه {brandName} بالورديان – الرقم المختصر لصيانه {brandName} بالدخيلة – مراكز صيانه {brandName} المعتمدة بالمندرة – توكيل {brandName} في ميامي – فرع {brandName} بالعصافرة – رقم {brandName} المختصر في لوران – مركز صيانة ديب فريزر {brandName} في كفر عبده – باكوس – تليفونات توكيل {brandName} بالنزهة – رقم {brandName} في محرم بك – شركة {brandName} في الحضرة – رقم مركز صيانه {brandName} بحري – تليفون {brandName} بالانفوشي – فرع {brandName} في المنشية – مركز خدمة {brandName} في جليم – ارقام صيانه {brandName} في سابا باشا – رقم مركز صيانة {brandName} في بلوكلي – رقم خدمة عملاء {brandName} في مصطفي كامل – رقم توكيل {brandName} في ستانلي – رقم توكيل {brandName} في ابو قير – رقم مركز صيانه {brandName} في المنتزة – نمرة تليفون {brandName} سموحة – رقم مركز صيانه {brandName} في سبورتنج – {brandName} في باب شرق</p>
              </div>
            </details>
            
            <details className="seo-details">
              <summary className="seo-summary">عناوين مراكز صيانة {brandName} في المحافظات</summary>
              <div className="seo-content-box">
                <p>عناوين مراكز صيانة ثلاجات {brandName} في القليوبية – توكيل غسالات {brandName} المنصورة – ارقم خدمة عملاء صيانه {brandName} بالشرقية – توكيل صيانه {brandName} المنوفية – عنوان صيانة غسالات {brandName} في الفيوم - مركز صيانة ثلاجات {brandName} دمياط – الرقم الموحد لصيانة اعطال {brandName} في البحيرة – رقم تليفون صيانه {brandName} كفر الدوار – نمره تليفون صيانه {brandName} في بنها – الدعم الفني المباشر لـ {brandName} مصر في طنطا – بلاغات اعطال {brandName} البحيرة – وكيل {brandName} طنطا – ارقام فروع صيانه {brandName} الاسماعيلية – صيانة سخانات غاز {brandName} في مدينة السادات – تليفون صيانة ثلاجات {brandName} بورسعيد وبورفؤاد – رقم شركة {brandName} في الوادي الجديد – خدمة اصلاح غسالات {brandName} في الاسكندرية – خدمة صيانة ثلاجات {brandName} الفورية في السويس – الخط الساخن صيّانة مجففات {brandName} الاسكندرية – ارقام هواتف صيانة ميكروويف {brandName} في دمنهور – توكيل {brandName} البحيرة</p>
              </div>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
