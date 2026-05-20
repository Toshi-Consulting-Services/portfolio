export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-6 text-xs text-slate-500">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-slate-300">Toshi Consulting Services</span>.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}
