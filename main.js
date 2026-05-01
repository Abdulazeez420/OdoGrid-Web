/* =========================================================
   OdoGrid — main.js
   All interactive behaviour: navbar scroll, mobile drawer,
   particle canvas, scroll animations, carousel, copy email.
   ========================================================= */

'use strict';

// ── DOM refs ───────────────────────────────────────────────
const navbar        = document.getElementById('navbar');
const hamburgerBtn  = document.getElementById('hamburger-btn');
const mobileDrawer  = document.getElementById('mobile-drawer');
const carouselTrack = document.getElementById('carousel-track');
const carouselDots  = document.getElementById('carousel-dots');
const carouselPrev  = document.getElementById('carousel-prev');
const carouselNext  = document.getElementById('carousel-next');
const heroCanvas    = document.getElementById('hero-canvas');
const copyBtn       = document.getElementById('copy-email-btn');
const heroTitle     = document.querySelector('.hero-title');
const heroSub       = document.querySelector('.hero-sub');
const heroPrimaryCta = document.querySelector('.hero-ctas .btn-primary');
const ctaHeading    = document.getElementById('cta-heading');
const ctaSub        = document.querySelector('#cta-block > p');
const ctaPrimaryBtn = document.querySelector('#cta-block .cta-badges .cta-badge');


// =========================================================
// 0. HERO COPY A/B TEST (sticky per browser)
// =========================================================
(function initHeroCopyVariant() {
  if (!heroTitle || !heroSub || !heroPrimaryCta) return;

  const STORAGE_KEY = 'dw_hero_copy_variant_v1';
  let variant = localStorage.getItem(STORAGE_KEY);

  if (variant !== 'A' && variant !== 'B') {
    variant = Math.random() < 0.5 ? 'A' : 'B';
    localStorage.setItem(STORAGE_KEY, variant);
  }

  if (variant === 'B') {
    heroTitle.innerHTML = 'Cut Car Costs.<br>Stay Service-Ready.<br>Drive with Confidence.';
    heroSub.textContent = 'Track every fuel stop, maintenance job, trip, and expense in one private app built to work fully offline.';
    heroPrimaryCta.innerHTML = '▶&nbsp; Start Free on Android';
    heroPrimaryCta.setAttribute('aria-label', 'Start free on Android via Google Play');
  }

  document.body.setAttribute('data-hero-copy-variant', variant);
})();


// =========================================================
// 0B. CTA BLOCK COPY A/B TEST (sticky per browser)
// =========================================================
(function initBottomCtaCopyVariant() {
  if (!ctaHeading || !ctaSub || !ctaPrimaryBtn) return;

  const STORAGE_KEY = 'dw_cta_copy_variant_v1';
  let variant = localStorage.getItem(STORAGE_KEY);

  if (variant !== 'A' && variant !== 'B') {
    variant = Math.random() < 0.5 ? 'A' : 'B';
    localStorage.setItem(STORAGE_KEY, variant);
  }

  if (variant === 'B') {
    ctaHeading.textContent = 'Start Tracking Smarter Today';
    ctaSub.textContent = 'Install OdoGrid and keep fuel, maintenance, trips, and expenses organized from day one.';
    ctaPrimaryBtn.innerHTML = '▶&nbsp; Install on Google Play';
    ctaPrimaryBtn.setAttribute('aria-label', 'Install OdoGrid on Google Play');
  }

  document.body.setAttribute('data-cta-copy-variant', variant);
})();


// =========================================================
// 1. NAVBAR — frosted glass after 60 px scroll
// =========================================================
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });


// =========================================================
// 2. MOBILE DRAWER
// =========================================================
function openMobileMenu() {
  mobileDrawer.classList.add('open');
  hamburgerBtn.classList.add('open');
  hamburgerBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  mobileDrawer.classList.remove('open');
  hamburgerBtn.classList.remove('open');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburgerBtn.addEventListener('click', () => {
  const isOpen = mobileDrawer.classList.contains('open');
  isOpen ? closeMobileMenu() : openMobileMenu();
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
    closeMobileMenu();
    hamburgerBtn.focus();
  }
});

// Expose to inline onclick handlers
window.closeMobileMenu = closeMobileMenu;


