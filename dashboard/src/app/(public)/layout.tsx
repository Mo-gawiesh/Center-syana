import type { ReactNode } from "react";
import Topbar from "../../components/Topbar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SiteScripts from "../../components/SiteScripts";
import { fallbackBrands, fallbackSettings } from "../../lib/static-site";
import "../../style.css";

export default function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  const contact = fallbackSettings.contact;
  const social = fallbackSettings.social;
  const general = fallbackSettings.general;

  const brandItems = fallbackBrands.map((brand) => ({
    name: brand.name,
    slug: brand.name.toLowerCase().replace(/\s+/g, "-"),
  }));

  return (
    <div dir="rtl" className="public-site">
      <Topbar
        hotline={contact.hotline}
        phone={contact.phone}
        address={contact.address}
        workingHours={contact.workingHours}
      />
      <Navbar
        logoUrl={general.logoMediaId}
        hotline={contact.hotline}
        phone={contact.phone}
        brands={brandItems}
      />
      <main id="main-content">{children}</main>
      <Footer
        logoUrl={general.logoMediaId}
        hotline={contact.hotline}
        phone={contact.phone}
        address={contact.address}
        workingHours={contact.workingHours}
        whatsapp={social.whatsapp || "201062842903"}
        brands={brandItems}
      />
      <SiteScripts />
    </div>
  );
}
