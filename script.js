// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animate elements on scroll
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

// Observe timeline items, skill categories, and achievement cards
const animatedElements = document.querySelectorAll(
    '.timeline-item, .skill-category, .achievement-card, .cert-item, .contact-card'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

// Observe stats and trigger counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const numberMatch = text.match(/\d+/);
                
                if (numberMatch) {
                    const number = parseInt(numberMatch[0]);
                    const prefix = text.split(number)[0];
                    const suffix = text.split(number)[1];
                    
                    stat.textContent = prefix + '0' + suffix;
                    
                    setTimeout(() => {
                        let start = 0;
                        const duration = 2000;
                        const increment = number / (duration / 16);
                        
                        const updateCounter = () => {
                            start += increment;
                            if (start < number) {
                                stat.textContent = prefix + Math.floor(start) + suffix;
                                requestAnimationFrame(updateCounter);
                            } else {
                                stat.textContent = text;
                            }
                        };
                        
                        updateCounter();
                    }, 200);
                }
            });
            
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');

const highlightNavigation = () => {
    const scrollPosition = window.pageYOffset + navbar.offsetHeight + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

        if (navLink && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.style.color = '';
            });
            navLink.style.color = 'var(--primary-color)';
        }
    });
};

window.addEventListener('scroll', highlightNavigation);

// Add hover effect to skill tags
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Timeline marker pulse effect
const timelineMarkers = document.querySelectorAll('.timeline-marker');
const pulseObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'pulse 2s infinite';
        }
    });
}, { threshold: 0.5 });

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.2);
        }
        50% {
            box-shadow: 0 0 0 8px rgba(37, 99, 235, 0.4);
        }
    }
`;
document.head.appendChild(style);

timelineMarkers.forEach(marker => {
    pulseObserver.observe(marker);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// Add copy email functionality
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const email = link.textContent;
        
        // Try to copy to clipboard
        if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(() => {
                // Show copied notification
                const notification = document.createElement('div');
                notification.textContent = 'Email copied to clipboard!';
                notification.style.cssText = `
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background-color: var(--secondary-color);
                    color: white;
                    padding: 1rem 1.5rem;
                    border-radius: 8px;
                    box-shadow: var(--shadow-lg);
                    z-index: 9999;
                    animation: slideIn 0.3s ease-out;
                `;
                
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.style.animation = 'slideOut 0.3s ease-out';
                    setTimeout(() => {
                        document.body.removeChild(notification);
                    }, 300);
                }, 2000);
            });
        }
    });
});

// Add slide animations
const slideStyle = document.createElement('style');
slideStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(slideStyle);

// Console message for recruiters
console.log('%c👋 Hello, Recruiter!', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%cThanks for checking out my resume site!', 'font-size: 14px; color: #6b7280;');
console.log('%cFeel free to reach out at osoopeter1000@gmail.com', 'font-size: 14px; color: #10b981;');
console.log('%c🚀 Built with vanilla JavaScript, no frameworks needed!', 'font-size: 12px; font-style: italic; color: #9ca3af;');