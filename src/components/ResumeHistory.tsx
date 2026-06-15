import React, { useEffect, useState } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../lib/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, FileText, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Markdown from 'react-markdown';

export default function ResumeHistory() {
  const { user } = useAuth();
  const [resumes, setResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchHistory = async () => {
      try {
        const q = query(
          collection(db, 'resumes'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setResumes(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [user]);

  if (loading) return <div className="py-20 flex justify-center"><Loader2 className="animate-spin w-6 h-6 text-blue-600" /></div>;

  if (resumes.length === 0) {
    return (
      <Card className="shadow-sm border border-gray-200 bg-white">
        <CardContent className="py-16 text-center text-gray-500">
          No generated resumes yet. Go create your first one!
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 max-w-4xl">
      {resumes.map(r => (
        <Dialog key={r.id}>
          <DialogTrigger className="w-full text-left font-sans outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl border bg-card text-card-foreground shadow cursor-pointer border-gray-200 hover:border-blue-300 hover:shadow-md transition-all bg-white">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                    <FileText className="w-5 h-5"/>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 truncate max-w-sm" title={r.jobTitle}>{r.jobTitle}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(r.createdAt).toLocaleDateString()} • {new Date(r.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="block text-xl font-bold text-blue-600">{r.atsScore}%</span>
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">ATS Score</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300" />
                </div>
              </CardContent>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-gray-900">Tailored Resume</DialogTitle>
              <CardDescription className="text-gray-500">Target Role: {r.jobTitle}</CardDescription>
            </DialogHeader>
            <div className="bg-white border border-gray-200 rounded p-6 mt-4 markdown-body font-serif text-sm text-black">
              <Markdown>{r.content}</Markdown>
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
