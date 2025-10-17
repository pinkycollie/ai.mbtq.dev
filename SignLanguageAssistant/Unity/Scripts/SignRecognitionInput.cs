using UnityEngine;
using System.Collections;
using System.Collections.Generic;

namespace SignLanguageAssistant
{
    /// <summary>
    /// Receives input from external sign recognition systems (Python/ML)
    /// Bridges the gap between ML model output and Unity animation
    /// </summary>
    public class SignRecognitionInput : MonoBehaviour
    {
        [Header("Settings")]
        [Range(0f, 1f)]
        public float confidenceThreshold = 0.8f;
        public bool enableDebugLogging = true;
        
        [Header("References")]
        public SignLanguageAvatar avatar;
        
        [Header("Statistics")]
        public int recognitionsReceived = 0;
        public int recognitionsAccepted = 0;
        public int recognitionsRejected = 0;
        
        private Dictionary<string, int> signFrequency = new Dictionary<string, int>();
        
        void Start()
        {
            if (avatar == null)
            {
                avatar = FindObjectOfType<SignLanguageAvatar>();
                if (avatar == null)
                {
                    Debug.LogError("SignRecognitionInput: No SignLanguageAvatar found in scene!");
                }
            }
        }
        
        /// <summary>
        /// Called when a sign is recognized by the ML system
        /// </summary>
        public void OnSignRecognized(string signGloss, float confidence)
        {
            recognitionsReceived++;
            
            if (enableDebugLogging)
            {
                Debug.Log($"Sign recognized: {signGloss} (confidence: {confidence:F2})");
            }
            
            if (confidence >= confidenceThreshold)
            {
                recognitionsAccepted++;
                
                // Track sign frequency for analytics
                TrackSignFrequency(signGloss);
                
                // Queue sign for playback
                if (avatar != null)
                {
                    avatar.QueueSign(signGloss);
                }
            }
            else
            {
                recognitionsRejected++;
                
                if (enableDebugLogging)
                {
                    Debug.LogWarning($"Sign rejected due to low confidence: {signGloss} ({confidence:F2} < {confidenceThreshold:F2})");
                }
            }
        }
        
        /// <summary>
        /// Called when a sequence of signs is recognized
        /// </summary>
        public void OnSignSequenceRecognized(List<SignData> signSequence)
        {
            List<string> acceptedSigns = new List<string>();
            
            foreach (SignData signData in signSequence)
            {
                recognitionsReceived++;
                
                if (signData.confidence >= confidenceThreshold)
                {
                    recognitionsAccepted++;
                    acceptedSigns.Add(signData.gloss);
                    TrackSignFrequency(signData.gloss);
                }
                else
                {
                    recognitionsRejected++;
                }
            }
            
            if (acceptedSigns.Count > 0 && avatar != null)
            {
                avatar.QueueSignSequence(acceptedSigns);
            }
        }
        
        /// <summary>
        /// Track frequency of recognized signs
        /// </summary>
        private void TrackSignFrequency(string signGloss)
        {
            if (signFrequency.ContainsKey(signGloss))
            {
                signFrequency[signGloss]++;
            }
            else
            {
                signFrequency[signGloss] = 1;
            }
        }
        
        /// <summary>
        /// Get recognition accuracy statistics
        /// </summary>
        public float GetAcceptanceRate()
        {
            if (recognitionsReceived == 0) return 0f;
            return (float)recognitionsAccepted / recognitionsReceived;
        }
        
        /// <summary>
        /// Get most frequently recognized signs
        /// </summary>
        public List<KeyValuePair<string, int>> GetMostFrequentSigns(int count = 10)
        {
            List<KeyValuePair<string, int>> sortedList = new List<KeyValuePair<string, int>>(signFrequency);
            sortedList.Sort((a, b) => b.Value.CompareTo(a.Value));
            
            return sortedList.GetRange(0, Mathf.Min(count, sortedList.Count));
        }
        
        /// <summary>
        /// Reset statistics
        /// </summary>
        public void ResetStatistics()
        {
            recognitionsReceived = 0;
            recognitionsAccepted = 0;
            recognitionsRejected = 0;
            signFrequency.Clear();
            Debug.Log("Recognition statistics reset");
        }
        
        [System.Serializable]
        public class SignData
        {
            public string gloss;
            public float confidence;
            public float timestamp;
            
            public SignData(string gloss, float confidence, float timestamp)
            {
                this.gloss = gloss;
                this.confidence = confidence;
                this.timestamp = timestamp;
            }
        }
    }
}
