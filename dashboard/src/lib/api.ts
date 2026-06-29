import { convexClient } from "./convex";
import { api } from "../../convex/_generated/api";
import { COMPANY_SLUG } from "./constants";
import { Id } from "../../convex/_generated/dataModel";
import {
  fallbackBrands,
  fallbackCompany,
  fallbackFaqs,
  fallbackServices,
  fallbackSettings,
  fallbackTestimonials,
} from "./static-site";

interface PublicCompany {
  _id: Id<"companies">;
  name: string;
  slug: string;
}

interface PublicSettings {
  contact?: {
    hotline?: string;
    phone?: string;
    address?: string;
    workingHours?: string;
  };
  social?: {
    whatsapp?: string;
  };
  general?: {
    companyName?: string;
    description?: string;
    logoMediaId?: string;
  };
  homepage?: {
    heroTitle?: string;
    heroSubtitle?: string;
    statistics?: Array<{ value: string; label: string }>;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

interface PublicBrand {
  _id: string;
  name: string;
  logoUrl?: string;
}

interface PublicService {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string;
  icon?: string;
}

interface PublicFaq {
  _id: string;
  question: string;
  answer: string;
}

interface PublicTestimonial {
  _id: string;
  name: string;
  role?: string;
  content: string;
  rating: number;
}

export interface SiteConfig {
  company: PublicCompany;
  settings: PublicSettings;
  brands: PublicBrand[];
  services: PublicService[];
  faqs: PublicFaq[];
  testimonials: PublicTestimonial[];
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
  try {
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
      settings: settings ?? {},
      brands: brands || [],
      services: services || [],
      faqs: faqs || [],
      testimonials: testimonials || [],
    };
  } catch (error) {
    console.warn("Falling back to static public site content:", error);
    return {
      company: fallbackCompany as PublicCompany,
      settings: fallbackSettings,
      brands: fallbackBrands,
      services: fallbackServices,
      faqs: fallbackFaqs,
      testimonials: fallbackTestimonials,
    };
  }
}
