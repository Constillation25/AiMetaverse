#!/bin/bash
# Sync Automation Script for GitHub ↔ GDrive ↔ Termux
# Author: Constellation25 Agent
# Version: 1.0.0

set -e

# Configuration
GDRIVE_REMOTE="gdrive"  # Your rclone gdrive remote name
GITHUB_REPO="hempchoices/AiMetaverse"  # Update with your actual repo
LOCAL_DIR="$(pwd)"
SYNC_LOG="/tmp/sync_log_$(date +%Y%m%d_%H%M%S).txt"
MANIFEST_FILE="file_manifest.json"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$SYNC_LOG"
}

success() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')] ✓${NC} $1" | tee -a "$SYNC_LOG"
}

warning() {
    echo -e "${YELLOW}[$(date '+%Y-%m-%d %H:%M:%S')] ⚠${NC} $1" | tee -a "$SYNC_LOG"
}

error() {
    echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')] ✗${NC} $1" | tee -a "$SYNC_LOG"
}

# Check prerequisites
check_prerequisites() {
    log "Checking prerequisites..."
    
    if ! command -v git &> /dev/null; then
        error "git is not installed"
        exit 1
    fi
    
    if ! command -v rclone &> /dev/null; then
        error "rclone is not installed"
        exit 1
    fi
    
    if ! command -v jq &> /dev/null; then
        warning "jq not found, installing..."
        if command -v apt-get &> /dev/null; then
            sudo apt-get update && sudo apt-get install -y jq
        elif command -v pkg &> /dev/null; then
            pkg install jq -y
        fi
    fi
    
    # Check rclone configuration
    if ! rclone listremotes | grep -q "$GDRIVE_REMOTE"; then
        error "rclone remote '$GDRIVE_REMOTE' not configured"
        echo "Please run: rclone config"
        echo "Then add a Google Drive remote named '$GDRIVE_REMOTE'"
        exit 1
    fi
    
    success "All prerequisites met"
}

