using UnityEngine;
using System.Collections.Generic;
using System.IO;

namespace SignLanguageAssistant
{
    /// <summary>
    /// Tracks usage analytics for continuous improvement
    /// Monitors sign recognition accuracy and user interaction patterns
    /// </summary>
    public class UsageAnalytics : MonoBehaviour
    {
        [Header("Settings")]
        public bool enableAnalytics = true;
        public bool saveToFile = true;
        public string analyticsFilePath = "Analytics/usage_data.json";
        
        [Header("Session Statistics")]
        public float sessionStartTime;
        public float sessionDuration;
        public int totalInteractions;
        
        [Header("Recognition Statistics")]
        public int totalRecognitions;
        public int successfulRecognitions;
        public int failedRecognitions;
        public float averageConfidence;
        
        [Header("Sign Statistics")]
        private Dictionary<string, SignUsageData> signUsageMap;
        private Dictionary<string, int> misrecognizedSigns;
        private List<UserCorrection> userCorrections;
        
        [System.Serializable]
        public class SignUsageData
        {
            public string signGloss;
            public int usageCount;
            public float averageConfidence;
            public int recognitionErrors;
            public float lastUsedTime;
            
            public SignUsageData(string gloss)
            {
                this.signGloss = gloss;
                this.usageCount = 0;
                this.averageConfidence = 0f;
                this.recognitionErrors = 0;
                this.lastUsedTime = 0f;
            }
        }
        
        [System.Serializable]
        public class UserCorrection
        {
            public string recognizedSign;
            public string correctedSign;
            public float timestamp;
            public float confidence;
            
            public UserCorrection(string recognized, string corrected, float time, float conf)
            {
                this.recognizedSign = recognized;
                this.correctedSign = corrected;
                this.timestamp = time;
                this.confidence = conf;
            }
        }
        
        void Start()
        {
            signUsageMap = new Dictionary<string, SignUsageData>();
            misrecognizedSigns = new Dictionary<string, int>();
            userCorrections = new List<UserCorrection>();
            
            sessionStartTime = Time.time;
            
            LoadPreviousData();
        }
        
        void OnApplicationQuit()
        {
            if (saveToFile)
            {
                SaveAnalyticsData();
            }
        }
        
        /// <summary>
        /// Track sign recognition accuracy
        /// </summary>
        public void TrackSignRecognitionAccuracy(string signGloss, float confidence, bool wasCorrect)
        {
            if (!enableAnalytics) return;
            
            totalRecognitions++;
            
            if (wasCorrect)
            {
                successfulRecognitions++;
            }
            else
            {
                failedRecognitions++;
                TrackMisrecognition(signGloss);
            }
            
            // Update sign usage data
            if (!signUsageMap.ContainsKey(signGloss))
            {
                signUsageMap[signGloss] = new SignUsageData(signGloss);
            }
            
            SignUsageData data = signUsageMap[signGloss];
            data.usageCount++;
            data.lastUsedTime = Time.time;
            
            // Update running average of confidence
            data.averageConfidence = (data.averageConfidence * (data.usageCount - 1) + confidence) / data.usageCount;
            
            if (!wasCorrect)
            {
                data.recognitionErrors++;
            }
            
            // Update overall average confidence
            averageConfidence = (averageConfidence * (totalRecognitions - 1) + confidence) / totalRecognitions;
        }
        
        /// <summary>
        /// Track misrecognized signs
        /// </summary>
        private void TrackMisrecognition(string signGloss)
        {
            if (misrecognizedSigns.ContainsKey(signGloss))
            {
                misrecognizedSigns[signGloss]++;
            }
            else
            {
                misrecognizedSigns[signGloss] = 1;
            }
        }
        
        /// <summary>
        /// Track user correction
        /// </summary>
        public void RecordUserCorrection(string recognizedSign, string correctedSign, float confidence)
        {
            if (!enableAnalytics) return;
            
            UserCorrection correction = new UserCorrection(
                recognizedSign,
                correctedSign,
                Time.time,
                confidence
            );
            
            userCorrections.Add(correction);
            
            Debug.Log($"User correction recorded: {recognizedSign} -> {correctedSign}");
        }
        
        /// <summary>
        /// Track user interaction
        /// </summary>
        public void TrackInteraction(string interactionType)
        {
            if (!enableAnalytics) return;
            
            totalInteractions++;
            Debug.Log($"Interaction tracked: {interactionType}");
        }
        
        /// <summary>
        /// Get most misrecognized signs
        /// </summary>
        public List<KeyValuePair<string, int>> GetMostMisrecognizedSigns(int count = 10)
        {
            List<KeyValuePair<string, int>> sortedList = new List<KeyValuePair<string, int>>(misrecognizedSigns);
            sortedList.Sort((a, b) => b.Value.CompareTo(a.Value));
            
            return sortedList.GetRange(0, Mathf.Min(count, sortedList.Count));
        }
        
