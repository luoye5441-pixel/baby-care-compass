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
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-coral-light text-secondary mb-4">
            健康评估
          </span>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">输入宝宝信息</h2>
          <p className="text-muted-foreground text-sm">填写基本指标，一键生成专业健康报告</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-auto">
          
          {/* 宝宝昵称 - Wide */}
          <div className="md:col-span-3 rounded-3xl border border-border bg-card p-6 hover:shadow-lg transition-shadow">
            <label className="block text-xs font-medium text-muted-foreground mb-2">宝宝昵称</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="例如：小糯米"
              className="input-field"
              required
            />
          </div>

          {/* 性别 - Wide */}
          <div className="md:col-span-3 rounded-3xl border border-border bg-card p-6 hover:shadow-lg transition-shadow">
            <label className="block text-xs font-medium text-muted-foreground mb-2">性别</label>
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

          {/* 年龄 */}
          <div className="md:col-span-3 rounded-3xl border border-border bg-card p-6 hover:shadow-lg transition-shadow">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">年龄（岁）</label>
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
                <label className="block text-xs font-medium text-muted-foreground mb-2">月龄</label>
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
          </div>

          {/* 身高 */}
          <div className="md:col-span-1 rounded-3xl border border-border bg-card p-6 hover:shadow-lg transition-shadow">
            <label className="block text-xs font-medium text-muted-foreground mb-2">身高 (cm)</label>
            <input
              type="number"
              step="0.1"
              value={form.height}
              onChange={(e) => update("height", Number(e.target.value))}
              className="input-field"
              min={50}
              max={160}
              required
            />
          </div>

          {/* 体重 */}
          <div className="md:col-span-1 rounded-3xl border border-border bg-card p-6 hover:shadow-lg transition-shadow">
            <label className="block text-xs font-medium text-muted-foreground mb-2">体重 (kg)</label>
            <input
              type="number"
              step="0.1"
              value={form.weight}
              onChange={(e) => update("weight", Number(e.target.value))}
              className="input-field"
              min={3}
              max={50}
              required
            />
          </div>

          {/* 头围 */}
          <div className="md:col-span-1 rounded-3xl border border-border bg-card p-6 hover:shadow-lg transition-shadow">
            <label className="block text-xs font-medium text-muted-foreground mb-2">头围 (cm)</label>
            <input
              type="number"
              step="0.1"
              value={form.headCircumference}
              onChange={(e) => update("headCircumference", Number(e.target.value))}
              className="input-field"
              min={30}
              max={60}
              required
            />
          </div>

          {/* 提交按钮 - Full width */}
          <div className="md:col-span-6">
            <button type="submit" className="btn-primary w-full text-base py-4">
              🔍 生成健康报告
            </button>
          </div>
        </form>
      </div>
    </motion.section>
  );
};

export default HealthForm;
