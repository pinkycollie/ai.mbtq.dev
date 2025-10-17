"""
Blender Character Creation Pipeline
Low-poly humanoid mesh optimized for real-time sign language animations
"""
import bpy
import bmesh
from mathlib import Vector


class SignLanguageCharacter:
    """Character creation pipeline for sign language avatars"""
    
    def __init__(self, name="SignAvatar", triangle_count=20000):
        self.name = name
        self.triangle_count = triangle_count
        self.character_mesh = None
        
    def create_base_mesh(self):
        """Create low-poly humanoid base mesh"""
        # Create base mesh using metaballs for organic form
        bpy.ops.object.metaball_add(type='BALL')
        head = bpy.context.active_object
        head.name = f"{self.name}_head"
        head.scale = (0.15, 0.15, 0.2)
        head.location = (0, 0, 1.7)
        
        # Create body
        bpy.ops.mesh.primitive_cube_add()
        body = bpy.context.active_object
        body.name = f"{self.name}_body"
        body.scale = (0.3, 0.2, 0.5)
        body.location = (0, 0, 1.2)
        
        # Create arms (important for sign language)
        self._create_arms()
        
        # Create hands with detailed topology
        self._create_detailed_hands()
        
        # Merge all parts
        self._merge_character_parts()
        
        # Optimize topology
        self._optimize_topology()
        
        return self.character_mesh
    
    def _create_arms(self):
        """Create arm meshes with proper topology for deformation"""
        for side in ['left', 'right']:
            x_offset = 0.5 if side == 'right' else -0.5
            
            # Upper arm
            bpy.ops.mesh.primitive_cylinder_add(
                vertices=8,
                radius=0.08,
                depth=0.4,
                location=(x_offset, 0, 1.4)
            )
            upper_arm = bpy.context.active_object
            upper_arm.name = f"{self.name}_{side}_upper_arm"
            upper_arm.rotation_euler[1] = 1.57  # 90 degrees
            
            # Forearm
            bpy.ops.mesh.primitive_cylinder_add(
                vertices=8,
                radius=0.07,
                depth=0.4,
                location=(x_offset, 0, 1.0)
            )
            forearm = bpy.context.active_object
            forearm.name = f"{self.name}_{side}_forearm"
            forearm.rotation_euler[1] = 1.57
    
    def _create_detailed_hands(self):
        """Create detailed hand meshes for clear sign language gestures"""
        for side in ['left', 'right']:
            x_offset = 0.5 if side == 'right' else -0.5
            
            # Palm
            bpy.ops.mesh.primitive_cube_add()
            palm = bpy.context.active_object
            palm.name = f"{self.name}_{side}_palm"
            palm.scale = (0.08, 0.12, 0.02)
            palm.location = (x_offset, 0, 0.8)
            
            # Fingers - create 5 fingers with 3 segments each
            finger_names = ['thumb', 'index', 'middle', 'ring', 'pinky']
            for i, finger_name in enumerate(finger_names):
                self._create_finger(side, finger_name, x_offset, i)
    
    def _create_finger(self, side, finger_name, x_offset, finger_index):
        """Create individual finger with 3 segments"""
        # Calculate finger position
        finger_x = x_offset + (finger_index - 2) * 0.02
        
        for segment in range(3):
            bpy.ops.mesh.primitive_cube_add()
            finger_seg = bpy.context.active_object
            finger_seg.name = f"{self.name}_{side}_{finger_name}_{segment}"
            finger_seg.scale = (0.01, 0.015, 0.005)
            finger_seg.location = (finger_x, 0, 0.8 + segment * 0.025)
    
    def _merge_character_parts(self):
        """Merge all character parts into single mesh"""
        # Select all character parts
        bpy.ops.object.select_all(action='DESELECT')
        for obj in bpy.data.objects:
            if obj.name.startswith(self.name):
                obj.select_set(True)
        
        # Join objects
        bpy.ops.object.join()
        self.character_mesh = bpy.context.active_object
        self.character_mesh.name = self.name
    
    def _optimize_topology(self):
        """Optimize mesh topology to target triangle count"""
        # Use decimation modifier to reach target triangle count
        if self.character_mesh:
            decimate = self.character_mesh.modifiers.new('Decimate', 'DECIMATE')
            decimate.decimate_type = 'COLLAPSE'
            
            # Calculate ratio to reach target triangle count
            current_tris = len(self.character_mesh.data.polygons)
            if current_tris > self.triangle_count:
                decimate.ratio = self.triangle_count / current_tris
            
            # Apply modifier
            bpy.ops.object.modifier_apply(modifier=decimate.name)
    
    def setup_uv_unwrapping(self):
        """Setup UV unwrapping for textures"""
        if self.character_mesh:
            bpy.context.view_layer.objects.active = self.character_mesh
            bpy.ops.object.mode_set(mode='EDIT')
            bpy.ops.mesh.select_all(action='SELECT')
            
            # Smart UV project for automatic unwrapping
            bpy.ops.uv.smart_project(angle_limit=66, island_margin=0.02)
            
            bpy.ops.object.mode_set(mode='OBJECT')
    
    def add_subdivision_surface(self):
        """Add subdivision surface for smooth appearance"""
        if self.character_mesh:
            subsurf = self.character_mesh.modifiers.new('Subdivision', 'SUBSURF')
            subsurf.levels = 1
            subsurf.render_levels = 2


def create_sign_language_avatar(name="SignAvatar", target_triangles=20000):
    """Main function to create a complete sign language avatar"""
    # Create character
    character = SignLanguageCharacter(name, target_triangles)
    mesh = character.create_base_mesh()
    
    # Setup UV mapping
    character.setup_uv_unwrapping()
    
    # Add subdivision surface
    character.add_subdivision_surface()
    
    print(f"Character '{name}' created successfully!")
    print(f"Mesh optimized for {target_triangles} triangles")
    print("Ready for rigging and animation!")
    
    return mesh


if __name__ == "__main__":
    avatar = create_sign_language_avatar("ASL_Avatar", 20000)
