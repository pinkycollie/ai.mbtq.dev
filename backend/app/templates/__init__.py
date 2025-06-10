"""
Templates module for quick project scaffolding.
"""
import os
import shutil
import json
from pathlib import Path
from typing import Dict, List, Any, Optional

class TemplateManager:
    """Manager for project templates."""
    
    def __init__(self, templates_dir: str = "app/templates"):
        self.templates_dir = Path(templates_dir)
        self.templates = self._load_templates()
    
    def _load_templates(self) -> Dict[str, Dict[str, Any]]:
        """Load available templates."""
        templates = {}
        
        if not self.templates_dir.exists():
            return templates
        
        for template_dir in self.templates_dir.iterdir():
            if not template_dir.is_dir():
                continue
            
            # Check for template.json
            template_json = template_dir.joinpath("template.json")
            if not template_json.exists():
                continue
            
            try:
                with open(template_json, "r") as f:
                    template_info = json.load(f)
                
                template_name = template_dir.name
                templates[template_name] = {
                    "name": template_info.get("name", template_name),
                    "description": template_info.get("description", ""),
                    "version": template_info.get("version", "1.0.0"),
                    "author": template_info.get("author", ""),
                    "tags": template_info.get("tags", []),
                    "path": template_dir,
                }
            except Exception as e:
                print(f"Error loading template {template_dir.name}: {e}")
        
        return templates
    
    def list_templates(self) -> List[Dict[str, Any]]:
        """List all available templates."""
        return [
            {
                "id": template_id,
                "name": template["name"],
                "description": template["description"],
                "version": template["version"],
                "author": template["author"],
                "tags": template["tags"],
            }
            for template_id, template in self.templates.items()
        ]
    
    def get_template(self, template_id: str) -> Optional[Dict[str, Any]]:
        """Get template by ID."""
        return self.templates.get(template_id)
    
    def create_from_template(
        self, 
        template_id: str, 
        destination: str, 
        variables: Optional[Dict[str, str]] = None
    ) -> bool:
        """Create a new project from a template."""
        template = self.get_template(template_id)
        if not template:
            return False
        
        template_path = template["path"]
        destination_path = Path(destination)
        
        # Create destination directory if it doesn't exist
        destination_path.mkdir(parents=True, exist_ok=True)
        
        # Copy template files
        for item in template_path.glob("**/*"):
            if item.name == "template.json":
                continue
            
            relative_path = item.relative_to(template_path)
            target_path = destination_path / relative_path
            
            if item.is_dir():
                target_path.mkdir(parents=True, exist_ok=True)
            else:
                # Process template variables if needed
                if variables and item.suffix in [".py", ".js", ".ts", ".html", ".md", ".txt", ".json"]:
                    with open(item, "r") as f:
                        content = f.read()
                    
                    # Replace template variables
                    for key, value in variables.items():
                        content = content.replace(f"{{{{ {key} }}}}", value)
                    
                    with open(target_path, "w") as f:
                        f.write(content)
                else:
                    shutil.copy2(item, target_path)
        
        return True

# Create global template manager instance
template_manager = TemplateManager()
