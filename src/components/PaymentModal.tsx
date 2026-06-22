import { useState } from "react";
import { X, Lock, CreditCard, CheckCircle, Shield, Zap } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan?: { name: string; price: string; period: string };
}

export default function PaymentModal({ isOpen, onClose, plan }: PaymentModalProps) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const formatCard = (val: string) => {
    return val.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim().slice(0, 19);
  };
  const formatExpiry = (val: string) => {
    const v = val.replace(/\D/g, "");
    if (v.length >= 3) return v.slice(0, 2) + "/" + v.slice(2, 4);
    return v;
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("success");
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-end font-mono" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Slide Panel Drawer */}
      <div
        className="relative w-full max-w-md h-full bg-[#faf8f5] border-l-4 border-black shadow-[8px_0px_0px_#000] animate-slide-in-right overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-4 border-black bg-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border-2 border-black bg-[#e0128b] flex items-center justify-center shadow-[1.5px_1.5px_0px_#000] retro-btn-press">
              <Zap size={14} className="text-white fill-white" />
            </div>
            <div>
              <p className="font-retro font-bold text-xl text-black leading-none uppercase">CHECKOUT SECURE</p>
              <p className="text-[9px] text-gray-505 font-mono font-bold uppercase tracking-wider mt-1">resumeforge-payment-gateway</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 border border-black bg-white hover:bg-gray-100 shadow-[1.5px_1.5px_0px_#000] retro-btn-press text-black">
            <X size={16} className="stroke-[2.5px]" />
          </button>
        </div>

        {step === "success" ? (
          <div className="flex flex-col items-center justify-center h-[calc(100%-80px)] p-8 text-center">
            <div className="w-16 h-16 border-4 border-black bg-[#00E6B8] flex items-center justify-center mb-6 shadow-[3px_3px_0px_#000] animate-bounce">
              <CheckCircle size={32} className="text-black stroke-[3px]" />
            </div>
            <h2 className="font-retro font-black text-3xl text-black mb-2 uppercase leading-none">UPGRADE SUCCESSFUL!</h2>
            <p className="text-gray-700 font-mono text-xs font-semibold uppercase mb-8 leading-relaxed">
              Account upgraded to the <span className="text-[#e0128b] font-bold">{plan?.name}</span> plan.
              Ready for high score runs.
            </p>
            <button onClick={onClose} className="w-full py-4 bg-[#ff7700] hover:bg-[#e06600] text-white border-2 border-black shadow-[3px_3px_0px_#000] font-mono font-bold uppercase tracking-wider text-xs retro-btn-press active:translate-y-0.5">
              START OPTIMIZATION RUN &rarr;
            </button>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {/* Plan Summary */}
            {plan && (
              <div className="bg-white border-4 border-black p-4 shadow-[3px_3px_0px_#121214]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-[9px] text-gray-500 uppercase font-bold tracking-wider">Plan Selected</p>
                    <p className="font-retro font-bold text-2xl text-black uppercase leading-none mt-1">{plan.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-retro font-black text-[#e0128b] text-3xl leading-none">{plan.price}</p>
                    <p className="text-gray-400 text-[9px] font-mono font-bold uppercase">/{plan.period}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Gateway Badges */}
            <div className="flex items-center gap-4 py-1.5 border-b-2 border-dashed border-gray-300">
              <div className="flex items-center gap-1 text-[9px] text-gray-700 uppercase font-bold">
                <Shield size={12} className="text-[#00E6B8] stroke-[2.5px]" />
                <span>SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-1 text-[9px] text-gray-700 uppercase font-bold">
                <Lock size={12} className="text-[#00E6B8] stroke-[2.5px]" />
                <span>PCI-DSS</span>
              </div>
              <div className="flex items-center gap-1 text-[9px] text-gray-700 uppercase font-bold">
                <CheckCircle size={12} className="text-[#00E6B8] stroke-[2.5px]" />
                <span>3D Secure</span>
              </div>
            </div>

            {/* Billing Card Form */}
            <div className="space-y-4">
              <div>
                <label className="text-black font-mono text-xs font-bold uppercase tracking-wider mb-2 block">
                  Cardholder Name
                </label>
                <input
                  placeholder="Alexandra Chen"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border-2 border-black text-black placeholder:text-gray-400 h-11 px-4 font-mono text-sm uppercase outline-none focus:border-[#e0128b] shadow-[2px_2px_0px_#000] focus:shadow-none transition-all"
                />
              </div>

              <div>
                <label className="text-black font-mono text-xs font-bold uppercase tracking-wider mb-2 block">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    placeholder="4242 4242 4242 4242"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCard(e.target.value))}
                    maxLength={19}
                    className="w-full bg-white border-2 border-black text-black placeholder:text-gray-400 h-11 px-4 font-mono text-sm uppercase outline-none focus:border-[#e0128b] shadow-[2px_2px_0px_#000] focus:shadow-none transition-all pr-10"
                  />
                  <CreditCard size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-black font-mono text-xs font-bold uppercase tracking-wider mb-2 block">
                    Expiry
                  </label>
                  <input
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    maxLength={5}
                    className="w-full bg-white border-2 border-black text-black placeholder:text-gray-400 h-11 px-4 font-mono text-sm uppercase outline-none focus:border-[#e0128b] shadow-[2px_2px_0px_#000] focus:shadow-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-black font-mono text-xs font-bold uppercase tracking-wider mb-2 block">
                    CVV
                  </label>
                  <div className="relative">
                    <input
                      placeholder="•••"
                      type="password"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                      maxLength={4}
                      className="w-full bg-white border-2 border-black text-black placeholder:text-gray-400 h-11 px-4 font-mono text-sm uppercase outline-none focus:border-[#e0128b] shadow-[2px_2px_0px_#000] focus:shadow-none transition-all"
                    />
                    <Lock size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Pay Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-4 bg-[#e0128b] hover:bg-[#c20c74] text-white border-2 border-black shadow-[3px_3px_0px_#000] font-mono font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all retro-btn-press"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent animate-spin" />
                  PROCESSING TRANSACTION...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Lock size={14} className="stroke-[2.5px]" />
                  PAY {plan?.price} SECURELY
                </span>
              )}
            </button>

            <p className="text-center text-[10px] text-gray-500 font-mono font-semibold uppercase leading-normal">
              By continuing, you agree to our Terms of Service. Cancel anytime.
            </p>

            {/* Brand support tags */}
            <div className="flex items-center justify-center gap-3 pt-2">
              {["VISA", "MC", "AMEX", "UPI"].map((brand) => (
                <div key={brand} className="px-2 py-0.5 border border-black bg-white text-[8px] text-black font-mono font-bold tracking-wider">
                  {brand}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}