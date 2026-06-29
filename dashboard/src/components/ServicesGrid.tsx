import Link from "next/link";

interface Service {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string;
  icon?: string;
}

interface ServicesGridProps {
  services: Service[];
  variant?: "overview" | "detailed";
  hotline?: string;
}

export default function ServicesGrid({ services, variant = "overview", hotline = "16481" }: ServicesGridProps) {
  if (services.length === 0) return null;

  if (variant === "overview") {
    return (
      <div className="services-icons-grid">
        {services.map((service) => (
          <div key={service._id} className="service-icon-item">
            <img
              src={service.imageUrl || "/assets/Products/refrigerator.png"}
              className="service-product-img"
              alt={service.title}
              width={400}
              height={600}
              loading="lazy"
              style={{ objectFit: "contain" }}
            />
            <span className="service-icon-label">{service.title}</span>
          </div>
        ))}
      </div>
    );
  }

  // Detailed Grid (for services.html /services page)
  return (
    <div className="services-grid" role="list">
      {services.map((service, i) => (
        <article key={service._id} className={`glass-card service-card reveal revealed delay-${(i % 3) + 1}`} role="listitem">
          <div className="service-img-wrapper">
            <img
              src={service.imageUrl || "/assets/Main photos/Repairing Refrigerator.jpeg"}
              alt={service.title}
              className="service-card-img"
              loading="lazy"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="service-card-body">
            <img
              src={service.imageUrl || "/assets/Products/refrigerator.png"}
              width={400}
              height={600}
              alt={service.title}
              className="service-product-img"
              loading="lazy"
              style={{ objectFit: "contain" }}
            />
            <h3 className="service-title">{service.title}</h3>
            
            {service.description.includes("\n") ? (
              <ul className="service-problems" aria-label={`أعطال ${service.title} الشائعة`} style={{ marginBottom: "var(--sp-4)" }}>
                {service.description.split("\n").map((line, idx) => (
                  line.trim() && (
                    <li key={idx} className="service-problem">
                      {line.trim()}
                    </li>
                  )
                ))}
              </ul>
            ) : (
              <p
                className="service-card-desc"
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--clr-text-muted)",
                  lineHeight: "1.6",
                  marginBottom: "var(--sp-4)",
                  textAlign: "right",
                }}
              >
                {service.description}
              </p>
            )}

            <a href={`tel:${hotline}`} className="btn btn-outline">
              اطلب صيانة الآن ←
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
