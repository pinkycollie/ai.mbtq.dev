/**
 * Machine Learning Utilities for Deaf Inclusion
 * 
 * This module provides:
 * - Vision models for sign language recognition
 * - Language models for ASL/BSL syntax translation
 * - Accessibility standards generators
 * - Pre-trained model configurations for various deployment scenarios
 */

// Vision Models
export {
  // Types
  type SignLanguage,
  type HandLandmark,
  type HandPose,
  type FacialExpression,
  type SignRecognitionResult,
  type VisionModelConfig,
  type ModelMetadata,
  // Classes
  SignRecognitionModel,
  MediaPipeSignRecognition,
  TensorFlowSignRecognition,
  // Factory
  createSignRecognitionModel,
  // Presets and utilities
  VisionModelPresets,
  VisionModelUtils,
} from "./vision-models"

// Language Models
export {
  // Types
  type SignGloss,
  type NonManualMarker,
  type TranslationResult,
  type GrammarRule,
  type AccessibilityGuideline,
  type AccessibilityReport,
  type AccessibilityIssue,
  // Classes
  SignLanguageTranslator,
  AccessibilityStandardsGenerator,
  // Rules
  ASLGrammarRules,
} from "./language-models"
