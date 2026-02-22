"use client";

import { Mic } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface AIVoiceInputProps {
  onStart?: () => void;
  onStop?: (duration: number) => void;
  visualizerBars?: number;
  demoMode?: boolean;
  demoInterval?: number;
  className?: string;
}

export function AIVoiceInput({
  onStart,
  onStop,
  visualizerBars = 48,
  demoMode = false,
  demoInterval = 3000,
  className,
}: AIVoiceInputProps) {
  const [submitted, setSubmitted] = useState(false);
  const [time, setTime] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isDemo, setIsDemo] = useState(demoMode);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    if (submitted) {
      onStart?.();
      intervalId = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    } else if (time > 0) {
      onStop?.(time);
      setTime(0);
    }

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted]);

  useEffect(() => {
    if (!isDemo) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    const runAnimation = () => {
      setSubmitted(true);
      timeoutId = setTimeout(() => {
        setSubmitted(false);
        timeoutId = setTimeout(runAnimation, 1000);
      }, demoInterval);
    };

    const initialTimeout = setTimeout(runAnimation, 100);
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(initialTimeout);
    };
  }, [isDemo, demoInterval]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleClick = () => {
    if (isDemo) {
      setIsDemo(false);
      setSubmitted(false);
    } else {
      setSubmitted((prev) => !prev);
    }
  };

  return (
    <div className={cn("w-full py-4", className)}>
      <div className="relative w-full flex items-center justify-center">
        {/* Mic Button */}
        <button
          className={cn(
            "group w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 relative z-10",
            submitted
              ? "bg-foreground/10 border-2 border-foreground"
              : "bg-foreground text-background hover:bg-foreground/90"
          )}
          onClick={handleClick}
          type="button"
        >
          {submitted ? (
            <div className="w-5 h-5 rounded-sm bg-foreground animate-pulse" />
          ) : (
            <Mic className="w-6 h-6" />
          )}
        </button>

        {/* Timer */}
        <span
          className={cn(
            "absolute left-1/2 -translate-x-1/2 -top-8 font-mono text-sm text-muted-foreground tabular-nums transition-opacity duration-300",
            submitted ? "opacity-100" : "opacity-0"
          )}
        >
          {formatTime(time)}
        </span>

        {/* Visualizer */}
        <div
          className={cn(
            "flex items-center gap-0.5 h-12 absolute left-1/2 -translate-x-1/2 transition-all duration-300",
            submitted
              ? "w-[60%] opacity-100"
              : "w-0 opacity-0"
          )}
        >
          {isClient &&
            [...Array(visualizerBars)].map((_, i) => (
              <div
                key={i}
                className="flex-1 rounded-full bg-foreground/50 transition-all duration-150"
                style={{
                  height: submitted
                    ? `${20 + Math.random() * 80}%`
                    : "20%",
                  animationDelay: `${i * 50}ms`,
                  animation: submitted
                    ? `pulse ${0.5 + Math.random() * 0.5}s ease-in-out infinite alternate`
                    : "none",
                }}
              />
            ))}
        </div>

        {/* Status Text */}
        <span
          className={cn(
            "absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap transition-opacity duration-300",
            "opacity-100"
          )}
        >
          {submitted ? "聆听中..." : "点击开始语音"}
        </span>
      </div>
    </div>
  );
}
