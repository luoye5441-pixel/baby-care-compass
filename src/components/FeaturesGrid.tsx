import { motion } from "framer-motion";
import DisplayCards from "@/components/ui/display-cards";
import { BarChart3, Salad, Camera, Shield } from "lucide-react";

const featureCards = [
  {
    icon: <BarChart3 className="size-4 text-mint" />,
    title: "科学成长指标",
    description: "基于WHO儿童生长标准，精准对比身高、体重、BMI等关键发育指标",
    date: "实时追踪",
    iconClassName: "text-mint",
    titleClassName: "text-mint",
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Salad className="size-4 text-coral" />,
    title: "个性化营养方案",
    description: "智能推荐每日膳食搭配，确保营养均衡摄入",
    date: "每日推荐",
    iconClassName: "text-coral",
    titleClassName: "text-coral",
    className:
      "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Camera className="size-4 text-apricot" />,
    title: "AI拍照营养分析",
    description: "拍摄食物照片，AI自动识别并分析营养成分与热量",
    date: "AI驱动",
    iconClassName: "text-apricot",
    titleClassName: "text-apricot",
    className:
      "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Shield className="size-4 text-lavender" />,
    title: "过敏源安全守护",
    description: "记录过敏史，选择食物时智能预警，守护饮食安全",
    date: "全天候守护",
    iconClassName: "text-lavender",
    titleClassName: "text-lavender",
    className:
      "[grid-area:stack] translate-x-48 translate-y-[7.5rem] hover:translate-y-[5rem]",
  },
];

const FeaturesGrid = () => (
  <section id="features" className="section-warm py-16 md:py-24">
    <div className="max-w-6xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-mint-light text-primary mb-4">
          核心功能
        </span>
        <h2 className="text-2xl md:text-3xl font-bold mb-3">为宝宝量身定制的健康方案</h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          科学、便捷、温暖，让每位妈妈都能轻松掌握宝宝健康
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex justify-center min-h-[320px] items-center"
      >
        <DisplayCards cards={featureCards} />
      </motion.div>
    </div>
  </section>
);

export default FeaturesGrid;
