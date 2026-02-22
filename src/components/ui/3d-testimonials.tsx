import React, { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

// --- Marquee ---
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
        "group flex overflow-hidden [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
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

// --- Testimonial Data ---
export interface Testimonial {
  name: string;
  username: string;
  body: string;
  img: string;
  country: string;
}

// --- ReviewCard ---
function ReviewCard({ img, name, username, body, country }: Testimonial) {
  return (
    <Card className="w-[260px] shrink-0 bg-card border-border/60 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={img} alt={name} />
            <AvatarFallback className="text-xs">
              {name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-semibold text-foreground truncate">
                {name}
              </p>
              <span className="text-base leading-none">{country}</span>
            </div>
            <p className="text-xs text-muted-foreground">{username}</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          {body}
        </p>
      </CardContent>
    </Card>
  );
}

// --- 3D Testimonials ---
interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function Testimonials3D({ testimonials }: TestimonialsSectionProps) {
  const col1 = testimonials.filter((_, i) => i % 3 === 0);
  const col2 = testimonials.filter((_, i) => i % 3 === 1);
  const col3 = testimonials.filter((_, i) => i % 3 === 2);

  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden">
      <div
        className="flex gap-4"
        style={{
          transform:
            "perspective(1200px) rotateX(10deg) rotateY(-15deg) rotateZ(5deg) scale(0.9)",
          transformStyle: "preserve-3d",
        }}
      >
        <Marquee vertical pauseOnHover className="[--duration:25s]">
          {col1.map((t) => (
            <ReviewCard key={t.username} {...t} />
          ))}
        </Marquee>
        <Marquee vertical reverse pauseOnHover className="[--duration:30s]">
          {col2.map((t) => (
            <ReviewCard key={t.username} {...t} />
          ))}
        </Marquee>
        <Marquee vertical pauseOnHover className="[--duration:28s]">
          {col3.map((t) => (
            <ReviewCard key={t.username} {...t} />
          ))}
        </Marquee>
      </div>

      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
