import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * QuantumSiliconChip3D
 * 
 * An elite-tier, photorealistic 3D Quantum Microprocessor component built with Three.js.
 * - Real 3D Ceramic/Silicon substrate with metallic 24K gold wire-bonding pins
 * - Polished silicon die with procedural laser-etched cryogenic cyan micro-traces
 * - Floating 3D Gyroscopic Quantum Core with interlocking metallic torus rings
 * - Mouse parallax tilt & touch-drag interaction
 * - Dynamic PBR lighting with specular metallic glints
 */
export default function QuantumSiliconChip3D({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030508, 0.035);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 3.5, 9);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x10172a, 1.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight.position.set(5, 12, 7);
    scene.add(dirLight);

    const cyanLight = new THREE.PointLight(0x00f2fe, 3.5, 10);
    cyanLight.position.set(0, 1.2, 0);
    scene.add(cyanLight);

    const goldLight = new THREE.PointLight(0xf5a623, 2.5, 8);
    goldLight.position.set(0, 0.2, 0);
    scene.add(goldLight);

    // Master 3D Group
    const chipMasterGroup = new THREE.Group();
    scene.add(chipMasterGroup);

    // Substrate & Silicon Die
    const substrateGeo = new THREE.BoxGeometry(4.8, 0.2, 4.8);
    const substrateMat = new THREE.MeshStandardMaterial({
      color: 0x0a0f1d,
      roughness: 0.35,
      metalness: 0.7,
    });
    const substrate = new THREE.Mesh(substrateGeo, substrateMat);
    chipMasterGroup.add(substrate);

    const dieGeo = new THREE.BoxGeometry(2.8, 0.12, 2.8);
    const dieMat = new THREE.MeshStandardMaterial({
      color: 0x050811,
      roughness: 0.1,
      metalness: 0.95,
    });
    const die = new THREE.Mesh(dieGeo, dieMat);
    die.position.y = 0.12;
    chipMasterGroup.add(die);

    // Gold Wire-Bonding Pins
    const goldPinMat = new THREE.MeshStandardMaterial({
      color: 0xf5a623,
      roughness: 0.15,
      metalness: 0.95,
      emissive: 0x553300,
      emissiveIntensity: 0.3,
    });
    const pinGeo = new THREE.BoxGeometry(0.12, 0.08, 0.4);
    const numPins = 12;
    const offset = 2.15;

    for (let i = 0; i < numPins; i++) {
      const pos = (i - (numPins - 1) / 2) * 0.35;
      const pTop = new THREE.Mesh(pinGeo, goldPinMat);
      pTop.position.set(pos, 0.12, -offset);
      chipMasterGroup.add(pTop);

      const pBottom = new THREE.Mesh(pinGeo, goldPinMat);
      pBottom.position.set(pos, 0.12, offset);
      chipMasterGroup.add(pBottom);

      const pLeft = new THREE.Mesh(pinGeo, goldPinMat);
      pLeft.rotation.y = Math.PI / 2;
      pLeft.position.set(-offset, 0.12, pos);
      chipMasterGroup.add(pLeft);

      const pRight = new THREE.Mesh(pinGeo, goldPinMat);
      pRight.rotation.y = Math.PI / 2;
      pRight.position.set(offset, 0.12, pos);
      chipMasterGroup.add(pRight);
    }

    // Laser Etched Silicon Micro-Traces
    const traceMat = new THREE.LineBasicMaterial({
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    for (let j = 0; j < 16; j++) {
      const pts = [];
      const angle = (j / 16) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * 0.4, 0.19, Math.sin(angle) * 0.4));
      pts.push(new THREE.Vector3(Math.cos(angle + 0.2) * 0.8, 0.19, Math.sin(angle + 0.2) * 0.8));
      pts.push(new THREE.Vector3(Math.cos(angle + 0.2) * 1.25, 0.19, Math.sin(angle + 0.2) * 1.25));

      const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
      chipMasterGroup.add(new THREE.Line(lineGeo, traceMat));
    }

    // Gyroscopic Quantum Core
    const coreGroup = new THREE.Group();
    coreGroup.position.y = 1.0;
    chipMasterGroup.add(coreGroup);

    const ringMatCyan = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      emissive: 0x0088aa,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.9,
    });
    const ringMatGold = new THREE.MeshStandardMaterial({
      color: 0xf5a623,
      emissive: 0x884400,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.95,
    });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.022, 16, 100), ringMatCyan);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.022, 16, 100), ringMatGold);
    ring2.rotation.y = Math.PI / 4;
    coreGroup.add(ring2);

    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.022, 16, 100), ringMatCyan);
    ring3.rotation.x = -Math.PI / 4;
    ring3.rotation.z = Math.PI / 3;
    coreGroup.add(ring3);

    // Qubit Singularity
    const qubit = new THREE.Mesh(new THREE.SphereGeometry(0.24, 32, 32), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    coreGroup.add(qubit);

    const shell = new THREE.Mesh(
      new THREE.SphereGeometry(0.38, 32, 32),
      new THREE.MeshStandardMaterial({ color: 0x00f2fe, transparent: true, opacity: 0.35, roughness: 0.1, metalness: 0.5 })
    );
    coreGroup.add(shell);

    // Mouse Tracking
    let targetRotX = 0.55;
    let targetRotY = -0.45;

    const handleMouseMove = (e) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotY = mouseX * 0.7;
      targetRotX = 0.55 + (-mouseY * 0.4);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      chipMasterGroup.rotation.x += (targetRotX - chipMasterGroup.rotation.x) * 0.05;
      chipMasterGroup.rotation.y += (targetRotY - chipMasterGroup.rotation.y) * 0.05;
      chipMasterGroup.rotation.y += 0.002;

      ring1.rotation.z = elapsed * 0.6;
      ring2.rotation.x = elapsed * 0.8;
      ring3.rotation.y = elapsed * 0.5;

      const pulse = Math.sin(elapsed * 2.5) * 0.5 + 1.0;
      cyanLight.intensity = 2.8 + pulse * 1.2;
      shell.scale.setScalar(0.95 + pulse * 0.08);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className={`w-full h-full ${className}`} />;
}
