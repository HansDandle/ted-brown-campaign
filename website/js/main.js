// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = hamburger.querySelectorAll('.bar');
        if (hamburger.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Reset hamburger bars
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }

        lastScrollY = currentScrollY;
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.message-item, .platform-card, .quote-card, .support-card, .about-highlights');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Active navigation link highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

   // Platform accordion functionality (multiple open, no collapse)
const headers = document.querySelectorAll('.platform-header');

headers.forEach(header => {
  const platformItem = header.closest('.platform-item');
  const content = platformItem ? platformItem.querySelector('.platform-content') : null;

  if (content) {
    header.addEventListener('click', () => {
      const isOpen = content.classList.contains('open');
            if (!isOpen) {
                // Open clicked panel
                content.classList.add('open');
                // Recompute height robustly (handles images/iframes/<details> that change layout)
                adjustOpenPlatformHeights();
                // If this panel is the 'more-reasons' panel, toggle the inline link text only
                if (content.id === 'more-reasons') {
                    const seeMore = document.querySelector('#why-vote-libertarian .see-more');
                    if (seeMore) seeMore.textContent = 'See less';
                }
            } else {
                // Allow closing by clicking again
                content.classList.remove('open');
                content.style.maxHeight = null;
                if (content.id === 'more-reasons') {
                    const seeMore = document.querySelector('#why-vote-libertarian .see-more');
                    if (seeMore) seeMore.textContent = 'See more';
                }
            }
    });
  }
});



    // Typing effect for hero title (optional enhancement)
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        const text = heroName.textContent;
        heroName.textContent = '';
        heroName.style.borderRight = '2px solid var(--primary-color)';
        
        let index = 0;
        const typeWriter = () => {
            if (index < text.length) {
                heroName.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    heroName.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }

    // Form validation (if contact form is added later)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Lazy loading for images (when images are added)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Share functionality
    const shareButtons = document.querySelectorAll('.share-buttons a');
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add analytics tracking here if needed
            console.log('Share button clicked:', this.getAttribute('href'));
        });
    });

    // Donation button tracking
    const donateButtons = document.querySelectorAll('a[href*="square.link"]');
    donateButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add analytics tracking for donations
            console.log('Donate button clicked');
            // You can add Google Analytics or other tracking here
        });
    });

    // Scroll to top functionality (could add a button later)
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Add scroll to top button when user scrolls down
    let scrollToTopBtn;
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            if (!scrollToTopBtn) {
                scrollToTopBtn = document.createElement('button');
                scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
                scrollToTopBtn.className = 'scroll-to-top';
                scrollToTopBtn.style.cssText = `
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    width: 50px;
                    height: 50px;
                    background: var(--primary-color);
                    color: white;
                    border: none;
                    border-radius: 50%;
                    cursor: pointer;
                    box-shadow: var(--shadow);
                    z-index: 1000;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                `;
                scrollToTopBtn.addEventListener('click', scrollToTop);
                scrollToTopBtn.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-3px)';
                    this.style.boxShadow = 'var(--shadow-hover)';
                });
                scrollToTopBtn.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = 'var(--shadow)';
                });
                document.body.appendChild(scrollToTopBtn);
            }
        } else if (scrollToTopBtn) {
            scrollToTopBtn.remove();
            scrollToTopBtn = null;
        }
    });

    // Performance optimization: throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Apply throttling to scroll events
    const throttledScroll = throttle(function() {
        // Any scroll-based functionality can be added here
    }, 100);

    window.addEventListener('scroll', throttledScroll);

    // Floating sidebar functionality
    const floatingSidebar = document.querySelector('.floating-sidebar');
    
    if (floatingSidebar) {
        // Show/hide sidebar based on scroll position and screen size
        function handleSidebarVisibility() {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const windowWidth = window.innerWidth;
            
            // Only show floating behavior on desktop
            if (windowWidth > 968) {
                // Show sidebar after scrolling past hero section
                if (scrollY > windowHeight * 0.3) {
                    floatingSidebar.style.opacity = '1';
                    floatingSidebar.style.visibility = 'visible';
                    floatingSidebar.style.transform = 'translateY(-50%)';
                } else {
                    floatingSidebar.style.opacity = '0';
                    floatingSidebar.style.visibility = 'hidden';
                    floatingSidebar.style.transform = 'translateY(-50%) translateX(100px)';
                }
            } else {
                // Always show on mobile/tablet as static element
                floatingSidebar.style.opacity = '1';
                floatingSidebar.style.visibility = 'visible';
                floatingSidebar.style.transform = 'none';
            }
        }
        
        // Initial setup
        floatingSidebar.style.transition = 'all 0.3s ease';
        handleSidebarVisibility();
        
        // Handle window resize
        window.addEventListener('resize', handleSidebarVisibility);
        
        // Update on scroll (use existing throttled scroll)
        window.addEventListener('scroll', handleSidebarVisibility);
        
        // Add click tracking for analytics (optional)
        const sidebarLinks = floatingSidebar.querySelectorAll('a');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function() {
                const linkType = this.classList.contains('donate-btn') ? 'donate' : 
                               this.href.includes('facebook') ? 'facebook' : 
                               this.href.includes('twitter') ? 'twitter' : 
                               this.href.includes('tel:') ? 'phone' : 
                               this.href.includes('mailto:') ? 'email' : 'unknown';
                
                console.log(`Sidebar link clicked: ${linkType}`);
                
                // Add smooth animation on click
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    }

    console.log('Ted Brown Campaign Website Loaded Successfully!');
});

