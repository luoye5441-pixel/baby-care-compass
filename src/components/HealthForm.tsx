import { useState } from "react";
import { motion } from "framer-motion";

export interface BabyData {
  name: string;
  gender: "male" | "female";
  ageYears: number;
  ageMonths: number;
  height: number;
  weight: number;
  headCircumference: number;
}

interface Props {
  onSubmit: (data: BabyData) => void;
}

const HealthForm = ({ onSubmit }: Props) => {
  const [form, setForm] = useState<BabyData>({
    name: "",
    gender: "male",
    ageYears: 1,
    ageMonths: 0,
    height: 75,
    weight: 10,
    headCircumference: 46,
  });

  const update = (key: keyof BabyData, value: string | number) =>
    setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <motion.section
      id="health-form"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16 md:py-24 px-6"
    >
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-coral-light text-secondary mb-4">
            健康评估
          </span>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">输入宝宝信息</h2>
          <p className="text-muted-foreground text-sm">填写基本指标，一键生成专业健康报告</p>
        </div>

        <form onSubmit={handleSubmit} className="card-elevated p-6 md:p-8 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">宝宝昵称</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="例如：小糯米"
              className="input-field"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">性别</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "male" as const, label: "👦 男宝", bg: "bg-mint-light border-primary" },
                { value: "female" as const, label: "👧 女宝", bg: "bg-coral-light border-secondary" },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => update("gender", opt.value)}
                  className={`py-3 rounded-2xl border-2 text-sm font-medium transition-all ${
                    form.gender === opt.value
                      ? opt.bg
                      : "bg-card border-border hover:border-muted-foreground/30"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Age */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">年龄（岁）</label>
              <select
                value={form.ageYears}
                onChange={(e) => update("ageYears", Number(e.target.value))}
                className="input-field"
              >
                {Array.from({ length: 8 }, (_, i) => i + 1).map((y) => (
                  <option key={y} value={y}>{y} 岁</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">月龄</label>
              <select
                value={form.ageMonths}
                onChange={(e) => update("ageMonths", Number(e.target.value))}
                className="input-field"
              >
                {Array.from({ length: 12 }, (_, i) => i).map((m) => (
                  <option key={m} value={m}>{m} 个月</option>
                ))}
              </select>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { key: "height" as const, label: "身高 (cm)", min: 50, max: 160, step: "0.1" },
              { key: "weight" as const, label: "体重 (kg)", min: 3, max: 50, step: "0.1" },
              { key: "headCircumference" as const, label: "头围 (cm)", min: 30, max: 60, step: "0.1" },
            ].map((m) => (
              <div key={m.key}>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">{m.label}</label>
                <input
                  type="number"
                  step={m.step}
                  value={form[m.key]}
                  onChange={(e) => update(m.key, Number(e.target.value))}
                  className="input-field"
                  min={m.min}
                  max={m.max}
                  required
                />
              </div>
            ))}
          </div>

          <button type="submit" className="btn-primary w-full text-base py-4">
            🔍 生成健康报告
          </button>
        </form>
      </div>
    </motion.section>
  );
};

export default HealthForm;
