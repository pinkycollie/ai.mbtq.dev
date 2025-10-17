# Sign Language Virtual Assistant

A comprehensive technical framework for building a sign language virtual assistant using Unity, Blender, and Python ML integration.

## 🏗️ System Architecture

```
Sign Recognition → Natural Language Processing → Animation System → 3D Avatar
    (Python)          (AI Capabilities)              (Unity C#)       (Blender+Unity)
```

## 📁 Project Structure

```
SignLanguageAssistant/
├── Blender/
│   ├── Characters/
│   │   └── character_creator.py       # Low-poly humanoid mesh creation
│   ├── Animations/                     # Animation keyframe library
│   └── ExportScripts/
│       └── create_hand_rig.py         # Automated hand rigging system
├── Unity/
│   ├── Scripts/
│   │   ├── SignLanguageAvatar.cs      # Core animation controller
│   │   ├── SignRecognitionInput.cs    # ML model bridge
│   │   ├── SignLanguageGenerator.cs   # Text-to-sign conversion
│   │   ├── ProceduralSigning.cs       # Animation enhancement
│   │   ├── VirtualAssistantController.cs  # Main assistant logic
│   │   ├── PerformanceManager.cs      # Platform optimization
│   │   └── UsageAnalytics.cs          # Analytics tracking
│   ├── Prefabs/                        # Avatar prefabs
│   └── Materials/                      # Avatar materials
└── Python/
    ├── SignRecognition/
    │   └── sign_recognition.py         # ML recognition model
    └── ModelTraining/                  # Training scripts
```

## 🔧 Component Overview

### Blender Pipeline

#### Character Creation (`character_creator.py`)
- Creates low-poly humanoid mesh (15k-30k triangles)
- Quad topology optimized for clean deformation
- Detailed hand meshes for clear sign gestures
- Automated UV unwrapping for textures
- Subdivision surface support

#### Hand Rigging (`create_hand_rig.py`)
- Automated finger bone chain creation
- IK controls for precise positioning
- Shape keys for handshape morphs (ASL/BSL)
- Custom animation controllers

### Unity C# Scripts

#### SignLanguageAvatar.cs
**Core animation controller** that manages:
- Sign animation library (500+ basic signs)
- Animation queue system
- Smooth transition blending
- Facial expression integration

**Key Methods:**
```csharp
void QueueSign(string signGloss)           // Queue single sign
void QueueSignSequence(List<string> signs)  // Queue multiple signs
bool IsPlaying()                            // Check playback state
```

#### SignRecognitionInput.cs
**Bridges ML recognition to Unity animation**
- Receives sign recognition from Python
- Confidence threshold filtering (default: 0.8)
- Sign frequency tracking
- Recognition statistics

**Key Methods:**
```csharp
void OnSignRecognized(string sign, float confidence)
void OnSignSequenceRecognized(List<SignData> sequence)
float GetAcceptanceRate()
```

#### SignLanguageGenerator.cs
**Converts text to sign sequences**
- NLP processing for text input
- ASL/BSL grammar rules
- Word-to-sign mapping (50+ common words)
- Automatic fingerspelling for unknown words

**Key Methods:**
```csharp
List<string> TextToSignSequence(string text)
void GenerateAndPlaySigns(string text)
```

#### ProceduralSigning.cs
**Enhances animation naturalness**
- Coarticulation between signs
- Natural timing variations
- Body sway and breathing
- Eye movement and blinking

**Key Methods:**
```csharp
void ApplyCoarticulation(SignAnimation current, SignAnimation next)
void AddNaturalVariation(AnimationClip clip)
void UpdateGazeBehavior(Vector3 target)
```

#### VirtualAssistantController.cs
**Main assistant controller**
- User query processing
- AI response generation
- State management (Idle, Listening, Processing, Signing)
- Visual feedback system

**States:**
- `Listening` - Receiving user input
- `Processing` - Generating AI response
- `Signing` - Animating avatar
- `Idle` - Waiting for interaction

