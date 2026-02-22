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
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    budget: "10-30万",
    needs: "",
  });

  const update = (key: string, value: string) =>
    setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, create a dummy BabyData to maintain interface compatibility
    const dummyData: BabyData = {
      name: form.name,
      gender: "male",
      ageYears: 1,
      ageMonths: 0,
      height: 75,
      weight: 10,
      headCircumference: 46,
    };
    onSubmit(dummyData);
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-24 md:py-32 px-6"
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Contact Us
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-3">
            开启品牌之旅
          </h2>
          <p className="text-muted-foreground text-sm">留下您的信息，我们将在24小时内与您联系</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-2">您的姓名</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="张先生 / 李女士"
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-2">公司名称</label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
                placeholder="您的公司"
                className="input-field"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-2">电子邮箱</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="email@company.com"
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-2">联系电话</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="138 0000 0000"
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-2">预算范围</label>
            <div className="grid grid-cols-3 gap-3">
              {["10-30万", "30-80万", "80万以上"].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => update("budget", opt)}
                  className={`py-3 rounded-xl border text-sm font-medium transition-all ${
                    form.budget === opt
                      ? "bg-foreground text-background border-foreground"
                      : "bg-card border-border hover:border-foreground/30"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-2">项目需求</label>
            <textarea
              value={form.needs}
              onChange={(e) => update("needs", e.target.value)}
              placeholder="请简要描述您的品牌需求..."
              rows={4}
              className="input-field resize-none"
            />
          </div>

          <button type="submit" className="btn-primary w-full text-sm py-4 mt-2">
            提交咨询
          </button>
        </form>
      </div>
    </motion.section>
  );
};

export default HealthForm;
