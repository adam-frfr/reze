// Demon Slayer Website - Enhanced JavaScript
// Created for Reze's Demon Slayer Fan Server

// ========== DOM ELEMENTS ==========
const elements = {
    navbar: document.querySelector('.navbar'),
    tanjiro: document.getElementById('tanjiro'),
    menuToggle: document.querySelector('.menu-toggle'),
    navMenu: document.querySelector('.nav-menu'),
    joinBtn: document.querySelector('.btn-join'),
    scrollIndicator: document.querySelector('.scroll-indicator'),
    characterCards: document.querySelectorAll('.character-card'),
    traits: document.querySelectorAll('.trait'),
    features: document.querySelectorAll('.feature'),
    stats: document.querySelectorAll('.stat')
};

// ========== STATE VARIABLES ==========
let state = {
    lastScrollTop: 0,
    isTanjiroJumping: false,
    isMenuOpen: false,
    scrollDirection: 'down',
    particles: []
};

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔥 Demon Slayer Website Initialized for Reze!');
    
    // Initialize all features
    initializeEventListeners();
    initializeAnimations();
    createFloatingParticles();
    
    // Welcome animation after page loads
    setTimeout(() => {
        performWelcomeAnimations();
    }, 800);
});

// ========== EVENT LISTENERS ==========
function initializeEventListeners() {
    // Scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Mobile menu toggle
    elements.menuToggle?.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Join server button
    elements.joinBtn?.addEventListener('click', handleJoinServer);
    
    // Character card interactions
    elements.characterCards.forEach(card => {
        card.addEventListener('mouseenter', () => enhanceCharacterCard(card));
        card.addEventListener('mouseleave', () => resetCharacterCard(card));
    });
    
    // Trait hover effects
    elements.traits.forEach(trait => {
        trait.addEventListener('mouseenter', () => pulseTrait(trait));
    });
    
    // Scroll indicator click
    elements.scrollIndicator?.addEventListener('click', () => {
        smoothScrollTo(document.querySelector('#about'), 800);
    });
    
    // Window resize
    window.addEventListener('resize', handleResize);
}

// ========== SCROLL HANDLING ==========
function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    state.scrollDirection = scrollTop > state.lastScrollTop ? 'down' : 'up';
    
    updateNavbar(scrollTop);
    triggerTanjiroJump(scrollTop);
    applyParallaxEffects(scrollTop);
    revealElementsOnScroll();
    
    // Update scroll indicator
    if (scrollTop > 100) {
        elements.scrollIndicator?.style.opacity = '0';
    } else {
        elements.scrollIndicator?.style.opacity = '1';
    }
    
    state.lastScrollTop = scrollTop;
}

function updateNavbar(scrollTop) {
    if (scrollTop > 50) {
        elements.navbar.classList.add('scrolled');
    } else {
        elements.navbar.classList.remove('scrolled');
    }
}

function triggerTanjiroJump(scrollTop) {
    // Trigger jump when scrolling down past threshold
    if (state.scrollDirection === 'down' && 
        !state.isTanjiroJumping && 
        scrollTop > 300 &&
        scrollTop % 150 > 140) { // Jump every ~150px scroll
        
        performTanjiroJump();
    }
}

function applyParallaxEffects(scrollTop) {
    if (!elements.tanjiro) return;
    
    // Calculate parallax effect
    const scrollPercent = scrollTop / (document.body.scrollHeight - window.innerHeight);
    const translateY = scrollPercent * 100;
    const scale = 1 - scrollPercent * 0.3;
    
    // Apply to Tanjiro
    elements.tanjiro.style.transform = `translateY(${-translateY}px) scale(${scale})`;
    
    // Apply parallax to other elements
    document.querySelectorAll('.parallax-layer').forEach((layer, index) => {
        const speed = 0.1 * (index + 1);
        layer.style.transform = `translateY(${scrollTop * speed}px)`;
    });
}

