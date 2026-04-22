import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Download, Share2, Flag, Network as AccountTree, EyeOff, AlertTriangle, Copy, Lightbulb, User, MessageSquare, Scale, ArrowRight } from 'lucide-react';
import { AnalysisResults } from '../services/gemini';

export default function Results() {
  const location = useLocation();
  // Provide mock data if no results are found in state for demo purposes
  const results: AnalysisResults = location.state?.results || {
    intensity: { political: 75, emotional: 40, confirmation: 60, credibility: 15 },
    structuralMap: {
      coreClaim: "The new economic policy will definitively lead to a recession within the next two quarters.",
      reasoningPath: ["Policy increases corporate taxation", "Companies reduce hiring", "Unemployment rises", "Consumer spending drops"],
      assumptions: "Assumes corporate profit margins are too narrow to absorb tax without immediate layoffs. Ignores potential government reinvestment of tax revenue.",
      missingEvidence: "No historical data provided comparing similar tax hikes to immediate recessionary periods. Lacks quantitative models."
    },
    feedback: {
      devilsAdvocate: "The argument assumes a zero-sum game. What if corporations offset the tax by increasing efficiency rather than cutting jobs? The causal link is treated as absolute when it's merely highly probable at best.",
      statistician: "Sample size of cited precedents is N=1. The correlation coefficient between the proposed metric and recession indicators is only 0.42. The confidence interval presented is too narrow for macroeconomic forecasting.",
      neutralJudge: "While the concern regarding taxation impact is valid, the conclusion is overstated. The author relies heavily on slippery-slope logic. A balanced view requires acknowledging the multi-variate nature of economic shifts."
    },
    balancedRewrite: "The implementation of the new economic policy introduces variables that could impact corporate hiring practices. If companies respond to increased taxation by tightening budgets, there is a potential risk of rising unemployment, which historically correlates with a reduction in consumer spending. Consequently, analysts should monitor these indicators closely, as they may increase the likelihood of an economic downturn in the coming quarters, assuming no counter-balancing government interventions.",
    reflectionPrompts: [
      "How might this analysis change if the source material was published by a left-leaning think tank versus a right-leaning one?",
      "Identify one piece of contradictory evidence that the original author likely encountered but chose to omit.",
      "If you were tasked with defending the original argument's core claim using only objective metrics, which datasets would you prioritize?"
    ]
  };

  const downloadReport = () => {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BiasLens Intelligence Report</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=JetBrains+Mono&display=swap');
        
        :root {
            --bg: #020617;
            --card: #0f172a;
            --border: #1e293b;
            --accent: #0ea5e9;
            --text: #f1f5f9;
            --muted: #94a3b8;
        }

        body {
            background: var(--bg);
            color: var(--text);
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 40px;
            line-height: 1.6;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
        }

        header {
            border-bottom: 2px solid var(--accent);
            padding-bottom: 20px;
            margin-bottom: 40px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
        }

        .logo {
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: -1px;
            font-size: 24px;
        }

        .logo span { color: var(--accent); }

        .meta {
            font-family: 'JetBrains Mono', monospace;
            font-size: 10px;
            color: var(--muted);
            text-transform: uppercase;
            text-align: right;
        }

        .section {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 24px;
            margin-bottom: 24px;
        }

        h2 {
            font-size: 12px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: var(--accent);
            margin: 0 0 16px 0;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .grid {
            display: grid;
            grid-template-cols: repeat(4, 1fr);
            gap: 16px;
            margin-top: 20px;
        }

        .stat-card {
            background: var(--bg);
            border: 1px solid var(--border);
            padding: 16px;
            border-radius: 4px;
            text-align: center;
        }

        .stat-val {
            font-size: 24px;
            font-weight: 900;
            display: block;
        }

        .stat-label {
            font-size: 8px;
            text-transform: uppercase;
            font-weight: 700;
            color: var(--muted);
        }

        .claim {
            font-size: 18px;
            font-weight: 700;
            border-left: 4px solid var(--accent);
            padding-left: 20px;
            margin: 20px 0;
        }

        ul {
            padding-left: 20px;
            margin: 0;
        }

        li {
            margin-bottom: 8px;
            color: var(--muted);
            font-size: 14px;
        }

        .agent {
            font-family: 'JetBrains Mono', monospace;
            font-size: 13px;
            background: #000;
            padding: 12px;
            border-radius: 4px;
            margin-top: 10px;
            color: var(--muted);
        }

        .rewrite {
            font-size: 18px;
            background: rgba(14, 165, 233, 0.1);
            padding: 24px;
            border-radius: 8px;
            border-left: 4px solid var(--accent);
        }

        .footer {
            margin-top: 60px;
            text-align: center;
            font-family: 'JetBrains Mono', monospace;
            font-size: 10px;
            color: var(--muted);
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <div class="logo">Bias<span>Lens</span></div>
            <div class="meta">
                Protocol: BIAS-9824-A<br>
                Generated: ${new Date().toLocaleString()}<br>
                Engine: Gemini 3.1 Pro
            </div>
        </header>

        <section class="section">
            <h2>Executive Dashboard</h2>
            <div class="claim">${results.structuralMap.coreClaim}</div>
            <div class="grid">
                <div class="stat-card">
                    <span class="stat-val" style="color: #ef4444;">${results.intensity.political}%</span>
                    <span class="stat-label">Political</span>
                </div>
                <div class="stat-card">
                    <span class="stat-val" style="color: #f97316;">${results.intensity.emotional}%</span>
                    <span class="stat-label">Emotional</span>
                </div>
                <div class="stat-card">
                    <span class="stat-val" style="color: #eab308;">${results.intensity.confirmation}%</span>
                    <span class="stat-label">Cultural</span>
                </div>
                <div class="stat-card">
                    <span class="stat-val" style="color: #0ea5e9;">${results.intensity.credibility}%</span>
                    <span class="stat-label">Statistical</span>
                </div>
            </div>
        </section>

        <section class="section">
            <h2>Logical Path & Assumptions</h2>
            <ul>
                ${results.structuralMap.reasoningPath.map(step => `<li>${step}</li>`).join('')}
            </ul>
            <div style="margin-top: 20px; font-size: 14px;">
                <strong style="color: var(--accent); font-size: 10px; text-transform: uppercase;">Primary Assumption:</strong><br>
                <span style="color: var(--muted)">${results.structuralMap.assumptions}</span>
            </div>
            <div style="margin-top: 15px; font-size: 14px;">
                <strong style="color: #ef4444; font-size: 10px; text-transform: uppercase;">Missing Evidence:</strong><br>
                <span style="color: var(--muted)">${results.structuralMap.missingEvidence}</span>
            </div>
        </section>

        <section class="section">
            <h2>Multi-Agent Critique</h2>
            <div class="agent"><strong>[DEVIL'S ADVOCATE]</strong> "${results.feedback.devilsAdvocate}"</div>
            <div class="agent"><strong>[STATISTICIAN]</strong> "${results.feedback.statistician}"</div>
            <div class="agent"><strong>[NEUTRAL JUDGE]</strong> "${results.feedback.neutralJudge}"</div>
        </section>

        <section class="section">
            <h2>Balanced Intelligence (Rewrite)</h2>
            <div class="rewrite">${results.balancedRewrite}</div>
        </section>

        <div class="footer">
            CONFIDENTIAL COGNITIVE ANALYSIS • END OF REPORT
        </div>
    </div>
</body>
</html>
    `.trim();

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `BiasLens-Dossier-${new Date().getTime()}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto p-8"
    >
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Analysis Result</h1>
          <p className="font-mono text-xs text-slate-500 uppercase tracking-widest">
            ID: DOC-9824-A | Processed: 2 mins ago
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={downloadReport}
            className="bg-slate-900 border border-slate-800 text-white px-6 py-2 rounded font-bold text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
          <button 
            onClick={async () => {
              const shareData = {
                title: 'BiasLens Analysis Insight',
                text: `Check out this cognitive bias analysis: ${results.structuralMap.coreClaim}`,
                url: window.location.href,
              };
              if (navigator.share) {
                try {
                  await navigator.share(shareData);
                } catch (err) {
                  console.error('Error sharing:', err);
                }
              } else {
                try {
                  await navigator.clipboard.writeText(window.location.href);
                  alert('Analysis link copied to clipboard!');
                } catch (err) {
                  console.error('Failed to copy link:', err);
                }
              }
            }}
            className="bg-sky-500 text-slate-950 px-6 py-2 rounded font-bold text-[10px] uppercase tracking-widest hover:bg-sky-400 transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(14,165,233,0.3)]"
          >
            <Share2 className="w-4 h-4 underline-offset-4" />
            Share Insight
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Bias Intensity */}
        <section className="col-span-12 bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-xl p-8">
          <h2 className="text-xl font-bold text-white mb-6">Bias Intensity</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <IntensityGauge label="Political Skew" value={results.intensity.political} color="text-red-500" />
            <IntensityGauge label="Emotional Tone" value={results.intensity.emotional} color="text-orange-500" />
            <IntensityGauge label="Confirmation Bias" value={results.intensity.confirmation} color="text-yellow-500" />
            <IntensityGauge label="Source Credibility" value={results.intensity.credibility} color="text-sky-500" />
          </div>
        </section>

        {/* Structural Map */}
        <section className="col-span-12 lg:col-span-8 bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-xl flex flex-col overflow-hidden">
          <div className="p-8 border-b border-slate-800/50">
            <h2 className="text-xl font-bold text-white">Argument Structural Map</h2>
            <p className="text-xs text-slate-500 mt-1">Deconstruction of primary assertions and underlying logic.</p>
          </div>
          <div className="p-8 space-y-6 flex-1">
            <div className="bg-slate-950/50 p-6 rounded-lg border border-slate-800">
              <div className="flex items-center gap-2 mb-3">
                <Flag className="text-sky-500 w-5 h-5" />
                <h3 className="text-[10px] font-bold text-sky-500 uppercase tracking-widest">Core Claim</h3>
              </div>
              <p className="text-slate-100 leading-relaxed font-medium">{results.structuralMap.coreClaim}</p>
            </div>

            <div className="bg-slate-950/50 p-6 rounded-lg border border-slate-800">
              <div className="flex items-center gap-2 mb-3">
                <AccountTree className="text-slate-400 w-5 h-5" />
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reasoning Path</h3>
              </div>
              <div className="font-mono text-xs text-slate-400 leading-relaxed flex flex-wrap items-center gap-2">
                {results.structuralMap.reasoningPath.map((step, i) => (
                  <span key={i} className="flex items-center gap-2">
                    {step} {i < results.structuralMap.reasoningPath.length - 1 && <ArrowRight className="w-3 h-3" />}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-950/50 p-6 rounded-lg border border-slate-800">
                <div className="flex items-center gap-2 mb-3">
                  <EyeOff className="text-orange-400 w-5 h-5" />
                  <h3 className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">Assumptions</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{results.structuralMap.assumptions}</p>
              </div>
              <div className="bg-red-500/5 p-6 rounded-lg border border-red-500/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="text-red-500 w-5 h-5" />
                  <h3 className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Missing Evidence</h3>
                </div>
                <p className="text-xs text-red-100/50 leading-relaxed">{results.structuralMap.missingEvidence}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Agent Feedback */}
        <section className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <FeedbackCard 
            persona="Devil's Advocate" 
            text={results.feedback.devilsAdvocate} 
            icon={<MessageSquare className="w-4 h-4 text-purple-400" />} 
            accent="text-purple-400"
            bg="bg-purple-400/20"
          />
          <FeedbackCard 
            persona="Statistician" 
            text={results.feedback.statistician} 
            icon={<AccountTree className="w-4 h-4 text-sky-400" />} 
            accent="text-sky-400"
            bg="bg-sky-400/20"
          />
          <FeedbackCard 
            persona="Neutral Judge" 
            text={results.feedback.neutralJudge} 
            icon={<Scale className="w-4 h-4 text-slate-400" />} 
            accent="text-slate-100"
            bg="bg-slate-800"
          />
        </section>

        {/* Balanced Rewrite */}
        <section className="col-span-12 lg:col-span-8 bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-xl">
          <div className="p-8 border-b border-slate-800/50 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-white">Balanced Rewrite</h2>
              <p className="text-xs text-slate-500 mt-1">AI-generated version neutralizing detected bias.</p>
            </div>
            <button className="text-sky-500 hover:bg-sky-500/10 p-2 rounded transition-colors">
              <Copy className="w-5 h-5" />
            </button>
          </div>
          <div className="p-8">
            <p className="text-lg text-slate-200 leading-relaxed selection:bg-sky-500/30">
              {results.balancedRewrite}
            </p>
          </div>
        </section>

        {/* Reflection Prompts */}
        <section className="col-span-12 lg:col-span-4 bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <Lightbulb className="text-sky-500 w-6 h-6" />
            <h2 className="text-xl font-bold text-white tracking-tight">Reflection Prompts</h2>
          </div>
          <div className="space-y-6">
            {results.reflectionPrompts.map((prompt, i) => (
              <div key={i} className="group">
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full border border-sky-500/50 text-sky-500 flex items-center justify-center font-mono text-[10px] shrink-0 mt-1 group-hover:scale-110 transition-transform">
                    {i + 1}
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-100 transition-colors">{prompt}</p>
                </div>
                {i < results.reflectionPrompts.length - 1 && <div className="mt-6 h-[1px] bg-slate-800/50 w-full" />}
              </div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}

function IntensityGauge({ label, value, color }: { label: string, value: number, color: string }) {
  const rotation = (value / 100) * 251;
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-950/40 rounded-lg border border-slate-800/50">
      <div className="relative w-24 h-24 mb-4">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle className="text-slate-800" cx="50" cy="50" fill="none" r="40" stroke="currentColor" strokeWidth="8" />
          <circle className={`${color}`} cx="50" cy="50" fill="none" r="40" stroke="currentColor" strokeDasharray="251" strokeDashoffset={251 - rotation} strokeWidth="8" strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">{value}%</span>
        </div>
      </div>
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center leading-none">{label}</span>
    </div>
  );
}

function FeedbackCard({ persona, text, icon, accent, bg }: { persona: string, text: string, icon: React.ReactNode, accent: string, bg: string }) {
  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <User className="w-16 h-16" />
      </div>
      <div className="flex items-center gap-2 mb-4 relative z-10">
        <div className={`w-6 h-6 rounded ${bg} flex items-center justify-center`}>
          {icon}
        </div>
        <span className={`text-[10px] font-bold ${accent} uppercase tracking-widest`}>{persona}</span>
      </div>
      <p className="font-mono text-xs text-slate-400 relative z-10 leading-relaxed italic">
        "{text}"
      </p>
    </div>
  );
}
