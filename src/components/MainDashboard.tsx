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

export default function MainDashboard() {
  const { userData, user, refreshUserData } = useAuth();
  const [buying, setBuying] = useState(false);

  // Mock Stripe/Razorpay flow
  const handleBuyCredits = async (amount: number) => {
    if (!user) return;
    setBuying(true);
    try {
      // Simulate Razorpay popup delay
      await new Promise(r => setTimeout(r, 1000));
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, {
        credits: increment(amount),
        updatedAt: serverTimestamp()
      });
      await refreshUserData();
      alert(`Successfully added ${amount} credits!`);
    } catch (e) {
      console.error(e);
      alert("Error processing payment.");
    } finally {
      setBuying(false);
    }
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="check" className="w-full">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl bg-white border border-gray-200">
          <TabsTrigger value="check">Resume Checker</TabsTrigger>
          <TabsTrigger value="new">Generate Resume</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="credits">Get Credits</TabsTrigger>
        </TabsList>
        
        <TabsContent value="check" className="mt-6">
          <ResumeChecker />
        </TabsContent>

        <TabsContent value="new" className="mt-6">
          <TailorForm />
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <ResumeHistory />
        </TabsContent>
        
        <TabsContent value="credits" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            <Card className="border border-gray-200 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Starter Plan</CardTitle>
                <CardDescription className="text-gray-500">Perfect for early career application sprints</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-4xl font-bold tracking-tight text-gray-900">₹49</div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">✓ 5 Resume Generations</li>
                  <li className="flex items-center gap-2">✓ ATS Score Insights</li>
                  <li className="flex items-center gap-2">✓ PDF & DOCX Export</li>
                </ul>
                <Button className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50" onClick={() => handleBuyCredits(5)} disabled={buying}>
                  Buy Starter
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-gray-900 bg-gray-50 relative shadow-md">
              <div className="absolute top-0 right-0 bg-gray-900 text-white text-xs px-3 py-1 font-medium transform rotate-0 rounded-bl-lg">
                POPULAR
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Pro Plan</CardTitle>
                <CardDescription className="text-gray-600">For serious job seekers applying frequently</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-4xl font-bold tracking-tight text-gray-900">₹99</div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2 font-medium text-gray-900">✓ 20 Resume Generations</li>
                  <li className="flex items-center gap-2">✓ ATS Score Insights</li>
                  <li className="flex items-center gap-2">✓ PDF & DOCX Export</li>
                </ul>
                <Button className="w-full bg-gray-900 text-white hover:bg-black rounded-lg" onClick={() => handleBuyCredits(20)} disabled={buying}>
                  Buy Pro
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
