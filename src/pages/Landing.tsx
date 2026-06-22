import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Target, TrendingUp, FileText, CheckCircle, Star, Sparkles, ChevronRight, Upload, Brain, Award, Linkedin, Twitter, Github } from "lucide-react";
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
    score: "42 → 91",
  },
  {
    name: "Marcus Wei",
    role: "Software Engineer @ Meta",
    quote: "The keyword gap analysis alone is worth 10x the price. It found gaps I never noticed.",
    rating: 5,
    initials: "MW",
    color: "#ff7700",
    score: "51 → 95",
  },
  {
    name: "Sarah Okonkwo",
    role: "Data Scientist @ Stripe",
    quote: "Finally a tool built for technical roles. It understands context, not just keywords.",
    rating: 5,
    initials: "SO",
    color: "#00E6B8",
    score: "47 → 93",
  },
  {
    name: "James Park",
    role: "Frontend Dev @ Netflix",
    quote: "Got 3 interviews in the first week. The keyword injection is insane.",
    rating: 5,
    initials: "JP",
    color: "#7c3aed",
    score: "55 → 96",
  },
  {
    name: "Aisha Rahman",
    role: "UX Designer @ Spotify",
    quote: "Applied to 12 jobs, heard back from 9. Never happened before.",
    rating: 5,
    initials: "AR",
    color: "#e0128b",
    score: "48 → 91",
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
  const [afterScore, setAfterScore] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let start = 0;
    const end = 91;
    const duration = 1500;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 2);
      const current = Math.floor(easeOut * end);
      setAfterScore(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqItems = [
    {
      q: "Will ATS systems know my resume was AI-optimized?",
      a: "No. We rewrite bullets in your own voice using your original content. The output reads like a human-written resume — we inject keywords naturally, not as a list dump."
    },
    {
      q: "Do I keep my original resume after optimization?",
      a: "Yes. Your original is always preserved. You can download both the original and the tailored version at any time."
    },
    {
      q: "Which ATS systems does this work with?",
      a: "Tested against Workday, Greenhouse, Lever, iCIMS, Taleo, and BambooHR — covering 90%+ of Fortune 500 hiring systems."
    },
    {
      q: "How accurate is the ATS score?",
      a: "Our scoring model is trained on 50,000+ real resume-to-JD pairs. It predicts ATS pass/fail with 94% accuracy based on keyword density, formatting, and section structure."
    },
    {
      q: "Can I use this for multiple job applications?",
      a: "Yes. Each tailoring run creates a separate optimized version for that specific job description. Pro users get unlimited runs."
    },
    {
      q: "What file formats are supported?",
      a: "Upload: PDF or DOCX. Download: PDF, DOCX, or plain text (ATS-safe). We preserve your formatting and convert cleanly."
    }
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#121214] overflow-x-hidden">
      <Navbar />

      {/* Marquee Ticker */}
      <div className="w-full bg-[#e0128b] border-y-4 border-black py-2.5 text-white font-pixel text-[9px] tracking-widest overflow-hidden whitespace-nowrap mt-16">
        <div className="animate-retro-marquee inline-block">
          <span>
            &nbsp;&nbsp;★ GET THE INTERVIEW &nbsp;★ 94% SUCCESS RATE &nbsp;★ HIGH SCORE: 100% ATS MATCH &nbsp;★ START YOUR APPLICATION RUN NOW &nbsp;★ GET THE INTERVIEW &nbsp;★ 94% SUCCESS RATE &nbsp;★ HIGH SCORE: 100% ATS MATCH &nbsp;★ START YOUR APPLICATION RUN NOW&nbsp;&nbsp;
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
            <div className="relative w-full">
              <div className="bg-[#faf8f5] border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,0.6)] p-5 min-h-[300px] flex flex-col justify-between w-full">
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
                <div className="space-y-6 mb-6">
                  {/* Before Optimization Row */}
                  <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
                    <div>
                      <span className="font-mono text-xs font-bold text-gray-600 block mb-1">BEFORE OPTIMIZATION</span>
                      <div className="w-full bg-gray-100 border-2 border-black h-5 p-0.5">
                        <div className="bg-[#ef4444] h-full" style={{ width: "42%" }} />
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-retro font-black text-[48px] text-[#ef4444] leading-none">42</span>
                      <span className="font-mono text-sm text-gray-500 font-bold ml-1">/100</span>
                    </div>
                  </div>

                  {/* After Optimization Row */}
                  <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
                    <div>
                      <span className="font-mono text-xs font-bold text-green-600 block mb-1">AFTER OPTIMIZATION</span>
                      <div className="w-full bg-gray-100 border-2 border-black h-5 p-0.5">
                        <div className="bg-[#22c55e] h-full transition-all" style={{ width: `${afterScore}%` }} />
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-retro font-black text-[48px] text-[#22c55e] leading-none">{afterScore}</span>
                      <span className="font-mono text-sm text-green-600 font-bold ml-1">/100</span>
                    </div>
                  </div>
                </div>

                {/* Terminal log */}
                <div className="bg-black border-2 border-black p-4 font-mono text-xs text-[#22c55e] space-y-1 min-h-[90px]">
                  <p>&gt; Scanning resume bullets against job description...</p>
                  <p>&gt; Injecting missing keywords: Kubernetes, System Design, Go...</p>
                  <p>&gt; Optimization complete. New ATS Match: 91% [SUCCESS]</p>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 bg-[#ff7700] border-4 border-black text-white px-4 py-2 shadow-[4px_4px_0px_#000] animate-float z-10">
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
          <p className="font-mono text-[12px] text-gray-500 italic text-center mt-6">
            Based on 50,000+ resumes processed — Jan 2024 to present
          </p>
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
              <div className="bg-white border-4 border-black border-t-2 border-t-[#e8540a] p-6 shadow-[4px_4px_0px_#121214] hover:shadow-[6px_6px_0px_#121214] transition-all duration-200 hover:-translate-y-0.5 h-full">
                <div className="text-[32px] font-[300] text-[#e8540a] mb-2 leading-none">{step.num}</div>
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

      {/* ─── PRICING ─── */}
      <section className="py-20 bg-[#faf8f5] border-t-4 border-black" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-pixel text-[9px] text-[#e0128b] uppercase tracking-widest mb-3">NO SURPRISES</p>
            <h2 className="font-retro font-black text-5xl lg:text-6xl text-black uppercase">
              SIMPLE <span className="text-[#e8540a]">PRICING</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto pt-4">
            {/* Free Tier */}
            <div className="bg-white border-4 border-black p-8 shadow-[6px_6px_0px_#121214] flex flex-col justify-between">
              <div>
                <h3 className="font-retro font-black text-2xl uppercase text-black mb-2">Free</h3>
                <div className="flex items-baseline mb-6">
                  <span className="font-retro font-black text-5xl text-black">$0</span>
                  <span className="font-mono text-sm text-gray-500 ml-2">/ month</span>
                </div>
                <ul className="space-y-3 font-mono text-sm text-gray-600 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-[#e8540a] font-bold">✓</span> 3 resume tailors/month
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#e8540a] font-bold">✓</span> Basic ATS score
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#e8540a] font-bold">✓</span> 2 template styles
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#e8540a] font-bold">✓</span> PDF export
                  </li>
                </ul>
              </div>
              <Link to="/signup" className="block w-full">
                <button className="w-full bg-[#e0128b] hover:bg-[#c20c74] text-white border-2 border-black py-3 font-retro uppercase tracking-wide transition-all retro-btn-press active:translate-y-0.5">
                  Start Free
                </button>
              </Link>
            </div>

            {/* Pro Tier (Highlighted) */}
            <div className="relative bg-white border-2 border-[#e0128b] p-8 shadow-[6px_6px_0px_#e0128b] flex flex-col justify-between md:-translate-y-4">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#e0128b] text-white font-pixel text-[8px] tracking-widest px-4 py-1.5 border-2 border-black uppercase">
                Most Popular
              </div>
              <div>
                <h3 className="font-retro font-black text-2xl uppercase text-black mb-2 mt-2">Pro</h3>
                <div className="flex items-baseline mb-6">
                  <span className="font-retro font-black text-5xl text-black">$12</span>
                  <span className="font-mono text-sm text-gray-500 ml-2">/ month</span>
                </div>
                <ul className="space-y-3 font-mono text-sm text-gray-600 mb-8">
                  <li className="flex items-center gap-2 font-bold text-black">
                    <span className="text-[#e8540a] font-bold">✓</span> Unlimited tailors
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#e8540a] font-bold">✓</span> Live ATS score
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#e8540a] font-bold">✓</span> All 8 templates
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#e8540a] font-bold">✓</span> PDF + DOCX export
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#e8540a] font-bold">✓</span> Keyword injection
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#e8540a] font-bold">✓</span> Priority support
                  </li>
                </ul>
              </div>
              <Link to="/signup" className="block w-full">
                <button className="w-full bg-[#e8540a] hover:bg-[#c64408] text-white border-2 border-black py-3 font-retro uppercase tracking-wide transition-all retro-btn-press active:translate-y-0.5 shadow-[2px_2px_0px_#000]">
                  Start Pro Trial
                </button>
              </Link>
            </div>

            {/* Team Tier */}
            <div className="bg-white border-4 border-black p-8 shadow-[6px_6px_0px_#121214] flex flex-col justify-between">
              <div>
                <h3 className="font-retro font-black text-2xl uppercase text-black mb-2">Team</h3>
                <div className="flex items-baseline mb-6">
                  <span className="font-retro font-black text-5xl text-black">$39</span>
                  <span className="font-mono text-sm text-gray-500 ml-2">/ month</span>
                </div>
                <ul className="space-y-3 font-mono text-sm text-gray-600 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-[#e8540a] font-bold">✓</span> Everything in Pro
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#e8540a] font-bold">✓</span> 5 team seats
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#e8540a] font-bold">✓</span> Team analytics dashboard
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#e8540a] font-bold">✓</span> Custom templates
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#e8540a] font-bold">✓</span> Dedicated support
                  </li>
                </ul>
              </div>
              <Link to="/signup" className="block w-full">
                <button className="w-full bg-[#e0128b] hover:bg-[#c20c74] text-white border-2 border-black py-3 font-retro uppercase tracking-wide transition-all retro-btn-press active:translate-y-0.5">
                  Contact Sales
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 bg-[#faf8f5] border-t-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-pixel text-[9px] text-[#e0128b] uppercase tracking-widest mb-3">SUCCESS STORIES</p>
            <h2 className="font-retro font-black text-5xl lg:text-6xl text-black uppercase">
              REAL <span className="text-[#ff7700]">RESULTS</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="flex flex-col h-full">
                <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_#121214] flex-1 mb-5 relative hover:shadow-[6px_6px_0px_#121214] transition-all duration-200 hover:-translate-y-0.5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-0.5">
                      {[...Array(t.rating)].map((_, j) => (
                        <Star key={j} size={14} className="fill-[#ff7700] text-[#ff7700]" />
                      ))}
                    </div>
                    {/* Score pill badge */}
                    <div className="bg-[#e6fcf5] text-[#099268] border border-[#b2f2bb] text-xs font-mono font-bold px-2.5 py-0.5 rounded-full">
                      {t.score}
                    </div>
                  </div>
                  <p className="font-mono text-sm text-gray-800 leading-relaxed">"{t.quote}"</p>
                  {/* Speech arrow */}
                  <div className="absolute -bottom-[13px] left-7 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-black" />
                  <div className="absolute -bottom-[9px] left-[28px] w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-t-[9px] border-t-white" />
                </div>
                <div className="flex items-center gap-3 pl-3">
                  <div
                    className="w-11 h-11 border-2 border-black rounded-full flex items-center justify-center font-retro text-sm font-bold text-white shadow-[2px_2px_0px_#000]"
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
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 bg-[#140d25] border-t-4 border-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-pixel text-[9px] text-[#e0128b] uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="font-retro font-black text-5xl lg:text-6xl text-white uppercase">
              FREQUENTLY <span className="text-[#ff7700]">ASKED</span>
            </h2>
          </div>

          <div className="border-t border-white/20 divide-y divide-white/20">
            {faqItems.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="py-5">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between text-left focus:outline-none group"
                  >
                    <span className="font-retro font-bold text-lg text-white uppercase tracking-wide pr-4 group-hover:text-[#ff7700] transition-colors">
                      {item.q}
                    </span>
                    <span className="font-retro font-black text-2xl text-white select-none w-6 text-center">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="mt-3 font-mono text-sm text-gray-300 leading-relaxed transition-all">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
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
      <footer className="border-t-4 border-black py-16 bg-[#140d25] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Column 1 - Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border-2 border-white bg-[#e0128b] flex items-center justify-center shadow-[2px_2px_0px_rgba(255,255,255,0.4)]">
                  <Zap size={14} className="text-white fill-white" />
                </div>
                <span className="font-retro font-black text-xl text-white uppercase">
                  RESUME<span className="text-[#e0128b]">FORGE</span>
                </span>
              </div>
              <p className="font-mono text-sm text-gray-400">
                Beat ATS. Get Hired.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-9 h-9 border border-white/20 hover:border-white hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all shadow-[2px_2px_0px_rgba(255,255,255,0.1)]">
                  <Linkedin size={18} />
                </a>
                <a href="#" className="w-9 h-9 border border-white/20 hover:border-white hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all shadow-[2px_2px_0px_rgba(255,255,255,0.1)]">
                  <Twitter size={18} />
                </a>
                <a href="#" className="w-9 h-9 border border-white/20 hover:border-white hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all shadow-[2px_2px_0px_rgba(255,255,255,0.1)]">
                  <Github size={18} />
                </a>
              </div>
            </div>

            {/* Column 2 - Product */}
            <div>
              <h4 className="font-retro font-bold text-sm text-white uppercase mb-4 tracking-wider">Product</h4>
              <ul className="space-y-2.5 font-mono text-xs text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><Link to="/templates" className="hover:text-white transition-colors">Templates</Link></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
              </ul>
            </div>

            {/* Column 3 - Company */}
            <div>
              <h4 className="font-retro font-bold text-sm text-white uppercase mb-4 tracking-wider">Company</h4>
              <ul className="space-y-2.5 font-mono text-xs text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>

            {/* Column 4 - Support */}
            <div>
              <h4 className="font-retro font-bold text-sm text-white uppercase mb-4 tracking-wider">Support</h4>
              <ul className="space-y-2.5 font-mono text-xs text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status Page</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="font-mono text-xs text-gray-500">
              © 2025 ResumeForge AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}