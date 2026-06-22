import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Download, RotateCcw, ChevronDown, ChevronUp, CheckCircle, AlertCircle, Zap, TrendingUp, Copy, FileText, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import ATSScoreCard from "@/components/ATSScoreCard";
import Markdown from "react-markdown";

export default function Results() {
  const [result, setResult] = useState<any>(null);
  const [meta, setMeta] = useState<any>({});
  const [expandedCategory, setExpandedCategory] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const resultStr = sessionStorage.getItem("rf_result");
    const metaStr = sessionStorage.getItem("rf_meta");

    if (!resultStr) {
      // No result found — redirect back to generate
      navigate("/generate");
      return;
    }

    try {
      setResult(JSON.parse(resultStr));
      if (metaStr) setMeta(JSON.parse(metaStr));
    } catch {
      navigate("/generate");
    }
    setLoading(false);
  }, [navigate]);

  const handleCopy = () => {
    if (result?.tailoredResumeMarkdown) {
      navigator.clipboard.writeText(result.tailoredResumeMarkdown).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    const content = document.getElementById("resume-markdown-content")?.innerHTML || "";
    printWindow.document.write(`
      <html>
        <head>
          <title>Tailored Resume${meta.jobTitle ? ` — ${meta.jobTitle}` : ""}</title>
          <style>
            body { font-family: 'Georgia', serif; line-height: 1.6; padding: 40px; max-width: 800px; margin: auto; color: #111; }
            h1 { font-size: 22px; border-bottom: 2px solid #000; padding-bottom: 8px; margin-bottom: 16px; }
            h2 { font-size: 17px; margin-top: 24px; margin-bottom: 12px; border-bottom: 1px solid #ccc; }
            h3 { font-size: 14px; margin-top: 16px; font-weight: 700; }
            p  { margin-bottom: 8px; }
            ul { margin-bottom: 12px; padding-left: 20px; }
            li { margin-bottom: 4px; }
            strong { font-weight: 700; }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body>${content}<script>window.onload = () => { window.print(); window.close(); }<\/script></body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleDownloadDocx = () => {
    const htmlContent = document.getElementById("resume-markdown-content")?.innerHTML || "";
    const blob = new Blob(["\ufeff", htmlContent], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.href = url;
    a.download = "Tailored_Resume.doc";
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading || !result) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#e0128b] border-t-transparent animate-spin mx-auto mb-4" />
          <p className="font-mono text-sm font-bold uppercase tracking-wider text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  const atsScore = Number(result.atsScore) || 0;
  const missingKeywords: string[] = result.analysis?.missingKeywords || [];
  const skillGaps: string[] = result.analysis?.skillGaps || [];
  const atsIssues: string[] = result.analysis?.atsFormattingIssues || [];
  const markdown: string = result.tailoredResumeMarkdown || "";

  const roleLabel = [meta.jobTitle, meta.company].filter(Boolean).join(" · ").toUpperCase() || "YOUR TAILORED RESUME";

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#121214] font-mono">
      <Navbar />

      {/* Result Banner */}
      <div className="fixed top-16 left-0 right-0 z-40 border-b-4 border-black bg-[#00E6B8] py-2.5 px-4 font-mono font-bold uppercase tracking-wider text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-black">
            <CheckCircle size={14} className="stroke-[3px] flex-shrink-0" />
            <span>
              RESUME OPTIMIZED
              {roleLabel ? `: ${roleLabel}` : ""}
              &bull; ATS SCORE: <strong>{atsScore}/100</strong>
            </span>
          </div>
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <button
              onClick={handleDownloadDocx}
              className="px-3.5 py-1 bg-white hover:bg-gray-100 text-black border-2 border-black font-mono font-bold uppercase tracking-wider text-[10px] shadow-[1.5px_1.5px_0px_#000] transition-all retro-btn-press"
            >
              DOCX
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-1 bg-[#ff7700] hover:bg-[#e06600] text-white border-2 border-black font-mono font-bold uppercase tracking-wider text-[10px] shadow-[1.5px_1.5px_0px_#000] transition-all retro-btn-press"
            >
              DOWNLOAD PDF
            </button>
          </div>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="pt-28 flex flex-col lg:flex-row h-screen lg:h-[calc(100vh-7rem)] overflow-hidden">
        {/* Left: Resume Preview */}
        <div className="w-full lg:w-[60%] lg:flex-shrink-0 lg:h-full overflow-y-auto bg-[#f5efe4] border-b-4 lg:border-b-0 lg:border-r-4 border-black flex flex-col items-center px-4 sm:px-8 py-8 gap-6 min-h-[60vh] lg:min-h-0">
          {/* Controls */}
          <div className="w-full max-w-[600px] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border border-black bg-[#00E6B8] animate-pulse" />
              <span className="font-mono text-xs uppercase font-bold text-black">TAILORED OUTPUT</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1 bg-white hover:bg-gray-100 text-black border-2 border-black font-mono font-bold uppercase tracking-wider text-[10px] shadow-[2px_2px_0px_#000] transition-all retro-btn-press flex items-center gap-1.5"
              >
                {copied ? <CheckCircle size={10} className="text-[#00E6B8] stroke-[3px]" /> : <Copy size={10} />}
                {copied ? "COPIED!" : "COPY TEXT"}
              </button>
              <Link to="/generate">
                <button className="px-3 py-1 bg-white hover:bg-gray-100 text-black border-2 border-black font-mono font-bold uppercase tracking-wider text-[10px] shadow-[2px_2px_0px_#000] transition-all retro-btn-press flex items-center gap-1.5">
                  <RotateCcw size={10} /> RE-RUN
                </button>
              </Link>
            </div>
          </div>

          {/* Resume Paper */}
          <div className="w-full max-w-[600px] border-4 border-black shadow-[8px_8px_0px_#121214] bg-white">
            <div className="bg-white p-8 sm:p-10 overflow-y-auto max-h-[70vh]">
              <div
                id="resume-markdown-content"
                className="prose prose-sm max-w-none text-black font-serif leading-relaxed
                  [&>h1]:font-sans [&>h1]:font-bold [&>h1]:text-2xl [&>h1]:border-b-2 [&>h1]:border-black [&>h1]:pb-2 [&>h1]:mb-4 [&>h1]:text-black
                  [&>h2]:font-sans [&>h2]:font-bold [&>h2]:text-base [&>h2]:uppercase [&>h2]:tracking-wider [&>h2]:mt-6 [&>h2]:mb-3 [&>h2]:text-black
                  [&>h3]:font-sans [&>h3]:font-semibold [&>h3]:text-sm [&>h3]:mt-4 [&>h3]:mb-1 [&>h3]:text-black
                  [&>p]:text-sm [&>p]:text-gray-800 [&>p]:mb-2
                  [&>ul]:text-sm [&>ul]:text-gray-800 [&>ul]:pl-4 [&>ul]:mb-3
                  [&>ul>li]:mb-1
                  [&>strong]:font-bold [&>strong]:text-black"
              >
                <Markdown>{markdown}</Markdown>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Intelligence Panel */}
        <div className="w-full lg:w-[40%] lg:flex-1 overflow-y-auto px-4 sm:px-6 py-8 space-y-6 scrollbar-hide bg-[#faf8f5]">
          {/* ATS Score Card */}
          <div className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_#121214]">
            <div className="flex items-center gap-5 pb-4 mb-4 border-b-2 border-dashed border-gray-200">
              <ATSScoreCard score={atsScore} label="ATS Score" size="md" animate={true} />
              <div className="flex-1 space-y-2">
                <div>
                  <div className="flex justify-between font-mono text-[10px] font-bold text-gray-500 uppercase mb-1">
                    <span>BEFORE</span>
                    <span>~44 / 100</span>
                  </div>
                  <div className="w-full bg-gray-100 border border-black h-3 p-0.5">
                    <div className="bg-[#e0128b] h-full" style={{ width: "44%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-mono text-[10px] font-bold uppercase mb-1" style={{ color: "#00b59a" }}>
                    <span>AFTER</span>
                    <span>{atsScore} / 100</span>
                  </div>
                  <div className="w-full bg-gray-100 border border-black h-3 p-0.5">
                    <div className="bg-[#00E6B8] h-full" style={{ width: `${atsScore}%` }} />
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-[#00E6B8]/15 border border-black px-2.5 py-1">
                  <TrendingUp size={12} className="text-black" />
                  <span className="font-mono text-[10px] font-bold uppercase text-black">
                    AI-OPTIMIZED FOR YOUR TARGET ROLE
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Missing Keywords */}
          {missingKeywords.length > 0 && (
            <div className="bg-white border-4 border-black shadow-[4px_4px_0px_#121214] overflow-hidden">
              <div className="px-5 py-4 border-b-2 border-black bg-[#fbf9f4] flex items-center gap-2">
                <Target size={14} className="text-[#e0128b]" />
                <h3 className="font-retro font-bold text-2xl text-black uppercase leading-none">KEYWORD GAPS</h3>
              </div>
              <div className="p-4">
                <div
                  className="cursor-pointer flex items-center justify-between p-3 border-2 border-black bg-[#faf8f5] mb-2"
                  onClick={() => setExpandedCategory(expandedCategory === 0 ? null : 0)}
                >
                  <span className="font-retro font-bold text-lg text-black uppercase">Missing Keywords ({missingKeywords.length})</span>
                  {expandedCategory === 0 ? <ChevronUp size={14} className="stroke-[2.5px]" /> : <ChevronDown size={14} className="stroke-[2.5px]" />}
                </div>
                {expandedCategory === 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {missingKeywords.map((kw, i) => (
                      <span key={i} className="flex items-center gap-1 text-xs font-mono font-bold text-black bg-[#ff7700]/10 border border-black px-2 py-0.5 shadow-[1px_1px_0px_#000]">
                        <AlertCircle size={9} className="text-[#ff7700] flex-shrink-0" /> {kw}
                      </span>
                    ))}
                  </div>
                )}

                {skillGaps.length > 0 && (
                  <>
                    <div
                      className="cursor-pointer flex items-center justify-between p-3 border-2 border-black bg-[#faf8f5] mt-2 mb-2"
                      onClick={() => setExpandedCategory(expandedCategory === 1 ? null : 1)}
                    >
                      <span className="font-retro font-bold text-lg text-black uppercase">Skill Gaps ({skillGaps.length})</span>
                      {expandedCategory === 1 ? <ChevronUp size={14} className="stroke-[2.5px]" /> : <ChevronDown size={14} className="stroke-[2.5px]" />}
                    </div>
                    {expandedCategory === 1 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {skillGaps.map((s, i) => (
                          <span key={i} className="flex items-center gap-1 text-xs font-mono font-bold text-black bg-red-50 border border-black px-2 py-0.5 shadow-[1px_1px_0px_#000]">
                            <AlertCircle size={9} className="text-red-500 flex-shrink-0" /> {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {atsIssues.length > 0 && (
                  <>
                    <div
                      className="cursor-pointer flex items-center justify-between p-3 border-2 border-black bg-[#faf8f5] mt-2 mb-2"
                      onClick={() => setExpandedCategory(expandedCategory === 2 ? null : 2)}
                    >
                      <span className="font-retro font-bold text-lg text-black uppercase">ATS Issues ({atsIssues.length})</span>
                      {expandedCategory === 2 ? <ChevronUp size={14} className="stroke-[2.5px]" /> : <ChevronDown size={14} className="stroke-[2.5px]" />}
                    </div>
                    {expandedCategory === 2 && (
                      <div className="space-y-1.5 mt-2">
                        {atsIssues.map((s, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs font-mono text-gray-700 bg-blue-50 border border-black p-2">
                            <AlertCircle size={10} className="text-blue-500 flex-shrink-0 mt-0.5" /> {s}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {/* What's Next */}
          <div className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_#121214] space-y-3">
            <div className="flex items-center gap-2 mb-2 border-b-2 border-dashed border-gray-200 pb-2">
              <Zap size={14} className="text-[#ff7700]" />
              <h3 className="font-retro font-black text-2xl text-black uppercase leading-none">WHAT'S NEXT?</h3>
            </div>
            <button
              onClick={handlePrint}
              className="w-full py-3.5 bg-[#ff7700] hover:bg-[#e06600] text-white border-2 border-black shadow-[3px_3px_0px_#000] font-mono font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all retro-btn-press"
            >
              <Download size={14} className="stroke-[2.5px]" /> Download PDF
            </button>
            <button
              onClick={handleDownloadDocx}
              className="w-full py-3 bg-white hover:bg-gray-50 text-black border-2 border-black shadow-[3px_3px_0px_#000] font-mono font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all retro-btn-press"
            >
              <FileText size={14} className="stroke-[2.5px]" /> Download DOCX
            </button>
            <Link to="/generate" className="block">
              <button className="w-full py-3 bg-white hover:bg-gray-100 text-gray-600 hover:text-black border-2 border-transparent hover:border-black font-mono font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all">
                <RotateCcw size={13} /> Optimize Another Resume
              </button>
            </Link>
            <Link to="/dashboard" className="block">
              <button className="w-full py-2 bg-white hover:bg-gray-100 text-gray-400 hover:text-black border-2 border-transparent hover:border-black font-mono font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all">
                <FileText size={13} /> Return to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}