import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Zap, ArrowRight, Github } from "lucide-react";
import { useAuth } from "../lib/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login, loginLocalDev } = useAuth();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (e: any) {
      console.error(e);
      setError(e.message || "Invalid credentials or auth failure.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await login();
      navigate("/dashboard");
    } catch (e: any) {
      console.error(e);
      setError(e.message || "Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center relative overflow-hidden px-4 py-12">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(rgba(18,18,20,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(18,18,20,0.5) 1px, transparent 1px)", backgroundSize: "48px 48px" }}
        />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-9 h-9 border-2 border-black bg-[#e0128b] flex items-center justify-center shadow-[2px_2px_0px_#121214] retro-btn-press">
              <Zap size={14} className="text-white fill-white" />
            </div>
            <span className="font-retro text-3xl font-black text-black tracking-wide uppercase">
              RESUME<span className="text-[#e0128b]">FORGE</span>
            </span>
          </Link>
          <p className="font-mono text-gray-800 text-xs font-bold uppercase tracking-wider mt-3">Welcome back. Sign in to your account.</p>
        </div>

        {/* Card */}
        <div className="bg-white border-4 border-black p-6 sm:p-8 shadow-[6px_6px_0px_#121214]">
          {error && (
            <div className="bg-red-50 text-red-700 border-2 border-red-600 p-3.5 font-mono text-xs uppercase shadow-[2px_2px_0px_#000] font-bold mb-5">
              ERROR: {error}
            </div>
          )}

          {/* OAuth Buttons */}
          <div className="space-y-3 mb-6">
            <button 
              onClick={handleGoogleLogin}
              className="w-full h-11 bg-white hover:bg-gray-100 text-black border-2 border-black shadow-[2px_2px_0px_#000] font-mono font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2.5 transition-all retro-btn-press"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
            <button 
              onClick={() => {
                loginLocalDev();
                navigate("/dashboard");
              }}
              className="w-full h-11 bg-[#00E6B8] hover:bg-[#00c49d] text-black border-2 border-black shadow-[2px_2px_0px_#000] font-mono font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2.5 transition-all retro-btn-press"
            >
              [ Local Dev Mode Login ]
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center gap-3 mb-6">
            <div className="flex-1 h-0.5 bg-black" />
            <span className="text-gray-800 font-mono text-[10px] font-bold uppercase tracking-wider">or sign in with email</span>
            <div className="flex-1 h-0.5 bg-black" />
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleEmailLogin} className="space-y-5">
            <div>
              <label className="text-black font-mono text-xs font-bold uppercase tracking-wider mb-2 block">Email</label>
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
              <div className="flex items-center justify-between mb-2">
                <label className="text-black font-mono text-xs font-bold uppercase tracking-wider">Password</label>
                <a href="#" className="text-[#e0128b] font-mono text-xs font-bold uppercase hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-white border-2 border-black text-black placeholder:text-gray-500 h-11 px-4 font-mono text-sm uppercase outline-none focus:border-[#e0128b] shadow-[2px_2px_0px_#000] focus:shadow-none transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#e0128b] hover:bg-[#c20c74] text-white border-2 border-black shadow-[3px_3px_0px_#000] font-mono font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all retro-btn-press"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent animate-spin" />
                  SIGNING IN...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  SIGN IN &rarr;
                </span>
              )}
            </button>
          </form>

          <p className="text-center font-mono text-xs uppercase font-bold text-gray-800 mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#e0128b] hover:underline font-bold">
              Create one free
            </Link>
          </p>
        </div>

        <p className="text-center text-[10px] text-gray-800 font-mono font-semibold uppercase tracking-wider mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}