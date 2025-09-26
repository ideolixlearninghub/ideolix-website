// === script.js for Ideolix ===

// -----------------------------
// Hero Slideshow (Unsplash images)
// -----------------------------
const heroImages = [
  // Mixed education images (Unsplash) - feel free to replace later
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1920&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1920&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1920&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1920&auto=format&fit=crop'
];

let slideIndex = 0;
const heroSlideshowEl = document.getElementById('heroSlideshow');

function setHeroBackground(idx) {
  if (!heroSlideshowEl) return;
  heroSlideshowEl.style.backgroundImage = `url('${heroImages[idx]}')`;
  heroSlideshowEl.style.opacity = '0';
  // fade in
  setTimeout(()=> heroSlideshowEl.style.opacity = '1', 50);
}

// Start slideshow
if (heroSlideshowEl) {
  setHeroBackground(slideIndex);
  setInterval(() => {
    slideIndex = (slideIndex + 1) % heroImages.length;
    setHeroBackground(slideIndex);
  }, 6000); // change every 6s
}

// -----------------------------
// Mobile menu toggle and nav behavior
// -----------------------------
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById('navbar');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !expanded);
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
    // animate bars
    const spans = menuToggle.querySelectorAll('span');
    if (menuToggle.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      if (navMenu) navMenu.style.display = 'flex';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
      if (navMenu) navMenu.style.display = '';
    }
  });
}

// Close mobile menu when a nav link clicked
document.querySelectorAll('.nav-link').forEach(link=>{
  link.addEventListener('click', ()=> {
    if (navMenu && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
    }
    if (menuToggle && menuToggle.classList.contains('active')) {
      menuToggle.classList.remove('active');
    }
  });
});

// Navbar hide/show on scroll (small effect)
let lastScroll = window.scrollY;
window.addEventListener('scroll', ()=> {
  const current = window.scrollY;
  if (current > lastScroll && current > 120) {
    navbar.style.transform = 'translateY(-110%)';
  } else {
    navbar.style.transform = 'translateY(0)';
  }
  lastScroll = current;
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', function(e){
    const target = this.getAttribute('href');
    if (target && target !== '#') {
      e.preventDefault();
      const el = document.querySelector(target);
      if (el) {
        const offset = 80; // account for fixed nav
        const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({top, behavior:'smooth'});
      }
    }
  });
});

// -----------------------------
// Animated Counters in hero
// -----------------------------
function animateCounters() {
  const counters = document.querySelectorAll('.count');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const duration = 1400;
    let start = 0;
    const step = Math.ceil(target / (duration / 20));
    const interval = setInterval(()=> {
      start += step;
      if (start >= target) {
        start = target;
        clearInterval(interval);
      }
      counter.textContent = start;
    }, 20);
  });
}

// trigger counters when hero in view
const hero = document.querySelector('.hero');
if (hero) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    });
  }, {threshold:0.3});
  observer.observe(hero);
}

// -----------------------------
// Contact form (EmailJS integration)
// -----------------------------
/*
  To activate:
   1) Register at emailjs.com -> create service & template
   2) Replace 'YOUR_EMAILJS_USER_ID' and 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' below.
   3) Your EmailJS template should reference fields: student_name, parent_email, phone, grade, message
*/
(function(){
  // Replace with your EmailJS user/public key
  const EMAILJS_USER = 'YOUR_EMAILJS_USER_ID'; // <-- replace
  if (typeof emailjs !== 'undefined' && EMAILJS_USER !== 'YOUR_EMAILJS_USER_ID') {
    emailjs.init(EMAILJS_USER);
  } else {
    // If user hasn't replaced the key, just log a gentle reminder
    console.info('EmailJS not initialized — replace YOUR_EMAILJS_USER_ID in script.js with your EmailJS public key.');
  }

  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', function(e){
    e.preventDefault();

    const formData = {
      student_name: this.student_name.value.trim(),
      parent_email: this.parent_email.value.trim(),
      phone: this.phone.value.trim(),
      grade: this.grade.value,
      message: this.message.value.trim()
    };

    // Basic validation
    if (!formData.student_name || !formData.parent_email || !formData.phone || !formData.grade || !formData.message) {
      alert('Please fill in all fields.');
      return;
    }

    // If EmailJS keys replaced then send, else fallback to a console log and notify user
    const SERVICE_ID = 'YOUR_SERVICE_ID'; // <-- replace
    const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // <-- replace

    if (typeof emailjs !== 'undefined' && EMAILJS_USER !== 'YOUR_EMAILJS_USER_ID') {
      emailjs.send(SERVICE_ID, TEMPLATE_ID, formData)
        .then(() => {
          alert('Message sent. We will contact you soon.');
          contactForm.reset();
        })
        .catch((err) => {
          console.error('EmailJS error', err);
          alert('Failed to send message. Please try again later.');
        });
    } else {
      console.log('Form submission (demo):', formData);
      alert('Demo mode: message captured locally. Replace EmailJS keys in script.js to send real emails.');
      contactForm.reset();
    }
  });

  // Clear button
  const clearBtn = document.getElementById('clearForm');
  if (clearBtn) clearBtn.addEventListener('click', ()=> contactForm.reset());
})();

// -----------------------------
// small helper: set footer year
// -----------------------------
document.getElementById('copyYear').textContent = new Date().getFullYear();
