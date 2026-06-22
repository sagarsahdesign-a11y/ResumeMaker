import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Target, TrendingUp, FileText, CheckCircle, Star, Sparkles, ChevronRight, Upload, Brain, Award } from "lucide-react";
import Navbar from "@/components/Navbar";

const stats = [
  { value: "94%", label: "Avg ATS Pass Rate", suffix: "" },
  { value: "3.2", label: "More Interviews", suffix: "X" },
  { value: "50K", label: "Resumes Tailored", suffix: "+" },
];

const features = [
  {
    icon: Brain,
    title: "Gemini AI Rewriting",
    desc: "Context-aware bullet point enhancement that matches your real experience to what recruiters actually want.",
    color: "#e0128b",
    bg: "bg-pink-50",
  },
  {
    icon: Target,
    title: "Keyword Injection",
    desc: "Intelligently injects role-specific keywords throughout your resume to bypass automated ATS filters.",
    color: "#ff7700",
    bg: "bg-orange-50",
  },
  {
    icon: TrendingUp,
    title: "Live ATS Score",
    desc: "Real-time compatibility analysis with a detailed gap report before and after optimization.",
    color: "#00E6B8",
    bg: "bg-teal-50",
  },
  {
    icon: FileText,
    title: "Clean Export",
    desc: "Professionally formatted output — PDF or DOCX — ready to submit instantly without reformatting.",
    color: "#7c3aed",
    bg: "bg-violet-50",
  },
];

const steps = [
  { num: "01", title: "Paste Job Description", desc: "Copy the full JD from any job board — LinkedIn, Indeed, Greenhouse." },
  { num: "02", title: "Upload Your Resume", desc: "Drop your existing resume in PDF or DOCX format. We extract everything." },
  { num: "03", title: "AI Tailors It", desc: "Gemini AI rewrites your bullets, injects keywords, and computes your ATS score." },
  { num: "04", title: "Download & Apply", desc: "Get a recruiter-optimized resume in seconds. Apply with confidence." },
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Product Manager @ Google",
    quote: "My ATS score went from 42 to 91 in minutes. Got 5 callbacks that same week.",
    rating: 5,
    initials: "PS",
    color: "#e0128b",
  },
  {
    name: "Marcus Wei",
    role: "Software Engineer @ Meta",
    quote: "The keyword gap analysis alone is worth 10x the price. It found gaps I never noticed.",
    rating: 5,
    initials: "MW",
    color: "#ff7700",
  },
  {
    name: "Sarah Okonkwo",
    role: "Data Scientist @ Stripe",
    quote: "Finally a tool built for technical roles. It understands context, not just keywords.",
    rating: 5,
    initials: "SO",
    color: "#00E6B8",
  },
];

