using UnityEngine;
using System.Collections;
using System.Collections.Generic;

namespace SignLanguageAssistant
{
    /// <summary>
    /// Main sign language avatar controller
    /// Manages animation playback and sign queue
    /// </summary>
    public class SignLanguageAvatar : MonoBehaviour
    {
        [System.Serializable]
        public class SignAnimation
        {
            public string gloss;
            public AnimationClip clip;
            public float duration;
            public FacialExpression expression;
            
            public SignAnimation(string gloss, AnimationClip clip, float duration, FacialExpression expression)
            {
                this.gloss = gloss;
                this.clip = clip;
                this.duration = duration;
                this.expression = expression;
            }
        }
        
        [System.Serializable]
        public class FacialExpression
        {
            public string expressionName;
            public float intensity;
            public float duration;
            
            public FacialExpression(string name, float intensity, float duration)
            {
                this.expressionName = name;
                this.intensity = intensity;
                this.duration = duration;
            }
        }
        
        [Header("Animation Settings")]
        public List<SignAnimation> signLibrary = new List<SignAnimation>();
        public float transitionDuration = 0.2f;
        
        [Header("Components")]
        private Animator animator;
        private Queue<SignAnimation> signQueue;
        private bool isPlaying = false;
        
        [Header("Status")]
        public string currentSign = "idle";
        public int queuedSigns = 0;
        
        void Start()
        {
            animator = GetComponent<Animator>();
            if (animator == null)
            {
                Debug.LogError("SignLanguageAvatar requires an Animator component!");
            }
            
            signQueue = new Queue<SignAnimation>();
            LoadSignLibrary();
        }
        
        void Update()
        {
            queuedSigns = signQueue.Count;
        }
        
        /// <summary>
        /// Queue a sign for playback
        /// </summary>
        public void QueueSign(string signGloss)
        {
            SignAnimation sign = FindSign(signGloss);
            if (sign != null)
            {
                signQueue.Enqueue(sign);
                Debug.Log($"Queued sign: {signGloss}");
                
                if (!isPlaying)
                {
                    PlayNextSign();
                }
            }
            else
            {
                Debug.LogWarning($"Sign not found in library: {signGloss}");
            }
        }
        
        /// <summary>
        /// Queue multiple signs in sequence
        /// </summary>
        public void QueueSignSequence(List<string> signGlosses)
        {
            foreach (string gloss in signGlosses)
            {
                QueueSign(gloss);
            }
        }
        
        /// <summary>
        /// Clear the sign queue
        /// </summary>
        public void ClearQueue()
        {
            signQueue.Clear();
            Debug.Log("Sign queue cleared");
        }
        
        /// <summary>
        /// Play the next sign in queue
        /// </summary>
        private void PlayNextSign()
        {
            if (signQueue.Count > 0 && !isPlaying)
            {
                SignAnimation nextSign = signQueue.Dequeue();
                StartCoroutine(PlaySignCoroutine(nextSign));
            }
            else if (signQueue.Count == 0)
            {
                // Return to idle state
                StartCoroutine(ReturnToIdle());
            }
        }
        
        /// <summary>
        /// Play a sign animation with smooth transitions
        /// </summary>
        private IEnumerator PlaySignCoroutine(SignAnimation sign)
        {
            isPlaying = true;
            currentSign = sign.gloss;
            
            // Start transition to new sign
            if (sign.clip != null)
            {
                animator.CrossFade(sign.clip.name, transitionDuration);
            }
            
            // Handle facial expressions
            UpdateFacialExpression(sign.expression);
            
            // Wait for sign duration minus transition time
            yield return new WaitForSeconds(sign.duration - transitionDuration);
            
            isPlaying = false;
            
            // Queue next sign
            PlayNextSign();
        }
        
        /// <summary>
        /// Return avatar to idle state
        /// </summary>
        private IEnumerator ReturnToIdle()
        {
            currentSign = "idle";
            animator.CrossFade("Idle", transitionDuration);
            yield return null;
        }
        
        /// <summary>
        /// Update facial expression based on sign
        /// </summary>
        private void UpdateFacialExpression(FacialExpression expression)
        {
            if (expression != null && !string.IsNullOrEmpty(expression.expressionName))
            {
                // Set blend shape or trigger expression animation
                animator.SetTrigger(expression.expressionName);
                Debug.Log($"Setting facial expression: {expression.expressionName}");
            }
        }
        
        /// <summary>
        /// Find a sign in the library by gloss
        /// </summary>
        private SignAnimation FindSign(string gloss)
        {
            return signLibrary.Find(s => s.gloss.Equals(gloss, System.StringComparison.OrdinalIgnoreCase));
        }
        
        /// <summary>
        /// Load sign library (placeholder for loading from resources/database)
        /// </summary>
        private void LoadSignLibrary()
        {
            // This would load from Resources, AssetBundles, or a database
            // For now, signs are populated through the Inspector
            Debug.Log($"Sign library loaded with {signLibrary.Count} signs");
        }
        
        /// <summary>
        /// Get current playback state
        /// </summary>
        public bool IsPlaying()
        {
            return isPlaying;
        }
        
        /// <summary>
        /// Get number of queued signs
        /// </summary>
        public int GetQueueLength()
        {
            return signQueue.Count;
        }
    }
}
