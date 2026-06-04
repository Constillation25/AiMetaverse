#!/usr/bin/env python3
"""
File Crawler and Mapper for AiMetaverse Project
Scans, analyzes, and maps all files in the repository
"""

import os
import json
import hashlib
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Any

class FileCrawler:
    def __init__(self, root_dir: str = "."):
        self.root_dir = Path(root_dir).resolve()
        self.exclude_patterns = [
            '.git',
            'node_modules',
            '__pycache__',
            '*.log',
            '.venv',
            'venv',
            'dist',
            'build'
        ]
        self.file_map: Dict[str, Any] = {}
        self.stats = {
            'total_files': 0,
            'total_dirs': 0,
            'total_size': 0,
            'by_extension': {},
            'by_directory': {}
        }
    
    def should_exclude(self, path: Path) -> bool:
        """Check if path should be excluded"""
        path_str = str(path)
        for pattern in self.exclude_patterns:
            if pattern.startswith('*'):
                if path.name.endswith(pattern[1:]):
                    return True
            elif pattern in path.parts:
                return True
        return False
    
    def get_file_hash(self, filepath: Path) -> str:
        """Calculate MD5 hash of file"""
        try:
            hash_md5 = hashlib.md5()
            with open(filepath, "rb") as f:
                for chunk in iter(lambda: f.read(4096), b""):
                    hash_md5.update(chunk)
            return hash_md5.hexdigest()
        except Exception as e:
            return f"error: {str(e)}"
    
    def get_file_info(self, filepath: Path) -> Dict[str, Any]:
        """Get detailed file information"""
        stat = filepath.stat()
        return {
            'path': str(filepath.relative_to(self.root_dir)),
            'size': stat.st_size,
            'modified': datetime.fromtimestamp(stat.st_mtime).isoformat(),
            'created': datetime.fromtimestamp(stat.st_ctime).isoformat(),
            'md5': self.get_file_hash(filepath),
            'extension': filepath.suffix.lower(),
            'is_binary': self.is_binary(filepath)
        }
    
    def is_binary(self, filepath: Path) -> bool:
        """Check if file is binary"""
        try:
            with open(filepath, 'rb') as f:
                chunk = f.read(1024)
                if b'\x00' in chunk:
                    return True
            return False
        except:
            return True
    
    def crawl(self) -> None:
        """Crawl through all files and build map"""
        print(f"🔍 Crawling directory: {self.root_dir}")
        
        for root, dirs, files in os.walk(self.root_dir):
            root_path = Path(root)
            
            # Filter out excluded directories
            dirs[:] = [d for d in dirs if not self.should_exclude(root_path / d)]
            
            # Process directories
            if not self.should_exclude(root_path):
                rel_path = str(root_path.relative_to(self.root_dir))
                self.stats['total_dirs'] += 1
                self.stats['by_directory'][rel_path] = {
                    'files': [],
                    'subdirs': []
                }
            
            # Process files
            for file in files:
                filepath = root_path / file
                
                if self.should_exclude(filepath):
                    continue
                
                file_info = self.get_file_info(filepath)
                rel_path = str(filepath.relative_to(self.root_dir))
                
                # Add to file map
                self.file_map[rel_path] = file_info
                
                # Update stats
                self.stats['total_files'] += 1
                self.stats['total_size'] += file_info['size']
                
                ext = file_info['extension']
                self.stats['by_extension'][ext] = self.stats['by_extension'].get(ext, 0) + 1
                
                # Add to directory mapping
                parent_dir = str(filepath.parent.relative_to(self.root_dir))
                if parent_dir in self.stats['by_directory']:
                    self.stats['by_directory'][parent_dir]['files'].append(rel_path)
        
        print(f"✅ Crawled {self.stats['total_files']} files in {self.stats['total_dirs']} directories")
    
    def analyze_code_structure(self) -> Dict[str, Any]:
        """Analyze code structure and patterns"""
        analysis = {
            'workflow_files': [],
            'config_files': [],
            'source_files': [],
            'documentation': [],
            'scripts': []
        }
        
        for path, info in self.file_map.items():
            if '.github/workflows' in path:
                analysis['workflow_files'].append(path)
            elif path.endswith(('.json', '.yaml', '.yml', '.toml')) and 'workflow' not in path:
                analysis['config_files'].append(path)
            elif path.endswith(('.py', '.js', '.ts', '.jsx', '.tsx')):
                analysis['source_files'].append(path)
            elif path.endswith(('.md', '.rst', '.txt')):
                analysis['documentation'].append(path)
            elif path.endswith('.sh'):
                analysis['scripts'].append(path)
        
        return analysis
    
    def generate_manifest(self, output_file: str = "file_manifest.json") -> None:
        """Generate complete file manifest"""
        manifest = {
            'generated_at': datetime.now().isoformat(),
            'root_directory': str(self.root_dir),
            'statistics': self.stats,
            'files': self.file_map,
            'analysis': self.analyze_code_structure()
        }
        
        with open(output_file, 'w') as f:
            json.dump(manifest, f, indent=2)
        
        print(f"📄 Manifest generated: {output_file}")
    
    def generate_tree(self, max_depth: int = 3) -> str:
        """Generate directory tree visualization"""
        tree_lines = []
        
        def add_to_tree(path: Path, prefix: str = "", depth: int = 0):
            if depth > max_depth:
                return
            
            if not path.exists() or self.should_exclude(path):
                return
            
            items = sorted([p for p in path.iterdir() 
                          if not self.should_exclude(p)], 
                          key=lambda x: (not x.is_dir(), x.name.lower()))
            
            for i, item in enumerate(items):
                is_last = i == len(items) - 1
                connector = "└── " if is_last else "├── "
                tree_lines.append(f"{prefix}{connector}{item.name}")
                
                if item.is_dir():
                    extension = "    " if is_last else "│   "
                    add_to_tree(item, prefix + extension, depth + 1)
        
        tree_lines.append(str(self.root_dir.name) + "/")
        add_to_tree(self.root_dir)
        
        return "\n".join(tree_lines)
    
    def print_summary(self) -> None:
        """Print summary of crawled files"""
        print("\n" + "="*60)
        print("📊 FILE SYSTEM SUMMARY")
        print("="*60)
        print(f"Total Files:       {self.stats['total_files']}")
        print(f"Total Directories: {self.stats['total_dirs']}")
        print(f"Total Size:        {self.stats['total_size'] / 1024:.2f} KB")
        
        print("\n📁 Files by Extension:")
        for ext, count in sorted(self.stats['by_extension'].items(), 
                                key=lambda x: x[1], reverse=True):
            print(f"  {ext or '(no ext)':<15} {count:>5}")
        
        print("\n🌳 Directory Structure:")
        print(self.generate_tree())
        
        analysis = self.analyze_code_structure()
        print("\n📋 Code Analysis:")
        print(f"  Workflow Files:    {len(analysis['workflow_files'])}")
        print(f"  Config Files:      {len(analysis['config_files'])}")
        print(f"  Source Files:      {len(analysis['source_files'])}")
        print(f"  Documentation:     {len(analysis['documentation'])}")
        print(f"  Scripts:           {len(analysis['scripts'])}")
        
        print("="*60)


def main():
    import sys
    
    root_dir = sys.argv[1] if len(sys.argv) > 1 else "."
    
    crawler = FileCrawler(root_dir)
    crawler.crawl()
    crawler.print_summary()
    crawler.generate_manifest()
    
    print("\n✅ Crawling complete!")
    print("📄 Check file_manifest.json for detailed mapping")


if __name__ == "__main__":
    main()
