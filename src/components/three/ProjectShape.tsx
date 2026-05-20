"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles, Stars, Torus } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import type { Group, Mesh } from "three";
import { Vector3 } from "three";

export type ShapeKind = "globe" | "shield" | "brain" | "aegis" | "graph" | "team";

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

function NeuralAegis() {
  const outerRef = useRef<Mesh>(null);
  const coreRef = useRef<Mesh>(null);
  const ringRef = useRef<Mesh>(null);
  useFrame((_, dt) => {
    if (outerRef.current) outerRef.current.rotation.y += dt * 0.25;
    if (outerRef.current) outerRef.current.rotation.x += dt * 0.1;
    if (coreRef.current) coreRef.current.rotation.y -= dt * 0.6;
    if (ringRef.current) ringRef.current.rotation.z += dt * 0.5;
  });
  return (
    <group>
      <mesh ref={outerRef}>
        <dodecahedronGeometry args={[1.7, 0]} />
        <meshStandardMaterial
          color="#fb923c"
          wireframe
          emissive="#f97316"
          emissiveIntensity={0.6}
        />
      </mesh>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshStandardMaterial
          color="#7c2d12"
          emissive="#f59e0b"
          emissiveIntensity={1.1}
          roughness={0.35}
          metalness={0.6}
        />
      </mesh>
      <mesh ref={ringRef}>
        <torusGeometry args={[2.1, 0.025, 12, 80]} />
        <meshStandardMaterial
          color="#fde68a"
          emissive="#f59e0b"
          emissiveIntensity={0.8}
        />
      </mesh>
      {/* threat pulses caught at the perimeter */}
      {[
        [1.9, 0.6, 0.3],
        [-1.7, 0.4, -0.6],
        [0.5, -2.0, 0.4],
        [-0.6, 1.8, 0.7],
        [1.4, -0.8, -1.1],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]}>
          <tetrahedronGeometry args={[0.12, 0]} />
          <meshStandardMaterial
            color="#fca5a5"
            emissive="#ef4444"
            emissiveIntensity={1.3}
          />
        </mesh>
      ))}
    </group>
  );
}

function ExploitGraph() {
  const ref = useRef<Group>(null);
  // fixed node positions = a 5-node directed graph
  const nodes = useMemo<[number, number, number][]>(
    () => [
      [-1.7, 1.2, 0.2],
      [0.0, 1.6, -0.6],
      [1.7, 0.7, 0.4],
      [-0.6, -0.6, 0.5],
      [1.0, -1.6, -0.3],
    ],
    [],
  );
  // edges as index pairs; the last one is the "exploit path" (highlighted)
  const edges: [number, number, boolean][] = [
    [0, 1, false],
    [1, 2, false],
    [0, 3, false],
    [2, 4, false],
    [3, 4, true], // privilege escalation chain
    [1, 3, true],
  ];
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.25;
  });
  return (
    <group ref={ref}>
      {nodes.map((p, i) => (
        <mesh key={`n-${i}`} position={p}>
          <sphereGeometry args={[0.2, 20, 20]} />
          <meshStandardMaterial
            color="#a5b4fc"
            emissive="#6366f1"
            emissiveIntensity={1}
          />
        </mesh>
      ))}
      {edges.map(([a, b, hot], i) => {
        const start = new Vector3(...nodes[a]);
        const end = new Vector3(...nodes[b]);
        const mid = start.clone().add(end).multiplyScalar(0.5);
        const dir = end.clone().sub(start);
        const len = dir.length();
        // align cylinder (default Y axis) to dir
        const axis = new Vector3(0, 1, 0);
        const quat = dir.clone().normalize();
        const angle = Math.acos(axis.dot(quat));
        const cross = axis.clone().cross(quat).normalize();
        return (
          <mesh
            key={`e-${i}`}
            position={mid.toArray()}
            quaternion={[
              cross.x * Math.sin(angle / 2),
              cross.y * Math.sin(angle / 2),
              cross.z * Math.sin(angle / 2),
              Math.cos(angle / 2),
            ]}
          >
            <cylinderGeometry args={[0.025, 0.025, len, 8]} />
            <meshStandardMaterial
              color={hot ? "#fca5a5" : "#818cf8"}
              emissive={hot ? "#ef4444" : "#4f46e5"}
              emissiveIntensity={hot ? 1.2 : 0.5}
            />
          </mesh>
        );
      })}
      {/* faint enclosing wire-sphere = the IAM "blast radius" */}
      <mesh>
        <sphereGeometry args={[2.2, 18, 14]} />
        <meshStandardMaterial
          color="#312e81"
          wireframe
          emissive="#4338ca"
          emissiveIntensity={0.25}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}

function TeamMesh() {
  const ref = useRef<Group>(null);
  const ringRef = useRef<Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.3;
    if (ringRef.current) ringRef.current.rotation.x += dt * 0.4;
  });
  // 6 employee nodes around a central hub
  const seats = useMemo<[number, number, number][]>(() => {
    const r = 1.7;
    return Array.from({ length: 6 }, (_, i) => {
      const t = (i / 6) * Math.PI * 2;
      return [Math.cos(t) * r, Math.sin(t * 1.2) * 0.5, Math.sin(t) * r];
    });
  }, []);
  return (
    <group ref={ref}>
      {/* central org hub */}
      <mesh>
        <torusKnotGeometry args={[0.55, 0.18, 96, 16]} />
        <meshStandardMaterial
          color="#f9a8d4"
          emissive="#ec4899"
          emissiveIntensity={0.9}
          roughness={0.4}
          metalness={0.4}
        />
      </mesh>
      {/* ring of people seats */}
      {seats.map((p, i) => (
        <group key={i} position={p}>
          {/* "head" */}
          <mesh position={[0, 0.22, 0]}>
            <sphereGeometry args={[0.18, 20, 20]} />
            <meshStandardMaterial
              color="#fbcfe8"
              emissive="#f472b6"
              emissiveIntensity={0.9}
            />
          </mesh>
          {/* "body" */}
          <mesh>
            <coneGeometry args={[0.18, 0.32, 16]} />
            <meshStandardMaterial
              color="#be185d"
              emissive="#db2777"
              emissiveIntensity={0.5}
              roughness={0.5}
            />
          </mesh>
          {/* spoke from hub */}
          <mesh position={[-p[0] / 2 - 0.05, -p[1] / 2, -p[2] / 2]}>
            <boxGeometry
              args={[
                Math.hypot(p[0], p[1], p[2]) - 0.6,
                0.02,
                0.02,
              ]}
            />
            <meshStandardMaterial
              color="#fbcfe8"
              emissive="#f472b6"
              emissiveIntensity={0.5}
              transparent
              opacity={0.7}
            />
          </mesh>
        </group>
      ))}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.15, 0.018, 16, 96]} />
        <meshStandardMaterial
          color="#f9a8d4"
          emissive="#ec4899"
          emissiveIntensity={0.6}
        />
      </mesh>
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
          {kind === "aegis" && <NeuralAegis />}
          {kind === "graph" && <ExploitGraph />}
          {kind === "team" && <TeamMesh />}
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
