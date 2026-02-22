import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/30">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center">
          <span className="font-display text-lg font-semibold tracking-tight">品牌策略</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-t border-border/30 px-6 py-4 space-y-1">
          {[
            { href: "#services", label: "服务" },
            { href: "#process", label: "流程" },
            { href: "#contact", label: "联系" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
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
