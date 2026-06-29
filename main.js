/**
 * Appliances Center — Main JavaScript
 * الهندسية للتوكيلات | صيانة الأجهزة المنزلية
 */

/* ================================================
   0. DYNAMIC CONFIGURATION & PROGRESSIVE ENHANCEMENT
   ================================================ */
(function initDynamicSettings() {
  const companySlug = 'center-syana';
  
  fetch(`https://disciplined-mammoth-791.eu-west-1.convex.site/public/site-config?slug=${companySlug}`)
    .then(res => res.json())
    .then(data => {
      if (!data || !data.settings) return;
      const settings = data.settings;

      // Update Logo
      if (settings.general.logoMediaId) {
        document.querySelectorAll('.navbar-logo-img, .footer img').forEach(img => {
          if (img.src.includes('logo.png')) {
            img.src = settings.general.logoMediaId;
          }
        });
      }

      // Update Hotline
      if (settings.contact.hotline) {
        document.querySelectorAll('a[href^="tel:16481"]').forEach(a => {
          a.href = `tel:${settings.contact.hotline}`;
          if (a.textContent.includes('16481')) {
            a.innerHTML = a.innerHTML.replace('16481', settings.contact.hotline);
          }
        });
      }
      
      // Update Phone
      if (settings.contact.phone) {
        document.querySelectorAll('a[href^="tel:010"]').forEach(a => {
          if (a.href.includes('01068429404') || a.href.includes('01062842903')) {
            a.href = `tel:${settings.contact.phone}`;
            a.textContent = settings.contact.phone;
          }
        });
      }

      // Update WhatsApp
      if (settings.social.whatsapp) {
        window.whatsappNumber = settings.social.whatsapp;
      }

      // Update Address
      if (settings.contact.address) {
        document.querySelectorAll('.topbar-item, .footer-brand-desc').forEach(el => {
          if (el.textContent.includes('المهندسين')) {
            el.innerHTML = el.innerHTML.replace('المهندسين، الجيزة', settings.contact.address);
          }
        });
      }
      
      // Update Working Hours
      if (settings.contact.workingHours) {
        document.querySelectorAll('.topbar-item').forEach(el => {
          if (el.textContent.includes('السبت')) {
            el.innerHTML = el.innerHTML.replace('السبت – الخميس: 9 ص – 10 م', settings.contact.workingHours);
          }
        });
      }

      // Update Hero Title/Subtitle
      if (settings.homepage.heroTitle) {
        const heroTitleEl = document.querySelector('.hero-title, .brand-hero-title');
        if (heroTitleEl) {
          heroTitleEl.textContent = settings.homepage.heroTitle;
        }
      }
      if (settings.homepage.heroSubtitle) {
        const heroSubtitleEl = document.querySelector('.hero-subtitle, .brand-hero-subtitle');
        if (heroSubtitleEl) {
          heroSubtitleEl.textContent = settings.homepage.heroSubtitle;
        }
      }

      // Update Statistics
      if (settings.homepage.statistics && settings.homepage.statistics.length >= 3) {
        const counterElements = document.querySelectorAll('[data-count]');
        counterElements.forEach((el, index) => {
          const stat = settings.homepage.statistics[index];
          if (el instanceof HTMLElement && stat) {
            const numVal = parseInt(stat.value.replace(/[^0-9]/g, ''), 10);
            const suffix = stat.value.replace(/[0-9]/g, '');
            el.dataset.count = numVal.toString();
            el.dataset.suffix = suffix;
            
            const labelEl = el.closest('.stats-card, .stats-strip-card')?.querySelector('.stats-label, p');
            if (labelEl) {
              labelEl.textContent = stat.label;
            }
          }
        });
        if (window.initCounters) {
          window.initCounters();
        }
      }

      // Rebuild Brands Loop Marquee
      if (data.brands && data.brands.length > 0) {
        const brandTracks = document.querySelectorAll('.hero-brands-track');
        brandTracks.forEach(track => {
          track.innerHTML = '';
          const renderSet = (brandsList) => {
            brandsList.forEach(brand => {
              const a = document.createElement('a');
              a.href = `brands/${brand.name.toLowerCase()}.html`;
              a.className = 'hero-brand-logo';
              const img = document.createElement('img');
              img.src = brand.logoUrl || '';
              img.alt = brand.name;
              img.width = 400;
              img.height = 175;
              img.loading = 'lazy';
              a.appendChild(img);
              track.appendChild(a);
            });
          };
          renderSet(data.brands);
          renderSet(data.brands);
        });

        // Rebuild Brands Grid (on homepage and brands.html page)
        const brandsGrids = document.querySelectorAll('.brands-grid');
        brandsGrids.forEach(grid => {
          grid.innerHTML = '';
          data.brands.forEach(brand => {
            const a = document.createElement('a');
            a.href = `brands/${brand.name.toLowerCase()}.html`;
            a.className = 'brand-card reveal revealed';
            a.setAttribute('aria-label', `صيانة ${brand.name}`);
            a.setAttribute('role', 'listitem');
            
            const img = document.createElement('img');
            img.src = brand.logoUrl || '';
            img.alt = brand.name;
            img.className = 'brand-card-logo-img';
            img.width = 400;
            img.height = 175;
            img.loading = 'lazy';
            
            const span = document.createElement('span');
            span.className = 'brand-sub';
            span.textContent = 'صيانة معتمدة';
            
            a.appendChild(img);
            a.appendChild(span);
            grid.appendChild(a);
          });
        });
      }

      // Rebuild Services Overview Grid
      if (data.services && data.services.length > 0) {
        const servicesOverviewGrids = document.querySelectorAll('.services-icons-grid');
        servicesOverviewGrids.forEach(grid => {
          grid.innerHTML = '';
          data.services.forEach(service => {
            const div = document.createElement('div');
            div.className = 'service-icon-item';
            
            const img = document.createElement('img');
            img.src = service.imageUrl || 'assets/Products/refrigerator.png';
            img.className = 'service-product-img';
            img.alt = service.title;
            img.width = 400;
            img.height = 600;
            img.loading = 'lazy';
            
            const span = document.createElement('span');
            span.className = 'service-icon-label';
            span.textContent = service.title;
            
            div.appendChild(img);
            div.appendChild(span);
            grid.appendChild(div);
          });
        });

        // Rebuild full Services page list (.services-grid on services.html)
        const servicesPageGrids = document.querySelectorAll('.services-grid');
        servicesPageGrids.forEach(grid => {
          grid.innerHTML = '';
          data.services.forEach((service, i) => {
            const article = document.createElement('article');
            article.className = `glass-card service-card reveal revealed delay-${(i % 3) + 1}`;
            article.setAttribute('role', 'listitem');
            
            const imgWrap = document.createElement('div');
            imgWrap.className = 'service-img-wrapper';
            const cardImg = document.createElement('img');
            cardImg.src = service.imageUrl || 'assets/Main photos/Repairing Refrigerator.jpeg';
            cardImg.className = 'service-card-img';
            cardImg.alt = service.title;
            cardImg.loading = 'lazy';
            imgWrap.appendChild(cardImg);
            
            const body = document.createElement('div');
            body.className = 'service-card-body';
            
            const prodImg = document.createElement('img');
            prodImg.src = service.imageUrl || 'assets/Products/refrigerator.png';
            prodImg.className = 'service-product-img';
            prodImg.alt = service.title;
            prodImg.width = 400;
            prodImg.height = 600;
            prodImg.loading = 'lazy';
            
            const h3 = document.createElement('h3');
            h3.className = 'service-title';
            h3.textContent = service.title;
            
            const p = document.createElement('p');
            p.className = 'service-card-desc';
            p.style.fontSize = 'var(--text-sm)';
            p.style.color = 'var(--clr-text-muted)';
            p.style.lineHeight = '1.6';
            p.style.marginBottom = 'var(--sp-4)';
            p.style.textAlign = 'right';
            p.textContent = service.description;
            
            const btn = document.createElement('a');
            btn.href = `tel:${settings.contact.hotline || '16481'}`;
            btn.className = 'btn btn-outline';
            btn.textContent = 'اطلب صيانة الآن ←';
            
            body.appendChild(prodImg);
            body.appendChild(h3);
            body.appendChild(p);
            body.appendChild(btn);
            
            article.appendChild(imgWrap);
            article.appendChild(body);
            grid.appendChild(article);
          });
        });
      }

      // Rebuild Testimonials Slider
      if (data.testimonials && data.testimonials.length > 0) {
        const slider = document.querySelector('.testimonials-slider');
        if (slider) {
          slider.innerHTML = '';
          data.testimonials.forEach((t, i) => {
            const card = document.createElement('div');
            card.className = 'testimonial-card';
            card.setAttribute('role', 'group');
            card.setAttribute('aria-label', `الشهادة ${i + 1} من ${data.testimonials.length}`);
            
            const inner = document.createElement('div');
            inner.className = 'testimonial-inner';
            
            const stars = document.createElement('div');
            stars.className = 'stars';
            stars.setAttribute('aria-label', `تقييم ${t.rating} نجوم`);
            stars.textContent = '⭐'.repeat(t.rating);
            
            const p = document.createElement('p');
            p.className = 'testimonial-text';
            p.textContent = t.content;
            
            const author = document.createElement('div');
            author.className = 'testimonial-author';
            
            const avatar = document.createElement('div');
            avatar.className = 'author-avatar';
            avatar.setAttribute('aria-hidden', 'true');
            avatar.textContent = t.name.charAt(0);
            
            const info = document.createElement('div');
            const nameDiv = document.createElement('div');
            nameDiv.className = 'author-name';
            nameDiv.textContent = t.name;
            const locDiv = document.createElement('div');
            locDiv.className = 'author-loc';
            locDiv.textContent = t.role || 'عميل معتمد';
            
            info.appendChild(nameDiv);
            info.appendChild(locDiv);
            
            author.appendChild(avatar);
            author.appendChild(info);
            
            inner.appendChild(stars);
            inner.appendChild(p);
            inner.appendChild(author);
            
            card.appendChild(inner);
            slider.appendChild(card);
          });
          
          if (window.initSlider) {
            window.initSlider();
          }
        }
      }

      // Rebuild FAQs Accordions
      if (data.faqs && data.faqs.length > 0) {
        const faqContainer = document.querySelector('.brand-faq');
        if (faqContainer) {
          faqContainer.innerHTML = '';
          data.faqs.forEach((faq, i) => {
            const faqItem = document.createElement('div');
            faqItem.className = `faq-item${i === 0 ? ' open' : ''}`;
            
            const button = document.createElement('button');
            button.className = 'faq-question';
            button.setAttribute('aria-expanded', i === 0 ? 'true' : 'false');
            button.innerHTML = `${faq.question}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>`;
              
            const answerDiv = document.createElement('div');
            answerDiv.className = 'faq-answer';
            answerDiv.textContent = faq.answer;
            
            faqItem.appendChild(button);
            faqItem.appendChild(answerDiv);
            faqContainer.appendChild(faqItem);
          });
          
          if (window.initFAQ) {
            window.initFAQ();
          }
        }
      }
    })
    .catch(err => console.error("Error loading dynamic settings from Convex", err));
})();

