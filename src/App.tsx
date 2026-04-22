/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Microscope, FileText, Database, Settings, HelpCircle, Code, PlusCircle, Bell, User as UserIcon, LogOut, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Dashboard from './pages/Dashboard';
import Analysis from './pages/Analysis';
import Results from './pages/Results';
import Library from './pages/Library';
import { useAuth } from './context/AuthContext';

function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="hidden md:flex fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-64 flex-col z-40 bg-slate-950/90 backdrop-blur-md border-r border-slate-800/60 font-inter transition-all duration-200">
      <div className="flex flex-col flex-1">
        <div className="p-6 border-b border-slate-800/60">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded bg-slate-900 border border-slate-800 flex items-center justify-center">
              <Microscope className="text-sky-500 w-6 h-6" />
            </div>
            <div>
              <div className="text-lg font-bold">
                <span className="text-sky-400">Bias</span>
                <span className="text-white">Lens</span>
                <span className="text-slate-500 ml-1">AI</span>
              </div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest leading-none">Analytic Engine v2.4</div>
            </div>
          </div>
        </div>
        
        <div className="py-4 flex flex-col gap-1">
          <Link to="/analysis" className={`flex items-center px-6 py-3 transition-colors ${isActive('/analysis') ? 'text-sky-400 bg-sky-500/10 border-r-2 border-sky-500' : 'text-slate-500 hover:bg-slate-900/50 hover:text-slate-200'}`}>
            <PlusCircle className="mr-3 w-5 h-5" />
            <span className="text-xs font-semibold uppercase tracking-widest">New Analysis</span>
          </Link>
          <Link to="/library" className={`flex items-center px-6 py-3 transition-colors ${isActive('/library') ? 'text-sky-400 bg-sky-500/10 border-r-2 border-sky-500' : 'text-slate-500 hover:bg-slate-900/50 hover:text-slate-200'}`}>
            <Database className="mr-3 w-5 h-5" />
            <span className="text-xs font-semibold uppercase tracking-widest">Library</span>
          </Link>
          <Link to="/" className={`flex items-center px-6 py-3 transition-colors ${isActive('/') ? 'text-sky-400 bg-sky-500/10 border-r-2 border-sky-500' : 'text-slate-500 hover:bg-slate-900/50 hover:text-slate-200'}`}>
            <LayoutDashboard className="mr-3 w-5 h-5" />
            <span className="text-xs font-semibold uppercase tracking-widest">Dashboard</span>
          </Link>
        </div>
      </div>
      
      <div className="py-4 border-t border-slate-800/60 flex flex-col gap-1">
        <a href="#" className="flex items-center px-6 py-3 text-slate-500 hover:bg-slate-900/50 hover:text-slate-200 transition-colors font-inter text-xs font-semibold uppercase tracking-widest">
          <HelpCircle className="mr-3 w-5 h-5" />
          Support
        </a>
        <a href="#" className="flex items-center px-6 py-3 text-slate-500 hover:bg-slate-900/50 hover:text-slate-200 transition-colors font-inter text-xs font-semibold uppercase tracking-widest">
          <Code className="mr-3 w-5 h-5" />
          API
        </a>
      </div>
    </aside>
  );
}

function Navbar() {
  const location = useLocation();
  const { user, login, logout } = useAuth();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-14 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-xl font-black tracking-tighter uppercase">
          <span className="text-sky-400">Bias</span>
          <span className="text-white">Lens</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 font-inter text-sm font-medium tracking-tight h-full pt-1">
          <Link to="/" className={`pb-1 border-b-2 transition-all duration-200 ${isActive('/') ? 'text-sky-500 border-sky-500' : 'text-slate-400 border-transparent hover:text-slate-200'}`}>Dashboard</Link>
          <Link to="/analysis" className={`pb-1 border-b-2 transition-all duration-200 ${isActive('/analysis') ? 'text-sky-500 border-sky-500' : 'text-slate-400 border-transparent hover:text-slate-200'}`}>Analysis</Link>
          {user && (
            <Link to="/library" className={`pb-1 border-b-2 transition-all duration-200 ${isActive('/library') ? 'text-sky-500 border-sky-500' : 'text-slate-400 border-transparent hover:text-slate-200'}`}>Library</Link>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <button 
              onClick={() => logout()}
              className="text-slate-400 hover:text-red-400 p-2 rounded-full transition-colors flex items-center gap-2 text-xs font-bold uppercase"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-full pl-1 pr-3 py-1">
              <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || 'User'} referrerPolicy="no-referrer" />
                ) : (
                  <UserIcon className="text-slate-400 w-4 h-4" />
                )}
              </div>
              <span className="text-xs font-medium text-slate-300 hidden sm:inline">{user.displayName?.split(' ')[0]}</span>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => login()}
            className="bg-sky-500 hover:bg-sky-400 text-slate-950 px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-all shadow-lg shadow-sky-500/20 flex items-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            Connect
          </button>
        )}
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-sky-500/30">
        <Navbar />
        <Sidebar />
        <main className="md:ml-64 pt-14 min-h-screen transition-all duration-300">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/results" element={<Results />} />
              <Route path="/library" element={<Library />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
}
