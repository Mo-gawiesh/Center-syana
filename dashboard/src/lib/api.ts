import { convexClient } from "./convex";
import { api } from "../../convex/_generated/api";
import { COMPANY_SLUG } from "./constants";
import { Id } from "../../convex/_generated/dataModel";

export interface SiteConfig {
  company: {
    _id: Id<"companies">;
    name: string;
    slug: string;
  };
  settings: any;
  brands: any[];
  services: any[];
  faqs: any[];
  testimonials: any[];
}

export async function getCompany() {
  const company = await convexClient.query(api.companies.getCompanyBySlug, {
    slug: COMPANY_SLUG,
  });
  if (!company) {
    throw new Error(`Company with slug '${COMPANY_SLUG}' not found.`);
  }
  return company;
}

export async function getSiteConfig(status: "published" | "draft" = "published"): Promise<SiteConfig> {
  const company = await getCompany();
  
  const [settings, brands, services, faqs, testimonials] = await Promise.all([
    convexClient.query(api.settings.getSettingsPublic, {
      companyId: company._id,
      status,
    }),
    convexClient.query(api.brands.getBrandsPublic, {
      companyId: company._id,
      status,
    }),
    convexClient.query(api.services.getServicesPublic, {
      companyId: company._id,
      status,
    }),
    convexClient.query(api.faqs.getFaqsPublic, {
      companyId: company._id,
      status,
    }),
    convexClient.query(api.testimonials.getTestimonialsPublic, {
      companyId: company._id,
      status,
    }),
  ]);

  return {
    company,
    settings,
    brands: brands || [],
    services: services || [],
    faqs: faqs || [],
    testimonials: testimonials || [],
  };
}
