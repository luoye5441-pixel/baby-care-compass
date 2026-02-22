import { motion } from "framer-motion";
import { Search, Target, Palette, Rocket } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const timelineData = [
  {
    id: 1,
    title: "品牌诊断",
    date: "第一阶段",
    content: "深入了解企业现状、市场环境与竞争格局，全面分析品牌优劣势。",
    category: "诊断",
    icon: Search,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "策略制定",
    date: "第二阶段",
    content: "明确品牌定位、核心价值与传播策略，制定系统化的品牌发展路线图。",
    category: "策略",
    icon: Target,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 85,
  },
  {
    id: 3,
    title: "创意设计",
    date: "第三阶段",
    content: "打造独特的品牌视觉体系与传播物料，构建完整的品牌识别系统。",
    category: "设计",
    icon: Palette,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 65,
  },
  {
    id: 4,
    title: "落地执行",
    date: "第四阶段",
    content: "全渠道品牌触点落地与持续优化迭代，确保品牌策略有效落地。",
    category: "执行",
    icon: Rocket,
    relatedIds: [3],
    status: "pending" as const,
    energy: 40,
  },
];

const FeaturesGrid = () => (
  <section id="process" className="section-cool py-24 md:py-32">
    <div className="max-w-5xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
          Our Process
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-4">
          合作流程
        </h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          系统化的品牌建设方法论，确保每一步精准高效
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <RadialOrbitalTimeline timelineData={timelineData} />
      </motion.div>
    </div>
  </section>
);

export default FeaturesGrid;
