// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Header scroll effect for permanent gradient navbar
const header = document.querySelector('.header');
const heroSection = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const heroHeight = heroSection.offsetHeight;
    const scrollPosition = window.scrollY;
    
    // Apply gradient background immediately when scrolling starts and keep it permanent
    if (scrollPosition > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ==========================================
// REVOLUTIONARY HERO SECTION FEATURES
// ==========================================

// Particle System
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.container = document.getElementById('heroParticles');
        this.maxParticles = 50;
        this.init();
    }

    init() {
        if (!this.container) return;
        
        // Create particles
        for (let i = 0; i < this.maxParticles; i++) {
            this.createParticle();
        }
        
        // Start animation loop
        this.animate();
        
        // Mouse interaction
        this.setupMouseInteraction();
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 4 + 2;
        const x = Math.random() * window.innerWidth;
        const y = window.innerHeight + 50;
        const speed = Math.random() * 2 + 1;
        const opacity = Math.random() * 0.8 + 0.2;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, ${opacity});
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: particleFloat ${8 + Math.random() * 4}s linear infinite;
        `;
        
        particle.speed = speed;
        particle.x = x;
        particle.y = y;
        
        this.container.appendChild(particle);
        this.particles.push(particle);
    }

    animate() {
        this.particles.forEach((particle, index) => {
            particle.y -= particle.speed;
            particle.style.top = particle.y + 'px';
            
            // Remove particles that are off screen
            if (particle.y < -50) {
                particle.remove();
                this.particles.splice(index, 1);
                this.createParticle(); // Create new particle
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }

    setupMouseInteraction() {
        let mouseX = 0, mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Create trail particles on mouse move
            if (Math.random() < 0.1) {
                this.createTrailParticle(mouseX, mouseY);
            }
        });
    }

    createTrailParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 3px;
            height: 3px;
            background: rgba(239, 90, 42, 0.8);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: 1000;
            animation: trailFade 1s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }
}

// Animated Counter System
class AnimatedCounter {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number[data-target]');
        this.initiated = false;
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.initiated) {
                    this.initiated = true;
                    this.startCounters();
                }
            });
        }, { threshold: 0.5 });

        if (this.counters.length > 0) {
            observer.observe(this.counters[0]);
        }
    }

    startCounters() {
        this.counters.forEach((counter, index) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000 + (index * 300); // Stagger animation
            
            setTimeout(() => {
                this.animateCounter(counter, target, duration);
            }, index * 200);
        });
    }

    animateCounter(element, target, duration) {
        const start = 0;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOutCubic * target);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = target;
                // Add completion effect
                element.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 200);
            }
        };

        requestAnimationFrame(animate);
    }
}

// 3D Orbital System Enhancement
class OrbitalEnhancer {
    constructor() {
        this.orbitElements = document.querySelectorAll('.orbit-asset');
        this.init();
    }

    init() {
        this.orbitElements.forEach((element, index) => {
            // Add hover effects
            element.addEventListener('mouseenter', () => {
                element.style.transform += ' scale(1.3) rotate(10deg)';
                element.style.filter = 'drop-shadow(0 10px 30px rgba(239, 90, 42, 0.6)) brightness(1.2)';
                
                // Create ripple effect
                this.createRipple(element);
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = element.style.transform.replace(' scale(1.3) rotate(10deg)', '');
                element.style.filter = 'drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3))';
            });

            // Add random floating motion
            this.addFloatingMotion(element, index);
        });
    }

    createRipple(element) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        
        ripple.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: rgba(239, 90, 42, 0.3);
            border-radius: 50%;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            transform: translate(-50%, -50%);
            animation: rippleExpand 0.8s ease-out forwards;
            pointer-events: none;
            z-index: 1000;
        `;
        
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 800);
    }

    addFloatingMotion(element, index) {
        const amplitude = 5 + (index * 2);
        const frequency = 0.02 + (index * 0.005);
        let time = 0;

        const float = () => {
            time += frequency;
            const y = Math.sin(time) * amplitude;
            const x = Math.cos(time * 0.5) * (amplitude * 0.5);
            
            element.style.transform += ` translate(${x}px, ${y}px)`;
            
            requestAnimationFrame(float);
        };

        // Start floating with delay
        setTimeout(float, index * 500);
    }
}

