/**
 * Constellation25 Platform Data
 * Contains modules, agents, and asset definitions
 */

const MODULES = [
  "CoreKernel", "NeuralRouter", "AgentOrchestrator", "DataLedger", "AuthlessGateway",
  "CommerceEngine", "VideoProcessing", "LegalCompliance", "MetaverseCore", "FileSync",
  "GammaParser", "NotebookExecutor", "BananiValidator", "PrototypeSandbox", "UIRenderer",
  "AssetMapper", "NetworkMesh", "CryptoWallet", "APIGateway", "TaskScheduler",
  "Telemetry", "CacheManager", "StorageOptimizer", "SecurityShield", "DeploymentPipeline",
  "DocumentationHub", "EarthRouter"
];

const AGENTS = Array.from({ length: 25 }, (_, i) => `C25-${String(i + 1).padStart(2, '0')}`);

const ASSETS = {
  html: [
    "/data/data/com.termux/files/home/constellation25/static/index.html",
    "/data/data/com.termux/files/home/github-repos/c25-addon/index.html",
    "/data/data/com.termux/files/home/github-repos/c25-console-v5/index.html",
    "/data/data/com.termux/files/home/github-repos/c25-deploy/index.html",
    "/data/data/com.termux/files/home/github-repos/c25-final-deploy/index.html",
    "/data/data/com.termux/files/home/github-repos/c25-fresh-build/index.html",
    "/data/data/com.termux/files/home/github-repos/c25-agents/index.html",
    "/data/data/com.termux/files/home/github-repos/C25-MASTER-SOURCE/index.html",
    "/data/data/com.termux/files/home/github-repos/CONSTELLATION-25/index.html",
    "/data/data/com.termux/files/home/github-repos/SovereignGTP/index.html"
  ],
  gamma: [
    "/data/data/com.termux/files/home/github-repos/C25-mono/bash/gamma_agent.sh",
    "/data/data/com.termux/files/home/github-repos/C25-mono/html/gamma-artifact.html",
    "/data/data/com.termux/files/home/github-repos/funding-extracted/gamma/gamma_docs.md",
    "/data/data/com.termux/files/home/github-repos/funding-extracted/gamma_agent.sh"
  ],
  notebook: [
    "/data/data/com.termux/files/home/github-repos/constellation-25/C25_Empire.ipynb",
    "/data/data/com.termux/files/home/github-repos/pathos/C25_Empire.ipynb",
    "/data/data/com.termux/files/home/github-repos/c25-sovereign-vault/notebooks/C25_Empire.ipynb"
  ],
  banani: [
    "/data/data/com.termux/files/home/github-repos/videocourts_backend/src/getPrototypeOf.js",
    "/data/data/com.termux/files/home/github-repos/videocourts_backend/src/setPrototypeOf.js"
  ]
};

const SECTIONS = {
  modules: {
    label: "27 Modules",
    data: MODULES.map(m => ({ name: m, status: "Active", desc: "Platform core unit" }))
  },
  agents: {
    label: "25 Agents",
    data: AGENTS.map(a => ({ name: a, status: "Online", desc: "Planetary execution node" }))
  },
  assets: {
    label: "Assets",
    data: Object.entries(ASSETS).flatMap(([k, v]) =>
      v.map(p => ({ name: p.split('/').pop(), path: p, type: k }))
    )
  },
  botability: {
    label: "BOTablity",
    data: [
      { name: "AI Tools for Content Creation", status: "Available", desc: "Jarvis, Lyrical, Hotpot AI, Descript, Grammarly" },
      { name: "AI Tools for Students", status: "Available", desc: "Quizlet, Caktus AI, Wolfram Alpha, Duolingo, Brainly" },
      { name: "AI Tools for Email Writing", status: "Available", desc: "Boomerang, Crystal, Copy.ai" },
      { name: "AI Tools for Presentation", status: "Available", desc: "Beautiful.ai, Designs.AI, Presentations.AI, Tome AI" },
      { name: "AI Tools for Designers", status: "Available", desc: "Canva, Adobe Firefly AI, Leonardo AI, Visual ChatGPT, Figma" },
      { name: "AI Tools for Marketing", status: "Available", desc: "HubSpot, Factmata, Phrasee, Hootsuite, Marketo" },
      { name: "AI Content Detectors", status: "Available", desc: "Truepic, AI Text Classifier, Deeptrace, Sensity, GPTZero" },
      { name: "AI Tools for Business", status: "Available", desc: "Microsoft Azure AI, IBM Watson, Salesforce Einstein, AWS AI" },
      { name: "AI Tools for Searching", status: "Available", desc: "You.com, IBM Watson Discovery, Diffbot, Neeva AI" },
      { name: "AI Tools for Interior Designers", status: "Available", desc: "Planner 5D, Interior AI, Modsy, Morpholio Board, Reimagine Home AI" },
      { name: "AI Tools for Video Editing", status: "Available", desc: "Synthesia, Doodly, InVideo, Lumen5" },
      { name: "AI Tools for Writing", status: "Available", desc: "Google Bard AI, Notion AI, Chai, NovelAI, Jenni AI, Microsoft 365 Copilot" },
      { name: "AI Tools for Image Generation", status: "Available", desc: "MyHeritage AI Time Machine, Lensa AI, Stable Diffusion, DALL-E 2, Midjourney" },
      { name: "AI Search Engines", status: "Available", desc: "Consensus AI, Google Bard, Komo AI, You.com, Bing AI" },
      { name: "Workflow Solutions", status: "Active", desc: "Speed & Security, Flexibility & Scalability, Better Collaboration" }
    ]
  }
};

export { MODULES, AGENTS, ASSETS, SECTIONS };