function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const [count, setCount] = useState("0");
  
  useEffect(() => {
    const isDecimal = target.includes(".");
    const numTarget = parseFloat(target.replace(/[^0-9.]/g, ""));
    const duration = 1500;
    const steps = 40;
    const increment = numTarget / steps;
    let current = 0;
    let step = 0;
    
    const timer = setInterval(() => {
      step++;
      current += increment;
      if (step >= steps) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? current.toFixed(1) : Math.floor(current).toString());
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [target]);

  return <span>{count}{suffix}</span>;
}

export default function Landing() {
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#121214] overflow-x-hidden">
      <Navbar />

      {/* Marquee Ticker */}
      <div className="w-full bg-[#e0128b] border-y-4 border-black py-2.5 text-white font-pixel text-[9px] tracking-widest overflow-hidden whitespace-nowrap mt-16">
        <div className="animate-retro-marquee inline-block">
          <span>
            &nbsp;&nbsp;★ INSERT COIN TO OPTIMIZE &nbsp;★ GET THE INTERVIEW &nbsp;★ 94% SUCCESS RATE &nbsp;★ HIGH SCORE: 100% ATS MATCH &nbsp;★ START YOUR APPLICATION RUN NOW &nbsp;★ INSERT COIN TO OPTIMIZE &nbsp;★ GET THE INTERVIEW &nbsp;★ 94% SUCCESS RATE &nbsp;★ HIGH SCORE: 100% ATS MATCH &nbsp;★ START YOUR APPLICATION RUN NOW&nbsp;&nbsp;
          </span>
        </div>
      </div>

      {/* ─── HERO ─── */}
      <section className="relative bg-[#140d25] border-b-4 border-black overflow-hidden">
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#e0128b] opacity-10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#00E6B8] opacity-8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Copy */}
            <div className="space-y-8">
              {/* Status badge */}
              <div className="inline-flex items-center gap-2.5 bg-white/10 border-2 border-[#00E6B8]/60 px-4 py-2 backdrop-blur-sm">
                <div className="w-2 h-2 bg-[#00E6B8] animate-retro-blink-fast rounded-full" />
                <span className="font-pixel text-[8px] text-[#00E6B8] tracking-widest uppercase">
                  AI Resume Engine · Powered by Gemini
                </span>
              </div>

              <div>
                <h1 className="font-retro text-6xl sm:text-7xl lg:text-8xl font-black text-white leading-[0.9] uppercase tracking-tight">
                  BEAT<br />
                  <span
                    style={{
                      background: "linear-gradient(135deg, #ff7700, #e0128b)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    ATS.
                  </span>
                  <br />
                  GET HIRED.
                </h1>
                <p className="font-mono text-gray-300 text-base leading-relaxed mt-6 max-w-lg font-normal tracking-wide">
                  Paste your target job description. Upload your base resume.
                  Gemini AI tailors every bullet and injects every keyword — so
                  you score above 85% ATS compatibility automatically.
                </p>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/generate">
                  <button className="group w-full sm:w-auto bg-[#ff7700] hover:bg-[#e06600] text-white border-4 border-black shadow-[5px_5px_0px_#000] py-4 px-8 font-retro text-lg uppercase tracking-wide transition-all retro-btn-press active:translate-y-1 flex items-center gap-3">
                    Start Free Run
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link to="/templates">
                  <button className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-4 border-white/30 hover:border-white shadow-[5px_5px_0px_rgba(0,0,0,0.3)] py-4 px-8 font-retro text-lg uppercase tracking-wide transition-all retro-btn-press active:translate-y-1 backdrop-blur-sm">
                    View Templates
                  </button>
                </Link>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-5 pt-2 border-t border-white/10">
                <div className="flex -space-x-3">
                  {["e0128b", "ff7700", "00E6B8", "7c3aed", "121214"].map((c, i) => (
                    <div
                      key={i}
                      className="w-9 h-9 border-2 border-black flex items-center justify-center font-retro text-xs text-white font-bold shadow-[1px_1px_0px_#000]"
                      style={{ backgroundColor: `#${c}` }}
                    >
                      {["P", "M", "S", "A", "R"][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="fill-[#ff7700] text-[#ff7700]" />
                    ))}
                    <span className="text-white font-retro text-base ml-1.5">4.9 / 5</span>
                  </div>
                  <p className="text-gray-400 font-mono text-xs mt-0.5 tracking-wider">
                    Trusted by 50,000+ job seekers
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Live Demo Card */}
            <div className="relative">
              <div className="bg-[#faf8f5] border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,0.6)] p-5">
                {/* Card header */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-black">
                  <div>
                    <p className="font-pixel text-[7px] text-gray-500 uppercase tracking-widest">LIVE SIMULATION</p>
                    <h3 className="font-retro font-bold text-lg text-black mt-0.5">Senior SWE · Stripe</h3>
                  </div>
                  <div className="bg-[#e0128b] border-2 border-black text-white text-[7px] px-2.5 py-1 font-pixel animate-pulse">
                    LIVE
                  </div>
                </div>

                {/* Score comparison */}
                <div className="space-y-3 mb-4">
                  <div>
                    <div className="flex justify-between font-mono text-xs font-bold text-gray-600 mb-1.5">
                      <span>BEFORE OPTIMIZATION</span>
                      <span className="text-red-600">42 / 100</span>
                    </div>
                    <div className="w-full bg-gray-100 border-2 border-black h-4 p-0.5">
                      <div className="bg-red-400 h-full transition-all" style={{ width: "42%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-mono text-xs font-bold mb-1.5" style={{ color: "#00b59a" }}>
                      <span>AFTER OPTIMIZATION</span>
                      <span>91 / 100 ✓</span>
                    </div>
                    <div className="w-full bg-gray-100 border-2 border-black h-4 p-0.5">
                      <div className="bg-[#00E6B8] h-full transition-all" style={{ width: "91%" }} />
                    </div>
                  </div>
                </div>

                {/* Terminal log */}
                <div className="bg-black border-2 border-black p-3.5 font-mono text-[11px] space-y-1.5 max-h-32 overflow-hidden">
                  <p className="text-gray-500">&gt; scan --resume=master.pdf --jd=stripe-swe.txt</p>
                  <p className="text-[#00E6B8]">[OK] INJECTED: distributed systems · 97% match</p>
                  <p className="text-[#00E6B8]">[OK] INJECTED: cross-functional leadership · 94%</p>
                  <p className="text-[#ff7700]">[GAP] MISSING: stakeholder management · 78%</p>
                  <p className="text-[#00E6B8] font-bold animate-retro-blink">&gt; ATS MATCH: 91% ✓ INTERVIEW READY_</p>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 bg-[#ff7700] border-4 border-black text-white px-4 py-2 shadow-[4px_4px_0px_#000] animate-float">
                  <p className="font-pixel text-[8px] text-center">+49 PTS</p>
                  <p className="font-retro text-sm font-bold text-center">GAINED</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="bg-white border-y-4 border-black py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-4 text-center divide-x-4 divide-black">
            {stats.map((stat) => (
              <div key={stat.label} className="px-4 py-2">
                <p className="font-retro font-black text-5xl sm:text-6xl text-[#e0128b] leading-none">
                  {statsVisible ? (
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  ) : (
                    "0"
                  )}
                </p>
                <p className="font-mono text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="font-pixel text-[9px] text-[#e0128b] uppercase tracking-widest mb-3">GAME GUIDE</p>
          <h2 className="font-retro font-black text-5xl lg:text-6xl text-black uppercase">
            HOW IT <span className="text-[#ff7700]">WORKS</span>
          </h2>
          <p className="font-mono text-gray-600 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
            Four simple steps. Two minutes. One perfectly tailored resume.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="relative group">
              <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_#121214] hover:shadow-[6px_6px_0px_#121214] transition-all duration-200 hover:-translate-y-0.5 h-full">
                <div className="font-pixel text-[10px] text-[#e0128b] mb-3">{step.num}</div>
                <h3 className="font-retro font-bold text-2xl text-black mb-2 uppercase">{step.title}</h3>
                <p className="font-mono text-sm text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-8 -right-4 z-10 items-center justify-center w-8 h-8 bg-[#ff7700] border-2 border-black shadow-[2px_2px_0px_#000]">
                  <ChevronRight size={14} className="text-white stroke-[3px]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="py-20 bg-[#140d25] border-y-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-pixel text-[9px] text-[#00E6B8] uppercase tracking-widest mb-3">SYSTEM SPECS</p>
            <h2 className="font-retro font-black text-5xl lg:text-6xl text-white uppercase">
              BUILT FOR THE <span className="text-[#ff7700]">MODERN JOB RUN</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => (
              <div
                key={i}
                className="bg-white/5 border-2 border-white/20 hover:border-white/50 p-6 backdrop-blur-sm transition-all duration-200 hover:bg-white/10 group"
              >
                <div
                  className="w-12 h-12 border-2 border-black flex items-center justify-center mb-5 shadow-[2px_2px_0px_rgba(0,0,0,0.4)]"
                  style={{ backgroundColor: feat.color + "33" }}
                >
                  <feat.icon size={22} style={{ color: feat.color }} />
                </div>
                <h3 className="font-retro font-bold text-2xl text-white mb-2 uppercase">{feat.title}</h3>
                <p className="font-mono text-sm text-gray-400 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="font-pixel text-[9px] text-[#e0128b] uppercase tracking-widest mb-3">HALL OF FAME</p>
          <h2 className="font-retro font-black text-5xl lg:text-6xl text-black uppercase">
            PLAYERS <span className="text-[#ff7700]">FEEDBACK</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="flex flex-col">
              <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_#121214] flex-1 mb-5 relative hover:shadow-[6px_6px_0px_#121214] transition-all duration-200 hover:-translate-y-0.5">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={14} className="fill-[#ff7700] text-[#ff7700]" />
                  ))}
                </div>
                <p className="font-mono text-sm text-gray-800 leading-relaxed">"{t.quote}"</p>
                {/* Speech arrow */}
                <div className="absolute -bottom-[13px] left-7 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-black" />
                <div className="absolute -bottom-[9px] left-[28px] w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-t-[9px] border-t-white" />
              </div>
              <div className="flex items-center gap-3 pl-3">
                <div
                  className="w-11 h-11 border-2 border-black flex items-center justify-center font-retro text-sm font-bold text-white shadow-[2px_2px_0px_#000]"
                  style={{ backgroundColor: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-retro font-bold text-lg text-black uppercase leading-none">{t.name}</p>
                  <p className="font-mono text-xs text-gray-500 mt-0.5">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#140d25] border-4 border-black p-10 md:p-16 shadow-[8px_8px_0px_#121214] text-center crt-screen relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 bottom-0 opacity-10"
              style={{
                background: "radial-gradient(ellipse at 50% 0%, #e0128b 0%, transparent 70%)"
              }}
            />
            <div className="relative z-20">
              <div className="w-16 h-16 border-4 border-black bg-[#ff7700] flex items-center justify-center mx-auto mb-8 shadow-[4px_4px_0px_#000] animate-bounce">
                <Zap size={28} className="text-white fill-white" />
              </div>
              <h2 className="font-retro font-black text-5xl lg:text-6xl text-white mb-4 uppercase leading-tight">
                YOUR NEXT INTERVIEW IS<br />
                <span className="text-[#ff7700]">ONE UPLOAD AWAY</span>
              </h2>
              <p className="font-mono text-gray-400 text-sm mb-10 max-w-md mx-auto leading-relaxed">
                Join 50,000+ candidates who beat the ATS filter and land interviews at top companies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <button className="bg-[#e0128b] hover:bg-[#c20c74] text-white border-4 border-black shadow-[5px_5px_0px_#000] py-4 px-10 font-retro text-xl uppercase tracking-wide transition-all retro-btn-press active:translate-y-1">
                    Start Free — No Card
                  </button>
                </Link>
                <Link to="/login">
                  <button className="bg-transparent text-white border-4 border-white/30 hover:border-white py-4 px-10 font-retro text-xl uppercase tracking-wide transition-all">
                    Sign In
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t-4 border-black py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border-2 border-black bg-[#e0128b] flex items-center justify-center shadow-[2px_2px_0px_#000]">
              <Zap size={14} className="text-white fill-white" />
            </div>
            <span className="font-retro font-black text-xl text-black uppercase">
              RESUME<span className="text-[#e0128b]">FORGE</span>
            </span>
          </div>
          <p className="font-mono text-xs text-gray-500 font-semibold">
            © 2025 ResumeForge AI. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Support"].map((l) => (
              <a key={l} href="#" className="font-mono text-xs text-gray-500 hover:text-black font-bold transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}