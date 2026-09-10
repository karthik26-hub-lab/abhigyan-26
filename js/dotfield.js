/* =========================================================================
   DOTFIELD COMPONENT (From React Bits)
   Interactive physics-based dot field canvas with bulge & glow dynamics
   ========================================================================= */

const TWO_PI = Math.PI * 2;

export function initDotField(containerId = 'dotFieldContainer', options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const {
    dotRadius = 1.5,
    dotSpacing = 14,
    cursorRadius = 500,
    cursorForce = 0.1,
    bulgeOnly = true,
    bulgeStrength = 67,
    glowRadius = 160,
    sparkle = false,
    waveAmplitude = 0,
    gradientFrom = 'rgba(168, 85, 247, 0.35)',
    gradientTo = 'rgba(180, 151, 207, 0.25)',
    glowColor = '#120F17'
  } = options;

  container.innerHTML = '';
  container.style.position = 'fixed';
  container.style.inset = '0';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.pointerEvents = 'none';
  container.style.zIndex = '2';

  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.inset = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  container.appendChild(canvas);

  const glowId = `dot-field-glow-${Math.random().toString(36).slice(2, 9)}`;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.style.position = 'absolute';
  svg.style.inset = '0';
  svg.style.width = '100%';
  svg.style.height = '100%';
  svg.style.pointerEvents = 'none';

  svg.innerHTML = `
    <defs>
      <radialGradient id="${glowId}">
        <stop offset="0%" stop-color="${glowColor}" />
        <stop offset="100%" stop-color="transparent" />
      </radialGradient>
    </defs>
    <circle cx="-9999" cy="-9999" r="${glowRadius}" fill="url(#${glowId})" style="opacity: 0; will-change: opacity;" />
  `;
  container.appendChild(svg);
  const glowEl = svg.querySelector('circle');

  const ctx = canvas.getContext('2d', { alpha: true });
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let dots = [];
  const mouse = { x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 };
  let rafId = null;
  const size = { w: 0, h: 0, offsetX: 0, offsetY: 0 };
  let glowOpacity = 0;
  let engagement = 0;
  let resizeTimer;

  function doResize() {
    const rect = container.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    size.w = w;
    size.h = h;
    size.offsetX = rect.left + window.scrollX;
    size.offsetY = rect.top + window.scrollY;

    buildDots(w, h);
  }

  function resize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(doResize, 100);
  }

  function buildDots(w, h) {
    const step = dotRadius + dotSpacing;
    const cols = Math.floor(w / step);
    const rows = Math.floor(h / step);
    const padX = (w % step) / 2;
    const padY = (h % step) / 2;
    dots = new Array(rows * cols);
    let idx = 0;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const ax = padX + col * step + step / 2;
        const ay = padY + row * step + step / 2;
        dots[idx++] = { ax, ay, sx: ax, sy: ay, vx: 0, vy: 0, x: ax, y: ay };
      }
    }
  }

  function onMouseMove(e) {
    mouse.x = e.pageX - size.offsetX;
    mouse.y = e.pageY - size.offsetY;
  }

  function updateMouseSpeed() {
    const dx = mouse.prevX - mouse.x;
    const dy = mouse.prevY - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    mouse.speed += (dist - mouse.speed) * 0.5;
    if (mouse.speed < 0.001) mouse.speed = 0;
    mouse.prevX = mouse.x;
    mouse.prevY = mouse.y;
  }

  const speedInterval = setInterval(updateMouseSpeed, 20);
  let frameCount = 0;

  function tick() {
    frameCount++;
    const { w, h } = size;
    const len = dots.length;
    const t = frameCount * 0.02;

    const targetEngagement = Math.min(mouse.speed / 5, 1);
    engagement += (targetEngagement - engagement) * 0.06;
    if (engagement < 0.001) engagement = 0;

    glowOpacity += (engagement - glowOpacity) * 0.08;

    if (glowEl) {
      glowEl.setAttribute('cx', mouse.x);
      glowEl.setAttribute('cy', mouse.y);
      glowEl.style.opacity = glowOpacity;
    }

    ctx.clearRect(0, 0, w, h);

    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, gradientFrom);
    grad.addColorStop(1, gradientTo);
    ctx.fillStyle = grad;

    const cr = cursorRadius;
    const crSq = cr * cr;
    const rad = dotRadius / 2;

    ctx.beginPath();

    for (let i = 0; i < len; i++) {
      const d = dots[i];
      const dx = mouse.x - d.ax;
      const dy = mouse.y - d.ay;
      const distSq = dx * dx + dy * dy;

      if (distSq < crSq && engagement > 0.01) {
        const dist = Math.sqrt(distSq);
        if (bulgeOnly) {
          const tFactor = 1 - dist / cr;
          const push = tFactor * tFactor * bulgeStrength * engagement;
          const angle = Math.atan2(dy, dx);
          d.sx += (d.ax - Math.cos(angle) * push - d.sx) * 0.15;
          d.sy += (d.ay - Math.sin(angle) * push - d.sy) * 0.15;
        } else {
          const angle = Math.atan2(dy, dx);
          const move = (500 / dist) * (mouse.speed * cursorForce);
          d.vx += Math.cos(angle) * -move;
          d.vy += Math.sin(angle) * -move;
        }
      } else if (bulgeOnly) {
        d.sx += (d.ax - d.sx) * 0.1;
        d.sy += (d.ay - d.sy) * 0.1;
      }

      if (!bulgeOnly) {
        d.vx *= 0.9;
        d.vy *= 0.9;
        d.x = d.ax + d.vx;
        d.y = d.ay + d.vy;
        d.sx += (d.x - d.sx) * 0.1;
        d.sy += (d.y - d.sy) * 0.1;
      }

      let drawX = d.sx;
      let drawY = d.sy;
      if (waveAmplitude > 0) {
        drawY += Math.sin(d.ax * 0.03 + t) * waveAmplitude;
        drawX += Math.cos(d.ay * 0.03 + t * 0.7) * waveAmplitude * 0.5;
      }

      if (sparkle) {
        const hash = ((i * 2654435761) ^ (frameCount >> 3)) >>> 0;
        if ((hash % 100) < 3) {
          ctx.moveTo(drawX + rad * 1.8, drawY);
          ctx.arc(drawX, drawY, rad * 1.8, 0, TWO_PI);
        } else {
          ctx.moveTo(drawX + rad, drawY);
          ctx.arc(drawX, drawY, rad, 0, TWO_PI);
        }
      } else {
        ctx.moveTo(drawX + rad, drawY);
        ctx.arc(drawX, drawY, rad, 0, TWO_PI);
      }
    }

    ctx.fill();

    rafId = requestAnimationFrame(tick);
  }

  doResize();
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', onMouseMove, { passive: true });
  rafId = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(rafId);
    clearInterval(speedInterval);
    clearTimeout(resizeTimer);
    window.removeEventListener('resize', resize);
    window.removeEventListener('mousemove', onMouseMove);
  };
}
