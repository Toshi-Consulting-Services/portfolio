"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { FiArrowRight, FiGithub, FiMail } from "react-icons/fi";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => null,
});

const stats = [
  { value: "3", label: "live platforms" },
  { value: "170+", label: "active users" },
  { value: "100%", label: "production-grade" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex h-screen w-full items-center overflow-hidden"
    >
      {/* subtle 3D in background */}
      <HeroScene />

      {/* gentle vignette behind text for readability */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(2,6,23,0.55),transparent_70%)]" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 text-center">
        {/* status pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass mx-auto inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-medium text-emerald-200">
            Available for new engagements
          </span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-400">2026</span>
        </motion.div>

        {/* eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 text-xs font-medium uppercase tracking-[0.5em] text-slate-400 md:text-sm"
        >
          Toshi Consulting Services
        </motion.p>

        {/* hero title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-balance text-5xl font-bold leading-[1.05] tracking-tight text-slate-50 md:text-7xl lg:text-[5.5rem]"
        >
          We build the next layer of{" "}
          <span className="gradient-text">AI-native</span>
          <br className="hidden md:inline" />{" "}
          security & governance platforms.
        </motion.h1>

        {/* subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mx-auto mt-8 max-w-2xl text-balance text-base leading-relaxed text-slate-400 md:text-lg"
        >
          From URBI to Sentinel SCR to Adaptive Assessment AI — production-grade
          AI products, end-to-end, shipped on the{" "}
          <span className="text-cyan-300">sentinal-ai.in</span> stack.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-[0_8px_30px_rgba(255,255,255,0.18)] transition hover:bg-slate-100"
          >
            View our work
            <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/40 px-6 py-3 text-sm font-medium text-slate-200 backdrop-blur transition hover:border-cyan-400/60 hover:text-cyan-200"
          >
            <FiMail /> Get in touch
          </a>
          <a
            href="https://github.com/Toshi-Consulting-Services"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/40 p-3 text-slate-200 backdrop-blur transition hover:border-violet-400/60 hover:text-violet-200"
            aria-label="GitHub organization"
          >
            <FiGithub />
          </a>
        </motion.div>

        {/* stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mx-auto mt-20 flex max-w-2xl items-center justify-center gap-6 md:gap-12"
        >
          {stats.map((s, i) => (
            <div key={s.label} className="flex items-center gap-6 md:gap-12">
              {i > 0 && <div className="h-8 w-px bg-slate-800" />}
              <div className="text-center">
                <div className="text-2xl font-semibold text-slate-100 md:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.25em] text-slate-500 md:text-xs">
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* premium scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <a
          href="#about"
          className="group flex flex-col items-center gap-3"
          aria-label="Scroll down"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-slate-500 transition group-hover:text-cyan-300">
            scroll
          </span>
          <div className="relative h-12 w-px overflow-hidden bg-slate-800">
            <motion.div
              animate={{ y: [-48, 48] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-x-0 h-1/2 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
            />
          </div>
        </a>
      </motion.div>
    </section>
  );
}
