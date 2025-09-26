// ==================== Mobile Menu Toggle ====================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Close menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// ==================== Smooth Scrolling ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== Navbar Background on Scroll ====================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(16, 185, 129, 0.95)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, var(--ideolix-green) 0%, var(--ideolix-orange) 100%)';
    }
});

// ==================== Form Submission ====================
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you! Your inquiry has been sent. We will contact you within 24 hours.');
        this.reset();
    });
}

// ==================== Loading Animation ====================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ==================== Testimonials Auto-Scroll ====================
setInterval(() => {
    const testimonials = document.querySelector('.testimonials-grid');
    if (testimonials) {
        testimonials.scrollLeft += 1;
        if (testimonials.scrollLeft >= testimonials.scrollWidth - testimonials.clientWidth) {
            testimonials.scrollLeft = 0;
        }
    }
}, 5000);

// ==================== Hero Slideshow ====================
const heroImages = [
    "https://images.unsplash.com/photo-1584697964199-3e04a64d6f86", // Teacher online
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b", // Students learning
    "https://images.unsplash.com/photo-1529070538774-1843cb3265df", // Coding
    "https://images.unsplash.com/photo-1584697964261-2a1a98db1e7c", // Zoom laptop
    "https://images.unsplash.com/photo-1596495577886-d920f1fb7238", // Kids smiling
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f", // Parent helping child
    "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b", // Group classroom
    "https://images.unsplash.com/photo-1604085573822-4e5b6f1a89f5"  // Graduation
];

let currentHero = 0;
const heroSection = document.querySelector('.hero');

function changeHeroBackground() {
    heroSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${heroImages[currentHero]})`;
    heroSection.style.backgroundSize = "cover";
    heroSection.style.backgroundPosition = "center";
    currentHero = (currentHero + 1) % heroImages.length;
}

if (heroSection) {
    changeHeroBackground();
    setInterval(changeHeroBackground, 6000); // change every 6s
}

// ==================== Founder Section Styling ====================
// Ensures founder text is centered and has padding
const founderSection = document.querySelector('.founder');
if (founderSection) {
    founderSection.style.textAlign = "center";
    founderSection.style.padding = "40px 20px";
}
