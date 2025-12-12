// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
    
    // Initialize Typing Effect
    initTypingEffect();
    
    // Initialize Custom Cursor
    initCustomCursor();
    
    // Initialize Stats Counter
    initStatsCounter();
    
    // Initialize Theme
    initTheme();
    
    // Initialize Project Filter
    initProjectFilter();
    
    // Initialize Form Submission
    initContactForm();
    
    // Initialize Magic Mode
    initMagicMode();
    
    // Initialize Water Animation
    initWaterAnimation();
    
    // Initialize Mobile Menu
    initMobileMenu();
});

// Typing Effect
function initTypingEffect() {
    const textArray = [
        "Web Developer",
        "Digital Artist",
        "UI/UX Designer",
        "Problem Solver",
        "Creative Thinker"
    ];
    const typedTextSpan = document.getElementById('typed-text');
    
    if (!typedTextSpan) return;
    
    const cursorSpan = document.querySelector('.cursor');
    
    let textArrayIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = textArray[textArrayIndex];
        
        if (isDeleting) {
            // Deleting text
            typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Typing text
            typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            // Pause at end
            isDeleting = true;
            setTimeout(type, 1500);
        } else if (isDeleting && charIndex === 0) {
            // Move to next word
            isDeleting = false;
            textArrayIndex = (textArrayIndex + 1) % textArray.length;
            setTimeout(type, 500);
        } else {
            // Continue typing/deleting
            const typingSpeed = isDeleting ? 50 : 100;
            setTimeout(type, typingSpeed);
        }
    }
    
    // Start typing effect
    setTimeout(type, 1000);
}

// Custom Cursor
function initCustomCursor() {
    const cursorDot = document.getElementById('cursor-dot');
    const cursorCircle = document.getElementById('cursor-circle');
    
    if (!cursorDot || !cursorCircle) return;
    
    // Mouse move event
    document.addEventListener('mousemove', (e) => {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        
        cursorCircle.style.left = e.clientX + 'px';
        cursorCircle.style.top = e.clientY + 'px';
    });
    
    // Interactive elements
    const interactiveElements = document.querySelectorAll(
        'a, button, input, textarea, .project-card, .skill-item, .tech-icon'
    );
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorDot.classList.add('hover');
            cursorCircle.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('hover');
            cursorCircle.classList.remove('hover');
        });
    });
}

// Stats Counter
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        element.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        element.textContent = Math.floor(current) + '+';
                    }
                }, 16);
                
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    changeTheme(savedTheme);
}

function changeTheme(theme) {
    document.body.className = theme + '-mode';
    localStorage.setItem('theme', theme);
    
    // Update theme buttons
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.theme === theme) {
            btn.classList.add('active');
        }
    });
}

// Project Filter
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Sending message...', 'info');
            
            setTimeout(() => {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            }, 1500);
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Auto remove
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
}

// Magic Mode
let isMagicMode = false;
let sparkleContainer = null;

function initMagicMode() {
    const magicSwitch = document.getElementById('magic-switch');
    
    if (!magicSwitch) return;
    
    magicSwitch.addEventListener('change', function() {
        isMagicMode = this.checked;
        document.body.classList.toggle('magic-mode', isMagicMode);
        
        if (isMagicMode) {
            enableMagicEffects();
        } else {
            disableMagicEffects();
        }
    });
}

function toggleMagicMode() {
    const magicSwitch = document.getElementById('magic-switch');
    if (magicSwitch) {
        magicSwitch.checked = !magicSwitch.checked;
        magicSwitch.dispatchEvent(new Event('change'));
    }
}

function enableMagicEffects() {
    // Add sparkle effects
    sparkleContainer = document.createElement('div');
    sparkleContainer.className = 'sparkle-container';
    document.body.appendChild(sparkleContainer);
    
    // Create sparkles
    for (let i = 0; i < 50; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + 'vw';
        sparkle.style.top = Math.random() * 100 + 'vh';
        sparkle.style.animationDelay = Math.random() * 5 + 's';
        sparkleContainer.appendChild(sparkle);
    }
    
    // Add magic sound
    const audioPlayer = document.getElementById('audioPlayer');
    if (audioPlayer) {
        audioPlayer.play().catch(e => console.log('Audio play failed:', e));
    }
}

