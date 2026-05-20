"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { FiMail, FiGithub, FiArrowUpRight } from "react-icons/fi";

const EarthGlobe = dynamic(() => import("./three/EarthGlobe"), {
  ssr: false,
  loading: () => null,
});

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto max-w-6xl px-6 py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="glass relative overflow-hidden rounded-3xl"
      >
        <div className="grid items-center gap-0 md:grid-cols-5">
          {/* 3D globe */}
          <div className="relative h-72 w-full md:col-span-2 md:h-[420px]">
            <EarthGlobe />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent to-slate-950/40" />
          </div>

          {/* text + ctas */}
          <div className="relative px-8 pb-16 pt-8 text-center md:col-span-3 md:px-12 md:py-16 md:text-left">
            <div className="pointer-events-none absolute -top-32 right-0 h-72 w-72 rounded-full bg-gradient-to-br from-cyan-500/30 to-violet-500/30 blur-3xl" />

            <p className="text-xs uppercase tracking-[0.4em] text-cyan-400">
              Contact
            </p>
            <h2 className="mt-4 text-4xl font-bold md:text-5xl">
              Let&apos;s build something{" "}
              <span className="gradient-text">together</span>
            </h2>
            <p className="mt-6 max-w-xl text-balance text-slate-400">
              Have a security, AI, or governance product in mind? We&apos;d
              love to hear what you&apos;re working on.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 md:justify-start">
              <a
                href="mailto:info@toshiconsulting.com"
                className="glow-cyan inline-flex items-center gap-2 rounded-full bg-cyan-500/15 px-6 py-3 text-sm font-medium text-cyan-100 ring-1 ring-cyan-400/30 transition hover:bg-cyan-500/25"
              >
                <FiMail /> info@toshiconsulting.com
                <FiArrowUpRight />
              </a>
              <a
                href="https://github.com/Toshi-Consulting-Services"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-6 py-3 text-sm text-slate-200 transition hover:border-violet-400 hover:text-violet-300"
              >
                <FiGithub /> Toshi-Consulting-Services
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
