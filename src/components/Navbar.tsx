import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Templates", href: "/templates" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b-4 border-black"
      style={{ background: "#faf8f5" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 border-2 border-black bg-[#e0128b] flex items-center justify-center shadow-[2px_2px_0px_#121214] retro-btn-press">
              <Zap size={14} className="text-white fill-white animate-pulse" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-retro text-2xl font-black text-black tracking-wide uppercase">
                RESUME<span className="text-[#e0128b]">FORGE</span>
              </span>
              <span className="font-pixel text-[6px] text-gray-500 tracking-wider">CAREER ARCADE</span>
            </div>
            <span className="text-[10px] font-pixel text-[#00E6B8] bg-black border-2 border-[#00E6B8] px-1.5 py-0.5 rounded-none shadow-[1px_1px_0px_#121214]">
              AI
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 font-mono text-sm uppercase tracking-wide transition-all border-2 border-transparent ${
                  location.pathname === link.href
                    ? "text-[#e0128b] border-black bg-white shadow-[2px_2px_0px_#000] font-bold"
                    : "text-gray-700 hover:text-black hover:border-black hover:bg-white hover:shadow-[1px_1px_0px_#000]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <button className="px-4 py-2 bg-white text-black font-mono font-bold uppercase tracking-wider text-xs border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-gray-100 transition-all retro-btn-press">
                Sign In
              </button>
            </Link>
            <Link to="/generate">
              <button className="px-5 py-2 bg-[#ff7700] text-white font-mono font-bold uppercase tracking-wider text-xs border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-[#e06600] transition-all retro-btn-press">
                Tailor Resume
              </button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 border-2 border-black bg-white hover:bg-gray-150 transition-colors shadow-[2px_2px_0px_#000] retro-btn-press"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={18} className="text-black" /> : <Menu size={18} className="text-black" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t-2 border-black bg-[#faf8f5] px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 font-mono text-sm uppercase tracking-wide border-2 ${
                location.pathname === link.href
                  ? "text-[#e0128b] border-black bg-white shadow-[2px_2px_0px_#000]"
                  : "text-gray-700 hover:text-black border-transparent hover:border-black hover:bg-white hover:shadow-[1px_1px_0px_#000]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 flex flex-col gap-2 border-t-2 border-dashed border-gray-300">
            <Link to="/login" onClick={() => setMobileOpen(false)} className="w-full">
              <button className="w-full py-3 bg-white text-black font-mono font-bold uppercase tracking-wider text-xs border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-gray-100 transition-all retro-btn-press">
                Sign In
              </button>
            </Link>
            <Link to="/generate" onClick={() => setMobileOpen(false)} className="w-full">
              <button className="w-full py-3 bg-[#ff7700] text-white font-mono font-bold uppercase tracking-wider text-xs border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-[#e06600] transition-all retro-btn-press">
                Tailor Resume
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}