        /// <summary>
        /// Get most used signs
        /// </summary>
        public List<SignUsageData> GetMostUsedSigns(int count = 10)
        {
            List<SignUsageData> sortedList = new List<SignUsageData>(signUsageMap.Values);
            sortedList.Sort((a, b) => b.usageCount.CompareTo(a.usageCount));
            
            return sortedList.GetRange(0, Mathf.Min(count, sortedList.Count));
        }
        
        /// <summary>
        /// Get signs that need improvement
        /// </summary>
        public List<SignUsageData> GetSignsNeedingImprovement(float errorThreshold = 0.3f)
        {
            List<SignUsageData> needsImprovement = new List<SignUsageData>();
            
            foreach (SignUsageData data in signUsageMap.Values)
            {
                if (data.usageCount > 0)
                {
                    float errorRate = (float)data.recognitionErrors / data.usageCount;
                    if (errorRate > errorThreshold)
                    {
                        needsImprovement.Add(data);
                    }
                }
            }
            
            // Sort by error rate (highest first)
            needsImprovement.Sort((a, b) =>
            {
                float errorRateA = (float)a.recognitionErrors / a.usageCount;
                float errorRateB = (float)b.recognitionErrors / b.usageCount;
                return errorRateB.CompareTo(errorRateA);
            });
            
            return needsImprovement;
        }
        
        /// <summary>
        /// Get overall recognition accuracy
        /// </summary>
        public float GetRecognitionAccuracy()
        {
            if (totalRecognitions == 0) return 0f;
            return (float)successfulRecognitions / totalRecognitions;
        }
        
        /// <summary>
        /// Get analytics summary
        /// </summary>
        public string GetAnalyticsSummary()
        {
            sessionDuration = Time.time - sessionStartTime;
            
            string summary = "=== Usage Analytics Summary ===\n";
            summary += $"Session Duration: {sessionDuration:F1}s\n";
            summary += $"Total Interactions: {totalInteractions}\n";
            summary += $"Total Recognitions: {totalRecognitions}\n";
            summary += $"Recognition Accuracy: {GetRecognitionAccuracy():P1}\n";
            summary += $"Average Confidence: {averageConfidence:F2}\n";
            summary += $"Unique Signs Used: {signUsageMap.Count}\n";
            summary += $"User Corrections: {userCorrections.Count}\n";
            
            return summary;
        }
        
        /// <summary>
        /// Save analytics data to file
        /// </summary>
        private void SaveAnalyticsData()
        {
            string directory = Path.GetDirectoryName(analyticsFilePath);
            if (!Directory.Exists(directory))
            {
                Directory.CreateDirectory(directory);
            }
            
            AnalyticsData data = new AnalyticsData
            {
                sessionDuration = Time.time - sessionStartTime,
                totalInteractions = totalInteractions,
                totalRecognitions = totalRecognitions,
                successfulRecognitions = successfulRecognitions,
                failedRecognitions = failedRecognitions,
                averageConfidence = averageConfidence,
                signUsage = new List<SignUsageData>(signUsageMap.Values),
                userCorrections = userCorrections
            };
            
            string json = JsonUtility.ToJson(data, true);
            File.WriteAllText(analyticsFilePath, json);
            
            Debug.Log($"Analytics data saved to {analyticsFilePath}");
        }
        
        /// <summary>
        /// Load previous analytics data
        /// </summary>
        private void LoadPreviousData()
        {
            if (!File.Exists(analyticsFilePath)) return;
            
            try
            {
                string json = File.ReadAllText(analyticsFilePath);
                AnalyticsData data = JsonUtility.FromJson<AnalyticsData>(json);
                
                // Restore data
                totalInteractions = data.totalInteractions;
                totalRecognitions = data.totalRecognitions;
                successfulRecognitions = data.successfulRecognitions;
                failedRecognitions = data.failedRecognitions;
                averageConfidence = data.averageConfidence;
                
                foreach (SignUsageData signData in data.signUsage)
                {
                    signUsageMap[signData.signGloss] = signData;
                }
                
                userCorrections = data.userCorrections;
                
                Debug.Log("Previous analytics data loaded");
            }
            catch (System.Exception e)
            {
                Debug.LogError($"Failed to load analytics data: {e.Message}");
            }
        }
        
        [System.Serializable]
        private class AnalyticsData
        {
            public float sessionDuration;
            public int totalInteractions;
            public int totalRecognitions;
            public int successfulRecognitions;
            public int failedRecognitions;
            public float averageConfidence;
            public List<SignUsageData> signUsage;
            public List<UserCorrection> userCorrections;
        }
    }
}
