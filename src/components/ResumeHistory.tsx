import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../lib/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Markdown from 'react-markdown';
import { Loader2, FileText, ChevronRight, Download, Printer, Copy, Check, FolderOpen, ArrowRight } from 'lucide-react';

export default function ResumeHistory() {
  const { user } = useAuth();
  const [resumes, setResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const fetchHistory = async () => {
      try {
        if (user.uid === 'dev-user') {
          const localResumes = JSON.parse(localStorage.getItem('dev_resumes') || '[]');
          setResumes(localResumes);
        } else {
          const q = query(
            collection(db, 'resumes'),
            where('userId', '==', user.uid)
          );
          const snapshot = await getDocs(q);
          const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          
          // Sort in-memory to avoid Firestore composite index requirements
          data.sort((a: any, b: any) => {
            const timeA = a.createdAt?.seconds ? a.createdAt.seconds * 1000 : new Date(a.createdAt).getTime();
            const timeB = b.createdAt?.seconds ? b.createdAt.seconds * 1000 : new Date(b.createdAt).getTime();
            return (timeB || 0) - (timeA || 0);
          });

          setResumes(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [user]);

  const handlePrint = (id: string) => {
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
            ${document.getElementById(`resume-history-content-${id}`)?.innerHTML || ''}
          </div>
          <script>
            window.onload = () => { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleDownloadDocx = (id: string, jobTitle: string) => {
    const htmlContent = document.getElementById(`resume-history-content-${id}`)?.innerHTML || '';
    const blob = new Blob(['\ufeff', htmlContent], {
      type: 'application/msword'
    });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);
    downloadLink.href = url;
    downloadLink.download = `${jobTitle.replace(/[^a-z0-9]/gi, '_')}_Resume.doc`;
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
  };

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin w-10 h-10 text-violet-brand" />
        <span className="text-sm font-semibold uppercase tracking-wider text-gray-500">Loading history...</span>
      </div>
    );
  }

  if (resumes.length === 0) {
    return (
      <div className="bg-white border-2 border-dark-brand/10 p-12 text-center rounded-3xl flex flex-col items-center gap-4 max-w-2xl mx-auto shadow-sm animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-violet-brand/10 text-violet-brand rounded-2xl flex items-center justify-center">
          <FolderOpen className="w-8 h-8" />
        </div>
        <div>
          <h3 className="font-display uppercase tracking-wider text-2xl text-dark-brand mb-1">No Resumes Yet</h3>
          <p className="text-sm font-medium text-gray-500 max-w-sm">You haven't generated any resumes yet. Navigate to the "Generate Resume" tab to optimize your first resume!</p>
        </div>
      </div>
    );
  }

  // Brand-aligned slide colors mapping to cycle through
  const themes = [
    {
      cardBg: 'bg-violet-brand',
      textMain: 'text-white',
      textSecondary: 'text-violet-100',
      badgeBg: 'bg-lime-brand text-dark-brand',
      badgeLabelColor: 'text-violet-200',
      btnBg: 'bg-white/10 text-white hover:bg-white/20 hover:scale-105 border border-white/20',
      tagBg: 'bg-white/20 text-white',
      borderLine: 'border-white/10'
    },
    {
      cardBg: 'bg-orange-brand',
      textMain: 'text-white',
      textSecondary: 'text-orange-50',
      badgeBg: 'bg-dark-brand text-white',
      badgeLabelColor: 'text-orange-200',
      btnBg: 'bg-white/10 text-white hover:bg-white/20 hover:scale-105 border border-white/20',
      tagBg: 'bg-white/20 text-white',
      borderLine: 'border-white/10'
    },
    {
      cardBg: 'bg-lime-brand',
      textMain: 'text-dark-brand',
      textSecondary: 'text-slate-800',
      badgeBg: 'bg-violet-brand text-white',
      badgeLabelColor: 'text-violet-900/80',
      btnBg: 'bg-dark-brand/10 text-dark-brand hover:bg-dark-brand/20 hover:scale-105 border border-dark-brand/10',
      tagBg: 'bg-dark-brand/10 text-dark-brand',
      borderLine: 'border-dark-brand/10'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* History Hero Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-2 border-dark-brand/5 pb-4">
        <div>
          <h2 className="text-4xl font-display uppercase tracking-wider text-dark-brand">Optimized Portfolios</h2>
          <p className="text-gray-500 font-medium">Browse and manage your previously tailored high-scoring resumes.</p>
        </div>
        <div className="bg-dark-brand text-white px-4 py-2 rounded-2xl flex items-center gap-2">
          <span className="text-2xl font-display text-lime-brand leading-none">{resumes.length}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-300">Total Runs</span>
        </div>
      </div>

      {/* Grid List of Resumes */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resumes.map((r, index) => {
          const theme = themes[index % themes.length];
          const displayDate = (() => {
            if (!r.createdAt) return '';
            const date = r.createdAt.toDate ? r.createdAt.toDate() : new Date(r.createdAt);
            return `${date.toLocaleDateString(undefined, { day: 'numeric', month: 'short' })} • ${date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}`;
          })();

          return (
            <Dialog key={r.id}>
              <DialogTrigger className="w-full text-left outline-none cursor-pointer group select-none">
                <div className={`${theme.cardBg} ${theme.textMain} p-6 sm:p-7 rounded-[2rem] shadow-md hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 aspect-[1.2] flex flex-col justify-between relative overflow-hidden h-full min-h-[250px]`}>
                  {/* Backdrop blur circle */}
                  <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/5 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500"></div>

                  <div className="space-y-4 relative z-10">
                    {/* Header line with date */}
                    <div className="flex justify-between items-center">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${theme.tagBg}`}>
                        {displayDate}
                      </span>
                    </div>

                    {/* Job Title */}
                    <h3 
                      className="text-3xl font-display uppercase tracking-wide leading-tight line-clamp-2" 
                      title={r.jobTitle}
                    >
                      {r.jobTitle}
                    </h3>
                  </div>

                  {/* Footer section with Score and Trigger Button */}
                  <div className={`flex items-center justify-between mt-4 border-t ${theme.borderLine} pt-4 relative z-10`}>
                    <div className="flex items-center gap-2">
                      <span className={`text-3xl font-display leading-none px-2 py-0.5 rounded-lg ${theme.badgeBg}`}>
                        {r.atsScore}%
                      </span>
                      <span className={`text-[9px] uppercase font-bold tracking-widest ${theme.badgeLabelColor}`}>
                        ATS Match
                      </span>
                    </div>
                    
                    {/* Circular Action Button */}
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${theme.btnBg}`}>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </DialogTrigger>

              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border-0 p-0 shadow-2xl">
                {/* Modal Header inside solid Brand Colors matching card */}
                <div className={`${theme.cardBg} ${theme.textMain} p-6 sm:p-8 relative`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                  <div className="relative z-10 flex flex-col gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-3.5 py-1 rounded-full self-start ${theme.tagBg}`}>
                      Saved Optimization
                    </span>
                    <DialogTitle className="text-3xl font-display uppercase tracking-wider leading-none mt-2">
                      {r.jobTitle}
                    </DialogTitle>
                    <p className={`text-xs ${theme.textSecondary} font-medium mt-1`}>
                      Optimized on {displayDate} &bull; Target score: <span className="font-bold underline">{r.atsScore}% ATS Match</span>
                    </p>
                  </div>
                </div>

                {/* Main Modal Area */}
                <div className="p-6 sm:p-8 bg-slate-50 flex flex-col gap-6">
                  {/* Actions Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4.5 rounded-2xl border-2 border-dark-brand/5 shadow-sm">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Document Actions</span>
                    <div className="flex flex-wrap gap-2">
                      {/* Copy to clipboard */}
                      <button
                        onClick={() => handleCopy(r.id, r.content)}
                        className={`inline-flex h-9.5 items-center justify-center rounded-xl border-2 px-4 text-xs font-bold uppercase tracking-wide transition-all cursor-pointer ${
                          copiedId === r.id 
                            ? 'bg-green-500 border-green-500 text-white' 
                            : 'border-violet-brand/20 bg-white text-violet-brand hover:bg-violet-brand/5'
                        }`}
                      >
                        {copiedId === r.id ? (
                          <><Check className="w-4 h-4 mr-1.5" /> Copied!</>
                        ) : (
                          <><Copy className="w-4 h-4 mr-1.5" /> Copy Raw Markdown</>
                        )}
                      </button>
                      
                      {/* Download docx */}
                      <button 
                        onClick={() => handleDownloadDocx(r.id, r.jobTitle)}
                        className="inline-flex h-9.5 items-center justify-center rounded-xl border-2 border-dark-brand/10 bg-white px-4 text-xs font-bold text-dark-brand hover:bg-gray-50 transition-all cursor-pointer uppercase tracking-wide"
                      >
                        <Download className="w-4 h-4 mr-1.5" /> DOCX
                      </button>

                      {/* Print / Save PDF */}
                      <button 
                        onClick={() => handlePrint(r.id)}
                        className="inline-flex h-9.5 items-center justify-center rounded-xl bg-dark-brand px-4 text-xs font-bold text-white hover:opacity-90 transition-all cursor-pointer uppercase tracking-wide"
                      >
                        <Printer className="w-4 h-4 mr-1.5" /> Print PDF
                      </button>
                    </div>
                  </div>

                  {/* Document Container */}
                  <div className="bg-[#E2E8F0] p-6 sm:p-8 rounded-2xl flex justify-center shadow-inner">
                    <div className="bg-white max-w-[800px] w-full p-8 sm:p-12 overflow-y-auto max-h-[600px] shadow-lg rounded-md border border-dark-brand/5 text-black">
                      <div id={`resume-history-content-${r.id}`} className="markdown-body font-serif text-sm">
                        <Markdown>{r.content}</Markdown>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          );
        })}
      </div>
    </div>
  );
}

