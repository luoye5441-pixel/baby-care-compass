import { Globe } from "@/components/ui/globe";
import { Marquee, TestimonialCard } from "@/components/ui/3d-testimonials";

const teamMembers = [
  {
    name: "林小雨",
    role: "UI 设计师",
    quote: "每个像素都承载着品牌的温度，设计不只是美观，更是与用户的无声对话。",
    avatar: "🎨",
  },
  {
    name: "张明辉",
    role: "动效设计师",
    quote: "好的动效能让界面活起来，让用户在交互中感受到品牌的活力与个性。",
    avatar: "✨",
  },
  {
    name: "王子轩",
    role: "视频剪辑师",
    quote: "每一帧画面都是故事的一部分，剪辑是赋予品牌叙事节奏感的艺术。",
    avatar: "🎬",
  },
  {
    name: "陈思琪",
    role: "产品经理",
    quote: "从用户需求出发，用数据验证假设，让每个功能都精准命中品牌目标。",
    avatar: "📊",
  },
  {
    name: "李佳怡",
    role: "品牌策略师",
    quote: "品牌不只是一个标志，它是企业与消费者之间最有力的情感纽带。",
    avatar: "💡",
  },
  {
    name: "赵天宇",
    role: "前端工程师",
    quote: "代码是品牌数字体验的基石，性能与美感缺一不可。",
    avatar: "⚡",
  },
];

const row1 = teamMembers.slice(0, 3);
const row2 = teamMembers.slice(3);

export function SplineRobot() {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* AI + Team Section - Enlarged */}
      <div className="h-[560px] relative overflow-hidden rounded-lg border border-border bg-card">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.08)_0%,rgba(99,102,241,0.04)_40%,transparent_70%)]" />

        <div className="flex h-full">
          {/* Left content */}
          <div className="flex-1 p-10 md:p-16 relative z-10 flex flex-col justify-center">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient whitespace-nowrap">
              AI+专业团队驱动
            </h2>
            <p className="mt-6 text-muted-foreground max-w-lg text-base md:text-lg leading-relaxed">
              全球来自 20 个不同国家的人工团队，结合 AI 智能分析，为品牌提供跨文化、全方位的策略支持。
            </p>
          </div>

          {/* Right content - Globe */}
          <div className="flex-1 relative flex items-center justify-center">
            <Globe className="w-full h-full" />
          </div>
        </div>
      </div>

      {/* 3D Testimonials Marquee */}
      <div className="relative overflow-hidden">
        <Marquee pauseOnHover className="[--duration:30s]">
          {row1.map((member) => (
            <TestimonialCard key={member.name} member={member} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:35s] mt-4">
          {row2.map((member) => (
            <TestimonialCard key={member.name} member={member} />
          ))}
        </Marquee>

        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
      </div>
    </div>
  );
}
