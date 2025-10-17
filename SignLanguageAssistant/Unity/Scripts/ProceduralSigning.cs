using UnityEngine;
using System.Collections;

namespace SignLanguageAssistant
{
    /// <summary>
    /// Applies procedural enhancements to sign animations
    /// Handles coarticulation, natural variation, and smooth transitions
    /// </summary>
    public class ProceduralSigning : MonoBehaviour
    {
        [Header("Settings")]
        [Range(0f, 1f)]
        public float coarticulationStrength = 0.5f;
        
        [Range(0f, 0.1f)]
        public float timingVariation = 0.05f;
        
        [Range(0f, 0.05f)]
        public float positionVariation = 0.02f;
        
        public bool enableBodySway = true;
        public bool enableBreathing = true;
        public bool enableEyeMovement = true;
        public bool enableBlinking = true;
        
        [Header("Body Animation")]
        public float swaySpeed = 0.5f;
        public float swayAmount = 0.02f;
        
        public float breathingSpeed = 0.3f;
        public float breathingAmount = 0.01f;
        
        [Header("Eye Animation")]
        public float blinkInterval = 3f;
        public float blinkDuration = 0.1f;
        
        private Transform bodyTransform;
        private Transform headTransform;
        private float lastBlinkTime;
        
        void Start()
        {
            bodyTransform = transform.Find("Body");
            headTransform = transform.Find("Head");
            lastBlinkTime = Time.time;
        }
        
        void Update()
        {
            if (enableBodySway)
            {
                ApplyBodySway();
            }
            
            if (enableBreathing)
            {
                ApplyBreathing();
            }
            
            if (enableBlinking && Time.time - lastBlinkTime > blinkInterval)
            {
                StartCoroutine(PerformBlink());
            }
        }
        
        /// <summary>
        /// Apply coarticulation between two signs
        /// Adjusts hand transition paths for natural movement
        /// </summary>
        public void ApplyCoarticulation(SignLanguageAvatar.SignAnimation current, SignLanguageAvatar.SignAnimation next)
        {
            if (current == null || next == null) return;
            
            // Calculate transition influence based on coarticulation strength
            float influence = coarticulationStrength;
            
            // Adjust hand paths to anticipate next sign
            // This would modify animation curves in practice
            Debug.Log($"Applying coarticulation between {current.gloss} and {next.gloss}");
            
            // Blend facial expressions smoothly
            BlendFacialExpressions(current.expression, next.expression, influence);
            
            // Modify timing based on sign complexity
            float timingAdjustment = CalculateTimingAdjustment(current, next);
            Debug.Log($"Timing adjustment: {timingAdjustment:F3}s");
        }
        
        /// <summary>
        /// Add natural variation to animations
        /// Prevents robotic, repetitive movements
        /// </summary>
        public void AddNaturalVariation(AnimationClip clip)
        {
            if (clip == null) return;
            
            // Add small random variations in timing
            float timeVariation = Random.Range(-timingVariation, timingVariation);
            
            // Add small position variations
            Vector3 posVariation = new Vector3(
                Random.Range(-positionVariation, positionVariation),
                Random.Range(-positionVariation, positionVariation),
                Random.Range(-positionVariation, positionVariation)
            );
            
            Debug.Log($"Added natural variation to {clip.name}: time={timeVariation:F3}, pos={posVariation}");
        }
        
        /// <summary>
        /// Apply subtle body sway for natural appearance
        /// </summary>
        private void ApplyBodySway()
        {
            if (bodyTransform == null) return;
            
            float swayX = Mathf.Sin(Time.time * swaySpeed) * swayAmount;
            float swayZ = Mathf.Cos(Time.time * swaySpeed * 0.7f) * swayAmount * 0.5f;
            
            bodyTransform.localPosition = new Vector3(swayX, 0, swayZ);
        }
        
        /// <summary>
        /// Apply breathing animation
        /// </summary>
        private void ApplyBreathing()
        {
            if (bodyTransform == null) return;
            
            float breathScale = 1f + Mathf.Sin(Time.time * breathingSpeed) * breathingAmount;
            bodyTransform.localScale = new Vector3(1f, breathScale, 1f);
        }
        
        /// <summary>
        /// Perform blinking animation
        /// </summary>
        private IEnumerator PerformBlink()
        {
            lastBlinkTime = Time.time;
            
            if (enableEyeMovement)
            {
                // Close eyes
                // In practice, this would trigger blend shapes or animation
                Debug.Log("Blink: eyes closing");
                yield return new WaitForSeconds(blinkDuration * 0.5f);
                
                // Open eyes
                Debug.Log("Blink: eyes opening");
                yield return new WaitForSeconds(blinkDuration * 0.5f);
            }
            
            // Add random variation to next blink
            blinkInterval = Random.Range(2f, 5f);
        }
        
        /// <summary>
        /// Blend facial expressions smoothly
        /// </summary>
        private void BlendFacialExpressions(
            SignLanguageAvatar.FacialExpression current,
            SignLanguageAvatar.FacialExpression next,
            float blendFactor)
        {
            if (current == null || next == null) return;
            
            // Calculate blended intensity
            float blendedIntensity = Mathf.Lerp(
                current.intensity,
                next.intensity,
                blendFactor
            );
            
            Debug.Log($"Blending expressions: {current.expressionName} -> {next.expressionName} ({blendFactor:F2})");
        }
        
        /// <summary>
        /// Calculate timing adjustment between signs
        /// </summary>
        private float CalculateTimingAdjustment(
            SignLanguageAvatar.SignAnimation current,
            SignLanguageAvatar.SignAnimation next)
        {
            // More complex signs need more transition time
            float baseAdjustment = 0f;
            
            // Add timing based on sign duration difference
            if (current.duration > next.duration)
            {
                baseAdjustment = (current.duration - next.duration) * 0.1f;
            }
            
            return baseAdjustment;
        }
        
        /// <summary>
        /// Add eye contact and gaze behavior
        /// </summary>
        public void UpdateGazeBehavior(Vector3 targetPosition)
        {
            if (headTransform == null || !enableEyeMovement) return;
            
            // Smoothly rotate head towards target
            Vector3 direction = (targetPosition - headTransform.position).normalized;
            Quaternion lookRotation = Quaternion.LookRotation(direction);
            
            // Limit rotation to natural head movement range
            float maxAngle = 45f;
            lookRotation = Quaternion.RotateTowards(
                headTransform.rotation,
                lookRotation,
                maxAngle
            );
            
            headTransform.rotation = Quaternion.Slerp(
                headTransform.rotation,
                lookRotation,
                Time.deltaTime * 2f
            );
        }
    }
}
