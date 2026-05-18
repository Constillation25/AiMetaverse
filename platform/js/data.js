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
  }
};

export { MODULES, AGENTS, ASSETS, SECTIONS };