// Morphing Background Controller
class MorphingBackground {
    constructor() {
        this.blobs = document.querySelectorAll('.morph-blob');
        this.init();
    }

    init() {
        this.blobs.forEach((blob, index) => {
            // Add interactive morphing on mouse proximity
            document.addEventListener('mousemove', (e) => {
                const rect = blob.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const distance = Math.sqrt(
                    Math.pow(e.clientX - centerX, 2) + 
                    Math.pow(e.clientY - centerY, 2)
                );
                
                if (distance < 200) {
                    const intensity = (200 - distance) / 200;
                    blob.style.transform += ` scale(${1 + intensity * 0.2})`;
                    blob.style.filter = `blur(${40 - intensity * 10}px)`;
                }
            });
        });
    }
}

// Text Reveal Animation
class TextRevealAnimator {
    constructor() {
        this.titleLines = document.querySelectorAll('.title-line');
        this.init();
    }

    init() {
        this.titleLines.forEach((line, index) => {
            // Create character animation
            const text = line.textContent;
            line.innerHTML = '';
            
            [...text].forEach((char, charIndex) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.cssText = `
                    display: inline-block;
                    opacity: 0;
                    transform: translateY(50px) rotateX(90deg);
                    animation: charReveal 0.8s ease-out ${(index * 0.2) + (charIndex * 0.05)}s forwards;
                `;
                line.appendChild(span);
            });
        });
    }
}

// Enhanced Button Interactions
class ButtonEnhancer {
    constructor() {
        this.buttons = document.querySelectorAll('.btn-innovative');
        this.init();
    }

    init() {
        this.buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                this.createEnergyWave(button);
            });

            button.addEventListener('click', (e) => {
                this.createClickExplosion(e, button);
            });
        });
    }

    createEnergyWave(button) {
        const wave = document.createElement('div');
        wave.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: energyWave 1s ease-out forwards;
            pointer-events: none;
        `;
        
        button.appendChild(wave);
        setTimeout(() => wave.remove(), 1000);
    }

    createClickExplosion(e, button) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        for (let i = 0; i < 6; i++) {
            const spark = document.createElement('div');
            spark.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #fff;
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                transform: translate(-50%, -50%);
                animation: sparkFly 0.6s ease-out forwards;
                animation-delay: ${i * 0.05}s;
                pointer-events: none;
            `;
            
            button.appendChild(spark);
            setTimeout(() => spark.remove(), 600);
        }
    }
}

// Initialize all revolutionary features
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if hero elements exist
    if (document.querySelector('.hero-diagonal-split')) {
        new ParticleSystem();
        new AnimatedCounter();
        new OrbitalEnhancer();
        new MorphingBackground();
        new TextRevealAnimator();
        new ButtonEnhancer();
        
        // Add additional CSS animations
        addRevolutionaryCSS();
    }
});

