export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-xs text-slate-500 md:flex-row">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-slate-300">Toshi Consulting Services</span>.
          All rights reserved.
        </p>
        <p className="font-mono">
          built with Next.js · Three.js · ❤
        </p>
      </div>
    </footer>
  );
}
