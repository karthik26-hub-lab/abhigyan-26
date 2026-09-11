/* =========================================================================
   ABHIGYAN '26 MASTER APPLICATION CONTROLLER
   Initializes all modular subsystems on DOM ready
   ========================================================================= */

import { initDotField } from './dotfield.js';
import { applySettledOrIntro, initParallax, startPunchySequence } from './intro.js';
import { initNavbar } from './navbar.js';
import { initEvents } from './events.js';
import { initRegistration } from './registration.js';
import { initFAQ } from './faq.js';
import { initVenue } from './venue.js';
import { initShootingStars } from './shootingstars.js';
import { initChakraStarfield } from './chakra-stars.js';
import { initCountdown } from './countdown.js';

function initApp() {
  initNavbar();
  initEvents();
  initRegistration();
  initVenue();
  initFAQ();
  initShootingStars();
  initChakraStarfield();
  initCountdown();
  initParallax();
  applySettledOrIntro();
  initBannerCoverageGuard();
}

/**
 * Ensures the continuous bottom rankings banner track has sufficient cloned slides
 * to completely eliminate blank white gaps across ultra-wide, 4K, or multi-monitor screens.
 */
function initBannerCoverageGuard() {
  const groupA = document.getElementById('bottomBannerGroupA');
  const groupB = document.getElementById('bottomBannerGroupB');
  if (!groupA || !groupB) return;

  function ensureCoverage() {
    const requiredWidth = window.innerWidth + 800;
    let safety = 0;
    while (groupA.offsetWidth < requiredWidth && safety < 10) {
      const slideA = groupA.firstElementChild;
      if (!slideA) break;
      groupA.appendChild(slideA.cloneNode(true));
      groupB.appendChild(slideA.cloneNode(true));
      safety++;
    }
  }

  ensureCoverage();
  window.addEventListener('resize', ensureCoverage, { passive: true });
}

function initChakraParallax() {
  const chakraStage = document.getElementById('chakraStage');
  if (!chakraStage || !window.matchMedia('(pointer: fine)').matches) return;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let tiltRaf = null;

  window.addEventListener('mousemove', (e) => {
    const nx = (e.clientX / window.innerWidth) - 0.5;
    const ny = (e.clientY / window.innerHeight) - 0.5;
    targetX = nx * 14;
    targetY = -ny * 14;

    if (!tiltRaf) {
      tiltRaf = requestAnimationFrame(updateTilt);
    }
  }, { passive: true });

  function updateTilt() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    chakraStage.style.transform = `perspective(1200px) rotateY(${currentX.toFixed(2)}deg) rotateX(${currentY.toFixed(2)}deg)`;

    if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
      tiltRaf = requestAnimationFrame(updateTilt);
    } else {
      tiltRaf = null;
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

