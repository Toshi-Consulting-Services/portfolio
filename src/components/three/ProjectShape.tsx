"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles, Stars, Torus } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Group, Mesh } from "three";

export type ShapeKind = "globe" | "shield" | "brain";

function GovernanceGlobe() {
  const ref = useRef<Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.35;
  });
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[1.4, 32, 20]} />
        <meshStandardMaterial
          color="#22d3ee"
          wireframe
          emissive="#0891b2"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.7, 48, 48]} />
        <meshStandardMaterial
          color="#0e7490"
          emissive="#22d3ee"
          emissiveIntensity={0.9}
          roughness={0.5}
        />
      </mesh>
      <Torus args={[1.9, 0.025, 16, 96]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          color="#67e8f9"
          emissive="#22d3ee"
          emissiveIntensity={0.7}
        />
      </Torus>
      <Torus args={[2.25, 0.018, 16, 96]} rotation={[Math.PI / 2.4, 0.4, 0]}>
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#7c3aed"
          emissiveIntensity={0.6}
        />
      </Torus>
      {/* data pin dots */}
      {[
        [1.35, 0.5, 0.3],
        [-1.2, 0.6, 0.4],
        [0.7, -1.2, 0.5],
        [-0.7, -1.1, -0.4],
        [1.1, 1.0, -0.5],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#f0abfc"
            emissive="#f0abfc"
            emissiveIntensity={1.2}
          />
        </mesh>
      ))}
    </group>
  );
}

function SecurityShield() {
  const ref = useRef<Mesh>(null);
  const ringRef = useRef<Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.45;
    if (ringRef.current) ringRef.current.rotation.z -= dt * 0.3;
  });
  return (
    <group>
      <mesh ref={ref}>
        <octahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#7c3aed"
          emissiveIntensity={0.7}
          roughness={0.25}
          metalness={0.75}
        />
      </mesh>
      <mesh ref={ringRef}>
        <torusGeometry args={[2, 0.05, 16, 96]} />
        <meshStandardMaterial
          color="#f0abfc"
          emissive="#a78bfa"
          emissiveIntensity={0.9}
        />
      </mesh>
      {/* orbiting key/lock cubes */}
      {[
        [2.2, 0.5, 0],
        [-2.0, -0.6, 0.3],
        [0.4, 2.1, -0.4],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]}>
          <boxGeometry args={[0.16, 0.16, 0.16]} />
          <meshStandardMaterial
            color="#67e8f9"
            emissive="#67e8f9"
            emissiveIntensity={1}
          />
        </mesh>
      ))}
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
      <mesh>
        <icosahedronGeometry args={[1.3, 1]} />
        <meshStandardMaterial
          color="#34d399"
          wireframe
          emissive="#10b981"
          emissiveIntensity={0.6}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.75, 0]} />
        <meshStandardMaterial
          color="#065f46"
          emissive="#10b981"
          emissiveIntensity={0.9}
        />
      </mesh>
      {[
        [2, 0.8, 0.5],
        [-1.9, 0.6, -0.4],
        [1.0, -1.8, 0.6],
        [-0.9, -1.6, -0.7],
        [1.7, 1.4, -0.9],
        [-1.6, -0.3, 1.2],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]}>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshStandardMaterial
            color="#6ee7b7"
            emissive="#34d399"
            emissiveIntensity={1}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ProjectShape({ kind }: { kind: ShapeKind }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[4, 4, 4]} intensity={1.3} color="#a78bfa" />
        <pointLight position={[-4, -4, -4]} intensity={0.9} color="#22d3ee" />
        <pointLight position={[0, 3, 0]} intensity={0.6} color="#f0abfc" />

        <Stars
          radius={30}
          depth={20}
          count={800}
          factor={2}
          saturation={0}
          fade
          speed={0.4}
        />
        <Sparkles
          count={40}
          scale={7}
          size={1.8}
          speed={0.35}
          color="#67e8f9"
          opacity={0.65}
        />

        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
          {kind === "globe" && <GovernanceGlobe />}
          {kind === "shield" && <SecurityShield />}
          {kind === "brain" && <BrainNetwork />}
        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.4}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Suspense>
    </Canvas>
  );
}
