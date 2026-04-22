# BiasLens: Cognitive Intelligence & Deconstruction Platform

![BiasLens UI](https://img.shields.io/badge/Analytic_Engine-v2.4-0ea5e9?style=for-the-badge)
![Accuracy](https://img.shields.io/badge/Accuracy-%3E90%25-green?style=for-the-badge)

BiasLens is a high-precision analytic platform designed to identify, visualize, and neutralize cognitive biases, logical fallacies, and framing distortions in unstructured text. By deploying a multi-agent cognitive firewall, BiasLens provides decision-makers with the objective intelligence needed to filter out subjective noise.

## 🚀 Key Features

### 1. High-Precision Deconstruction Engine
Achieving over **90% accuracy** by leveraging **Gemini 3.1 Pro** with activated internal thinking processes. The engine applies:
- **Dual Process Theory**: To detect emotional System 1 reflexive biases.
- **Prospect Theory**: To identify irrational loss aversion and framing.
- **Aristotelian Fallacy Mapping**: Scanning for over 128 distinct logical errors.

### 2. The 3-Agent Cognitive Firewall
Every input passes through three specialized AI personas:
- **Lexical Sentiment Parser**: Scans for emotionally charged vocabulary and adjectival inflation.
- **Logical Fallacy Engine**: Evaluates arguments against known knowledge graphs (Ad Hominem, Strawman, etc.).
- **Statistical Skew Detector**: cross-references quantitative claims to identify cherry-picking.

### 3. Intelligence Dossiers (Downloads)
Export your analysis as professional **HTML Intelligence Dossiers**. These dossiers include:
- Executive summaries with color-coded intensity gauges.
- Step-by-step logical reasoning paths.
- Multi-agent peer reviews.
- A "Zero-Bias" alternative rewrite of the original text.

### 4. Advanced Visualization
- **Process Animation**: High-fidelity scanning UI during analysis initiation.
- **Architecture Mapping**: Real-time visualization of the system infrastructure and data flow.
- **Intensity Profile**: Visual gauges for Political, Emotional, Cultural, and Statistical skews.

### 5. Secure Analytic Vault (Library)
- **Firebase Authentication**: Secure Google-based login.
- **Encrypted Library**: Save and retrieve past analyses for longitudinal tracking.

## 🛠 Technical Stack

- **Frontend**: React 19 + Vite + TypeScript
- **Animation**: Motion (formerly Framer Motion)
- **Styling**: Tailwind CSS
- **AI Core**: Gemini 3.1 Pro (via @google/genai)
- **Backend/Auth**: Firebase (Auth, Firestore)
- **Deployment**: Google Cloud Run

## 📥 Setup & Deployment

### Environment Configuration
Create a `.env` file based on `.env.example`:
```env
GEMINI_API_KEY=your_key_here
```

### Firebase Integration
1. Initialize a Firebase project in the Google Cloud Console.
2. Enable Google Authentication.
3. Deploy the provided `firestore.rules`.
4. Add your configuration to `firebase-applet-config.json`.

### Build & Run
```bash
npm install
npm run dev
```

## 🛡 Security
BiasLens enforces a strict **zero-trust security model** for document IDs and data access, ensuring that your analytic intelligence is isolated and protected via rigorous server-side rules.

---
*Developed as a decision-intelligence tool for high-stakes strategic analysis.*
