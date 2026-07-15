#!/usr/bin/env bash
# Setup script for local/no-key MCP servers
# These servers work immediately without external API keys

set -e

echo "🚀 Setting up local/no-key MCP servers..."

# Check for required tools
check_tool() {
    if ! command -v "$1" &> /dev/null; then
        echo "⚠️  $1 not found. Please install it first."
        MISSING_TOOLS+=("$1")
    else
        echo "✅ $1 found"
    fi
}

MISSING_TOOLS=()

echo ""
echo "📋 Checking required tools..."
check_tool "node"
check_tool "npm"
check_tool "python3"
check_tool "docker"

if [ ${#MISSING_TOOLS[@]} -ne 0 ]; then
    echo ""
    echo "⚠️  Missing tools: ${MISSING_TOOLS[*]}"
    echo "Please install the missing tools and run this script again."
    exit 1
fi

echo ""
echo "✅ All required tools found!"

# Create MCP config directory
MCP_CONFIG_DIR="$HOME/.config/mcp"
mkdir -p "$MCP_CONFIG_DIR"

# Generate the configuration file for local/no-key servers
cat > "$MCP_CONFIG_DIR/local-servers-config.json" << 'EOF'
{
  "mcpServers": {
    "desktop-commander": {
      "command": "npx",
      "args": ["-y", "@wonderwhy-er/desktop-commander"],
      "description": "Terminal commands, file operations, and process management"
    },
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "@chrome-devtools/mcp"],
      "description": "Chrome DevTools integration for browser debugging"
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp"],
      "description": "Browser automation using accessibility trees"
    },
    "searxng-search": {
      "command": "npx",
      "args": ["-y", "searxng-mcp"],
      "env": {
        "SEARXNG_URL": "https://searx.be"
      },
      "description": "Privacy-respecting web search (using public instance)"
    },
    "sqlite-local": {
      "command": "npx",
      "args": ["-y", "sqlite-mcp"],
      "env": {
        "SQLITE_DB_PATH": "./local.db"
      },
      "description": "Local SQLite database operations"
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem"],
      "args-additional": ["--allowed-dirs", "."],
      "description": "Safe filesystem access within allowed directories"
    },
    "git": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-git"],
      "description": "Git repository operations"
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"],
      "description": "Persistent memory for AI agents"
    },
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "note": "Requires BRAVE_SEARCH_API_KEY env var, but free tier available",
      "description": "Web search using Brave Search"
    },
    "fetch": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"],
      "description": "Fetch and read web content"
    },
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"],
      "description": "Browser automation with Puppeteer"
    },
    "google-maps": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-google-maps"],
      "note": "Requires GOOGLE_MAPS_API_KEY but free tier available",
      "description": "Google Maps geocoding and places"
    }
  }
}
EOF

echo ""
echo "📄 Configuration file created at: $MCP_CONFIG_DIR/local-servers-config.json"

# Install Playwright browsers
echo ""
echo "🌐 Installing Playwright browsers..."
npx playwright install --with-deps chromium 2>/dev/null || echo "⚠️  Playwright browser installation skipped (may require sudo)"

# Create a sample SQLite database
echo ""
echo "💾 Creating sample SQLite database..."
python3 -c "
import sqlite3
conn = sqlite3.connect('./local.db')
cursor = conn.cursor()
cursor.execute('CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, content TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)')
cursor.execute(\"INSERT INTO notes (content) VALUES ('Sample note created by MCP setup')\")
conn.commit()
conn.close()
print('✅ Sample SQLite database created')
"

# Create allowed directories for filesystem server
ALLOWED_DIRS="$HOME/mcp-workspace"
mkdir -p "$ALLOWED_DIRS"
echo ""
echo "📁 Created allowed directory for filesystem operations: $ALLOWED_DIRS"

# Generate .env file template
cat > "$MCP_CONFIG_DIR/.env.local" << 'EOF'
# Optional API keys for enhanced functionality (free tiers available)
# Uncomment and add your keys if you want to enable these features

# BRAVE_SEARCH_API_KEY=your_brave_search_key_here
# GOOGLE_MAPS_API_KEY=your_google_maps_key_here
# SEARXNG_URL=https://searx.be

# Local database path
SQLITE_DB_PATH=./local.db
EOF

echo ""
echo "🔑 Environment template created at: $MCP_CONFIG_DIR/.env.local"

# Instructions
cat << 'INSTRUCTIONS'

✅ Setup Complete!

📦 Installed Local/No-Key MCP Servers:
   • Desktop Commander - Terminal & file operations
   • Chrome DevTools - Browser debugging
   • Playwright - Browser automation
   • SearXNG Search - Privacy-respecting web search
   • SQLite Local - Local database operations
   • Filesystem - Safe file access
   • Git - Git repository operations
   • Memory - Persistent agent memory
   • Fetch - Web content retrieval
   • Puppeteer - Browser automation

📍 Configuration file: ~/.config/mcp/local-servers-config.json

🔧 To use this configuration:

1. For Claude Desktop:
   - Copy the config to: ~/Library/Application Support/Claude/claude_desktop_config.json (macOS)
   - Or: %APPDATA%\Claude\claude_desktop_config.json (Windows)

2. For Cursor:
   - Go to Settings → MCP → Add Configuration
   - Point to the config file or paste its contents

3. For other MCP clients:
   - Refer to their documentation for loading MCP configurations

💡 Optional Enhancements:
   - Get a free Brave Search API key: https://brave.com/search/api/
   - Get a free Google Maps API key: https://developers.google.com/maps/documentation/javascript/get-api-key
   - Add them to ~/.config/mcp/.env.local

🚀 Start your AI assistant and enjoy local MCP server functionality!

INSTRUCTIONS

echo ""
echo "🎉 All done! Your local MCP servers are ready to use."
