"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Torus } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Group, Mesh } from "three";

export type ShapeKind = "globe" | "shield" | "brain";

function GovernanceGlobe() {
  const ref = useRef<Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.4;
  });
  return (
    <group ref={ref}>
      {/* wireframe globe */}
      <mesh>
        <sphereGeometry args={[1.1, 24, 16]} />
        <meshStandardMaterial
          color="#22d3ee"
          wireframe
          emissive="#0891b2"
          emissiveIntensity={0.4}
        />
      </mesh>
      {/* glowing core */}
      <mesh>
        <sphereGeometry args={[0.5, 24, 24]} />
        <meshStandardMaterial
          color="#0e7490"
          emissive="#22d3ee"
          emissiveIntensity={0.8}
        />
      </mesh>
      {/* orbit ring 1 */}
      <Torus args={[1.5, 0.02, 16, 80]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          color="#67e8f9"
          emissive="#22d3ee"
          emissiveIntensity={0.6}
        />
      </Torus>
      <Torus args={[1.8, 0.015, 16, 80]} rotation={[Math.PI / 2.5, 0.3, 0]}>
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#7c3aed"
          emissiveIntensity={0.5}
        />
      </Torus>
    </group>
  );
}

function SecurityShield() {
  const ref = useRef<Mesh>(null);
  const ringRef = useRef<Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.5;
    if (ringRef.current) ringRef.current.rotation.z -= dt * 0.3;
  });
  return (
    <group>
      <mesh ref={ref}>
        {/* octahedron acts as a stylized shield/diamond */}
        <octahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#7c3aed"
          emissiveIntensity={0.6}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
      <mesh ref={ringRef}>
        <torusGeometry args={[1.6, 0.04, 16, 80]} />
        <meshStandardMaterial
          color="#f0abfc"
          emissive="#a78bfa"
          emissiveIntensity={0.8}
        />
      </mesh>
      {/* small orbiting locks (cubes) */}
      <mesh position={[1.8, 0.4, 0]}>
        <boxGeometry args={[0.15, 0.15, 0.15]} />
        <meshStandardMaterial
          color="#f0abfc"
          emissive="#f0abfc"
          emissiveIntensity={0.9}
        />
      </mesh>
      <mesh position={[-1.6, -0.5, 0.2]}>
        <boxGeometry args={[0.12, 0.12, 0.12]} />
        <meshStandardMaterial
          color="#67e8f9"
          emissive="#67e8f9"
          emissiveIntensity={0.9}
        />
      </mesh>
    </group>
  );
}

function BrainNetwork() {
  const ref = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.3;
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.4) * 0.15;
  });
  return (
    <group ref={ref}>
      {/* central icosahedron = brain */}
      <mesh>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#34d399"
          wireframe
          emissive="#10b981"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial
          color="#065f46"
          emissive="#10b981"
          emissiveIntensity={0.7}
        />
      </mesh>
      {/* synapse nodes around the brain */}
      {[
        [1.6, 0.6, 0.4],
        [-1.5, 0.5, -0.3],
        [0.8, -1.4, 0.5],
        [-0.7, -1.2, -0.6],
        [1.3, 1.1, -0.7],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color="#6ee7b7"
            emissive="#34d399"
            emissiveIntensity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ProjectShape({ kind }: { kind: ShapeKind }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 3, 3]} intensity={1.2} color="#a78bfa" />
        <pointLight position={[-3, -3, -3]} intensity={0.8} color="#22d3ee" />

        <Sparkles
          count={30}
          scale={5}
          size={1.5}
          speed={0.4}
          color="#67e8f9"
          opacity={0.6}
        />

        <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
          {kind === "globe" && <GovernanceGlobe />}
          {kind === "shield" && <SecurityShield />}
          {kind === "brain" && <BrainNetwork />}
        </Float>
      </Suspense>
    </Canvas>
  );
}
