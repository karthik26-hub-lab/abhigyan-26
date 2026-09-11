/* =========================================================================
   ABHIGYAN '26 LIVE COUNTDOWN CONTROLLER
   Target: 24th September 2026, 09:00:00 IST
   Features: Real-time clock + Desktop Hero-to-Navbar scroll docking
   ========================================================================= */

const TARGET_DATE = new Date('2026-09-24T09:00:00+05:30').getTime();

function pad(n) {
  return String(Math.max(0, n)).padStart(2, '0');
}

export function initCountdown() {
  const heroDock = document.getElementById('heroCountdownDock');
  const navDesktop = document.getElementById('navCountdownDesktop');

  function tick() {
    const now = Date.now();
    const diff = TARGET_DATE - now;

    let days = 0, hours = 0, mins = 0, secs = 0;

    if (diff > 0) {
      days = Math.floor(diff / (1000 * 60 * 60 * 24));
      hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      mins = Math.floor((diff / (1000 * 60)) % 60);
      secs = Math.floor((diff / 1000) % 60);
    }

    const sDays = pad(days);
    const sHours = pad(hours);
    const sMins = pad(mins);
    const sSecs = pad(secs);

    document.querySelectorAll('.c-days').forEach(el => el.textContent = sDays);
    document.querySelectorAll('.c-hours').forEach(el => el.textContent = sHours);
    document.querySelectorAll('.c-mins').forEach(el => el.textContent = sMins);
    document.querySelectorAll('.c-secs').forEach(el => el.textContent = sSecs);
  }

  tick();
  setInterval(tick, 1000);

  // Desktop Scroll Docking Interaction:
  // When the user scrolls past the hero section, the timer seamlessly docks into the top navbar
  if (heroDock && navDesktop) {
    function handleScrollDock() {
      const rect = heroDock.getBoundingClientRect();
      if (rect.bottom < 80) {
        navDesktop.classList.add('docked');
      } else {
        navDesktop.classList.remove('docked');
      }
    }

    window.addEventListener('scroll', handleScrollDock, { passive: true });
    handleScrollDock();
  }
}
