import Link from "next/link";
import { getSiteConfig } from "../../../lib/api";
import TestimonialsSlider from "../../../components/TestimonialsSlider";
import { generateSiteMetadata } from "../../../lib/seo";

export async function generateMetadata() {
  return await generateSiteMetadata("آراء العملاء - تقييمات الخدمة", "شاهد تقييمات وآراء عملائنا في القاهرة والجيزة وجميع محافظات مصر حول سرعة وجودة صيانة الأجهزة المنزلية.");
}

export default async function TestimonialsPage() {
  const { testimonials } = await getSiteConfig("published");

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
    </>
  );
}
