"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * SiteScripts — Client component that replicates all behaviours from the
 * original main.js (scroll reveal, counter animation, sticky navbar,
 * mobile hamburger, back-to-top button, WhatsApp form redirect).
 *
 * Runs after every route change via pathname dependency.
 */
export default function SiteScripts() {
  const pathname = usePathname();

  useEffect(() => {
    /* ================================================
       1. SCROLL REVEAL
       ================================================ */
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
    );

    document
      .querySelectorAll(".reveal, .reveal-left, .reveal-scale")
      .forEach((el) => {
        // Don't re-observe already-revealed elements
        if (!el.classList.contains("revealed")) {
          revealObserver.observe(el);
        }
      });

    /* ================================================
       2. COUNTER ANIMATION
       ================================================ */
    const easeOutQuad = (t: number) => t * (2 - t);

    function animateCounter(el: HTMLElement) {
      const target = parseInt(el.dataset.count || "0", 10);
      const suffix = el.dataset.suffix || "";
      const duration = 2000;
      let start: number | null = null;

      function step(timestamp: number) {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const value = Math.floor(easeOutQuad(progress) * target);
        el.textContent = value.toLocaleString("ar-EG") + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
    }

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target as HTMLElement);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    document
      .querySelectorAll<HTMLElement>("[data-count]")
      .forEach((el) => counterObserver.observe(el));

    /* ================================================
       3. STICKY NAVBAR
       ================================================ */
    const navbar = document.querySelector(".navbar");

    function handleNavbarScroll() {
      if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 40);
    }

    window.addEventListener("scroll", handleNavbarScroll, { passive: true });

    /* ================================================
       4. MOBILE HAMBURGER MENU
       ================================================ */
    const hamburgerBtn = document.getElementById("nav-hamburger");
    const mobileMenu = document.getElementById("nav-mobile");

    function handleHamburgerClick() {
      if (!hamburgerBtn || !mobileMenu) return;
      const isOpen = mobileMenu.classList.toggle("open");
      hamburgerBtn.setAttribute("aria-expanded", String(isOpen));
      hamburgerBtn.querySelectorAll("span").forEach((span, i) => {
        if (isOpen) {
          if (i === 0) span.style.transform = "rotate(45deg) translateY(7px)";
          if (i === 1) span.style.opacity = "0";
          if (i === 2) span.style.transform = "rotate(-45deg) translateY(-7px)";
        } else {
          span.style.transform = "";
          span.style.opacity = "";
        }
      });
    }

    function handleOutsideClick(e: MouseEvent) {
      if (!hamburgerBtn || !mobileMenu) return;
      if (
        !hamburgerBtn.contains(e.target as Node) &&
        !mobileMenu.contains(e.target as Node)
      ) {
        mobileMenu.classList.remove("open");
        hamburgerBtn.setAttribute("aria-expanded", "false");
        hamburgerBtn.querySelectorAll("span").forEach((span) => {
          span.style.transform = "";
          span.style.opacity = "";
        });
      }
    }

    hamburgerBtn?.addEventListener("click", handleHamburgerClick);
    document.addEventListener("click", handleOutsideClick);

    /* ================================================
       5. BACK TO TOP BUTTON
       ================================================ */
    let backBtn = document.getElementById(
      "back-to-top"
    ) as HTMLButtonElement | null;
    let createdBackBtn = false;
    if (!backBtn) {
      backBtn = document.createElement("button");
      backBtn.id = "back-to-top";
      backBtn.className = "back-to-top-btn";
      backBtn.setAttribute("aria-label", "الرجوع لأعلى الصفحة");
      backBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      `;
      document.body.appendChild(backBtn);
      createdBackBtn = true;
    }

    function handleBackBtnScroll() {
      if (!backBtn) return;
      if (window.scrollY > 400) {
        backBtn.classList.add("show");
      } else {
        backBtn.classList.remove("show");
      }
    }

    function handleBackBtnClick() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    backBtn.addEventListener("click", handleBackBtnClick);
    window.addEventListener("scroll", handleBackBtnScroll, { passive: true });

    /* ================================================
       6. FAQ ACCORDION
       ================================================ */
    document.querySelectorAll<HTMLElement>(".faq-question").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".faq-item");
        if (!item) return;
        const isOpen = item.classList.contains("open");
        document
          .querySelectorAll(".faq-item.open")
          .forEach((el) => el.classList.remove("open"));
        if (!isOpen) item.classList.add("open");
      });
    });

    /* ================================================
       7. TESTIMONIALS SLIDER
       ================================================ */
    const slider = document.querySelector<HTMLElement>(".testimonials-slider");
    const dots = document.querySelectorAll<HTMLElement>(".slider-dot");
    let sliderInterval: NodeJS.Timeout | null = null;
    let currentSlide = 0;

    if (slider && dots.length) {
      function goTo(index: number) {
        currentSlide = index;
        if (slider)
          slider.style.transform = `translateX(${currentSlide * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle("active", i === currentSlide));
      }

      dots.forEach((dot, i) => {
        dot.addEventListener("click", () => goTo(i));
      });

      sliderInterval = setInterval(() => goTo((currentSlide + 1) % dots.length), 5000);
      slider.addEventListener("mouseenter", () => {
        if (sliderInterval) clearInterval(sliderInterval);
      });
      slider.addEventListener("mouseleave", () => {
        sliderInterval = setInterval(() => goTo((currentSlide + 1) % dots.length), 5000);
      });

      // Touch/swipe
      let touchStartX = 0;
      slider.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
      slider.addEventListener("touchend", (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
          goTo(diff > 0 ? (currentSlide + 1) % dots.length : (currentSlide - 1 + dots.length) % dots.length);
        }
      });

      goTo(0);
    }

    /* ================================================
       8. INQUIRY FORM WHATSAPP REDIRECT
       ================================================ */
    const form = document.getElementById("inquiry-form") as HTMLFormElement | null;
    if (form) {
      form.onsubmit = function (e) {
        e.preventDefault();
        const name = (document.getElementById("form-name") as HTMLInputElement)?.value || "";
        const phone = (document.getElementById("form-phone") as HTMLInputElement)?.value || "";
        const loc = (document.getElementById("form-loc") as HTMLSelectElement)?.value || "";
        const appliance = (document.getElementById("form-appliance") as HTMLSelectElement)?.value || "";
        const whatsappNumber = "201062842903";
        const message = `طلب صيانة جديد 🛠️\n- الاسم: ${name}\n- رقم الهاتف: ${phone}\n- المحافظة/المدينة: ${loc}\n- الجهاز المراد صيانته: ${appliance}`;
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        form.reset();
      };
    }

    /* ================================================
       CLEANUP
       ================================================ */
    return () => {
      revealObserver.disconnect();
      counterObserver.disconnect();
      window.removeEventListener("scroll", handleNavbarScroll);
      window.removeEventListener("scroll", handleBackBtnScroll);
      hamburgerBtn?.removeEventListener("click", handleHamburgerClick);
      document.removeEventListener("click", handleOutsideClick);
      backBtn?.removeEventListener("click", handleBackBtnClick);
      if (sliderInterval) clearInterval(sliderInterval);
      // Remove the back-to-top button if we created it
      if (createdBackBtn && backBtn && document.body.contains(backBtn)) {
        document.body.removeChild(backBtn);
      }
    };
  }, [pathname]);

  return null;
}
