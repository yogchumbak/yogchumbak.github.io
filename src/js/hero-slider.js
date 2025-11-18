/**
 * Hero Slider Component
 * Handles automatic slide rotation, navigation dots, and arrow controls
 */

class HeroSlider {
  constructor() {
    this.currentSlide = 1;
    this.totalSlides = 4;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 5000; // 5 seconds per slide
    this.isTransitioning = false;

    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    this.slides = document.querySelectorAll('.hero-slide');
    this.dots = document.querySelectorAll('.slider-dot');
    this.prevBtn = document.querySelector('.hero-slider-prev');
    this.nextBtn = document.querySelector('.hero-slider-next');

    // Check if slider elements exist
    if (!this.slides.length) {
      console.warn('Hero slider elements not found');
      return;
    }

    // Set up event listeners
    this.setupEventListeners();

    // Start auto-play
    this.startAutoPlay();

    // Pause auto-play on hover (better UX)
    const heroSection = document.querySelector('#hero');
    if (heroSection) {
      heroSection.addEventListener('mouseenter', () => this.pauseAutoPlay());
      heroSection.addEventListener('mouseleave', () => this.startAutoPlay());
    }
  }

  setupEventListeners() {
    // Navigation dots
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.goToSlide(index + 1);
      });
    });

    // Arrow buttons
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.previousSlide());
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextSlide());
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.previousSlide();
      } else if (e.key === 'ArrowRight') {
        this.nextSlide();
      }
    });

    // Touch/swipe support
    this.setupTouchEvents();
  }

  setupTouchEvents() {
    let touchStartX = 0;
    let touchEndX = 0;

    const heroSection = document.querySelector('#hero');
    if (!heroSection) return;

    heroSection.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    heroSection.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe(touchStartX, touchEndX);
    }, { passive: true });
  }

  handleSwipe(startX, endX) {
    const swipeThreshold = 50; // Minimum swipe distance
    const diff = startX - endX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swiped left - go to next slide
        this.nextSlide();
      } else {
        // Swiped right - go to previous slide
        this.previousSlide();
      }
    }
  }

  goToSlide(slideNumber) {
    if (this.isTransitioning || slideNumber === this.currentSlide) {
      return;
    }

    this.isTransitioning = true;

    // Remove active class from all slides and dots
    this.slides.forEach(slide => slide.classList.remove('active'));
    this.dots.forEach(dot => dot.classList.remove('active'));

    // Add active class to target slide and dot
    const targetSlide = document.querySelector(`.hero-slide[data-slide="${slideNumber}"]`);
    const targetDot = document.querySelector(`.slider-dot[data-slide="${slideNumber}"]`);

    if (targetSlide) {
      targetSlide.classList.add('active');
    }

    if (targetDot) {
      targetDot.classList.add('active');
    }

    this.currentSlide = slideNumber;

    // Reset transition lock after animation completes
    setTimeout(() => {
      this.isTransitioning = false;
    }, 800); // Match CSS transition duration

    // Reset auto-play timer
    this.resetAutoPlay();
  }

  nextSlide() {
    const nextSlideNumber = this.currentSlide >= this.totalSlides ? 1 : this.currentSlide + 1;
    this.goToSlide(nextSlideNumber);
  }

  previousSlide() {
    const prevSlideNumber = this.currentSlide <= 1 ? this.totalSlides : this.currentSlide - 1;
    this.goToSlide(prevSlideNumber);
  }

  startAutoPlay() {
    this.pauseAutoPlay(); // Clear any existing interval
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayDelay);
  }

  pauseAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  resetAutoPlay() {
    this.startAutoPlay();
  }
}

// Initialize slider when script loads
new HeroSlider();