# Pull latest from GitHub
sync_from_github() {
    log "Syncing from GitHub..."
    
    if [ -d ".git" ]; then
        git fetch origin
        git pull origin main --rebase || {
            warning "Pull had conflicts, resolving..."
            git rebase --abort || true
            git pull origin main
        }
        success "Pulled latest from GitHub"
    else
        warning "Not a git repository, cloning..."
        git clone "https://github.com/$GITHUB_REPO.git" temp_clone
        mv temp_clone/* . 2>/dev/null || true
        mv temp_clone/.* . 2>/dev/null || true
        rm -rf temp_clone
        success "Cloned repository from GitHub"
    fi
}

# Sync to Google Drive
sync_to_gdrive() {
    log "Syncing to Google Drive..."
    
    # Create backup before sync
    rclone copy "$LOCAL_DIR" "$GDRIVE_REMOTE:AiMetaverse/backup_$(date +%Y%m%d_%H%M%S)" \
        --exclude ".git/**" \
        --exclude "node_modules/**" \
        --exclude "*.log" \
        --transfers=4 \
        --checkers=8 \
        --progress
    
    # Main sync
    rclone sync "$LOCAL_DIR" "$GDRIVE_REMOTE:AiMetaverse/code" \
        --exclude ".git/**" \
        --exclude "node_modules/**" \
        --exclude "*.log" \
        --exclude "__pycache__/**" \
        --exclude ".venv/**" \
        --exclude "venv/**" \
        --transfers=4 \
        --checkers=8 \
        --progress
    
    success "Synced to Google Drive"
}

# Sync from Google Drive (for Termux)
sync_from_gdrive() {
    log "Syncing from Google Drive..."
    
    rclone sync "$GDRIVE_REMOTE:AiMetaverse/code" "$LOCAL_DIR" \
        --exclude ".git/**" \
        --exclude "node_modules/**" \
        --exclude "*.log" \
        --transfers=4 \
        --checkers=8 \
        --progress
    
    success "Synced from Google Drive"
}

# Generate file manifest
generate_manifest() {
    log "Generating file manifest..."
    
    local timestamp=$(date -Iseconds)
    local total_files=$(find . -type f -not -path "./.git/*" -not -path "./node_modules/*" | wc -l)
    local total_dirs=$(find . -type d -not -path "./.git/*" -not -path "./node_modules/*" | wc -l)
    
    cat > "$MANIFEST_FILE" << EOF
{
  "generated_at": "$timestamp",
  "repository": "$GITHUB_REPO",
  "total_files": $total_files,
  "total_directories": $total_dirs,
  "files": [
EOF
    
    find . -type f -not -path "./.git/*" -not -path "./node_modules/*" -not -name "$MANIFEST_FILE" | sort | while read -r file; do
        local size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null || echo "0")
        local modified=$(stat -f%Sm -t%Y-%m-%dT%H:%M:%S%z "$file" 2>/dev/null || stat -c%y "$file" 2>/dev/null | cut -d' ' -f1,2 | sed 's/ /T/' || echo "")
        local checksum=$(md5sum "$file" 2>/dev/null | cut -d' ' -f1 || md5 -q "$file" 2>/dev/null || echo "")
        
        echo "    {\"path\": \"$file\", \"size\": $size, \"modified\": \"$modified\", \"md5\": \"$checksum\"},"
    done | sed '$ s/,$//' >> "$MANIFEST_FILE"
    
    cat >> "$MANIFEST_FILE" << EOF

  ]
}
EOF
    
    success "Generated manifest: $MANIFEST_FILE"
}

# Map directory structure
map_structure() {
    log "Mapping directory structure..."
    
    tree -I '.git|node_modules|*.log' -J -L 3 2>/dev/null || {
        warning "tree not available, using find..."
        find . -type d -not -path "./.git/*" -not -path "./node_modules/*" | head -50
    }
    
    success "Directory structure mapped"
}

# Full bidirectional sync
full_sync() {
    log "Starting full bidirectional sync..."
    
    check_prerequisites
    sync_from_github
    generate_manifest
    map_structure
    sync_to_gdrive
    
    success "Full sync completed!"
    echo ""
    echo "Summary:"
    echo "  - Log file: $SYNC_LOG"
    echo "  - Manifest: $MANIFEST_FILE"
    echo "  - Files synced: $(find . -type f -not -path "./.git/*" -not -path "./node_modules/*" | wc -l)"
}

# Crawl and analyze files
crawl_files() {
    log "Crawling and analyzing files..."
    
    local analysis_file="file_analysis_$(date +%Y%m%d_%H%M%S).json"
    
    echo "{" > "$analysis_file"
    echo "  \"scan_time\": \"$(date -Iseconds)\"," >> "$analysis_file"
    echo "  \"languages\": {" >> "$analysis_file"
    
    # Count files by extension
    local json_count=$(find . -name "*.json" -not -path "./.git/*" | wc -l)
    local yml_count=$(find . -name "*.yml" -o -name "*.yaml" -not -path "./.git/*" | wc -l)
    local py_count=$(find . -name "*.py" -not -path "./.git/*" | wc -l)
    local js_count=$(find . -name "*.js" -o -name "*.ts" -not -path "./.git/*" | wc -l)
    local md_count=$(find . -name "*.md" -not -path "./.git/*" | wc -l)
    local sh_count=$(find . -name "*.sh" -not -path "./.git/*" | wc -l)
    
    echo "    \"json\": $json_count," >> "$analysis_file"
    echo "    \"yaml\": $yml_count," >> "$analysis_file"
    echo "    \"python\": $py_count," >> "$analysis_file"
    echo "    \"javascript\": $js_count," >> "$analysis_file"
    echo "    \"markdown\": $md_count," >> "$analysis_file"
    echo "    \"shell\": $sh_count" >> "$analysis_file"
    
    echo "  }," >> "$analysis_file"
    echo "  \"workflow_files\": [" >> "$analysis_file"
    
    find .github/workflows -name "*.yml" -not -path "./.git/*" 2>/dev/null | while read -r wf; do
        echo "    \"$wf\"," >> "$analysis_file"
    done | sed '$ s/,$//' >> "$analysis_file"
    
    echo "  ]" >> "$analysis_file"
    echo "}" >> "$analysis_file"
    
    success "Analysis complete: $analysis_file"
}

# Show usage
show_usage() {
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  full        - Full bidirectional sync (GitHub → Local → GDrive)"
    echo "  github      - Sync from GitHub only"
    echo "  gdrive-up   - Sync local to GDrive"
    echo "  gdrive-down - Sync from GDrive to local"
    echo "  manifest    - Generate file manifest"
    echo "  map         - Map directory structure"
    echo "  crawl       - Crawl and analyze files"
    echo "  help        - Show this help message"
    echo ""
}

# Main execution
case "${1:-full}" in
    full)
        full_sync
        ;;
    github)
        check_prerequisites
        sync_from_github
        ;;
    gdrive-up)
        check_prerequisites
        sync_to_gdrive
        ;;
    gdrive-down)
        check_prerequisites
        sync_from_gdrive
        ;;
    manifest)
        generate_manifest
        ;;
    map)
        map_structure
        ;;
    crawl)
        crawl_files
        ;;
    help|--help|-h)
        show_usage
        ;;
    *)
        error "Unknown command: $1"
        show_usage
        exit 1
        ;;
esac
