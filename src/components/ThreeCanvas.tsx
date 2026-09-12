import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeCanvas: React.FC<{ className?: string }> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect device performance capability
    const isMobile = window.innerWidth < 768;
    const isLowPower =
      ('hardwareConcurrency' in navigator && (navigator.hardwareConcurrency || 4) <= 4) ||
      isMobile;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 32;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isLowPower,
      powerPreference: 'high-performance',
      precision: isLowPower ? 'mediump' : 'highp',
    });

    // Cap DPR to 1.25 max for low-end GPU relief
    renderer.setPixelRatio(isLowPower ? 1.0 : Math.min(window.devicePixelRatio, 1.25));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Group for the 3D Mandala & Particles
    const mandalaGroup = new THREE.Group();
    scene.add(mandalaGroup);

    // 1. Concentric Sacred Geometry Line Rings (Optimized count: 3 rings)
    const ringCount = isLowPower ? 2 : 3;
    const lineMaterials: THREE.LineBasicMaterial[] = [];
    const lineGeometries: THREE.BufferGeometry[] = [];

    for (let r = 1; r <= ringCount; r++) {
      const radius = r * 3.8;
      const segments = isLowPower ? 36 : 48;
      const points: THREE.Vector3[] = [];

      for (let s = 0; s <= segments; s++) {
        const theta = (s / segments) * Math.PI * 2;
        const zWave = Math.sin(theta * (r + 2)) * 0.35;
        points.push(
          new THREE.Vector3(
            Math.cos(theta) * radius,
            Math.sin(theta) * radius,
            zWave
          )
        );
      }

      const geom = new THREE.BufferGeometry().setFromPoints(points);
      lineGeometries.push(geom);

      const mat = new THREE.LineBasicMaterial({
        color: new THREE.Color(r % 2 === 0 ? 0xD4AF55 : 0xE7C873),
        transparent: true,
        opacity: Math.max(0.14, 0.38 - r * 0.08),
        blending: THREE.AdditiveBlending,
      });
      lineMaterials.push(mat);

      const line = new THREE.Line(geom, mat);
      mandalaGroup.add(line);
    }

    // 2. Interlocking Sacred Geometry Star Lines (12 points)
    const starGeom = new THREE.BufferGeometry();
    const starPoints: THREE.Vector3[] = [];
    const numStarPoints = 12;
    const outerRadius = 13;
    const innerRadius = 7.5;

    for (let i = 0; i <= numStarPoints; i++) {
      const angle = (i / numStarPoints) * Math.PI * 2;
      const rad = i % 2 === 0 ? outerRadius : innerRadius;
      starPoints.push(
        new THREE.Vector3(
          Math.cos(angle) * rad,
          Math.sin(angle) * rad,
          Math.cos(angle * 3) * 0.6
        )
      );
    }
    starGeom.setFromPoints(starPoints);
    lineGeometries.push(starGeom);

    const starMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(0xF3D995),
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    });
    lineMaterials.push(starMat);
    const starLine = new THREE.Line(starGeom, starMat);
    mandalaGroup.add(starLine);

    // 3. Lightweight Golden Particle Cloud (Significantly reduced for low-end PC smoothness)
    const particleCount = isLowPower ? 70 : 150;
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      if (i < particleCount * 0.6) {
        const ringIdx = (i % 3) + 1;
        const radius = ringIdx * 3.8 + (Math.random() - 0.5) * 0.8;
        const angle = Math.random() * Math.PI * 2;
        particlePositions[i3] = Math.cos(angle) * radius;
        particlePositions[i3 + 1] = Math.sin(angle) * radius;
        particlePositions[i3 + 2] = (Math.random() - 0.5) * 3;
      } else {
        const spread = 35;
        particlePositions[i3] = (Math.random() - 0.5) * spread;
        particlePositions[i3 + 1] = (Math.random() - 0.5) * spread;
        particlePositions[i3 + 2] = (Math.random() - 0.5) * 15;
      }
    }

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Simple canvas texture for glowing dots
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(243, 217, 149, 0.8)');
      grad.addColorStop(0.8, 'rgba(212, 175, 85, 0.2)');
      grad.addColorStop(1, 'rgba(184, 137, 45, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 0.38 : 0.45,
      map: particleTexture,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: new THREE.Color(0xF3D995),
    });

    const particles = new THREE.Points(particleGeom, particleMat);
    mandalaGroup.add(particles);

    // Mouse Parallax tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetMouseX = x * 0.3;
      targetMouseY = y * 0.3;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Scroll tracking
    let targetScrollRot = 0;
    let isVisible = true;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      targetScrollRot = scrollY * 0.001;
      // Pause 3D rendering if user has scrolled far past the hero
      isVisible = scrollY < window.innerHeight * 1.5;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Visibility change handler (pause when tab hidden)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisible = false;
      } else {
        isVisible = window.scrollY < window.innerHeight * 1.5;
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Resize handling
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Animation Loop with visibility throttling
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Skip render calculations when scrolled out of view or tab is hidden
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      // Group rotation
      mandalaGroup.rotation.z = elapsedTime * 0.06 + targetScrollRot;
      mandalaGroup.rotation.x = 0.2 + currentMouseY * 0.4;
      mandalaGroup.rotation.y = currentMouseX * 0.45;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup resources
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      lineGeometries.forEach((g) => g.dispose());
      lineMaterials.forEach((m) => m.dispose());
      particleGeom.dispose();
      particleMat.dispose();
      particleTexture.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
};
