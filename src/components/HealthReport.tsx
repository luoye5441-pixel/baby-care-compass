import { motion } from "framer-motion";
import type { BabyData } from "./HealthForm";
import type { HealthReport as Report } from "@/lib/healthUtils";

interface Props {
  data: BabyData;
  report: Report;
}

const ScoreRing = ({ score, label }: { score: number; label: string }) => {
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 85 ? "hsl(var(--mint))" : score >= 60 ? "hsl(var(--apricot))" : "hsl(var(--destructive))";

  return (
    <div className="relative w-32 h-32">
      <svg width="128" height="128" className="transform -rotate-90">
        <circle cx="64" cy="64" r="52" stroke="hsl(var(--muted))" strokeWidth="8" fill="none" />
        <motion.circle
          cx="64" cy="64" r="52"
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          strokeDasharray={circumference}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold">{score}</span>
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
    </div>
  );
};

const MetricCard = ({ label, value, normal }: { label: string; value: string; normal: boolean }) => (
  <div className={`rounded-2xl p-4 text-center ${normal ? "gradient-mint" : "gradient-coral"}`}>
    <div className="text-xs text-muted-foreground mb-1">{label}</div>
    <div className="text-base font-semibold">{value}</div>
  </div>
);

const HealthReportView = ({ data, report }: Props) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="section-cool py-16 md:py-24 px-6"
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-mint-light text-primary mb-3">
            评估报告
          </span>
          <h2 className="text-2xl font-bold mb-1">{data.name} 的健康报告</h2>
          <p className="text-sm text-muted-foreground">
            {data.ageYears}岁{data.ageMonths > 0 ? `${data.ageMonths}个月` : ""} · {data.gender === "male" ? "男宝" : "女宝"} · {data.height}cm · {data.weight}kg
          </p>
        </div>

        {/* Score */}
        <div className="card-elevated p-8 flex flex-col items-center mb-5">
          <ScoreRing score={report.overallScore} label={report.overallLabel} />
          <p className="text-sm text-muted-foreground mt-4">综合健康评分</p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          <MetricCard label="身高评估" value={report.heightStatus} normal={report.heightStatus === "正常"} />
          <MetricCard label="体重评估" value={report.weightStatus} normal={report.weightStatus === "正常"} />
          <MetricCard label="BMI状态" value={report.bmiStatus} normal={report.bmiStatus === "正常"} />
          <div className="rounded-2xl p-4 text-center bg-card border border-border/40">
            <div className="text-xs text-muted-foreground mb-1">BMI 值</div>
            <div className="text-base font-semibold">{report.bmi.toFixed(1)}</div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="card-elevated p-6 md:p-7 mb-5">
          <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-mint-light flex items-center justify-center text-sm font-bold text-primary">建</span>
            健康建议
          </h3>
          <div className="space-y-3">
            {report.suggestions.map((s, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-foreground/75 leading-relaxed">{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Nutrition */}
        <div className="card-elevated p-6 md:p-7">
          <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-coral-light flex items-center justify-center text-sm font-bold text-secondary">营</span>
            营养方案
          </h3>
          <div className="space-y-3">
            {report.nutritionTips.map((t, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <span className="w-5 h-5 rounded-full bg-secondary/15 text-secondary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-foreground/75 leading-relaxed">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default HealthReportView;
