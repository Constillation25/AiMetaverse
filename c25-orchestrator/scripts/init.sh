#!/bin/bash

# C25 Swarm Setup Script
# Initializes the Constellation25 orchestrator environment

set -e

echo "🌟 Initializing C25 Swarm Orchestrator..."

# Create required directories
mkdir -p data logs scripts

# Initialize SQLite database for swarm state
echo "📊 Creating swarm state database..."
sqlite3 data/swarm-state.db <<EOF
CREATE TABLE IF NOT EXISTS agents (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    domain TEXT,
    status TEXT DEFAULT 'pending',
    last_active DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS deployments (
    id INTEGER PRIMARY KEY,
    repo TEXT NOT NULL,
    environment TEXT,
    status TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS repos (
    id INTEGER PRIMARY KEY,
    name TEXT UNIQUE,
    category TEXT,
    status TEXT DEFAULT 'unknown',
    last_sync DATETIME
);

-- Insert 25 agents
INSERT INTO agents (name, domain) VALUES 
('Sol', 'Coordination'),
('Mercury', 'Fast Decisions'),
('Venus', 'Aesthetics'),
('Earth', 'Ground Truth'),
('Mars', 'Testing'),
('Jupiter', 'Expansion'),
('Saturn', 'Structure'),
('Uranus', 'Innovation'),
('Neptune', 'Deep Learning'),
('Pluto', 'Edge Cases'),
('Luna', 'Memory'),
('Titan', 'Storage'),
('Europa', 'Discovery'),
('Ganymede', 'Security'),
('Callisto', 'Monitoring'),
('Io', 'Volatility'),
('Triton', 'Cold Storage'),
('Charon', 'Partnerships'),
('Eris', 'Chaos Testing'),
('Haumea', 'Speed'),
('Makemake', 'Creation'),
('Sedna', 'Deep Archive'),
('Quaoar', 'Analysis'),
('Orcus', 'Underworld'),
('Gonggong', 'Communication');

-- Insert core repos
INSERT INTO repos (name, category) VALUES 
('constellation25', 'core'),
('c25-monorepo', 'core'),
('c25-master', 'core'),
('c25-deploy-router', 'core'),
('c25-training-corpus', 'core'),
('c25-constellation25-swarm', 'core'),
('mybuyo-biometric-saas', 'app'),
('videocourts-org', 'app'),
('videocourts_backend', 'app'),
('aimetaverse-demo', 'app'),
('sovereign-ai-empire', 'app'),
('c25-fdroid-repo', 'infra'),
('c25-termux-addon', 'infra'),
('c25-secure-github-auth', 'infra'),
('llama.cpp', 'infra');
EOF

# Create .env template
cat > .env.example <<EOF
# GitHub Configuration
GITHUB_TOKEN=your_github_token_here
GITHUB_ORG=Constellation25

# API Keys (Optional - add as needed)
SERPAPI_API_KEY=
NOTION_API_KEY=
STRIPE_SECRET_KEY=
VERCEL_TOKEN=
VERCEL_ORG_ID=
SENTRY_AUTH_TOKEN=

# Project IDs
MYBUYO_PROJECT_ID=
VIDEOCOURTS_PROJECT_ID=

# Agent Webhook
AGENT_WEBHOOK_URL=
EOF

# Create placeholder scripts
cat > scripts/start-swarm.sh <<'SCRIPT'
#!/bin/bash
echo "🚀 Starting C25 Swarm..."
echo "Loading 25 celestial agents..."
# Add actual agent startup logic here
echo "✅ Swarm initialized"
SCRIPT
chmod +x scripts/start-swarm.sh

cat > scripts/swarm-status.sh <<'SCRIPT'
#!/bin/bash
echo "📊 C25 Swarm Status Report"
echo "=========================="
sqlite3 ../data/swarm-state.db "SELECT name, domain, status FROM agents;"
SCRIPT
chmod +x scripts/swarm-status.sh

cat > scripts/deploy.sh <<'SCRIPT'
#!/bin/bash
ENV=${1:-staging}
echo "🚀 Deploying to $ENV..."
# Add actual deployment logic here
echo "✅ Deployment complete"
SCRIPT
chmod +x scripts/deploy.sh

echo ""
echo "✅ C25 Swarm Orchestrator initialized successfully!"
echo ""
echo "Next steps:"
echo "1. Copy .env.example to .env and add your API keys"
echo "2. Run ./scripts/start-swarm.sh to initialize agents"
echo "3. Open dashboard/index.html in a browser"
echo "4. Configure MCP with config/mcp-c25-unified.json"
echo ""
