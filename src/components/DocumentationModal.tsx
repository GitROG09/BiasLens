import { motion, AnimatePresence } from 'motion/react';
import { X, Book, Shield, Brain, Zap, Target } from 'lucide-react';

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DocumentationModal({ isOpen, onClose }: DocumentationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl max-h-[85vh] bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="bg-sky-500/10 p-2 rounded">
                  <Book className="w-5 h-5 text-sky-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white uppercase tracking-tight">Technical Documentation</h2>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mt-1">BiasLens Intelligence Protocol v2.4</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="text-slate-500 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 overflow-y-auto custom-scrollbar space-y-12">
              {/* Vision Section */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-4 h-4 text-sky-500" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest">Platform Objective</h3>
                </div>
                <p className="text-slate-400 leading-relaxed italic text-lg border-l-2 border-sky-500/30 pl-6">
                  "BiasLens was architected to neutralize the subjective static within corporate and strategic communication. By deploying a multi-agent cognitive firewall, we isolate heuristic distortions in real-time, enabling purely objective decision intelligence."
                </p>
              </section>

              {/* Architecture Section */}
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <Shield className="w-4 h-4 text-sky-500" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest">3-Agent Cognitive Firewall</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-950/50 p-6 rounded-lg border border-slate-800">
                    <h4 className="text-xs font-bold text-sky-500 uppercase tracking-widest mb-3">Lexical Parser</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Detects adjectival inflation and superlative framing that masks a lack of empirical data.</p>
                  </div>
                  <div className="bg-slate-950/50 p-6 rounded-lg border border-slate-800">
                    <h4 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-3">Fallacy Engine</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Cross-references reasoning chains against 128 distinct logical fallacy models to flag invalid conclusions.</p>
                  </div>
                  <div className="bg-slate-950/50 p-6 rounded-lg border border-slate-800">
                    <h4 className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-3">Skew Detector</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Monitors statistical variance to identify 'cherry-picking' or the omission of contradictory evidence.</p>
                  </div>
                </div>
              </section>

              {/* Methodology Section */}
              <section className="bg-sky-500/5 border border-sky-500/10 rounded-xl p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Brain className="w-5 h-5 text-sky-500" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest">Analytic Methodology</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-white text-sm font-bold mb-2">Vector Probability Weighting</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">Each detected bias is assigned a weight based on its impact on the final conclusion. These vectors are then aggregated into the 4 intensity gauges visible in your report.</p>
                  </div>
                  <div className="h-[1px] bg-slate-800/50 w-full" />
                  <div>
                    <h4 className="text-white text-sm font-bold mb-2">Structural Mapping</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">Our engine builds a recursive tree of assertions and evidence. Any branch lacking a validated causal link is flagged as an 'Assumption'.</p>
                  </div>
                </div>
              </section>

              {/* Troubleshooting */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-4 h-4 text-sky-500" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest">Optimization Tips</h3>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li className="flex gap-3 text-xs text-slate-500 bg-slate-950 p-4 rounded border border-slate-800">
                    <span className="text-sky-500 font-bold">01.</span> Use verbatim text from source documents for highest calibration accuracy.
                  </li>
                  <li className="flex gap-3 text-xs text-slate-500 bg-slate-950 p-4 rounded border border-slate-800">
                    <span className="text-sky-500 font-bold">02.</span> Provide 'Contextual Metadata' to adjust the engine's sensitivity to localized market conditions.
                  </li>
                </ul>
              </section>
            </div>

            {/* Footer */}
            <div className="p-6 bg-slate-950 border-t border-slate-800 flex justify-end">
              <button 
                onClick={onClose}
                className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-[10px] uppercase tracking-widest px-8 py-3 rounded transition-all"
              >
                Close Protocol
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
