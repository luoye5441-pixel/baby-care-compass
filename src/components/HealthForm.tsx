import { useState } from "react";
import { motion } from "framer-motion";
import { User, Building2, Mail, Phone, Wallet, MessageSquare, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { RainbowButton } from "@/components/ui/rainbow-button";

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
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Contact Us
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-3">
            开启品牌之旅
          </h2>
          <p className="text-muted-foreground text-sm">留下您的信息，我们将在24小时内与您联系</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* 姓名 */}
            <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-card/80 border border-border/40 p-5 transition-all duration-500 hover:shadow-[0_0_30px_-5px_hsl(var(--foreground)/0.1)] hover:border-border/80">
              <User className="h-6 w-6 text-muted-foreground/50 mb-2" />
              <label className="block text-xs font-medium text-muted-foreground mb-2">您的姓名</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="input-field"
                required
              />
            </div>

            {/* 邮箱 */}
            <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-card/80 border border-border/40 p-5 transition-all duration-500 hover:shadow-[0_0_30px_-5px_hsl(var(--foreground)/0.1)] hover:border-border/80">
              <Mail className="h-6 w-6 text-muted-foreground/50 mb-2" />
              <label className="block text-xs font-medium text-muted-foreground mb-2">电子邮箱</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="input-field"
                required
              />
            </div>

            {/* 电话 */}
            <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-card/80 border border-border/40 p-5 transition-all duration-500 hover:shadow-[0_0_30px_-5px_hsl(var(--foreground)/0.1)] hover:border-border/80">
              <Phone className="h-6 w-6 text-muted-foreground/50 mb-2" />
              <label className="block text-xs font-medium text-muted-foreground mb-2">联系电话</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="input-field"
              />
            </div>

            {/* 预算 */}
            <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-card/80 border border-border/40 p-5 md:col-span-2 transition-all duration-500 hover:shadow-[0_0_30px_-5px_hsl(var(--foreground)/0.1)] hover:border-border/80">
              <Wallet className="h-6 w-6 text-muted-foreground/50 mb-2" />
              <label className="block text-xs font-medium text-muted-foreground mb-3">预算范围</label>
              <div className="grid grid-cols-3 gap-3">
                {["10-30万", "30-80万", "80万以上"].map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => update("budget", opt)}
                    className={cn(
                      "py-3 rounded-xl border text-sm font-medium transition-all",
                      form.budget === opt
                        ? "bg-foreground text-background border-foreground"
                        : "bg-card border-border hover:border-foreground/30"
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* 需求 */}
            <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-card/80 border border-border/40 p-5 md:col-span-3 transition-all duration-500 hover:shadow-[0_0_30px_-5px_hsl(var(--foreground)/0.1)] hover:border-border/80">
              <MessageSquare className="h-6 w-6 text-muted-foreground/50 mb-2" />
              <label className="block text-xs font-medium text-muted-foreground mb-2">项目需求</label>
              <textarea
                value={form.needs}
                onChange={(e) => update("needs", e.target.value)}
                placeholder="请简要描述您的品牌需求..."
                rows={3}
                className="input-field resize-none"
              />
            </div>
          </div>

          <RainbowButton type="submit" className="w-full text-sm py-4 mt-6">
            <Send className="w-4 h-4" />
            提交咨询
          </RainbowButton>
        </form>
      </div>
    </motion.section>
  );
};

export default HealthForm;