// Inline "See more" links for content toggles
const seeMoreLinks = document.querySelectorAll('.see-more');
seeMoreLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.dataset.target;
        const content = document.getElementById(targetId);
        if (!content) return;

        const isOpen = content.classList.contains('open');
            if (!isOpen) {
            content.classList.add('open');
            // Recompute height robustly
            adjustOpenPlatformHeights();
            // After expansion, ensure the start of the section remains visible.
            // Anchor the scroll to the section top (not the inner content)
            // and only scroll when the section is currently below the navbar.
            setTimeout(() => {
                const navbar = document.querySelector('.navbar');
                const navHeight = navbar ? navbar.offsetHeight : 80;
                const section = content.closest('section') || content;
                const rect = section.getBoundingClientRect();
                const sectionTop = window.pageYOffset + rect.top;
                const desired = Math.max(0, sectionTop - navHeight - 10);

                // Only scroll if the viewport currently starts below the desired position
                if (window.pageYOffset > desired + 5 || window.pageYOffset < desired - 50) {
                    window.scrollTo({ top: desired, behavior: 'smooth' });
                }
            }, 200);
            // Toggle inline link text only; keep the intro blurb visible
            link.textContent = 'See less';
        } else {
            content.classList.remove('open');
            content.style.maxHeight = null;
            link.textContent = 'See more';
        }
    });
});

// Helper to adjust maxHeight for open platform panels (used when inner <details> toggle or resize happens)
function adjustOpenPlatformHeights() {
    document.querySelectorAll('.platform-content.open').forEach(content => {
        let attempts = 0;
        const maxAttempts = 8;
        const tick = () => {
            const prev = parseFloat(content.style.maxHeight) || 0;
            const target = content.scrollHeight;
            content.style.maxHeight = target + 'px';
            attempts++;
            // If the measured scrollHeight grows after setting (images/iframes loaded or details expanded), try again
            if (attempts < maxAttempts) {
                setTimeout(() => {
                    const now = content.scrollHeight;
                    if (now > target + 4) tick();
                }, 120);
            }
        };
        tick();
    });
}

// Recompute height when any <details> toggles inside platform-content
document.addEventListener('toggle', function(e) {
    if (e.target && e.target.tagName === 'DETAILS') {
        // Find nearest .platform-content ancestor
        let ancestor = e.target.parentElement;
        while (ancestor && !ancestor.classList.contains('platform-content')) ancestor = ancestor.parentElement;
        if (ancestor && ancestor.classList.contains('open')) {
            // Adjust this open panel's height
            adjustOpenPlatformHeights();
        }
    }
});

// Recompute on window resize for responsive content
window.addEventListener('resize', function() {
    adjustOpenPlatformHeights();
});

// Use ResizeObserver to react immediately when inner content changes
if (typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(entries => {
        entries.forEach(entry => {
            const contentInner = entry.target;
            const ancestor = contentInner.closest('.platform-content');
            if (ancestor && ancestor.classList.contains('open')) {
                // Immediately update to match new content size (small padding)
                ancestor.style.maxHeight = (ancestor.scrollHeight + 12) + 'px';
            }
        });
    });

    document.querySelectorAll('.platform-content .content-inner').forEach(el => ro.observe(el));
}