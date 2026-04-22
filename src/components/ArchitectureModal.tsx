import { motion, AnimatePresence } from 'motion/react';
import { X, Cpu, Database, Shield, Zap, FileText, ArrowRight, Share2, Activity } from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ArchitectureModal({ isOpen, onClose }: ArchitectureModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-6xl h-full max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-sky-500/10 flex items-center justify-center border border-sky-500/20">
                  <Share2 className="text-sky-500 w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white uppercase tracking-tight">System Infrastructure</h2>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mt-1">BiasLens Analytic Pipeline v2.4</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="text-slate-500 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Diagram Content */}
            <div className="flex-1 overflow-auto p-12 bg-[#020617] relative">
              {/* Background Grid */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0ea5e9 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
              
              <div className="relative z-10 flex flex-col items-center justify-center gap-16 min-h-full py-20">
                
                {/* Level 1: Input */}
                <DiagramNode 
                  icon={<FileText className="w-6 h-6" />}
                  title="Raw Intelligence Feed"
                  subtitle="Unstructured Text Streams"
                  color="sky"
                />

                {/* Connection 1 */}
                <DiagramConnection />

                {/* Level 2: Processing Core */}
                <div className="relative">
                  <motion.div 
                    animate={{ boxShadow: ['0 0 20px rgba(14,165,233,0.1)', '0 0 50px rgba(14,165,233,0.3)', '0 0 20px rgba(14,165,233,0.1)'] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="p-8 rounded-full bg-slate-950 border-2 border-sky-500/50 flex items-center justify-center z-20 relative"
                  >
                    <Cpu className="w-12 h-12 text-sky-500" />
                  </motion.div>
                  <div className="absolute -top-4 -left-4 -right-4 -bottom-4 border border-dashed border-sky-500/20 rounded-full animate-spin-slow"></div>
                  <div className="text-center mt-6">
                    <h3 className="text-lg font-black text-white uppercase tracking-widest">Gemini Neural Core</h3>
                    <p className="text-[10px] text-sky-500 font-mono font-bold uppercase mt-1">Primary Analytic Engine</p>
                  </div>
                </div>

                {/* Level 3: Parallel Agents */}
                <div className="relative w-full flex justify-center">
                  {/* Branching Lines */}
                  <svg className="absolute top-[-64px] left-0 w-full h-16 pointer-events-none opacity-20" preserveAspectRatio="none">
                    <path d="M 50% 0 L 50% 10\" stroke="#0ea5e9" strokeWidth="2" fill="none" />
                    <path d="M 50% 10 L 15% 64 L 15% 64" stroke="#0ea5e9" strokeWidth="2" fill="none" />
                    <path d="M 50% 10 L 85% 64 L 85% 64" stroke="#0ea5e9" strokeWidth="2" fill="none" />
                    <path d="M 50% 10 L 50% 64 L 50% 64" stroke="#0ea5e9" strokeWidth="2" fill="none" />
                  </svg>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
                    <DiagramNode 
                      icon={<Shield className="w-5 h-5" />}
                      title="Lexical Agent"
                      subtitle="Sentiment & Framing"
                      color="purple"
                    />
                    <DiagramNode 
                      icon={<Activity className="w-5 h-5" />}
                      title="Logic Guard"
                      subtitle="Fallacy Detection"
                      color="sky"
                    />
                    <DiagramNode 
                      icon={<Database className="w-5 h-5" />}
                      title="Data Vector"
                      subtitle="Statistical Skew"
                      color="orange"
                    />
                  </div>
                </div>

                {/* Combined Outpout Connection */}
                <div className="flex flex-col items-center">
                  <div className="h-16 w-[1px] bg-gradient-to-b from-sky-500 to-transparent"></div>
                  <DiagramNode 
                    icon={<Zap className="w-6 h-6" />}
                    title="Intelligence Report"
                    subtitle="Aggregated Decision Data"
                    color="sky"
                    highlight
                  />
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="p-6 bg-slate-950 border-t border-slate-800 flex justify-between items-center px-12">
              <div className="flex gap-8">
                <LegendItem color="bg-sky-500" label="Active Pipeline" />
                <LegendItem color="bg-purple-400" label="Sentiment Matrix" />
                <LegendItem color="bg-orange-400" label="Empirical Check" />
              </div>
              <div className="flex items-center gap-4 text-[10px] font-mono text-slate-500">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> NODES ACTIVE</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> SECURE TUNNEL</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function DiagramNode({ icon, title, subtitle, color, highlight = false }: { icon: React.ReactNode, title: string, subtitle: string, color: string, highlight?: boolean }) {
  const colorMap: any = {
    sky: 'text-sky-500 border-sky-500/30 bg-sky-500/5',
    purple: 'text-purple-400 border-purple-400/30 bg-purple-400/5',
    orange: 'text-orange-400 border-orange-400/30 bg-orange-400/5'
  };

  const ringColor: any = {
    sky: 'border-sky-500',
    purple: 'border-purple-400',
    orange: 'border-orange-400'
  }

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`p-6 rounded-xl border flex flex-col items-center text-center max-w-[240px] w-full transition-all duration-300 relative ${colorMap[color]} ${highlight ? 'shadow-[0_0_30px_rgba(14,165,233,0.2)] scale-110 border-sky-500 bg-sky-500/10' : ''}`}
    >
      <div className={`w-12 h-12 rounded-lg bg-slate-950 border flex items-center justify-center mb-4 ${ringColor[color]}`}>
        {icon}
      </div>
      <h4 className="text-sm font-black text-white uppercase tracking-widest">{title}</h4>
      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter mt-1">{subtitle}</p>
    </motion.div>
  );
}

function DiagramConnection() {
  return (
    <div className="h-16 flex flex-col items-center">
      <div className="w-[1px] h-full bg-gradient-to-b from-sky-500 to-sky-500/20 relative">
        <motion.div 
          animate={{ y: [0, 64] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-[-2px] w-1 h-3 bg-sky-400 blur-[2px] rounded-full"
        />
      </div>
    </div>
  );
}

function LegendItem({ color, label }: { color: string, label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${color}`}></div>
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{label}</span>
    </div>
  );
}
