/**
 * Sign Language Machine Learning Utilities
 * Tools for sign recognition, translation, and accessibility metrics
 */
import { z } from 'zod';
// Configuration for ML models
export const MLConfigSchema = z.object({
    modelType: z.enum(['vision', 'language', 'hybrid']).default('vision'),
    confidenceThreshold: z.number().min(0).max(1).default(0.8),
    enableRealTime: z.boolean().default(true),
    supportedLanguages: z.array(z.string()).default(['asl', 'bsl', 'lsf']),
    optimizationLevel: z.enum(['performance', 'balanced', 'accuracy']).default('balanced'),
});
// Export specific ML modules
export * from './vision-models.js';
export * from './language-models.js';
/**
 * ML Service Registry
 */
export class MLServiceRegistry {
    static instance;
    services = new Map();
    constructor() { }
    static getInstance() {
        if (!MLServiceRegistry.instance) {
            MLServiceRegistry.instance = new MLServiceRegistry();
        }
        return MLServiceRegistry.instance;
    }
    register(name, service) {
        this.services.set(name, service);
    }
    get(name) {
        return this.services.get(name);
    }
}
/**
 * Factory function for creating sign recognition models
 */
export function createSignRecognitionModel(language = 'asl', mode = 'balanced') {
    // Mock model for demonstration
    return {
        language,
        mode,
        load: async () => true,
        recognize: async (frame) => ({
            sign: 'HELLO',
            confidence: 0.95,
            timestamp: Date.now(),
        }),
    };
}
export default MLServiceRegistry;
//# sourceMappingURL=index.js.map