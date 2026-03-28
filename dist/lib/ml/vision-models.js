/**
 * Vision Model Types and Utilities for Sign Language Recognition
 *
 * Pre-trained model support for:
 * - Sign language recognition
 * - Hand pose estimation
 * - Facial expression recognition
 * - Low-resource system optimization
 */
/**
 * Default configurations for different deployment scenarios
 */
export const VisionModelPresets = {
    highPerformance: {
        minConfidence: 0.8,
        maxHands: 2,
        enableFacialRecognition: true,
        lowResourceMode: false,
    },
    balanced: {
        minConfidence: 0.7,
        maxHands: 2,
        enableFacialRecognition: true,
        lowResourceMode: false,
    },
    lowResource: {
        minConfidence: 0.6,
        maxHands: 1,
        enableFacialRecognition: false,
        lowResourceMode: true,
    },
    mobile: {
        minConfidence: 0.65,
        maxHands: 2,
        enableFacialRecognition: false,
        lowResourceMode: true,
    },
};
/**
 * SignRecognitionModel - Abstract class for sign language recognition models
 */
export class SignRecognitionModel {
    config;
    metadata = null;
    isLoaded = false;
    constructor(config) {
        this.config = {
            modelPath: `/models/${config.language}/sign-recognition`,
            minConfidence: 0.7,
            maxHands: 2,
            enableFacialRecognition: true,
            lowResourceMode: false,
            ...config,
        };
    }
    getMetadata() {
        return this.metadata;
    }
    isReady() {
        return this.isLoaded;
    }
    updateConfig(updates) {
        this.config = { ...this.config, ...updates };
    }
}
/**
 * MediaPipeSignRecognition - Implementation using MediaPipe for hand tracking
 */
export class MediaPipeSignRecognition extends SignRecognitionModel {
    handDetector = null;
    async load() {
        try {
            // In production, this would initialize MediaPipe
            // For now, we simulate the loading process
            console.log(`Loading MediaPipe model for ${this.config.language}...`);
            this.metadata = {
                name: `mediapipe-${this.config.language}`,
                version: "1.0.0",
                language: this.config.language,
                vocabulary: this.getDefaultVocabulary(),
                accuracy: 0.92,
                trainingDataSize: 50000,
                lastUpdated: new Date().toISOString(),
            };
            this.isLoaded = true;
        }
        catch (error) {
            console.error("Failed to load MediaPipe model:", error);
            throw error;
        }
    }
    async recognize(_frame) {
        if (!this.isLoaded) {
            throw new Error("Model not loaded. Call load() first.");
        }
        // This would perform actual recognition in production
        // For now, return a mock result structure
        return {
            sign: "HELLO",
            language: this.config.language,
            confidence: 0.95,
            alternatives: [
                { sign: "HI", confidence: 0.85 },
                { sign: "WAVE", confidence: 0.72 },
            ],
            handPoses: [
                {
                    landmarks: Array(21).fill({ x: 0, y: 0, z: 0, visibility: 1 }),
                    handedness: "right",
                    confidence: 0.98,
                },
            ],
            facialExpression: {
                type: "happy",
                intensity: 0.7,
                confidence: 0.88,
            },
            timestamp: Date.now(),
        };
    }
    dispose() {
        this.handDetector = null;
        this.isLoaded = false;
    }
    getDefaultVocabulary() {
        // Concepts that have corresponding signs in most sign languages.
        // Note: The actual signs vary between ASL, BSL, etc. - these are
        // gloss representations of the concepts.
        return [
            "HELLO", "GOODBYE", "THANK_YOU", "PLEASE", "YES", "NO",
            "HELP", "SORRY", "LOVE", "FRIEND", "FAMILY", "FOOD",
            "WATER", "WORK", "HOME", "SCHOOL", "LEARN", "UNDERSTAND",
            "NAME", "NICE", "MEET", "HOW", "WHAT", "WHERE", "WHEN",
            "WHY", "WHO", "WHICH", "GOOD", "BAD", "MORE", "FINISH",
        ];
    }
}
/**
 * TensorFlowSignRecognition - Implementation using TensorFlow.js
 */
