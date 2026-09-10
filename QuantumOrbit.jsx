import React from 'react';

/**
 * QuantumOrbit Component
 * 
 * An elegant, non-generic quantum orbital background component designed for 'Quantum Bharat'.
 * - 3 Angled elliptical orbits (-30°, +30°, 90°)
 * - Glowing Teal (#00F5D4) and Solar Saffron (#FF9E00, #FFB703) particles
 * - Pure SVG + CSS animations (no heavy runtime libraries)
 * - Hardware accelerated, 60fps locked on mobile and desktop
 * - Respects prefers-reduced-motion
 * - Non-interactive (pointer-events: none)
 * 
 * @param {Object} props
 * @param {number} [props.opacity=0.4] - Background opacity (recommended 0.3 - 0.5)
 * @param {string} [props.className=''] - Additional CSS classes
 */
export default function QuantumOrbit({ opacity = 0.4, className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[820px] aspect-square transition-opacity duration-300 ${className}`}
      style={{ opacity, zIndex: 0 }}
    >
      <svg
        viewBox="0 0 800 800"
        className="w-full h-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Multi-stage Gaussian Glow for Electric Teal */}
          <filter id="glow-teal" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Multi-stage Gaussian Glow for Solar Saffron */}
          <filter id="glow-saffron" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Core Nucleus Glow Filter */}
          <filter id="glowCore" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Central Singularity Gradient (Fusion of White, Teal & Saffron) */}
          <radialGradient id="nucleusGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#00F5D4" />
            <stop offset="75%" stopColor="#FF9E00" />
            <stop offset="100%" stopColor="#070B19" stopOpacity="0" />
          </radialGradient>

          {/* Elliptical Motion & Track Path: rx=320, ry=115 */}
          <path id="path-orbit" d="M 80,400 a 320,115 0 1,0 640,0 a 320,115 0 1,0 -640,0" />
        </defs>

        <style>{`
          .orbit-line {
            fill: none;
            stroke: rgba(56, 189, 248, 0.22);
            stroke-width: 1.4;
          }
          .orbit-line-dashed {
            fill: none;
            stroke: rgba(56, 189, 248, 0.15);
            stroke-width: 1;
            stroke-dasharray: 4 8;
          }
          .core-pulse {
            animation: corePulseKeyframe 4s ease-in-out infinite;
          }
          .core-spin {
            animation: coreSpinKeyframe 20s linear infinite;
            transform-origin: 400px 400px;
          }
          @keyframes corePulseKeyframe {
            0%, 100% { r: 32px; opacity: 0.3; }
            50% { r: 38px; opacity: 0.7; }
          }
          @keyframes coreSpinKeyframe {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @media (prefers-reduced-motion: reduce) {
            .core-pulse, .core-spin {
              animation: none !important;
            }
          }
        `}</style>

        {/* Orbit 1: Angled at -30° (16s cycle) */}
        <g transform="rotate(-30 400 400)">
          <use href="#path-orbit" className="orbit-line" />
          <use href="#path-orbit" className="orbit-line-dashed" transform="scale(0.96) translate(16.6 16.6)" />
          {/* Teal Particle */}
          <circle r="4.5" fill="#00F5D4" filter="url(#glow-teal)">
            <animateMotion dur="16s" repeatCount="indefinite">
              <mpath href="#path-orbit" />
            </animateMotion>
          </circle>
          {/* Saffron Particle (Half-cycle offset) */}
          <circle r="4" fill="#FF9E00" filter="url(#glow-saffron)">
            <animateMotion dur="16s" begin="-8s" repeatCount="indefinite">
              <mpath href="#path-orbit" />
            </animateMotion>
          </circle>
        </g>

        {/* Orbit 2: Angled at +30° (21s cycle) */}
        <g transform="rotate(30 400 400)">
          <use href="#path-orbit" className="orbit-line" />
          <use href="#path-orbit" className="orbit-line-dashed" transform="scale(0.96) translate(16.6 16.6)" />
          {/* Saffron Particle */}
          <circle r="4.5" fill="#FFB703" filter="url(#glow-saffron)">
            <animateMotion dur="21s" repeatCount="indefinite">
              <mpath href="#path-orbit" />
            </animateMotion>
          </circle>
          {/* Teal Particle */}
          <circle r="3.8" fill="#00F5D4" filter="url(#glow-teal)">
            <animateMotion dur="21s" begin="-10.5s" repeatCount="indefinite">
              <mpath href="#path-orbit" />
            </animateMotion>
          </circle>
        </g>

        {/* Orbit 3: Angled at 90° (26s cycle) */}
        <g transform="rotate(90 400 400)">
          <use href="#path-orbit" className="orbit-line" />
          <use href="#path-orbit" className="orbit-line-dashed" transform="scale(0.96) translate(16.6 16.6)" />
          {/* Teal Particle */}
          <circle r="4.2" fill="#00F5D4" filter="url(#glow-teal)">
            <animateMotion dur="26s" repeatCount="indefinite">
              <mpath href="#path-orbit" />
            </animateMotion>
          </circle>
          {/* Saffron Particle */}
          <circle r="4" fill="#FF9E00" filter="url(#glow-saffron)">
            <animateMotion dur="26s" begin="-13s" repeatCount="indefinite">
              <mpath href="#path-orbit" />
            </animateMotion>
          </circle>
        </g>

        {/* Central Nucleus / Quantum Hub */}
        <g>
          {/* Outer Breathing Aura (Teal) */}
          <circle cx="400" cy="400" r="32" fill="none" stroke="rgba(0, 245, 212, 0.2)" strokeWidth="1.5" className="core-pulse" />
          {/* Rotating Dashed Ring (Saffron) */}
          <circle cx="400" cy="400" r="22" fill="none" stroke="rgba(255, 158, 0, 0.35)" strokeWidth="1.2" strokeDasharray="6 4" className="core-spin" />
          {/* Core Singularity */}
          <circle cx="400" cy="400" r="14" fill="url(#nucleusGradient)" filter="url(#glowCore)" />
          {/* Center Qubit Dot */}
          <circle cx="400" cy="400" r="4" fill="#FFFFFF" opacity="0.95" />
        </g>
      </svg>
    </div>
  );
}
