import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle2, AlertCircle, AlertTriangle, FileText, UploadCloud, ChevronRight } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

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
        throw new Error("Failed to check resume");
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
    // Generate data for pie chart
    const scoreData = [
      { name: 'Score', value: result.totalScore },
      { name: 'Remaining', value: 100 - result.totalScore }
    ];
    const COLORS = [result.totalScore >= 80 ? '#22c55e' : result.totalScore >= 50 ? '#eab308' : '#ef4444', '#f3f4f6'];

    return (
      <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden min-h-[600px] shadow-sm">
        {/* Sidebar */}
        <div className="w-1/3 bg-gray-50 border-r border-gray-200 flex flex-col h-[600px]">
          <div className="p-4 border-b border-gray-200 bg-white sticky top-0 z-10 flex justify-between items-center">
            <h3 className="font-bold text-gray-900">Score & Issues</h3>
            <Button variant="outline" size="sm" onClick={() => setResult(null)}>New Scan</Button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {result.categories?.map((cat: any, i: number) => (
              <div key={i}>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">{cat.title}</h4>
                <div className="space-y-1">
                  {cat.checks?.map((check: any, j: number) => (
                    <button 
                      key={j}
                      onClick={() => setActiveCheck(check)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between group transition-colors ${activeCheck?.name === check.name ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-gray-100 text-gray-700'}`}
                    >
                      <div className="flex items-center gap-2">
                        {check.status === 'success' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                        {check.status === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                        {check.status === 'issue' && <AlertCircle className="w-4 h-4 text-red-500" />}
                        <span className="truncate max-w-[180px]">{check.name}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${activeCheck?.name === check.name ? 'opacity-100 text-blue-500' : 'text-gray-400'}`} />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Main Content */}
        <div className="w-2/3 bg-white p-8 overflow-y-auto h-[600px]">
          {!activeCheck ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-8 animate-in fade-in zoom-in duration-300">
              <div className="space-y-2">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Resume Score</h2>
                <p className="text-gray-500 max-w-md mx-auto">{result.summary || "Here is how your resume stacks up against ATS systems and recruiter expectations."}</p>
              </div>

              <div className="relative w-64 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={scoreData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      stroke="none"
                      startAngle={90}
                      endAngle={-270}
                    >
                      {scoreData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                   <span className="text-5xl font-black text-gray-900 tracking-tighter" style={{ color: COLORS[0] }}>{result.totalScore}</span>
                   <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">/ 100</span>
                </div>
              </div>

              <p className="text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                Select an issue on the left to see details.
              </p>
            </div>
          ) : (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-200">
               <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
                  <div className="mt-1">
                    {activeCheck.status === 'success' && <div className="p-2 bg-green-100 rounded-full"><CheckCircle2 className="w-6 h-6 text-green-600" /></div>}
                    {activeCheck.status === 'warning' && <div className="p-2 bg-yellow-100 rounded-full"><AlertTriangle className="w-6 h-6 text-yellow-600" /></div>}
                    {activeCheck.status === 'issue' && <div className="p-2 bg-red-100 rounded-full"><AlertCircle className="w-6 h-6 text-red-600" /></div>}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{activeCheck.name}</h2>
                    <div className="flex gap-2 mt-2">
                       <span className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${
                         activeCheck.status === 'success' ? 'bg-green-100 text-green-800' :
                         activeCheck.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                         'bg-red-100 text-red-800'
                       }`}>
                         {activeCheck.status}
                       </span>
                    </div>
                  </div>
               </div>
               
               <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                 <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Feedback & Insights</h3>
                 <div className="prose prose-sm text-gray-700 max-w-none whitespace-pre-line leading-relaxed">
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
    <Card className="border-gray-200 shadow-sm bg-white">
      <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-6">
        <CardTitle className="text-2xl font-bold tracking-tight text-gray-900">Resume Checker</CardTitle>
        <CardDescription className="text-base text-gray-600 mt-1">Get an instant review of your resume against ATS and Recruiter standards.</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6 max-w-3xl">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-900">Upload Current Resume</label>
          <div className="relative">
             <input 
               type="file" 
               accept=".pdf,.doc,.docx" 
               onChange={handleFileChange}
               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
             />
             <div className={`w-full py-10 px-4 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-colors ${file ? 'border-blue-400 bg-blue-50/50' : 'border-gray-300 hover:border-gray-400 bg-white'}`}>
                {file ? (
                  <>
                    <FileText className="w-10 h-10 text-blue-500 mb-2" />
                    <span className="text-sm font-medium text-blue-900">{file.name}</span>
                    <span className="text-xs text-blue-500 mt-1">Click to change file</span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
                    <span className="text-sm font-medium text-gray-900">Click to browse or drag and drop</span>
                    <span className="text-xs text-gray-500 mt-1">PDF, DOCX accepted</span>
                  </>
                )}
             </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-900">Target Job Description (Optional)</label>
          <Textarea 
             placeholder="Paste the job requirements to get a tailored ATS match score..."
             className="h-32 resize-none bg-white font-sans text-sm border-gray-300 focus:border-gray-900 focus:ring-gray-900 rounded-lg"
             value={jobDescription}
             onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>

        <Button 
          onClick={handleCheck} 
          disabled={loading || !file} 
          className="w-full bg-gray-900 hover:bg-black text-white h-12 text-base font-semibold rounded-lg shadow-sm"
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