// ========== ANIMATIONS ==========
function performTanjiroJump() {
    if (state.isTanjiroJumping || !elements.tanjiro) return;
    
    state.isTanjiroJumping = true;
    
    // Jump up
    anime({
        targets: elements.tanjiro,
        translateY: [
            { value: 0, duration: 0 },
            { value: -120, duration: 300, easing: 'easeOutQuad' },
            { value: 0, duration: 500, easing: 'easeInOutQuad' }
        ],
        scale: [
            { value: 1, duration: 0 },
            { value: 1.15, duration: 200, easing: 'easeOutQuad' },
            { value: 1, duration: 400, easing: 'easeInOutQuad' }
        ],
        rotate: [
            { value: 0, duration: 0 },
            { value: -5, duration: 150 },
            { value: 5, duration: 150 },
            { value: 0, duration: 150 }
        ],
        complete: () => {
            state.isTanjiroJumping = false;
        }
    });
    
    // Add jump effect to shadow
    const shadow = document.querySelector('.tanjiro-shadow');
    if (shadow) {
        anime({
            targets: shadow,
            scale: [1, 0.7, 1],
            opacity: [0.5, 0.8, 0.5],
            duration: 800,
            easing: 'easeInOutQuad'
        });
    }
}

function performWelcomeAnimations() {
    // Welcome message in console
    console.log('%c🔥 斬れ! Welcome to Reze\'s Demon Slayer Sanctuary! 🔥', 
        'color: #c53030; font-size: 16px; font-weight: bold; text-shadow: 0 0 10px rgba(197, 48, 48, 0.5);');
    
    // Initial Tanjiro jump
    performTanjiroJump();
    
    // Animate hero title
    anime({
        targets: '.hero-title',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutCubic'
    });
    
    // Stagger animate subtitle and buttons
    anime({
        targets: ['.hero-subtitle', '.cta-buttons'],
        translateY: [20, 0],
        opacity: [0, 1],
        delay: anime.stagger(300),
        duration: 800,
        easing: 'easeOutCubic'
    });
}

function enhanceCharacterCard(card) {
    anime({
        targets: card,
        translateY: -15,
        scale: 1.02,
        boxShadow: '0 20px 40px rgba(197, 48, 48, 0.3)',
        borderColor: '#c53030',
        duration: 300,
        easing: 'easeOutQuad'
    });
    
    // Animate character image inside
    const img = card.querySelector('img');
    if (img) {
        anime({
            targets: img,
            scale: 1.1,
            duration: 400,
            easing: 'easeOutQuad'
        });
    }
}

function resetCharacterCard(card) {
    anime({
        targets: card,
        translateY: 0,
        scale: 1,
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
        borderColor: 'transparent',
        duration: 300,
        easing: 'easeOutQuad'
    });
    
    // Reset character image
    const img = card.querySelector('img');
    if (img) {
        anime({
            targets: img,
            scale: 1,
            duration: 400,
            easing: 'easeOutQuad'
        });
    }
}

function pulseTrait(trait) {
    anime({
        targets: trait,
        scale: [1, 1.1, 1],
        backgroundColor: [
            'rgba(197, 48, 48, 0.2)',
            'rgba(197, 48, 48, 0.4)',
            'rgba(197, 48, 48, 0.2)'
        ],
        duration: 600,
        easing: 'easeInOutQuad'
    });
}

// ========== MOBILE MENU ==========
function toggleMobileMenu() {
    state.isMenuOpen = !state.isMenuOpen;
    elements.navMenu.classList.toggle('active');
    
    const icon = elements.menuToggle.querySelector('i');
    if (state.isMenuOpen) {
        icon.classList.replace('fa-bars', 'fa-times');
        anime({
            targets: elements.navMenu,
            translateX: ['-100%', '0%'],
            opacity: [0, 1],
            duration: 400,
            easing: 'easeOutCubic'
        });
    } else {
        icon.classList.replace('fa-times', 'fa-bars');
        anime({
            targets: elements.navMenu,
            translateX: ['0%', '-100%'],
            opacity: [1, 0],
            duration: 300,
            easing: 'easeInCubic'
        });
    }
}

function closeMobileMenu() {
    if (state.isMenuOpen) {
        toggleMobileMenu();
    }
}

