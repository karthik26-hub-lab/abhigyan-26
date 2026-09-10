/* =========================================================================
   CELESTIAL METEOR SHOWER ENGINE
   Multi-star waves streaking diagonally across deep cosmic space
   ========================================================================= */

export function initShootingStars() {
  const container = document.getElementById('shootingStarsContainer');
  if (!container) return;

  function createMeteor(baseAngle) {
    const star = document.createElement('div');
    star.className = 'shooting-star';

    // Start across upper sky (from 25% to 105% width, -20px to 28% height)
    const startX = window.innerWidth * (0.25 + Math.random() * 0.80);
    const startY = -20 + window.innerHeight * (Math.random() * 0.28);

    // Natural diagonal fall angle (downwards and leftwards, ~134° to 146°)
    const angleDeg = baseAngle + (Math.random() * 6 - 3);

    // Dynamic travel distance and slender dimensions
    const travelDist = 580 + Math.random() * 380; // 580px to 960px
    const length = 130 + Math.random() * 110; // 130px to 240px
    const duration = 0.58 + Math.random() * 0.26; // 0.58s to 0.84s (blazing speed)

    // Opacity variation (some brighter, some distant)
    const opacity = (0.75 + Math.random() * 0.25).toFixed(2);

    star.style.left = `${startX.toFixed(1)}px`;
    star.style.top = `${startY.toFixed(1)}px`;
    star.style.width = `${length.toFixed(1)}px`;
    star.style.opacity = opacity;
    star.style.setProperty('--angle', `${angleDeg.toFixed(1)}deg`);
    star.style.setProperty('--travel', `${travelDist.toFixed(1)}px`);
    star.style.animation = `shootingStarStreak ${duration.toFixed(2)}s linear forwards`;

    container.appendChild(star);

    // Clean up DOM node once streak concludes
    setTimeout(() => {
      if (star.parentNode) {
        star.parentNode.removeChild(star);
      }
    }, (duration + 0.15) * 1000);
  }

  function triggerMeteorShower() {
    // Wave size: 2 to 4 meteors falling concurrently in a celestial cascade
    const starCount = Math.floor(Math.random() * 3) + 2; // 2, 3, or 4 stars
    const waveAngle = 138 + (Math.random() * 6 - 3);

    for (let i = 0; i < starCount; i++) {
      // Stagger each star in the wave slightly (0 to 380ms)
      const staggerDelay = i === 0 ? 0 : Math.floor(80 + Math.random() * 300 * i);
      setTimeout(() => createMeteor(waveAngle), staggerDelay);
    }

    // Schedule next meteor wave every 3.5 to 6.2 seconds
    const nextWaveDelay = 3500 + Math.random() * 2700;
    setTimeout(triggerMeteorShower, nextWaveDelay);
  }

  // Initial celestial burst after page settles (1.8s)
  setTimeout(triggerMeteorShower, 1800);
}
