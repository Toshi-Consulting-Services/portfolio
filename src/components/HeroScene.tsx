"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, OrbitControls, Icosahedron } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Mesh } from "three";

function SpinningCore() {
  const ref = useRef<Mesh>(null);

  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.x += dt * 0.15;
    ref.current.rotation.y += dt * 0.2;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <Icosahedron ref={ref} args={[1.6, 1]}>
        <meshStandardMaterial
          color="#22d3ee"
          wireframe
          emissive="#8b5cf6"
          emissiveIntensity={0.4}
        />
      </Icosahedron>
    </Float>
  );
}

function OrbitingNode({
  radius,
  speed,
  color,
  size = 0.18,
  offset = 0,
}: {
  radius: number;
  speed: number;
  color: string;
  size?: number;
  offset?: number;
}) {
  const ref = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed + offset;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 0.6) * 0.4;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 24, 24]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
      />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#22d3ee" />
        <pointLight position={[-5, -5, -5]} intensity={0.8} color="#8b5cf6" />

        <Stars
          radius={60}
          depth={50}
          count={3500}
          factor={3}
          saturation={0}
          fade
          speed={0.6}
        />

        <SpinningCore />
        <OrbitingNode radius={3} speed={0.6} color="#22d3ee" />
        <OrbitingNode radius={3.6} speed={0.45} color="#a78bfa" offset={2} />
        <OrbitingNode radius={2.6} speed={0.8} color="#f0abfc" offset={4} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.6}
        />
      </Suspense>
    </Canvas>
  );
}