// ========== SCROLL REVEAL ==========
function revealElementsOnScroll() {
    const reveals = document.querySelectorAll('.reveal-on-scroll');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Add CSS classes for scroll reveal
function initializeAnimations() {
    // Add reveal class to elements
    const revealElements = [
        ...elements.characterCards,
        ...elements.features,
        ...elements.stats,
        document.querySelector('.about-image'),
        document.querySelector('.join-card')
    ];
    
    revealElements.forEach((el, index) => {
        if (el) {
            el.classList.add('reveal-on-scroll');
            el.style.animationDelay = `${index * 0.1}s`;
        }
    });
    
    // Add CSS for animations
    const animationStyles = `
        .reveal-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), 
                        transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .reveal-on-scroll.active {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Breathing animation for fire elements */
        @keyframes fireBreath {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
        }
        
        .logo i {
            animation: fireBreath 2s ease-in-out infinite;
        }
        
        /* Water ripple effect */
        @keyframes waterRipple {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(1.5); opacity: 0; }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = animationStyles;
    document.head.appendChild(styleSheet);
}

// ========== PARTICLE EFFECTS ==========
function createFloatingParticles() {
    const particleContainer = document.querySelector('.hero') || document.body;
    
    // Create particle container if it doesn't exist
    let particlesDiv = document.querySelector('.floating-particles');
    if (!particlesDiv) {
        particlesDiv = document.createElement('div');
        particlesDiv.className = 'floating-particles';
        particlesDiv.style.position = 'absolute';
        particlesDiv.style.top = '0';
        particlesDiv.style.left = '0';
        particlesDiv.style.width = '100%';
        particlesDiv.style.height = '100%';
        particlesDiv.style.pointerEvents = 'none';
        particlesDiv.style.zIndex = '1';
        particleContainer.appendChild(particlesDiv);
    }
    
    // Create 15 particles
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        // Random properties
        const size = Math.random() * 10 + 5;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 20;
        const delay = Math.random() * 5;
        const color = i % 3 === 0 ? '#c53030' : i % 3 === 1 ? '#f6ad55' : '#2d3748';
        
        // Apply styles
        Object.assign(particle.style, {
            width: `${size}px`,
            height: `${size}px`,
            background: color,
            borderRadius: '50%',
            position: 'absolute',
            left: `${posX}%`,
            top: `${posY}%`,
            opacity: Math.random() * 0.3 + 0.1,
            filter: 'blur(1px)',
            animation: `floatParticle ${duration}s linear infinite ${delay}s`
        });
        
        particlesDiv.appendChild(particle);
        state.particles.push(particle);
    }
    
    // Add particle animation CSS
    const particleAnimation = `
        @keyframes floatParticle {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0.1;
            }
            10% {
                opacity: 0.3;
            }
            90% {
                opacity: 0.3;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    
    const particleStyle = document.createElement('style');
    particleStyle.textContent = particleAnimation;
    document.head.appendChild(particleStyle);
}

// ========== JOIN SERVER HANDLER ==========
function handleJoinServer(e) {
    e.preventDefault();
    
    // Button animation
    anime({
        targets: elements.joinBtn,
        scale: [1, 0.95, 1],
        backgroundColor: [
            '#c53030',
            '#9b2c2c',
            '#c53030'
        ],
        duration: 300,
        easing: 'easeInOutQuad'
    });
    
    // Create confetti effect
    createConfetti();
    
    // Show custom modal instead of alert
    setTimeout(() => {
        showJoinModal();
    }, 500);
}

function showJoinModal() {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'join-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-fire"></i> Join Reze's Sanctuary</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <p>Thank you for your interest in joining Reze's Demon Slayer server!</p>
                <p>In a real implementation, this would redirect to the Discord server.</p>
                <p><strong>Server Owner:</strong> Reze</p>
                <p><strong>Theme:</strong> Demon Slayer (Kimetsu no Yaiba)</p>
                <div class="modal-actions">
                    <button class="btn btn-primary" id="simulateJoin">
                        <i class="fab fa-discord"></i> Simulate Join
                    </button>
                    <button class="btn btn-secondary close-modal">Close</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    const modalStyles = `
        .join-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .modal-content {
            background: linear-gradient(145deg, #1a202c, #2d3748);
            border-radius: 20px;
            padding: 30px;
            max-width: 500px;
            width: 90%;
            border: 2px solid #c53030;
            box-shadow: 0 20px 60px rgba(197, 48, 48, 0.3);
            animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 2px solid #c53030;
        }
        
        .modal-header h3 {
            color: #f6ad55;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .close-modal {
            background: none;
            border: none;
            color: white;
            font-size: 28px;
            cursor: pointer;
            transition: color 0.3s;
        }
        
        .close-modal:hover {
            color: #c53030;
        }
        
        .modal-body p {
            margin-bottom: 15px;
            color: #cbd5e0;
        }
        
        .modal-actions {
            display: flex;
            gap: 15px;
            margin-top: 25px;
        }
    `;
    
    const styleEl = document.createElement('style');
    styleEl.textContent = modalStyles;
    document.head.appendChild(styleEl);
    
    // Event listeners for modal
    modal.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            anime({
                targets: modal,
                opacity: 0,
                duration: 300,
                easing: 'easeOutCubic',
                complete: () => modal.remove()
            });
        });
    });
    
    // Simulate join button
    modal.querySelector('#simulateJoin')?.addEventListener('click', () => {
        anime({
            targets: '#simulateJoin',
            scale: [1, 0.9, 1],
            backgroundColor: ['#c53030', '#38a169', '#c53030'],
            duration: 400,
            easing: 'easeInOutQuad'
        });
        
        // Show success message
        const modalBody = modal.querySelector('.modal-body');
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.innerHTML = `
            <p style="color: #38a169; font-weight: bold; margin-top: 15px;">
                <i class="fas fa-check-circle"></i> Successfully joined Reze's server!
            </p>
        `;
        modalBody.appendChild(successMsg);
        
        setTimeout(() => modal.remove(), 2000);
    });
    
    // Close on escape key
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
}

