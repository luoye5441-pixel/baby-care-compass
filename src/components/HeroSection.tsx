import { motion } from "framer-motion";
import heroBanner from "@/assets/hero-banner.jpg";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import DisplayCards from "@/components/ui/display-cards";
import { BarChart3, Salad, Camera, AlertTriangle } from "lucide-react";
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

        {/* Display Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <DisplayCards
            cards={[
              {
                icon: <BarChart3 className="size-4 text-mint" />,
                title: "成长追踪",
                description: "WHO标准对比",
                date: "实时更新",
                iconClassName: "text-mint",
                titleClassName: "text-mint",
                className:
                  "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
              },
              {
                icon: <Salad className="size-4 text-coral" />,
                title: "营养管理",
                description: "个性化建议",
                date: "每日推荐",
                iconClassName: "text-coral",
                titleClassName: "text-coral",
                className:
                  "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
              },
              {
                icon: <Camera className="size-4 text-apricot" />,
                title: "拍照分析",
                description: "智能识别食物",
                date: "AI驱动",
                iconClassName: "text-apricot",
                titleClassName: "text-apricot",
                className:
                  "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
              },
              {
                icon: <AlertTriangle className="size-4 text-lavender" />,
                title: "过敏提醒",
                description: "安全饮食守护",
                date: "全天候",
                iconClassName: "text-lavender",
                titleClassName: "text-lavender",
                className:
                  "[grid-area:stack] translate-x-48 translate-y-[7.5rem] hover:translate-y-[5rem]",
              },
            ]}
          />
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
