"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

export function HeroSculpture() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const currentCanvas = canvas;

    const renderer = new THREE.WebGLRenderer({
      canvas: currentCanvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 6);

    const group = new THREE.Group();
    scene.add(group);

    const geometry = new THREE.IcosahedronGeometry(1.6, 8);
    const material = new THREE.PointsMaterial({
      color: "#111111",
      size: 0.018,
      transparent: true,
      opacity: 0.7
    });
    const points = new THREE.Points(geometry, material);
    group.add(points);

    const wireframe = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.9, 1)),
      new THREE.LineBasicMaterial({ color: "#9f2a1d", transparent: true, opacity: 0.35 })
    );
    group.add(wireframe);

    const halo = new THREE.Mesh(
      new THREE.RingGeometry(2.2, 2.28, 96),
      new THREE.MeshBasicMaterial({
        color: "#677058",
        transparent: true,
        opacity: 0.12,
        side: THREE.DoubleSide
      })
    );
    halo.rotation.x = Math.PI / 2.6;
    scene.add(halo);

    function resize() {
      const parent = currentCanvas.parentElement;
      if (!parent) return;
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    resize();
    window.addEventListener("resize", resize);

    let frame = 0;

    function animate() {
      frame = window.requestAnimationFrame(animate);
      if (!reduceMotion) {
        group.rotation.y += 0.0024;
        group.rotation.x = Math.sin(Date.now() * 0.00025) * 0.12;
        halo.rotation.z += 0.0015;
      }
      renderer.render(scene, camera);
    }

    animate();

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      geometry.dispose();
      material.dispose();
      wireframe.geometry.dispose();
      (wireframe.material as THREE.Material).dispose();
      halo.geometry.dispose();
      (halo.material as THREE.Material).dispose();
      renderer.dispose();
    };
  }, [reduceMotion]);

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />;
}
