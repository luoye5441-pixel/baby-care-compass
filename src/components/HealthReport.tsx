import { motion } from "framer-motion";
import type { BabyData } from "./HealthForm";
import type { HealthReport as Report } from "@/lib/healthUtils";

interface Props {
  data: BabyData;
  report: Report;
}

const ScoreRing = ({ score, label }: { score: number; label: string }) => {
  const color = score >= 85 ? "hsl(var(--sage))" : score >= 60 ? "hsl(var(--honey))" : "hsl(var(--destructive))";
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width="140" height="140" className="transform -rotate-90">
        <circle cx="70" cy="70" r="54" stroke="hsl(var(--muted))" strokeWidth="10" fill="none" />
        <motion.circle
          cx="70" cy="70" r="54"
          stroke={color}
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          strokeDasharray={circumference}
        />
      </svg>
      <div className="absolute mt-10 flex flex-col items-center">
        <span className="text-3xl font-bold">{score}</span>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
    </div>
  );
};

const StatusBadge = ({ label, value }: { label: string; value: string }) => {
  const isNormal = value === "正常";
  return (
    <div className={`rounded-2xl p-4 text-center ${isNormal ? "gradient-sage" : "gradient-peach"}`}>
      <div className="text-sm text-muted-foreground mb-1">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
};

const HealthReportView = ({ data, report }: Props) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="section-padding"
    >
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">{data.name} 的健康报告</h2>
          <p className="text-muted-foreground">
            {data.ageYears}岁{data.ageMonths > 0 ? `${data.ageMonths}个月` : ""} · {data.gender === "male" ? "男宝" : "女宝"}
          </p>
        </div>

        {/* Score */}
        <div className="glass-card rounded-3xl p-8 mb-6 flex flex-col items-center relative">
          <ScoreRing score={report.overallScore} label={report.overallLabel} />
        </div>

        {/* Status grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatusBadge label="身高" value={report.heightStatus} />
          <StatusBadge label="体重" value={report.weightStatus} />
          <StatusBadge label="BMI" value={report.bmiStatus} />
          <div className="rounded-2xl p-4 text-center bg-muted">
            <div className="text-sm text-muted-foreground mb-1">BMI 值</div>
            <div className="text-lg font-semibold">{report.bmi.toFixed(1)}</div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="glass-card rounded-3xl p-8 mb-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            💡 健康建议
          </h3>
          <ul className="space-y-3">
            {report.suggestions.map((s, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-sage-light flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-foreground/80">{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Nutrition */}
        <div className="glass-card rounded-3xl p-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            🥗 营养建议
          </h3>
          <ul className="space-y-3">
            {report.nutritionTips.map((t, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-peach-light flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-foreground/80">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.section>
  );
};

export default HealthReportView;
