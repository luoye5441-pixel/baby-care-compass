import { motion } from "framer-motion";
import heroBanner from "@/assets/hero-banner.jpg";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

const HeroSection = ({ onStart }: { onStart: () => void }) => {
  return (
    <section className="relative overflow-hidden gradient-hero">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8 md:pt-24 md:pb-12">
        {/* Banner Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[2rem] overflow-hidden mb-12 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.08)]"
        >
          <img
            src={heroBanner}
            alt="宝贝健康"
            className="w-full h-[240px] md:h-[360px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl md:text-5xl font-bold text-primary-foreground leading-tight mb-2 drop-shadow-md"
            >
              守护宝宝 · 健康成长
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-primary-foreground/80 text-sm md:text-base max-w-md drop-shadow-sm"
            >
              专为1-8岁宝宝打造的科学健康管理平台
            </motion.p>
          </div>
        </motion.div>

        {/* Stat Cards Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8"
        >
          {[
            { icon: "📊", label: "成长追踪", desc: "WHO标准对比" },
            { icon: "🥗", label: "营养管理", desc: "个性化建议" },
            { icon: "📸", label: "拍照分析", desc: "智能识别食物" },
            { icon: "⚠️", label: "过敏提醒", desc: "安全饮食守护" },
          ].map((item, i) => (
            <div
              key={i}
              className="card-elevated p-4 md:p-5 flex flex-col items-center text-center hover:shadow-[0_4px_32px_-8px_rgba(0,0,0,0.1)] transition-shadow cursor-default"
            >
              <span className="text-2xl md:text-3xl mb-2">{item.icon}</span>
              <span className="text-sm font-semibold mb-0.5">{item.label}</span>
              <span className="text-xs text-muted-foreground">{item.desc}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center"
        >
          <InteractiveHoverButton onClick={onStart} text="立即开始健康评估" className="w-48 border-primary text-primary" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