// Add CSS animations dynamically
function addRevolutionaryCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes trailFade {
            0% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(0); }
        }
        
        @keyframes rippleExpand {
            0% { width: 10px; height: 10px; opacity: 1; }
            100% { width: 100px; height: 100px; opacity: 0; }
        }
        
        @keyframes charReveal {
            0% { 
                opacity: 0; 
                transform: translateY(50px) rotateX(90deg);
            }
            100% { 
                opacity: 1; 
                transform: translateY(0) rotateX(0deg);
            }
        }
        
        @keyframes energyWave {
            0% { width: 0; height: 0; opacity: 1; }
            100% { width: 200px; height: 200px; opacity: 0; }
        }
        
        @keyframes sparkFly {
            0% { 
                opacity: 1; 
                transform: translate(-50%, -50%) scale(1);
            }
            100% { 
                opacity: 0; 
                transform: translate(-50%, -50%) scale(0) translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
            }
        }
    `;
    
    document.head.appendChild(style);
}

// ==========================================
// END REVOLUTIONARY HERO FEATURES
// ==========================================

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed header
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Add smooth scrolling to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 25px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fadeInUp');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.about-card, .info-card, .vision-card, .feature-item');
    animateElements.forEach(el => observer.observe(el));
});

// Benefit card interactions
document.addEventListener('DOMContentLoaded', function() {
    const benefitCards = document.querySelectorAll('.benefit-card');
    
    benefitCards.forEach((card, index) => {
        // Staggered animation on load
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 * index);
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.benefit-icon');
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            
            const highlight = this.querySelector('.benefit-highlight');
            highlight.style.transform = 'scale(1.1)';
            highlight.style.boxShadow = '0 8px 20px rgba(239, 90, 42, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.benefit-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
            
            const highlight = this.querySelector('.benefit-highlight');
            highlight.style.transform = 'scale(1)';
            highlight.style.boxShadow = '0 4px 12px rgba(239, 90, 42, 0.3)';
        });
        
        // Click animation for the entire card
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(-15px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-15px) scale(1.02)';
            }, 150);
            
            // Add a subtle notification
            const cardTitle = this.querySelector('h4').textContent;
            showNotification(`${cardTitle} - Coming soon in Friday Schooling!`, 'info');
        });
    });
    
    // Add parallax effect to benefit icons
    window.addEventListener('scroll', function() {
        const benefitIcons = document.querySelectorAll('.benefit-icon');
        const scrolled = window.pageYOffset;
        
        benefitIcons.forEach(icon => {
            const rate = scrolled * -0.2;
            icon.style.transform = `translateY(${rate}px)`;
        });
    });
});

// Notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✅' : '⚠️'}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 1rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        min-width: 300px;
        max-width: 400px;
    `;
    
    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Add keyframe animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Confetti effect function
function createConfetti() {
    const colors = ['#EF5A2A', '#5F5AC1', '#EC8037', '#FEEFE3'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -10px;
            z-index: 10000;
            pointer-events: none;
            animation: confettiFall 3s linear forwards;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            if (confetti.parentElement) {
                confetti.remove();
            }
        }, 3000);
    }
}

