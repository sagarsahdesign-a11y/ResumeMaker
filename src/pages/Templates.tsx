import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Star, Eye, Check, Zap, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import ResumePreview from "@/components/ResumePreview";

const categories = ["All", "Professional", "Technical", "Executive", "Creative", "Academic"];

const templates = [
  {
    id: 1,
    name: "Executive Pro",
    category: "Executive",
    atsScore: 98,
    description: "Clean, authoritative. Built for senior roles and leadership positions.",
    popular: true,
    free: true,
    colors: ["#0a0a1a", "#e0128b"],
  },
  {
    id: 2,
    name: "Technical Edge",
    category: "Technical",
    atsScore: 97,
    description: "Structured for engineers and technical roles. Skills-forward layout.",
    popular: true,
    free: true,
    colors: ["#0d1117", "#00E6B8"],
  },
  {
    id: 3,
    name: "Corporate Classic",
    category: "Professional",
    atsScore: 96,
    description: "Timeless corporate format that works for any industry.",
    popular: false,
    free: true,
    colors: ["#1a1a2e", "#ff7700"],
  },
  {
    id: 4,
    name: "Data Pro",
    category: "Technical",
    atsScore: 95,
    description: "Optimized for data science, analytics, and ML roles.",
    popular: false,
    free: false,
    colors: ["#0a0a1a", "#818cf8"],
  },
  {
    id: 5,
    name: "Creative Clear",
    category: "Creative",
    atsScore: 92,
    description: "Subtle visual hierarchy for design and creative professionals.",
    popular: false,
    free: false,
    colors: ["#1a0a2e", "#ff7700"],
  },
  {
    id: 6,
    name: "Minimalist",
    category: "Professional",
    atsScore: 97,
    description: "Ultra-clean. Maximum whitespace. Zero distractions.",
    popular: false,
    free: true,
    colors: ["#0a0a1a", "#e2e8f0"],
  },
  {
    id: 7,
    name: "Academic Scholar",
    category: "Academic",
    atsScore: 90,
    description: "Designed for research, academic, and PhD applications.",
    popular: false,
    free: false,
    colors: ["#0f0a1e", "#818cf8"],
  },
  {
    id: 8,
    name: "Startup Founder",
    category: "Executive",
    atsScore: 94,
    description: "Bold, entrepreneurial. Built for startup and founding roles.",
    popular: false,
    free: false,
    colors: ["#0a0a1a", "#ff7700"],
  },
];

