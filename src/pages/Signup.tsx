import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Zap, ArrowRight, Github, CheckCircle } from "lucide-react";
import { useAuth } from "../lib/AuthContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

const perks = [
  "3 free resume tailorings per month",
  "ATS score analysis on every resume",
  "50+ professional templates included",
  "No credit card required to start",
];

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login, loginLocalDev } = useAuth();

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (e: any) {
      console.error(e);
      setError(e.message || "Registration failed. Check details or email formatting.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError(null);
    try {
      await login();
      navigate("/dashboard");
    } catch (e: any) {
      console.error(e);
      setError(e.message || "Google sign-up failed.");
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = (pw: string) => {
    if (!pw) return { strength: 0, label: "", color: "" };
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    const levels = [
      { label: "Weak", color: "bg-[#e0128b]" },
      { label: "Fair", color: "bg-[#ff7700]" },
      { label: "Good", color: "bg-blue-500" },
      { label: "Strong", color: "bg-[#00E6B8]" },
    ];
    return { strength: score, ...levels[Math.max(0, score - 1)] };
  };

  const pw = passwordStrength(password);

  return (
    <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center relative overflow-hidden px-4 py-12">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(rgba(18,18,20,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(18,18,20,0.5) 1px, transparent 1px)", backgroundSize: "48px 48px" }}
        />
      </div>

      <div className="relative w-full max-w-4xl grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Value Prop */}
        <div className="hidden lg:block animate-fade-up">
          <Link to="/" className="inline-flex items-center gap-3 mb-10">
            <div className="w-8 h-8 border-2 border-black bg-[#e0128b] flex items-center justify-center shadow-[2px_2px_0px_#121214] retro-btn-press">
              <Zap size={14} className="text-white fill-white" />
            </div>
            <span className="font-retro text-2xl font-black text-black tracking-wide uppercase">
              RESUME<span className="text-[#e0128b]">FORGE</span>
            </span>
            <span className="text-[9px] font-pixel text-[#00E6B8] bg-black border-2 border-[#00E6B8] px-1.5 py-0.5 rounded-none shadow-[1px_1px_0px_#121214]">
              AI
            </span>
          </Link>

          <h1 className="font-retro font-black text-4xl lg:text-5xl text-black leading-none mb-4 uppercase">
            GET MORE INTERVIEWS<br /><span className="text-[#ff7700]">STARTING TODAY</span>
          </h1>
          <p className="font-mono text-gray-800 text-sm leading-relaxed mb-8 uppercase font-bold tracking-wide">
            Create your free account and let our AI optimize your resume for ATS systems at top companies.
          </p>

          <div className="space-y-4">
            {perks.map((perk, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-black bg-[#00E6B8] flex items-center justify-center shadow-[1px_1px_0px_#000]">
                  <CheckCircle size={10} className="text-black stroke-[3px]" />
                </div>
                <span className="font-mono text-sm font-bold text-black uppercase tracking-wide">{perk}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-white border-4 border-black p-5 relative shadow-[4px_4px_0px_#121214]">
            <p className="font-mono text-sm text-black leading-relaxed">
              "Got 4 interview calls within a week of using ResumeForge. The ATS score jumped from 38 to 89."
            </p>
            {/* Speech bubble arrow pointer */}
            <div className="absolute -bottom-[12px] left-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-black"></div>
            <div className="absolute -bottom-[8px] left-[25px] w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[7px] border-t-white"></div>
            <p className="font-mono text-[10px] text-gray-800 uppercase mt-4 font-bold text-right">— Ananya R., hired at Razorpay</p>
          </div>
        </div>

        {/* Right: Form */}
        <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-9 h-9 border-2 border-black bg-[#e0128b] flex items-center justify-center shadow-[2px_2px_0px_#121214] retro-btn-press">
                <Zap size={14} className="text-white fill-white" />
              </div>
              <span className="font-retro text-2xl font-black text-black tracking-wide uppercase">
                RESUME<span className="text-[#e0128b]">FORGE</span>
              </span>
            </Link>
          </div>

          <div className="bg-white border-4 border-black p-6 sm:p-8 shadow-[6px_6px_0px_#121214]">
            <h2 className="font-retro font-black text-3xl text-black mb-1 uppercase">CREATE YOUR SESSION</h2>
            <p className="font-mono text-gray-800 text-xs font-bold uppercase tracking-wider mb-6">Free forever. No credit card needed.</p>

            {error && (
              <div className="bg-red-50 text-red-700 border-2 border-red-600 p-3.5 font-mono text-xs uppercase shadow-[2px_2px_0px_#000] font-bold mb-5">
                ERROR: {error}
              </div>
            )}

            {/* OAuth Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button 
                onClick={handleGoogleSignup}
                className="h-11 bg-white hover:bg-gray-100 text-black border-2 border-black shadow-[2px_2px_0px_#000] font-mono font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-1.5 transition-all retro-btn-press"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button 
                onClick={() => {
                  loginLocalDev();
                  navigate("/dashboard");
                }}
                className="h-11 bg-[#00E6B8] hover:bg-[#00c49d] text-black border-2 border-black shadow-[2px_2px_0px_#000] font-mono font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-1.5 transition-all retro-btn-press"
              >
                [ Local Dev ]
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center gap-3 mb-5">
              <div className="flex-1 h-0.5 bg-black" />
              <span className="text-gray-800 font-mono text-[10px] font-bold uppercase tracking-wider">or with email</span>
              <div className="flex-1 h-0.5 bg-black" />
            </div>

            <form onSubmit={handleEmailSignup} className="space-y-4">
              <div>
                <label className="text-black font-mono text-xs font-bold uppercase tracking-wider mb-2 block">Full Name</label>
                <input
                  placeholder="Alex Johnson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-white border-2 border-black text-black placeholder:text-gray-500 h-11 px-4 font-mono text-sm uppercase outline-none focus:border-[#e0128b] shadow-[2px_2px_0px_#000] focus:shadow-none transition-all"
                />
              </div>

              <div>
                <label className="text-black font-mono text-xs font-bold uppercase tracking-wider mb-2 block">Work Email</label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white border-2 border-black text-black placeholder:text-gray-500 h-11 px-4 font-mono text-sm uppercase outline-none focus:border-[#e0128b] shadow-[2px_2px_0px_#000] focus:shadow-none transition-all"
                />
              </div>

              <div>
                <label className="text-black font-mono text-xs font-bold uppercase tracking-wider mb-2 block">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-white border-2 border-black text-black placeholder:text-gray-500 h-11 px-4 font-mono text-sm uppercase outline-none focus:border-[#e0128b] shadow-[2px_2px_0px_#000] focus:shadow-none transition-all pr-10"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {password && (
                  <div className="mt-2 space-y-1.5">
                    <div className="flex gap-1 bg-gray-100 border border-black p-0.5">
                      {[1,2,3,4].map((i) => (
                        <div key={i} className={`h-2 flex-1 transition-all ${i <= pw.strength ? pw.color : "bg-white"}`} />
                      ))}
                    </div>
                    <p className="font-mono text-[10px] font-bold text-gray-800 uppercase">
                      Password strength: <span className="text-black underline">{pw.label}</span>
                    </p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#e0128b] hover:bg-[#c20c74] text-white border-2 border-black shadow-[3px_3px_0px_#000] font-mono font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all retro-btn-press"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent animate-spin" />
                    CREATING RUNNER...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    CREATE FREE ACCOUNT &rarr;
                  </span>
                )}
              </button>
            </form>

            <p className="text-center font-mono text-xs uppercase font-bold text-gray-800 mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-[#e0128b] hover:underline font-bold">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}