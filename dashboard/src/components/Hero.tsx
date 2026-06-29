import Link from "next/link";
import BrandsMarquee from "./BrandsMarquee";
import TypingWord from "./TypingWord";

interface Brand {
  _id: string;
  name: string;
  logoUrl?: string;
}

interface HeroProps {
  heroTitle?: string;
  heroSubtitle?: string;
  hotline: string;
  brands: Brand[];
}

export default function Hero({ heroTitle, heroSubtitle, hotline, brands }: HeroProps) {
  return (
    <section className="hero" id="home" aria-label="قسم الترحيب">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-bg-gradient"></div>
        <div className="hero-bg-grid"></div>
      </div>

      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-eyebrow reveal revealed">
            ضمان جودة خدماتنا هو أساس نجاحنا وتميزنا.
          </div>

          <h1 className="hero-title reveal revealed delay-1">
            {heroTitle || "الهندسية للتوكيلات"}
            <br />
            <span className="highlight">صيانة متخصصة <TypingWord /><span className="typing-cursor" aria-hidden="true"></span></span>
          </h1>

          <p className="hero-desc reveal revealed delay-2">
            {heroSubtitle || "مركز الصيانة المعتمد الأول في مصر لجميع الأجهزة المنزلية. نوفر لك خدمة احترافية فورية داخل منزلك بقطع غيار أصلية 100% وضمان معتمد."}
          </p>

          <div className="hero-stats reveal revealed delay-3" aria-label="إحصائيات الشركة">
            <div className="hero-stat">
              <span className="hero-stat-num">+20</span>
              <span className="hero-stat-label">عاماً من الخبرة</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">24/7</span>
              <span className="hero-stat-label">خدمة فورية</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">ضمان</span>
              <span className="hero-stat-label">معتمد ومكتوب</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">+60</span>
              <span className="hero-stat-label">مهندساً متخصصاً</span>
            </div>
          </div>

          <div className="hero-actions reveal revealed delay-4">
            <Link href="/contact" className="btn btn-primary btn-lg" aria-label="طلب صيانة فورية">
              طلب صيانة فورية
            </Link>
            <span className="hero-action-text">أو اتصل بنا مباشرة على الخط الساخن: {hotline || "16481"}</span>
          </div>
        </div>

        <div className="hero-image-wrap reveal revealed delay-3">
          <img
            src="/assets/Main photos/Hero Section.jpeg"
            width={1200}
            height={669}
            alt="مهندس صيانة الهندسية للتوكيلات"
            className="hero-image"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      {brands.length > 0 && (
        <div className="hero-brands" aria-label="الماركات المعتمدة">
          <BrandsMarquee brands={brands} />
        </div>
      )}
    </section>
  );
}
