/**
 * Vision Model Types and Utilities for Sign Language Recognition
 *
 * Pre-trained model support for:
 * - Sign language recognition
 * - Hand pose estimation
 * - Facial expression recognition
 * - Low-resource system optimization
 */
export type SignLanguage = "asl" | "bsl" | "auslan" | "nzsl" | "lsf" | "dgs" | "jsl";
export interface HandLandmark {
    x: number;
    y: number;
    z: number;
    visibility?: number;
}
export interface HandPose {
    landmarks: HandLandmark[];
    handedness: "left" | "right";
    confidence: number;
}
export interface FacialExpression {
    type: "neutral" | "happy" | "questioning" | "emphasizing" | "negation";
    intensity: number;
    confidence: number;
}
export interface SignRecognitionResult {
    sign: string;
    language: SignLanguage;
    confidence: number;
    alternatives: Array<{
        sign: string;
        confidence: number;
    }>;
    handPoses: HandPose[];
    facialExpression?: FacialExpression;
    timestamp: number;
}
export interface VisionModelConfig {
    modelPath: string;
    language: SignLanguage;
    minConfidence: number;
    maxHands: number;
    enableFacialRecognition: boolean;
    lowResourceMode: boolean;
}
export interface ModelMetadata {
    name: string;
    version: string;
    language: SignLanguage;
    vocabulary: string[];
    accuracy: number;
    trainingDataSize: number;
    lastUpdated: string;
}
/**
 * Default configurations for different deployment scenarios
 */
export declare const VisionModelPresets: Record<string, Partial<VisionModelConfig>>;
/**
 * SignRecognitionModel - Abstract class for sign language recognition models
 */
export declare abstract class SignRecognitionModel {
    protected config: VisionModelConfig;
    protected metadata: ModelMetadata | null;
    protected isLoaded: boolean;
    constructor(config: Partial<VisionModelConfig> & {
        language: SignLanguage;
    });
    abstract load(): Promise<void>;
    abstract recognize(frame: ImageData | HTMLVideoElement): Promise<SignRecognitionResult | null>;
    abstract dispose(): void;
    getMetadata(): ModelMetadata | null;
    isReady(): boolean;
    updateConfig(updates: Partial<VisionModelConfig>): void;
}
/**
 * MediaPipeSignRecognition - Implementation using MediaPipe for hand tracking
 */
export declare class MediaPipeSignRecognition extends SignRecognitionModel {
    private handDetector;
    load(): Promise<void>;
    recognize(_frame: ImageData | HTMLVideoElement): Promise<SignRecognitionResult | null>;
    dispose(): void;
    private getDefaultVocabulary;
}
/**
 * TensorFlowSignRecognition - Implementation using TensorFlow.js
 */
export declare class TensorFlowSignRecognition extends SignRecognitionModel {
    private model;
    load(): Promise<void>;
    recognize(_frame: ImageData | HTMLVideoElement): Promise<SignRecognitionResult | null>;
    dispose(): void;
}
/**
 * Factory function to create appropriate model based on environment
 */
export declare function createSignRecognitionModel(language: SignLanguage, preset?: keyof typeof VisionModelPresets): SignRecognitionModel;
/**
 * Utility functions for vision model operations
 */
export declare const VisionModelUtils: {
    /**
     * Calculate distance between two hand landmarks
     */
    landmarkDistance(a: HandLandmark, b: HandLandmark): number;
    /**
     * Normalize hand landmarks to a standard scale
     */
    normalizeLandmarks(landmarks: HandLandmark[]): HandLandmark[];
    /**
     * Smooth landmarks over time to reduce jitter
     */
    smoothLandmarks(current: HandLandmark[], previous: HandLandmark[], smoothingFactor?: number): HandLandmark[];
    /**
     * Detect if hand is making a fist gesture
     */
    isFist(landmarks: HandLandmark[]): boolean;
    /**
     * Detect if hand is showing open palm
     */
    isOpenPalm(landmarks: HandLandmark[]): boolean;
};