#### PerformanceManager.cs
**Platform-specific optimization**
- Mobile optimization (30 FPS, reduced quality)
- Desktop optimization (60 FPS, high quality)
- WebGL optimization (medium quality)
- LOD system for avatars
- Texture compression
- Animation bone reduction

#### UsageAnalytics.cs
**Continuous improvement tracking**
- Sign recognition accuracy monitoring
- User correction feedback
- Sign frequency analysis
- Performance metrics
- JSON data export

### Python ML Integration

#### sign_recognition.py
**Real-time sign recognition using MediaPipe**
- Hand landmark detection
- Temporal smoothing for stability
- Sign vocabulary (50+ signs + ASL alphabet)
- Unity communication bridge

**Key Features:**
- Multi-hand tracking (up to 2 hands)
- Confidence thresholding
- Recognition history for stability
- REST API/WebSocket communication

**Usage:**
```python
from sign_recognition import SignRecognitionModel, SignRecognitionBridge

# Initialize model
model = SignRecognitionModel(confidence_threshold=0.8)

# Create Unity bridge
bridge = SignRecognitionBridge(model, unity_endpoint="http://localhost:8080")

# Run camera loop
bridge.run_camera_loop(camera_id=0)
```

## 🚀 Getting Started

### Prerequisites

**Blender:**
- Blender 3.0+ with Python API

**Unity:**
- Unity 2021.3 LTS or newer
- TextMeshPro package
- Animation Rigging package (optional)

**Python:**
- Python 3.8+
- OpenCV (`pip install opencv-python`)
- MediaPipe (`pip install mediapipe`)
- NumPy (`pip install numpy`)

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd SignLanguageAssistant
```

2. **Blender Setup:**
```bash
# Open Blender and run scripts in Text Editor
# Or run from command line:
blender --background --python Blender/Characters/character_creator.py
blender --background --python Blender/ExportScripts/create_hand_rig.py
```

3. **Unity Setup:**
- Open Unity Hub
- Add project from `Unity/` directory
- Import avatar models from Blender
- Add scripts to appropriate GameObjects

4. **Python Setup:**
```bash
cd Python/SignRecognition
pip install -r requirements.txt
python sign_recognition.py
```

## 🎮 Unity Integration Guide

### Basic Setup

1. **Create Avatar GameObject:**
   - Import character from Blender
   - Add Animator component
   - Configure animation controller

2. **Add Core Components:**
```csharp
// Attach to Avatar GameObject
avatar.AddComponent<SignLanguageAvatar>();
avatar.AddComponent<ProceduralSigning>();

// Create separate GameObject for manager
GameObject manager = new GameObject("AssistantManager");
manager.AddComponent<VirtualAssistantController>();
manager.AddComponent<SignLanguageGenerator>();
manager.AddComponent<SignRecognitionInput>();
manager.AddComponent<PerformanceManager>();
manager.AddComponent<UsageAnalytics>();
```

3. **Configure Sign Library:**
   - Populate `SignLanguageAvatar.signLibrary` in Inspector
   - Add AnimationClips for each sign
   - Set durations and facial expressions

### Example Usage

```csharp
// Get references
SignLanguageAvatar avatar = FindObjectOfType<SignLanguageAvatar>();
SignLanguageGenerator generator = FindObjectOfType<SignLanguageGenerator>();

// Play single sign
avatar.QueueSign("HELLO");

// Convert text to signs
generator.GenerateAndPlaySigns("Hello, how are you?");

