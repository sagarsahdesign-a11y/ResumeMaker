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

    if (!isOwner && (userData?.credits || 0) <= 0) {
      setError("Not enough credits. Please purchase more from the Get Credits tab.");
      return;
    }
    
    setError(null);
    setLoading(true);
    setResult(null);

    // Optimistically deduct credit (In production, do this via Cloud Function for security)
    if (user && !isOwner) {
      updateDoc(doc(db, 'users', user.uid), { 
        credits: increment(-1),
        updatedAt: serverTimestamp() 
      }).catch(console.error);
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
        await addDoc(collection(db, 'resumes'), {
          userId: user.uid,
          jobTitle: jobDescription.substring(0, 50) + "...", // Quick extract
          atsScore: Number(data.atsScore) || 0,
          content: data.tailoredResumeMarkdown,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }

    } catch (e: any) {
      console.error(e);
      setError(e.message);
      // Give credit back on failure
      if (user && !isOwner) {
        updateDoc(doc(db, 'users', user.uid), { 
          credits: increment(1),
          updatedAt: serverTimestamp() 
        }).catch(console.error);
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
    const url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(htmlContent);
    const downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);
    downloadLink.href = url;
    downloadLink.download = 'Tailored_Resume.doc';
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <Card className="shadow-lg border-gray-200 bg-white rounded-xl">
        <CardHeader>
          <CardTitle className="text-gray-900">Configure Application</CardTitle>
          <CardDescription className="text-gray-500">Upload your base resume and target job to generate a tailored version instantly.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="resume" className="text-xs font-bold uppercase tracking-wider text-gray-500">Master Resume (PDF/DOCX)</Label>
            <Input id="resume" type="file" accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files?.[0] || null)} className="bg-gray-50 border-gray-200 rounded-lg text-sm text-gray-700 focus:ring-blue-100 focus:border-blue-500 transition-all" />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-gray-500">Target Job Description</Label>
            <Textarea 
              className="h-48 resize-none text-sm bg-gray-50 border border-gray-200 rounded-xl leading-relaxed text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all p-4" 
              placeholder="Paste job description here..."
              value={jobDescription}
              onChange={e => setJobDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-gray-500">Template Style</Label>
            <Dialog>
              <DialogTrigger className="w-full bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-semibold text-gray-900">{template}</div>
                      <div className="text-xs text-gray-500">Document Size: A4</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Change</div>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-center text-xl text-gray-900">Select a template</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-6 p-4">
                  {/* Template 1: ATS Classic / Ivy League */}
                  <div 
                    onClick={() => setTemplate('ATS Classic')}
                    className={`cursor-pointer rounded-xl border-2 transition-all p-2 flex flex-col items-center gap-3 ${template === 'ATS Classic' ? 'border-green-500 bg-green-50/10' : 'border-transparent hover:border-gray-200'}`}
                  >
                    <div className="w-full aspect-[1/1.4] bg-white border border-gray-200 shadow-sm p-4 relative overflow-hidden">
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
                        <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rotate-45 translate-x-4 translate-y-4"></div>
                      )}
                      {template === 'ATS Classic' && (
                        <CheckCircle className="absolute bottom-1 right-1 w-4 h-4 text-white z-10" />
                      )}
                    </div>
                    <span className={`font-medium ${template === 'ATS Classic' ? 'text-green-600' : 'text-gray-900'}`}>Ivy League (ATS)</span>
                  </div>

                  {/* Template 2: Double Column */}
                  <div 
                    onClick={() => setTemplate('Double Column')}
                    className={`cursor-pointer rounded-xl border-2 transition-all p-2 flex flex-col items-center gap-3 ${template === 'Double Column' ? 'border-green-500 bg-green-50/10' : 'border-transparent hover:border-gray-200'}`}
                  >
                    <div className="w-full aspect-[1/1.4] bg-white border border-gray-200 shadow-sm relative overflow-hidden flex">
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
                        <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rotate-45 translate-x-4 translate-y-4"></div>
                      )}
                      {template === 'Double Column' && (
                        <CheckCircle className="absolute bottom-1 right-1 w-4 h-4 text-white z-10" />
                      )}
                    </div>
                    <span className={`font-medium ${template === 'Double Column' ? 'text-green-600' : 'text-gray-900'}`}>Double Column</span>
                  </div>

                  {/* Template 3: Modern Dark */}
                  <div 
                    onClick={() => setTemplate('Modern Dark')}
                    className={`cursor-pointer rounded-xl border-2 transition-all p-2 flex flex-col items-center gap-3 ${template === 'Modern Dark' ? 'border-green-500 bg-green-50/10' : 'border-transparent hover:border-gray-200'}`}
                  >
                    <div className="w-full aspect-[1/1.4] bg-white border border-gray-200 shadow-sm relative overflow-hidden flex">
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
                        <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rotate-45 translate-x-4 translate-y-4 z-10"></div>
                      )}
                      {template === 'Modern Dark' && (
                        <CheckCircle className="absolute bottom-1 right-1 w-4 h-4 text-white z-20" />
                      )}
                    </div>
                    <span className={`font-medium ${template === 'Modern Dark' ? 'text-green-600' : 'text-gray-900'}`}>Modern Dark Sidebar</span>
                  </div>

                  {/* Template 4: Student/Fresher */}
                  <div 
                    onClick={() => setTemplate('Student/Fresher')}
                    className={`cursor-pointer rounded-xl border-2 transition-all p-2 flex flex-col items-center gap-3 ${template === 'Student/Fresher' ? 'border-green-500 bg-green-50/10' : 'border-transparent hover:border-gray-200'}`}
                  >
                    <div className="w-full aspect-[1/1.4] bg-white border border-gray-200 shadow-sm p-4 relative overflow-hidden flex flex-col">
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
                        <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rotate-45 translate-x-4 translate-y-4"></div>
                      )}
                      {template === 'Student/Fresher' && (
                        <CheckCircle className="absolute bottom-1 right-1 w-4 h-4 text-white z-10" />
                      )}
                    </div>
                    <span className={`font-medium ${template === 'Student/Fresher' ? 'text-green-600' : 'text-gray-900'}`}>Professional Modern</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <span className="text-sm font-medium text-gray-700">Document size:</span>
                     <div className="flex bg-gray-100 p-1 rounded-lg">
                       <button className="px-4 py-1 text-sm font-medium bg-white shadow-sm rounded text-green-600">A4</button>
                       <button className="px-4 py-1 text-sm font-medium text-gray-500 hover:text-gray-900">US Letter</button>
                     </div>
                   </div>
                   <DialogTrigger className="inline-flex items-center justify-center rounded-lg text-sm font-medium h-9 px-6 bg-green-500 hover:bg-green-600 text-white">Continue Editing</DialogTrigger>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {error && <div className="text-red-600 font-medium text-sm flex items-center gap-2 bg-red-50 p-3 rounded-lg border border-red-100"><AlertCircle className="w-4 h-4"/>{error}</div>}

          <div className="pt-2">
            <Button 
              className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-6 rounded-xl shadow-lg transition-transform active:scale-[0.98] flex items-center justify-center gap-3" 
              onClick={handleGenerate} 
              disabled={loading}
            >
              {loading ? <><Loader2 className="mr-2 animate-spin w-5 h-5" /> Optimizing Resume...</> : 'Optimize Resume for Role'}
            </Button>
            <p className="text-center text-[11px] text-gray-400 mt-3 italic">⚡ AI will analyze your experience and optimize keywords.</p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {result ? (
          <>
            <Card className="bg-white shadow-xl border border-blue-50 border-b-4 border-b-blue-600 rounded-2xl relative overflow-hidden">
              <CardHeader className="pb-4 relative z-10 border-b border-gray-100 bg-gray-50/50">
                <CardTitle className="text-xl flex items-center gap-2 text-gray-900">
                  <CheckCircle className="text-blue-600 w-6 h-6" />
                  Resume Analysis
                </CardTitle>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-gray-700">ATS Match Score</span>
                      <span className="font-bold text-blue-600">{result.atsScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${result.atsScore}%` }}></div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 text-sm relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                   <div className="p-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-3">Missing Keywords</span>
                      <ul className="space-y-2">
                        {result.analysis?.missingKeywords?.map((s: string, i: number) => <li key={i} className="flex gap-2 items-start text-gray-700"><div className="mt-0.5 min-w-4 h-4 rounded bg-amber-50 text-amber-600 flex items-center justify-center text-[10px]">&times;</div><span className="text-xs leading-tight">{s}</span></li>)}
                        {(!result.analysis?.missingKeywords || result.analysis.missingKeywords.length === 0) && <li className="text-green-600 font-medium text-xs flex items-center gap-1"><CheckCircle className="w-3 h-3"/> All keywords present</li>}
                      </ul>
                   </div>
                   <div className="p-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-3">Skill Gaps</span>
                      <ul className="space-y-2">
                        {result.analysis?.skillGaps?.map((s: string, i: number) => <li key={i} className="flex gap-2 items-start text-gray-700"><div className="mt-0.5 min-w-4 h-4 rounded bg-red-50 text-red-600 flex items-center justify-center text-[10px]">&times;</div><span className="text-xs leading-tight">{s}</span></li>)}
                        {(!result.analysis?.skillGaps || result.analysis.skillGaps.length === 0) && <li className="text-green-600 font-medium text-xs flex items-center gap-1"><CheckCircle className="w-3 h-3"/> No skill gaps found</li>}
                      </ul>
                   </div>
                   <div className="p-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-3">ATS Formatting</span>
                      <ul className="space-y-2">
                        {result.analysis?.atsFormattingIssues?.map((s: string, i: number) => <li key={i} className="flex gap-2 items-start text-gray-700"><div className="mt-0.5 min-w-4 h-4 rounded bg-blue-50 text-blue-600 flex items-center justify-center text-[10px]">!</div><span className="text-xs leading-tight">{s}</span></li>)}
                        {(!result.analysis?.atsFormattingIssues || result.analysis.atsFormattingIssues.length === 0) && <li className="text-green-600 font-medium text-xs flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Perfect formatting</li>}
                      </ul>
                   </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border border-gray-200 bg-white rounded-xl">
               <CardHeader className="flex flex-row items-center justify-between py-4 border-b border-gray-100 bg-gray-50/50 rounded-t-xl">
                 <CardTitle className="text-sm font-bold uppercase tracking-wider text-gray-700">Live Preview</CardTitle>
                 <div className="flex gap-2">
                   <Dialog>
                     <DialogTrigger className="inline-flex h-8 items-center justify-center rounded-md border border-blue-200 bg-white px-3 text-xs font-medium text-blue-600 hover:bg-blue-50"><Eye className="w-4 h-4 mr-1"/> Full Preview</DialogTrigger>
                     <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                       <DialogHeader>
                         <DialogTitle className="text-gray-900">Live Preview</DialogTitle>
                       </DialogHeader>
                       <div className="bg-white border border-gray-200 rounded p-8 mt-4 markdown-body font-serif text-sm text-black">
                         <Markdown>{result.tailoredResumeMarkdown}</Markdown>
                       </div>
                     </DialogContent>
                   </Dialog>
                   <Button variant="outline" size="sm" onClick={handleDownloadDocx} className="bg-white border-gray-200 text-gray-600 hover:bg-gray-50"><Download className="w-4 h-4 mr-1"/> DOCX</Button>
                   <Button size="sm" onClick={handlePrint} className="bg-gray-900 text-white hover:bg-black"><FileText className="w-4 h-4 mr-1"/> PDF</Button>
                 </div>
               </CardHeader>
               <CardContent className="p-0 bg-gray-100">
                 <div className="bg-white m-4 p-8 overflow-y-auto h-[450px] shadow-sm ring-1 ring-gray-900/5 sm:rounded-sm prose prose-sm max-w-none text-black">
                   <div id="resume-markdown-content" className="markdown-body font-serif text-sm">
                     <Markdown>{result.tailoredResumeMarkdown}</Markdown>
                   </div>
                 </div>
               </CardContent>
            </Card>
          </>
        ) : (
          <div className="h-full border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center text-gray-400 p-12 text-center bg-gray-50 flex-col gap-4">
             {loading ? (
               <>
                 <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                 <p className="text-sm font-medium">AI is rewriting your experience... (~20s)</p>
               </>
             ) : (
               <>
                 <FileText className="w-12 h-12 text-gray-300" />
                 <p className="text-sm">Your tailored resume will appear here.</p>
               </>
             )}
          </div>
        )}
      </div>
    </div>
  );
}
