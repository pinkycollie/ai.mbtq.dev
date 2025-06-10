"""
Marketplace module for extending the application with plugins.
"""
import os
import json
import importlib
import logging
from pathlib import Path
from typing import Dict, List, Any, Optional, Callable

logger = logging.getLogger(__name__)

class Plugin:
    """Base class for marketplace plugins."""
    
    def __init__(self, plugin_id: str, name: str, description: str, version: str, author: str):
        self.id = plugin_id
        self.name = name
        self.description = description
        self.version = version
        self.author = author
        self.enabled = False
    
    def initialize(self) -> bool:
        """Initialize the plugin."""
        return True
    
    def shutdown(self) -> bool:
        """Shutdown the plugin."""
        return True
    
    def get_info(self) -> Dict[str, Any]:
        """Get plugin information."""
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "version": self.version,
            "author": self.author,
            "enabled": self.enabled,
        }

class MarketplaceManager:
    """Manager for marketplace plugins."""
    
    def __init__(self, plugins_dir: str = "app/marketplace/plugins"):
        self.plugins_dir = Path(plugins_dir)
        self.plugins: Dict[str, Plugin] = {}
        self.hooks: Dict[str, List[Callable]] = {}
        
        # Create plugins directory if it doesn't exist
        self.plugins_dir.mkdir(parents=True, exist_ok=True)
    
    def discover_plugins(self) -> List[Dict[str, Any]]:
        """Discover available plugins."""
        discovered_plugins = []
        
        for plugin_dir in self.plugins_dir.iterdir():
            if not plugin_dir.is_dir():
                continue
            
            # Check for plugin.json
            plugin_json = plugin_dir.joinpath("plugin.json")
            if not plugin_json.exists():
                continue
            
            try:
                with open(plugin_json, "r") as f:
                    plugin_info = json.load(f)
                
                plugin_id = plugin_dir.name
                discovered_plugins.append({
                    "id": plugin_id,
                    "name": plugin_info.get("name", plugin_id),
                    "description": plugin_info.get("description", ""),
                    "version": plugin_info.get("version", "1.0.0"),
                    "author": plugin_info.get("author", ""),
                    "enabled": plugin_id in self.plugins,
                })
            except Exception as e:
                logger.error(f"Error loading plugin {plugin_dir.name}: {e}")
        
        return discovered_plugins
    
    def load_plugin(self, plugin_id: str) -> bool:
        """Load a plugin by ID."""
        if plugin_id in self.plugins:
            logger.warning(f"Plugin {plugin_id} is already loaded")
            return True
        
        plugin_dir = self.plugins_dir / plugin_id
        if not plugin_dir.exists() or not plugin_dir.is_dir():
            logger.error(f"Plugin directory {plugin_id} not found")
            return False
        
        # Check for plugin.json
        plugin_json = plugin_dir / "plugin.json"
        if not plugin_json.exists():
            logger.error(f"Plugin {plugin_id} is missing plugin.json")
            return False
        
        try:
            # Load plugin info
            with open(plugin_json, "r") as f:
                plugin_info = json.load(f)
            
            # Check for main module
            main_module = plugin_info.get("main", "main")
            module_path = f"app.marketplace.plugins.{plugin_id}.{main
