import { useEffect, useState } from "react";
import { TrendingUp, Target, Zap } from "lucide-react";

interface ATSScoreCardProps {
  score: number;
  label?: string;
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

export default function ATSScoreCard({ score, label = "ATS Score", size = "md", animate = true }: ATSScoreCardProps) {
  const [displayScore, setDisplayScore] = useState(animate ? 0 : score);

  useEffect(() => {
    if (!animate) return;
    let start = 0;
    const end = score;
    const duration = 1500;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing function
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * end);
      setDisplayScore(start);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [score, animate]);

  const getColor = (s: number) => {
    if (s >= 80) return { text: "#00E6B8", ring: "#00E6B8", glow: "rgba(0,230,184,0.4)" }; // neon teal
    if (s >= 60) return { text: "#ff7700", ring: "#ff7700", glow: "rgba(255,119,0,0.4)" }; // neon orange
    return { text: "#e0128b", ring: "#e0128b", glow: "rgba(224,18,139,0.4)" }; // hot magenta
  };

  const colors = getColor(displayScore);
  const circumference = 2 * Math.PI * (size === "sm" ? 22 : size === "lg" ? 44 : 32);
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;
  const r = size === "sm" ? 22 : size === "lg" ? 44 : 32;
  const cx = r + 8;
  const svgSize = (r + 8) * 2;
  const strokeW = size === "sm" ? 4 : size === "lg" ? 8 : 6;
  const fontSize = size === "sm" ? "text-2xl" : size === "lg" ? "text-6xl" : "text-4xl";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex items-center justify-center border-4 border-black bg-white shadow-[3px_3px_0px_#121214]" 
        style={{ width: svgSize, height: svgSize, borderRadius: "50%" }}>
        
        {/* SVG Progress Arc */}
        <svg width={svgSize} height={svgSize} className="-rotate-90">
          {/* Track (Dark overlay background) */}
          <circle
            cx={cx} cy={cx} r={r}
            fill="none"
            stroke="#f0ece4"
            strokeWidth={strokeW}
          />
          {/* Progress */}
          <circle
            cx={cx} cy={cx} r={r}
            fill="none"
            stroke={colors.ring}
            strokeWidth={strokeW}
            strokeLinecap="square"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: "stroke-dashoffset 0.05s linear",
              filter: `drop-shadow(0 0 3px ${colors.glow})`,
            }}
          />
        </svg>

        {/* Score Number overlay */}
        <div className="absolute flex flex-col items-center">
          <span className={`font-retro font-black leading-none ${fontSize}`} style={{ color: "#121214" }}>
            {displayScore}
          </span>
          {size !== "sm" && (
            <span className="text-[9px] text-gray-500 font-mono -mt-1 font-bold">/ 100</span>
          )}
        </div>
      </div>
      {label && (
        <p className={`font-mono font-bold uppercase tracking-wider text-black text-center ${size === "sm" ? "text-[10px]" : "text-xs"}`}>
          {label}
        </p>
      )}
    </div>
  );
}