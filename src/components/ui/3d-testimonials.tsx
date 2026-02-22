import React, { ComponentPropsWithoutRef, useRef } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        vertical ? "flex-col" : "flex-row",
        className
      )}
    >
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0 justify-around [gap:var(--gap)]",
            vertical ? "flex-col" : "flex-row",
            vertical
              ? pauseOnHover
                ? "group-hover:[animation-play-state:paused] animate-marquee-vertical"
                : "animate-marquee-vertical"
              : pauseOnHover
              ? "group-hover:[animation-play-state:paused] animate-marquee"
              : "animate-marquee",
            reverse && "[animation-direction:reverse]"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

interface TeamMember {
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

export function TestimonialCard({ member }: { member: TeamMember }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-[280px] shrink-0 rounded-2xl border border-border bg-card p-6 transition-transform duration-200 ease-out cursor-default"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold text-foreground">
          {member.avatar}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{member.name}</p>
          <p className="text-xs text-muted-foreground">{member.role}</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        "{member.quote}"
      </p>
    </div>
  );
}
