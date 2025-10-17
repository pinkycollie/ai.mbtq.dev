"""
Sign Recognition ML Model
Integrates with Unity through REST API or WebSocket communication
"""
import cv2
import numpy as np
import mediapipe as mp
from typing import List, Tuple, Dict
import json


class SignRecognitionModel:
    """
    Real-time sign language recognition using MediaPipe and computer vision
    """
    
    def __init__(self, model_path: str = None, confidence_threshold: float = 0.8):
        """
        Initialize the sign recognition model
        
        Args:
            model_path: Path to trained model weights
            confidence_threshold: Minimum confidence for recognition
        """
        self.confidence_threshold = confidence_threshold
        self.model_path = model_path
        
        # Initialize MediaPipe Hands
        self.mp_hands = mp.solutions.hands
        self.hands = self.mp_hands.Hands(
            static_image_mode=False,
            max_num_hands=2,
            min_detection_confidence=0.7,
            min_tracking_confidence=0.5
        )
        
        self.mp_drawing = mp.solutions.drawing_utils
        
        # Sign vocabulary (would be loaded from trained model)
        self.sign_vocabulary = self._load_vocabulary()
        
        # Recognition history for temporal analysis
        self.recognition_history = []
        self.history_size = 10
        
    def _load_vocabulary(self) -> List[str]:
        """Load sign vocabulary from model"""
        # Basic ASL alphabet and common signs
        return [
            'HELLO', 'GOODBYE', 'THANK', 'YOU', 'PLEASE',
            'YES', 'NO', 'HELP', 'WATER', 'EAT',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
            'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
            'U', 'V', 'W', 'X', 'Y', 'Z'
        ]
    
    def process_frame(self, frame: np.ndarray) -> Dict:
        """
        Process a single video frame for sign recognition
        
        Args:
            frame: BGR image from camera
            
        Returns:
            Dictionary with recognition results
        """
        # Convert BGR to RGB
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        
        # Process with MediaPipe
        results = self.hands.process(rgb_frame)
        
        if results.multi_hand_landmarks:
            # Extract hand landmarks
            landmarks = self._extract_landmarks(results)
            
            # Recognize sign from landmarks
            sign, confidence = self._recognize_sign(landmarks)
            
            # Add to history
            self._update_history(sign, confidence)
            
            # Get stabilized prediction
            final_sign, final_confidence = self._get_stabilized_prediction()
            
            return {
                'recognized': final_sign,
                'confidence': final_confidence,
                'landmarks': landmarks,
                'hand_count': len(results.multi_hand_landmarks)
            }
        
        return {
            'recognized': None,
            'confidence': 0.0,
            'landmarks': None,
            'hand_count': 0
        }
    
    def _extract_landmarks(self, results) -> List[Tuple[float, float, float]]:
        """Extract normalized hand landmarks"""
        landmarks = []
        
        for hand_landmarks in results.multi_hand_landmarks:
            hand_points = []
            for landmark in hand_landmarks.landmark:
                hand_points.append((landmark.x, landmark.y, landmark.z))
            landmarks.append(hand_points)
        
        return landmarks
    
    def _recognize_sign(self, landmarks: List) -> Tuple[str, float]:
        """
        Recognize sign from hand landmarks
        
        This is a placeholder for actual ML inference
        In production, this would use a trained neural network
        """
        if not landmarks:
            return None, 0.0
        
        # Placeholder: Simple gesture recognition
        # In reality, this would use TensorFlow/PyTorch model
        features = self._extract_features(landmarks)
        
        # Simulate model prediction
        sign = np.random.choice(self.sign_vocabulary)
        confidence = np.random.uniform(0.7, 0.95)
        
        return sign, confidence
    
    def _extract_features(self, landmarks: List) -> np.ndarray:
        """Extract features from landmarks for ML model"""
        # Flatten landmarks into feature vector
        features = []
        for hand in landmarks:
            for point in hand:
                features.extend(point)
        
        return np.array(features)
    
    def _update_history(self, sign: str, confidence: float):
        """Update recognition history for temporal smoothing"""
        self.recognition_history.append({
            'sign': sign,
            'confidence': confidence
        })
        
        # Keep only recent history
        if len(self.recognition_history) > self.history_size:
            self.recognition_history.pop(0)
    
    def _get_stabilized_prediction(self) -> Tuple[str, float]:
        """Get stabilized prediction from history"""
        if not self.recognition_history:
            return None, 0.0
        
        # Count occurrences of each sign
        sign_counts = {}
        for entry in self.recognition_history:
            sign = entry['sign']
            if sign:
                sign_counts[sign] = sign_counts.get(sign, 0) + 1
        
        if not sign_counts:
            return None, 0.0
        
        # Get most common sign
        most_common = max(sign_counts.items(), key=lambda x: x[1])
        sign = most_common[0]
        
        # Calculate average confidence for this sign
        confidences = [
            e['confidence'] for e in self.recognition_history
            if e['sign'] == sign
        ]
        avg_confidence = np.mean(confidences)
        
        return sign, avg_confidence
    
    def draw_landmarks(self, frame: np.ndarray, results) -> np.ndarray:
        """Draw hand landmarks on frame for visualization"""
        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                self.mp_drawing.draw_landmarks(
                    frame,
                    hand_landmarks,
                    self.mp_hands.HAND_CONNECTIONS
                )
        return frame
    
    def reset_history(self):
        """Reset recognition history"""
        self.recognition_history.clear()
    
    def release(self):
        """Release resources"""
        self.hands.close()


