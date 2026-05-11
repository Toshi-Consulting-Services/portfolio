"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Icosahedron, Sparkles } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Mesh } from "three";

function WireframeCore() {
  const ref = useRef<Mesh>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.x += dt * 0.08;
    ref.current.rotation.y += dt * 0.12;
  });
  return (
    <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.6}>
      <Icosahedron ref={ref} args={[1.8, 1]}>
        <meshStandardMaterial
          color="#a78bfa"
          wireframe
          transparent
          opacity={0.6}
          emissive="#7c3aed"
          emissiveIntensity={0.4}
        />
      </Icosahedron>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#22d3ee" />
        <pointLight position={[-5, -5, -5]} intensity={0.7} color="#8b5cf6" />

        <Stars
          radius={70}
          depth={60}
          count={2200}
          factor={3}
          saturation={0}
          fade
          speed={0.4}
        />
        <Sparkles
          count={40}
          scale={10}
          size={1.6}
          speed={0.25}
          color="#67e8f9"
          opacity={0.5}
        />

        <WireframeCore />
      </Suspense>
    </Canvas>
  );
}
