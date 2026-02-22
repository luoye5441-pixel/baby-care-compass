import { motion } from "framer-motion";

const features = [
  {
    icon: "📊",
    title: "科学成长指标",
    desc: "基于世界卫生组织(WHO)儿童生长标准，精准对比宝宝身高、体重、BMI等关键发育指标，及时发现异常。",
    color: "gradient-mint",
  },
  {
    icon: "🥗",
    title: "个性化营养方案",
    desc: "根据宝宝年龄段和体质特点，智能推荐每日膳食搭配，确保营养均衡摄入，助力健康成长。",
    color: "gradient-coral",
  },
  {
    icon: "📸",
    title: "AI拍照营养分析",
    desc: "只需拍摄食物照片，AI自动识别食材种类，分析营养成分与热量，让每餐都科学合理。",
    color: "gradient-lavender",
  },
  {
    icon: "🛡️",
    title: "过敏源安全守护",
    desc: "记录宝宝过敏史，在选择食物和辅食添加时智能预警，守护宝宝饮食安全每一天。",
    color: "gradient-mint",
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

      <div className="grid md:grid-cols-2 gap-5">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`${f.color} rounded-3xl p-7 md:p-8 hover:shadow-lg transition-shadow`}
          >
            <span className="text-3xl block mb-4">{f.icon}</span>
            <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
            <p className="text-sm text-foreground/65 leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesGrid;