function disableMagicEffects() {
    // Remove sparkles
    if (sparkleContainer) {
        sparkleContainer.remove();
        sparkleContainer = null;
    }
    
    // Stop magic sound
    const audioPlayer = document.getElementById('audioPlayer');
    if (audioPlayer) {
        audioPlayer.pause();
    }
}

// Water Animation
function initWaterAnimation() {
    if (typeof VANTA !== 'undefined') {
        VANTA.WAVES({
            el: ".water-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x8000ff,
            shininess: 50.00,
            waveHeight: 20.00,
            waveSpeed: 0.80,
            zoom: 0.65
        });
    }
}

// Mobile Menu Functions
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    
    if (!hamburger || !mobileMenu) return;
    
    // Toggle mobile menu
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking overlay
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', toggleMobileMenu);
    }
    
    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    });
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburger = document.getElementById('hamburger');
    const body = document.body;
    
    if (!mobileMenu || !hamburger) return;
    
    mobileMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (mobileMenu.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = 'auto';
    }
}

// Settings Toggle
function toggleSettings() {
    const settingsMenu = document.getElementById('settings-menu');
    if (settingsMenu) {
        settingsMenu.classList.toggle('active');
    }
}

// Sound Toggle
function toggleSound() {
    const audio = document.getElementById('audioPlayer');
    const soundToggle = document.getElementById('sound-toggle');
    
    if (!audio || !soundToggle) return;
    
    if (soundToggle.checked) {
        audio.play().catch(e => console.log('Audio play failed:', e));
    } else {
        audio.pause();
    }
}

// Particles Toggle
function toggleParticles() {
    const particlesToggle = document.getElementById('particles-toggle');
    if (particlesToggle) {
        console.log('Particles toggled:', particlesToggle.checked);
        // Add particles implementation here
    }
}

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const backToTop = document.getElementById('backToTop');
    
    if (header && window.scrollY > 100) {
        header.classList.add('scrolled');
    } else if (header) {
        header.classList.remove('scrolled');
    }
    
    if (backToTop) {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
});

// Back to Top
document.addEventListener('DOMContentLoaded', function() {
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    });
});

// Preloader
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }, 1000);
    }
});

// Close settings menu when clicking outside
document.addEventListener('click', function(event) {
    const settingsMenu = document.getElementById('settings-menu');
    const settingsBtn = document.querySelector('.settings-btn');
    
    if (settingsMenu && settingsBtn && 
        !settingsMenu.contains(event.target) && 
        !settingsBtn.contains(event.target)) {
        settingsMenu.classList.remove('active');
    }
});

// Console Greeting
console.log(`
%c🌟 Rohit Kashyap Portfolio %c
%c
██╗░░░░░░█████╗░██╗░░██╗██╗████████╗  ░██████╗░██╗░░░██╗░█████╗░██████╗░
██║░░░░░██╔══██╗██║░░██║██║╚══██╔══╝  ██╔════╝░██║░░░██║██╔══██╗██╔══██╗
██║░░░░░██║░░██║███████║██║░░░██║░░░  ██║░░██╗░██║░░░██║███████║██████╔╝
██║░░░░░██║░░██║██╔══██║██║░░░██║░░░  ██║░░╚██╗██║░░░██║██╔══██║██╔══██╗
███████╗╚█████╔╝██║░░██║██║░░░██║░░░  ╚██████╔╝╚██████╔╝██║░░██║██║░░██║
╚══════╝░╚════╝░╚═╝░░╚═╝╚═╝░░░╚═╝░░░  ░╚═════╝░░╚═════╝░╚═╝░░╚═╝╚═╝░░╚═╝
%c
🚀 Welcome to my portfolio!
💻 Web Developer & Digital Artist
✨ Built with passion and creativity
📧 hello@rohitkashyap.com
`,
'background: linear-gradient(135deg, #8000ff, #00d4ff); color: white; padding: 10px; font-size: 16px; font-weight: bold; border-radius: 5px;',
'',
'color: #00d4ff; font-size: 12px;',
'color: #ffffff; font-size: 12px;'
);

// Error Handling
window.addEventListener('error', function(e) {
    console.error('Error occurred:', e.error);
    
    // Gracefully handle errors
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
        console.warn('Image failed to load:', e.target.src);
    }
});

// Performance Monitoring
if ('PerformanceObserver' in window) {
    const performanceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.entryType === 'navigation') {
                console.log(`Page loaded in ${Math.round(entry.duration)}ms`);
            }
        }
    });

    performanceObserver.observe({ entryTypes: ['navigation'] });
}