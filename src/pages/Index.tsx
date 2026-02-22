import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BentoFeatures from "@/components/BentoFeatures";
import HealthForm, { type BabyData } from "@/components/HealthForm";
import HealthReportView from "@/components/HealthReport";
import AllergenReminder from "@/components/AllergenReminder";
import { generateReport, type HealthReport } from "@/lib/healthUtils";

const Index = () => {
  const [report, setReport] = useState<{ data: BabyData; report: HealthReport } | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleStart = () => {
    document.getElementById("health-form")?.scrollIntoView({ behavior: "smooth" });
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
      <div ref={reportRef}>
        {report && <HealthReportView data={report.data} report={report.report} />}
      </div>
      <AllergenReminder />

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/40">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-sm">🌱</span>
            <span className="font-semibold text-sm">宝贝健康</span>
          </div>
          <p className="text-xs text-muted-foreground mb-1">© 2026 宝贝健康 · 守护每一步成长</p>
          <p className="text-xs text-muted-foreground/60">数据仅供参考，如有健康问题请咨询专业医生</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
