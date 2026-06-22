import { useState } from "react";
import { Check, Zap, Star, ArrowRight, Users, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import PaymentModal from "@/components/PaymentModal";

const plans = [
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: "$0",
    annualPrice: "$0",
    period: "month",
    description: "For job seekers just getting started",
    features: [
      "3 resume tailorings/month",
      "ATS score analysis",
      "5 free templates",
      "Basic keyword injection",
      "PDF download",
    ],
    notIncluded: ["GPT-4 rewriting", "Priority processing", "Team access"],
    cta: "Get Started Free",
    highlight: false,
    badge: null,
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: "$19",
    annualPrice: "$14",
    period: "month",
    description: "For active job seekers who need results",
    features: [
      "Unlimited resume tailorings",
      "GPT-4 advanced rewriting",
      "All 50+ templates",
      "Full keyword analysis",
      "ATS simulation testing",
      "Priority AI processing",
      "DOCX + PDF exports",
      "Resume version history",
    ],
    notIncluded: ["Team access"],
    cta: "Start Pro Trial",
    highlight: true,
    badge: "Most Popular",
  },
  {
    id: "team",
    name: "Team",
    monthlyPrice: "$49",
    annualPrice: "$39",
    period: "month",
    description: "For career coaches and HR teams",
    features: [
      "Everything in Pro",
      "Up to 10 team seats",
      "Shared template library",
      "Candidate management",
      "Bulk processing",
      "Analytics dashboard",
      "Dedicated support",
      "Custom branding",
    ],
    notIncluded: [],
    cta: "Contact Sales",
    highlight: false,
    badge: null,
  },
];

const faqs = [
  { q: "Is the free plan actually free forever?", a: "Yes. No credit card required. You get 3 tailorings per month on the free plan indefinitely." },
  { q: "Can I cancel my Pro subscription anytime?", a: "Absolutely. Cancel with one click from your dashboard. No cancellation fees, ever." },
  { q: "Does it work with Applicant Tracking Systems?", a: "We simulate 100+ ATS systems including Workday, Greenhouse, Lever, Taleo, and more." },
  { q: "Is my resume data secure?", a: "All resume data is encrypted at rest (AES-256) and in transit (TLS 1.3). We never share or sell your data." },
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: string; period: string } | null>(null);

  const openModal = (plan: typeof plans[0]) => {
    if (plan.id === "starter") return;
    setSelectedPlan({ name: plan.name, price: isAnnual ? plan.annualPrice : plan.monthlyPrice, period: plan.period });
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#121214] pb-20 pt-24 font-mono">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#e0128b] font-pixel text-[9px] uppercase tracking-widest mb-3 animate-pulse">TRANSPARENT PRICING</p>
          <h1 className="font-retro font-black text-4xl lg:text-6xl text-black mb-4 uppercase leading-none">
            INVEST IN YOUR<br /><span className="text-[#ff7700]">NEXT CAREER MOVE</span>
          </h1>
          <p className="font-mono text-gray-600 text-sm max-w-xl mx-auto font-bold uppercase tracking-wide">
            One tailored resume that lands an interview pays back 100x the cost of a Pro subscription.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`font-mono text-xs uppercase font-bold transition-colors ${!isAnnual ? "text-black" : "text-gray-700"}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`w-14 h-7 border-2 border-black transition-all relative ${isAnnual ? "bg-[#e0128b]" : "bg-white"}`}
            >
              <div className="absolute top-0.5 w-4 h-4 border border-black bg-white transition-all" 
                style={{ left: isAnnual ? "32px" : "4px" }}
              />
            </button>
            <div className="flex items-center gap-2">
              <span className={`font-mono text-xs uppercase font-bold transition-colors ${isAnnual ? "text-black" : "text-gray-700"}`}>Annual</span>
              <span className="font-pixel text-[6px] font-bold text-black bg-[#00E6B8] border-2 border-black px-2 py-0.5 shadow-[1px_1px_0px_#000]">SAVE 26%</span>
            </div>
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, i) => (
            <div
              key={plan.id}
              className={`relative bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#121214] transition-all duration-300 ${
                plan.highlight
                  ? "border-[#e0128b] ring-4 ring-[#e0128b] shadow-[0_0_20px_rgba(224,18,139,0.25)] scale-[1.02]"
                  : ""
              }`}
            >
              {plan.badge && (
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-[#ff7700] text-white border-2 border-black rounded-none px-2 py-0.5 text-[8px] font-pixel uppercase tracking-wider shadow-[1px_1px_0px_#000]">
                  <Star size={8} className="fill-current" /> {plan.badge}
                </div>
              )}

              <div className="border-b-2 border-dashed border-gray-200 pb-5 mb-5">
                <h3 className="font-retro font-black text-3xl text-black uppercase leading-none mb-1">{plan.name}</h3>
                <p className="font-mono text-gray-800 text-xs uppercase font-bold">{plan.description}</p>

                <div className="flex items-baseline gap-1 mt-4">
                  <span className="font-retro font-black text-5xl text-black">
                    {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  {plan.id !== "starter" && (
                    <span className="font-mono text-gray-750 text-xs font-bold">/{plan.period}</span>
                  )}
                </div>

                {isAnnual && plan.id !== "starter" && (
                  <p className="font-mono text-gray-700 text-[10px] uppercase font-bold mt-1.5">
                    Billed annually ({plan.monthlyPrice}/mo if monthly)
                  </p>
                )}
              </div>

              <div className="space-y-4 mb-6">
                {plan.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-3">
                    <div className="w-4.5 h-4.5 border border-black bg-[#00E6B8] flex items-center justify-center shadow-[1px_1px_0px_#000]">
                      <Check size={9} className="text-black stroke-[3px]" />
                    </div>
                    <span className="font-mono text-xs text-black uppercase font-bold">{feat}</span>
                  </div>
                ))}
                {plan.notIncluded.map((feat) => (
                  <div key={feat} className="flex items-center gap-3 opacity-30">
                    <div className="w-4.5 h-4.5 border border-black bg-gray-100 flex items-center justify-center">
                      <div className="w-2 h-0.5 bg-black" />
                    </div>
                    <span className="font-mono text-xs text-gray-700 uppercase font-bold line-through">{feat}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => openModal(plan)}
                className={`w-full py-3 border-2 border-black font-mono font-bold uppercase tracking-wider text-xs shadow-[3px_3px_0px_#000] transition-all retro-btn-press ${
                  plan.highlight
                    ? "bg-[#ff7700] hover:bg-[#e06600] text-white"
                    : "bg-white hover:bg-gray-150 text-black"
                }`}
              >
                {plan.cta} &rarr;
              </button>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-8 mb-16 py-6 border-y-2 border-black bg-white">
          {[
            { icon: Shield, text: "256-bit SSL Encryption" },
            { icon: Users, text: "50,000+ Active Users" },
            { icon: Star, text: "4.9/5 Average Rating" },
            { icon: Zap, text: "99.9% Uptime SLA" },
          ].map((badge) => (
            <div key={badge.text} className="flex items-center gap-2 text-black font-mono text-xs font-bold uppercase tracking-wide">
              <badge.icon size={13} className="text-[#e0128b]" />
              <span>{badge.text}</span>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="font-retro font-black text-4xl text-black text-center mb-8 uppercase">FAQ / RULES OF THE GAME</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_#000]">
                <p className="font-retro font-bold text-xl text-black mb-2 uppercase">{faq.q}</p>
                <p className="font-mono text-xs text-gray-800 leading-relaxed uppercase font-semibold">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PaymentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} plan={selectedPlan || undefined} />
    </div>
  );
}