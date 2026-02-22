import { Globe } from "@/components/ui/globe";
import { Testimonials3D, type Testimonial } from "@/components/ui/3d-testimonials";

const testimonials: Testimonial[] = [
  {
    name: "Ava Green",
    username: "@ava",
    body: "UI设计让品牌焕然一新，每个像素都承载着品牌温度。",
    img: "https://randomuser.me/api/portraits/women/32.jpg",
    country: "🇦🇺 Australia",
  },
  {
    name: "Ana Miller",
    username: "@ana",
    body: "动效设计让界面活了起来，用户互动体验提升巨大！",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    country: "🇩🇪 Germany",
  },
  {
    name: "Mateo Rossi",
    username: "@mat",
    body: "视频剪辑质量一流，完美呈现品牌故事的节奏感。",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
    country: "🇮🇹 Italy",
  },
  {
    name: "Carlos Ray",
    username: "@carl",
    body: "产品策略精准到位，每个功能都命中核心目标。",
    img: "https://randomuser.me/api/portraits/men/52.jpg",
    country: "🇪🇸 Spain",
  },
  {
    name: "Emma Lee",
    username: "@emma",
    body: "品牌策略让我们在市场中脱颖而出，效果惊人！",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    country: "🇨🇦 Canada",
  },
  {
    name: "Liam Chen",
    username: "@liam",
    body: "前端开发质量极高，性能与美感完美兼顾。",
    img: "https://randomuser.me/api/portraits/men/22.jpg",
    country: "🇨🇳 China",
  },
  {
    name: "Sofia Park",
    username: "@sofia",
    body: "全渠道品牌触点落地执行到位，合作非常高效愉快。",
    img: "https://randomuser.me/api/portraits/women/56.jpg",
    country: "🇰🇷 Korea",
  },
  {
    name: "James Wright",
    username: "@james",
    body: "跨文化团队带来独特视角，品牌国际化效果显著。",
    img: "https://randomuser.me/api/portraits/men/36.jpg",
    country: "🇬🇧 UK",
  },
  {
    name: "Yuki Tanaka",
    username: "@yuki",
    body: "AI驱动的分析让决策更精准，数据赋能品牌增长。",
    img: "https://randomuser.me/api/portraits/women/12.jpg",
    country: "🇯🇵 Japan",
  },
];

export function SplineRobot() {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* AI + Team Section */}
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