/* ================================================
   1. SCROLL REVEAL
   ================================================ */
(function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.reveal, .reveal-left, .reveal-scale').forEach(el => {
    observer.observe(el);
  });
})();


/* ================================================
   2. COUNTER ANIMATION
   ================================================ */
window.initCounters = function() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const easeOutQuad = t => t * (2 - t);

  function animateCounter(el) {
    if (el.dataset.animated === 'true') return;
    el.dataset.animated = 'true';
    
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    let start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const value = Math.floor(easeOutQuad(progress) * target);
      el.textContent = value.toLocaleString('ar-EG') + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => {
    el.dataset.animated = 'false';
    observer.observe(el);
  });
};
window.initCounters();


/* ================================================
   3. TYPING EFFECT (HERO)
   ================================================ */
(function initTyping() {
  const el = document.getElementById('typing-word');
  if (!el) return;

  const words = ['للأجهزة المنزلية', 'للغسالات', 'للثلاجات', 'لالبوتاجازات', 'للتكييفات', 'للديب فريزر'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed  = 100;
  const deletingSpeed = 60;
  const pauseTime    = 1800;

  function type() {
    const current = words[wordIndex];

    if (isDeleting) {
      el.textContent = current.slice(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === current.length) {
      setTimeout(() => { isDeleting = true; type(); }, pauseTime);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = words[0];
    return;
  }

  setTimeout(() => {
    isDeleting = true;
    charIndex = words[0].length;
    type();
  }, pauseTime);
})();


/* ================================================
   4. STICKY NAVBAR
   ================================================ */
(function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    navbar.classList.toggle('scrolled', scrollY > 40);
  }, { passive: true });
})();


