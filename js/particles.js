/* =========================================================================
   QUANTUM PARTICLES SIMULATION ENGINE
   Ambient floating quantum nodes, gold/cyan photon sparkles & subtle entanglements
   ========================================================================= */

export function initQuantumParticles() {
  const canvas = document.getElementById('quantumParticlesCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });
  let w, h, dpr;
  let particles = [];
  const isMobile = window.innerWidth <= 768;
  const PARTICLE_COUNT = isMobile ? 42 : 85;
  const CONNECT_DIST = isMobile ? 65 : 85;

  const COLORS = [
    { r: 0, g: 229, b: 255 },   // Cyan Electric
    { r: 245, g: 197, b: 24 },  // 24K Minted Gold
    { r: 255, g: 255, b: 255 }, // Photon Diamond White
    { r: 56, g: 189, b: 248 }   // Cryo Sky Blue
  ];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();

  class QuantumParticle {
    constructor() {
      this.reset(true);
    }

    reset(init = false) {
      this.x = Math.random() * w;
      this.y = init ? Math.random() * h : (Math.random() > 0.5 ? -10 : h + 10);
      this.r = Math.random() * 1.6 + 0.8;
      this.baseAlpha = Math.random() * 0.45 + 0.35;
      this.alpha = this.baseAlpha;
      this.colorObj = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.35 - 0.08; // Soft upward buoyant drift
      this.pulseSpeed = Math.random() * 0.03 + 0.015;
      this.pulsePhase = Math.random() * Math.PI * 2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.pulsePhase += this.pulseSpeed;
      this.alpha = this.baseAlpha + Math.sin(this.pulsePhase) * 0.25;
      if (this.alpha < 0.1) this.alpha = 0.1;

      if (this.x < -20) this.x = w + 20;
      if (this.x > w + 20) this.x = -20;
      if (this.y < -20) this.y = h + 20;
      if (this.y > h + 20) this.y = -20;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.colorObj.r}, ${this.colorObj.g}, ${this.colorObj.b}, ${this.alpha})`;
      ctx.shadowBlur = this.r * 5;
      ctx.shadowColor = `rgba(${this.colorObj.r}, ${this.colorObj.g}, ${this.colorObj.b}, 0.7)`;
      ctx.fill();
    }
  }

  // Populate particle field
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new QuantumParticle());
  }

  // Interactive mouse subtle deflection on Desktop
  let mouse = { x: -1000, y: -1000 };
  if (!isMobile) {
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });
  }

  function render() {
    ctx.clearRect(0, 0, w, h);

    // Update & draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.update();

      // Mouse proximity repulsion
      if (!isMobile) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 90) {
          const force = (90 - dist) / 90;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }
      }

      p.draw();

      // Subtle quantum entanglement strands
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECT_DIST) {
          const strandAlpha = (1 - dist / CONNECT_DIST) * 0.18;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${p.colorObj.r}, ${p.colorObj.g}, ${p.colorObj.b}, ${strandAlpha})`;
          ctx.lineWidth = 0.75;
          ctx.shadowBlur = 0;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  render();
}
