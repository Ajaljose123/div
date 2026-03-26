// Smooth scroll functionality for buttons
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to buttons
    const primaryBtn = document.querySelector('.primary-btn');
    const secondaryBtn = document.querySelector('.secondary-btn');
    
    if (primaryBtn) {
        primaryBtn.addEventListener('click', function() {
            // Smooth scroll to a section or expand functionality
            console.log('Discover More clicked');
            // You can add navigation logic here
        });
    }
    
    if (secondaryBtn) {
        secondaryBtn.addEventListener('click', function() {
            // Open modal or navigate to about section
            console.log('Learn More clicked');
            // You can add navigation logic here
        });
    }
    
    // Add parallax effect on mouse move
    document.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        const coverPage = document.querySelector('.cover-page');
        if (coverPage) {
            coverPage.style.background = `linear-gradient(${135 + x * 10}deg, #667eea 0%, #764ba2 100%)`;
        }
    });
    
    // Add fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.hero-content > *');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
