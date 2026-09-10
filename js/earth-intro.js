/* =========================================================================
   ABHIGYAN '26 — HYPER-REALISTIC 3D WEBGL EARTH INTRO ENGINE
   - Photorealistic Multi-Pass Earth (NASA 2K Terrain, Bump Relief, Specular Oceans)
   - Additive City Night Lights (Indian Subcontinent Urban Glow)
   - Volumetric Atmospheric Cloud Veil
   - Custom GLSL Rayleigh Atmospheric Scattering (FrontSide Fresnel Rim)
   - Precision Upright Geotargeting (India 20.59° N, 78.96° E & Chennai Beacon)
   - Cinematic Camera Zoom, Studio Shutter Flash, Title Slam & Corner Docking
   ========================================================================= */

let scene, camera, renderer, earthGroup, earthMesh, cloudsMesh, atmosphereMesh;
let beaconGroup, beaconRing1, beaconRing2;
let animRaf = null;
let isIntroActive = false;
let startTime = null;

// Upright target Euler rotation for India facing camera directly
const targetRotX = 20.59 * (Math.PI / 180);
const targetRotY = -168.96 * (Math.PI / 180);
let initialRotY = 0;
let flashTriggered = false;
let dockTriggered = false;

export function initEarthIntro() {
  const container = document.getElementById('cinematicEarthCanvasContainer');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('settled') === '1' || sessionStorage.getItem('abhigyan_intro_played') === 'true') {
    settleImmediately();
    return;
  }

  setupWebGL(container);
}

export function replayEarthIntro() {
  sessionStorage.removeItem('abhigyan_intro_played');
  const container = document.getElementById('cinematicEarthCanvasContainer');
  const introStage = document.getElementById('cinematicIntroStage');
  if (!container || !introStage) return;

  introStage.classList.remove('docked', 'hidden');
  introStage.style.display = 'block';
  introStage.style.opacity = '1';
  introStage.style.pointerEvents = 'auto';

  const titleSlam = document.getElementById('introTitleSlam');
  if (titleSlam) {
    titleSlam.classList.remove('slammed', 'fading');
  }

  flashTriggered = false;
  dockTriggered = false;

  setupWebGL(container);
}

