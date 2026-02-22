import { motion } from "framer-motion";
import { Search, Target, PenTool, Send } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const timelineData = [
// ... keep existing code
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
