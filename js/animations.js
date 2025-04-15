document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations when page loads
    initAnimations();
    
    // Handle scroll progress indicator
    initScrollProgress();
    
    // Add parallax effect to hero section
    initParallax();
});

// Initialize scroll-based animations
function initAnimations() {
    // Set up the intersection observer
    const options = {
        root: null, // use the viewport
        rootMargin: '0px',
        threshold: 0.2 // element is 20% visible
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, options);
    
    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Handle staggered animations for grid items
    const staggerContainers = document.querySelectorAll('.features-grid, .trust-grid, .use-cases-grid, .certifications-grid');
    staggerContainers.forEach(container => {
        const staggerObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const items = container.querySelectorAll('.stagger-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('active');
                    }, 150 * index); // Stagger each item by 150ms
                });
                staggerObserver.unobserve(container);
            }
        }, options);
        staggerObserver.observe(container);
    });
}

// Initialize scroll progress indicator
function initScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const totalHeight = document.body.scrollHeight - window.innerHeight;
            const progress = (window.pageYOffset / totalHeight) * 100;
            scrollProgress.style.width = `${progress}%`;
            
            // Add wave effect on scroll
            const waveOffset = Math.sin(progress / 10) * 3;
            scrollProgress.style.height = `${3 + waveOffset}px`;
        });
    }
}

// Initialize parallax effect
function initParallax() {
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = `calc(50% + ${scrollPosition * 0.4}px)`;
        });
    }
}
