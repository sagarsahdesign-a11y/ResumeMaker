import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAuth } from '../lib/AuthContext';
import { Loader2, FileText, Download, CheckCircle, AlertCircle, Eye } from 'lucide-react';
import Markdown from 'react-markdown';
import { db } from '../lib/firebase';
import { collection, addDoc, doc, updateDoc, increment, serverTimestamp } from 'firebase/firestore';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ATSScoreCard from "./ATSScoreCard";

export default function TailorForm() {
  const { user, userData, refreshUserData } = useAuth();
  
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [template, setTemplate] = useState("ATS Classic");
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!file || !jobDescription) {
      setError("Please provide both a resume file and a job description.");
      return;
    }
    
    const isOwner = user?.email === 'mfl9815268699@gmail.com';
    const isDev = user?.uid === 'dev-user';

    if (!isOwner && (userData?.credits || 0) <= 0) {
      setError("Not enough credits. Please purchase more from the Get Credits tab.");
      return;
    }
    
    setError(null);
    setLoading(true);
    setResult(null);

    // Optimistically deduct credit (In production, do this via Cloud Function for security)
    if (user && !isOwner) {
      if (isDev) {
        const currentCredits = Number(localStorage.getItem('dev_credits') || '999');
        localStorage.setItem('dev_credits', String(Math.max(0, currentCredits - 1)));
        refreshUserData();
      } else {
        updateDoc(doc(db, 'users', user.uid), { 
          credits: increment(-1),
          updatedAt: serverTimestamp() 
        }).catch(console.error);
      }
    }

    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDescription", jobDescription);
      formData.append("templateStr", template);

      const res = await fetch("/api/tailor", {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        const errInfo = await res.json();
        throw new Error(errInfo.error || "Generation failed.");
      }

      const data = await res.json();
      setResult(data);

      await refreshUserData();

      // Save to history
      if (user) {
        if (isDev) {
          const localResumes = JSON.parse(localStorage.getItem('dev_resumes') || '[]');
          localResumes.unshift({
            id: Math.random().toString(36).substring(2),
            userId: user.uid,
            jobTitle: jobDescription.substring(0, 50) + "...",
            atsScore: Number(data.atsScore) || 0,
            content: data.tailoredResumeMarkdown,
            createdAt: new Date().toISOString()
          });
          localStorage.setItem('dev_resumes', JSON.stringify(localResumes));
        } else {
          await addDoc(collection(db, 'resumes'), {
            userId: user.uid,
            jobTitle: jobDescription.substring(0, 50) + "...", // Quick extract
            atsScore: Number(data.atsScore) || 0,
            content: data.tailoredResumeMarkdown,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
        }
      }

    } catch (e: any) {
      console.error(e);
      setError(e.message);
      // Give credit back on failure
      if (user && !isOwner) {
        if (isDev) {
          const currentCredits = Number(localStorage.getItem('dev_credits') || '999');
          localStorage.setItem('dev_credits', String(currentCredits + 1));
          refreshUserData();
        } else {
          updateDoc(doc(db, 'users', user.uid), { 
            credits: increment(1),
            updatedAt: serverTimestamp() 
          }).catch(console.error);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    // A simple way to export to PDF using browser print
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Tailored Resume</title>
          <style>
            body { font-family: 'Inter', sans-serif; line-height: 1.6; padding: 40px; max-width: 800px; margin: auto; }
            h1 { font-size: 24px; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px;}
            h2 { font-size: 18px; line-height: 1.2; margin-top: 25px; margin-bottom: 15px;}
            h3 { font-size: 16px; margin-top: 20px; font-weight: 600;}
            p { margin-bottom: 10px; }
            ul { margin-bottom: 15px; padding-left: 20px;}
            li { margin-bottom: 5px; }
            @media print {
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          <div class="resume-content">
            ${document.getElementById('resume-markdown-content')?.innerHTML || ''}
          </div>
          <script>
            window.onload = () => { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleDownloadDocx = () => {
    // Generate a basic HTML representation, save it as .doc which Word can parse
    const htmlContent = document.getElementById('resume-markdown-content')?.innerHTML || '';
    const blob = new Blob(['\ufeff', htmlContent], {
        type: 'application/msword'
    });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);
    downloadLink.href = url;
    downloadLink.download = 'Tailored_Resume.doc';
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start animate-in fade-in zoom-in-95 duration-300">
      {/* Left Column - Configurations */}
      <Card className="border-0 shadow-lg bg-white rounded-3xl overflow-hidden p-4">
        <CardHeader className="border-b-2 border-dark-brand/5 pb-6">
          <CardTitle className="text-3xl font-display uppercase tracking-wider text-dark-brand">Configure Application</CardTitle>
          <CardDescription className="text-base text-gray-500 font-medium">Upload your base resume and target job description to generate a tailored version instantly.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* File Upload */}
          <div className="space-y-2.5">
            <Label htmlFor="resume" className="text-xs font-bold uppercase tracking-widest text-violet-brand/80">Master Resume (PDF/DOCX)</Label>
            <Input id="resume" type="file" accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files?.[0] || null)} className="bg-gray-50 border-2 border-dark-brand/10 hover:border-violet-brand rounded-2xl text-sm text-gray-700 p-3 h-auto cursor-pointer focus:ring-0 focus:border-violet-brand transition-all" />
          </div>

          {/* Job Description Textarea */}
          <div className="space-y-2.5">
            <Label className="text-xs font-bold uppercase tracking-widest text-violet-brand/80">Target Job Description</Label>
            <Textarea 
              className="h-44 resize-none text-sm bg-gray-50 border-2 border-dark-brand/10 rounded-2xl leading-relaxed text-gray-700 focus:outline-none focus:ring-0 focus:border-violet-brand transition-all p-4" 
              placeholder="Paste job description here..."
              value={jobDescription}
              onChange={e => setJobDescription(e.target.value)}
            />
          </div>

          {/* Template Style trigger */}
          <div className="space-y-2.5">
            <Label className="text-xs font-bold uppercase tracking-widest text-violet-brand/80">Template Style</Label>
            <Dialog>
              <DialogTrigger className="w-full bg-white border-2 border-dark-brand/10 rounded-2xl p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-violet-brand/10 rounded-xl flex items-center justify-center text-violet-brand">
                      <FileText className="w-5.5 h-5.5" />
                    </div>
                    <div className="text-left">
                      <div className="text-base font-bold text-dark-brand">{template}</div>
                      <div className="text-xs text-gray-400 font-medium">Document Size: A4</div>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-violet-brand bg-violet-brand/10 px-4 py-2 rounded-full uppercase tracking-wider">Change</div>
              </DialogTrigger>
              <DialogContent className="max-w-2xl rounded-3xl border-0 p-6">
                <DialogHeader>
                  <DialogTitle className="text-center text-2xl font-display uppercase tracking-wider text-dark-brand">Select a template</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-2">
                  {/* Template 1: ATS Classic / Ivy League */}
                  <div 
                    onClick={() => setTemplate('ATS Classic')}
                    className={`cursor-pointer rounded-2xl border-2 transition-all p-2 flex flex-col items-center gap-3 ${template === 'ATS Classic' ? 'border-orange-brand bg-orange-brand/5' : 'border-transparent hover:border-gray-200'}`}
                  >
                    <div className="w-full aspect-[1/1.4] bg-white border border-gray-200 shadow-sm p-4 relative overflow-hidden rounded-lg">
                      <div className="w-full h-8 flex flex-col items-center gap-1 border-b border-gray-200 pb-2 mb-2">
                        <div className="w-1/2 h-2 bg-gray-800 rounded-full"></div>
                        <div className="w-1/3 h-1 bg-gray-400 rounded-full"></div>
                        <div className="w-1/4 h-1 bg-gray-400 rounded-full"></div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="w-1/4 h-1.5 bg-gray-600 mb-1"></div>
                          <div className="w-full h-1 bg-gray-300"></div>
                          <div className="w-full h-1 bg-gray-300 mt-0.5"></div>
                          <div className="w-5/6 h-1 bg-gray-300 mt-0.5"></div>
                        </div>
                        <div>
                          <div className="w-1/4 h-1.5 bg-gray-600 mb-1"></div>
                          <div className="flex gap-2">
                            <div className="w-[10%] h-1 bg-gray-400"></div>
                            <div className="flex-1 space-y-0.5">
                              <div className="w-full h-1 bg-gray-300"></div>
                              <div className="w-full h-1 bg-gray-300"></div>
                              <div className="w-4/5 h-1 bg-gray-300"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {template === 'ATS Classic' && (
                        <div className="absolute bottom-0 right-0 w-8 h-8 bg-orange-brand rotate-45 translate-x-4 translate-y-4"></div>
                      )}
                      {template === 'ATS Classic' && (
                        <CheckCircle className="absolute bottom-1 right-1 w-4 h-4 text-white z-10" />
                      )}
                    </div>
                    <span className={`font-display text-lg ${template === 'ATS Classic' ? 'text-orange-brand' : 'text-gray-900'}`}>Ivy League (ATS)</span>
                  </div>

                  {/* Template 2: Double Column */}
                  <div 
                    onClick={() => setTemplate('Double Column')}
                    className={`cursor-pointer rounded-2xl border-2 transition-all p-2 flex flex-col items-center gap-3 ${template === 'Double Column' ? 'border-orange-brand bg-orange-brand/5' : 'border-transparent hover:border-gray-200'}`}
                  >
                    <div className="w-full aspect-[1/1.4] bg-white border border-gray-200 shadow-sm relative overflow-hidden flex rounded-lg">
                      <div className="w-1/3 h-full border-r border-gray-200 p-2 space-y-3 bg-gray-50/50">
                        <div className="flex flex-col gap-1">
                          <div className="w-3/4 h-2 bg-gray-800 rounded-full"></div>
                          <div className="w-1/2 h-1 bg-gray-400 rounded-full"></div>
                        </div>
                        <div className="space-y-1">
                          <div className="w-full h-1 bg-gray-300"></div>
                          <div className="w-full h-1 bg-gray-300"></div>
                          <div className="w-4/5 h-1 bg-gray-300"></div>
                        </div>
                        <div className="space-y-1 pt-2 border-t border-gray-200">
                           <div className="w-1/2 h-1.5 bg-gray-600"></div>
                           <div className="w-full h-1 bg-gray-300"></div>
                           <div className="w-4/5 h-1 bg-gray-300"></div>
                        </div>
                      </div>
                      <div className="w-2/3 h-full p-2 space-y-4">
                        <div>
                          <div className="w-1/3 h-1.5 bg-gray-600 mb-1"></div>
                          <div className="w-full h-1 bg-gray-300"></div>
                          <div className="w-full h-1 bg-gray-300 mt-0.5"></div>
                          <div className="w-5/6 h-1 bg-gray-300 mt-0.5"></div>
                        </div>
                        <div>
                          <div className="w-1/3 h-1.5 bg-gray-600 mb-1"></div>
                          <div className="flex gap-1 mb-1">
                            <div className="w-[10%] h-1 bg-gray-400"></div>
                            <div className="flex-1 space-y-0.5">
                              <div className="w-full h-1 bg-gray-300"></div>
                              <div className="w-full h-1 bg-gray-300"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {template === 'Double Column' && (
                        <div className="absolute bottom-0 right-0 w-8 h-8 bg-orange-brand rotate-45 translate-x-4 translate-y-4"></div>
                      )}
                      {template === 'Double Column' && (
                        <CheckCircle className="absolute bottom-1 right-1 w-4 h-4 text-white z-10" />
                      )}
                    </div>
                    <span className={`font-display text-lg ${template === 'Double Column' ? 'text-orange-brand' : 'text-gray-900'}`}>Double Column</span>
                  </div>

                  {/* Template 3: Modern Dark */}
                  <div 
                    onClick={() => setTemplate('Modern Dark')}
                    className={`cursor-pointer rounded-2xl border-2 transition-all p-2 flex flex-col items-center gap-3 ${template === 'Modern Dark' ? 'border-orange-brand bg-orange-brand/5' : 'border-transparent hover:border-gray-200'}`}
                  >
                    <div className="w-full aspect-[1/1.4] bg-white border border-gray-200 shadow-sm relative overflow-hidden flex rounded-lg">
                      <div className="w-2/3 h-full p-2 space-y-4">
                         <div className="flex flex-col gap-1 pb-2 border-b border-gray-200">
                          <div className="w-1/2 h-2 bg-gray-800 rounded-full"></div>
                          <div className="w-1/3 h-1 bg-gray-400 rounded-full"></div>
                        </div>
                        <div>
                          <div className="w-1/3 h-1.5 bg-gray-600 mb-1"></div>
                          <div className="w-full h-1 bg-gray-300"></div>
                          <div className="w-full h-1 bg-gray-300 mt-0.5"></div>
                          <div className="w-5/6 h-1 bg-gray-300 mt-0.5"></div>
                        </div>
                      </div>
                      <div className="w-1/3 h-full bg-slate-800 p-2 space-y-2">
                        <div className="w-6 h-6 rounded-full bg-slate-600 mx-auto mb-2"></div>
                        <div className="w-full h-1 bg-slate-500"></div>
                        <div className="w-4/5 h-1 bg-slate-500"></div>
                        <div className="w-1/2 h-1.5 bg-slate-400 mt-3 mb-1"></div>
                        <div className="w-full h-1 bg-slate-500"></div>
                      </div>
                      {template === 'Modern Dark' && (
                        <div className="absolute bottom-0 right-0 w-8 h-8 bg-orange-brand rotate-45 translate-x-4 translate-y-4 z-10"></div>
                      )}
                      {template === 'Modern Dark' && (
                        <CheckCircle className="absolute bottom-1 right-1 w-4 h-4 text-white z-20" />
                      )}
                    </div>
                    <span className={`font-display text-lg ${template === 'Modern Dark' ? 'text-orange-brand' : 'text-gray-900'}`}>Modern Dark Sidebar</span>
                  </div>

                  {/* Template 4: Student/Fresher */}
                  <div 
                    onClick={() => setTemplate('Student/Fresher')}
                    className={`cursor-pointer rounded-2xl border-2 transition-all p-2 flex flex-col items-center gap-3 ${template === 'Student/Fresher' ? 'border-orange-brand bg-orange-brand/5' : 'border-transparent hover:border-gray-200'}`}
                  >
                    <div className="w-full aspect-[1/1.4] bg-white border border-gray-200 shadow-sm p-4 relative overflow-hidden flex flex-col rounded-lg">
                      <div className="flex gap-2 mb-3">
                         <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                         <div className="flex-1 space-y-1 py-1">
                           <div className="w-1/2 h-2 bg-gray-800"></div>
                           <div className="w-1/3 h-1 bg-gray-400"></div>
                         </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-1/4 h-1.5 bg-blue-500"></div>
                          <div className="flex-1 h-px bg-gray-200"></div>
                        </div>
                        <div className="pl-2 border-l-2 border-gray-200 space-y-1">
                          <div className="w-3/4 h-1 bg-gray-300"></div>
                          <div className="w-full h-1 bg-gray-300"></div>
                          <div className="w-5/6 h-1 bg-gray-300"></div>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-1/4 h-1.5 bg-blue-500"></div>
                          <div className="flex-1 h-px bg-gray-200"></div>
                        </div>
                      </div>
                      {template === 'Student/Fresher' && (
                        <div className="absolute bottom-0 right-0 w-8 h-8 bg-orange-brand rotate-45 translate-x-4 translate-y-4"></div>
                      )}
                      {template === 'Student/Fresher' && (
                        <CheckCircle className="absolute bottom-1 right-1 w-4 h-4 text-white z-10" />
                      )}
                    </div>
                    <span className={`font-display text-lg ${template === 'Student/Fresher' ? 'text-orange-brand' : 'text-gray-900'}`}>Professional Modern</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <span className="text-sm font-semibold text-gray-700">Document Size:</span>
                     <div className="flex bg-gray-100 p-1 rounded-xl">
                       <button className="px-4 py-1.5 text-xs font-bold bg-white shadow-sm rounded-lg text-violet-brand">A4</button>
                       <button className="px-4 py-1.5 text-xs font-bold text-gray-500 hover:text-gray-950">US Letter</button>
                     </div>
                   </div>
                   <DialogTrigger className="inline-flex items-center justify-center rounded-xl text-xs font-bold uppercase tracking-wider h-10 px-6 bg-violet-brand hover:opacity-95 text-white cursor-pointer">Continue</DialogTrigger>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {error && <div className="text-red-600 font-semibold text-sm flex items-center gap-2 bg-red-50 p-3.5 rounded-2xl border border-red-150"><AlertCircle className="w-4.5 h-4.5 shrink-0"/>{error}</div>}

          <div className="pt-2">
            <Button 
              className="w-full bg-orange-brand hover:opacity-95 text-white font-display uppercase tracking-wider text-lg py-6.5 rounded-2xl shadow-md transition-all cursor-pointer active:scale-[0.98] flex items-center justify-center gap-3" 
              onClick={handleGenerate} 
              disabled={loading}
            >
              {loading ? <><Loader2 className="mr-2 animate-spin w-5.5 h-5.5" /> Optimizing Resume...</> : 'Optimize Resume for Role'}
            </Button>
            <p className="text-center text-xs text-gray-400 mt-3 font-semibold uppercase tracking-wide">⚡ Gemini AI will automatically structure experience & keywords</p>
          </div>
        </CardContent>
      </Card>

      {/* Right Column - Previews & Analysis */}
      <div className="space-y-6">
        {result ? (
          <>
            {/* Slide-style Analysis block */}
            <Card className="bg-violet-brand shadow-xl border-0 text-white rounded-3xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
              <CardHeader className="pb-4 relative z-10 border-b border-white/10 bg-white/5 p-6 flex flex-row items-center gap-6">
                <ATSScoreCard score={result.atsScore} label="" size="sm" animate={true} />
                <div className="flex-1">
                  <CardTitle className="text-2xl font-display uppercase tracking-wider flex items-center gap-2.5 text-white">
                    Resume Analysis
                  </CardTitle>
                  <p className="text-xs text-violet-200 mt-1 uppercase font-bold tracking-wider">
                    Score calculated based on keywords and skills matching the role.
                  </p>
                </div>
              </CardHeader>
              <CardContent className="p-0 text-sm relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
                   {/* Missing Keywords */}
                   <div className="p-5">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-violet-200 block mb-3.5">Missing Keywords</span>
                      <ul className="space-y-2">
                        {result.analysis?.missingKeywords?.map((s: string, i: number) => (
                          <li key={i} className="flex gap-2 items-start text-white">
                            <div className="mt-0.5 min-w-4 h-4 rounded bg-orange-brand/20 text-orange-200 border border-orange-brand/20 flex items-center justify-center text-[10px] font-bold">&times;</div>
                            <span className="text-xs font-semibold leading-snug">{s}</span>
                          </li>
                        ))}
                        {(!result.analysis?.missingKeywords || result.analysis.missingKeywords.length === 0) && (
                          <li className="text-lime-brand font-bold text-xs flex items-center gap-1 uppercase tracking-wide"><CheckCircle className="w-3.5 h-3.5"/> All present</li>
                        )}
                      </ul>
                   </div>
                   {/* Skill Gaps */}
                   <div className="p-5">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-violet-200 block mb-3.5">Skill Gaps</span>
                      <ul className="space-y-2">
                        {result.analysis?.skillGaps?.map((s: string, i: number) => (
                          <li key={i} className="flex gap-2 items-start text-white">
                            <div className="mt-0.5 min-w-4 h-4 rounded bg-red-500/20 text-red-200 border border-red-500/20 flex items-center justify-center text-[10px] font-bold">&times;</div>
                            <span className="text-xs font-semibold leading-snug">{s}</span>
                          </li>
                        ))}
                        {(!result.analysis?.skillGaps || result.analysis.skillGaps.length === 0) && (
                          <li className="text-lime-brand font-bold text-xs flex items-center gap-1 uppercase tracking-wide"><CheckCircle className="w-3.5 h-3.5"/> None found</li>
                        )}
                      </ul>
                   </div>
                   {/* ATS Formatting */}
                   <div className="p-5">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-violet-200 block mb-3.5">ATS Formatting</span>
                      <ul className="space-y-2">
                        {result.analysis?.atsFormattingIssues?.map((s: string, i: number) => (
                          <li key={i} className="flex gap-2 items-start text-white">
                            <div className="mt-0.5 min-w-4 h-4 rounded bg-blue-500/20 text-blue-200 border border-blue-500/20 flex items-center justify-center text-[10px] font-bold">!</div>
                            <span className="text-xs font-semibold leading-snug">{s}</span>
                          </li>
                        ))}
                        {(!result.analysis?.atsFormattingIssues || result.analysis.atsFormattingIssues.length === 0) && (
                          <li className="text-lime-brand font-bold text-xs flex items-center gap-1 uppercase tracking-wide"><CheckCircle className="w-3.5 h-3.5"/> Perfect format</li>
                        )}
                      </ul>
                   </div>
                </div>
              </CardContent>
            </Card>

            {/* Document live preview */}
            <Card className="border-0 shadow-lg bg-white rounded-3xl overflow-hidden">
               <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4.5 px-6 gap-3 border-b border-dark-brand/10 bg-white">
                 <CardTitle className="text-lg font-display uppercase tracking-wider text-dark-brand">Live Preview</CardTitle>
                 <div className="flex gap-2">
                   <Dialog>
                     <DialogTrigger className="inline-flex h-9 items-center justify-center rounded-xl border-2 border-violet-brand/20 bg-white px-4 text-xs font-bold text-violet-brand hover:bg-violet-brand/5 cursor-pointer"><Eye className="w-4 h-4 mr-1.5"/> Full Preview</DialogTrigger>
                     <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border-0 p-8">
                       <DialogHeader>
                         <DialogTitle className="text-gray-900 font-display uppercase tracking-wider text-2xl">Live Preview</DialogTitle>
                       </DialogHeader>
                       <div className="bg-white border-2 border-dark-brand/10 rounded-2xl p-8 mt-4 markdown-body font-serif text-sm text-black">
                         <Markdown>{result.tailoredResumeMarkdown}</Markdown>
                       </div>
                     </DialogContent>
                   </Dialog>
                   <Button variant="outline" size="sm" onClick={handleDownloadDocx} className="bg-white border-2 border-dark-brand/10 text-dark-brand font-bold rounded-xl hover:bg-gray-50 h-9 px-4 text-xs cursor-pointer"><Download className="w-4 h-4 mr-1.5"/> DOCX</Button>
                   <Button size="sm" onClick={handlePrint} className="bg-dark-brand text-white font-bold rounded-xl hover:opacity-90 h-9 px-4 text-xs cursor-pointer"><FileText className="w-4 h-4 mr-1.5"/> PDF</Button>
                 </div>
               </CardHeader>
               <CardContent className="p-0 bg-[#E2E8F0] py-8 px-4 flex justify-center">
                 <div className="bg-white max-w-[800px] w-full p-10 overflow-y-auto h-[480px] shadow-xl rounded-md border border-dark-brand/5 prose prose-sm max-w-none text-black">
                   <div id="resume-markdown-content" className="markdown-body font-serif text-sm">
                     <Markdown>{result.tailoredResumeMarkdown}</Markdown>
                   </div>
                 </div>
               </CardContent>
            </Card>
          </>
        ) : (
          <div className="h-full min-h-[400px] border-2 border-dashed border-dark-brand/10 rounded-3xl flex items-center justify-center text-gray-400 p-12 text-center bg-white flex-col gap-4 shadow-sm">
             {loading ? (
                <>
                  <Loader2 className="w-9 h-9 animate-spin text-violet-brand" />
                  <p className="text-sm font-semibold uppercase tracking-wider text-dark-brand">Gemini AI is rewriting your experience... (~20s)</p>
                </>
             ) : (
                <>
                  <FileText className="w-14 h-14 text-dark-brand/10" />
                  <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Your tailored resume will appear here</p>
                </>
             )}
          </div>
        )}
      </div>
    </div>
  );
}
