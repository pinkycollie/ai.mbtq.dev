/**
 * Sign Language Machine Learning Utilities
 * Tools for sign recognition, translation, and accessibility metrics
 */
import { z } from 'zod';
export declare const MLConfigSchema: z.ZodObject<{
    modelType: z.ZodDefault<z.ZodEnum<{
        language: "language";
        vision: "vision";
        hybrid: "hybrid";
    }>>;
    confidenceThreshold: z.ZodDefault<z.ZodNumber>;
    enableRealTime: z.ZodDefault<z.ZodBoolean>;
    supportedLanguages: z.ZodDefault<z.ZodArray<z.ZodString>>;
    optimizationLevel: z.ZodDefault<z.ZodEnum<{
        balanced: "balanced";
        accuracy: "accuracy";
        performance: "performance";
    }>>;
}, z.core.$strip>;
export type MLConfig = z.infer<typeof MLConfigSchema>;
export interface RecognitionResult {
    sign: string;
    confidence: number;
    language: string;
    timestamp: number;
    metadata?: Record<string, any>;
}
export * from './vision-models.js';
export * from './language-models.js';
/**
 * ML Service Registry
 */
export declare class MLServiceRegistry {
    private static instance;
    private services;
    private constructor();
    static getInstance(): MLServiceRegistry;
    register(name: string, service: any): void;
    get(name: string): any;
}
/**
 * Factory function for creating sign recognition models
 */
export declare function createSignRecognitionModel(language?: string, mode?: 'balanced' | 'fast'): {
    language: string;
    mode: "balanced" | "fast";
    load: () => Promise<boolean>;
    recognize: (frame: any) => Promise<{
        sign: string;
        confidence: number;
        timestamp: number;
    }>;
};
export default MLServiceRegistry;
