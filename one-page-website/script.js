// Scroll Animation
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Smooth scrolling for anchor links
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

// CTA Button interaction
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        alert('Welcome to TaskFlow! Sign up feature coming soon.');
    });
}

// Pricing buttons interaction
const pricingButtons = document.querySelectorAll('.pricing-button');
pricingButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const plan = e.target.closest('.pricing-card').querySelector('h3').textContent;
        alert(`You selected the ${plan} plan. Checkout coming soon!`);
    });
});

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});