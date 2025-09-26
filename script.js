/* === script.js - Ideolix final === */

/* ---------- Mobile Menu Toggle ---------- */
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
  });
}

// Hide menu when clicking a nav link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

/* ---------- Smooth Scroll for internal links ---------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const offset = 80; // account for fixed navbar
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ---------- Navbar background on scroll (minor effect) ---------- */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (!navbar) return;
  if (window.scrollY > 120) {
    navbar.style.transform = 'translateY(0)';
    navbar.style.boxShadow = '0 8px 30px rgba(2,6,23,0.12)';
  } else {
    navbar.style.boxShadow = '0 4px 18px rgba(2,6,23,0.08)';
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

let heroIndex = 0;
const heroEl = document.getElementById('heroSlideshow');

function setHeroImage(index) {
  if (!heroEl) return;
  heroEl.style.opacity = '0';
  setTimeout(() => {
    heroEl.style.backgroundImage = `url('${heroImages[index]}')`;
    heroEl.style.backgroundSize = 'cover';
    heroEl.style.backgroundPosition = 'center';
    heroEl.style.opacity = '1';
  }, 300);
}

// initial hero background
if (heroEl && heroImages.length) {
  setHeroImage(heroIndex);
  setInterval(() => {
    heroIndex = (heroIndex + 1) % heroImages.length;
    setHeroImage(heroIndex);
  }, 6500); // 6.5s per slide
}

/* ---------- Animated counters (hero + stats) ---------- */
function animateCountsOnce(selector = '.count') {
  const counts = document.querySelectorAll(selector);
  counts.forEach(el => {
    const target = parseInt(el.getAttribute('data-target'), 10) || 0;
    let current = 0;
    const duration = 1400;
    const stepTime = Math.max(20, Math.floor(duration / (target || 1)));
    const timer = setInterval(() => {
      current += Math.max(1, Math.floor(target / (duration / stepTime)));
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = current;
      }
    }, stepTime);
  });
}

/* Trigger counters when stats/hero visible using IntersectionObserver */
const observerOptions = { threshold: 0.25 };
const statsObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCountsOnce('.count');
      obs.disconnect();
    }
  });
}, observerOptions);

const statsSection = document.getElementById('stats');
if (statsSection) statsObserver.observe(statsSection);

/* ---------- Scroll-reveal for cards (HODs, services, testimonials) ---------- */
const revealSelector = '.service-card, .hod-card, .testimonial-card, .admission-card';
const revealItems = document.querySelectorAll(revealSelector);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

revealItems.forEach(item => revealObserver.observe(item));

/* ---------- Testimonials auto-scroll as optional graceful animation ---------- */
(function autoScrollTestimonials() {
  const grid = document.querySelector('.testimonials-grid');
  if (!grid) return;
  let pos = 0;
  setInterval(() => {
    if (window.innerWidth < 900) return; // only auto-scroll on wider screens
    pos += 1;
    grid.scrollLeft = pos;
    if (pos >= (grid.scrollWidth - grid.clientWidth)) pos = 0;
  }, 30); // slow smooth scroll
})();

/* ---------- Contact form handling (Formspree) ---------- */
const contactForm = document.getElementById('contactForm');

function showNotification(message, type = 'info') {
  // simple floating notification
  const n = document.createElement('div');
  n.className = `site-notif ${type}`;
  n.textContent = message;
  Object.assign(n.style, {
    position: 'fixed', right: '20px', top: '100px', background: '#111', color:'#fff',
    padding: '12px 16px', borderRadius: '8px', zIndex: 15000, boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
  });
  document.body.appendChild(n);
  setTimeout(()=> n.remove(), 4500);
}

if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const action = contactForm.getAttribute('action') || '';
    if (!action) {
      showNotification('Form destination not configured.', 'error');
      return;
    }

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
        const json = await res.json().catch(()=> null);
        showNotification(json && json.error ? json.error : 'Submission failed. Please try again later.', 'error');
      }
    } catch (err) {
      console.error('Contact submit error', err);
      showNotification('Network error. Please try again later.', 'error');
    }
  });
}

/* ---------- Footer year ---------- */
const copyYear = document.getElementById('copyYear');
if (copyYear) copyYear.textContent = new Date().getFullYear();

/* ---------- Simple accessibility improvements ---------- */
// Allow pressing Escape to close mobile menu
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});
