/**
 * Sign Language Machine Learning Utilities
 * Tools for sign recognition, translation, and accessibility metrics
 */

import { z } from 'zod'

// Configuration for ML models
export const MLConfigSchema = z.object({
  modelType: z.enum(['vision', 'language', 'hybrid']).default('vision'),
  confidenceThreshold: z.number().min(0).max(1).default(0.8),
  enableRealTime: z.boolean().default(true),
  supportedLanguages: z.array(z.string()).default(['asl', 'bsl', 'lsf']),
  optimizationLevel: z.enum(['performance', 'balanced', 'accuracy']).default('balanced'),
})

export type MLConfig = z.infer<typeof MLConfigSchema>

// Recognition results
export interface RecognitionResult {
  sign: string
  confidence: number
  language: string
  timestamp: number
  metadata?: Record<string, any>
}

// Export specific ML modules
export * from './vision-models.js'
export * from './language-models.js'

/**
 * ML Service Registry
 */
export class MLServiceRegistry {
  private static instance: MLServiceRegistry
  private services: Map<string, any> = new Map()

  private constructor() {}

  public static getInstance(): MLServiceRegistry {
    if (!MLServiceRegistry.instance) {
      MLServiceRegistry.instance = new MLServiceRegistry()
    }
    return MLServiceRegistry.instance
  }

  public register(name: string, service: any): void {
    this.services.set(name, service)
  }

  public get(name: string): any {
    return this.services.get(name)
  }
}

/**
 * Factory function for creating sign recognition models
 */
export function createSignRecognitionModel(
  language: string = 'asl',
  mode: 'balanced' | 'fast' = 'balanced'
) {
  // Mock model for demonstration
  return {
    language,
    mode,
    load: async () => true,
    recognize: async (frame: any) => ({
      sign: 'HELLO',
      confidence: 0.95,
      timestamp: Date.now(),
    }),
  }
}

export default MLServiceRegistry
