/**
 * FAQ Accordion Functionality
 * - Click to expand/collapse answers
 * - One question open at a time (auto-close others)
 * - Smooth animations with ARIA support
 */

class FAQAccordion {
  constructor() {
    this.accordionItems = document.querySelectorAll('.faq-item');
    this.init();
  }

  init() {
    if (this.accordionItems.length === 0) return;

    this.accordionItems.forEach((item) => {
      const question = item.querySelector('.faq-question');

      if (question) {
        question.addEventListener('click', (e) => this.handleClick(e, item));

        // Keyboard accessibility
        question.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.handleClick(e, item);
          }
        });
      }
    });
  }

  handleClick(event, clickedItem) {
    const clickedQuestion = clickedItem.querySelector('.faq-question');
    const isExpanded = clickedQuestion.getAttribute('aria-expanded') === 'true';

    // Close all other items
    this.accordionItems.forEach((item) => {
      if (item !== clickedItem) {
        const question = item.querySelector('.faq-question');
        question.setAttribute('aria-expanded', 'false');
      }
    });

    // Toggle clicked item
    if (isExpanded) {
      clickedQuestion.setAttribute('aria-expanded', 'false');
    } else {
      clickedQuestion.setAttribute('aria-expanded', 'true');
    }
  }

  // Optional: Open first item by default
  openFirst() {
    if (this.accordionItems.length > 0) {
      const firstQuestion = this.accordionItems[0].querySelector('.faq-question');
      if (firstQuestion) {
        firstQuestion.setAttribute('aria-expanded', 'true');
      }
    }
  }
}

// Initialize accordion when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const faqAccordion = new FAQAccordion();

  // Optionally open first item on load (commented out - user can click)
  // faqAccordion.openFirst();
});
