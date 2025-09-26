// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    menuToggle.classList.remove('active');
  });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(16, 185, 129, 0.95)';
  } else {
    navbar.style.background = 'linear-gradient(135deg, #10B981 0%, #F97316 100%)';
  }
});

// Form submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you! Your inquiry has been sent. We will contact you within 24 hours.');
    this.reset();
  });
}

// Stats counter animation
const counters = document.querySelectorAll('.stat-card');
counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-count');
    const count = +counter.innerText.replace('+','');
    const increment = target / 100;
    if(count < target) {
      counter.innerText = Math.ceil(count + increment) + '+';
      setTimeout(updateCount, 30);
    } else {
      counter.innerText = target + '+';
    }
  };
  updateCount();
});

// Hero Slideshow
let slideIndex = 0;
const slides = document.querySelectorAll('.hero-slide');
const showSlides = () => {
  slides.forEach((slide,i)=>slide.style.opacity='0');
  slideIndex++;
  if(slideIndex > slides.length) slideIndex=1;
  slides[slideIndex-1].style.opacity='1';
  setTimeout(showSlides,7000);
};
showSlides();
