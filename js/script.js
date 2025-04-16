document.addEventListener('DOMContentLoaded', function() {
    // Load header and footer components
    const includeComponents = async () => {
        const headerElement = document.querySelector('#header-include');
        const footerElement = document.querySelector('#footer-include');
        
        if (headerElement) {
            const headerResponse = await fetch('includes/header.html');
            headerElement.innerHTML = await headerResponse.text();
            
            // Setup mobile menu toggle
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            const navMenu = document.querySelector('.nav-menu');
            
            if (mobileMenuToggle && navMenu) {
                mobileMenuToggle.addEventListener('click', function() {
                    navMenu.classList.toggle('active');
                });
            }
            
            // Setup dropdown for mobile
            setupMobileDropdowns();
            
            // Set up mobile sidebar menu
            setupMobileSidebar();
        }
        
        if (footerElement) {
            const footerResponse = await fetch('includes/footer.html');
            footerElement.innerHTML = await footerResponse.text();
        }
    };
    
    includeComponents();
    
    // Setup mobile dropdowns after header is loaded
    function setupMobileDropdowns() {
        // Only run this setup on desktop screens
        if (window.innerWidth > 768) {
            const dropdowns = document.querySelectorAll('.nav-item.dropdown');
            
            dropdowns.forEach(dropdown => {
                // Create toggle button for mobile
                const toggleBtn = document.createElement('button');
                toggleBtn.className = 'dropdown-toggle-mobile';
                toggleBtn.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';
                toggleBtn.setAttribute('aria-label', 'Toggle Dropdown');
                
                // Only add toggle button on mobile view
                if (window.innerWidth <= 768) {
                    dropdown.appendChild(toggleBtn);
                }
                
                // Handle dropdown toggle on mobile
                toggleBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const dropdownMenu = this.parentNode.querySelector('.dropdown-menu');
                    dropdownMenu.classList.toggle('active');
                    
                    // Toggle icon
                    const icon = this.querySelector('i');
                    icon.classList.toggle('fa-chevron-down');
                    icon.classList.toggle('fa-chevron-up');
                });
                
                // Handle window resize
                window.addEventListener('resize', function() {
                    if (window.innerWidth <= 768) {
                        if (!dropdown.querySelector('.dropdown-toggle-mobile')) {
                            dropdown.appendChild(toggleBtn.cloneNode(true));
                            setupToggleListeners();
                        }
                    } else {
                        const mobileToggle = dropdown.querySelector('.dropdown-toggle-mobile');
                        if (mobileToggle) {
                            mobileToggle.remove();
                        }
                    }
                });
                
                function setupToggleListeners() {
                    const toggles = document.querySelectorAll('.dropdown-toggle-mobile');
                    toggles.forEach(toggle => {
                        toggle.addEventListener('click', function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            const dropdownMenu = this.parentNode.querySelector('.dropdown-menu');
                            dropdownMenu.classList.toggle('active');
                            
                            // Toggle icon
                            const icon = this.querySelector('i');
                            icon.classList.toggle('fa-chevron-down');
                            icon.classList.toggle('fa-chevron-up');
                        });
                    });
                }
            });
        }
    }
    
    // Feature toggles for product cards
    const featureToggles = document.querySelectorAll('.feature-toggle');
    
    featureToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const featuresList = this.nextElementSibling;
            
            // Toggle visibility
            featuresList.classList.toggle('active');
            
            // Update icon and text
            const toggleIcon = this.querySelector('.toggle-icon');
            const toggleText = this.querySelector('.toggle-text');
            
            if (featuresList.classList.contains('active')) {
                toggleIcon.classList.replace('fa-chevron-down', 'fa-chevron-up');
                toggleText.textContent = 'Hide Features';
            } else {
                toggleIcon.classList.replace('fa-chevron-up', 'fa-chevron-down');
                toggleText.textContent = 'Key Features';
            }
        });
    });
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                
                // Close all other FAQ items
                document.querySelectorAll('.faq-item').forEach(item => {
                    if (item !== faqItem) {
                        item.classList.remove('active');
                    }
                });
                
                // Toggle current FAQ item
                faqItem.classList.toggle('active');
            });
        });
    }
    
    // Scroll progress indicator
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
    
    // Back to Top Button Functionality
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        // Show button when user scrolls down 300px
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        // Scroll to top when button is clicked
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Cookie Consent Functionality
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptButton = document.getElementById('cookie-accept');
    
    if (cookieConsent && acceptButton) {
        // Check if user has already accepted cookies
        if (!localStorage.getItem('cookiesAccepted')) {
            // Show the cookie consent popup with a slight delay
            setTimeout(() => {
                cookieConsent.classList.add('active');
            }, 1000);
        }
        
        // Handle accept button click
        acceptButton.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieConsent.classList.remove('active');
            
            // Optional: Add animation before removal
            cookieConsent.style.transition = 'bottom 0.5s ease';
            cookieConsent.style.bottom = '-100%';
        });
    }
    
    // Mobile Sidebar Menu Functionality
    function setupMobileSidebar() {
        // Mobile menu toggle button
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        // Mobile sidebar elements
        const mobileSidebar = document.querySelector('.mobile-sidebar');
        const mobileOverlay = document.querySelector('.mobile-nav-overlay');
        const closeButton = document.querySelector('.sidebar-close');
        
        if (mobileMenuToggle && mobileSidebar) {
            // Toggle sidebar when clicking hamburger button
            mobileMenuToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                document.body.classList.toggle('sidebar-active');
                this.querySelector('.hamburger').classList.toggle('active');
            });
            
            // Close sidebar when clicking overlay
            if (mobileOverlay) {
                mobileOverlay.addEventListener('click', function() {
                    document.body.classList.remove('sidebar-active');
                    mobileMenuToggle.querySelector('.hamburger').classList.remove('active');
                });
            }
            
            // Close sidebar when clicking close button
            if (closeButton) {
                closeButton.addEventListener('click', function() {
                    document.body.classList.remove('sidebar-active');
                    mobileMenuToggle.querySelector('.hamburger').classList.remove('active');
                });
            }
            
            // Handle clicks outside menu to close it
            document.addEventListener('click', function(e) {
                // Only process if sidebar is active and screen width is mobile
                if (document.body.classList.contains('sidebar-active') && window.innerWidth <= 768) {
                    // Check if click is outside both mobile toggle and sidebar
                    if (!mobileSidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                        document.body.classList.remove('sidebar-active');
                        mobileMenuToggle.querySelector('.hamburger').classList.remove('active');
                    }
                }
            });
            
            // Handle mobile dropdown menus
            const dropdownExpanders = document.querySelectorAll('.dropdown-expander');
            dropdownExpanders.forEach(expander => {
                expander.addEventListener('click', function() {
                    // Toggle active class on expander button
                    this.classList.toggle('active');
                    
                    // Find and toggle the dropdown menu
                    const dropdownMenu = this.parentNode.querySelector('.mobile-dropdown-menu');
                    if (dropdownMenu) {
                        dropdownMenu.classList.toggle('expanded');
                    }
                });
            });
            
            // Close sidebar when pressing escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && document.body.classList.contains('sidebar-active')) {
                    document.body.classList.remove('sidebar-active');
                    mobileMenuToggle.querySelector('.hamburger').classList.remove('active');
                }
            });
            
            // Close sidebar when window is resized to desktop size
            window.addEventListener('resize', function() {
                if (window.innerWidth > 768 && document.body.classList.contains('sidebar-active')) {
                    document.body.classList.remove('sidebar-active');
                    mobileMenuToggle.querySelector('.hamburger').classList.remove('active');
                }
            });
        }
    }
});
