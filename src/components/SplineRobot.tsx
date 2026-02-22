import { SplineScene } from "@/components/ui/splite"
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"

export function SplineRobot() {
  return (
    <Card className="w-full max-w-6xl mx-auto h-[500px] bg-background/95 relative overflow-hidden border-border">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <div className="flex h-full">
        {/* Left content */}
        <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient">
            智能品牌助手
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg text-sm leading-relaxed">
            AI 驱动的品牌策略分析，从市场洞察到创意执行，全流程智能赋能品牌增长。
          </p>
        </div>

        {/* Right content - 3D Robot */}
        <div className="flex-1 relative">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  )
}
