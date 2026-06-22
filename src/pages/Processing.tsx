import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Terminal, AlertCircle } from "lucide-react";

const terminalLines = [
  { delay: 0,    text: "$ Initializing ResumeForge AI Engine v2.4.1...", type: "cmd" },
  { delay: 600,  text: "> Parsing job description for ATS schema...", type: "info" },
  { delay: 1200, text: "> Extracting core competencies and required skills...", type: "info" },
  { delay: 2000, text: "> Analyzing your uploaded resume structure...", type: "info" },
  { delay: 2800, text: "> Mapping experience vectors against job requirements...", type: "info" },
  { delay: 3800, text: "> Identifying keyword gaps...", type: "warn" },
  { delay: 4800, text: "> Running Gemini AI semantic analysis...", type: "info" },
  { delay: 5800, text: "> Injecting LSI keywords contextually...", type: "info" },
  { delay: 6800, text: "> Rewriting experience bullets with AI...", type: "info" },
  { delay: 7800, text: "> Calibrating ATS compatibility matrix...", type: "info" },
  { delay: 8600, text: "> Running final ATS simulation...", type: "info" },
];

const stages = [
  { label: "Parsing JD", width: 15 },
  { label: "Extracting Skills", width: 30 },
  { label: "Gap Analysis", width: 50 },
  { label: "AI Rewriting", width: 75 },
  { label: "ATS Simulation", width: 90 },
  { label: "Finalizing", width: 100 },
];

const stageTimings = [600, 1200, 2800, 4800, 6800, 8600];