function createConfetti() {
    const colors = ['#c53030', '#f6ad55', '#2d3748', '#ffffff'];
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '1001';
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = '-20px';
        
        confettiContainer.appendChild(confetti);
        
        // Animate confetti
        anime({
            targets: confetti,
            translateY: window.innerHeight + 100,
            translateX: anime.random(-100, 100),
            rotate: anime.random(0, 360),
            duration: anime.random(1000, 3000),
            easing: 'easeInOutQuad',
            complete: () => confetti.remove()
        });
    }
    
    document.body.appendChild(confettiContainer);
    setTimeout(() => confettiContainer.remove(), 3000);
}

// ========== UTILITY FUNCTIONS ==========
function smoothScrollTo(element, duration) {
    if (!element) return;
    
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

function handleResize() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768 && state.isMenuOpen) {
        closeMobileMenu();
    }
}

// ========== KEYBOARD SHORTCUTS ==========
document.addEventListener('keydown', (e) => {
    // T for Tanjiro jump
    if (e.key === 't' || e.key === 'T') {
        performTanjiroJump();
    }
    
    // M for menu toggle
    if (e.key === 'm' || e.key === 'M') {
        toggleMobileMenu();
    }
    
    // Escape to close modals/menus
    if (e.key === 'Escape') {
        closeMobileMenu();
        const modal = document.querySelector('.join-modal');
        if (modal) modal.remove();
    }
});

// ========== PERFORMANCE OPTIMIZATION ==========
// Throttle scroll events for better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            handleScroll();
            scrollTimeout = null;
        }, 16); // ~60fps
    }
});

// ========== ADDITIONAL FEATURES ==========
// Add subtle background music control (optional)
function addBackgroundMusic() {
    // This would require audio files
    console.log('Background music feature ready to implement');
}

// Add theme switcher (day/night mode)
function addThemeSwitcher() {
    // Could add a toggle for different Demon Slayer themes
    console.log('Theme switcher ready to implement');
}

// Initialize when page loads
window.addEventListener('load', () => {
    console.log('Website fully loaded!');
    
    // Add loading animation removal
    const loader = document.querySelector('.loader');
    if (loader) {
        anime({
            targets: loader,
            opacity: 0,
            duration: 500,
            complete: () => loader.remove()
        });
    }
});