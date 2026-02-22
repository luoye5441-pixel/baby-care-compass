import { Globe } from "@/components/ui/globe";

export function SplineRobot() {
  return (
    <div className="w-full max-w-6xl mx-auto h-[500px] relative overflow-hidden rounded-lg border border-border bg-card">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.08)_0%,rgba(99,102,241,0.04)_40%,transparent_70%)]" />

      <div className="flex h-full">
        {/* Left content */}
        <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient whitespace-nowrap">
            AI+专业团队驱动
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md text-sm leading-relaxed">
            全球来自 20 个不同国家的人工团队，结合 AI 智能分析，为品牌提供跨文化、全方位的策略支持。
          </p>
        </div>

        {/* Right content - Globe */}
        <div className="flex-1 relative flex items-center justify-center">
          <Globe className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