class SignRecognitionBridge:
    """
    Bridge between Python ML model and Unity
    Communicates via REST API or WebSocket
    """
    
    def __init__(self, model: SignRecognitionModel, unity_endpoint: str = "http://localhost:8080"):
        """
        Initialize bridge
        
        Args:
            model: SignRecognitionModel instance
            unity_endpoint: Unity communication endpoint
        """
        self.model = model
        self.unity_endpoint = unity_endpoint
    
    def send_to_unity(self, sign: str, confidence: float):
        """
        Send recognition result to Unity
        
        Args:
            sign: Recognized sign gloss
            confidence: Recognition confidence
        """
        data = {
            'sign': sign,
            'confidence': confidence,
            'timestamp': cv2.getTickCount()
        }
        
        # In production, this would send via HTTP POST or WebSocket
        print(f"Sending to Unity: {json.dumps(data)}")
        
        # Example REST API call:
        # requests.post(f"{self.unity_endpoint}/sign_recognized", json=data)
    
    def run_camera_loop(self, camera_id: int = 0):
        """
        Run continuous recognition from camera
        
        Args:
            camera_id: Camera device ID
        """
        cap = cv2.VideoCapture(camera_id)
        
        print("Starting sign recognition camera loop...")
        print("Press 'q' to quit")
        
        try:
            while cap.isOpened():
                success, frame = cap.read()
                if not success:
                    break
                
                # Process frame
                result = self.model.process_frame(frame)
                
                # Send to Unity if recognized
                if result['recognized'] and result['confidence'] >= self.model.confidence_threshold:
                    self.send_to_unity(result['recognized'], result['confidence'])
                
                # Display (optional)
                cv2.putText(
                    frame,
                    f"Sign: {result['recognized'] or 'None'} ({result['confidence']:.2f})",
                    (10, 30),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    1,
                    (0, 255, 0),
                    2
                )
                
                cv2.imshow('Sign Recognition', frame)
                
                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break
        
        finally:
            cap.release()
            cv2.destroyAllWindows()
            self.model.release()


def main():
    """Main entry point"""
    # Initialize model
    model = SignRecognitionModel(confidence_threshold=0.8)
    
    # Initialize bridge
    bridge = SignRecognitionBridge(model)
    
    # Run camera loop
    bridge.run_camera_loop(camera_id=0)


if __name__ == "__main__":
    main()
