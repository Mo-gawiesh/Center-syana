import "../../style.css";
import { getSiteConfig } from "../../lib/api";
import Topbar from "../../components/Topbar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { settings, brands } = await getSiteConfig("published");
  
  const contact = settings?.contact || {};
  const social = settings?.social || {};
  const general = settings?.general || {};

  const brandItems = brands.map((b: any) => ({
    name: b.name,
    slug: b.name.toLowerCase().replace(/\s+/g, "-"),
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
      <main id="main-content">
        {children}
      </main>
      <Footer
        logoUrl={general.logoMediaId}
        hotline={contact.hotline}
        phone={contact.phone}
        address={contact.address}
        workingHours={contact.workingHours}
        whatsapp={social.whatsapp}
        brands={brandItems}
      />
    </div>
  );
}
