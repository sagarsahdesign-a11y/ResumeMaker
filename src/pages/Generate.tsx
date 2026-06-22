import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Upload, FileText, Check, X, Zap, ArrowLeft, ArrowRight, Sparkles, AlertCircle } from "lucide-react";

const steps = [
  { id: 1, label: "Job Description", sublabel: "Paste the JD" },
  { id: 2, label: "Upload Resume", sublabel: "Your current CV" },
  { id: 3, label: "Configure AI", sublabel: "Tailoring options" },
];

const toneOptions = [
  { id: "professional", label: "Professional", desc: "Conservative, formal language" },
  { id: "impactful", label: "Impactful", desc: "Results-oriented, data-driven" },
  { id: "technical", label: "Technical", desc: "Detailed, specification-focused" },
  { id: "executive", label: "Executive", desc: "Strategic, leadership-focused" },
];

export default function Generate() {
  const [currentStep, setCurrentStep] = useState(1);
  const [jd, setJd] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [tone, setTone] = useState("impactful");
  const [aggressiveness, setAggressiveness] = useState(70);
  const [preserveFormatting, setPreserveFormatting] = useState(true);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const goNext = () => {
    setDirection("forward");
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save form data to sessionStorage before navigating to processing
      const formData = {
        jd,
        jobTitle,
        company,
        tone,
        aggressiveness,
        preserveFormatting,
        template: "ATS Classic",
      };
      sessionStorage.setItem("rf_generate_data", JSON.stringify(formData));
      
      // We need to pass the file via a different mechanism
      // Store file in a global ref that Processing page can access
      if (file) {
        // Store file as base64 in sessionStorage for the processing page
        const reader = new FileReader();
        reader.onload = (e) => {
          const fileData = {
            name: file.name,
            type: file.type,
            data: e.target?.result as string,
          };
          sessionStorage.setItem("rf_resume_file", JSON.stringify(fileData));
          navigate("/processing");
        };
        reader.readAsDataURL(file);
      } else {
        navigate("/processing");
      }
    }
  };

  const goBack = () => {
    setDirection("back");
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const canProceed = () => {
    if (currentStep === 1) return jd.length > 50;
    if (currentStep === 2) return fileName !== "";
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setFileName(f.name);
    }
  };

  const handleDropZoneClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col items-center justify-center relative overflow-hidden px-4 py-12">
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

      <div className="relative w-full max-w-3xl">
        {/* Brand bar */}
        <div className="flex items-center justify-between mb-10 border-b-4 border-black pb-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 border-2 border-black bg-[#e0128b] flex items-center justify-center shadow-[2px_2px_0px_#121214] retro-btn-press">
              <Zap size={14} className="text-white fill-white" />
            </div>
            <span className="font-retro text-2xl font-black text-black tracking-wide uppercase">
              RESUME<span className="text-[#e0128b]">FORGE</span>
            </span>
          </Link>
          <div className="flex items-center gap-1.5 bg-black border-2 border-black text-[#00E6B8] px-3.5 py-1.5 shadow-[2px_2px_0px_#000]">
            <Sparkles size={12} className="text-[#00E6B8]" />
            <span className="font-pixel text-[8px] uppercase tracking-wider">Focus Mode</span>
          </div>
        </div>

        {/* Stepper Progress */}
        <div className="flex items-center mb-10 overflow-x-auto pb-4 scrollbar-hide">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center flex-1 min-w-0">
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className={`w-9 h-9 border-2 border-black flex items-center justify-center transition-all duration-300 shadow-[2px_2px_0px_#121214] ${
                    currentStep > step.id
                      ? "bg-[#00E6B8] text-black"
                      : currentStep === step.id
                      ? "bg-[#e0128b] text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check size={14} className="stroke-[3px]" />
                  ) : (
                    <span className="font-pixel text-xs">{step.id}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={`font-mono font-bold text-[10px] uppercase tracking-wider ${
                      currentStep === step.id ? "text-[#e0128b]" : "text-black"
                    }`}
                  >
                    {step.label}
                  </p>
                  <p className="font-mono text-[9px] text-gray-500 uppercase mt-0.5 hidden sm:block">
                    {step.sublabel}
                  </p>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 border border-black transition-all duration-300 ${
                    currentStep > step.id ? "bg-[#00E6B8]" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Card */}
        <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_#121214]">
          {/* ── Step 1: Job Description ── */}
          {currentStep === 1 && (
            <div className="animate-fade-up">
              <h2 className="font-retro font-black text-3xl text-black mb-1 uppercase">
                PASTE THE JOB DESCRIPTION
              </h2>
              <p className="font-mono text-gray-600 text-sm mb-6 font-medium tracking-wide">
                The AI will extract keywords and skills to tailor your resume.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="text-black font-mono text-xs font-bold uppercase tracking-wider mb-2 block">
                    Job Title
                  </label>
                  <input
                    placeholder="e.g. Senior Product Manager"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full bg-white border-2 border-black text-black placeholder:text-gray-400 h-11 px-4 font-mono text-sm outline-none focus:border-[#e0128b] shadow-[2px_2px_0px_#000] focus:shadow-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-black font-mono text-xs font-bold uppercase tracking-wider mb-2 block">
                    Company
                  </label>
                  <input
                    placeholder="e.g. Stripe"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-white border-2 border-black text-black placeholder:text-gray-400 h-11 px-4 font-mono text-sm outline-none focus:border-[#e0128b] shadow-[2px_2px_0px_#000] focus:shadow-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-black font-mono text-xs font-bold uppercase tracking-wider mb-2 block">
                  Full Job Description *
                </label>
                <textarea
                  placeholder="Paste the complete job description here — requirements, responsibilities, qualifications..."
                  value={jd}
                  onChange={(e) => setJd(e.target.value)}
                  rows={9}
                  className="w-full bg-white border-2 border-black text-black placeholder:text-gray-400 p-4 font-mono text-sm outline-none focus:border-[#e0128b] shadow-[2px_2px_0px_#000] focus:shadow-none transition-all resize-none"
                />
                <div className="flex items-center justify-between mt-2 font-mono text-[10px] font-bold uppercase tracking-wide">
                  <p className="text-gray-500">{jd.length} characters</p>
                  {jd.length > 0 && jd.length < 50 && (
                    <div className="flex items-center gap-1 text-[#ff7700]">
                      <AlertCircle size={12} />
                      <span>Need more text</span>
                    </div>
                  )}
                  {jd.length >= 50 && (
                    <div className="flex items-center gap-1 text-[#00E6B8]">
                      <Check size={12} className="stroke-[3px]" />
                      <span>Ready for analysis</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── Step 2: Upload Resume ── */}
          {currentStep === 2 && (
            <div className="animate-fade-up">
              <h2 className="font-retro font-black text-3xl text-black mb-1 uppercase">
                UPLOAD YOUR RESUME
              </h2>
              <p className="font-mono text-gray-600 text-sm mb-8 font-medium tracking-wide">
                This will be tailored by AI. Supported formats: PDF, DOCX, TXT
              </p>

              <div
                className={`relative border-4 border-dashed p-10 text-center transition-all cursor-pointer ${
                  fileName
                    ? "border-[#00E6B8] bg-[#00E6B8]/5"
                    : "border-black hover:border-[#e0128b] hover:bg-[#e0128b]/5"
                }`}
                onClick={handleDropZoneClick}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileChange}
                />
                {fileName ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 border-2 border-black bg-[#faf8f5] flex items-center justify-center shadow-[2px_2px_0px_#000]">
                      <FileText size={20} className="text-black" />
                    </div>
                    <p className="font-retro font-bold text-2xl text-black uppercase tracking-wide">
                      {fileName}
                    </p>
                    <p className="font-mono text-xs text-gray-600 font-bold">READY FOR AI OPTIMIZATION</p>
                    <button
                      className="text-red-600 hover:text-red-700 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1 mt-2 border border-red-400 px-3 py-1 retro-btn-press"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                        setFileName("");
                      }}
                    >
                      <X size={12} className="stroke-[2.5px]" /> Remove File
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 border-2 border-black bg-[#faf8f5] flex items-center justify-center shadow-[2px_2px_0px_#000]">
                      <Upload size={20} className="text-[#e0128b]" />
                    </div>
                    <div>
                      <p className="font-retro font-bold text-2xl text-black uppercase tracking-wide">
                        DRAG FILE HERE
                      </p>
                      <p className="font-mono text-xs text-gray-500 font-bold mt-1">
                        OR CLICK TO BROWSE
                      </p>
                    </div>
                    <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                      MAX FILE SIZE 10MB · PDF, DOCX, TXT
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Step 3: Configure ── */}
          {currentStep === 3 && (
            <div className="animate-fade-up">
              <h2 className="font-retro font-black text-3xl text-black mb-1 uppercase">
                CONFIGURE AI PARAMETERS
              </h2>
              <p className="font-mono text-gray-600 text-sm mb-8 font-medium tracking-wide">
                Fine-tune the rewrite settings for maximum ATS compatibility.
              </p>

              <div className="space-y-6">
                {/* Tone selector */}
                <div>
                  <label className="text-black font-mono text-xs font-bold uppercase tracking-wider mb-3 block">
                    Writing Tone
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {toneOptions.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTone(t.id)}
                        className={`text-left p-4 border-2 border-black transition-all shadow-[3px_3px_0px_#121214] retro-btn-press ${
                          tone === t.id
                            ? "bg-[#e0128b] text-white"
                            : "bg-white text-black hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          {tone === t.id && (
                            <div className="w-2.5 h-2.5 bg-white border border-black animate-pulse" />
                          )}
                          <p className="font-retro font-bold text-xl uppercase">{t.label}</p>
                        </div>
                        <p className={`font-mono text-xs ${tone === t.id ? "text-pink-100" : "text-gray-500"}`}>
                          {t.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Aggressiveness slider */}
                <div>
                  <div className="flex items-center justify-between mb-3 font-mono text-xs font-bold uppercase text-black">
                    <span>Keyword Injection Intensity</span>
                    <span className="font-retro text-xl text-[#e0128b]">{aggressiveness}%</span>
                  </div>
                  <input
                    type="range"
                    min={30}
                    max={100}
                    value={aggressiveness}
                    onChange={(e) => setAggressiveness(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 border-2 border-black outline-none appearance-none rounded-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #ff7700 ${aggressiveness}%, #e5e7eb ${aggressiveness}%)`,
                    }}
                  />
                  <div className="flex justify-between mt-1.5 font-mono text-[10px] font-bold text-gray-500 uppercase">
                    <span>Min Overwrite</span>
                    <span>Max Compatibility</span>
                  </div>
                </div>

                {/* Preserve formatting toggle */}
                <div className="flex items-center justify-between p-4 border-2 border-black bg-[#faf8f5] shadow-[2px_2px_0px_#000]">
                  <div>
                    <p className="font-retro font-bold text-lg text-black uppercase leading-none">
                      Preserve Base Layout
                    </p>
                    <p className="font-mono text-[10px] text-gray-500 font-bold mt-1">
                      Maintain section structure while rewriting content
                    </p>
                  </div>
                  <button
                    onClick={() => setPreserveFormatting(!preserveFormatting)}
                    className={`w-12 h-6 border-2 border-black transition-all relative ${
                      preserveFormatting ? "bg-[#00E6B8]" : "bg-white"
                    }`}
                  >
                    <div
                      className="absolute top-0.5 w-4 h-4 border border-black bg-white transition-all"
                      style={{ left: preserveFormatting ? "24px" : "2px" }}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t-2 border-dashed border-black">
            <button
              onClick={goBack}
              disabled={currentStep === 1}
              className="px-4 py-2 border-2 border-black bg-white hover:bg-gray-100 text-black font-mono font-bold uppercase tracking-wider text-xs shadow-[2px_2px_0px_#000] disabled:opacity-30 disabled:pointer-events-none retro-btn-press"
            >
              ← Back
            </button>

            <div className="flex items-center gap-1.5">
              {steps.map((s) => (
                <div
                  key={s.id}
                  className={`w-3 h-3 border border-black ${
                    currentStep === s.id
                      ? "bg-[#e0128b]"
                      : currentStep > s.id
                      ? "bg-[#00E6B8]"
                      : "bg-gray-200"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              disabled={!canProceed()}
              className="px-5 py-2 bg-[#ff7700] hover:bg-[#e06600] text-white border-2 border-black shadow-[2px_2px_0px_#000] font-mono font-bold uppercase tracking-wider text-xs disabled:opacity-30 disabled:pointer-events-none retro-btn-press"
            >
              {currentStep === 3 ? (
                <span className="flex items-center gap-2">Run AI Gen →</span>
              ) : (
                <span className="flex items-center gap-2">Continue →</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}