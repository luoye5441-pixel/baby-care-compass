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
      className="section-padding"
    >
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">宝宝健康评估</h2>
          <p className="text-muted-foreground">输入宝宝的基本信息，获取专业健康分析</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2">宝宝昵称</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="例如：小糯米"
              className="w-full px-4 py-3 rounded-xl bg-background border border-input focus:ring-2 focus:ring-ring outline-none transition-all"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium mb-2">性别</label>
            <div className="flex gap-3">
              {[
                { value: "male" as const, label: "👦 男宝" },
                { value: "female" as const, label: "👧 女宝" },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => update("gender", opt.value)}
                  className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all ${
                    form.gender === opt.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-input hover:border-primary/50"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Age */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">年龄（岁）</label>
              <select
                value={form.ageYears}
                onChange={(e) => update("ageYears", Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-background border border-input outline-none"
              >
                {Array.from({ length: 8 }, (_, i) => i + 1).map((y) => (
                  <option key={y} value={y}>{y} 岁</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">月份</label>
              <select
                value={form.ageMonths}
                onChange={(e) => update("ageMonths", Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-background border border-input outline-none"
              >
                {Array.from({ length: 12 }, (_, i) => i).map((m) => (
                  <option key={m} value={m}>{m} 个月</option>
                ))}
              </select>
            </div>
          </div>

          {/* Height / Weight / Head */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">身高 (cm)</label>
              <input
                type="number"
                value={form.height}
                onChange={(e) => update("height", Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-background border border-input outline-none"
                min={50}
                max={160}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">体重 (kg)</label>
              <input
                type="number"
                step="0.1"
                value={form.weight}
                onChange={(e) => update("weight", Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-background border border-input outline-none"
                min={3}
                max={50}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">头围 (cm)</label>
              <input
                type="number"
                step="0.1"
                value={form.headCircumference}
                onChange={(e) => update("headCircumference", Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-background border border-input outline-none"
                min={30}
                max={60}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-medium text-lg hover:opacity-90 transition-opacity"
          >
            生成健康报告
          </button>
        </form>
      </div>
    </motion.section>
  );
};

export default HealthForm;
