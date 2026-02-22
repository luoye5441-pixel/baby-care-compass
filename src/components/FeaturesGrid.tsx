import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "品牌诊断", desc: "深入了解企业现状、市场环境与竞争格局" },
  { num: "02", title: "策略制定", desc: "明确品牌定位、核心价值与传播策略" },
  { num: "03", title: "创意设计", desc: "打造独特的品牌视觉体系与传播物料" },
  { num: "04", title: "落地执行", desc: "全渠道品牌触点落地与持续优化迭代" },
];

const FeaturesGrid = () => (
  <section id="process" className="section-cool py-24 md:py-32">
    <div className="max-w-5xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative group"
          >
            <div className="rounded-2xl border border-border bg-card p-8 h-full hover:border-foreground/20 transition-colors">
              <span className="font-display text-4xl font-bold text-muted-foreground/20 group-hover:text-foreground/10 transition-colors">
                {step.num}
              </span>
              <h3 className="text-base font-semibold mt-4 mb-2">{step.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesGrid;
