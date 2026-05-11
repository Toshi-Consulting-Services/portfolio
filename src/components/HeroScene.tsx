"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Stars,
  OrbitControls,
  Icosahedron,
  Sparkles,
  Torus,
} from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Group, Mesh } from "three";

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

function RingedPlanet() {
  const ref = useRef<Group>(null);

  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.15;
  });

  return (
    <group ref={ref} position={[3.5, -1.5, -2]} rotation={[0.4, 0, 0.3]}>
      <mesh>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#7c3aed"
          emissiveIntensity={0.4}
          roughness={0.6}
        />
      </mesh>
      <Torus args={[0.95, 0.04, 16, 80]} rotation={[Math.PI / 2.2, 0, 0]}>
        <meshStandardMaterial
          color="#f0abfc"
          emissive="#a78bfa"
          emissiveIntensity={0.6}
        />
      </Torus>
      <Torus args={[1.15, 0.02, 16, 80]} rotation={[Math.PI / 2.2, 0, 0]}>
        <meshStandardMaterial
          color="#67e8f9"
          emissive="#22d3ee"
          emissiveIntensity={0.5}
        />
      </Torus>
    </group>
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
        <pointLight position={[0, 3, 2]} intensity={0.6} color="#f0abfc" />

        <Stars
          radius={60}
          depth={50}
          count={4500}
          factor={3}
          saturation={0}
          fade
          speed={0.6}
        />

        <Sparkles
          count={80}
          scale={10}
          size={2}
          speed={0.3}
          color="#67e8f9"
          opacity={0.7}
        />

        <SpinningCore />
        <RingedPlanet />
        <OrbitingNode radius={3} speed={0.6} color="#22d3ee" />
        <OrbitingNode radius={3.6} speed={0.45} color="#a78bfa" offset={2} />
        <OrbitingNode radius={2.6} speed={0.8} color="#f0abfc" offset={4} />
        <OrbitingNode
          radius={4.2}
          speed={0.35}
          color="#67e8f9"
          offset={1}
          size={0.12}
        />
        <OrbitingNode
          radius={2}
          speed={1.1}
          color="#fde68a"
          offset={3}
          size={0.1}
        />

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
