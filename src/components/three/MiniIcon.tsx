"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Sparkles,
} from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Group, Mesh } from "three";

type IconKind = "shield" | "cpu" | "bolt";

/**
 * 01 — Security: solid glowing core wrapped in a counter-rotating
 * wireframe icosphere "cage". Reads as protected, contained energy.
 */
function CagedCore() {
  const inner = useRef<Mesh>(null);
  const outer = useRef<Mesh>(null);

  useFrame((_, dt) => {
    if (inner.current) inner.current.rotation.y += dt * 0.35;
    if (outer.current) {
      outer.current.rotation.y -= dt * 0.25;
      outer.current.rotation.x += dt * 0.18;
    }
  });

  return (
    <group>
      <mesh ref={inner}>
        <sphereGeometry args={[0.55, 48, 48]} />
        <meshStandardMaterial
          color="#67e8f9"
          emissive="#22d3ee"
          emissiveIntensity={0.9}
          roughness={0.25}
          metalness={0.55}
        />
      </mesh>
      <mesh ref={outer}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshStandardMaterial
          color="#22d3ee"
          wireframe
          transparent
          opacity={0.55}
          emissive="#0891b2"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

/**
 * 02 — AI: an organic morphing blob using MeshDistortMaterial.
 * Surface ripples slowly like a living thing.
 */
function MorphingCore() {
  const ref = useRef<Mesh>(null);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.22;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.95, 64, 64]} />
      <MeshDistortMaterial
        color="#a78bfa"
        distort={0.42}
        speed={1.6}
        roughness={0.25}
        metalness={0.65}
        emissive="#7c3aed"
        emissiveIntensity={0.45}
      />
    </mesh>
  );
}

/**
 * 03 — Production: a polished metallic gem. Low roughness + high
 * metalness gives a chrome-jewel finish. Spins on two axes.
 */
function PolishedGem() {
  const groupRef = useRef<Group>(null);
  const haloRef = useRef<Mesh>(null);

  useFrame((_, dt) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += dt * 0.45;
      groupRef.current.rotation.x += dt * 0.2;
    }
    if (haloRef.current) {
      haloRef.current.rotation.z += dt * 0.25;
    }
  });

  return (
    <group ref={groupRef}>
      {/* polished gem */}
      <mesh>
        <icosahedronGeometry args={[1.0, 0]} />
        <meshStandardMaterial
          color="#f0abfc"
          roughness={0.12}
          metalness={0.95}
          emissive="#c026d3"
          emissiveIntensity={0.35}
        />
      </mesh>
      {/* halo ring */}
      <mesh ref={haloRef} rotation={[Math.PI / 2.3, 0.4, 0]}>
        <torusGeometry args={[1.3, 0.018, 16, 64]} />
        <meshStandardMaterial
          color="#f0abfc"
          emissive="#f0abfc"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
}

export default function MiniIcon({ kind }: { kind: IconKind }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.3], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.55} />
        <pointLight position={[3, 3, 3]} intensity={1.5} color="#67e8f9" />
        <pointLight position={[-3, -2, -2]} intensity={0.9} color="#a78bfa" />
        <pointLight position={[0, 2, 4]} intensity={0.8} color="#ffffff" />

        <Sparkles
          count={18}
          scale={3}
          size={1.4}
          speed={0.35}
          color="#ffffff"
          opacity={0.5}
        />

        <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.45}>
          {kind === "shield" && <CagedCore />}
          {kind === "cpu" && <MorphingCore />}
          {kind === "bolt" && <PolishedGem />}
        </Float>
      </Suspense>
    </Canvas>
  );
}
