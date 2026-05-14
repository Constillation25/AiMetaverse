// Browser-compatible version of platform.js
// This exposes the platform module to the browser via window.platform

const MODULES = [
  "CoreKernel","NeuralRouter","AgentOrchestrator","DataLedger","AuthlessGateway",
  "CommerceEngine","VideoProcessing","LegalCompliance","MetaverseCore","FileSync",
  "GammaParser","NotebookExecutor","BananiValidator","PrototypeSandbox","UIRenderer",
  "AssetMapper","NetworkMesh","CryptoWallet","APIGateway","TaskScheduler",
  "Telemetry","CacheManager","StorageOptimizer","SecurityShield","DeploymentPipeline",
  "DocumentationHub","EarthRouter"
];

const AGENTS = Array.from({length:25},(_,i)=>`C25-${String(i+1).padStart(2,'0')}`);

const ASSETS = { 
  html: [
    "/data/data/com.termux/files/home/constellation25/data/fixed_html/Qwen Studio.html",
    "/data/data/com.termux/files/home/constellation25/data/fixed_html/Qwen_Studio.html"
  ],
  gamma: [
    "/data/data/com.termux/files/home/github-repos/C25-mono/bash/9304d2_gamma_agent.sh",
    "/data/data/com.termux/files/home/github-repos/C25-mono/bash/6e859b_gamma.sh"
  ],
  notebook: [
    "/data/data/com.termux/files/home/github-repos/constellation-25/C25_Empire.ipynb"
  ],
  banani: [
    "/data/data/com.termux/files/home/github-repos/videocourts_backend/src/Object.getPrototypeOf.d.ts"
  ]
};

const SECTIONS = {
  modules: { label: "27 Modules", data: MODULES.map(m=>({name:m,status:"Active",desc:"Platform core unit"})) },
  agents: { label: "25 Agents", data: AGENTS.map(a=>({name:a,status:"Online",desc:"Planetary execution node"})) },
  assets: { label: `${Object.values(ASSETS).flat().length} Assets`, data: Object.entries(ASSETS).flatMap(([k,v])=>v.map(p=>({name:p.split('/').pop(),path:p,type:k}))) }
};

class PlatformState {
  constructor() {
    this.activeSection = "modules";
    this.modules = MODULES;
    this.agents = AGENTS;
    this.assets = ASSETS;
    this.sections = SECTIONS;
  }

  getActiveSection() {
    return this.activeSection;
  }

  setActiveSection(section) {
    if (!this.sections[section]) {
      throw new Error(`Invalid section: ${section}`);
    }
    this.activeSection = section;
    return this.activeSection;
  }

  getModuleCount() {
    return this.modules.length;
  }

  getAgentCount() {
    return this.agents.length;
  }

  getAssetCount() {
    return Object.values(this.assets).flat().length;
  }

  getSectionData(sectionName) {
    return this.sections[sectionName]?.data || [];
  }

  getModuleName(index) {
    if (index < 0 || index >= this.modules.length) {
      throw new Error(`Index out of range: ${index}`);
    }
    return this.modules[index];
  }

  getAgentName(index) {
    if (index < 0 || index >= this.agents.length) {
      throw new Error(`Index out of range: ${index}`);
    }
    return this.agents[index];
  }

  filterAssetsByType(type) {
    return this.assets[type] || [];
  }

  getStats() {
    return {
      moduleCount: this.getModuleCount(),
      agentCount: this.getAgentCount(),
      assetCount: this.getAssetCount(),
      reposSynced: 8
    };
  }
}

// Expose to browser global scope
window.platform = { 
  MODULES, 
  AGENTS, 
  ASSETS, 
  SECTIONS, 
  PlatformState 
};
