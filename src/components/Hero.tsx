"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { FiArrowDown, FiGithub, FiMail } from "react-icons/fi";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-screen w-full overflow-hidden"
    >
      <HeroScene />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass mb-6 rounded-full px-5 py-2 text-xs uppercase tracking-[0.3em] text-cyan-200"
        >
          AI · Security · Governance
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="text-balance text-5xl font-bold leading-tight md:text-7xl"
        >
          <span className="gradient-text">Toshi Consulting</span>
          <br />
          <span className="text-slate-100">Services</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="mt-6 max-w-2xl text-balance text-base text-slate-300 md:text-lg"
        >
          We build AI-powered platforms for security, governance, and
          assessment — shipped as production-grade products on the{" "}
          <span className="text-cyan-300">sentinal-ai.in</span> stack.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="glass glow-cyan rounded-full px-6 py-3 text-sm font-medium text-cyan-100 transition hover:bg-cyan-500/10"
          >
            See Our Work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-slate-700 px-6 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
          >
            <span className="inline-flex items-center gap-2">
              <FiMail /> Get in Touch
            </span>
          </a>
          <a
            href="https://github.com/Toshi-Consulting-Services"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-slate-700 p-3 text-slate-200 transition hover:border-violet-400 hover:text-violet-300"
            aria-label="GitHub"
          >
            <FiGithub />
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.5, duration: 1 },
          y: { repeat: Infinity, duration: 2 },
        }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-slate-400 hover:text-cyan-300"
        aria-label="Scroll down"
      >
        <FiArrowDown size={24} />
      </motion.a>
    </section>
  );
}
