import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle2, AlertCircle, AlertTriangle, FileText, UploadCloud, ChevronRight } from 'lucide-react';
import ATSScoreCard from './ATSScoreCard';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function ResumeChecker() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [activeCheck, setActiveCheck] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleCheck = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);
    setActiveCheck(null);

    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('jobDescription', jobDescription);

      const response = await fetch('/api/check-resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errInfo = await response.json().catch(() => ({}));
        throw new Error(errInfo.error || "Failed to check resume");
      }

      const data = await response.json();
      setResult(data);
    } catch (e: any) {
      alert("Error checking resume: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  if (result) {


    return (
      <div className="flex flex-col md:flex-row bg-white border-2 border-dark-brand/10 rounded-3xl overflow-hidden min-h-[600px] shadow-lg animate-in fade-in zoom-in-95 duration-300">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 bg-[#F8FAFC] border-b-2 md:border-b-0 md:border-r-2 border-dark-brand/10 flex flex-col h-[300px] md:h-[600px]">
          <div className="p-5 border-b-2 border-dark-brand/5 bg-white sticky top-0 z-10 flex justify-between items-center">
            <h3 className="font-display uppercase tracking-wider text-xl text-dark-brand">Score & Issues</h3>
            <Button variant="outline" size="sm" onClick={() => setResult(null)} className="font-display uppercase tracking-wider text-xs border-dark-brand/20 text-dark-brand hover:bg-gray-50 rounded-lg">New Scan</Button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <Accordion type="multiple" defaultValue={result.categories?.map((_: any, i: number) => `cat-${i}`)} className="space-y-3">
              {result.categories?.map((cat: any, i: number) => (
                <AccordionItem key={i} value={`cat-${i}`} className="border-b border-dark-brand/10 pb-2">
                  <AccordionTrigger className="hover:no-underline py-3 font-display uppercase tracking-wider text-xs text-violet-brand/80 font-bold">
                    {cat.title}
                  </AccordionTrigger>
                  <AccordionContent className="space-y-1.5 pt-1.5 pb-2">
                    {cat.checks?.map((check: any, j: number) => (
                      <button 
                        key={j}
                        onClick={() => setActiveCheck(check)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm flex items-center justify-between group transition-all cursor-pointer ${activeCheck?.name === check.name ? 'bg-violet-brand text-white font-semibold shadow-md' : 'hover:bg-dark-brand/5 text-gray-700'}`}
                      >
                        <div className="flex items-center gap-2.5">
                          {check.status === 'success' && <CheckCircle2 className={`w-4.5 h-4.5 ${activeCheck?.name === check.name ? 'text-lime-brand' : 'text-green-500'}`} />}
                          {check.status === 'warning' && <AlertTriangle className={`w-4.5 h-4.5 ${activeCheck?.name === check.name ? 'text-lime-brand' : 'text-yellow-500'}`} />}
                          {check.status === 'issue' && <AlertCircle className={`w-4.5 h-4.5 ${activeCheck?.name === check.name ? 'text-lime-brand' : 'text-red-500'}`} />}
                          <span className="truncate max-w-[170px]">{check.name}</span>
                        </div>
                        <ChevronRight className={`w-4.5 h-4.5 opacity-0 group-hover:opacity-100 transition-opacity ${activeCheck?.name === check.name ? 'opacity-100 text-white' : 'text-gray-400'}`} />
                      </button>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="w-full md:w-2/3 bg-white p-6 md:p-8 overflow-y-auto h-[400px] md:h-[600px]">
          {!activeCheck ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-8 animate-in fade-in zoom-in duration-300">
              <div className="space-y-2">
                <h2 className="text-4xl font-display uppercase tracking-wider text-dark-brand">Resume Score</h2>
                <p className="text-gray-500 max-w-md mx-auto font-medium">{result.summary || "Here is how your resume stacks up against ATS systems and recruiter expectations."}</p>
              </div>

              <div className="py-6 flex items-center justify-center">
                <ATSScoreCard score={result.totalScore} label="Overall Match Score" size="lg" />
              </div>

              <p className="text-sm text-violet-brand font-semibold bg-violet-brand/5 border border-violet-brand/10 px-5 py-2.5 rounded-full">
                Select an issue on the left to see details.
              </p>
            </div>
          ) : (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-200">
               <div className="flex items-start gap-4 pb-6 border-b-2 border-dark-brand/5">
                  <div className="mt-1">
                    {activeCheck.status === 'success' && <div className="p-2.5 bg-green-50 text-green-600 rounded-xl border border-green-200"><CheckCircle2 className="w-6 h-6" /></div>}
                    {activeCheck.status === 'warning' && <div className="p-2.5 bg-yellow-50 text-yellow-600 rounded-xl border border-yellow-200"><AlertTriangle className="w-6 h-6" /></div>}
                    {activeCheck.status === 'issue' && <div className="p-2.5 bg-red-50 text-red-600 rounded-xl border border-red-200"><AlertCircle className="w-6 h-6" /></div>}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{activeCheck.name}</h2>
                    <div className="flex gap-2 mt-2">
                       <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
                         activeCheck.status === 'success' ? 'bg-green-100 text-green-800' :
                         activeCheck.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                         'bg-red-100 text-red-800'
                       }`}>
                         {activeCheck.status}
                       </span>
                    </div>
                  </div>
               </div>
               
               <div className="bg-[#F8FAFC] p-6 rounded-2xl border-2 border-dark-brand/5">
                 <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Feedback & Insights</h3>
                 <div className="prose prose-sm text-gray-700 max-w-none whitespace-pre-line leading-relaxed font-sans">
                   {activeCheck.message}
                 </div>
               </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <Card className="border-0 shadow-lg bg-white rounded-3xl overflow-hidden p-4">
      <CardHeader className="border-b-2 border-dark-brand/5 pb-6">
        <CardTitle className="text-3xl font-display uppercase tracking-wider text-dark-brand">Resume Checker</CardTitle>
        <CardDescription className="text-base text-gray-500 font-medium">Get an instant review of your resume against ATS and Recruiter standards.</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6 max-w-3xl">
        <div className="space-y-2.5">
          <label className="text-xs font-bold uppercase tracking-widest text-violet-brand/80">Upload Current Resume</label>
          <div className="relative">
             <input 
               type="file" 
               accept=".pdf,.doc,.docx" 
               onChange={handleFileChange}
               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
             />
             <div className={`w-full py-10 px-4 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all ${file ? 'border-violet-brand bg-violet-brand/5' : 'border-dark-brand/20 hover:border-violet-brand bg-white'}`}>
                {file ? (
                  <>
                    <FileText className="w-12 h-12 text-violet-brand mb-2" />
                    <span className="text-sm font-semibold text-violet-brand">{file.name}</span>
                    <span className="text-xs text-violet-brand/80 mt-1 uppercase font-bold tracking-wider">Click to change file</span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-12 h-12 text-gray-400 mb-2" />
                    <span className="text-sm font-semibold text-dark-brand">Click to browse or drag and drop</span>
                    <span className="text-xs text-gray-500 mt-1 uppercase font-bold tracking-wider">PDF, DOCX accepted</span>
                  </>
                )}
             </div>
          </div>
        </div>

        <div className="space-y-2.5">
          <label className="text-xs font-bold uppercase tracking-widest text-violet-brand/80">Target Job Description (Optional)</label>
          <Textarea 
             placeholder="Paste the job requirements to get a tailored ATS match score..."
             className="h-36 resize-none bg-white font-sans text-sm border-2 border-dark-brand/10 focus:border-dark-brand/40 focus:ring-0 rounded-2xl p-4 leading-relaxed text-gray-700"
             value={jobDescription}
             onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>

        <Button 
          onClick={handleCheck} 
          disabled={loading || !file} 
          className="w-full bg-orange-brand hover:opacity-95 text-white font-display uppercase tracking-wider text-lg py-6.5 rounded-2xl shadow-md cursor-pointer transition-transform active:scale-[0.98]"
        >
          {loading ? (
            <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Scanning Resume...</>
          ) : (
            'Scan & Score Resume'
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
