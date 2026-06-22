import { useState } from "react";
import { Link } from "react-router-dom";
import { Download, Share2, RotateCcw, ChevronDown, ChevronUp, CheckCircle, XCircle, AlertCircle, Zap, TrendingUp, Copy, FileText, Target, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import ATSScoreCard from "@/components/ATSScoreCard";
import ResumePreview from "@/components/ResumePreview";

const keywordCategories = [
  {
    category: "Technical Skills",
    injected: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Docker", "Kubernetes", "AWS", "CI/CD", "GraphQL", "REST APIs", "Microservices"],
    gaps: ["Terraform", "Go", "Prometheus"],
  },
  {
    category: "Leadership & Soft Skills",
    injected: ["Cross-functional collaboration", "Stakeholder management", "Agile/Scrum", "Mentorship", "OKR framework"],
    gaps: ["P&L ownership", "Executive presentations"],
  },
  {
    category: "Impact Metrics",
    injected: ["40% latency reduction", "200K DAU", "30% cost reduction", "99.9% uptime"],
    gaps: ["Revenue impact", "Team size led"],
  },
];

const improvements = [
  { section: "Professional Summary", change: "Rewritten to lead with distributed systems expertise and 7+ years metric", type: "rewrite" },
  { section: "Experience — TechCorp", change: "Added 3 quantified impact bullets; injected 8 keywords", type: "enhance" },
  { section: "Experience — StartupXYZ", change: "Elevated 'built' to 'architected'; added DAU metric", type: "rephrase" },
  { section: "Skills Section", change: "Restructured into 4 categories with 23 new role-specific terms", type: "structure" },
  { section: "ATS Formatting", change: "Removed tables, converted to ATS-safe single-column format", type: "format" },
];

const typeConfig: Record<string, { label: string; className: string }> = {
  rewrite: { label: "REWRITE", className: "bg-purple-100 border border-black text-purple-900 shadow-[1px_1px_0px_#000] font-pixel text-[6px] rounded-none" },
  enhance: { label: "ENHANCED", className: "bg-blue-100 border border-black text-blue-900 shadow-[1px_1px_0px_#000] font-pixel text-[6px] rounded-none" },
  rephrase: { label: "REPHRASED", className: "bg-cyan-100 border border-black text-cyan-900 shadow-[1px_1px_0px_#000] font-pixel text-[6px] rounded-none" },
  structure: { label: "STRUCTURE", className: "bg-amber-100 border border-black text-amber-900 shadow-[1px_1px_0px_#000] font-pixel text-[6px] rounded-none" },
  format: { label: "FORMAT", className: "bg-[#00E6B8]/20 border border-black text-emerald-900 shadow-[1px_1px_0px_#000] font-pixel text-[6px] rounded-none" },
};

export default function Results() {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#121214] font-mono">
      <Navbar />

      {/* Result Banner */}
      <div className="fixed top-16 left-0 right-0 z-40 border-b-4 border-black bg-[#00E6B8] py-2.5 px-4 font-mono font-bold uppercase tracking-wider text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-black">
            <CheckCircle size={14} className="stroke-[3px] flex-shrink-0" />
            <span>
              RESUME OPTIMIZED FOR: <strong>STRIPE · SENIOR PRODUCT MANAGER</strong> &bull; SCORE: <strong>91% ATS COMPATIBILITY</strong>
            </span>
          </div>
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <button className="px-3.5 py-1 bg-white hover:bg-gray-100 text-black border-2 border-black font-mono font-bold uppercase tracking-wider text-[10px] shadow-[1.5px_1.5px_0px_#000] transition-all retro-btn-press">
              SHARE
            </button>
            <button className="px-3.5 py-1 bg-[#ff7700] hover:bg-[#e06600] text-white border-2 border-black font-mono font-bold uppercase tracking-wider text-[10px] shadow-[1.5px_1.5px_0px_#000] transition-all retro-btn-press">
              DOWNLOAD PDF
            </button>
          </div>
        </div>
      </div>

      {/* Main Split */}
      <div className="pt-28 flex flex-col lg:flex-row h-screen lg:h-[calc(100vh-7rem)] overflow-hidden">
        {/* Left: Resume Preview (60%) — fixed scroll */}
        <div className="w-full lg:w-[62%] lg:flex-shrink-0 lg:h-full overflow-y-auto bg-[#f5efe4] border-b-4 lg:border-b-0 lg:border-r-4 border-black flex flex-col items-center px-4 sm:px-8 py-8 gap-6 min-h-[60vh] lg:min-h-0">
          {/* Preview controls */}
          <div className="w-full max-w-[560px] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border border-black bg-[#00E6B8] animate-pulse" />
              <span className="font-mono text-xs uppercase font-bold text-black">TAILORED OUTPUT PREVIEW</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 bg-white hover:bg-gray-150 text-black border-2 border-black font-mono font-bold uppercase tracking-wider text-[10px] shadow-[2px_2px_0px_#000] transition-all retro-btn-press flex items-center gap-1.5" onClick={handleCopy}>
                {copied ? <CheckCircle size={10} className="text-[#00E6B8] stroke-[3px]" /> : <Copy size={10} />}
                {copied ? "COPIED!" : "COPY RAW"}
              </button>
              <Link to="/generate">
                <button className="px-3 py-1 bg-white hover:bg-gray-150 text-black border-2 border-black font-mono font-bold uppercase tracking-wider text-[10px] shadow-[2px_2px_0px_#000] transition-all retro-btn-press flex items-center gap-1.5">
                  <RotateCcw size={10} /> RE-RUN
                </button>
              </Link>
            </div>
          </div>

          {/* A4 Sheet Paper */}
          <div className="w-full max-w-[560px] border-4 border-black shadow-[8px_8px_0px_#121214] bg-white">
            <ResumePreview candidateName="Alexandra Chen" role="Senior Product Manager" />
          </div>

          {/* Template Label */}
          <div className="w-full max-w-[560px] flex items-center justify-between font-mono text-xs font-bold uppercase tracking-wide text-black pb-4">
            <span>TEMPLATE FORMAT: EXECUTIVE PRO</span>
            <Link to="/templates" className="text-[#e0128b] hover:underline font-bold">CHANGE STYLE &rarr;</Link>
          </div>
        </div>

        {/* Right: Intelligence Panel (40%) — scroll */}
        <div className="w-full lg:w-[38%] lg:flex-1 overflow-y-auto px-4 sm:px-6 py-8 space-y-6 scrollbar-hide bg-[#faf8f5]">
          {/* ATS Score card panel */}
          <div className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_#121214]">
            <div className="flex items-center gap-5 border-b-2 border-dashed border-gray-200 pb-4 mb-4">
              <ATSScoreCard score={91} label="ATS Score" size="md" animate={true} />
              <div className="flex-1 space-y-2">
                <div>
                  <div className="flex justify-between font-mono text-[10px] font-bold text-gray-500 uppercase">
                    <span>BEFORE OPTIMIZE</span>
                    <span>44 / 100</span>
                  </div>
                  <div className="w-full bg-gray-100 border border-black h-3 p-0.5">
                    <div className="bg-[#e0128b] h-full" style={{ width: "44%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-mono text-[10px] font-bold text-[#00E6B8] uppercase">
                    <span>AFTER OPTIMIZE</span>
                    <span>91 / 100</span>
                  </div>
                  <div className="w-full bg-gray-100 border border-black h-3 p-0.5">
                    <div className="bg-[#00E6B8] h-full" style={{ width: "91%" }} />
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-[#00E6B8]/15 border border-black px-2.5 py-1">
                  <TrendingUp size={12} className="text-black" />
                  <span className="font-mono text-[10px] font-bold uppercase text-black">+47 POINTS HIGHER SPEED RUN</span>
                </div>
              </div>
            </div>

            {/* Sub-scores */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Keyword Match", score: 94, color: "#00E6B8" },
                { label: "Readability", score: 88, color: "#ff7700" },
                { label: "Format Score", score: 96, color: "#e0128b" },
              ].map((sub) => (
                <div key={sub.label} className="bg-[#faf8f5] border-2 border-black p-2.5 text-center shadow-[1.5px_1.5px_0px_#000]">
                  <p className="font-retro font-black text-3xl leading-none" style={{ color: sub.color }}>{sub.score}</p>
                  <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-gray-500 mt-1">{sub.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Keyword analysis details */}
          <div className="bg-white border-4 border-black shadow-[4px_4px_0px_#121214] overflow-hidden">
            <div className="px-5 py-4 border-b-2 border-black bg-[#fbf9f4]">
              <div className="flex items-center gap-2">
                <Target size={14} className="text-[#e0128b]" />
                <h3 className="font-retro font-black text-2xl text-black uppercase leading-none">KEYWORD GAP LOG</h3>
              </div>
              <p className="font-mono text-gray-500 text-[10px] uppercase font-bold mt-0.5">23 keywords injected · 5 gaps remaining</p>
            </div>

            <div className="p-4 space-y-3">
              {keywordCategories.map((cat, i) => (
                <div key={i} className="border-2 border-black bg-white shadow-[2px_2px_0px_#000] overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                    onClick={() => setExpandedCategory(expandedCategory === i ? null : i)}
                  >
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-retro font-bold text-lg text-black uppercase leading-none">{cat.category}</span>
                      <span className="font-pixel text-[6px] text-black bg-[#00E6B8] border border-black px-1.5 py-0.5 rounded-none uppercase">{cat.injected.length} INJECTED</span>
                      {cat.gaps.length > 0 && (
                        <span className="font-pixel text-[6px] text-white bg-[#ff7700] border border-black px-1.5 py-0.5 rounded-none uppercase">{cat.gaps.length} GAPS</span>
                      )}
                    </div>
                    {expandedCategory === i ? <ChevronUp size={14} className="text-black stroke-[2.5px]" /> : <ChevronDown size={14} className="text-black stroke-[2.5px]" />}
                  </button>

                  {expandedCategory === i && (
                    <div className="px-4 pb-4 space-y-3 pt-2 border-t-2 border-dashed border-gray-200">
                      <div>
                        <p className="font-mono text-[9px] uppercase font-bold text-gray-500 mb-2">Injected Keywords</p>
                        <div className="flex flex-wrap gap-1.5">
                          {cat.injected.map((kw) => (
                            <span key={kw} className="flex items-center gap-1 text-[11px] font-mono font-bold text-black bg-[#00E6B8]/15 border border-black px-2 py-0.5 shadow-[1px_1px_0px_#000]">
                              <CheckCircle size={9} className="text-black stroke-[2.5px] flex-shrink-0" /> {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                      {cat.gaps.length > 0 && (
                        <div>
                          <p className="font-mono text-[9px] uppercase font-bold text-gray-500 mb-2">Suggested Gaps</p>
                          <div className="flex flex-wrap gap-1.5">
                            {cat.gaps.map((kw) => (
                              <span key={kw} className="flex items-center gap-1 text-[11px] font-mono font-bold text-black bg-[#ff7700]/10 border border-black px-2 py-0.5 shadow-[1px_1px_0px_#000]">
                                <AlertCircle size={9} className="text-black stroke-[2.5px] flex-shrink-0" /> {kw}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* AI changes log list */}
          <div className="bg-white border-4 border-black shadow-[4px_4px_0px_#121214] overflow-hidden">
            <div className="px-5 py-4 border-b-2 border-black bg-[#fbf9f4]">
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-[#ff7700]" />
                <h3 className="font-retro font-black text-2xl text-black uppercase leading-none">AI CHANGES APPLIED</h3>
              </div>
              <p className="font-mono text-gray-500 text-[10px] uppercase font-bold mt-0.5">{improvements.length} modifications across sections</p>
            </div>
            <div className="p-4 space-y-3.5">
              {improvements.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 border-2 border-black bg-white hover:bg-gray-150 shadow-[2px_2px_0px_#000] retro-btn-press">
                  <div className={`flex-shrink-0 mt-0.5 inline-flex items-center px-2 py-0.5 font-bold border uppercase text-[9px] ${typeConfig[item.type].className}`}>
                    {typeConfig[item.type].label}
                  </div>
                  <div>
                    <p className="font-retro font-bold text-lg text-black uppercase leading-none">{item.section}</p>
                    <p className="font-mono text-xs text-gray-600 font-semibold uppercase mt-1">{item.change}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Steps controls */}
          <div className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_#121214] space-y-3">
            <h3 className="font-retro font-black text-2xl text-black uppercase leading-none mb-2 border-b-2 border-dashed border-gray-200 pb-2">WHAT'S NEXT?</h3>
            <button className="w-full py-3.5 bg-[#ff7700] hover:bg-[#e06600] text-white border-2 border-black shadow-[3px_3px_0px_#000] font-mono font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all retro-btn-press">
              <Download size={14} className="stroke-[2.5px]" /> DOWNLOAD RESUME (PDF)
            </button>
            <Link to="/generate" className="block">
              <button className="w-full py-3 bg-white hover:bg-gray-100 text-black border-2 border-black shadow-[3px_3px_0px_#000] font-mono font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all retro-btn-press">
                <RotateCcw size={14} className="stroke-[2.5px]" /> RUN ANOTHER OPTIMIZATION
              </button>
            </Link>
            <Link to="/dashboard" className="block">
              <button className="w-full py-2 bg-white hover:bg-gray-100 text-gray-500 hover:text-black border-2 border-transparent hover:border-black font-mono font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all">
                <FileText size={13} /> Return to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}