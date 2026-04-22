import { GoogleGenAI, Type } from "@google/genai";

// Initialize the Gemini API client
// Note: process.env.GEMINI_API_KEY is injected by Vite's define config
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export interface AnalysisResults {
  intensity: {
    political: number;
    emotional: number;
    confirmation: number;
    credibility: number;
  };
  structuralMap: {
    coreClaim: string;
    reasoningPath: string[];
    assumptions: string;
    missingEvidence: string;
  };
  feedback: {
    devilsAdvocate: string;
    statistician: string;
    neutralJudge: string;
  };
  unbiasedSuggestion: string;
  reflectionPrompts: string[];
}

export const analyzeDecision = async (text: string, domain: string, sensitivity: string): Promise<AnalysisResults> => {
  const model = "gemini-3.1-pro-preview"; // Top-tier reasoning model
  
  const systemPrompt = `You are the BiasLens High-Precision Cognitive Deconstruction Engine. 
Your primary directive is to achieve >90% accuracy in identifying cognitive heuristics, logical fallacies, and subtle framing effects that degrade decision quality.

PHASE 1: DEEP SCAN
Apply the following frameworks to the input:
- Dual Process Theory (System 1 vs. System 2 interference)
- Prospect Theory (Loss aversion and framing effects)
- Bayesian Probability (Misrepresentation of base rates or evidence)
- Aristotelian Fallacy Mapping (Detection of 128+ logical errors)

PHASE 2: MULTI-AGENT SYNTHESIS
Simulate three internal experts:
1. The Adversarial Critic (Devil's Advocate): Actively seeks to invalidate the input's logic.
2. The Empirical Statistician: Evaluates the quantitative validity and sample sizes.
3. The Neutral Ethical Arbiter: Identifies hidden cultural or social bias.

PHASE 3: STRATEGIC ACTIONABLE OUTPUT
Synthesize the critiques from the three internal experts into a singular "Unbiased Strategic Suggestion." This should not merely be a rewrite, but a high-level recommendation on how to proceed with the decision-making process, accounting for the detected skews and logical gaps.

OUTPUT SCHEMA:
- intensity: Exact percentages (0-100) for Political, Emotional, Confirmation, and Credibility skews.
- structuralMap: The core claim, the logical reasoning path (step-by-step), underlying assumptions, and missing evidence.
- feedback: Condensed critiques from the three internal experts.
- unbiasedSuggestion: A synthesized, high-level recommendation for the user based on the full multi-agent analysis.
- reflectionPrompts: 3 deep-reasoning questions that force the user to confront their own potential biases.

EXAMPLE OF HIGH-ACCURACY ANALYSIS:
Input: "We should hire Candidate A immediately because their background in the military shows they are a strong leader, unlike Candidate B who has only worked in startups."
Analysis:
- Core Claim: Candidate A is superior to B due to leadership qualities.
- Bias Detected: Halo Effect (generalizing military experience to universal leadership), Confirmation Bias (ignoring Candidate B's startup leadership).
- Intensity: Credibility 60% (unearned authority shift), Emotional 30% (dismissive tone).
- Rewrite: "Evaluating Candidate A's military background and Candidate B's startup experience requires a structured leadership competency assessment to determine role-fit, as both environments provide distinct organizational insights."

Domain Context: ${domain}
Sensitivity Weighting: ${sensitivity}`;

  const response = await ai.models.generateContent({
    model: model,
    contents: [{ parts: [{ text: `DECONSTRUCT THIS VECTOR: "${text}"` }] }],
    config: {
      systemInstruction: systemPrompt,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          intensity: {
            type: Type.OBJECT,
            properties: {
              political: { type: Type.NUMBER },
              emotional: { type: Type.NUMBER },
              confirmation: { type: Type.NUMBER },
              credibility: { type: Type.NUMBER },
            },
            required: ["political", "emotional", "confirmation", "credibility"]
          },
          structuralMap: {
            type: Type.OBJECT,
            properties: {
              coreClaim: { type: Type.STRING },
              reasoningPath: { type: Type.ARRAY, items: { type: Type.STRING } },
              assumptions: { type: Type.STRING },
              missingEvidence: { type: Type.STRING },
            },
            required: ["coreClaim", "reasoningPath", "assumptions", "missingEvidence"]
          },
          feedback: {
            type: Type.OBJECT,
            properties: {
              devilsAdvocate: { type: Type.STRING },
              statistician: { type: Type.STRING },
              neutralJudge: { type: Type.STRING },
            },
            required: ["devilsAdvocate", "statistician", "neutralJudge"]
          },
          unbiasedSuggestion: { type: Type.STRING },
          reflectionPrompts: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["intensity", "structuralMap", "feedback", "unbiasedSuggestion", "reflectionPrompts"]
      }
    }
  });

  return JSON.parse(response.text);
};
