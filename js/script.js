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
        }
        
        if (footerElement) {
            const footerResponse = await fetch('includes/footer.html');
            footerElement.innerHTML = await footerResponse.text();
        }
    };
    
    includeComponents();
    
    // Setup mobile dropdowns after header is loaded
    function setupMobileDropdowns() {
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
});