export default function Processing() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState("Calling Gemini AI...");
  const navigate = useNavigate();
  const apiCalledRef = useRef(false);

  useEffect(() => {
    // Animate terminal lines
    terminalLines.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, line.delay);
    });

    // Animate stages
    stageTimings.forEach((time, i) => {
      setTimeout(() => {
        setCurrentStage(i);
        setProgress(stages[i].width);
      }, time);
    });
  }, []);

  useEffect(() => {
    // Call API once on mount
    if (apiCalledRef.current) return;
    apiCalledRef.current = true;

    const run = async () => {
      try {
        // Read saved form data from sessionStorage
        const formDataStr = sessionStorage.getItem("rf_generate_data");
        const fileDataStr = sessionStorage.getItem("rf_resume_file");

        if (!formDataStr || !fileDataStr) {
          throw new Error("No form data found. Please go back and fill in the form.");
        }

        const formData = JSON.parse(formDataStr);
        const fileData = JSON.parse(fileDataStr);

        // Reconstruct File from base64
        const base64Response = await fetch(fileData.data);
        const blob = await base64Response.blob();
        const file = new File([blob], fileData.name, { type: fileData.type });

        setApiStatus("Uploading resume to Gemini...");

        const payload = new FormData();
        payload.append("resume", file);
        payload.append("jobDescription", formData.jd);
        payload.append("templateStr", formData.template || "ATS Classic");

        setApiStatus("AI is analyzing and rewriting your resume...");

        const res = await fetch("/api/tailor", {
          method: "POST",
          body: payload,
        });

        if (!res.ok) {
          const errInfo = await res.json().catch(() => ({ error: "Unknown error" }));
          throw new Error(errInfo.error || `API error: ${res.status}`);
        }

        const result = await res.json();

        // Save result to sessionStorage for Results page
        sessionStorage.setItem("rf_result", JSON.stringify(result));
        sessionStorage.setItem("rf_meta", JSON.stringify({
          jobTitle: formData.jobTitle,
          company: formData.company,
        }));

        // Clean up file data to free memory
        sessionStorage.removeItem("rf_resume_file");

        setApiStatus("Done! Loading your tailored resume...");
        setDone(true);

        // Brief pause then navigate
        setTimeout(() => navigate("/results"), 1000);
      } catch (e: any) {
        console.error("API call failed:", e);
        setError(e.message || "An error occurred during generation.");
      }
    };

    // Start API call with a slight delay (let animation start first)
    setTimeout(run, 800);
  }, [navigate]);

  const getLineColor = (type: string) => {
    switch (type) {
      case "cmd":     return "text-[#818cf8]";
      case "success": return "text-[#00E6B8]";
      case "warn":    return "text-[#ff7700]";
      case "done":    return "text-[#00E6B8] font-bold";
      default:        return "text-gray-300";
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center px-4">
        <div className="w-full max-w-lg bg-white border-4 border-black p-8 shadow-[6px_6px_0px_#121214] text-center">
          <div className="w-14 h-14 bg-red-100 border-2 border-black flex items-center justify-center mx-auto mb-5 shadow-[2px_2px_0px_#000]">
            <AlertCircle size={24} className="text-red-600" />
          </div>
          <h2 className="font-retro font-black text-3xl text-black uppercase mb-3">Generation Failed</h2>
          <p className="font-mono text-sm text-gray-600 mb-6 leading-relaxed">{error}</p>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/generate")}
              className="w-full py-3 bg-[#e0128b] text-white border-2 border-black shadow-[3px_3px_0px_#000] font-mono font-bold uppercase tracking-wider text-xs retro-btn-press"
            >
              ← Go Back & Try Again
            </button>
            <p className="font-mono text-xs text-gray-400">
              Make sure the server is running at localhost:3000 and GEMINI_API_KEY is set.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#121214] flex items-center justify-center relative overflow-hidden px-4 py-12 font-mono">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(18,18,20,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(18,18,20,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
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
            {done ? "TAILOR RUN COMPLETE!" : "AI OPTIMIZER RUNNING..."}
          </h1>
          <p className="font-mono text-gray-500 text-xs font-bold uppercase tracking-wider mt-2">
            {done ? "Redirecting to your tailored resume..." : apiStatus}
          </p>
        </div>

        {/* Progress Bar Panel */}
        <div className="bg-white border-4 border-black p-5 mb-6 shadow-[4px_4px_0px_#121214]">
          <div className="flex items-center justify-between mb-2.5 font-mono text-xs font-bold uppercase text-black">
            <span>{stages[currentStage]?.label}</span>
            <span className="font-retro text-xl text-[#e0128b]">{progress}%</span>
          </div>
          <div className="h-5 bg-gray-100 border-2 border-black p-0.5 overflow-hidden">
            <div
              className="h-full bg-[#ff7700] transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-4">
            {stages.map((stage, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-3.5 h-3.5 border-2 border-black transition-all ${
                    i <= currentStage ? "bg-[#00E6B8]" : "bg-white"
                  }`}
                />
                <span
                  className={`font-mono text-[8px] font-bold uppercase hidden sm:block ${
                    i <= currentStage ? "text-black" : "text-gray-400"
                  }`}
                >
                  {stage.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal Console */}
        <div className="bg-[#140d25] border-4 border-black shadow-[6px_6px_0px_#121214] overflow-hidden crt-screen">
          <div className="flex items-center gap-2 px-4 py-3 border-b-2 border-black bg-white/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 border border-black bg-[#e0128b]" />
              <div className="w-3 h-3 border border-black bg-[#ff7700]" />
              <div className="w-3 h-3 border border-black bg-[#00E6B8]" />
            </div>
            <div className="flex items-center gap-1.5 ml-3 font-mono text-[10px] font-bold uppercase text-gray-400">
              <Terminal size={11} className="text-gray-500" />
              <span>gemini-ai-engine — resumeforge:3000</span>
            </div>
          </div>

          <div className="p-5 h-72 overflow-y-auto scrollbar-hide font-mono text-xs bg-black text-gray-300">
            {visibleLines.map((lineIdx) => {
              const line = terminalLines[lineIdx];
              return (
                <div key={lineIdx} className={`mb-1 leading-relaxed ${getLineColor(line.type)}`}>
                  <span className="text-gray-600 mr-3 select-none text-[10px] font-bold">
                    {String(lineIdx + 1).padStart(2, "0")}
                  </span>
                  {line.text}
                </div>
              );
            })}
            {done && (
              <div className="mb-1 leading-relaxed text-[#00E6B8] font-bold">
                <span className="text-gray-600 mr-3 select-none text-[10px] font-bold">
                  {String(terminalLines.length + 1).padStart(2, "0")}
                </span>
                ✓ Resume tailoring complete. Redirecting to results...
              </div>
            )}
            {!done && visibleLines.length > 0 && (
              <div className="flex items-center gap-1 mt-2">
                <span className="text-gray-600 mr-3 text-[10px] font-bold">
                  {String(visibleLines.length + 1).padStart(2, "0")}
                </span>
                <span className="text-[#00E6B8] animate-retro-blink">█</span>
              </div>
            )}
          </div>
        </div>

        <p className="text-center font-mono text-[10px] text-gray-400 uppercase tracking-widest mt-6 font-bold">
          Powered by Gemini AI · Semantic NLP · ATS Simulation
        </p>
      </div>
    </div>
  );
}