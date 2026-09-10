/* =========================================================================
   REGISTRATION & MODAL CONTROLLER MODULE
   Minimalist modal, form submission, and bottom slider drawer
   ========================================================================= */

export function openRegistrationModal() {
  const modal = document.getElementById('regModalOverlay');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

export function closeRegistrationModal(e) {
  if (e && e.target && e.target !== e.currentTarget && !e.target.classList.contains('reg-close-btn')) {
    return;
  }
  const modal = document.getElementById('regModalOverlay');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

export function handleRegistrationSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('registrationForm');
  const success = document.getElementById('regSuccessMsg');
  if (form && success) {
    form.style.display = 'none';
    success.classList.add('active');
  }
}

export function toggleBottomSlider(open) {
  const overlay = document.getElementById('bottomSliderOverlay');
  if (!overlay) return;
  if (open) {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

export function initRegistration() {
  // Expose to window for inline onclick handlers
  window.openRegistrationModal = openRegistrationModal;
  window.closeRegistrationModal = closeRegistrationModal;
  window.handleRegistrationSubmit = handleRegistrationSubmit;
  window.toggleBottomSlider = toggleBottomSlider;

  // Escape key global listener
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeRegistrationModal();
      toggleBottomSlider(false);
      if (typeof window.toggleNavMobileMenu === 'function') {
        window.toggleNavMobileMenu(false);
      }
    }
  });
}
