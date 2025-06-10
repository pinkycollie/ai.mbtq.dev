#!/usr/bin/env python3
"""
Sync local development files with Replit.
This script helps maintain a consistent development environment between
local machine and Replit.
"""

import os
import sys
import argparse
import subprocess
import json
import time
from pathlib import Path
from typing import List, Dict, Any, Optional

# Configuration
DEFAULT_REPLIT_USERNAME = os.getenv("REPLIT_USERNAME", "")
DEFAULT_REPLIT_APP_NAME = os.getenv("REPLIT_APP_NAME", "")
IGNORE_PATTERNS = [
    "__pycache__",
    "*.pyc",
    ".git",
    ".env",
    "venv",
    ".venv",
    "node_modules",
    ".DS_Store",
    "*.log",
]

def check_replit_cli():
    """Check if Replit CLI is installed."""
    try:
        subprocess.run(["replit", "--version"], capture_output=True, check=True)
        return True
    except (subprocess.SubprocessError, FileNotFoundError):
        print("Replit CLI not found. Please install it first:")
        print("npm install -g replit-cli")
        return False

def login_to_replit():
    """Login to Replit CLI."""
    try:
        subprocess.run(["replit", "auth"], check=True)
        print("Successfully logged in to Replit")
        return True
    except subprocess.SubprocessError:
        print("Failed to login to Replit")
        return False

def get_replit_info() -> Dict[str, str]:
    """Get Replit username and app name."""
    username = input(f"Enter Replit username [{DEFAULT_REPLIT_USERNAME}]: ") or DEFAULT_REPLIT_USERNAME
    app_name = input(f"Enter Replit app name [{DEFAULT_REPLIT_APP_NAME}]: ") or DEFAULT_REPLIT_APP_NAME
    
    if not username or not app_name:
        print("Error: Replit username and app name are required")
        sys.exit(1)
    
    return {"username": username, "app_name": app_name}

def create_ignore_file(ignore_patterns: List[str]):
    """Create a .replitignore file."""
    with open(".replitignore", "w") as f:
        for pattern in ignore_patterns:
            f.write(f"{pattern}\n")
    print("Created .replitignore file")

def sync_to_replit(replit_info: Dict[str, str]):
    """Sync local files to Replit."""
    repl_id = f"{replit_info['username']}/{replit_info['app_name']}"
    
    print(f"Syncing to Replit: {repl_id}")
    
    try:
        # Create .replitignore if it doesn't exist
        if not os.path.exists(".replitignore"):
            create_ignore_file(IGNORE_PATTERNS)
        
        # Sync files
        result = subprocess.run(
            ["replit", "sync", "--repl", repl_id],
            capture_output=True,
            text=True,
            check=True
        )
        
        print(result.stdout)
        print("Sync completed successfully")
        return True
    except subprocess.SubprocessError as e:
        print(f"Error syncing to Replit: {e}")
        if hasattr(e, 'stdout'):
            print(e.stdout)
        if hasattr(e, 'stderr'):
            print(e.stderr)
        return False

def sync_from_replit(replit_info: Dict[str, str]):
    """Sync files from Replit to local."""
    repl_id = f"{replit_info['username']}/{replit_info['app_name']}"
    
    print(f"Syncing from Replit: {repl_id}")
    
    try:
        # Create .replitignore if it doesn't exist
        if not os.path.exists(".replitignore"):
            create_ignore_file(IGNORE_PATTERNS)
        
        # Sync files
        result = subprocess.run(
            ["replit", "pull", "--repl", repl_id],
            capture_output=True,
            text=True,
            check=True
        )
        
        print(result.stdout)
        print("Sync completed successfully")
        return True
    except subprocess.SubprocessError as e:
        print(f"Error syncing from Replit: {e}")
        if hasattr(e, 'stdout'):
            print(e.stdout)
        if hasattr(e, 'stderr'):
            print(e.stderr)
        return False

def watch_and_sync(replit_info: Dict[str, str]):
    """Watch for file changes and sync to Replit."""
    try:
        from watchdog.observers import Observer
        from watchdog.events import FileSystemEventHandler
    except ImportError:
        print("watchdog package not found. Please install it:")
        print("pip install watchdog")
        return False
    
    class SyncHandler(FileSystemEventHandler):
        def on_modified(self, event):
            if event.is_directory:
                return
            
            # Check if file should be ignored
            for pattern in IGNORE_PATTERNS:
                if pattern.startswith("*"):
                    if event.src_path.endswith(pattern[1:]):
                        return
                elif pattern in event.src_path:
                    return
            
            print(f"File changed: {event.src_path}")
            sync_to_replit(replit_info)
    
    observer = Observer()
    observer.schedule(SyncHandler(), ".", recursive=True)
    observer.start()
    
    print("Watching for file changes. Press Ctrl+C to stop.")
    
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    
    observer.join()
    return True

def setup_env_sync(replit_info: Dict[str, str]):
    """Sync environment variables to Replit."""
    if not os.path.exists(".env"):
        print("No .env file found")
        return False
    
    print("Syncing environment variables to Replit")
    
    try:
        # Read local .env file
        env_vars = {}
        with open(".env", "r") as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith("#"):
                    continue
                
                key, value = line.split("=", 1)
                env_vars[key.strip()] = value.strip()
        
        # Set environment variables in Replit
        repl_id = f"{replit_info['username']}/{replit_info['app_name']}"
        
        for key, value in env_vars.items():
            print(f"Setting {key}...")
            subprocess.run(
                ["replit", "env", "set", "--repl", repl_id, key, value],
                capture_output=True,
                check=True
            )
        
        print("Environment variables synced successfully")
        return True
    except Exception as e:
        print(f"Error syncing environment variables: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description="Sync local development with Replit")
    parser.add_argument("--to", action="store_true", help="Sync local files to Replit")
    parser.add_argument("--from", dest="from_replit", action="store_true", help="Sync files from Replit to local")
    parser.add_argument("--watch", action="store_true", help="Watch for file changes and sync to Replit")
    parser.add_argument("--env", action="store_true", help="Sync environment variables to Replit")
    
    args = parser.parse_args()
    
    if not check_replit_cli():
        return
    
    if not login_to_replit():
        return
    
    replit_info = get_replit_info()
    
    if args.to:
        sync_to_replit(replit_info)
    elif args.from_replit:
        sync_from_replit(replit_info)
    elif args.watch:
        watch_and_sync(replit_info)
    elif args.env:
        setup_env_sync(replit_info)
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
