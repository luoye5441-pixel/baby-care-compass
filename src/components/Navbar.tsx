import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between px-5 py-4">
        <a href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm">
            宝
          </span>
          宝贝健康
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          <a href="#health-form" className="text-muted-foreground hover:text-foreground transition-colors">健康评估</a>
          <a href="#allergens" className="text-muted-foreground hover:text-foreground transition-colors">过敏管理</a>
          <button className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
            开始使用
          </button>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/50 px-5 py-4 space-y-3 bg-background">
          <a href="#health-form" className="block text-muted-foreground" onClick={() => setOpen(false)}>健康评估</a>
          <a href="#allergens" className="block text-muted-foreground" onClick={() => setOpen(false)}>过敏管理</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
