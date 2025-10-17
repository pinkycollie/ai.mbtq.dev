# Quick Start Guide - Sign Language Virtual Assistant

Get up and running with the Sign Language Virtual Assistant in 15 minutes!

## 🚀 Prerequisites

Before starting, ensure you have:
- ✅ Unity 2021.3 LTS or newer
- ✅ Blender 3.0+ (optional, for character creation)
- ✅ Python 3.8+
- ✅ Webcam (for sign recognition)

## 📦 Installation Steps

### Step 1: Setup Python Environment (5 minutes)

```bash
# Navigate to Python directory
cd SignLanguageAssistant/Python/SignRecognition

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Step 2: Test Sign Recognition (2 minutes)

```bash
# Run sign recognition test
python sign_recognition.py
```

You should see a window showing your webcam feed with hand tracking overlay. Press 'q' to quit.

### Step 3: Unity Project Setup (5 minutes)

1. **Open Unity Hub**
2. **Create New Project:**
   - Template: 3D Core
   - Name: SignLanguageAssistant
   - Location: Your choice

3. **Import Scripts:**
   ```
   Copy all files from:
   SignLanguageAssistant/Unity/Scripts/
   
   To Unity project:
   Assets/Scripts/SignLanguageAssistant/
   ```

4. **Create Avatar GameObject:**
   - Right-click in Hierarchy → Create Empty
   - Name it "SignAvatar"
   - Add Component → Animator
   - Add Component → SignLanguageAvatar
   - Add Component → ProceduralSigning

5. **Create Manager GameObject:**
   - Right-click in Hierarchy → Create Empty
   - Name it "AssistantManager"
   - Add Component → VirtualAssistantController
   - Add Component → SignLanguageGenerator
   - Add Component → SignRecognitionInput
   - Add Component → PerformanceManager
   - Add Component → UsageAnalytics

### Step 4: Basic Configuration (3 minutes)

1. **Configure SignLanguageAvatar:**
   - In Inspector, locate "Sign Library" array
   - Add sample signs (you can add more later)

2. **Configure VirtualAssistantController:**
   - Drag "SignAvatar" to Avatar field
   - Drag "AssistantManager" components to appropriate fields

3. **Configure SignRecognitionInput:**
   - Set Confidence Threshold: 0.8
   - Enable Debug Logging

## 🎮 First Test

### Test 1: Text-to-Sign Conversion

Create a test script:

```csharp
using UnityEngine;
using SignLanguageAssistant;

public class TestTextToSign : MonoBehaviour
{
    void Start()
    {
        // Get generator
        SignLanguageGenerator generator = FindObjectOfType<SignLanguageGenerator>();
        
        // Convert text to signs
        var signs = generator.TextToSignSequence("hello friend");
        
        Debug.Log($"Generated {signs.Count} signs from text");
        foreach (string sign in signs)
        {
            Debug.Log($"- {sign}");
        }
    }
}
```

Attach to any GameObject and press Play. Check Console for output.

### Test 2: Virtual Assistant Query

Create another test script:

```csharp
using UnityEngine;
using SignLanguageAssistant;

public class TestAssistant : MonoBehaviour
{
    void Start()
    {
        // Get assistant controller
        VirtualAssistantController assistant = FindObjectOfType<VirtualAssistantController>();
        
        // Process a query
        assistant.ProcessUserQuery("Hello, what is your name?");
    }
}
```

Press Play and watch the assistant process the query!

## 🔧 Common Setup Issues

### Issue: "Type or namespace 'SignLanguageAssistant' not found"
**Solution:** Ensure all scripts are in `Assets/Scripts/SignLanguageAssistant/` directory

### Issue: Python dependencies fail to install
**Solution:** 
```bash
# Try upgrading pip first
pip install --upgrade pip
pip install --upgrade setuptools wheel
# Then retry requirements
pip install -r requirements.txt
```

### Issue: Webcam not detected
**Solution:** 
- Check camera permissions in system settings
- Try different camera_id (0, 1, 2) in Python script
- Update camera drivers

### Issue: Unity scripts show errors
**Solution:**
- Check Unity version (2021.3+ required)
- Reimport scripts: Right-click → Reimport
- Check for missing namespaces

## 📚 Next Steps

Now that you have the basic setup working:

### 1. Create Your First Animation (Recommended)
Follow the Blender character creation guide to build a custom avatar:
```bash
blender --background --python Blender/Characters/character_creator.py
```

### 2. Expand Sign Library
Add more sign animations to `SignLanguageAvatar.signLibrary`:
- Create AnimationClips in Unity
- Add to Sign Library array in Inspector
- Set duration and expressions

### 3. Integrate with AI
Connect your AI backend to `VirtualAssistantController.GenerateResponse()`:
```csharp
private string GenerateResponse(string input)
{
    // Replace with your AI API call
    // Example: OpenAI, Groq, etc.
    return aiService.GetResponse(input);
}
```

### 4. Enable Real-time Recognition
Start the Python recognition bridge:
```bash
python sign_recognition.py
```

Then configure Unity to receive recognition events:
- Set up REST API endpoint or WebSocket
- Connect SignRecognitionInput to receive data

### 5. Add Visual Feedback
Create UI elements for assistant states:
- Listening indicator (green pulse)
- Processing indicator (loading spinner)
- Error indicator (red alert)

Link them in VirtualAssistantController Inspector.

## 🎯 Quick Feature Checklist

After setup, you should be able to:
- ✅ Convert text to sign sequences
- ✅ Queue and play sign animations
- ✅ Process virtual assistant queries
- ✅ Track usage analytics
- ✅ Optimize for different platforms
- ✅ Recognize hand gestures (Python)

## 📖 Additional Resources

### Documentation
- Full README: `SignLanguageAssistant/README.md`
- Architecture Guide: `SignLanguageAssistant/ARCHITECTURE.md`
- API Reference: Check individual script headers

### Examples
- Text-to-Sign: See `SignLanguageGenerator.cs`
- Sign Recognition: See `sign_recognition.py`
- Virtual Assistant: See `VirtualAssistantController.cs`

### Video Tutorials (Coming Soon)
- Setting up Unity project
- Creating custom animations
- Training recognition models
- Deploying to mobile

## 🤝 Getting Help

If you get stuck:

1. **Check the logs:**
   - Unity Console: Window → General → Console
   - Python: Terminal output

2. **Review documentation:**
   - README.md for detailed setup
   - ARCHITECTURE.md for system design

3. **Ask for help:**
   - GitHub Issues: Report bugs
   - Email: invest@signlanguageai.com

## 🎉 You're Ready!

Congratulations! You now have a working Sign Language Virtual Assistant framework.

Start building amazing accessibility features! 🌟

---

**Next Recommended Actions:**
1. ⭐ Star the repository
2. 📖 Read the full README
3. 🎨 Create your first custom sign animation
4. 🚀 Build something amazing!

**Happy Building!** 🛠️