// Process user query
VirtualAssistantController assistant = FindObjectOfType<VirtualAssistantController>();
assistant.ProcessUserQuery("What is your name?");
```

## 📊 Performance Optimization

### Mobile Optimization
- Triangle count: 15,000-20,000
- Texture size: 512x512
- Frame rate: 30 FPS
- Bone count: 30 bones
- Shadows: Disabled

### Desktop Optimization
- Triangle count: 20,000-30,000
- Texture size: 2048x2048
- Frame rate: 60 FPS
- Bone count: 50 bones
- Shadows: Enabled

### WebGL Optimization
- Triangle count: 20,000
- Texture size: 1024x1024
- Frame rate: 30 FPS
- Moderate quality settings

## 🎯 Feature Roadmap

### Implemented
- ✅ Core animation system
- ✅ Sign queue management
- ✅ ML recognition bridge
- ✅ Text-to-sign conversion
- ✅ Procedural enhancements
- ✅ Performance optimization
- ✅ Analytics tracking

### In Progress
- 🔄 500+ sign animation library
- 🔄 Advanced facial expressions
- 🔄 Multi-language support (ASL, BSL, LSF)

### Planned
- ⏳ Mobile app (iOS/Android)
- ⏳ AR/VR support
- ⏳ Voice input integration
- ⏳ Real-time sign recognition
- ⏳ Cloud model training
- ⏳ Multi-avatar support

## 📱 Multi-Platform Support

### Mobile Features
- Touch interface for manual sign input
- Camera-based sign recognition
- Optimized performance (30 FPS)
- Reduced quality for battery life

### Desktop Features
- Webcam sign recognition
- High-quality rendering
- Keyboard shortcuts
- Advanced analytics

### AR/VR Features (Future)
- Immersive signing experiences
- Spatial sign placement
- Hand tracking integration
- 3D gesture recognition

## ♿ Accessibility Features

- Adjustable signing speed (0.5x - 2.0x)
- Multiple signing styles (ASL, BSL, etc.)
- Closed captioning synchronization
- High contrast UI options
- Multiple avatar appearance options
- Sign replay functionality

## 📈 Analytics & Monitoring

**Tracked Metrics:**
- Sign recognition accuracy
- Average confidence scores
- Most frequently used signs
- Signs needing improvement (error rate > 30%)
- User correction patterns
- Session duration
- Total interactions

**Export Format:**
```json
{
  "sessionDuration": 1234.5,
  "totalRecognitions": 150,
  "recognitionAccuracy": 0.87,
  "averageConfidence": 0.91,
  "mostUsedSigns": ["HELLO", "THANK", "YOU"],
  "signsNeedingImprovement": ["WHAT", "WHERE"]
}
```

## 🔌 API Integration

### Unity → Python Communication
```python
# REST API endpoint
@app.route('/sign_recognized', methods=['POST'])
def sign_recognized():
    data = request.json
    sign = data['sign']
    confidence = data['confidence']
    # Forward to Unity
    return jsonify({'status': 'received'})
```

### Python → Unity Communication
```csharp
// Unity REST API receiver
[HttpPost]
public void ReceiveSignRecognition(string json)
{
    SignData data = JsonUtility.FromJson<SignData>(json);
    signRecognitionInput.OnSignRecognized(data.sign, data.confidence);
}
```

## 🧪 Testing

### Unit Tests
- Test sign queue management
- Test animation transitions
- Test text-to-sign conversion
- Test confidence thresholding

### Integration Tests
- Test Python-Unity communication
- Test end-to-end sign recognition
- Test multi-sign sequences

### Performance Tests
- Frame rate monitoring
- Memory usage tracking
- Animation smoothness
- Recognition latency

## 🤝 Contributing

Contributions are welcome! Areas for improvement:
- Additional sign animations
- Language support (BSL, LSF, JSL, etc.)
- ML model improvements
- UI/UX enhancements
- Documentation

## 📄 License

MIT License - See LICENSE file for details

## 📞 Support

For questions or issues:
- Open a GitHub issue
- Contact: invest@signlanguageai.com
- Documentation: [AI.MBTQ.DEV](https://ai.mbtq.dev)

## 🌟 Acknowledgments

- AWS GenASL for ASL avatar generation inspiration
- MediaPipe for hand tracking
- Unity Technologies for animation framework
- Blender Foundation for 3D modeling tools

---

**Made with ❤️ for accessibility and inclusion**

🚀 **Ready to build? Start with the Blender character creation, then move to Unity integration!**
