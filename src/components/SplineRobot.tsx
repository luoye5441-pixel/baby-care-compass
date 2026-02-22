import { Globe } from "@/components/ui/globe";
import { Testimonials3D, type Testimonial } from "@/components/ui/3d-testimonials";

const testimonials: Testimonial[] = [
  {
    name: "林小雨",
    username: "@xiaoyu",
    body: "专业的UI设计让品牌焕然一新，每个细节都恰到好处。",
    img: "https://randomuser.me/api/portraits/women/32.jpg",
    country: "🇨🇳",
  },
  {
    name: "张明辉",
    username: "@minghui",
    body: "动效设计让整个品牌体验提升了一个层级，用户反馈非常好。",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
    country: "🇨🇳",
  },
  {
    name: "Carlos Ray",
    username: "@carl",
    body: "Great for testimonials and logos. The team delivered beyond expectations.",
    img: "https://randomuser.me/api/portraits/men/52.jpg",
    country: "🇪🇸",
  },
  {
    name: "陈思琪",
    username: "@siqi",
    body: "产品经理视角出发，每个功能都精准命中品牌目标，效率极高。",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    country: "🇨🇳",
  },
  {
    name: "Emma Lee",
    username: "@emma",
    body: "Love the pause on hover feature! The 3D effect is stunning.",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    country: "🇨🇦",
  },
  {
    name: "Ava Green",
    username: "@ava",
    body: "Cascade AI made my workflow 10x faster! Incredible team support.",
    img: "https://randomuser.me/api/portraits/women/12.jpg",
    country: "🇦🇺",
  },
  {
    name: "王子轩",
    username: "@zixuan",
    body: "视频剪辑出品质量极高，完美呈现品牌故事的每一个细节。",
    img: "https://randomuser.me/api/portraits/men/22.jpg",
    country: "🇨🇳",
  },
  {
    name: "Ana Miller",
    username: "@ana",
    body: "Vertical marquee is a game changer! Perfect for our landing page.",
    img: "https://randomuser.me/api/portraits/women/56.jpg",
    country: "🇩🇪",
  },
  {
    name: "赵天宇",
    username: "@tianyu",
    body: "前端开发质量一流，性能与美感完美兼顾，合作非常愉快。",
    img: "https://randomuser.me/api/portraits/men/36.jpg",
    country: "🇨🇳",
  },
];

export function SplineRobot() {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* AI + Team Section - Enlarged */}
      <div className="h-[560px] relative overflow-hidden rounded-lg border border-border bg-card">
        <div className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.08)_0%,rgba(99,102,241,0.04)_40%,transparent_70%)]" />

        <div className="flex h-full">
          <div className="flex-1 p-10 md:p-16 relative z-10 flex flex-col justify-center">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient whitespace-nowrap">
              AI+专业团队驱动
            </h2>
            <p className="mt-6 text-muted-foreground max-w-lg text-base md:text-lg leading-relaxed">
              全球来自 20 个不同国家的人工团队，结合 AI 智能分析，为品牌提供跨文化、全方位的策略支持。
            </p>
          </div>
          <div className="flex-1 relative flex items-center justify-center">
            <Globe className="w-full h-full" />
          </div>
        </div>
      </div>

      {/* 3D Testimonials */}
      <div className="h-[500px] overflow-hidden">
        <Testimonials3D testimonials={testimonials} />
      </div>
    </div>
  );
}
