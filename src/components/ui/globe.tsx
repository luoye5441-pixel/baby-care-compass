import { cn } from "@/lib/utils";

export function Globe({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full h-full flex items-center justify-center", className)}>
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full max-w-[400px] max-h-[400px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Glow filter */}
          <radialGradient id="globeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(56, 189, 248, 0.3)" />
            <stop offset="50%" stopColor="rgba(99, 102, 241, 0.1)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Line trail gradients */}
          <linearGradient id="trailGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(34, 211, 238, 0)" />
            <stop offset="50%" stopColor="rgba(34, 211, 238, 0.6)" />
            <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
          </linearGradient>

          <linearGradient id="trailGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(99, 102, 241, 0)" />
            <stop offset="50%" stopColor="rgba(99, 102, 241, 0.6)" />
            <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
          </linearGradient>
        </defs>

        {/* Background glow */}
        <circle cx="200" cy="200" r="180" fill="url(#globeGlow)" />

        {/* Globe group */}
        <g>
          {/* Latitude lines */}
          {[...Array(6)].map((_, i) => {
            const y = 80 + i * 48;
            const radiusAtY = Math.sqrt(Math.max(0, 120 * 120 - (y - 200) * (y - 200)));
            return (
              <ellipse
                key={`lat-${i}`}
                cx="200"
                cy={y}
                rx={radiusAtY}
                ry={radiusAtY * 0.15}
                fill="none"
                stroke="rgba(148, 163, 184, 0.25)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            );
          })}

          {/* Longitude lines */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 180) / 8;
            return (
              <ellipse
                key={`lon-${i}`}
                cx="200"
                cy="200"
                rx={Math.cos((angle * Math.PI) / 180) * 120}
                ry={120}
                fill="none"
                stroke="rgba(148, 163, 184, 0.2)"
                strokeWidth="1"
                strokeDasharray="4 4"
                transform={`rotate(0, 200, 200)`}
              />
            );
          })}

          {/* Orbital trail 1 */}
          <ellipse
            cx="200"
            cy="200"
            rx="150"
            ry="60"
            fill="none"
            stroke="url(#trailGrad1)"
            strokeWidth="2"
            strokeDasharray="8 6"
            transform="rotate(-20, 200, 200)"
            className="animate-flow1"
          />

          {/* Orbital trail 2 */}
          <ellipse
            cx="200"
            cy="200"
            rx="160"
            ry="70"
            fill="none"
            stroke="url(#trailGrad2)"
            strokeWidth="2"
            strokeDasharray="10 8"
            transform="rotate(30, 200, 200)"
            className="animate-flow2"
          />

          {/* Orbital trail 3 */}
          <ellipse
            cx="200"
            cy="200"
            rx="140"
            ry="55"
            fill="none"
            stroke="url(#trailGrad1)"
            strokeWidth="1.5"
            strokeDasharray="6 8"
            transform="rotate(-50, 200, 200)"
            className="animate-flow3"
          />

          {/* Globe outline */}
          <circle
            cx="200"
            cy="200"
            r="120"
            fill="none"
            stroke="rgba(148, 163, 184, 0.3)"
            strokeWidth="1.5"
          />

          {/* Small dots on orbital paths */}
          <circle cx="340" cy="175" r="3" fill="rgba(34, 211, 238, 0.8)" className="animate-pulse-dot" />
          <circle cx="80" cy="240" r="2.5" fill="rgba(99, 102, 241, 0.8)" className="animate-pulse-dot2" />
          <circle cx="280" cy="280" r="2" fill="rgba(34, 211, 238, 0.6)" className="animate-pulse-dot3" />
        </g>
      </svg>

      {/* CSS animations */}
      <style>{`
        .animate-flow1 {
          animation: flowAnimation1 8s linear infinite;
        }
        .animate-flow2 {
          animation: flowAnimation2 10s linear infinite;
        }
        .animate-flow3 {
          animation: flowAnimation3 6s linear infinite;
        }
        .animate-pulse-dot {
          animation: pulseDot 2s ease-in-out infinite;
        }
        .animate-pulse-dot2 {
          animation: pulseDot 2.5s ease-in-out infinite 0.5s;
        }
        .animate-pulse-dot3 {
          animation: pulseDot 3s ease-in-out infinite 1s;
        }
        @keyframes flowAnimation1 {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -100; }
        }
        @keyframes flowAnimation2 {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -120; }
        }
        @keyframes flowAnimation3 {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: 80; }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 0.4; r: 2; }
          50% { opacity: 1; r: 4; }
        }
      `}</style>
    </div>
  );
}
