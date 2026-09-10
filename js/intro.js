/* =========================================================================
   KINETIC INTRO & STAGE CONTROLLER
   Sequential flash-slam reveals and settled state transition
   ========================================================================= */

export function triggerFlash(intensity = 0.14) {
  const flashOverlay = document.getElementById('flash-overlay');
  if (!flashOverlay) return;
  flashOverlay.style.opacity = intensity;
  setTimeout(() => {
    flashOverlay.style.opacity = '0';
  }, 75);
}

export function startPunchySequence() {
  const wordAbhigyan26 = document.getElementById('wordAbhigyan26');
  const wordQuantumBharat = document.getElementById('wordQuantumBharat');
  const taglineGlimpse = document.getElementById('taglineGlimpse');
  const masterTitleUnit = document.getElementById('masterTitleUnit');
  const globalNavbar = document.getElementById('globalNavbar');
  const settledContent = document.getElementById('settledContent');

  // Reset states
  [wordAbhigyan26, wordQuantumBharat, taglineGlimpse, masterTitleUnit, globalNavbar, settledContent].forEach(el => {
    if (el) {
      el.classList.remove('slammed', 'settled', 'visible');
      el.style.opacity = '';
    }
  });

  // T + 200ms: SLAM 1 — ABHIGYAN '26 SIGNATURE LOGO
  setTimeout(() => {
    triggerFlash(0.20);
    if (wordAbhigyan26) wordAbhigyan26.classList.add('slammed');
  }, 200);

  // T + 850ms: SLAM 2 — QUANTUM BHARAT (Clean 24K Architectural Gold)
  setTimeout(() => {
    triggerFlash(0.12);
    if (wordQuantumBharat) wordQuantumBharat.classList.add('slammed');
  }, 850);

  // T + 1550ms: RESOLVE — QUANTUM LEAP TO VIKSIT BHARAT
  setTimeout(() => {
    if (taglineGlimpse) taglineGlimpse.classList.add('slammed');
  }, 1550);

  // T + 2150ms: SETTLE — Title Unit glides into position; surrounding UI & Navbar fades in
  setTimeout(() => {
    if (masterTitleUnit) masterTitleUnit.classList.add('settled');
    if (globalNavbar) globalNavbar.classList.add('settled');
    if (settledContent) settledContent.classList.add('visible');
  }, 2150);
}

export function applySettledOrIntro() {
  const params = new URLSearchParams(window.location.search);
  const wordAbhigyan26 = document.getElementById('wordAbhigyan26');
  const wordQuantumBharat = document.getElementById('wordQuantumBharat');
  const taglineGlimpse = document.getElementById('taglineGlimpse');
  const masterTitleUnit = document.getElementById('masterTitleUnit');
  const globalNavbar = document.getElementById('globalNavbar');
  const settledContent = document.getElementById('settledContent');

  if (params.get('settled') === '1' || sessionStorage.getItem('abhigyan_intro_played') === 'true') {
    const els = [masterTitleUnit, wordAbhigyan26, wordQuantumBharat, taglineGlimpse, globalNavbar, settledContent];
    els.forEach(el => {
      if (el) {
        el.style.transition = 'none';
        el.style.animation = 'none';
      }
    });
    if (wordAbhigyan26) wordAbhigyan26.classList.add('slammed');
    if (wordQuantumBharat) wordQuantumBharat.classList.add('slammed');
    if (taglineGlimpse) taglineGlimpse.classList.add('slammed');
    if (masterTitleUnit) masterTitleUnit.classList.add('settled');
    if (globalNavbar) globalNavbar.classList.add('settled');
    if (settledContent) settledContent.classList.add('visible');
  } else {
    sessionStorage.setItem('abhigyan_intro_played', 'true');
    startPunchySequence();
  }
}

// Subtle Optical Parallax for Blurred Microchips (Desktop mice only)
export function initParallax() {
  const blurredLayer = document.getElementById('blurredChipsLayer');
  if (blurredLayer && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      const nx = (e.clientX / window.innerWidth) - 0.5;
      const ny = (e.clientY / window.innerHeight) - 0.5;
      blurredLayer.style.transform = `scale(1.05) translate(${nx * 14}px, ${ny * 10}px)`;
    }, { passive: true });
  }
}
