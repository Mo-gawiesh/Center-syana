import Link from "next/link";
import { getSiteConfig } from "../../../lib/api";
import ServicesGrid from "../../../components/ServicesGrid";
import { generateSiteMetadata } from "../../../lib/seo";

export async function generateMetadata() {
  return await generateSiteMetadata("خدماتنا - صيانة الأجهزة المنزلية", "صيانة احترافية لثلاجات، غسالات، تكييفات، وديب فريزر لجميع الماركات بقطع غيار أصلية وضمان.");
}

export default async function ServicesPage() {
  const { settings, services } = await getSiteConfig("published");
  const contact = settings?.contact || {};

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
    </>
  );
}
