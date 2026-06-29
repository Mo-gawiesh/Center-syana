import Link from "next/link";
import { getSiteConfig } from "../../../lib/api";
import BrandsGrid from "../../../components/BrandsGrid";
import { generateSiteMetadata } from "../../../lib/seo";

export async function generateMetadata() {
  return await generateSiteMetadata("الماركات المعتمدة - شركاء الجودة", "نوفر صيانة معتمدة لجميع الماركات العالمية والمحلية في مصر: LG, Samsung, Sharp, Bosch, Carrier, Toshiba...");
}

export default async function BrandsPage() {
  const { brands } = await getSiteConfig("published");

  return (
    <>
      <section className="brand-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">الرئيسية</Link>
            <span className="sep">←</span>
            <span className="current">الماركات المعتمدة</span>
          </div>
          <h1 className="brand-hero-title">الماركات المعتمدة</h1>
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

          <BrandsGrid brands={brands} />
        </div>
      </section>
    </>
  );
}
