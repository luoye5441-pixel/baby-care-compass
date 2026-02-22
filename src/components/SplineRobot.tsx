import { cn } from "@/lib/utils";
import { Boxes } from "@/components/ui/background-boxes";

export function SplineRobot() {
  return (
    <div className="w-full max-w-6xl mx-auto h-[500px] relative overflow-hidden rounded-lg border border-border bg-card">
      <div className="absolute inset-0 w-full h-full bg-card z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
        <h2 className={cn("font-display text-3xl md:text-4xl font-bold text-gradient")}>
          智能品牌助手
        </h2>
        <p className="mt-4 text-muted-foreground max-w-lg text-sm leading-relaxed text-center">
          AI 驱动的品牌策略分析，从市场洞察到创意执行，全流程智能赋能品牌增长。
        </p>
      </div>
    </div>
  );
}
