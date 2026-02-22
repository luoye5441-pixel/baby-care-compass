import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BentoFeatures from "@/components/BentoFeatures";

import HealthForm, { type BabyData } from "@/components/HealthForm";
import { generateReport, type HealthReport } from "@/lib/healthUtils";

const Index = () => {
  const [report, setReport] = useState<{ data: BabyData; report: HealthReport } | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleStart = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (data: BabyData) => {
    const r = generateReport(data);
    setReport({ data, report: r });
    setTimeout(() => {
      reportRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection onStart={handleStart} />
      <BentoFeatures />
      
      <HealthForm onSubmit={handleSubmit} />

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-border/40">
        <div className="max-w-6xl mx-auto text-center">
          <span className="font-display text-lg font-semibold">品牌策略</span>
          <p className="text-xs text-muted-foreground mt-3 mb-1">© 2026 品牌策略工作室 · 以策略驱动品牌增长</p>
          <p className="text-xs text-muted-foreground/40">Brand Strategy Studio</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
