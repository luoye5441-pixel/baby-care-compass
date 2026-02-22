import { motion } from "framer-motion";
import { WebGLShader } from "@/components/ui/web-gl-shader";

const HeroSection = ({ onStart }: { onStart: () => void }) => {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center">
      {/* WebGL Background */}
      <WebGLShader />

      {/* Content overlay */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-foreground/40 mb-6">
            Brand Strategy Studio
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6 text-gradient">
            品牌策略
          </h1>
          <p className="text-foreground/50 text-base md:text-lg max-w-lg mx-auto mb-10 leading-relaxed">
            以战略思维驱动品牌增长，用设计语言定义市场格局
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button onClick={onStart} className="btn-primary text-sm tracking-wide">
            开始咨询
          </button>
          <button className="btn-secondary text-sm tracking-wide">
            查看案例
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
