import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '../lib/AuthContext';
import TailorForm from './TailorForm';
import ResumeHistory from './ResumeHistory';
import ResumeChecker from './ResumeChecker';
import { Button } from '@/components/ui/button';
import { doc, updateDoc, increment, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CreditCard, Lock, CheckCircle, Loader2 } from 'lucide-react';

export default function MainDashboard() {
  const { userData, user, refreshUserData } = useAuth();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{name: string, price: number, credits: number} | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

  const handlePlanSelect = (name: string, price: number, credits: number) => {
    setSelectedPlan({ name, price, credits });
    setPaymentStatus('idle');
    setCheckoutOpen(true);
  };

  const handleConfirmPayment = async () => {
    if (!user || !selectedPlan) return;
    setPaymentStatus('processing');
    try {
      // Simulate gateway authorization delay
      await new Promise(r => setTimeout(r, 1800));
      
      if (user.uid === 'dev-user') {
        const currentCredits = Number(localStorage.getItem('dev_credits') || '999');
        localStorage.setItem('dev_credits', String(currentCredits + selectedPlan.credits));
        await refreshUserData();
      } else {
        const docRef = doc(db, 'users', user.uid);
        await updateDoc(docRef, {
          credits: increment(selectedPlan.credits),
          updatedAt: serverTimestamp()
        });
        await refreshUserData();
      }
      setPaymentStatus('success');
    } catch (e) {
      console.error(e);
      setPaymentStatus('error');
    }
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="check" className="w-full">
        <TabsList className="grid w-full grid-cols-4 max-w-3xl bg-white border-2 border-dark-brand/10 p-1.5 rounded-2xl h-auto">
          <TabsTrigger value="check" className="font-display uppercase tracking-wider text-base py-3 rounded-xl data-[state=active]:bg-dark-brand data-[state=active]:text-white transition-all cursor-pointer">Resume Checker</TabsTrigger>
          <TabsTrigger value="new" className="font-display uppercase tracking-wider text-base py-3 rounded-xl data-[state=active]:bg-dark-brand data-[state=active]:text-white transition-all cursor-pointer">Generate Resume</TabsTrigger>
          <TabsTrigger value="history" className="font-display uppercase tracking-wider text-base py-3 rounded-xl data-[state=active]:bg-dark-brand data-[state=active]:text-white transition-all cursor-pointer">History</TabsTrigger>
          <TabsTrigger value="credits" className="font-display uppercase tracking-wider text-base py-3 rounded-xl data-[state=active]:bg-dark-brand data-[state=active]:text-white transition-all cursor-pointer">Get Credits</TabsTrigger>
        </TabsList>
        
        <TabsContent value="check" className="mt-8">
          <ResumeChecker />
        </TabsContent>

        <TabsContent value="new" className="mt-8">
          <TailorForm />
        </TabsContent>
        
        <TabsContent value="history" className="mt-8">
          <ResumeHistory />
        </TabsContent>
        
        <TabsContent value="credits" className="mt-8 animate-in fade-in slide-in-from-bottom-6 duration-300">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
            {/* Starter Plan (Orange-Red Card) */}
            <Card className="border-0 shadow-lg bg-orange-brand text-white rounded-3xl overflow-hidden relative p-4">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
              <CardHeader className="pb-4">
                <CardTitle className="text-4xl font-display uppercase tracking-wide">Starter Plan</CardTitle>
                <CardDescription className="text-orange-100 font-medium">Perfect for early career application sprints</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-6xl font-display tracking-tight">₹49</div>
                <ul className="space-y-3 text-sm font-semibold uppercase tracking-wide text-orange-50">
                  <li className="flex items-center gap-2">✓ 5 Resume Generations</li>
                  <li className="flex items-center gap-2">✓ ATS Score Insights</li>
                  <li className="flex items-center gap-2">✓ PDF & DOCX Export</li>
                </ul>
                <Button className="w-full bg-dark-brand text-white hover:opacity-95 rounded-xl font-display uppercase tracking-wide py-6 text-lg border-0 shadow-md cursor-pointer" onClick={() => handlePlanSelect('Starter Plan', 49, 5)}>
                  Buy Starter
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan (Violet Card) */}
            <Card className="border-0 shadow-lg bg-violet-brand text-white rounded-3xl overflow-hidden relative p-4">
              <div className="absolute top-0 right-0 bg-lime-brand text-dark-brand text-xs px-4 py-1.5 font-bold uppercase tracking-widest rounded-bl-2xl">
                POPULAR
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
              <CardHeader className="pb-4">
                <CardTitle className="text-4xl font-display uppercase tracking-wide">Pro Plan</CardTitle>
                <CardDescription className="text-violet-100 font-medium">For serious job seekers applying frequently</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-6xl font-display tracking-tight">₹99</div>
                <ul className="space-y-3 text-sm font-semibold uppercase tracking-wide text-violet-50">
                  <li className="flex items-center gap-2">✓ 20 Resume Generations</li>
                  <li className="flex items-center gap-2">✓ ATS Score Insights</li>
                  <li className="flex items-center gap-2">✓ PDF & DOCX Export</li>
                </ul>
                <Button className="w-full bg-lime-brand text-dark-brand hover:opacity-95 rounded-xl font-display uppercase tracking-wide py-6 text-lg border-0 shadow-md cursor-pointer" onClick={() => handlePlanSelect('Pro Plan', 99, 20)}>
                  Buy Pro
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Mock Payment Gateway Dialog */}
      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent className="max-w-md rounded-[2.5rem] border-0 p-0 overflow-hidden shadow-2xl bg-white">
          {/* Header Area */}
          <div className="bg-dark-brand text-white p-6 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-lime-brand bg-white/10 px-3 py-1 rounded-full">
                  Secure Checkout
                </span>
                <DialogTitle className="text-2xl font-display uppercase tracking-wider mt-2.5">
                  Confirm Purchase
                </DialogTitle>
              </div>
              <div className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-xl">
                <Lock className="w-3.5 h-3.5 text-lime-brand" />
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-300">SSL Encrypted</span>
              </div>
            </div>
          </div>

          {/* Body Area */}
          <div className="p-6 space-y-6">
            {paymentStatus === 'idle' && selectedPlan && (
              <div className="space-y-6">
                {/* Plan Summary */}
                <div className="bg-[#F8FAFC] border-2 border-dark-brand/5 p-4.5 rounded-2xl flex justify-between items-center">
                  <div>
                    <h4 className="font-display text-xl text-dark-brand uppercase tracking-wide">{selectedPlan.name}</h4>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{selectedPlan.credits} Generations</p>
                  </div>
                  <div className="text-3xl font-display text-violet-brand">
                    ₹{selectedPlan.price}
                  </div>
                </div>

                {/* Mock Card Form */}
                <div className="space-y-4">
                  <div>
                    <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400 block mb-1.5">Card Number</label>
                    <div className="flex items-center gap-3 bg-gray-50 border-2 border-dark-brand/10 p-3.5 rounded-xl text-sm text-gray-750">
                      <CreditCard className="w-5 h-5 text-gray-450" />
                      <input 
                        type="text" 
                        readOnly 
                        value="•••• •••• •••• 4242" 
                        className="bg-transparent border-0 outline-none w-full font-mono text-base text-gray-800"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400 block mb-1.5">Expiry Date</label>
                      <input 
                        type="text" 
                        readOnly 
                        value="12 / 29" 
                        className="bg-gray-50 border-2 border-dark-brand/10 p-3.5 rounded-xl text-sm text-gray-700 w-full font-mono text-center"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400 block mb-1.5">CVV</label>
                      <input 
                        type="text" 
                        readOnly 
                        value="123" 
                        className="bg-gray-50 border-2 border-dark-brand/10 p-3.5 rounded-xl text-sm text-gray-700 w-full font-mono text-center"
                      />
                    </div>
                  </div>
                </div>

                {/* Confirm Buttons */}
                <div className="flex flex-col gap-2 pt-2">
                  <button 
                    onClick={handleConfirmPayment}
                    className="w-full bg-orange-brand hover:opacity-95 text-white font-display uppercase tracking-wider py-4.5 rounded-2xl shadow-md cursor-pointer transition-all text-center text-lg flex items-center justify-center gap-2"
                  >
                    Simulate Payment Success &rarr;
                  </button>
                  <button 
                    onClick={() => setCheckoutOpen(false)}
                    className="w-full bg-white hover:bg-gray-50 border-2 border-dark-brand/10 text-dark-brand font-display uppercase tracking-wider py-3.5 rounded-2xl cursor-pointer transition-all text-center"
                  >
                    Cancel Payment
                  </button>
                </div>
              </div>
            )}

            {paymentStatus === 'processing' && (
              <div className="py-12 flex flex-col items-center justify-center gap-4 text-center">
                <Loader2 className="animate-spin w-12 h-12 text-violet-brand" />
                <div>
                  <h4 className="font-display text-xl text-dark-brand uppercase tracking-wider">Securing Transaction</h4>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mt-1">Simulating bank authentication gateway...</p>
                </div>
              </div>
            )}

            {paymentStatus === 'success' && selectedPlan && (
              <div className="py-8 flex flex-col items-center justify-center gap-6 text-center animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 bg-lime-brand/20 text-lime-brand rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 fill-current text-white bg-lime-brand rounded-full" />
                </div>
                <div>
                  <h4 className="font-display text-3xl text-dark-brand uppercase tracking-wider">Payment Successful</h4>
                  <p className="text-sm font-semibold text-gray-500 mt-2">
                    Successfully added <span className="text-violet-brand font-bold">{selectedPlan.credits} generations</span> to your account balance.
                  </p>
                </div>
                <button 
                  onClick={() => setCheckoutOpen(false)}
                  className="w-full bg-dark-brand hover:opacity-95 text-white font-display uppercase tracking-wider py-4 rounded-2xl cursor-pointer transition-all text-center text-base"
                >
                  Return to Dashboard
                </button>
              </div>
            )}

            {paymentStatus === 'error' && (
              <div className="py-8 flex flex-col items-center justify-center gap-4 text-center animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 bg-red-100 text-red-650 rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold">&times;</span>
                </div>
                <div>
                  <h4 className="font-display text-xl text-dark-brand uppercase tracking-wider">Transaction Failed</h4>
                  <p className="text-sm text-gray-500 mt-1">There was a temporary network issue processing your gateway request.</p>
                </div>
                <button 
                  onClick={() => setPaymentStatus('idle')}
                  className="w-full bg-orange-brand hover:opacity-95 text-white font-display uppercase tracking-wider py-4 rounded-2xl cursor-pointer transition-all text-center"
                >
                  Retry Payment
                </button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