export class TensorFlowSignRecognition extends SignRecognitionModel {
    model = null;
    async load() {
        try {
            console.log(`Loading TensorFlow model for ${this.config.language}...`);
            this.metadata = {
                name: `tensorflow-${this.config.language}`,
                version: "1.0.0",
                language: this.config.language,
                vocabulary: [],
                accuracy: 0.89,
                trainingDataSize: 100000,
                lastUpdated: new Date().toISOString(),
            };
            this.isLoaded = true;
        }
        catch (error) {
            console.error("Failed to load TensorFlow model:", error);
            throw error;
        }
    }
    async recognize(_frame) {
        if (!this.isLoaded) {
            throw new Error("Model not loaded. Call load() first.");
        }
        // Placeholder for TensorFlow-based recognition
        return null;
    }
    dispose() {
        this.model = null;
        this.isLoaded = false;
    }
}
/**
 * Factory function to create appropriate model based on environment
 */
export function createSignRecognitionModel(language, preset = "balanced") {
    const presetConfig = VisionModelPresets[preset];
    // Use MediaPipe for browser environments with camera access
    if (typeof window !== "undefined") {
        return new MediaPipeSignRecognition({
            language,
            ...presetConfig,
        });
    }
    // Use TensorFlow for server-side processing
    return new TensorFlowSignRecognition({
        language,
        ...presetConfig,
    });
}
/**
 * Utility functions for vision model operations
 */
export const VisionModelUtils = {
    /**
     * Calculate distance between two hand landmarks
     */
    landmarkDistance(a, b) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) +
            Math.pow(a.y - b.y, 2) +
            Math.pow(a.z - b.z, 2));
    },
    /**
     * Normalize hand landmarks to a standard scale
     */
    normalizeLandmarks(landmarks) {
        if (landmarks.length === 0)
            return [];
        // Find bounding box
        let minX = Infinity, maxX = -Infinity;
        let minY = Infinity, maxY = -Infinity;
        let minZ = Infinity, maxZ = -Infinity;
        for (const landmark of landmarks) {
            minX = Math.min(minX, landmark.x);
            maxX = Math.max(maxX, landmark.x);
            minY = Math.min(minY, landmark.y);
            maxY = Math.max(maxY, landmark.y);
            minZ = Math.min(minZ, landmark.z);
            maxZ = Math.max(maxZ, landmark.z);
        }
        const rangeX = maxX - minX || 1;
        const rangeY = maxY - minY || 1;
        const rangeZ = maxZ - minZ || 1;
        return landmarks.map((l) => ({
            x: (l.x - minX) / rangeX,
            y: (l.y - minY) / rangeY,
            z: (l.z - minZ) / rangeZ,
            visibility: l.visibility,
        }));
    },
    /**
     * Smooth landmarks over time to reduce jitter
     */
    smoothLandmarks(current, previous, smoothingFactor = 0.7) {
        if (previous.length !== current.length)
            return current;
        return current.map((c, i) => ({
            x: c.x * (1 - smoothingFactor) + previous[i].x * smoothingFactor,
            y: c.y * (1 - smoothingFactor) + previous[i].y * smoothingFactor,
            z: c.z * (1 - smoothingFactor) + previous[i].z * smoothingFactor,
            visibility: c.visibility,
        }));
    },
    /**
     * Detect if hand is making a fist gesture
     */
    isFist(landmarks) {
        if (landmarks.length < 21)
            return false;
        // Check if fingertips are close to palm
        const palmBase = landmarks[0];
        const fingertips = [landmarks[4], landmarks[8], landmarks[12], landmarks[16], landmarks[20]];
        const avgDistance = fingertips.reduce((sum, tip) => sum + this.landmarkDistance(palmBase, tip), 0) / fingertips.length;
        return avgDistance < 0.15; // Threshold for fist detection
    },
    /**
     * Detect if hand is showing open palm
     */
    isOpenPalm(landmarks) {
        if (landmarks.length < 21)
            return false;
        const palmBase = landmarks[0];
        const fingertips = [landmarks[4], landmarks[8], landmarks[12], landmarks[16], landmarks[20]];
        const avgDistance = fingertips.reduce((sum, tip) => sum + this.landmarkDistance(palmBase, tip), 0) / fingertips.length;
        return avgDistance > 0.4; // Threshold for open palm detection
    },
};
//# sourceMappingURL=vision-models.js.map