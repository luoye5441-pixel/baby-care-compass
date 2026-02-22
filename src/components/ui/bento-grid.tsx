import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoCardProps {
  name: string;
  className?: string;
  background?: ReactNode;
  Icon: React.ElementType;
  description: string;
  href?: string;
  cta?: string;
}

export function BentoCard({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: BentoCardProps) {
  return (
    <div
      className={cn(
        "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
        "bg-card border border-border/50",
        "transform-gpu transition-all duration-300 hover:border-border",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-muted/20" />
      {background && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {background}
        </div>
      )}
      <div className="z-10 flex flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-2">
        <Icon className="h-10 w-10 text-muted-foreground/80 transition-all duration-300 group-hover:text-foreground origin-left transform-gpu group-hover:scale-75" />
        <h3 className="text-lg font-semibold text-foreground mt-2">{name}</h3>
        <p className="max-w-lg text-sm text-muted-foreground">{description}</p>
      </div>
      {cta && (
        <div
          className={cn(
            "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          )}
        >
          <a
            href={href || "#"}
            className="pointer-events-auto inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {cta}
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>
        </div>
      )}
    </div>
  );
}
