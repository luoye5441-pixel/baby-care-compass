"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: ReturnType<typeof setInterval>;

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate]);

  const centerViewOnNode = (nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 200;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-foreground bg-background border-foreground";
      case "in-progress":
        return "text-background bg-foreground border-background";
      case "pending":
        return "text-foreground bg-background/40 border-foreground/50";
      default:
        return "text-foreground bg-background/40 border-foreground/50";
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full flex items-center justify-center min-h-[600px]"
      onClick={handleContainerClick}
    >
      <div className="relative w-[500px] h-[500px] flex items-center justify-center">
        {/* Orbit rings */}
        <div
          ref={orbitRef}
          className="absolute w-[400px] h-[400px] rounded-full border border-border/30"
        />
        <div className="absolute w-[300px] h-[300px] rounded-full border border-border/20" />
        <div className="absolute w-[200px] h-[200px] rounded-full border border-border/10" />

        {/* Center content */}
        <div className="absolute flex flex-col items-center justify-center text-center z-10 pointer-events-none">
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-1">
            Our Process
          </p>
          <h2 className="font-display text-lg font-bold text-foreground mb-1">
            合作流程
          </h2>
          <p className="text-muted-foreground text-[10px] max-w-[140px] leading-tight">
            系统化的品牌建设方法论
          </p>
        </div>

        {timelineData.map((item, index) => {
          const position = calculateNodePosition(index, timelineData.length);
          const isExpanded = expandedItems[item.id];
          const isRelated = isRelatedToActive(item.id);
          const isPulsing = pulseEffect[item.id];
          const Icon = item.icon;

          const nodeStyle = {
            transform: `translate(${position.x}px, ${position.y}px)`,
            zIndex: isExpanded ? 200 : position.zIndex,
            opacity: isExpanded ? 1 : position.opacity,
          };

          return (
            <div
              key={item.id}
              ref={(el) => (nodeRefs.current[item.id] = el)}
              className="absolute transition-all duration-700 cursor-pointer"
              style={nodeStyle}
              onClick={(e) => {
                e.stopPropagation();
                toggleItem(item.id);
              }}
            >
              {/* Pulse ring */}
              {(isPulsing || isRelated) && (
                <div className="absolute -inset-3 rounded-full border-2 border-foreground/30 animate-ping" />
              )}

              {/* Node circle */}
              <div
                className={`w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  isExpanded
                    ? "bg-foreground text-background border-foreground scale-110"
                    : isRelated
                    ? "bg-foreground/20 text-foreground border-foreground/60"
                    : "bg-card text-foreground border-border hover:border-foreground/40"
                }`}
              >
                <Icon className="w-7 h-7" />
              </div>

              {/* Label */}
              <div className="absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-muted-foreground font-medium">
                {item.title}
              </div>

              {/* Expanded card */}
              {isExpanded && (
                <Card className="absolute top-16 left-1/2 -translate-x-1/2 w-72 bg-card border-border shadow-xl">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className={getStatusStyles(item.status)}
                      >
                        {item.status === "completed"
                          ? "COMPLETE"
                          : item.status === "in-progress"
                          ? "IN PROGRESS"
                          : "PENDING"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {item.date}
                      </span>
                    </div>
                    <CardTitle className="text-base">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-3">
                    <p>{item.content}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Zap className="w-3.5 h-3.5" />
                        <span>Energy Level</span>
                      </div>
                      <span className="text-xs font-semibold">{item.energy}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-foreground transition-all"
                        style={{ width: `${item.energy}%` }}
                      />
                    </div>

                    {item.relatedIds.length > 0 && (
                      <div className="pt-2 border-t border-border">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                          <Link className="w-3.5 h-3.5" />
                          <span>Connected Nodes</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {item.relatedIds.map((relatedId) => {
                            const relatedItem = timelineData.find(
                              (i) => i.id === relatedId
                            );
                            return (
                              <Button
                                key={relatedId}
                                variant="outline"
                                size="sm"
                                className="h-7 text-xs"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleItem(relatedId);
                                }}
                              >
                                {relatedItem?.title}
                                <ArrowRight className="w-3 h-3 ml-1" />
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
