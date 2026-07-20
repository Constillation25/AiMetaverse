# Constellation25 (C25) - Unified Documentation

> **A living, breathing swarm of 25 specialized AI agents**, each modeled after a celestial body and engineered to own a specific domain of your digital empire.

## 🌟 Overview

Constellation25 is not a monolith — it is a distributed swarm intelligence system comprising **36 repositories** working in concert to power:

- **Biometric SaaS** (MyBuyo)
- **Legal Tech** (VideoCourts)
- **AI Metaverse** experiences
- **Sovereign AI Infrastructure**
- **Edge Computing** (Termux, F-Droid)

## 📊 Repository Map

### Core Swarm Repositories (6)
| Repository | Purpose | Status |
|------------|---------|--------|
| [`constellation25`](https://github.com/Constellation25/constellation25) | Main swarm coordination & agent definitions | 🟢 Active |
| [`c25-monorepo`](https://github.com/Constellation25/c25-monorepo) | Shared libraries and utilities | 🟢 Active |
| [`c25-master`](https://github.com/Constellation25/c25-master) | Master configuration & orchestration | 🟢 Active |
| [`c25-deploy-router`](https://github.com/Constellation25/c25-deploy-router) | Intelligent deployment routing | 🟡 Setup |
| [`c25-training-corpus`](https://github.com/Constellation25/c25-training-corpus) | Agent training data & fine-tuning | 🟢 Active |
| [`c25-constellation25-swarm`](https://github.com/Constellation25/c25-constellation25-swarm) | Swarm behavior algorithms | 🟡 Setup |

### Application Layer (5)
| Repository | Purpose | Tech Stack |
|------------|---------|------------|
| [`mybuyo-biometric-saas`](https://github.com/Constellation25/mybuyo-biometric-saas) | Biometric authentication platform | Node.js, React |
| [`videocourts-org`](https://github.com/Constellation25/videocourts-org) | Legal evidence management | HTML, JS |
| [`videocourts_backend`](https://github.com/Constellation25/videocourts_backend) | Video processing API | JavaScript |
| [`aimetaverse-demo`](https://github.com/Constellation25/aimetaverse-demo) | AI metaverse experiences | JavaScript |
| [`sovereign-ai-empire`](https://github.com/Constellation25/sovereign-ai-empire) | Sovereign AI governance | Shell |

### Infrastructure (4)
| Repository | Purpose | Platform |
|------------|---------|----------|
| [`c25-fdroid-repo`](https://github.com/Constellation25/c25-fdroid-repo) | F-Droid repository for C25 apps | Android |
| [`c25-termux-addon`](https://github.com/Constellation25/c25-termux-addon) | Termux add-ons for edge agents | Shell |
| [`c25-secure-github-auth`](https://github.com/Constellation25/c25-secure-github-auth) | Secure GitHub authentication | Shell |
| [`llama.cpp`](https://github.com/Constellation25/llama.cpp) | Local LLM inference | C++ |

### Supporting Repositories (21)
Including documentation, downloads, backups, demos, and experimental projects.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    C25 Swarm Orchestrator                    │
│  (25 Agents coordinated via MCP + GitHub Actions)           │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐   ┌─────────────────┐   ┌───────────────┐
│  Core Agents  │   │  App Agents     │   │ Infra Agents  │
│  - Coordinator│   │  - MyBuyo       │   │  - Deploy     │
│  - Memory     │   │  - VideoCourts  │   │  - Security   │
│  - Git Ops    │   │  - AiMetaverse  │   │  - Edge       │
└───────────────┘   └─────────────────┘   └───────────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
                              ▼
              ┌───────────────────────────────┐
              │    MCP Server Layer           │
              │  - GitHub                     │
              │  - Desktop Commander          │
              │  - Playwright                 │
              │  - SQLite (State)             │
              │  - Sentry (Monitoring)        │
              │  - Vercel (Deploy)            │
              │  - Stripe (Payments)          │
              └───────────────────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Python 3.11+
- GitHub CLI (`gh`)
- Docker (optional, for containerized agents)

### Installation

```bash
# Clone the orchestrator
git clone https://github.com/Constellation25/c25-orchestrator.git
cd c25-orchestrator

# Install MCP servers
npm install -g @modelcontextprotocol/server-github \
               @modelcontextprotocol/server-filesystem \
               @playwright/mcp-server \
               desktop-commander

# Configure environment
cp .env.example .env
# Edit .env with your API keys

# Initialize swarm state
mkdir -p data
sqlite3 data/swarm-state.db < scripts/init-db.sql
```

### Configure MCP

Copy the unified configuration to your AI assistant:

```bash
# For Claude Desktop
cp config/mcp-c25-unified.json ~/.config/mcp/c25-config.json

# For Cursor
# Settings → MCP → Import → Select mcp-c25-unified.json
```

## 🔧 Available Commands

### Swarm Management
```bash
# Start all agents
./scripts/start-swarm.sh

# Check agent status
./scripts/swarm-status.sh

# Deploy to staging
./scripts/deploy.sh staging

# Deploy to production
./scripts/deploy.sh production
```

### Repository Operations
```bash
# Sync all repos
./scripts/sync-repos.sh

# Run tests across all repos
./scripts/test-all.sh

# Generate documentation
./scripts/generate-docs.sh
```

## 📋 CI/CD Pipeline

The C25 swarm uses GitHub Actions for automated deployment:

1. **Change Detection**: Identifies which repositories have changed
2. **Test & Build**: Runs tests and builds artifacts in parallel
3. **Security Scan**: Snyk vulnerability scan + CodeQL analysis
4. **Staging Deploy**: Automatic deployment to staging on main branch push
5. **Production Deploy**: Manual trigger with approval gate
6. **Agent Notification**: Notifies all 25 agents of deployment status

See [`.github/workflows/c25-agent-deploy.yml`](.github/workflows/c25-agent-deploy.yml) for full pipeline configuration.

## 🔐 Security

- All API keys stored as GitHub Secrets
- Snyk integration for dependency scanning
- CodeQL for static analysis
- Secure GitHub Auth repository for token management
- Agent permissions scoped by celestial domain

## 📈 Monitoring

- **Sentry**: Error tracking across all applications
- **Custom Dashboard**: Real-time agent status at `/dashboard`
- **Swarm State Database**: SQLite-backed state persistence
- **Deployment Logs**: Full audit trail in `logs/` directory

## 🌌 The 25 Agents

Each agent is named after a celestial body and owns a specific domain:

| # | Agent Name | Domain | Primary Repo |
|---|------------|--------|--------------|
| 1 | Sol | Coordination | constellation25 |
| 2 | Mercury | Fast decisions | c25-deploy-router |
| 3 | Venus | Aesthetics | aimetaverse-demo |
| 4 | Earth | Ground truth | c25-training-corpus |
| 5 | Mars | Aggressive testing | mybuyo-biometric-saas |
| 6 | Jupiter | Expansion | sovereign-ai-empire |
| 7 | Saturn | Structure | c25-monorepo |
| 8 | Uranus | Innovation | c25-constellation25-swarm |
| 9 | Neptune | Deep learning | llama.cpp |
| 10-25 | Moons & Asteroids | Specialized tasks | Various |

*Full agent roster in `constellation25/agents/`*

## 📦 Package Registry

- **F-Droid**: `c25-fdroid-repo` for Android apps
- **npm**: Shared packages in `c25-monorepo/packages/`
- **Docker**: Container images at `ghcr.io/constellation25/*`

## 🤝 Contributing

1. Fork the target repository
2. Create a feature branch
3. Run `./scripts/test-all.sh` before PR
4. Ensure all security scans pass
5. Tag relevant agents in PR description

## 📄 License

Varies by repository:
- Core swarm: MIT
- MyBuyo: Proprietary (contact for licensing)
- VideoCourts: AGPL-3.0
- Infrastructure: Apache-2.0

Check individual repository LICENSE files.

## 🌐 Links

- **GitHub Org**: https://github.com/Constellation25
- **MyBuyo Demo**: https://mybuyo.vercel.app
- **VideoCourts**: https://videocourts.org
- **Documentation**: https://docs.constellation25.dev

---

*Last updated: $(date)*  
*Maintained by the C25 Swarm*
