import { motion } from "framer-motion";

const features = [
  {
    icon: "📊",
    title: "成长指标追踪",
    desc: "基于WHO标准，实时对比宝宝身高、体重、BMI等关键指标",
    bg: "gradient-sage",
  },
  {
    icon: "🥗",
    title: "营养建议",
    desc: "根据宝宝年龄和体质，提供个性化的膳食搭配方案",
    bg: "gradient-peach",
  },
  {
    icon: "📸",
    title: "拍照分析",
    desc: "拍摄食物照片，智能分析营养成分和热量信息",
    bg: "gradient-sage",
  },
  {
    icon: "⚠️",
    title: "过敏源提醒",
    desc: "记录过敏史，在饮食选择时自动提醒避免危险食物",
    bg: "gradient-peach",
  },
];

const FeaturesGrid = () => (
  <section className="section-padding">
    <div className="container mx-auto max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-3">为什么选择我们</h2>
        <p className="text-muted-foreground">科学、便捷、温暖的宝宝健康管理方案</p>
      </motion.div>
      <div className="grid sm:grid-cols-2 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`${f.bg} rounded-3xl p-8`}
          >
            <span className="text-4xl block mb-4">{f.icon}</span>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesGrid;
