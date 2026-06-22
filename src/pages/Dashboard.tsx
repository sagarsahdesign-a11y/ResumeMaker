import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Filter, Download, Eye, Trash2, TrendingUp, TrendingDown, FileText, Target, Zap, Clock, ChevronUp, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

const statCards = [
  {
    title: "TOTAL RESUMES",
    value: "24",
    change: "+3 this run",
    trend: "up",
    icon: FileText,
    color: "#e0128b", // Magenta
    sparkline: [8, 12, 9, 15, 18, 14, 22, 20, 24],
  },
  {
    title: "AVG ATS SCORE",
    value: "83",
    change: "+12 pts vs last session",
    trend: "up",
    icon: Target,
    color: "#00E6B8", // Teal
    sparkline: [58, 62, 65, 70, 72, 75, 79, 81, 83],
  },
  {
    title: "INTERVIEWS LANDED",
    value: "7",
    change: "+4 this month",
    trend: "up",
    icon: TrendingUp,
    color: "#ff7700", // Orange
    sparkline: [1, 2, 1, 3, 2, 4, 5, 6, 7],
  },
  {
    title: "KEYWORDS INJECTED",
    value: "312",
    change: "Across all runs",
    trend: "neutral",
    icon: Zap,
    color: "#121214", // Black outline style
    sparkline: [100, 120, 135, 150, 180, 210, 240, 280, 312],
  },
];

const resumeHistory = [
  { id: 1, jobTitle: "Senior Product Manager", company: "Stripe", date: "Dec 12, 2024", atsBefore: 44, atsAfter: 92, status: "interview", template: "Executive Pro" },
  { id: 2, jobTitle: "Engineering Manager", company: "Airbnb", date: "Dec 10, 2024", atsBefore: 51, atsAfter: 88, status: "applied", template: "Technical Edge" },
  { id: 3, jobTitle: "Staff Software Engineer", company: "Figma", date: "Dec 8, 2024", atsBefore: 38, atsAfter: 85, status: "interview", template: "Technical Edge" },
  { id: 4, jobTitle: "Head of Data Science", company: "Spotify", date: "Dec 5, 2024", atsBefore: 62, atsAfter: 79, status: "applied", template: "Data Pro" },
  { id: 5, jobTitle: "Principal Engineer", company: "Notion", date: "Dec 3, 2024", atsBefore: 45, atsAfter: 91, status: "offer", template: "Executive Pro" },
  { id: 6, jobTitle: "Lead UX Designer", company: "Linear", date: "Nov 28, 2024", atsBefore: 33, atsAfter: 76, status: "rejected", template: "Creative Clear" },
  { id: 7, jobTitle: "Backend Engineer", company: "Vercel", date: "Nov 25, 2024", atsBefore: 58, atsAfter: 87, status: "applied", template: "Technical Edge" },
  { id: 8, jobTitle: "CTO", company: "Series B Startup", date: "Nov 22, 2024", atsBefore: 41, atsAfter: 83, status: "interview", template: "Executive Pro" },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  interview: { label: "INTERVIEW", className: "bg-[#00E6B8] text-black border-2 border-black shadow-[1px_1px_0px_#000] font-pixel text-[8px] rounded-none" },
  applied: { label: "APPLIED", className: "bg-[#ff7700] text-white border-2 border-black shadow-[1px_1px_0px_#000] font-pixel text-[8px] rounded-none" },
  offer: { label: "OFFER 🎉", className: "bg-green-500 text-white border-2 border-black shadow-[1px_1px_0px_#000] font-pixel text-[8px] rounded-none animate-bounce" },
  rejected: { label: "REJECTED", className: "bg-[#e0128b] text-white border-2 border-black shadow-[1px_1px_0px_#000] font-pixel text-[8px] rounded-none" },
};

