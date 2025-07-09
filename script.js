// MOBILE-OPTIMIERTES JAVASCRIPT FÜR BUSINESSKI

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
                // Prevent scrolling on iOS
                document.documentElement.style.overflow = 'hidden';
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
            } else {
                body.classList.remove('menu-open');
                // Restore scrolling
                document.documentElement.style.overflow = '';
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
            }
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });

        // Close mobile menu when clicking on the close button (×)
        navList.addEventListener('click', function(e) {
            if (e.target === navList || e.target.textContent === '×') {
                closeMobileMenu();
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navList.classList.contains('active') && 
                !mobileMenuToggle.contains(e.target) && 
                !navList.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Close mobile menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });

        // Handle escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navList.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        // Function to close mobile menu
        function closeMobileMenu() {
            mobileMenuToggle.classList.remove('active');
            navList.classList.remove('active');
            body.classList.remove('menu-open');
            // Restore scrolling
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }
    }

    // Header scroll effect
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
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
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

    window.addEventListener('scroll', requestHeaderUpdate, { passive: true });

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
                
                // Close mobile menu if open
                if (navList.classList.contains('active')) {
                    closeMobileMenu();
                }
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Unobserve after animation for performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.benefit-card, .step, .story, .quote-box, .timeline-item, .value-item, .service-box, .contact-box');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Touch handling for mobile cards
    const cards = document.querySelectorAll('.benefit-card, .step, .story, .value-item, .service-box, .contact-box');
    
    cards.forEach(card => {
        let touchStartY = 0;
        let touchEndY = 0;
        
        card.addEventListener('touchstart', function(e) {
            touchStartY = e.changedTouches[0].screenY;
            if (window.innerWidth <= 768) {
                this.style.transform = 'translateY(-5px) scale(1.02)';
                this.style.transition = 'transform 0.2s ease';
            }
        }, { passive: true });
        
        card.addEventListener('touchend', function(e) {
            touchEndY = e.changedTouches[0].screenY;
            if (window.innerWidth <= 768) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        }, { passive: true });
        
        // Mouse events for desktop
        if (window.matchMedia('(hover: hover)').matches) {
            card.addEventListener('mouseenter', function() {
                if (window.innerWidth > 768) {
                    this.style.transform = 'translateY(-8px) scale(1.02)';
                    this.style.transition = 'transform 0.3s ease';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                if (window.innerWidth > 768) {
                    this.style.transform = 'translateY(0) scale(1)';
                }
            });
        }
    });

    // CTA button tracking and loading states
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonType = this.href.includes('mailto') ? 'email' : 'calendar';
            
            // Add loading state
            const originalText = this.innerHTML;
            this.classList.add('loading');
            
            if (buttonType === 'email') {
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Öffne E-Mail...';
            } else {
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Öffne Kalender...';
            }
            
            // Reset after delay
            setTimeout(() => {
                this.innerHTML = originalText;
                this.classList.remove('loading');
            }, 1500);
            
            console.log(`CTA clicked: ${buttonType}`);
        });
    });

    // Optimized image loading
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
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
    }, {
        rootMargin: '50px'
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Form enhancements for mobile
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Add focus states
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'translateY(-2px)';
                this.parentElement.style.transition = 'transform 0.3s ease';
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

    // Performance optimization: Debounced resize handler
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            const currentWidth = window.innerWidth;
            
            // Reset mobile menu if switching to desktop
            if (currentWidth > 768 && navList.classList.contains('active')) {
                closeMobileMenu();
            }
            
            // Adjust image sizes for mobile
            const transformationImage = document.querySelector('.transformation-image img');
            if (transformationImage) {
                transformationImage.style.maxWidth = currentWidth <= 768 ? '250px' : '300px';
            }
            
            const expertiseImage = document.querySelector('.expertise-image img');
            if (expertiseImage) {
                expertiseImage.style.maxWidth = currentWidth <= 768 ? '250px' : '300px';
            }
        }, 250);
    });

    // Prevent zoom on iOS when focusing inputs
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                if (this.style.fontSize !== '16px') {
                    this.style.fontSize = '16px';
                }
            });
        });
    }

    // Add loading spinner CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .fa-spin {
            animation: spin 1s infinite linear;
        }
        
        .loading {
            opacity: 0.7;
            pointer-events: none;
        }
        
        /* Additional mobile fixes */
        @media (max-width: 768px) {
            /* Prevent horizontal scroll */
            body, html {
                overflow-x: hidden;
                width: 100%;
            }
            
            /* Fix for Safari mobile address bar */
            .hero {
                min-height: calc(100vh - 80px);
            }
            
            /* Improved touch targets */
            .nav-link,
            .cta-button,
            .mobile-menu-toggle {
                min-height: 44px;
                min-width: 44px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            /* Fix for iOS zoom on input focus */
            input, textarea, select {
                font-size: 16px !important;
            }
            
            /* Prevent text selection on buttons */
            .mobile-menu-toggle,
            .cta-button,
            .nav-login {
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                -webkit-tap-highlight-color: transparent;
            }
        }
        
        /* Scroll lock when mobile menu is open */
        body.menu-open {
            overflow: hidden !important;
            position: fixed !important;
            width: 100% !important;
            height: 100% !important;
        }
        
        /* Fixed mobile menu overlay */
        .nav-list.active {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            z-index: 999 !important;
            background: var(--kalk-weiss) !important;
            transform: translateX(0) !important;
        }
        
        /* Improved close button positioning */
        .nav-list::before {
            position: fixed !important;
            top: 20px !important;
            right: 20px !important;
            z-index: 1001 !important;
        }
        
        /* Smooth transitions */
        .nav-list {
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        .mobile-menu-toggle span {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        /* Performance optimizations */
        .benefit-card,
        .step,
        .story,
        .value-item,
        .service-box,
        .contact-box {
            will-change: transform;
            transform: translateZ(0);
        }
        
        /* Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        }
    `;
    document.head.appendChild(style);

    // Add meta viewport if missing (for better mobile rendering)
    if (!document.querySelector('meta[name="viewport"]')) {
        const viewport = document.createElement('meta');
        viewport.name = 'viewport';
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        document.head.appendChild(viewport);
    }

    // Console info for debugging
    console.log('✅ Mobile optimizations loaded successfully');
    console.log('📱 Viewport width:', window.innerWidth);
    console.log('👆 Touch support:', 'ontouchstart' in window);
    console.log('🎯 User agent:', navigator.userAgent);

    // Performance monitoring
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (entry.entryType === 'navigation') {
                    console.log('📈 Page load time:', Math.round(entry.loadEventEnd - entry.loadEventStart), 'ms');
                }
            });
        });
        
        try {
            observer.observe({ entryTypes: ['navigation'] });
        } catch (e) {
            console.log('Performance observer not supported');
        }
    }

    // Add service worker for better mobile performance (optional)
    if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('✅ ServiceWorker registration successful');
                })
                .catch(function(err) {
                    console.log('❌ ServiceWorker registration failed');
                });
        });
    }
});
