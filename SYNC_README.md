# AiMetaverse Sync & Mapping System

## 🚀 Quick Start

### 1. Setup (First Time Only)

#### On Termux/Local Machine:
```bash
# Install required tools
pkg install git rclone jq -y  # Termux
# OR
sudo apt-get install git rclone jq -y  # Linux

# Configure rclone for Google Drive
rclone config
# Follow prompts to add "gdrive" remote pointing to your hempchoices@gmail account

# Clone or navigate to your repo
git clone https://github.com/hempchoices/AiMetaverse.git
cd AiMetaverse
```

### 2. Run Full Sync
```bash
./sync-automation.sh full
```

This will:
- ✅ Pull latest from GitHub
- ✅ Generate file manifest with checksums
- ✅ Map directory structure
- ✅ Sync to Google Drive (AiMetaverse/code folder)
- ✅ Create timestamped backup

### 3. Crawl & Map Files
```bash
python3 crawl-mapper.py .
```

This creates `file_manifest.json` with:
- Complete file inventory
- MD5 checksums for integrity
- File sizes and modification dates
- Directory structure tree
- Code analysis by type

---

## 📋 Available Commands

### Sync Automation (`sync-automation.sh`)

| Command | Description |
|---------|-------------|
| `./sync-automation.sh full` | Full bidirectional sync |
| `./sync-automation.sh github` | Pull from GitHub only |
| `./sync-automation.sh gdrive-up` | Push to Google Drive |
| `./sync-automation.sh gdrive-down` | Pull from Google Drive |
| `./sync-automation.sh manifest` | Generate file manifest |
| `./sync-automation.sh map` | Map directory structure |
| `./sync-automation.sh crawl` | Analyze code files |
| `./sync-automation.sh help` | Show help |

### File Crawler (`crawl-mapper.py`)

```bash
# Crawl current directory
python3 crawl-mapper.py

# Crawl specific directory
python3 crawl-mapper.py /path/to/project

# Output: file_manifest.json + console summary
```

---

## 🔄 Sync Flow Diagram

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   GitHub    │ ◄──► │   Local/Termux │ ◄──► │ Google Drive │
│             │      │  (workspace)  │      │  (rclone)    │
└─────────────┘      └──────────────┘      └─────────────┘
       ▲                      │                      │
       │                      ▼                      │
       │            ┌─────────────────┐              │
       └────────────│  File Manifest  │◄─────────────┘
                    │  (JSON mapping) │
                    └─────────────────┘
```

---

## 📁 Google Drive Structure

Your GDrive will have:
```
AiMetaverse/
├── code/              # Current synced code
│   ├── .github/
│   ├── package.json
│   ├── vercel.json
│   └── ...
└── backup_YYYYMMDD_HHMMSS/  # Timestamped backups
```

---

## 🔧 Configuration

Edit `sync-automation.sh` to customize:

```bash
GDRIVE_REMOTE="gdrive"           # Your rclone remote name
GITHUB_REPO="hempchoices/AiMetaverse"  # Your GitHub repo
```

---

## 📊 File Manifest Output

Example `file_manifest.json`:
```json
{
  "generated_at": "2026-06-04T22:16:21",
  "total_files": 7,
  "total_directories": 3,
  "files": [
    {
      "path": "package.json",
      "size": 283,
      "modified": "2026-06-04T22:04:07",
      "md5": "e1ec4a3b3a24c206d66c4e822b16f715"
    }
  ],
  "analysis": {
    "workflow_files": [".github/workflows/*.yml"],
    "config_files": ["package.json", "vercel.json"],
    "source_files": ["*.py", "*.js"],
    "scripts": ["*.sh"]
  }
}
```

---

## 🛠️ Troubleshooting

### rclone not configured?
```bash
rclone config
# Select "n" for new remote
# Name: gdrive
# Storage: Google Drive
# Follow OAuth setup instructions
```

### Permission denied?
```bash
chmod +x sync-automation.sh crawl-mapper.py
```

### Conflicts during pull?
The script auto-resolves with rebase. Manual fix:
```bash
git status
# Edit conflicted files
git add <files>
git rebase --continue
```

---

## 📈 Next Steps

1. **Automate**: Add to crontab for scheduled syncs
   ```bash
   crontab -e
   # Add: 0 */6 * * * cd /path/to/AiMetaverse && ./sync-automation.sh full
   ```

2. **Extend**: Add more analysis to `crawl-mapper.py`
   - Dependency tracking
   - Code metrics
   - Change detection

3. **Monitor**: Set up alerts for sync failures
   - Email notifications
   - Discord/Telegram webhooks

---

**Created by:** Constellation25 Agent  
**Version:** 1.0.0  
**Last Updated:** 2026-06-04
