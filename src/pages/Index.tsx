import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesGrid from "@/components/FeaturesGrid";
import HealthForm, { type BabyData } from "@/components/HealthForm";
import HealthReportView from "@/components/HealthReport";
import AllergenReminder from "@/components/AllergenReminder";
import { generateReport, type HealthReport } from "@/lib/healthUtils";

const Index = () => {
  const [report, setReport] = useState<{ data: BabyData; report: HealthReport } | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const handleStart = () => {
    document.getElementById("health-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (data: BabyData) => {
    const r = generateReport(data);
    setReport({ data, report: r });
    window.scrollTo({ top: (formRef.current?.offsetTop ?? 0) + 400, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection onStart={handleStart} />
      <FeaturesGrid />
      <div ref={formRef}>
        <HealthForm onSubmit={handleSubmit} />
      </div>
      {report && <HealthReportView data={report.data} report={report.report} />}
      <div id="allergens">
        <AllergenReminder />
      </div>

      {/* Footer */}
      <footer className="section-padding border-t border-border/50">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2026 宝贝健康 · 守护每一步成长</p>
          <p className="mt-1 text-xs">数据仅供参考，如有健康问题请咨询专业医生</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