const MiniSparkline = ({ data, color }: { data: number[]; color: string }) => (
  <ResponsiveContainer width="100%" height={40}>
    <AreaChart data={data.map((v, i) => ({ v, i }))} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
      <defs>
        <linearGradient id={`spark-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.2} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <Area type="monotone" dataKey="v" stroke={color} strokeWidth={2.5} fill={`url(#spark-${color})`} dot={false} />
    </AreaChart>
  </ResponsiveContainer>
);

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<"date" | "atsAfter">("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = resumeHistory
    .filter((r) =>
      r.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
      r.company.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const mult = sortDir === "desc" ? -1 : 1;
      if (sortField === "atsAfter") return mult * (a.atsAfter - b.atsAfter);
      return mult * (new Date(a.date).getTime() - new Date(b.date).getTime());
    });

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) setSortDir(sortDir === "desc" ? "asc" : "desc");
    else { setSortField(field); setSortDir("desc"); }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#121214] pb-16 pt-24 font-mono">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-retro font-black text-4xl lg:text-5xl text-black uppercase leading-none">COMMAND CENTER</h1>
            <p className="font-mono text-gray-800 text-xs uppercase font-bold tracking-wider mt-1.5">Welcome back, Agent Alex. Ready for the next application run.</p>
          </div>
          <Link to="/generate">
            <button className="bg-[#ff7700] hover:bg-[#e06600] text-white border-4 border-black shadow-[4px_4px_0px_#000] py-3 px-6 font-pixel text-[10px] tracking-wider uppercase transition-all retro-btn-press active:translate-y-1 flex items-center gap-2">
              <Plus size={14} className="stroke-[3px]" />
              TAILOR NEW RUN
            </button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, i) => (
            <div key={i} className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_#000] retro-btn-press">
              <div className="flex items-start justify-between mb-3 border-b-2 border-dashed border-gray-200 pb-2">
                <div>
                  <p className="font-pixel text-[8px] text-gray-700 tracking-wider uppercase">{card.title}</p>
                  <p className="font-retro font-black text-4xl text-black mt-1 leading-none">
                    {card.value}
                    {card.title.includes("SCORE") && <span className="text-xs text-gray-600 font-mono ml-0.5">/100</span>}
                  </p>
                </div>
                <div className="w-10 h-10 border-2 border-black bg-[#faf8f5] flex items-center justify-center shadow-[2px_2px_0px_#000]" style={{ borderColor: "#121214" }}>
                  <card.icon size={18} style={{ color: card.color === "#121214" ? "#121214" : card.color }} />
                </div>
              </div>
              <div className="h-10 -mx-1 mb-2">
                <MiniSparkline data={card.sparkline} color={card.color} />
              </div>
              <div className="flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-wider text-gray-800">
                {card.trend === "up" && <span className="text-[#00E6B8]">&uarr;</span>}
                <span>{card.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* High-Score Leaderboard Table */}
        <div className="bg-white border-4 border-black shadow-[6px_6px_0px_#000] overflow-hidden">
          {/* Table Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border-b-4 border-black bg-[#fbf9f4]">
            <div>
              <h2 className="font-retro font-black text-3xl text-black uppercase">SESSION HISTORY</h2>
              <p className="font-mono text-gray-800 text-xs font-bold uppercase tracking-wider mt-0.5">{filtered.length} RUNS INDEXED</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
                <input
                  placeholder="SEARCH RUNS..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-white border-2 border-black text-black placeholder:text-gray-500 h-10 pl-9 pr-4 font-mono text-xs uppercase w-56 outline-none focus:bg-[#faf8f5] shadow-[2px_2px_0px_#000] focus:shadow-none transition-all"
                />
              </div>
              <button className="h-10 px-4 bg-white hover:bg-gray-100 border-2 border-black shadow-[2px_2px_0px_#000] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 retro-btn-press">
                <Filter size={12} className="stroke-[2.5px]" />
                FILTER
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-4 border-black bg-white">
                  <th className="text-left px-5 py-4 font-pixel text-[8px] uppercase tracking-wider text-gray-700">ROLE / TARGET COMPANY</th>
                  <th
                    className="text-left px-4 py-4 font-pixel text-[8px] uppercase tracking-wider text-gray-700 cursor-pointer hover:text-black select-none"
                    onClick={() => toggleSort("date")}
                  >
                    <div className="flex items-center gap-1">
                      DATE
                      {sortField === "date" ? (sortDir === "desc" ? <ChevronDown size={11} /> : <ChevronUp size={11} />) : <ChevronDown size={11} className="opacity-30" />}
                    </div>
                  </th>
                  <th className="text-left px-4 py-4 font-pixel text-[8px] uppercase tracking-wider text-gray-700">BASE</th>
                  <th
                    className="text-left px-4 py-4 font-pixel text-[8px] uppercase tracking-wider text-gray-700 cursor-pointer hover:text-black select-none"
                    onClick={() => toggleSort("atsAfter")}
                  >
                    <div className="flex items-center gap-1">
                      SCORE
                      {sortField === "atsAfter" ? (sortDir === "desc" ? <ChevronDown size={11} /> : <ChevronUp size={11} />) : <ChevronDown size={11} className="opacity-30" />}
                    </div>
                  </th>
                  <th className="text-left px-4 py-4 font-pixel text-[8px] uppercase tracking-wider text-gray-700">STATUS</th>
                  <th className="text-left px-4 py-4 font-pixel text-[8px] uppercase tracking-wider text-gray-700">TEMPLATE</th>
                  <th className="px-4 py-4" />
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-black">
                {filtered.map((resume) => (
                  <tr
                    key={resume.id}
                    className="hover:bg-[#faf8f5]/60 transition-colors group bg-white"
                  >
                    <td className="px-5 py-4">
                      <p className="font-retro font-bold text-xl text-black uppercase leading-none">{resume.jobTitle}</p>
                      <p className="font-mono text-xs text-gray-700 font-bold uppercase mt-1">{resume.company}</p>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5 text-gray-800 font-mono text-xs uppercase font-bold">
                        <Clock size={11} className="stroke-[2px]" />
                        {resume.date}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-mono text-gray-800 text-sm font-bold">{resume.atsBefore}%</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-retro font-black text-2xl ${resume.atsAfter >= 85 ? "text-[#00E6B8]" : resume.atsAfter >= 70 ? "text-[#ff7700]" : "text-[#e0128b]"}`}>
                          {resume.atsAfter}%
                        </span>
                        <div className="flex items-center text-[#00E6B8] font-bold text-xs">
                          <span>+{resume.atsAfter - resume.atsBefore}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-3 py-1 border font-bold uppercase tracking-wider text-[9px] ${statusConfig[resume.status].className}`}>
                        {statusConfig[resume.status].label}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-mono text-xs text-black border-2 border-black bg-[#faf8f5] px-2 py-1 uppercase font-bold shadow-[1px_1px_0px_#000]">{resume.template}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="h-7 w-7 border border-black bg-white hover:bg-gray-150 shadow-[1px_1px_0px_#000] flex items-center justify-center retro-btn-press" title="View">
                          <Eye size={12} />
                        </button>
                        <button className="h-7 w-7 border border-black bg-white hover:bg-gray-150 shadow-[1px_1px_0px_#000] flex items-center justify-center retro-btn-press" title="Download">
                          <Download size={12} />
                        </button>
                        <button className="h-7 w-7 border border-black bg-white hover:bg-red-50 text-red-600 shadow-[1px_1px_0px_#000] flex items-center justify-center retro-btn-press" title="Delete">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}