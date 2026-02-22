import { motion } from "framer-motion";
import DisplayCards from "@/components/ui/display-cards";
import { SplineRobot } from "@/components/SplineRobot";
import FeaturesGrid from "@/components/FeaturesGrid";

const displayCards = [
  {
    title: "品牌定位",
    description: "深度市场研究与竞品分析，精准锁定品牌核心定位与差异化优势",
    date: "战略基石",
    titleClassName: "text-foreground",
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-full before:outline-1 before:rounded-xl before:outline-border before:h-full before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    title: "视觉识别",
    description: "构建完整的品牌视觉体系，从标志到全触点设计语言",
    date: "设计语言",
    titleClassName: "text-foreground",
    className:
      "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-full before:outline-1 before:rounded-xl before:outline-border before:h-full before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    title: "数字体验",
    description: "打造沉浸式数字品牌体验，覆盖网站、应用及社交媒体",
    date: "全渠道",
    titleClassName: "text-foreground",
    className:
      "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10 before:absolute before:w-full before:outline-1 before:rounded-xl before:outline-border before:h-full before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    title: "增长策略",
    description: "数据驱动的品牌增长方案，持续优化市场表现",
    date: "数据驱动",
    titleClassName: "text-foreground",
    className:
      "[grid-area:stack] translate-x-48 translate-y-[7.5rem] hover:translate-y-[5rem]",
  },
];

export default function BentoFeatures() {
  return (
    <section id="services" className="py-24 md:py-32 bg-background">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Our Services
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-4">
            全方位品牌服务
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            从策略到执行，为品牌注入持久生命力
          </p>
        </motion.div>

        {/* Spline Robot */}
        <div className="mb-16">
          <SplineRobot />
        </div>

        {/* 合作流程 */}
        <FeaturesGrid />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center min-h-[380px] items-center"
        >
          <DisplayCards cards={displayCards} />
        </motion.div>
      </div>
    </section>
  );
}