function setupWebGL(container) {
  if (typeof THREE === 'undefined') {
    console.warn('Three.js not loaded, settling immediately');
    settleImmediately();
    return;
  }

  if (animRaf) cancelAnimationFrame(animRaf);
  container.innerHTML = '';
  isIntroActive = true;
  flashTriggered = false;
  dockTriggered = false;

  const w = window.innerWidth;
  const h = window.innerHeight;

  // 1. Cinematic Scene & Camera (FOV 42 for dramatic compression)
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
  camera.position.set(0, 0, 3.8);

  // 2. WebGL Renderer with High Precision & Tone Mapping
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(w, h);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.outputEncoding = THREE.sRGBEncoding;
  container.appendChild(renderer.domElement);

  // 3. Texture Loader
  const textureLoader = new THREE.TextureLoader();
  const earthTexture = textureLoader.load('/assets/earth_dark_master_2048.jpg');
  const emissiveTexture = textureLoader.load('/assets/earth_dark_emissive_2048.png');
  const cloudsTexture = textureLoader.load('/assets/earth_clouds_1024.png');

  // 4. Earth Master Group (Keeps Upright Coordinates)
  earthGroup = new THREE.Group();
  scene.add(earthGroup);

  const radius = 1.18;
  const sphereGeo = new THREE.SphereGeometry(radius, 128, 128);

  // 5. Stylized Dark Cosmic Earth Material (Matching Symposium Backdrop Artwork)
  const earthMat = new THREE.MeshStandardMaterial({
    map: earthTexture,
    emissive: new THREE.Color(0xffffff),
    emissiveMap: emissiveTexture,
    emissiveIntensity: 1.4,
    roughness: 0.42,
    metalness: 0.06
  });
  earthMesh = new THREE.Mesh(sphereGeo, earthMat);
  earthGroup.add(earthMesh);

  // 6. Volumetric Atmospheric Cloud Layer (Subtle, transparent, depthWrite: false)
  const cloudsGeo = new THREE.SphereGeometry(radius * 1.012, 96, 96);
  const cloudsMat = new THREE.MeshStandardMaterial({
    map: cloudsTexture,
    transparent: true,
    opacity: 0.12,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
  earthGroup.add(cloudsMesh);

  // 8. Custom Rayleigh Atmospheric Scattering Shader (Soft FrontSide Horizon Rim)
  const atmosGeo = new THREE.SphereGeometry(radius * 1.018, 96, 96);
  const atmosMat = new THREE.ShaderMaterial({
    vertexShader: [
      'varying vec3 vNormal;',
      'varying vec3 vViewDir;',
      'void main() {',
      '  vNormal = normalize(normalMatrix * normal);',
      '  vec4 mvPos = modelViewMatrix * vec4(position, 1.0);',
      '  vViewDir = normalize(-mvPos.xyz);',
      '  gl_Position = projectionMatrix * mvPos;',
      '}'
    ].join('\n'),
    fragmentShader: [
      'varying vec3 vNormal;',
      'varying vec3 vViewDir;',
      'void main() {',
      '  float dotNV = max(dot(normalize(vNormal), normalize(vViewDir)), 0.0);',
      '  float rim = 1.0 - dotNV;',
      '  float glow = pow(rim, 4.2);',
      '  vec3 atmosColor = mix(vec3(0.00, 0.88, 1.0), vec3(0.96, 0.80, 0.20), 0.10);',
      '  gl_FragColor = vec4(atmosColor, glow * 0.92);',
      '}'
    ].join('\n'),
    blending: THREE.AdditiveBlending,
    side: THREE.FrontSide,
    transparent: true
  });
  atmosphereMesh = new THREE.Mesh(atmosGeo, atmosMat);
  earthGroup.add(atmosphereMesh);

  // 9. High-Tech Chennai / SRM Vadapalani Epicenter Quantum Beacon
  setupChennaiBeacon(radius);

  // 10. Directional Sun Lighting (Dramatic terminator across dark curvature)
  const sunLight = new THREE.DirectionalLight(0xfff0d8, 1.35);
  sunLight.position.set(4.5, 2.2, 3.5);
  scene.add(sunLight);

  const fillLight = new THREE.DirectionalLight(0x061022, 0.3);
  fillLight.position.set(-4.5, -2, -2.5);
  scene.add(fillLight);

  const ambientLight = new THREE.AmbientLight(0x040814, 0.25);
  scene.add(ambientLight);

  // Initial spinning rotation
  initialRotY = targetRotY - 2.8; // Starts about 160° away
  earthMesh.rotation.set(0, initialRotY, 0);

  window.addEventListener('resize', onResize);
  const skipBtn = document.getElementById('introSkipBtn');
  if (skipBtn) skipBtn.onclick = skipIntro;
  window.addEventListener('keydown', onKeyDown);

  startTime = performance.now();
  animRaf = requestAnimationFrame(renderLoop);
}

function setupChennaiBeacon(radius) {
  // Chennai coordinates: Lat 13.0524° N, Lon 80.2104° E
  const phi = (90 - 13.0524) * (Math.PI / 180);
  const theta = (80.2104 + 180) * (Math.PI / 180);
  const x = -(radius * 1.002 * Math.sin(phi) * Math.cos(theta));
  const z = (radius * 1.002 * Math.sin(phi) * Math.sin(theta));
  const y = (radius * 1.002 * Math.cos(phi));

  beaconGroup = new THREE.Group();
  beaconGroup.position.set(x, y, z);
  beaconGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), new THREE.Vector3(x, y, z).normalize());

  // Subtle Glowing gold core dot
  const dotGeo = new THREE.CircleGeometry(0.008, 32);
  const dotMat = new THREE.MeshBasicMaterial({ color: 0xF5C518, depthTest: false, transparent: true });
  const dot = new THREE.Mesh(dotGeo, dotMat);
  beaconGroup.add(dot);

  // Cyan radar pulse ring
  const ringGeo1 = new THREE.RingGeometry(0.012, 0.016, 32);
  const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x00E5FF, depthTest: false, transparent: true, opacity: 0.9 });
  beaconRing1 = new THREE.Mesh(ringGeo1, ringMat1);
  beaconGroup.add(beaconRing1);

  // Gold secondary pulse ring
  const ringGeo2 = new THREE.RingGeometry(0.020, 0.024, 32);
  const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xF5C518, depthTest: false, transparent: true, opacity: 0.6 });
  beaconRing2 = new THREE.Mesh(ringGeo2, ringMat2);
  beaconGroup.add(beaconRing2);

  beaconGroup.visible = false;
  earthMesh.add(beaconGroup);
}

