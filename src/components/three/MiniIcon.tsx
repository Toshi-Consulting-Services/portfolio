"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Mesh } from "three";

type IconKind = "shield" | "cpu" | "bolt";

function ShieldIcon() {
  const ref = useRef<Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.8;
  });
  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#22d3ee"
        emissive="#0891b2"
        emissiveIntensity={0.6}
        roughness={0.3}
        metalness={0.6}
      />
    </mesh>
  );
}

function CpuIcon() {
  const ref = useRef<Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.x += dt * 0.4;
      ref.current.rotation.y += dt * 0.6;
    }
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[1.1, 1.1, 1.1]} />
      <meshStandardMaterial
        color="#a78bfa"
        emissive="#7c3aed"
        emissiveIntensity={0.5}
        wireframe
      />
    </mesh>
  );
}

function BoltIcon() {
  const ref = useRef<Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.z += dt * 0.7;
  });
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[0.7, 0.22, 96, 16]} />
      <meshStandardMaterial
        color="#f0abfc"
        emissive="#a78bfa"
        emissiveIntensity={0.6}
        roughness={0.4}
        metalness={0.5}
      />
    </mesh>
  );
}

export default function MiniIcon({ kind }: { kind: IconKind }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.4], fov: 45 }}
      dpr={[1, 1.3]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <pointLight position={[3, 3, 3]} intensity={1.5} color="#67e8f9" />
        <pointLight position={[-3, -2, -2]} intensity={0.8} color="#a78bfa" />
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
          {kind === "shield" && <ShieldIcon />}
          {kind === "cpu" && <CpuIcon />}
          {kind === "bolt" && <BoltIcon />}
        </Float>
      </Suspense>
    </Canvas>
  );
}
