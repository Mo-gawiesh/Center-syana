import { Metadata } from "next";
import { getSiteConfig } from "./api";

export async function generateSiteMetadata(pageTitle?: string, pageDescription?: string): Promise<Metadata> {
  try {
    const { settings } = await getSiteConfig("published");
    const seo = settings?.seo || {};
    const general = settings?.general || {};

    const title = pageTitle
      ? `${pageTitle} | ${seo.metaTitle || general.companyName || "الهندسية للتوكيلات"}`
      : seo.metaTitle || general.companyName || "الهندسية للتوكيلات";

    const description = pageDescription || seo.metaDescription || general.description || "";

    return {
      title,
      description,
      keywords: seo.keywords || [],
      alternates: {
        canonical: "/",
      },
      openGraph: {
        title,
        description,
        type: "website",
        locale: "ar_EG",
      },
      other: {
        "geo.region": "EG",
        "language": "Arabic",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: pageTitle || "الهندسية للتوكيلات للصيانة",
      description: pageDescription || "مركز صيانة معتمد للأجهزة المنزلية",
    };
  }
}
