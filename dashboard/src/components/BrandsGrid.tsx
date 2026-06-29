import Link from "next/link";

interface Brand {
  _id: string;
  name: string;
  logoUrl?: string;
}

interface BrandsGridProps {
  brands: Brand[];
}

export default function BrandsGrid({ brands }: BrandsGridProps) {
  if (brands.length === 0) return null;

  return (
    <div className="brands-grid" role="list">
      {brands.map((brand) => {
        const slug = brand.name.toLowerCase().replace(/\s+/g, "-");
        return (
          <Link
            key={brand._id}
            href={`/brands/${slug}`}
            className="brand-card reveal revealed"
            aria-label={`صيانة ${brand.name}`}
            role="listitem"
          >
            <img
              src={brand.logoUrl || ""}
              alt={brand.name}
              className="brand-card-logo-img"
              width={400}
              height={175}
              loading="lazy"
              style={{ objectFit: "contain" }}
            />
            <span className="brand-sub">صيانة معتمدة</span>
          </Link>
        );
      })}
    </div>
  );
}