export default function Templates() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(1);

  const filtered = templates.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || t.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#121214] pb-16 pt-24 font-mono">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[#e0128b] font-pixel text-[9px] uppercase tracking-widest mb-2 animate-pulse">TEMPLATE LIBRARY</p>
          <h1 className="font-retro font-black text-4xl lg:text-5xl text-black mb-3 uppercase leading-none">
            CHOOSE YOUR <span className="text-[#ff7700]">FORMAT STYLE</span>
          </h1>
          <p className="font-mono text-gray-600 text-sm font-bold uppercase tracking-wide">
            Every template is ATS-optimized, professionally designed, and tested against real hiring systems.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
            <input
              placeholder="SEARCH STYLES..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border-2 border-black text-black placeholder:text-gray-405 h-10 pl-9 pr-4 font-mono text-xs uppercase outline-none focus:border-[#e0128b] shadow-[2px_2px_0px_#000] focus:shadow-none transition-all"
            />
          </div>
          <div className="flex items-center gap-2.5 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 border-2 border-black font-mono text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_#000] transition-all retro-btn-press ${
                  activeCategory === cat
                    ? "bg-[#e0128b] text-white"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Templates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((tmpl) => (
            <div
              key={tmpl.id}
              className={`group relative bg-white border-4 border-black shadow-[4px_4px_0px_#121214] transition-all duration-300 ${
                selectedTemplate === tmpl.id
                  ? "border-[#e0128b] ring-4 ring-[#e0128b] shadow-[0_0_12px_rgba(224,18,139,0.2)]"
                  : ""
              }`}
              onClick={() => setSelectedTemplate(tmpl.id)}
            >
              {/* Preview Image frame */}
              <div
                className="relative h-52 overflow-hidden flex items-center justify-center p-3 border-b-2 border-black"
                style={{ background: `linear-gradient(135deg, ${tmpl.colors[0]}d0, ${tmpl.colors[1]}22)` }}
              >
                <div className="w-full h-full bg-white border border-gray-300 shadow-lg overflow-hidden" style={{ transform: "scale(0.85)", transformOrigin: "top center" }}>
                  <ResumePreview compact={true} />
                </div>

                {/* Overlays on select/hover */}
                <div className="absolute inset-0 bg-[#140d25]/85 opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex items-center justify-center gap-3">
                  <button
                    className="px-3.5 py-1.5 bg-white text-black border-2 border-black font-mono font-bold uppercase tracking-wider text-[10px] shadow-[2px_2px_0px_#000] transition-all retro-btn-press"
                    onClick={(e) => { e.stopPropagation(); setSelectedTemplate(tmpl.id); }}
                  >
                    {selectedTemplate === tmpl.id ? "[SELECTED]" : "SELECT RUN"}
                  </button>
                </div>

                {/* Badges indicators */}
                <div className="absolute top-2 left-2 flex flex-col gap-1.5 font-mono text-[9px] font-bold uppercase">
                  {tmpl.popular && (
                    <div className="flex items-center gap-1 bg-[#ff7700] text-white border border-black px-2 py-0.5 shadow-[1px_1px_0px_#000]">
                      <Star size={8} className="fill-current" /> Popular
                    </div>
                  )}
                  {!tmpl.free && (
                    <div className="flex items-center gap-1 bg-black text-[#00E6B8] border border-[#00E6B8] px-2 py-0.5 shadow-[1px_1px_0px_#000]">
                      <Lock size={8} /> Pro Only
                    </div>
                  )}
                </div>

                {selectedTemplate === tmpl.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 border-2 border-black bg-[#00E6B8] flex items-center justify-center">
                    <Check size={12} className="text-black stroke-[3px]" />
                  </div>
                )}
              </div>

              {/* Info section details */}
              <div className="p-4 bg-white">
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="font-retro font-bold text-xl text-black uppercase leading-none">{tmpl.name}</h3>
                  <div className="flex items-center gap-1 text-[#00E6B8]">
                    <span className="font-retro font-bold text-lg">{tmpl.atsScore}%</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2 font-mono text-[9px] font-bold uppercase">
                  <span className="bg-gray-100 border border-black px-2 py-0.5 text-gray-500">
                    {tmpl.category}
                  </span>
                  <span className={tmpl.free ? "text-[#00E6B8]" : "text-[#e0128b]"}>
                    {tmpl.free ? "FREE PLAY" : "CREDIT COMPATIBLE"}
                  </span>
                </div>
                <p className="font-mono text-[11px] text-gray-600 leading-normal uppercase font-semibold">{tmpl.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Selected Status CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#121214]">
          <div>
            <p className="font-retro font-black text-2xl text-black uppercase leading-none">
              {selectedTemplate ? `SELECTED: ${templates.find(t => t.id === selectedTemplate)?.name}` : "SELECT A TEMPLATE RUN TO START"}
            </p>
            <p className="font-mono text-xs text-gray-500 uppercase font-bold mt-1">Format can be customized dynamically before compilation exports.</p>
          </div>
          <Link to="/generate">
            <button disabled={!selectedTemplate} className="px-5 py-3 bg-[#ff7700] hover:bg-[#e06600] text-white border-2 border-black shadow-[3px_3px_0px_#000] font-mono font-bold uppercase tracking-wider text-xs flex items-center gap-2 transition-all retro-btn-press disabled:opacity-35 disabled:pointer-events-none">
              <Zap size={14} className="fill-white" />
              USE SELECT STYLE &rarr;
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}