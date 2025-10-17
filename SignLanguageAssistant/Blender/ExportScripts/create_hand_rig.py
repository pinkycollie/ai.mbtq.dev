"""
Blender Python Script - Automated Hand Rig
Creates advanced finger bone chains with IK controls and shape keys for ASL/BSL signing
"""
import bpy
import bmesh
from mathlib import Vector, Matrix


class HandRigCreator:
    """Advanced hand rigging system for sign language animations"""
    
    def __init__(self, armature_name="HandRig"):
        self.armature_name = armature_name
        self.bone_chains = {}
        
    def create_hand_rig(self):
        """Main function to create the complete hand rig"""
        # Create armature object
        bpy.ops.object.armature_add()
        armature = bpy.context.active_object
        armature.name = self.armature_name
        
        # Enter edit mode to create bones
        bpy.ops.object.mode_set(mode='EDIT')
        
        # Create finger bone chains
        self._create_finger_chains()
        
        # Add IK controls for precise positioning
        self._add_ik_controls()
        
        # Create shape keys for handshape morphs
        self._create_shape_keys()
        
        # Add custom controllers for animators
        self._add_custom_controllers()
        
        # Exit edit mode
        bpy.ops.object.mode_set(mode='OBJECT')
        
        return armature
    
    def _create_finger_chains(self):
        """Create bone chains for all fingers"""
        fingers = ['thumb', 'index', 'middle', 'ring', 'pinky']
        base_positions = {
            'thumb': Vector((-0.5, 0, 0)),
            'index': Vector((-0.25, 0, 0)),
            'middle': Vector((0, 0, 0)),
            'ring': Vector((0.25, 0, 0)),
            'pinky': Vector((0.5, 0, 0))
        }
        
        for finger in fingers:
            chain = []
            base_pos = base_positions[finger]
            
            # Create 3 bones per finger (metacarpal, proximal, distal)
            for i, segment in enumerate(['meta', 'prox', 'dist']):
                bone_name = f"{finger}_{segment}"
                bone = bpy.context.active_object.data.edit_bones.new(bone_name)
                
                # Position bones
                bone.head = base_pos + Vector((0, i * 0.3, 0))
                bone.tail = base_pos + Vector((0, (i + 1) * 0.3, 0))
                
                # Parent to previous bone in chain
                if i > 0:
                    bone.parent = chain[i - 1]
                
                chain.append(bone)
            
            self.bone_chains[finger] = chain
    
    def _add_ik_controls(self):
        """Add Inverse Kinematics controls for precise finger positioning"""
        for finger, chain in self.bone_chains.items():
            # Create IK target bone
            ik_target = bpy.context.active_object.data.edit_bones.new(f"{finger}_IK_target")
            ik_target.head = chain[-1].tail
            ik_target.tail = chain[-1].tail + Vector((0, 0.2, 0))
            
            # Create pole target for IK
            pole_target = bpy.context.active_object.data.edit_bones.new(f"{finger}_pole_target")
            pole_target.head = chain[1].head + Vector((0, 0, 0.5))
            pole_target.tail = chain[1].head + Vector((0, 0, 0.7))
    
    def _create_shape_keys(self):
        """Create shape keys for common ASL handshapes"""
        handshapes = [
            'open_hand',
            'closed_fist',
            'pointing',
            'thumbs_up',
            'ok_sign',
            'i_love_you',
            'peace_sign'
        ]
        
        # This would be applied to the mesh, not the armature
        # Placeholder for shape key creation logic
        print(f"Shape keys to create: {', '.join(handshapes)}")
    
    def _add_custom_controllers(self):
        """Add custom control bones for animators"""
        # Create master hand controller
        master_ctrl = bpy.context.active_object.data.edit_bones.new("hand_master_ctrl")
        master_ctrl.head = Vector((0, -0.5, 0))
        master_ctrl.tail = Vector((0, -0.3, 0))
        
        # Create spread controller for finger spreading
        spread_ctrl = bpy.context.active_object.data.edit_bones.new("finger_spread_ctrl")
        spread_ctrl.head = Vector((0, 0.5, 0))
        spread_ctrl.tail = Vector((0, 0.7, 0))


def setup_hand_constraints(armature):
    """Setup constraints for the hand rig"""
    bpy.context.view_layer.objects.active = armature
    bpy.ops.object.mode_set(mode='POSE')
    
    # Add IK constraints to finger chains
    fingers = ['thumb', 'index', 'middle', 'ring', 'pinky']
    for finger in fingers:
        # Get the last bone in the chain
        bone = armature.pose.bones.get(f"{finger}_dist")
        if bone:
            # Add IK constraint
            constraint = bone.constraints.new('IK')
            constraint.target = armature
            constraint.subtarget = f"{finger}_IK_target"
            constraint.chain_count = 3
            constraint.pole_target = armature
            constraint.pole_subtarget = f"{finger}_pole_target"
    
    bpy.ops.object.mode_set(mode='OBJECT')


def main():
    """Main execution function"""
    # Create hand rig
    rig_creator = HandRigCreator()
    armature = rig_creator.create_hand_rig()
    
    # Setup constraints
    setup_hand_constraints(armature)
    
    print(f"Hand rig '{armature.name}' created successfully!")
    print("Ready for sign language animation!")


if __name__ == "__main__":
    main()
