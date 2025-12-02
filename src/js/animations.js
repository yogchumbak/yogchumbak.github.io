/**
 * Enhanced Animations for Yog Chumbak Website
 * Includes: Scroll reveals, parallax effects, and micro-interactions
 */

// Scroll-triggered reveal animations
function initScrollReveal() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        // Optionally unobserve after revealing
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections and cards
  const elementsToReveal = document.querySelectorAll(`
    .section-header,
    .about-content,
    .condition-card,
    .schedule-card,
    .gallery-preview-item,
    .instructor-profile,
    .therapy-content,
    .process-step,
    .info-card
  `);

  elementsToReveal.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}

// Parallax scrolling for hero section
function initParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  // Disable parallax on mobile/touch devices to prevent rotation bouncing
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isSmallScreen = window.innerWidth <= 768;

  if (isMobile || isTouchDevice || isSmallScreen) {
    // Skip parallax on mobile devices
    return;
  }

  const handleScroll = () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;

    // Parallax effect on hero background
    const slides = hero.querySelectorAll('.slide-image');
    slides.forEach(slide => {
      slide.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });

    // Parallax on decorative blobs (pseudo-elements handled via custom property)
    hero.style.setProperty('--scroll-offset', `${scrolled * 0.3}px`);
  };

  // Use requestAnimationFrame for smooth performance
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
}

// Card tilt effect on mouse move
function initCardTilt() {
  const cards = document.querySelectorAll('.condition-card, .schedule-card, .gallery-preview-item');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// Ripple effect on button clicks
function initRippleEffect() {
  const buttons = document.querySelectorAll('.cta-btn, .cta-button, .btn');

  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();

      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// Add breathing effect to certain elements
function initBreathingEffect() {
  // Add breathing class to decorative elements
  const breathingElements = document.querySelectorAll('.condition-icon');
  breathingElements.forEach(el => {
    el.classList.add('breathe-effect');
  });
}

// Smooth scroll for navigation links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Initialize all animations
function init() {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    initScrollReveal();
    initParallax();
    initCardTilt();
    initRippleEffect();
    initBreathingEffect();
  }

  // Always init smooth scroll
  initSmoothScroll();
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
