/* ==========================================
   ANAND ROADWAYS — GSAP + SCROLLTRIGGER MOTION DESIGN SYSTEM
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Register ScrollTrigger if available
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  if (prefersReducedMotion || typeof gsap === 'undefined') {
    initReducedMotionFallback();
    return;
  }

  initNavbarScroll();
  initHeroEntrance();
  initScrollTitleReveals();
  initScrollImageReveals();
  initBrandStatementReveal();
  initServiceRowsAnimation();
  initNetworkMapScrollTrigger();
  initButtonHovers();
  initFinalCtaReveal();
});

/* Reduced Motion Fallback */
function initReducedMotionFallback() {
  document.querySelectorAll('.reveal-title, .reveal-image, .service-row-item, .hero-editorial-photo, .route-thin-line').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
    el.style.clipPath = 'none';
    el.style.strokeDashoffset = '0';
  });
}

/* 10. Navbar Scroll Motion */
function initNavbarScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 60) {
      if (currentScrollY > lastScrollY) {
        header.classList.add('compact');
      } else {
        header.classList.remove('compact');
      }
    } else {
      header.classList.remove('compact');
    }
    lastScrollY = currentScrollY;
  }, { passive: true });
}

/* 1. Hero Text & 2. Image Reveal Sequence */
function initHeroEntrance() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });

  const eyebrow = document.querySelector('.hero-editorial-content .editorial-label');
  const titleLines = document.querySelectorAll('.hero-editorial-content .line-wrap');
  const subtitle = document.querySelector('.hero-editorial-subtitle');
  const ctas = document.querySelectorAll('.hero-editorial-ctas .btn');
  const metaStrip = document.querySelector('.hero-meta-strip');
  const heroPhoto = document.querySelector('.hero-editorial-photo');
  const heroPhotoImg = document.querySelector('.hero-editorial-photo img');

  if (eyebrow) {
    tl.fromTo(eyebrow, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
  }

  if (titleLines.length > 0) {
    tl.fromTo(titleLines, 
      { opacity: 0, y: 70, clipPath: 'inset(100% 0 0 0)' }, 
      { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', stagger: 0.08, duration: 0.8 }, 
      '-=0.2'
    );
  }

  if (subtitle) {
    tl.fromTo(subtitle, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');
  }

  if (ctas.length > 0) {
    tl.fromTo(ctas, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }, '-=0.2');
  }

  if (metaStrip) {
    tl.fromTo(metaStrip, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.2');
  }

  if (heroPhoto && heroPhotoImg) {
    tl.fromTo(heroPhoto, 
      { clipPath: 'inset(0 100% 0 0)' }, 
      { clipPath: 'inset(0 0% 0 0)', duration: 1.0, ease: 'power3.inOut' }, 
      '-=0.9'
    ).fromTo(heroPhotoImg, 
      { scale: 1.06 }, 
      { scale: 1, duration: 1.0, ease: 'power3.out' }, 
      '-=1.0'
    );
  }
}

/* 3. Section Heading Reveals (Reusable ScrollTrigger) */
function initScrollTitleReveals() {
  const titles = document.querySelectorAll('.reveal-title, .section-header-editorial');

  titles.forEach(title => {
    gsap.fromTo(title, 
      { opacity: 0, y: 50, clipPath: 'inset(100% 0 0 0)' },
      { 
        opacity: 1, 
        y: 0, 
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

/* 8. Reusable Image Reveals */
function initScrollImageReveals() {
  const imageContainers = document.querySelectorAll('.reveal-image, .about-editorial-image');

  imageContainers.forEach(container => {
    const img = container.querySelector('img');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    tl.fromTo(container, 
      { clipPath: 'inset(0 100% 0 0)' }, 
      { clipPath: 'inset(0 0% 0 0)', duration: 1.0, ease: 'power3.inOut' }
    );

    if (img) {
      tl.fromTo(img, 
        { scale: 1.04 }, 
        { scale: 1, duration: 1.0, ease: 'power3.out' }, 
        '-=1.0'
      );
    }
  });
}

/* 7. Brand Statement Line-by-Line Reveal */
function initBrandStatementReveal() {
  const quote = document.querySelector('.brand-statement-quote');
  const body = document.querySelector('.brand-statement-body');

  if (quote) {
    gsap.fromTo(quote,
      { opacity: 0, y: 40 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.9, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: quote,
          start: 'top 80%'
        }
      }
    );
  }

  if (body) {
    gsap.fromTo(body,
      { opacity: 0, y: 25 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: body,
          start: 'top 82%'
        }
      }
    );
  }
}

/* 4. Services Interaction & 5. Scroll Reveal */
function initServiceRowsAnimation() {
  const rows = document.querySelectorAll('.service-row-item');
  if (rows.length === 0) return;

  // Staggered Entrance
  gsap.fromTo(rows, 
    { opacity: 0, y: 45 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 0.7, 
      stagger: 0.12, 
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.service-rows-container',
        start: 'top 80%'
      }
    }
  );

  // Hover Image Preview Logic
  const preview = document.querySelector('.service-hover-preview');
  const previewImg = preview ? preview.querySelector('img') : null;

  const imagesMap = {
    '01': 'assets/images/hero-truck.jpg',
    '02': 'assets/images/fleet-yard.jpg',
    '03': 'assets/images/cargo-loading.jpg',
    '04': 'assets/images/highway-route.jpg',
    '05': 'assets/images/hero-truck.jpg',
    '06': 'assets/images/fleet-yard.jpg'
  };

  rows.forEach(row => {
    const num = row.querySelector('.service-row-num')?.textContent.trim();
    const title = row.querySelector('.service-row-title');
    const arrow = row.querySelector('.service-row-arrow');

    row.addEventListener('mouseenter', () => {
      if (title) gsap.to(title, { x: 10, duration: 0.25, ease: 'power2.out' });
      if (arrow) gsap.to(arrow, { x: 10, duration: 0.25, ease: 'power2.out' });

      if (preview && previewImg && imagesMap[num]) {
        previewImg.src = imagesMap[num];
        preview.style.opacity = '1';
        preview.style.transform = 'scale(1)';
      }
    });

    row.addEventListener('mouseleave', () => {
      if (title) gsap.to(title, { x: 0, duration: 0.25, ease: 'power2.out' });
      if (arrow) gsap.to(arrow, { x: 0, duration: 0.25, ease: 'power2.out' });

      if (preview) {
        preview.style.opacity = '0';
        preview.style.transform = 'scale(0.88)';
      }
    });

    row.addEventListener('mousemove', (e) => {
      if (preview) {
        gsap.to(preview, {
          x: e.clientX + 20,
          y: e.clientY - 80,
          duration: 0.2,
          ease: 'power2.out'
        });
      }
    });
  });
}

/* 6. SURGICAL TRANSPORT ROUTE FLOW ANIMATION TIMELINE */
function initNetworkMapScrollTrigger() {
  const section = document.querySelector('.network-signature-section');
  if (!section) return;

  const howrahBadge = section.querySelector('.howrah-origin-group');
  const routePaths = section.querySelectorAll('.route-thin-line');
  const destGroups = section.querySelectorAll('.dest-marker-group');

  // Prepare stroke dashoffset for each route path
  routePaths.forEach(path => {
    const length = path.getTotalLength ? path.getTotalLength() : 250;
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
  });

  ScrollTrigger.create({
    trigger: section,
    start: 'top 75%',
    onEnter: () => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // 0.15s: Howrah Base marker appears
      if (howrahBadge) {
        tl.fromTo(howrahBadge, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, transformOrigin: '25px 125px' }, 0.15);
      }

      // Sequential route drawing & destination marker reveals
      // Order: WB (0.30s), BR (0.80s), JH (1.00s), UP (1.20s), MP (1.40s), RJ (1.60s)
      const routeTimes = [0.30, 0.80, 1.00, 1.20, 1.40, 1.60];

      routePaths.forEach((path, idx) => {
        const time = routeTimes[idx] || (0.30 + idx * 0.2);
        const destGroup = destGroups[idx];

        tl.to(path, { strokeDashoffset: 0, duration: 0.5 }, time);

        if (destGroup) {
          tl.fromTo(destGroup, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.3 }, time + 0.3);
        }
      });
    }
  });
}

/* 11. Refined CTA Button Hover Animation */
function initButtonHovers() {
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach(btn => {
    const arrow = btn.querySelector('.btn-arrow');
    btn.addEventListener('mouseenter', () => {
      if (arrow) gsap.to(arrow, { x: 8, duration: 0.2, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      if (arrow) gsap.to(arrow, { x: 0, duration: 0.2, ease: 'power2.out' });
    });
  });
}

/* 12. Final Lead Gen CTA Reveal */
function initFinalCtaReveal() {
  const leadSection = document.querySelector('.lead-gen-section');
  if (!leadSection) return;

  const heading = leadSection.querySelector('h2');
  const formBox = leadSection.querySelector('.lead-form-box');

  if (heading) {
    gsap.fromTo(heading, 
      { opacity: 0, y: 40 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: leadSection,
          start: 'top 80%'
        }
      }
    );
  }

  if (formBox) {
    gsap.fromTo(formBox, 
      { opacity: 0, y: 40 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formBox,
          start: 'top 82%'
        }
      }
    );
  }
}
