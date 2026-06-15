/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AuthProvider, useAuth } from './lib/AuthContext';
import MainDashboard from './components/MainDashboard';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

function AppContent() {
  const { user, userData, loading, login, logout } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="animate-spin w-8 h-8 text-black" /></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans overflow-hidden">
      <nav className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">R</div>
          <span className="text-xl font-bold tracking-tight text-gray-900">ResumeForge <span className="text-blue-600">AI</span></span>
        </div>
        {user ? (
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2">
              <div className="h-2 w-32 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${user?.email === 'mfl9815268699@gmail.com' ? 100 : Math.min(((userData?.credits || 0) / 20) * 100, 100)}%` }}></div>
              </div>
              <span className="text-xs font-medium text-gray-500">{user?.email === 'mfl9815268699@gmail.com' ? 'Unlimited' : `${userData?.credits || 0}/20`} Generations</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center font-bold text-gray-600">
                {user.email?.[0].toUpperCase()}
              </div>
              <Button variant="ghost" size="sm" onClick={logout} className="text-gray-500 hover:text-gray-900">Sign Out</Button>
            </div>
          </div>
        ) : (
          <Button onClick={login} className="bg-gray-900 hover:bg-black text-white rounded-lg">Sign In</Button>
        )}
      </nav>
      
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {user ? <MainDashboard /> : (
          <div className="text-center mt-32 space-y-6">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">Upload once. Apply everywhere.</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Turn one master resume into multiple job-specific ATS-friendly resumes in under 30 seconds.</p>
            <Button size="lg" onClick={login} className="mt-8 px-8 py-6 text-lg bg-gray-900 hover:bg-black text-white rounded-xl shadow-lg">Get Started</Button>
          </div>
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

