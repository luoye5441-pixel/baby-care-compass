import { motion } from "framer-motion";
import { Target, Palette, TrendingUp, Layers, Globe, Zap } from "lucide-react";

const services = [
  {
    icon: Target,
    title: "品牌定位",
    description: "深度市场研究与竞品分析，精准锁定品牌核心定位与差异化优势",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    icon: Palette,
    title: "视觉识别",
    description: "构建完整的品牌视觉体系，从标志到全触点设计语言",
    span: "md:col-span-2",
  },
  {
    icon: Globe,
    title: "数字体验",
    description: "打造沉浸式数字品牌体验，覆盖网站、应用及社交媒体",
    span: "md:col-span-2",
  },
  {
    icon: TrendingUp,
    title: "增长策略",
    description: "数据驱动的品牌增长方案，持续优化市场表现",
    span: "md:col-span-2",
  },
  {
    icon: Layers,
    title: "品牌架构",
    description: "多品牌管理与架构规划，最大化品牌资产价值",
    span: "md:col-span-2",
  },
  {
    icon: Zap,
    title: "品牌激活",
    description: "创意营销与品牌传播策略，引爆市场关注度",
    span: "md:col-span-2",
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

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`${service.span} rounded-2xl border border-border bg-card p-8 flex flex-col justify-between hover:border-foreground/20 transition-colors group`}
            >
              <service.icon className="size-5 text-muted-foreground group-hover:text-foreground transition-colors mb-6" />
              <div>
                <h3 className="text-base font-semibold mb-2">{service.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