// =========================================================
// 3. HERO PARTICLE CANVAS
// =========================================================
(function initParticles() {
  if (!heroCanvas) return;

  const ctx    = heroCanvas.getContext('2d');
  let   W, H, particles;
  const COUNT  = 55;
  const COLORS = ['rgba(79,142,247,', 'rgba(255,140,0,'];

  function resize() {
    W = heroCanvas.width  = heroCanvas.offsetWidth;
    H = heroCanvas.height = heroCanvas.offsetHeight;
  }

  function mkParticle() {
    const color = COLORS[Math.random() < 0.75 ? 0 : 1];
    return {
      x:    Math.random() * W,
      y:    Math.random() * H,
      r:    Math.random() * 2.5 + 0.5,
      vx:   (Math.random() - 0.5) * 0.35,
      vy:   (Math.random() - 0.5) * 0.35,
      a:    Math.random() * 0.25 + 0.04,
      color,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: COUNT }, mkParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.a + ')';
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    }
    requestAnimationFrame(draw);
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(heroCanvas.parentElement);

  // Respect reduced-motion preference
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced) {
    init();
    draw();
  }
})();


// =========================================================
// 4. SCROLL-ENTRANCE ANIMATIONS  (IntersectionObserver)
// =========================================================
(function initScrollAnimations() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    // Make all visible immediately
    document.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
})();


// =========================================================
// 5. SCREENSHOTS CAROUSEL
// =========================================================
(function initCarousel() {
  if (!carouselTrack) return;

  const slides      = Array.from(carouselTrack.querySelectorAll('.carousel-slide'));
  const total       = slides.length;
  let   current     = 0;
  let   autoTimer   = null;
  const GAP         = 24;
  const AUTO_DELAY  = 4000;

  function getSlideW() {
    return slides.length > 0 ? slides[0].offsetWidth + GAP : (240 + GAP);
  }

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className   = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    dot.addEventListener('click', () => goTo(i));
    carouselDots.appendChild(dot);
  });

  function goTo(index) {
    current = (index + total) % total;
    carouselTrack.style.transform = `translateX(-${current * getSlideW()}px)`;
    updateDots();
  }

  function updateDots() {
    const dots = carouselDots.querySelectorAll('.carousel-dot');
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === current);
      d.setAttribute('aria-selected', i === current ? 'true' : 'false');
    });
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  carouselNext.addEventListener('click', () => { next(); restartAuto(); });
  carouselPrev.addEventListener('click', () => { prev(); restartAuto(); });

  // Auto-play
  function startAuto() {
    autoTimer = setInterval(next, AUTO_DELAY);
  }
  function stopAuto()    { clearInterval(autoTimer); }
  function restartAuto() { stopAuto(); startAuto(); }

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced) {
    startAuto();
    carouselTrack.parentElement.addEventListener('mouseenter', stopAuto);
    carouselTrack.parentElement.addEventListener('mouseleave', startAuto);
  }

  // Recalculate position on resize (slide width changes at breakpoints)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => goTo(current), 150);
  }, { passive: true });

  // Swipe support on mobile
  let touchStartX = 0;
  carouselTrack.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  carouselTrack.addEventListener('touchend', e => {
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 40) {
      delta < 0 ? next() : prev();
      restartAuto();
    }
  }, { passive: true });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (document.activeElement === carouselPrev || document.activeElement === carouselNext) return;
    if (e.key === 'ArrowRight') { next(); restartAuto(); }
    if (e.key === 'ArrowLeft')  { prev(); restartAuto(); }
  });
})();


// =========================================================
// 6. COPY EMAIL BUTTON
// =========================================================
function copyEmail() {
  const email = document.getElementById('contact-email')?.textContent?.trim();
  if (!email) return;

  // Use Clipboard API with fallback
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(() => showCopied()).catch(() => fallbackCopy(email));
  } else {
    fallbackCopy(email);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity  = '0';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); showCopied(); } catch (_) {}
  document.body.removeChild(ta);
}

function showCopied() {
  if (!copyBtn) return;
  copyBtn.textContent = 'Copied!';
  copyBtn.classList.add('copied');
  setTimeout(() => {
    copyBtn.textContent = 'Copy';
    copyBtn.classList.remove('copied');
  }, 2000);
}

// Expose to inline onclick
window.copyEmail = copyEmail;


// =========================================================
// 7. SMOOTH ANCHOR NAV (offset for fixed navbar height)
// =========================================================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const id = this.getAttribute('href').slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const offset = navbar ? navbar.offsetHeight + 12 : 80;
    const top    = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
