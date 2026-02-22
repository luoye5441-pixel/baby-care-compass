import { motion } from "framer-motion";
import heroImage from "@/assets/hero-illustration.jpg";

const HeroSection = ({ onStart }: { onStart: () => void }) => {
  return (
    <section className="section-padding min-h-[85vh] flex items-center">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-peach-light text-foreground/70 mb-6">
              专为 1-8 岁宝宝设计
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
              守护宝宝
              <br />
              <span className="text-primary">健康成长</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-md">
              通过科学指标追踪、营养分析和个性化建议，陪伴您的宝宝健康快乐地成长每一天。
            </p>
            <button
              onClick={onStart}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium text-lg hover:opacity-90 transition-opacity shadow-lg"
            >
              开始评估
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <img
              src={heroImage}
              alt="妈妈和宝宝"
              className="w-full max-w-lg rounded-3xl animate-float"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
