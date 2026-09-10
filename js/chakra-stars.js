/* =========================================================================
   CHAKRA CELESTIAL STARFIELD CONTROLLER
   Generates an organic cluster of multi-magnitude twinkling stars
   ========================================================================= */

export function initChakraStarfield() {
  const container = document.getElementById('chakraStarCluster');
  if (!container) return;

  // Clear any existing stars
  container.innerHTML = '';

  const STAR_COUNT = 42;
  const colors = ['#FFFFFF', '#FFFFFF', '#00E5FF', '#FFEAA7', '#E0F2FE'];

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement('span');
    star.className = 'chakra-star';

    // Organic polar distribution around the chakra
    // Radius from 12% to 50% so stars surround and peer from behind the chakra edges
    const angle = Math.random() * Math.PI * 2;
    const radius = 12 + Math.pow(Math.random(), 0.82) * 38;

    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);

    // Magnitude & Size
    const isHero = i % 8 === 0;
    const isMedium = i % 3 === 0;
    const size = isHero ? 3 : (isMedium ? 2 : 1.2);

    // Color
    const color = colors[Math.floor(Math.random() * colors.length)];

    star.style.left = `${x.toFixed(2)}%`;
    star.style.top = `${y.toFixed(2)}%`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.backgroundColor = color;
    star.style.color = color;

    // Twinkle animation parameters
    const duration = (2.2 + Math.random() * 3.6).toFixed(2);
    const delay = (-Math.random() * 5).toFixed(2);
    star.style.animationDuration = `${duration}s`;
    star.style.animationDelay = `${delay}s`;

    if (isHero) {
      star.classList.add('hero-star-flare');
      star.style.boxShadow = `0 0 6px ${color}`;
    }

    fragment.appendChild(star);
  }

  container.appendChild(fragment);
}
