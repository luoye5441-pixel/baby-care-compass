"use client";

import { Mic } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

import voice1 from "@/assets/voice-1.mp3";
import voice2 from "@/assets/voice-2.mp3";
import voice3 from "@/assets/voice-3.mp3";
import voice4 from "@/assets/voice-4.mp3";

const voiceFiles = [voice1, voice2, voice3, voice4];

export default function AIVoiceInput() {
  const [submitted, setSubmitted] = useState(false);
  const [time, setTime] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playIndexRef = useRef(0);
  const cancelledRef = useRef(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    if (submitted) {
      intervalId = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    } else {
      setTime(0);
    }

    return () => clearInterval(intervalId);
  }, [submitted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const playSequence = useCallback(() => {
    cancelledRef.current = false;
    setIsPlaying(true);
    setSubmitted(true);
    playIndexRef.current = 0;

    // Reuse a single Audio element for mobile compatibility.
    // Mobile browsers only allow play() from a direct user gesture;
    // creating new Audio objects in async callbacks gets blocked.
    const audio = audioRef.current || new Audio();
    audioRef.current = audio;
    audio.src = voiceFiles[0];

    const playNext = () => {
      const idx = playIndexRef.current;
      if (cancelledRef.current || idx >= voiceFiles.length) {
        setIsPlaying(false);
        setSubmitted(false);
        return;
      }
      audio.src = voiceFiles[idx];
      audio.load();
      audio.play().catch(() => {
        setIsPlaying(false);
        setSubmitted(false);
      });
    };

    audio.onended = () => {
      playIndexRef.current += 1;
      if (cancelledRef.current || playIndexRef.current >= voiceFiles.length) {
        setIsPlaying(false);
        setSubmitted(false);
        return;
      }
      // 1s gap between clips
      setTimeout(playNext, 1000);
    };

    audio.onerror = () => {
      playIndexRef.current += 1;
      playNext();
    };

    // Start first clip immediately (within user gesture)
    audio.play().catch(() => {
      setIsPlaying(false);
      setSubmitted(false);
    });
  }, []);

  const stopPlayback = useCallback(() => {
    cancelledRef.current = true;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
    }
    setIsPlaying(false);
    setSubmitted(false);
  }, []);

  const handleClick = () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      playSequence();
    }
  };

  return (
    <div className="w-full py-4">
      <div className="relative max-w-xl w-full mx-auto flex items-center flex-col gap-2">
        <button
          className={cn(
            "group w-16 h-16 rounded-xl flex items-center justify-center transition-colors",
            submitted
              ? "bg-none"
              : "bg-none hover:bg-white/5"
          )}
          type="button"
          onClick={handleClick}
        >
          {submitted ? (
            <div
              className="w-6 h-6 rounded-sm animate-spin bg-white cursor-pointer pointer-events-auto"
              style={{ animationDuration: "3s" }}
            />
          ) : (
            <Mic className="w-6 h-6 text-white/90" />
          )}
        </button>

        <span
          className={cn(
            "font-mono text-sm transition-opacity duration-300",
            submitted
              ? "text-white/70"
              : "text-white/30"
          )}
        >
          {formatTime(time)}
        </span>

        <div className="h-4 w-64 flex items-center justify-center gap-0.5">
          {[...Array(48)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-0.5 rounded-full transition-all duration-300",
                submitted
                  ? "bg-white/50 animate-pulse"
                  : "bg-white/10 h-1"
              )}
              style={
                submitted && isClient
                  ? {
                      height: `${20 + Math.random() * 80}%`,
                      animationDelay: `${i * 0.05}s`,
                    }
                  : undefined
              }
            />
          ))}
        </div>

        <p className="h-4 text-xs text-white/70">
          {submitted ? "Listening..." : "Click to speak"}
        </p>
      </div>
    </div>
  );
}
