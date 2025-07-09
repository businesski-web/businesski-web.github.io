// Mobile Navigation Toggle - Improved Version
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    const body = document.body;
    const header = document.querySelector('.header');

    // Mobile Menu Toggle Function
    if (mobileMenuToggle && navList) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle active states
            mobileMenuToggle.classList.toggle('active');
            navList.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navList.classList.contains('active')) {
                body.classList.add('menu-open');
            } else {
                body.classList.remove('menu-open');
            }
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navList.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });

        // Close mobile menu when clicking on the close button (X)
        navList.addEventListener('click', function(e) {
            if (e.target === navList || e.target.textContent === '×') {
                mobileMenuToggle.classList.remove('active');
                navList.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !navList.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navList.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });

        // Close mobile menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                mobileMenuToggle.classList.remove('active');
                navList.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });

        // Handle escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navList.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navList.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }

    // Improved Header scroll effect
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(249, 249, 246, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(249, 249, 246, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }

    function requestHeaderUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestHeaderUpdate);

    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for animations - Optimized for mobile
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.benefit-card, .step, .story, .quote-box, .timeline-item, .value-item, .service-box, .contact-box');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Staggered animation delay for grid items
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        step.style.transitionDelay = `${index * 0.1}s`;
    });

    const stories = document.querySelectorAll('.story');
    stories.forEach((story, index) => {
        story.style.transitionDelay = `${index * 0.1}s`;
    });

    // Improved hover effects for touch devices
    const cards = document.querySelectorAll('.benefit-card, .step, .story, .value-item, .service-box, .contact-box');
    
    cards.forEach(card => {
        // Add touch handling for mobile
        card.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Mouse events for desktop
        card.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });

    // Contact button tracking
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonType = this.href.includes('mailto') ? 'email' : 'calendar';
            
            // Add loading state
            const originalText = this.innerHTML;
            if (buttonType === 'email') {
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Öffne E-Mail...';
            } else {
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Öffne Kalender...';
            }
            
            // Reset after a short delay
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 1000);
            
            console.log(`CTA clicked: ${buttonType}`);
        });
    });

    // Optimized image loading with lazy loading
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Add loading placeholder
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                // Handle image load
                if (img.complete) {
                    img.style.opacity = '1';
                } else {
                    img.addEventListener('load', () => {
                        img.style.opacity = '1';
                    });
                    
                    img.addEventListener('error', () => {
                        img.style.opacity = '0.5';
                        console.warn('Image failed to load:', img.src);
                    });
                }
                
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Parallax effect for background elements - Disabled on mobile for performance
    if (window.innerWidth > 768) {
        let parallaxTicking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero::before');
            
            parallaxElements.forEach(element => {
                const speed = scrolled * 0.5;
                element.style.transform = `translateY(${speed}px)`;
            });
            
            parallaxTicking = false;
        }
        
        function requestParallaxUpdate() {
            if (!parallaxTicking) {
                requestAnimationFrame(updateParallax);
                parallaxTicking = true;
            }
        }
        
        window.addEventListener('scroll', requestParallaxUpdate);
    }

    // Add bounce animation to icons on hover - Only on desktop
    if (window.innerWidth > 768) {
        const icons = document.querySelectorAll('.benefit-icon, .story-icon, .value-icon, .service-icon, .contact-icon');
        icons.forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.style.animation = 'bounce 0.6s ease';
            });
            
            icon.addEventListener('animationend', function() {
                this.style.animation = '';
            });
        });
    }

    // Performance optimization: Debounced resize handler
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Recalculate positions after resize
            const currentWidth = window.innerWidth;
            
            // Reset mobile menu if switching to desktop
            if (currentWidth > 768) {
                mobileMenuToggle.classList.remove('active');
                navList.classList.remove('active');
                body.classList.remove('menu-open');
            }
            
            // Trigger a reflow for any layout-dependent elements
            const transformationImage = document.querySelector('.transformation-image img');
            if (transformationImage) {
                transformationImage.style.maxWidth = currentWidth <= 768 ? '250px' : '300px';
            }
        }, 250);
    });

    // Form enhancements for mobile
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Add focus states
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'translateY(-2px)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'translateY(0)';
            });
            
            // Auto-resize textarea on mobile
            if (input.tagName === 'TEXTAREA') {
                input.addEventListener('input', function() {
                    this.style.height = 'auto';
                    this.style.height = this.scrollHeight + 'px';
                });
            }
        });
    });

    // Add CSS for bounce animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounce {
            0%, 20%, 60%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            80% { transform: translateY(-5px); }
        }
        
        /* Mobile-specific optimizations */
        @media (max-width: 768px) {
            .hero-image img,
            .expertise-image img,
            .transformation-image img {
                transition: none !important;
            }
            
            .hero::before {
                opacity: 0.1 !important;
            }
            
            /* Reduce motion for users who prefer it */
            @media (prefers-reduced-motion: reduce) {
                *,
                *::before,
                *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            }
        }
        
        /* Improved touch targets */
        @media (max-width: 768px) {
            .nav-link,
            .cta-button,
            .mobile-menu-toggle {
                min-height: 44px;
                min-width: 44px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
        
        /* Loading states */
        .loading {
            opacity: 0.7;
            pointer-events: none;
        }
        
        /* Scroll lock when mobile menu is open */
        body.menu-open {
            overflow: hidden;
            position: fixed;
            width: 100%;
        }
    `;
    document.head.appendChild(style);

    // Add intersection observer for performance monitoring
    if ('IntersectionObserver' in window) {
        const performanceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Preload images in next section
                    const nextSection = entry.target.nextElementSibling;
                    if (nextSection) {
                        const images = nextSection.querySelectorAll('img[data-src]');
                        images.forEach(img => {
                            if (img.dataset.src) {
                                img.src = img.dataset.src;
                                img.removeAttribute('data-src');
                            }
                        });
                    }
                }
            });
        }, {
            rootMargin: '100px'
        });

        document.querySelectorAll('section').forEach(section => {
            performanceObserver.observe(section);
        });
    }

    // Console info for debugging
    console.log('Mobile optimizations loaded successfully');
    console.log('Viewport width:', window.innerWidth);
    console.log('Touch support:', 'ontouchstart' in window);
});
        