/* ================================================
   5. MOBILE HAMBURGER MENU
   ================================================ */
(function initMobileMenu() {
  const btn   = document.getElementById('nav-hamburger');
  const menu  = document.getElementById('nav-mobile');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen);
    btn.querySelectorAll('span').forEach((span, i) => {
      if (isOpen) {
        if (i === 0) span.style.transform = 'rotate(45deg) translateY(7px)';
        if (i === 1) span.style.opacity = '0';
        if (i === 2) span.style.transform = 'rotate(-45deg) translateY(-7px)';
      } else {
        span.style.transform = '';
        span.style.opacity = '';
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', false);
    }
  });
})();


/* ================================================
   6. TESTIMONIALS SLIDER
   ================================================ */
window.initSlider = function() {
  if (window.sliderInterval) {
    clearInterval(window.sliderInterval);
  }
  
  const slider = document.querySelector('.testimonials-slider');
  const dotsContainer = document.querySelector('.slider-dots');
  const cards = document.querySelectorAll('.testimonial-card');
  
  if (dotsContainer && cards.length > 0) {
    dotsContainer.innerHTML = '';
    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = `slider-dot${i === 0 ? ' active' : ''}`;
      dot.setAttribute('aria-label', `الشهادة ${i + 1}`);
      dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      dot.setAttribute('role', 'tab');
      dotsContainer.appendChild(dot);
    });
  }

  const dots = document.querySelectorAll('.slider-dot');
  if (!slider || !dots.length) return;

  let current = 0;
  const total = dots.length;

  function goTo(index) {
    current = index;
    slider.style.transform = `translateX(${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  // To prevent multiple listener attachment, clone and replace dot elements
  dots.forEach((dot, i) => {
    const newDot = dot.cloneNode(true);
    dot.parentNode.replaceChild(newDot, dot);
    newDot.addEventListener('click', () => goTo(i));
  });

  const refreshedDots = document.querySelectorAll('.slider-dot');

  // Auto-play
  window.sliderInterval = setInterval(() => goTo((current + 1) % total), 5000);

  slider.addEventListener('mouseenter', () => clearInterval(window.sliderInterval));
  slider.addEventListener('mouseleave', () => {
    window.sliderInterval = setInterval(() => goTo((current + 1) % total), 5000);
  });

  // Touch/swipe
  let touchStartX = 0;
  slider.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? (current + 1) % total : (current - 1 + total) % total);
    }
  });

  goTo(0);
};
window.initSlider();


/* ================================================
   7. FAQ ACCORDION (Brand Pages)
   ================================================ */
window.initFAQ = function() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    
    newBtn.addEventListener('click', () => {
      const item = newBtn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
      document.querySelectorAll('.faq-question').forEach(el => el.setAttribute('aria-expanded', 'false'));

      if (!isOpen) {
        item.classList.add('open');
        newBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
};
window.initFAQ();


/* ================================================
   8. SMOOTH SECTION LINKS
   ================================================ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ================================================
   9. BACK TO TOP BUTTON
   ================================================ */
(function initBackToTop() {
  let btn = document.getElementById('back-to-top');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.className = 'back-to-top-btn';
    btn.setAttribute('aria-label', 'الرجوع لأعلى الصفحة');
    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    `;
    document.body.appendChild(btn);
  }

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  }, { passive: true });
})();

/* ================================================
   10. INQUIRY FORM WHATSAPP REDIRECT
   ================================================ */
(function initInquiryForm() {
  const form = document.getElementById('inquiry-form');
  if (!form) return;

  form.onsubmit = function(e) {
    e.preventDefault();

    const name = document.getElementById('form-name').value;
    const phone = document.getElementById('form-phone').value;
    const loc = document.getElementById('form-loc').value;
    const appliance = document.getElementById('form-appliance').value;

    const whatsappNumber = window.whatsappNumber || '201062842903';
    
    // Save to Convex asynchronously (non-blocking)
    fetch('https://disciplined-mammoth-791.eu-west-1.convex.site/public/submit-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        companySlug: 'center-syana',
        name: name,
        phone: phone,
        location: loc,
        appliance: appliance
      })
    }).catch(err => console.error("Failed to save repair request to Convex", err));
    
    // Create the message
    const message = `طلب صيانة جديد 🛠️
- الاسم: ${name}
- رقم الهاتف: ${phone}
- المحافظة/المدينة: ${loc}
- الجهاز المراد صيانته: ${appliance}`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    form.reset();
  };
})();
