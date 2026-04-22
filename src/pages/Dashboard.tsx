import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { PlusCircle, FileText, ArrowRight, Filter, Network, Scale } from 'lucide-react';
import DocumentationModal from '../components/DocumentationModal';
import ArchitectureModal from '../components/ArchitectureModal';

export default function Dashboard() {
  const [isDocOpen, setIsDocOpen] = useState(false);
  const [isArchOpen, setIsArchOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-[1440px] mx-auto p-8"
    >
      {/* Hero Section */}
      <section className="relative mb-8 overflow-hidden rounded-xl bg-[#060e20] border border-slate-800 p-12 flex flex-col justify-center min-h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/10 to-transparent"></div>
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-sky-500/20 bg-sky-500/5">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
            <span className="font-mono text-[10px] text-sky-500 uppercase tracking-widest leading-none">System Online • Monitoring</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
            Cognitive Bias Detection <br/>
            <span className="text-slate-400">& Decision Reasoning Intelligence</span>
          </h1>
          
          <p className="text-lg text-slate-400 mb-8 max-w-2xl leading-relaxed">
            Deploy advanced analytic models to parse subjective data, identify logical fallacies, and ensure objective decision intelligence across your organization's unstructured text streams.
          </p>
          
          <div className="flex items-center gap-4">
            <Link to="/analysis" className="bg-sky-500 text-slate-950 font-bold text-xs uppercase tracking-widest px-8 py-4 rounded hover:bg-sky-400 transition-colors flex items-center gap-2">
              <PlusCircle className="w-4 h-4" />
              Start New Analysis
            </Link>
            <button 
              onClick={() => setIsDocOpen(true)}
              className="bg-transparent border border-slate-800 text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded hover:bg-slate-800 transition-colors"
            >
              View Documentation
            </button>
          </div>
        </div>
      </section>

      <DocumentationModal isOpen={isDocOpen} onClose={() => setIsDocOpen(false)} />
      <ArchitectureModal isOpen={isArchOpen} onClose={() => setIsArchOpen(false)} />

      {/* 3-Agent Cognitive Firewall */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">3-Agent Cognitive Firewall</h2>
          <button 
            onClick={() => setIsArchOpen(true)}
            className="font-mono text-xs text-sky-500 hover:text-sky-400 flex items-center gap-1 transition-colors uppercase tracking-widest font-bold"
          >
            View Architecture <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Agent 1 */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900 z-0"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded bg-slate-950 border border-slate-800 flex items-center justify-center mb-6 text-purple-400">
                <Filter className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Lexical Sentiment Parser</h3>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                Scans input text for emotionally charged vocabulary and subjective qualifiers that skew objective framing.
              </p>
              <div className="bg-slate-950 border border-slate-800 rounded p-4 font-mono text-[10px] text-slate-500">
                <div className="flex justify-between mb-2">
                  <span className="uppercase tracking-widest font-bold">Confidence Threshold</span>
                  <span className="text-purple-400 font-bold">94.2%</span>
                </div>
                <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                  <div className="bg-purple-400 h-full" style={{ width: '94%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Agent 2 */}
          <div className="bg-slate-900/50 border border-sky-500/30 rounded-lg p-6 relative overflow-hidden shadow-[0_0_20px_rgba(14,165,233,0.05)]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-sky-500/5 z-0"></div>
            <div className="absolute top-4 right-4 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></span>
              <span className="font-mono text-[10px] text-sky-500 uppercase tracking-widest font-bold">Active</span>
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded bg-slate-950 border border-sky-500/30 flex items-center justify-center mb-6 text-sky-500">
                <Network className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Logical Fallacy Engine</h3>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                Evaluates structural arguments against known fallacy models (e.g., Ad Hominem, Strawman) using knowledge graphs.
              </p>
              <div className="bg-slate-950 border border-slate-800 rounded p-4 font-mono text-[10px] text-slate-500">
                <div className="flex justify-between mb-2">
                  <span className="uppercase tracking-widest font-bold">Models Loaded</span>
                  <span className="text-sky-500 font-bold">128</span>
                </div>
                <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                  <div className="bg-sky-500 h-full" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Agent 3 */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 relative overflow-hidden flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900 z-0"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded bg-slate-950 border border-slate-800 flex items-center justify-center mb-6 text-orange-400">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Statistical Skew Detector</h3>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                Cross-references quantitative claims against baseline datasets to identify cherry-picking or misrepresented statistics.
              </p>
              <div className="bg-slate-950 border border-slate-800 rounded p-4 font-mono text-[10px] text-slate-500 mt-auto">
                <div className="flex justify-between mb-2">
                  <span className="uppercase tracking-widest font-bold">Baseline Sync</span>
                  <span className="text-orange-400 font-bold">Recent</span>
                </div>
                <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                  <div className="bg-orange-400 h-full" style={{ width: '88%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
