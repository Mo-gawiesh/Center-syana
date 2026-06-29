import Link from "next/link";
import { getSiteConfig } from "../../../../lib/api";
import FAQAccordion from "../../../../components/FAQAccordion";
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

  // Custom-tailored FAQs list
  const brandFaqs = [
    {
      _id: "faq-1",
      question: `كيف أصلح ثلاجة ${brandName} مش بتبرد؟`,
      answer: `إذا كانت ثلاجتك ${brandName} لا تبرد، الأسباب الشائعة هي تسريب الفريون، أو تعطل الكمبريسور، أو مشكلة في الترموستات. اتصل على ${contact.hotline || "16481"} لتشخيص مجاني بالمنزل.`,
    },
    {
      _id: "faq-2",
      question: `هل تستخدمون قطع غيار ${brandName} أصلية؟`,
      answer: `نعم، نستخدم حصراً قطع الغيار الأصلية المعتمدة من ${brandName} مع ضمان مكتوب وموثق بفاتورة صيانة رسمية.`,
    },
    {
      _id: "faq-3",
      question: `كم تكلفة صيانة غسالة ${brandName}؟`,
      answer: `تشخيص الأعطال وتحديد المشكلة مجاني تماماً في حال الإصلاح معنا. وتعتمد تكلفة الصيانة النهائية على الجزء المراد استبداله وطبيعة العطل.`,
    },
  ];

  return (
    <>
      {/* Brand Hero */}
      <section className="brand-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">الرئيسية</Link>
            <span className="sep">←</span>
            <Link href="/brands">الماركات</Link>
            <span className="sep">←</span>
            <span className="current">صيانة {brandName}</span>
          </div>
          <h1 className="brand-hero-title">
            صيانة {brandName} المعتمدة
          </h1>
        </div>
      </section>

      {/* Brand Services Grid */}
      <section className="section" id="services" aria-labelledby="brand-services-heading">
        <div className="container">
          <div className="reveal revealed" style={{ textAlign: "center" }}>
            <p className="section-label">خدمات {brandName}</p>
            <h2 className="section-title" id="brand-services-heading">ما هي أجهزة <span>{brandName}</span> التي نصلحها؟</h2>
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

      {/* Brand Specific FAQs */}
      <section className="section faq" id="faq" aria-labelledby="faq-heading">
        <div className="container">
          <div className="reveal revealed" style={{ textAlign: "center" }}>
            <p className="section-label">الأسئلة الشائعة</p>
            <h2 className="section-title" id="faq-heading">أسئلة صيانة <span>{brandName}</span></h2>
          </div>

          <div className="faq-grid">
            <FAQAccordion faqs={brandFaqs} />
            <div className="faq-image-wrap reveal revealed delay-1">
              <img src="/assets/Main photos/Customer Interaction.jpeg" width="1200" height="798" alt={`خدمة عملاء صيانة ${brandName}`} className="faq-img" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="section contact" id="contact" aria-labelledby="contact-heading">
        <div className="container">
          <div className="reveal revealed" style={{ textAlign: "center" }}>
            <p className="section-label">تواصل معنا</p>
            <h2 className="section-title" id="contact-heading">حجز صيانة <span>{brandName}</span> فورية</h2>
          </div>

          <div className="contact-grid">
            <div className="contact-info reveal revealed">
              <h3 className="contact-info-title">صيانة {brandName} بمصر</h3>
              <p className="contact-info-desc">نوفر لك الدعم الفني الكامل لصيانة أجهزة {brandName} بالضمان المعتمد والقطع الأصلية.</p>
              
              <div className="contact-info-list" role="list">
                <div className="contact-info-item" role="listitem">
                  <div className="contact-info-icon" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                  </div>
                  <div>
                    <div className="contact-item-label">رقم صيانة {brandName}</div>
                    <a href={`tel:${contact.hotline || "16481"}`} className="contact-item-value">{contact.hotline || "16481"}</a>
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
                    <div className="contact-item-label">العنوان</div>
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