function renderLoop(time) {
  if (!isIntroActive) return;
  const elapsed = (time - startTime) / 1000; // seconds

  // Cloud drift
  if (cloudsMesh) cloudsMesh.rotation.y += 0.0004;

  // Beacon pulse animation
  if (beaconGroup && beaconGroup.visible) {
    const p1 = (elapsed * 2.2) % 1;
    beaconRing1.scale.setScalar(1 + p1 * 2.8);
    beaconRing1.material.opacity = (1 - p1) * 0.9;

    const p2 = ((elapsed * 2.2) + 0.5) % 1;
    beaconRing2.scale.setScalar(1 + p2 * 2.8);
    beaconRing2.material.opacity = (1 - p2) * 0.7;
  }

  // SEQUENCE TIMELINE
  if (elapsed < 1.4) {
    // PHASE 1: Axial spin in deep space (starts from initialRotY, decelerating smoothly)
    const progress = elapsed / 1.4;
    const easeP = easeOutQuad(progress);
    const curRotY = THREE.MathUtils.lerp(initialRotY, targetRotY, easeP * 0.65);
    const curRotX = THREE.MathUtils.lerp(0, targetRotX, easeP * 0.65);
    earthMesh.rotation.set(curRotX, curRotY, 0);
  } else if (elapsed < 2.3) {
    // PHASE 2: Locking onto India perfectly upright
    const lockProgress = easeOutCubic((elapsed - 1.4) / 0.9);
    const startRotY = THREE.MathUtils.lerp(initialRotY, targetRotY, 0.65);
    const startRotX = THREE.MathUtils.lerp(0, targetRotX, 0.65);
    const curRotY = THREE.MathUtils.lerp(startRotY, targetRotY, lockProgress);
    const curRotX = THREE.MathUtils.lerp(startRotX, targetRotX, lockProgress);
    earthMesh.rotation.set(curRotX, curRotY, 0);
    if (elapsed > 1.8 && beaconGroup) {
      beaconGroup.visible = true;
    }
  } else if (elapsed < 3.2) {
    // PHASE 3: Camera Zoom Surge towards India (keeping globe in majestic view)
    const zoomProgress = easeInOutQuad((elapsed - 2.3) / 0.9);
    camera.position.z = THREE.MathUtils.lerp(3.8, 2.35, zoomProgress);
  } else if (elapsed < 4.4) {
    // PHASE 4: Studio Shutter Flash & Title Slam
    triggerFlashAndSlam();
  } else if (elapsed < 5.6) {
    // PHASE 5: Corner Docking to Top-Left
    dockToCorner();
  } else {
    finishIntro();
    return;
  }

  renderer.render(scene, camera);
  animRaf = requestAnimationFrame(renderLoop);
}

function triggerFlashAndSlam() {
  if (flashTriggered) return;
  flashTriggered = true;

  const flashOverlay = document.getElementById('flash-overlay');
  if (flashOverlay) {
    flashOverlay.style.opacity = '0.94';
    setTimeout(() => {
      flashOverlay.style.opacity = '0';
    }, 120);
  }

  const titleSlam = document.getElementById('introTitleSlam');
  if (titleSlam) {
    titleSlam.classList.add('slammed');
  }
}

function dockToCorner() {
  if (dockTriggered) return;
  dockTriggered = true;

  const introStage = document.getElementById('cinematicIntroStage');
  const titleSlam = document.getElementById('introTitleSlam');

  if (titleSlam) {
    titleSlam.classList.add('fading');
  }

  if (introStage) {
    introStage.classList.add('docked');
  }

  // Reveal main hero components
  const masterTitleUnit = document.getElementById('masterTitleUnit');
  const globalNavbar = document.getElementById('globalNavbar');
  const settledContent = document.getElementById('settledContent');

  if (masterTitleUnit) masterTitleUnit.classList.add('settled');
  if (globalNavbar) globalNavbar.classList.add('settled');
  if (settledContent) settledContent.classList.add('visible');
}

function finishIntro() {
  isIntroActive = false;
  if (animRaf) cancelAnimationFrame(animRaf);

  sessionStorage.setItem('abhigyan_intro_played', 'true');

  const introStage = document.getElementById('cinematicIntroStage');
  if (introStage) {
    introStage.classList.add('hidden');
    setTimeout(() => {
      introStage.style.display = 'none';
    }, 600);
  }

  settleImmediately();
}

export function skipIntro() {
  finishIntro();
}

function onKeyDown(e) {
  if (e.key === 'Escape') {
    skipIntro();
  }
}

function settleImmediately() {
  isIntroActive = false;
  if (animRaf) cancelAnimationFrame(animRaf);

  const introStage = document.getElementById('cinematicIntroStage');
  if (introStage) introStage.style.display = 'none';

  const masterTitleUnit = document.getElementById('masterTitleUnit');
  const globalNavbar = document.getElementById('globalNavbar');
  const settledContent = document.getElementById('settledContent');
  const wordAbhigyan26 = document.getElementById('wordAbhigyan26');
  const wordQuantumBharat = document.getElementById('wordQuantumBharat');
  const taglineGlimpse = document.getElementById('taglineGlimpse');

  [masterTitleUnit, globalNavbar, settledContent, wordAbhigyan26, wordQuantumBharat, taglineGlimpse].forEach(el => {
    if (el) {
      el.classList.add('slammed', 'settled', 'visible');
      el.style.opacity = '1';
    }
  });

  window.removeEventListener('keydown', onKeyDown);
}

function onResize() {
  if (!renderer || !camera) return;
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}

function easeOutQuad(t) {
  return t * (2 - t);
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}
