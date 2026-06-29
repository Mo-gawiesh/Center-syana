import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

// CORS Headers Helper
const corsResponse = (body: any, status = 200) => {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};

// Handle OPTIONS requests (CORS preflight)
http.route({
  path: "/public/site-config",
  method: "OPTIONS",
  handler: httpAction(async () => {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }),
});

http.route({
  path: "/public/submit-request",
  method: "OPTIONS",
  handler: httpAction(async () => {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }),
});

// GET /public/site-config?slug=<company-slug>&preview=true|false
http.route({
  path: "/public/site-config",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const url = new URL(request.url);
    const slug = url.searchParams.get("slug");
    const preview = url.searchParams.get("preview") === "true";

    if (!slug) {
      return corsResponse({ error: "Missing company slug parameter" }, 400);
    }

    // Resolve company by slug
    const company = await ctx.runQuery(api.companies.getCompanyBySlug, { slug });
    if (!company) {
      return corsResponse({ error: "Company not found" }, 404);
    }

    // Load settings document based on draft/published status
    let status = preview ? "draft" : "published";
    let settings = await ctx.runQuery(api.settings.getSettingsPublic, { 
      companyId: company._id, 
      status 
    });

    if (!settings && !preview) {
      // If published is not found, fallback to draft
      status = "draft";
      settings = await ctx.runQuery(api.settings.getSettingsPublic, { 
        companyId: company._id, 
        status: "draft" 
      });
    }

    if (!settings) {
      return corsResponse({ error: "Site configuration not initialized" }, 404);
    }

    // Load other site content dynamically based on the same status
    const brands = await ctx.runQuery(api.brands.getBrandsPublic, { companyId: company._id, status });
    const services = await ctx.runQuery(api.services.getServicesPublic, { companyId: company._id, status });
    const faqs = await ctx.runQuery(api.faqs.getFaqsPublic, { companyId: company._id, status });
    const testimonials = await ctx.runQuery(api.testimonials.getTestimonialsPublic, { companyId: company._id, status });

    return corsResponse({ 
      company, 
      settings,
      brands,
      services,
      faqs,
      testimonials
    });
  }),
});

// POST /public/submit-request
http.route({
  path: "/public/submit-request",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const body = await request.json();
      const { companySlug, name, phone, location, appliance } = body;

      if (!companySlug || !name || !phone || !location || !appliance) {
        return corsResponse({ error: "Missing required fields in request body" }, 400);
      }

      // Resolve company slug to ID
      const company = await ctx.runQuery(api.companies.getCompanyBySlug, { slug: companySlug });
      if (!company) {
        return corsResponse({ error: "Company slug not found" }, 404);
      }

      // Run mutation to save request
      const requestId = await ctx.runMutation(api.requests.createRequestPublic, {
        companyId: company._id,
        name,
        phone,
        location,
        appliance,
      });


      return corsResponse({ success: true, requestId });
    } catch (err: any) {
      return corsResponse({ error: err.message || "Failed to process request" }, 500);
    }
  }),
});

export default http;
