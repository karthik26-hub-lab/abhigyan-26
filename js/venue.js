/* =========================================================================
   VENUE SECTION CONTROLLER
   Handles Shiny Pill drawer expansion and address copy interactions
   ========================================================================= */

export function initVenue() {
  const pillBtn = document.getElementById('venuePillBtn');
  const drawer = document.getElementById('venueDetailsDrawer');
  const pillLabel = document.getElementById('venuePillLabel');
  const copyBtn = document.getElementById('btnCopyVenueAddress');
  const copyFeedback = document.getElementById('venueCopyFeedback');

  if (pillBtn && drawer) {
    pillBtn.addEventListener('click', () => {
      const isExpanded = drawer.classList.contains('is-expanded');

      if (isExpanded) {
        drawer.classList.remove('is-expanded');
        pillBtn.classList.remove('is-expanded');
        pillBtn.setAttribute('aria-expanded', 'false');
        if (pillLabel) pillLabel.textContent = 'View Detailed Address & Transit Info';
      } else {
        drawer.classList.add('is-expanded');
        pillBtn.classList.add('is-expanded');
        pillBtn.setAttribute('aria-expanded', 'true');
        if (pillLabel) pillLabel.textContent = 'Hide Address & Transit Info';
      }
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const fullAddress = 'SRM Institute of Science and Technology, Vadapalani Campus, No. 1, Jawaharlal Nehru Salai (100 Feet Road), Vadapalani, Chennai, Tamil Nadu - 600026';

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(fullAddress);
        } else {
          // Fallback for non-secure contexts
          const textArea = document.createElement('textarea');
          textArea.value = fullAddress;
          textArea.style.position = 'fixed';
          textArea.style.opacity = '0';
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }

        if (copyFeedback) {
          copyFeedback.classList.add('show');
          setTimeout(() => {
            copyFeedback.classList.remove('show');
          }, 2500);
        }
      } catch (err) {
        console.warn('Clipboard copy failed:', err);
      }
    });
  }
}
