import { motion } from "framer-motion";
import { Search, Palette, Globe, BarChart3, PenTool } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { SplineRobot } from "@/components/SplineRobot";
import FeaturesGrid from "@/components/FeaturesGrid";

const features = [
  {
    Icon: Search,
    name: "品牌调研",
    description: "深度市场研究与竞品分析，精准锁定品牌核心定位与差异化优势。",
    cta: "了解更多",
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: Palette,
    name: "视觉识别",
    description: "构建完整的品牌视觉体系，从标志到全触点设计语言。",
    cta: "了解更多",
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: Globe,
    name: "数字体验",
    description: "打造沉浸式数字品牌体验，覆盖网站、应用及社交媒体。",
    cta: "了解更多",
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: PenTool,
    name: "内容策略",
    description: "精准内容规划与创意产出，打造有影响力的品牌叙事。",
    cta: "了解更多",
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: BarChart3,
    name: "增长策略",
    description: "数据驱动的品牌增长方案，持续优化市场表现与用户转化。",
    cta: "了解更多",
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <BentoGrid className="lg:grid-rows-3">
            {features.map((feature) => (
              <BentoCard key={feature.name} {...feature} />
            ))}
          </BentoGrid>
        </motion.div>

        {/* Spline Robot */}
        <div className="mb-16">
          <SplineRobot />
        </div>

        {/* 合作流程 */}
        <FeaturesGrid />
      </div>
    </section>
  );
}
