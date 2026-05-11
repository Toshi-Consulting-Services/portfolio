"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, Stars, Torus } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Group, Mesh } from "three";

function Globe() {
  const groupRef = useRef<Group>(null);
  const dotsRef = useRef<Group>(null);

  useFrame((_, dt) => {
    if (groupRef.current) groupRef.current.rotation.y += dt * 0.18;
    if (dotsRef.current) dotsRef.current.rotation.y -= dt * 0.12;
  });

  return (
    <group ref={groupRef}>
      {/* wireframe outer sphere */}
      <mesh>
        <sphereGeometry args={[2, 36, 24]} />
        <meshStandardMaterial
          color="#22d3ee"
          wireframe
          transparent
          opacity={0.55}
          emissive="#0891b2"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* glowing inner sphere */}
      <mesh>
        <sphereGeometry args={[1.5, 48, 32]} />
        <meshStandardMaterial
          color="#0e7490"
          emissive="#0891b2"
          emissiveIntensity={0.4}
          roughness={0.6}
        />
      </mesh>
      {/* equatorial ring */}
      <Torus args={[2.3, 0.025, 16, 96]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#a78bfa"
          emissiveIntensity={0.8}
        />
      </Torus>
      {/* tilted ring */}
      <Torus args={[2.55, 0.015, 16, 96]} rotation={[Math.PI / 2.5, 0.4, 0]}>
        <meshStandardMaterial
          color="#67e8f9"
          emissive="#22d3ee"
          emissiveIntensity={0.6}
        />
      </Torus>

      {/* satellite/pin dots that counter-rotate */}
      <group ref={dotsRef}>
        {[
          [0, 1.9, 0.6],
          [1.6, 0.4, 1],
          [-1.5, 0.7, 0.9],
          [0.8, -1.7, 0.6],
          [-0.6, -1.6, 1],
          [1.7, 1.1, -0.4],
        ].map((p, i) => (
          <SatelliteDot key={i} position={p as [number, number, number]} />
        ))}
      </group>
    </group>
  );
}

function SatelliteDot({ position }: { position: [number, number, number] }) {
  const ref = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const s = 1 + Math.sin(t * 2 + position[0]) * 0.2;
    ref.current.scale.set(s, s, s);
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial
        color="#f0abfc"
        emissive="#f0abfc"
        emissiveIntensity={1.2}
      />
    </mesh>
  );
}

export default function EarthGlobe() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 3, 5]} intensity={1.4} color="#22d3ee" />
        <pointLight position={[-5, -3, -5]} intensity={0.8} color="#a78bfa" />

        <Stars
          radius={50}
          depth={30}
          count={2000}
          factor={2}
          saturation={0}
          fade
          speed={0.4}
        />
        <Sparkles
          count={50}
          scale={8}
          size={2}
          speed={0.3}
          color="#67e8f9"
          opacity={0.6}
        />

        <Globe />
      </Suspense>
    </Canvas>
  );
}
