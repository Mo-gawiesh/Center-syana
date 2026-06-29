"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface BrandItem {
  name: string;
  slug: string;
}

interface NavbarProps {
  logoUrl?: string;
  hotline: string;
  phone: string;
  brands: BrandItem[];
}

export default function Navbar({ logoUrl, hotline, phone, brands }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header dir="rtl">
      <nav className={`navbar ${pathname !== "/" ? "scrolled" : ""}`} id="navbar" role="navigation" aria-label="القائمة الرئيسية">
        <div className="container">
          {/* Logo */}
          <Link href="/" className="navbar-logo" aria-label="الصفحة الرئيسية - الهندسية للتوكيلات" onClick={closeMenu}>
            <img
              src={logoUrl || "/assets/Logo/logo.png"}
              width={533}
              height={800}
              alt="الهندسية للتوكيلات"
              className="navbar-logo-img"
              style={{ objectFit: "contain" }}
            />
          </Link>

          {/* Desktop Nav */}
          <ul className="nav-menu" role="list">
            <li>
              <Link href="/services" className="nav-link">
                خدماتنا
              </Link>
            </li>
            <li>
              <div className="nav-dropdown" id="brands-dropdown">
                <button
                  className="nav-dropdown-trigger"
                  aria-haspopup="true"
                  aria-expanded="false"
                  id="brands-btn"
                >
                  الماركات
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div className="nav-dropdown-menu" role="menu" aria-label="قائمة الماركات">
                  <div className="nav-dropdown-grid">
                    {brands.map((brand) => (
                      <Link
                        key={brand.slug}
                        href={`/brands/${brand.slug}`}
                        className="nav-dropdown-item"
                        role="menuitem"
                        onClick={closeMenu}
                      >
                        <span className="brand-dot"></span>
                        {brand.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </li>
            <li>
              <Link href="/why-us" className="nav-link">
                لماذا نحن؟
              </Link>
            </li>
            <li>
              <Link href="/testimonials" className="nav-link">
                آراء العملاء
              </Link>
            </li>
            <li>
              <Link href="/contact" className="nav-link">
                تواصل معنا
              </Link>
            </li>
          </ul>

          <a href={`tel:${hotline || "16481"}`} className="btn btn-primary btn-sm nav-cta" aria-label={`اتصل بنا على ${hotline || "16481"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" width="16" height="16">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
            {hotline || "16481"}
          </a>

          {/* Hamburger */}
          <button className={`nav-hamburger ${isOpen ? "open" : ""}`} id="nav-hamburger" aria-label="فتح القائمة" aria-expanded={isOpen} aria-controls="nav-mobile" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <nav className={`nav-mobile ${isOpen ? "open" : ""}`} id="nav-mobile" aria-label="القائمة المتنقلة">
          <Link href="/services" className="nav-mobile-link" onClick={closeMenu}>
            خدماتنا
          </Link>
          <Link href="/brands" className="nav-mobile-link" onClick={closeMenu}>
            الماركات المعتمدة
          </Link>
          <Link href="/why-us" className="nav-mobile-link" onClick={closeMenu}>
            لماذا نحن؟
          </Link>
          <Link href="/testimonials" className="nav-mobile-link" onClick={closeMenu}>
            آراء العملاء
          </Link>
          <Link href="/contact" className="nav-mobile-link" onClick={closeMenu}>
            تواصل معنا
          </Link>
          <hr style={{ borderColor: "var(--clr-border)", marginBlock: "8px" }} />
          <a href={`tel:${hotline || "16481"}`} className="btn btn-primary" style={{ textAlign: "center" }} onClick={closeMenu}>
            📞 اتصل الآن — {hotline || "16481"}
          </a>
          <a href={`tel:${phone}`} className="nav-mobile-link" style={{ textAlign: "center" }} onClick={closeMenu}>
            {phone}
          </a>
        </nav>
      </nav>
    </header>
  );
}
