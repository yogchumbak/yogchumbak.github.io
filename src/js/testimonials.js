/**
 * Testimonials Carousel
 * Auto-rotate every 6 seconds with manual controls
 */

class TestimonialsCarousel {
  constructor() {
    this.testimonials = document.querySelectorAll('.testimonial-card');
    this.dots = document.querySelectorAll('.testimonial-dot');
    this.prevBtn = document.getElementById('testimonialsPrev');
    this.nextBtn = document.getElementById('testimonialsNext');
    this.currentTestimonial = 0;
    this.autoRotateInterval = null;
    this.isPaused = false;

    this.init();
  }

  init() {
    // Only initialize if testimonials exist
    if (this.testimonials.length === 0) return;

    // Add event listeners for navigation buttons
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prevTestimonial());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextTestimonial());
    }

    // Add event listeners for dots
    if (this.dots.length > 0) {
      this.dots.forEach((dot, index) => {
        dot.addEventListener('click', () => this.goToTestimonial(index));
      });
    }

    // Pause on hover (desktop only)
    const carousel = document.querySelector('.testimonials-carousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', () => this.pauseAutoRotate());
      carousel.addEventListener('mouseleave', () => this.resumeAutoRotate());
    }

    // Start auto-rotation
    this.startAutoRotate();
  }

  showTestimonial(index) {
    // Hide all testimonials
    this.testimonials.forEach(testimonial => {
      testimonial.style.display = 'none';
    });

    // Remove active class from all dots
    this.dots.forEach(dot => {
      dot.classList.remove('active');
    });

    // Show current testimonial
    this.testimonials[index].style.display = 'block';
    this.dots[index].classList.add('active');

    this.currentTestimonial = index;
  }

  nextTestimonial() {
    const nextIndex = (this.currentTestimonial + 1) % this.testimonials.length;
    this.showTestimonial(nextIndex);
  }

  prevTestimonial() {
    const prevIndex = (this.currentTestimonial - 1 + this.testimonials.length) % this.testimonials.length;
    this.showTestimonial(prevIndex);
  }

  goToTestimonial(index) {
    this.showTestimonial(index);
  }

  startAutoRotate() {
    this.autoRotateInterval = setInterval(() => {
      if (!this.isPaused) {
        this.nextTestimonial();
      }
    }, 6000); // 6 seconds
  }

  pauseAutoRotate() {
    this.isPaused = true;
  }

  resumeAutoRotate() {
    this.isPaused = false;
  }

  stopAutoRotate() {
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
      this.autoRotateInterval = null;
    }
  }
}

// Initialize testimonials carousel on page load
document.addEventListener('DOMContentLoaded', () => {
  const testimonials = document.querySelectorAll('.testimonial-card');
  if (testimonials.length > 0) {
    new TestimonialsCarousel();
  }
});
