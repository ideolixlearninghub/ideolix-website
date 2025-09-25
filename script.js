// === IDEOLIX LEARNING HUB - ENHANCED JAVASCRIPT ===

// Mobile Menu Toggle with Animation
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = menuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close menu when clicking on links or outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        resetMenuAnimation();
    }
});

function resetMenuAnimation() {
    const spans = menuToggle.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
}

// Enhanced Smooth Scrolling with Offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu after click
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                resetMenuAnimation();
            }
        }
    });
});

// Advanced Navbar Effects
let lastScrollY = window.scrollY;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Background change on scroll
    if (scrollY > 100) {
        navbar.style.background = 'rgba(16, 185, 129, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, var(--ideolix-green) 0%, var(--ideolix-orange) 100%)';
        navbar.style.backdropFilter = 'none';
    }
    
    // Hide/show navbar on scroll direction
    if (scrollY > lastScrollY && scrollY > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollY = scrollY;
});

// Enhanced Form Handling with Validation
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: this.querySelector('input[name="name"]').value.trim(),
            email: this.querySelector('input[name="email"]').value.trim(),
            phone: this.querySelector('input[name="phone"]').value.trim(),
            grade: this.querySelector('select[name="grade"]').value,
            message: this.querySelector('textarea[name="message"]').value.trim()
        };
        
        // Enhanced validation
        if (!formData.name || !formData.email || !formData.phone || !formData.grade || !formData.message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(formData.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        if (!isValidPhone(formData.phone)) {
            showNotification('Please enter a valid phone number', 'error');
            return;
        }
        
        // Show success message
        showNotification(`Thank you, ${formData.name}! Your enrollment inquiry has been sent. We'll contact you within 24 hours.`, 'success');
        
        // Here you would normally send the data to your server
        console.log('Form submitted:', formData);
        
        // Reset form
        this.reset();
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// Advanced Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Add notification styles dynamically
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--ideolix-green);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    }
    
    .notification.error {
        background: #ef4444;
    }
    
    .notification.success {
        background: var(--ideolix-green);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 50%;
        transition: background 0.3s ease;
    }
    
    .notification-close:hover {
        background: rgba(255,255,255,0.2);
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @media (max-width: 768px) {
        .notification {
            right: 10px;
            left: 10px;
            max-width: none;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Page Load Animations
window.addEventListener('load', function() {
    // Add loaded class for transitions
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Animate elements on scroll
    animateOnScroll();
});

// Intersection Observer for Scroll Animations
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.service-card, .testimonial-card, .feature-card, .admission-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Enhanced Hover Effects
document.querySelectorAll('.service-card, .testimonial-card, .feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Scroll to Top Button
function createScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.setAttribute('aria-label', 'Scroll to top');
    
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollButton.style.display = 'flex';
        } else {
            scrollButton.style.display = 'none';
        }
    });
    
    document.body.appendChild(scrollButton);
}

// Add scroll to top button styles
const scrollButtonStyles = document.createElement('style');
scrollButtonStyles.textContent = `
    .scroll-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--ideolix-green) 0%, var(--ideolix-orange) 100%);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
        z-index: 999;
        display: none;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }
    
    .scroll-to-top:hover {
        transform: scale(1.1) translateY(-2px);
        box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
    }
    
    @media (max-width: 768px) {
        .scroll-to-top {
            bottom: 20px;
            right: 20px;
            width: 45px;
            height: 45px;
        }
    }
`;
document.head.appendChild(scrollButtonStyles);

// Testimonial Carousel (Optional)
function initTestimonialCarousel() {
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    if (testimonialsGrid && window.innerWidth > 768) {
        let isDown = false;
        let startX;
        let scrollLeft;

        testimonialsGrid.addEventListener('mousedown', (e) => {
            isDown = true;
            testimonialsGrid.classList.add('active');
            startX = e.pageX - testimonialsGrid.offsetLeft;
            scrollLeft = testimonialsGrid.scrollLeft;
        });

        testimonialsGrid.addEventListener('mouseleave', () => {
            isDown = false;
            testimonialsGrid.classList.remove('active');
        });

        testimonialsGrid.addEventListener('mouseup', () => {
            isDown = false;
            testimonialsGrid.classList.remove('active');
        });

        testimonialsGrid.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialsGrid.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialsGrid.scrollLeft = scrollLeft - walk;
        });
    }
}

// WhatsApp Button Enhancement
const whatsappButton = document.querySelector('.whatsapp-float');
if (whatsappButton) {
    whatsappButton.addEventListener('mouseenter', () => {
        whatsappButton.style.transform = 'scale(1.1)';
    });
    
    whatsappButton.addEventListener('mouseleave', () => {
        whatsappButton.style.transform = 'scale(1)';
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createScrollToTopButton();
    initTestimonialCarousel();
    
    // Add loading animation removal
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll event
window.addEventListener('scroll', debounce(() => {
    // Scroll-based animations can go here
}, 10));

// Export form data for potential backend integration
function exportFormData(formData) {
    return {
        timestamp: new Date().toISOString(),
        source: 'ideolix-website',
        ...formData
    };
}

console.log('Ideolix Learning Hub JavaScript loaded successfully!');
