/* ===========================
   IDEOLIX LEARNING HUB — SCRIPT
   Menu, slideshow, counters, reveal, form
   =========================== */
'use strict';

/* ---------- Helpers ---------- */
function qs(sel) { return document.querySelector(sel); }
function qsa(sel) { return Array.from(document.querySelectorAll(sel)); }

/* ---------- Menu toggle & close on outside click ---------- */
const menuToggle = qs('#menuToggle');
const navMenu = qs('#navMenu');
const navbar = qs('.navbar');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', String(navMenu.classList.contains('active')));
  });

  // Close when clicking outside the navbar
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* Close menu when clicking any nav link */
qsa('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      menuToggle && menuToggle.classList.remove('active');
      menuToggle && menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

/* ---------- Smooth scroll for internal anchors (account for fixed navbar) ---------- */
qsa('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    const targetEl = document.querySelector(href);
    if (!targetEl) return;
    e.preventDefault();
    const navbarHeight = navbar ? navbar.offsetHeight : 80;
    const top = targetEl.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 8;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ---------- Navbar visual on scroll ---------- */
window.addEventListener('scroll', () => {
  if (!navbar) return;
  if (window.scrollY > 120) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ---------- Hero slideshow (8 images) ---------- */
const heroImages = [
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1604085573822-4e5b6f1a89f5?q=80&w=1920&auto=format&fit=crop"
];

const heroEl = qs('#heroSlideshow');
let heroIndex = 0;

function setHeroImage(index) {
  if (!heroEl) return;
  // fade out/in approach
  heroEl.style.opacity = '0';
  setTimeout(() => {
    const url = heroImages[index % heroImages.length];
    heroEl.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('${url}')`;
    heroEl.style.backgroundSize = 'cover';
    heroEl.style.backgroundPosition = 'center';
    heroEl.style.opacity = '1';
  }, 260);
}

if (heroEl && heroImages.length) {
  // initial
  setHeroImage(heroIndex);
  // cycle
  setInterval(() => {
    heroIndex = (heroIndex + 1) % heroImages.length;
    setHeroImage(heroIndex);
  }, 6500); // 6.5 seconds
}

/* ---------- Counters (animate when visible) ---------- */
function animateCount(el, target, duration = 1400) {
  target = Number(target) || 0;
  if (target <= 0) { el.textContent = target; return; }
  const start = 0;
  const range = target - start;
  const minStep = 20;
  const stepTime = Math.max(minStep, Math.floor(duration / (target || 1)));
  let current = start;
  const timer = setInterval(() => {
    current += Math.max(1, Math.floor(target / (duration / stepTime)));
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = current;
    }
  }, stepTime);
}

const countEls = qsa('.count');
if (countEls.length) {
  const countObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        qsa('.count').forEach(el => {
          const t = el.getAttribute('data-target') || el.textContent || '0';
          animateCount(el, Number(t));
        });
        obs.disconnect();
      }
    });
  }, { threshold: 0.3 });
  const statsSection = qs('#stats') || qs('.hero');
  if (statsSection) countObserver.observe(statsSection);
}

/* ---------- Reveal-on-scroll for cards ---------- */
const revealItems = qsa('.service-card, .hod-card, .testimonial-card, .admission-card, .stat-card');
if (revealItems.length) {
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  revealItems.forEach(it => revealObs.observe(it));
}

/* ---------- Testimonials auto-scroll (desktop only) ---------- */
(function testimonialsAutoScroll() {
  const grid = qs('.testimonials-grid');
  if (!grid) return;
  if (window.innerWidth < 900) return; // disable on small screens
  let px = 0;
  let forward = true;
  setInterval(() => {
    const max = grid.scrollWidth - grid.clientWidth;
    if (max <= 0) return;
    px += forward ? 2 : -2;
    if (px >= max) forward = false;
    if (px <= 0) forward = true;
    grid.scrollLeft = px;
  }, 40);
})();

/* ---------- Contact form submit (Formspree friendly) ---------- */
const contactForm = qs('#contactForm') || qs('.contact-form form');

function showNotification(message, type = 'info') {
  const n = document.createElement('div');
  n.className = 'site-notif';
  n.textContent = message;
  n.style.background = (type === 'success') ? 'linear-gradient(90deg,#10b981,#34d399)' : (type === 'error') ? '#ef4444' : '#111';
  document.body.appendChild(n);
  setTimeout(()=> {
    n.style.opacity = '0';
    setTimeout(()=> n.remove(), 450);
  }, 4200);
}

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const action = contactForm.getAttribute('action') || contactForm.dataset.action;
    if (!action) {
      showNotification('Form destination not configured', 'error');
      return;
    }
    const formData = new FormData(contactForm);

    try {
      const res = await fetch(action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        showNotification('Thank you! Your inquiry has been sent. We will contact you within 24 hours.', 'success');
        contactForm.reset();
      } else {
        let json;
        try { json = await res.json(); } catch (_) { json = null; }
        const errMsg = json && json.error ? json.error : 'Submission failed. Please try again later.';
        showNotification(errMsg, 'error');
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      showNotification('Network error. Please try again later.', 'error');
    }
  });
}

/* ---------- Footer copyright year ---------- */
const copyYear = qs('#copyYear');
if (copyYear) copyYear.textContent = new Date().getFullYear();

/* ---------- Accessibility: Escape closes mobile menu ---------- */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    menuToggle && menuToggle.classList.remove('active');
    menuToggle && menuToggle.setAttribute('aria-expanded', 'false');
  }
});
