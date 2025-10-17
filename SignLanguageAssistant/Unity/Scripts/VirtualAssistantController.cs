using UnityEngine;
using System.Collections;
using System.Collections.Generic;

namespace SignLanguageAssistant
{
    /// <summary>
    /// Main virtual assistant controller
    /// Manages user interaction, AI processing, and avatar responses
    /// </summary>
    public class VirtualAssistantController : MonoBehaviour
    {
        public enum AssistantState
        {
            Listening,
            Processing,
            Signing,
            Idle
        }
        
        [Header("Settings")]
        public AssistantState currentState = AssistantState.Idle;
        public bool enableAudioFeedback = true;
        public bool enableVisualFeedback = true;
        
        [Header("References")]
        public SignLanguageAvatar avatar;
        public SignLanguageGenerator signGenerator;
        public SignRecognitionInput recognitionInput;
        
        [Header("UI References")]
        public GameObject listeningIndicator;
        public GameObject processingIndicator;
        public GameObject errorIndicator;
        
        [Header("Statistics")]
        public int queriesProcessed = 0;
        public int successfulResponses = 0;
        public int errorResponses = 0;
        
        private Queue<string> queryQueue = new Queue<string>();
        private bool isProcessingQuery = false;
        
        void Start()
        {
            InitializeComponents();
            SetState(AssistantState.Idle);
        }
        
        void Update()
        {
            // Process queued queries
            if (!isProcessingQuery && queryQueue.Count > 0)
            {
                string nextQuery = queryQueue.Dequeue();
                StartCoroutine(ProcessQueryCoroutine(nextQuery));
            }
        }
        
        /// <summary>
        /// Initialize component references
        /// </summary>
        private void InitializeComponents()
        {
            if (avatar == null)
            {
                avatar = FindObjectOfType<SignLanguageAvatar>();
            }
            
            if (signGenerator == null)
            {
                signGenerator = FindObjectOfType<SignLanguageGenerator>();
            }
            
            if (recognitionInput == null)
            {
                recognitionInput = FindObjectOfType<SignRecognitionInput>();
            }
            
            // Validate components
            if (avatar == null)
            {
                Debug.LogError("VirtualAssistantController: SignLanguageAvatar not found!");
            }
            if (signGenerator == null)
            {
                Debug.LogError("VirtualAssistantController: SignLanguageGenerator not found!");
            }
        }
        
        /// <summary>
        /// Process user query and generate response
        /// </summary>
        public void ProcessUserQuery(string input)
        {
            if (string.IsNullOrWhiteSpace(input))
            {
                Debug.LogWarning("Empty query received");
                return;
            }
            
            // Queue query for processing
            queryQueue.Enqueue(input);
            Debug.Log($"Query queued: {input}");
        }
        
        /// <summary>
        /// Process query coroutine
        /// </summary>
        private IEnumerator ProcessQueryCoroutine(string input)
        {
            isProcessingQuery = true;
            queriesProcessed++;
            
            // Set state to listening/processing
            SetState(AssistantState.Listening);
            yield return new WaitForSeconds(0.5f);
            
            SetState(AssistantState.Processing);
            
            // Simulate AI processing time
            yield return new WaitForSeconds(1f);
            
            // Generate response
            string response = GenerateResponse(input);
            
            // Convert response to signs
            if (signGenerator != null && !string.IsNullOrEmpty(response))
            {
                SetState(AssistantState.Signing);
                signGenerator.GenerateAndPlaySigns(response);
                successfulResponses++;
            }
            else
            {
                HandleError("Failed to generate response");
                errorResponses++;
            }
            
            // Wait for signing to complete
            yield return new WaitUntil(() => avatar == null || !avatar.IsPlaying());
            
            // Return to idle
            SetState(AssistantState.Idle);
            isProcessingQuery = false;
        }
        
        /// <summary>
        /// Generate AI response (placeholder for actual AI integration)
        /// </summary>
        private string GenerateResponse(string input)
        {
            // This would integrate with your AI backend
            // For now, return a simple echo response
            
            input = input.ToLower().Trim();
            
            // Simple pattern matching for common queries
            if (input.Contains("hello") || input.Contains("hi"))
            {
                return "hello friend";
            }
            else if (input.Contains("help"))
            {
                return "how can I help you";
            }
            else if (input.Contains("thank"))
            {
                return "you are welcome";
            }
            else if (input.Contains("name"))
            {
                return "my name is sign assistant";
            }
            else
            {
                return "I understand";
            }
        }
        
        /// <summary>
        /// Set assistant state and update UI
        /// </summary>
        public void SetState(AssistantState newState)
        {
            currentState = newState;
            ShowVisualFeedback(newState);
            
            if (enableAudioFeedback)
            {
                PlayStateSound(newState);
            }
            
            Debug.Log($"Assistant state: {newState}");
        }
        
        /// <summary>
        /// Show visual feedback for current state
        /// </summary>
        public void ShowVisualFeedback(AssistantState state)
        {
            if (!enableVisualFeedback) return;
            
            // Hide all indicators
            if (listeningIndicator != null) listeningIndicator.SetActive(false);
            if (processingIndicator != null) processingIndicator.SetActive(false);
            if (errorIndicator != null) errorIndicator.SetActive(false);
            
            // Show appropriate indicator
            switch (state)
            {
                case AssistantState.Listening:
                    if (listeningIndicator != null) listeningIndicator.SetActive(true);
                    break;
                    
                case AssistantState.Processing:
                    if (processingIndicator != null) processingIndicator.SetActive(true);
                    break;
                    
                case AssistantState.Signing:
                    // Optional: Show signing indicator
                    break;
                    
                case AssistantState.Idle:
                    // All indicators off
                    break;
            }
        }
        
        /// <summary>
        /// Play sound for state transition
        /// </summary>
        private void PlayStateSound(AssistantState state)
        {
            // Placeholder for audio feedback
            // Would play appropriate sound for each state
        }
        
        /// <summary>
        /// Handle error state
        /// </summary>
        private void HandleError(string errorMessage)
        {
            Debug.LogError($"Assistant error: {errorMessage}");
            
            if (errorIndicator != null)
            {
                errorIndicator.SetActive(true);
                StartCoroutine(HideErrorIndicatorAfterDelay(3f));
            }
        }
        
        /// <summary>
        /// Hide error indicator after delay
        /// </summary>
        private IEnumerator HideErrorIndicatorAfterDelay(float delay)
        {
            yield return new WaitForSeconds(delay);
            if (errorIndicator != null)
            {
                errorIndicator.SetActive(false);
            }
        }
        
        /// <summary>
        /// Get success rate
        /// </summary>
        public float GetSuccessRate()
        {
            if (queriesProcessed == 0) return 0f;
            return (float)successfulResponses / queriesProcessed;
        }
        
        /// <summary>
        /// Reset statistics
        /// </summary>
        public void ResetStatistics()
        {
            queriesProcessed = 0;
            successfulResponses = 0;
            errorResponses = 0;
            Debug.Log("Assistant statistics reset");
        }
    }
}
