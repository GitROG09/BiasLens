import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Microscope, Play, Layout, Sliders as Tune, FileText, Info, Shield, CheckCircle } from 'lucide-react';
import { analyzeDecision } from '../services/gemini';

import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Analysis() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    domain: 'hr',
    sensitivity: 'standard',
    statement: '',
    metadata: ''
  });

  const handleStartAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.statement) return;
    
    setLoading(true);
    try {
      const results = await analyzeDecision(formData.statement, formData.domain, formData.sensitivity);
      
      // Save to Firebase if user is logged in
      if (user) {
        try {
          await addDoc(collection(db, 'analyses'), {
            userId: user.uid,
            statement: formData.statement,
            metadata: formData.metadata,
            domain: formData.domain,
            sensitivity: formData.sensitivity,
            timestamp: serverTimestamp(),
            results: results
          });
        } catch (dbError) {
          console.error("Failed to save analysis to library:", dbError);
        }
      }

      navigate('/results', { state: { results } });
    } catch (err) {
      console.error(err);
      alert("Analysis failed. Please check your system connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-[1600px] mx-auto p-8 relative"
    >
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6"
          >
            <div className="relative w-64 h-64 mb-8">
              {/* Spinning outer ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-dashed border-sky-500/30 rounded-full"
              />
              {/* Scanning bar */}
              <motion.div 
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent shadow-[0_0_15px_rgba(14,165,233,0.8)] z-10"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Microscope className="w-16 h-16 text-sky-500 animate-pulse" />
              </div>
            </div>
            
            <div className="text-center space-y-4 max-w-md">
              <h2 className="text-2xl font-black text-white uppercase tracking-widest animate-pulse">Initiating Cognitive Scan</h2>
              <div className="flex flex-col gap-2">
                <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="h-full bg-sky-500"
                  />
                </div>
              </div>
              <p className="text-slate-400 text-sm italic font-inter leading-relaxed">
                "The BiasLens AI is currently cross-referencing your statement against known heuristic frameworks."
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8 flex flex-col gap-8">
          <header className="mb-4">
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Initiate Analysis Vector</h1>
            <p className="text-slate-400 max-w-2xl leading-relaxed">
              Enter the decision parameters below. The analytic engine will process the inputs through the defined bias detection frameworks to isolate cognitive skew.
            </p>
          </header>

          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-lg p-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-sky-500/40 to-transparent"></div>
            <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-sky-500/40 to-transparent"></div>
            
            <form className="flex flex-col gap-6" onSubmit={handleStartAnalysis}>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500" htmlFor="statement">
                  <FileText className="w-4 h-4 text-sky-500" />
                  Decision Statement
                </label>
                <textarea 
                  id="statement"
                  rows={6}
                  className="bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm rounded p-4 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none transition-all resize-y placeholder:text-slate-700"
                  placeholder="Paste the exact text, memo, or proposal under evaluation..."
                  value={formData.statement}
                  onChange={(e) => setFormData({...formData, statement: e.target.value})}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500" htmlFor="metadata">
                    <Info className="w-4 h-4 text-sky-500" />
                    Contextual Metadata (Optional)
                  </label>
                  <span className="text-[9px] text-slate-600 font-bold uppercase tracking-tighter">Adds environmental weighting</span>
                </div>
                <textarea 
                  id="metadata"
                  rows={2}
                  className="bg-slate-950 border border-slate-800 text-slate-100 text-sm rounded px-4 py-3 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none transition-all resize-y placeholder:text-slate-700"
                  placeholder="e.g., 'Q3 budget constraints apply', 'Competitor launched similar product last week'"
                  value={formData.metadata}
                  onChange={(e) => setFormData({...formData, metadata: e.target.value})}
                />
              </div>

              <div className="mt-4 flex justify-end">
                <button 
                  type="submit"
                  disabled={loading}
                  className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-widest px-8 py-3 rounded flex items-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing Vector...' : 'Initiate Analysis'}
                  <Play className="w-4 h-4 fill-current" />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="md:col-span-4 flex flex-col gap-8">
          <div className="bg-[#121c2f]/80 backdrop-blur-xl border border-slate-800 rounded-lg p-8 h-full flex flex-col relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <h3 className="text-xl font-bold text-white flex items-center gap-3 mb-8 border-b border-slate-800 pb-4">
              <Microscope className="text-sky-500 w-6 h-6" />
              Protocol Framework
            </h3>

            <div className="relative flex-1">
              <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-slate-800/50"></div>
              
              <div className="flex flex-col gap-10 relative z-10">
                <ProtocolStep 
                  number="01" 
                  title="Raw Input Intake" 
                  desc="System parses decision statement and standardizes syntax for analysis." 
                  icon={<FileText className="w-5 h-5" />}
                />
                <ProtocolStep 
                  number="02" 
                  title="Bias Detection" 
                  desc="Scans against 40+ cognitive heuristics including Anchoring, Confirmation, and Status Quo biases." 
                  icon={<Shield className="w-5 h-5" />}
                />
                <ProtocolStep 
                  number="03" 
                  title="Cognitive Firewall" 
                  desc="Isolates problematic logic vectors and assigns severity indices." 
                  icon={<Shield className="text-orange-400 w-5 h-5" />}
                />
                <ProtocolStep 
                  number="04" 
                  title="Optimal Rewrite" 
                  desc="Generates objective, debiased alternatives while preserving core intent." 
                  icon={<CheckCircle className="w-5 h-5" />}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProtocolStep({ number, title, desc, icon }: { number: string, title: string, desc: string, icon: React.ReactNode }) {
  return (
    <div className="flex gap-6 group">
      <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 z-10 group-hover:border-sky-500 transition-colors">
        <div className="text-slate-400 group-hover:text-sky-400 transition-colors">
          {icon}
        </div>
      </div>
      <div className="pt-1">
        <h4 className="text-xs font-bold text-white mb-1 font-mono uppercase tracking-widest">{number}. {title}</h4>
        <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
