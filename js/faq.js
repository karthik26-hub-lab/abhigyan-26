/* =========================================================================
   FAQ ACCORDION CONTROLLER
   Handles accordion item toggles, keyboard accessibility, and state
   ========================================================================= */

export function initFAQ() {
  const accordion = document.getElementById('faqAccordion');
  if (!accordion) return;

  const items = accordion.querySelectorAll('.faq-item');

  items.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all other items for a clean single-open reading experience
      items.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('open');
          const otherBtn = otherItem.querySelector('.faq-question-btn');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
