"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const SkillsScene = dynamic(() => import("./three/SkillsScene"), {
  ssr: false,
  loading: () => null,
});

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="mb-12 text-center"
      >
        <p className="text-xs uppercase tracking-[0.4em] text-cyan-400">
          The Stack
        </p>
        <h2 className="mt-4 text-4xl font-bold md:text-5xl">
          What <span className="gradient-text">we build with</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-balance text-slate-400">
          15 floating planets — every one a tool we ship with. Drag to
          orbit, scroll past to keep going.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9 }}
        className="glass relative h-[520px] overflow-hidden rounded-3xl md:h-[600px]"
      >
        <SkillsScene />
        {/* gradient fade for edges */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-slate-950/40" />
        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-slate-500">
          drag to orbit
        </div>
      </motion.div>
    </section>
  );
}
