import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-card/70 backdrop-blur-xl border-b border-border/30">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3.5">
        <a href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold shadow-sm">
            🌱
          </div>
          <span className="text-lg font-bold tracking-tight">宝贝健康</span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {[
            { href: "#features", label: "功能特色" },
            { href: "#health-form", label: "健康评估" },
            { href: "#allergens", label: "过敏管理" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-4 py-2 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
            >
              {l.label}
            </a>
          ))}
          <a href="#health-form" className="ml-3 btn-primary text-sm !py-2.5 !px-6">
            开始评估
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-xl hover:bg-muted transition-colors">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-card border-t border-border/30 px-6 py-4 space-y-1">
          {[
            { href: "#features", label: "功能特色" },
            { href: "#health-form", label: "健康评估" },
            { href: "#allergens", label: "过敏管理" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm text-muted-foreground hover:bg-muted transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
