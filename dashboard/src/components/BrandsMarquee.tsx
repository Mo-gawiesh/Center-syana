import Link from "next/link";

interface Brand {
  _id: string;
  name: string;
  logoUrl?: string;
}

interface BrandsMarqueeProps {
  brands: Brand[];
}

export default function BrandsMarquee({ brands }: BrandsMarqueeProps) {
  if (brands.length === 0) return null;

  const renderSet = () =>
    brands.map((brand) => {
      const slug = brand.name.toLowerCase().replace(/\s+/g, "-");
      return (
        <Link key={`${brand._id}-marquee`} href={`/brands/${slug}`} className="hero-brand-logo">
          <img
            src={brand.logoUrl || ""}
            alt={brand.name}
            width={400}
            height={175}
            loading="lazy"
            style={{ objectFit: "contain" }}
          />
        </Link>
      );
    });

  return (
    <div className="hero-brands-track-wrap" style={{ overflow: "hidden", width: "100%" }}>
      <div className="hero-brands-track">
        {renderSet()}
        {renderSet()}
      </div>
    </div>
  );
}
