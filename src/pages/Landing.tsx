import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Target, TrendingUp, FileText, CheckCircle, Star, Users, BarChart2, Sparkles, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import ATSScoreCard from "@/components/ATSScoreCard";

const stats = [
  { value: "94%", label: "Avg ATS Pass Rate" },
  { value: "3.2X", label: "More Interviews" },
  { value: "50K+", label: "Resumes Tailored" },
];

const features = [
  { icon: Target, title: "Keyword Injection", desc: "Intelligently inserts role-specific keywords to bypass automated screening filters." },
  { icon: TrendingUp, title: "Live Score Gauge", desc: "Real-time ATS compatibility check with a detailed 8-bit gap analysis report." },
  { icon: Sparkles, title: "Gemini AI Rewriting", desc: "Context-aware bullet point enhancement that matches technical recruiter standards." },
  { icon: FileText, title: "Clean Formats", desc: "Professionally designed, recruiter-approved text layouts ready for export." },
];

const testimonials = [
  { name: "Priya Sharma", role: "Product Manager @ Google", avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg", quote: "My ATS score went from 42 to 91 in minutes. Got 5 callbacks that week.", rating: 5 },
  { name: "Marcus Wei", role: "SWE @ Meta", avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg", quote: "The keyword gap analysis alone is worth 10x the subscription price.", rating: 5 },
  { name: "Sarah Okonkwo", role: "Data Scientist @ Stripe", avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg", quote: "Finally a tool built for technical roles. It understands context, not just keywords.", rating: 5 },
];

const keywordData = [
  { keyword: "distributed systems", status: "injected", confidence: 97 },
  { keyword: "cross-functional leadership", status: "injected", confidence: 94 },
  { keyword: "agile methodology", status: "injected", confidence: 91 },
  { keyword: "stakeholder management", status: "gap", confidence: 78 },
  { keyword: "P&L ownership", status: "gap", confidence: 65 },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#121214] pb-16 overflow-x-hidden pt-16">
      <Navbar />

      {/* Marquee Ticker strip */}
      <div className="w-full bg-[#e0128b] border-y-4 border-black py-2.5 text-white font-pixel text-[10px] tracking-widest overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-retro-marquee">
          <span>
            * INSERT COIN TO OPTIMIZE * GET THE INTERVIEW * 94% SUCCESS RATE * HIGH SCORE: 100% ATS MATCH * START YOUR APPLICATION RUN NOW * INSERT COIN TO OPTIMIZE * GET THE INTERVIEW * 94% SUCCESS RATE * HIGH SCORE: 100% ATS MATCH * START YOUR APPLICATION RUN NOW *
          </span>
        </div>
      </div>

      {/* Hero Section (Arcade Cabinet Screen) */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="bg-[#140d25] border-4 border-black text-white p-6 md:p-12 shadow-[8px_8px_0px_#121214] crt-screen relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#e0128b]/20 border-2 border-[#e0128b] rounded-none px-3.5 py-1.5">
                <div className="w-2.5 h-2.5 bg-[#00E6B8] animate-retro-blink-fast" />
                <span className="text-[#00E6B8] font-pixel text-[8px] tracking-wider uppercase">
                  AI-Powered Resume Tailoring · v2.4
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="font-retro font-black text-5xl sm:text-6xl lg:text-7xl leading-none uppercase tracking-wide">
                  BEAT ATS.<br />
                  <span className="text-[#ff7700]">GET THE INTERVIEW.</span>
                </h1>
                <p className="text-gray-400 font-mono text-base leading-relaxed max-w-lg">
                  Paste your target job description. Upload your base resume. Our AI automatically optimizes, formats, and structures your achievements to score above 85% ATS compatibility.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link to="/generate" className="w-full sm:w-auto">
                  <button className="w-full bg-[#ff7700] hover:bg-[#e06600] text-white border-4 border-black shadow-[4px_4px_0px_#000] py-3.5 px-8 font-pixel text-xs tracking-wider uppercase transition-all retro-btn-press active:translate-y-1">
                    INSERT COIN & START &rarr;
                  </button>
                </Link>
                <Link to="/templates" className="w-full sm:w-auto">
                  <button className="w-full bg-white hover:bg-gray-100 text-black border-4 border-black shadow-[4px_4px_0px_#000] py-3.5 px-8 font-pixel text-xs tracking-wider uppercase transition-all retro-btn-press active:translate-y-1">
                    TEMPLATES
                  </button>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-6 pt-4 border-t border-dashed border-gray-800">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-none border-2 border-black bg-gray-700 flex items-center justify-center font-pixel text-[10px] text-white">
                      P{i}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-[#ff7700]">
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-current text-[#ff7700]" />)}
                    <span className="text-white font-mono font-bold text-sm ml-1">4.9 HIGH SCORE</span>
                  </div>
                  <p className="text-gray-500 font-mono text-xs uppercase tracking-wider">Trusted by 50,000+ Players</p>
                </div>
              </div>
            </div>

            {/* Right: Arcade Console Bento Box Dashboard */}
            <div className="bg-[#faf8f5] border-4 border-black text-[#121214] p-5 shadow-[6px_6px_0px_#000] relative">
              <div className="absolute top-0 right-0 bg-[#e0128b] border-l-4 border-b-4 border-black text-white text-[8px] px-3 py-1 font-pixel uppercase tracking-widest animate-pulse">
                LIVE DEMO
              </div>
              <div className="space-y-5">
                {/* Header */}
                <div className="border-b-2 border-black pb-3">
                  <p className="font-pixel text-[8px] text-gray-500 uppercase tracking-widest">LIVE ATS SYSTEM SIMULATION</p>
                  <h3 className="font-retro font-bold text-xl text-black mt-1 uppercase">ROLE: Lead Software Engineer · Stripe</h3>
                </div>

                {/* Score card + Before/After */}
                <div className="flex flex-col sm:flex-row items-center gap-6 bg-white border-2 border-black p-4 shadow-[2px_2px_0px_#000]">
                  <ATSScoreCard score={91} label="After Tailor" size="md" animate={true} />
                  <div className="flex-1 space-y-2.5 w-full">
                    <div>
                      <div className="flex justify-between font-mono text-xs font-bold text-gray-800">
                        <span>BEFORE OPTIMIZATION</span>
                        <span>42 / 100</span>
                      </div>
                      <div className="w-full bg-[#f0ece4] border-2 border-black h-4.5 p-0.5">
                        <div className="bg-[#e0128b] h-full" style={{ width: "42%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-mono text-xs font-bold text-[#00E6B8]">
                        <span>AFTER OPTIMIZATION</span>
                        <span>91 / 100 [PASSED]</span>
                      </div>
                      <div className="w-full bg-[#f0ece4] border-2 border-black h-4.5 p-0.5">
                        <div className="bg-[#00E6B8] h-full" style={{ width: "91%" }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Console Log Logins */}
                <div className="bg-black text-[#00E6B8] p-4 font-mono text-xs space-y-1.5 border-2 border-black max-h-[140px] overflow-y-auto">
                  <p className="text-gray-500">&gt; npm run scan --resume=master.pdf</p>
                  {keywordData.map((kw, i) => (
                    <p key={i} className="flex justify-between">
                      <span>{kw.status === "injected" ? "[SUCCESS] INJECTED:" : "[WARNING] MISSING:"} {kw.keyword}</span>
                      <span className={kw.status === "injected" ? "text-[#00E6B8]" : "text-[#ff7700]"}>{kw.confidence}% MATCH</span>
                    </p>
                  ))}
                  <p className="animate-retro-blink">&gt; SYSTEM MATCH SUCCESSFUL ...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-y-4 border-black py-8 my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-4 text-center divide-x-4 divide-black">
            {stats.map((stat) => (
              <div key={stat.label} className="px-2">
                <p className="font-retro font-black text-4xl sm:text-5xl text-[#e0128b]">{stat.value}</p>
                <p className="font-mono text-xs sm:text-sm font-bold text-black uppercase tracking-wider mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Bento */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#e0128b] font-pixel text-[9px] uppercase tracking-widest mb-2 animate-pulse">SYSTEM SPECS</p>
          <h2 className="font-retro font-black text-4xl lg:text-5xl text-black uppercase">
            BUILT FOR THE <span className="text-[#ff7700]">MODERN JOB RUN</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, i) => (
            <div
              key={i}
              className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_#121214] retro-btn-press"
            >
              <div className="w-12 h-12 border-2 border-black bg-[#faf8f5] flex items-center justify-center mb-4 shadow-[2px_2px_0px_#121214]">
                <feat.icon size={22} className="text-[#e0128b]" />
              </div>
              <h3 className="font-retro font-black text-2xl text-black mb-2 uppercase">{feat.title}</h3>
              <p className="font-mono text-sm text-gray-800 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials (RPG Dialogue Bubble Boxes) */}
      <section className="py-12 border-t-4 border-dashed border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-retro font-black text-4xl text-black uppercase">PLAYERS FEEDBACK</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="flex flex-col">
                {/* Dialogue bubble */}
                <div className="bg-white border-4 border-black p-5 relative shadow-[4px_4px_0px_#121214] flex-1 mb-5">
                  <div className="flex items-center gap-1 text-[#ff7700] mb-3">
                    {[...Array(t.rating)].map((_, j) => <Star key={j} size={11} className="fill-current text-[#ff7700]" />)}
                  </div>
                  <p className="font-mono text-sm text-black leading-relaxed">
                    "{t.quote}"
                  </p>
                  {/* Speech bubble arrow pointer */}
                  <div className="absolute -bottom-[12px] left-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-black"></div>
                  <div className="absolute -bottom-[8px] left-[25px] w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[7px] border-t-white"></div>
                </div>
                {/* Avatar/Name details */}
                <div className="flex items-center gap-3 pl-3">
                  <div className="w-10 h-10 border-2 border-black bg-gray-300 flex items-center justify-center font-pixel text-xs font-bold shadow-[2px_2px_0px_#000]">
                    P{i+1}
                  </div>
                  <div>
                    <p className="font-retro font-bold text-lg text-black uppercase leading-none">{t.name}</p>
                    <p className="font-mono text-[10px] text-gray-800 uppercase mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA (Mini Arcade cabinet screen) */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[#140d25] border-4 border-black text-white p-8 md:p-12 shadow-[6px_6px_0px_#121214] crt-screen">
            <div className="w-14 h-14 border-2 border-black bg-[#ff7700] flex items-center justify-center mx-auto mb-6 shadow-[3px_3px_0px_#121214] animate-bounce">
              <Zap size={24} className="text-white fill-white" />
            </div>
            <h2 className="font-retro font-black text-4xl lg:text-5xl text-white mb-4 uppercase">
              YOUR NEXT INTERVIEW RUN IS<br /><span className="text-[#ff7700]">ONE UPLOAD AWAY</span>
            </h2>
            <p className="font-mono text-gray-400 text-base mb-8 max-w-md mx-auto">
              Join 50,000+ technical candidates who use ResumeForge to bypass automated filters and clear recruiter checks.
            </p>
            <Link to="/signup">
              <button className="bg-[#e0128b] hover:bg-[#c20c74] text-white border-4 border-black shadow-[4px_4px_0px_#000] py-4 px-10 font-pixel text-xs tracking-wider uppercase transition-all retro-btn-press active:translate-y-1">
                START NEW SESSION - FREE
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-black py-8 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 border-2 border-black bg-[#e0128b] flex items-center justify-center">
              <Zap size={12} className="text-white fill-white" />
            </div>
            <span className="font-retro font-black text-lg text-black">RESUME<span className="text-[#e0128b]">FORGE</span></span>
          </div>
          <p className="font-mono text-xs text-gray-700 uppercase font-semibold">© 2025 RESUMEFORGE AI. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-4">
            {["Privacy", "Terms", "Support"].map((l) => (
              <a key={l} href="#" className="font-mono text-xs text-gray-700 hover:text-black uppercase font-bold transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}