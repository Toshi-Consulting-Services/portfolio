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
        <p className="mx-auto mt-6 max-w-xl text-balance text-slate-400">
          16 tools we ship with — laid out as a honeycomb. Hover any tile to
          spin it. Drag the empty space to orbit the whole grid.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9 }}
        className="glass relative h-[600px] overflow-hidden rounded-3xl md:h-[680px]"
      >
        {/* warm radial glow behind the scene so balls don't blend into pure black */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, rgba(34,211,238,0.18), rgba(139,92,246,0.10) 35%, transparent 65%)",
          }}
        />
        <SkillsScene />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-slate-950/30" />
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-slate-500">
          hover to spin · drag to orbit
        </div>
      </motion.div>
    </section>
  );
}
