import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Terminal } from "lucide-react";

const terminalLines = [
  { delay: 0, text: "$ Initializing ResumeForge AI Engine v2.4.1...", type: "cmd" },
  { delay: 400, text: "> Parsing job description for ATS schema...", type: "info" },
  { delay: 800, text: "> Extracting core competencies and required skills...", type: "info" },
  { delay: 1300, text: "> Found 34 hard skills, 12 soft skills, 8 certifications", type: "success" },
  { delay: 1800, text: "> Analyzing your uploaded resume structure...", type: "info" },
  { delay: 2400, text: "> Mapping experience vectors against job requirements...", type: "info" },
  { delay: 3000, text: "> Identifying keyword gaps (23 critical missing terms)...", type: "warn" },
  { delay: 3600, text: "> Running semantic similarity analysis...", type: "info" },
  { delay: 4200, text: "> Injecting LSI keywords contextually...", type: "info" },
  { delay: 4800, text: "> Optimizing bullet point impact scores...", type: "info" },
  { delay: 5400, text: "> Rewriting 14 experience bullets with Gemini AI...", type: "info" },
  { delay: 6000, text: "> Calibrating ATS compatibility matrix...", type: "info" },
  { delay: 6600, text: "> Running final Applicant Tracking System simulation...", type: "info" },
  { delay: 7200, text: "> ATS Score: 91/100 ✓ (was 44/100)", type: "success" },
  { delay: 7800, text: "> Generating formatted document output...", type: "info" },
  { delay: 8400, text: "✓ Resume tailoring complete. Redirecting to results...", type: "done" },
];

const stages = [
  { label: "Parsing JD", width: 15 },
  { label: "Extracting Skills", width: 30 },
  { label: "Gap Analysis", width: 50 },
  { label: "AI Rewriting", width: 75 },
  { label: "ATS Simulation", width: 90 },
  { label: "Finalizing", width: 100 },
];

export default function Processing() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    terminalLines.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, line.delay);
    });

    // Progress bar calculations
    const stageTimings = [400, 1300, 2400, 4200, 6600, 8400];
    stages.forEach((stage, i) => {
      setTimeout(() => {
        setCurrentStage(i);
        setProgress(stage.width);
      }, stageTimings[i]);
    });

    // Redirect trigger
    setTimeout(() => {
      setDone(true);
      setTimeout(() => navigate("/results"), 600);
    }, 8800);
  }, [navigate]);

  const getLineColor = (type: string) => {
    switch (type) {
      case "cmd": return "text-[#818cf8]"; // light indigo
      case "success": return "text-[#00E6B8]"; // neon teal
      case "warn": return "text-[#ff7700]"; // neon orange
      case "done": return "text-[#00E6B8] font-bold";
      default: return "text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#121214] flex items-center justify-center relative overflow-hidden px-4 py-12 font-mono">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(rgba(18,18,20,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(18,18,20,0.5) 1px, transparent 1px)", backgroundSize: "48px 48px" }}
        />
      </div>

      <div className="relative w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-10 border-2 border-black bg-[#e0128b] flex items-center justify-center shadow-[2px_2px_0px_#000] animate-bounce">
              <Zap size={18} className="text-white fill-white" />
            </div>
            <span className="font-retro text-3xl font-black text-black uppercase">
              RESUME<span className="text-[#e0128b]">FORGE</span>
            </span>
          </div>
          <h1 className="font-retro font-black text-4xl text-black uppercase leading-none">
            {done ? "TAILOR RUN COMPLETE!" : "AI OPTIMIZER COMPILING..."}
          </h1>
          <p className="font-mono text-gray-500 text-xs font-bold uppercase tracking-wider mt-2">
            {done ? "Redirecting to output results screen." : "Running semantic calibration. Watch the debugger log."}
          </p>
        </div>

        {/* Progress Bar Panel */}
        <div className="bg-white border-4 border-black p-5 mb-6 shadow-[4px_4px_0px_#121214]">
          <div className="flex items-center justify-between mb-2.5 font-mono text-xs font-bold uppercase text-black">
            <span>{stages[currentStage]?.label}</span>
            <span className="font-retro text-xl text-[#e0128b]">{progress}%</span>
          </div>
          {/* Outer Gauge Bar */}
          <div className="h-5 bg-gray-100 border-2 border-black p-0.5 rounded-none overflow-hidden">
            <div
              className="h-full bg-[#ff7700] transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          {/* Sub stages list indicators */}
          <div className="flex justify-between mt-4">
            {stages.map((stage, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div className={`w-3.5 h-3.5 border-2 border-black transition-all ${i <= currentStage ? "bg-[#00E6B8]" : "bg-white"}`} />
                <span className={`font-mono text-[8px] font-bold uppercase hidden sm:block ${i <= currentStage ? "text-black" : "text-gray-400"}`}>{stage.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal Screen Console */}
        <div className="bg-[#140d25] border-4 border-black shadow-[6px_6px_0px_#121214] overflow-hidden crt-screen">
          {/* Terminal Title Bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b-2 border-black bg-white/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 border border-black bg-[#e0128b]" />
              <div className="w-3 h-3 border border-black bg-[#ff7700]" />
              <div className="w-3 h-3 border border-black bg-[#00E6B8]" />
            </div>
            <div className="flex items-center gap-1.5 ml-3 font-mono text-[10px] font-bold uppercase text-gray-400">
              <Terminal size={11} className="text-gray-500" />
              <span>debugger — resumeforge-ai:3000</span>
            </div>
          </div>

          {/* Terminal Console Logs */}
          <div className="p-5 h-72 overflow-y-auto scrollbar-hide font-mono text-xs bg-black text-gray-300">
            {visibleLines.map((lineIdx) => {
              const line = terminalLines[lineIdx];
              return (
                <div key={lineIdx} className={`mb-1 leading-relaxed uppercase ${getLineColor(line.type)}`}>
                  <span className="text-gray-600 mr-3 select-none text-[10px] font-bold">{String(lineIdx + 1).padStart(2, "0")}</span>
                  {line.text}
                </div>
              );
            })}
            {!done && visibleLines.length > 0 && (
              <div className="flex items-center gap-1 mt-2">
                <span className="text-gray-600 mr-3 text-[10px] font-bold">{String(visibleLines.length + 1).padStart(2, "0")}</span>
                <span className="text-gray-400">▋</span>
                <span className="text-[#00E6B8] animate-retro-blink">_</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom footer note */}
        <p className="text-center font-mono text-[10px] text-gray-500 uppercase tracking-widest mt-6 font-bold">
          Powered by Gemini AI · Semantic NLP · 100+ ATS Simulation Models
        </p>
      </div>
    </div>
  );
}