"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <a
          href="#home"
          className="glass rounded-full px-4 py-2 text-sm font-semibold tracking-wide text-slate-100"
        >
          <span className="gradient-text">TCS</span>
          <span className="ml-2 text-slate-400">/ sentinel</span>
        </a>

        <ul className="glass hidden items-center gap-1 rounded-full px-2 py-1.5 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-4 py-1.5 text-xs uppercase tracking-widest text-slate-300 transition hover:bg-white/5 hover:text-cyan-300"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="glass hidden rounded-full px-4 py-2 text-xs uppercase tracking-widest text-cyan-200 transition hover:bg-cyan-500/10 md:inline-block"
        >
          Hire us
        </a>
      </div>
    </motion.nav>
  );
}
