import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';

export default function Dashboard() {
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
            BiasLens <br/>
            <span className="text-slate-400 font-medium">Bias-aware decision intelligence</span>
          </h1>
          
          <div className="flex items-center gap-4">
            <Link to="/analysis" className="bg-sky-500 text-slate-950 font-bold text-xs uppercase tracking-widest px-8 py-4 rounded hover:bg-sky-400 transition-colors flex items-center gap-2">
              <PlusCircle className="w-4 h-4" />
              Start New Analysis
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