// Add confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Fun cursor trail effect (optional)
let mouseTrail = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) { // Only on desktop
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: linear-gradient(45deg, #EF5A2A, #EC8037);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${e.clientX - 4}px;
            top: ${e.clientY - 4}px;
            animation: trailFade 0.5s ease-out forwards;
        `;
        
        document.body.appendChild(trail);
        mouseTrail.push(trail);
        
        if (mouseTrail.length > trailLength) {
            const oldTrail = mouseTrail.shift();
            if (oldTrail.parentElement) {
                oldTrail.remove();
            }
        }
        
        setTimeout(() => {
            if (trail.parentElement) {
                trail.remove();
            }
        }, 500);
    }
});

// Add trail animation
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes trailFade {
        from {
            opacity: 0.8;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.3);
        }
    }
`;
document.head.appendChild(trailStyle);

// Random floating animations for abstract arts
function addRandomFloatingAnimation() {
    const floatingAssets = document.querySelectorAll('.floating-asset');
    
    floatingAssets.forEach((asset, index) => {
        // Add random rotation
        const randomRotation = Math.random() * 360;
        asset.style.transform += ` rotate(${randomRotation}deg)`;
        
        // Add click interaction
        asset.addEventListener('click', () => {
            asset.style.animation = 'none';
            asset.style.transform += ' scale(1.2) rotate(180deg)';
            
            setTimeout(() => {
                asset.style.animation = `float 6s ease-in-out infinite`;
                asset.style.animationDelay = `${index}s`;
                asset.style.transform = asset.style.transform.replace(' scale(1.2) rotate(180deg)', '');
            }, 300);
        });
    });
}

// Add bounce effect to feature icons
document.addEventListener('DOMContentLoaded', () => {
    const featureIcons = document.querySelectorAll('.feature-icon');
    
    featureIcons.forEach((icon, index) => {
        icon.addEventListener('mouseenter', () => {
            icon.style.animation = 'none';
            icon.style.transform = 'scale(1.3) rotate(10deg)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.animation = 'bounce 2s infinite';
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});

// Initialize random floating animations
document.addEventListener('DOMContentLoaded', addRandomFloatingAnimation);

// Add easter egg - Konami code
let konamiCode = [];
const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konami.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konami.join(',')) {
        // Easter egg activated!
        showNotification('🎉 Easter Egg Activated! You found the secret code!', 'success');
        createConfetti();
        
        // Change all floating assets to spin rapidly
        const floatingAssets = document.querySelectorAll('.floating-asset');
        floatingAssets.forEach(asset => {
            asset.style.animation = 'spin 0.5s linear infinite';
        });
        
        // Add spin animation
        const spinStyle = document.createElement('style');
        spinStyle.textContent = `
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(spinStyle);
        
        setTimeout(() => {
            floatingAssets.forEach((asset, index) => {
                asset.style.animation = `float 6s ease-in-out infinite`;
                asset.style.animationDelay = `${index}s`;
            });
        }, 3000);
        
        konamiCode = [];
    }
});

console.log('%c🎉 Welcome to Zontrmontro! 🎉', 'color: #EF5A2A; font-size: 20px; font-weight: bold;');
console.log('%cBuilding tomorrow\'s innovators today! 🚀', 'color: #5F5AC1; font-size: 14px;');
console.log('%cTry the Konami code for a surprise! 😉', 'color: #EC8037; font-size: 12px;');

// Enrollment form handling
const enrollmentForm = document.getElementById('enrollmentForm');
if (enrollmentForm) {
    enrollmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            childFirstName: document.getElementById('childFirstName').value,
            childLastName: document.getElementById('childLastName').value,
            childAge: document.getElementById('childAge').value,
            childSchool: document.getElementById('childSchool').value,
            parentName: document.getElementById('parentName').value,
            relationship: document.getElementById('relationship').value,
            parentEmail: document.getElementById('parentEmail').value,
            parentPhone: document.getElementById('parentPhone').value,
            address: document.getElementById('address').value,
            interests: document.getElementById('interests').value,
            newsletter: document.getElementById('newsletter').checked,
            terms: document.getElementById('terms').checked
        };
        
        // Validation
        const requiredFields = ['childFirstName', 'childLastName', 'childAge', 'parentName', 'relationship', 'parentEmail', 'parentPhone', 'address'];
        let isValid = true;
        
        for (let field of requiredFields) {
            if (!formData[field]) {
                showNotification(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field!`, 'error');
                isValid = false;
                break;
            }
        }
        
        if (!formData.terms) {
            showNotification('Please accept the Terms & Conditions to continue!', 'error');
            isValid = false;
        }
        
        if (isValid && !isValidEmail(formData.parentEmail)) {
            showNotification('Please enter a valid email address!', 'error');
            isValid = false;
        }
        
        if (isValid) {
            // Show loading state
            const btnText = document.querySelector('.btn-text');
            const btnLoading = document.querySelector('.btn-loading');
            const submitBtn = document.querySelector('.btn-enroll');
            
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                showNotification(`🎉 Thank you! ${formData.childFirstName}'s enrollment has been submitted successfully. Our team will contact you within 24 hours!`, 'success');
                
                // Reset form
                enrollmentForm.reset();
                
                // Reset button state
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
                
                // Add celebration effect
                createConfetti();
            }, 2000);
        }
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
} 