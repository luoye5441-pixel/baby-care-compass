import { motion } from "framer-motion";
import { Search, Target, PenTool, Send } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const timelineData = [
  {
    id: 1,
    title: "品牌调研",
    date: "Phase 1",
    content: "深入了解品牌现状、竞争格局与目标用户，为策略奠定数据基础。",
    category: "research",
    icon: Search,
    relatedIds: [2],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 2,
    title: "策略定位",
    date: "Phase 2",
    content: "基于调研洞察，明确品牌核心价值与市场定位，制定增长路径。",
    category: "strategy",
    icon: Target,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 85,
  },
  {
    id: 3,
    title: "创意设计",
    date: "Phase 3",
    content: "将策略转化为视觉语言，打造独特的品牌识别系统与内容体系。",
    category: "design",
    icon: PenTool,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 75,
  },
  {
    id: 4,
    title: "落地执行",
    date: "Phase 4",
    content: "全渠道品牌触点落地，持续优化迭代，确保策略有效转化。",
    category: "execution",
    icon: Send,
    relatedIds: [3],
    status: "pending" as const,
    energy: 60,
  },
];

const FeaturesGrid = () => (
  <section id="process" className="bg-background py-24 md:py-32">
    <div className="max-w-5xl mx-auto px-6">
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
