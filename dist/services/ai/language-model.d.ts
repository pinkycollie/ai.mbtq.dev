import { z } from 'zod';
declare const LLMConfigSchema: z.ZodObject<{
    model: z.ZodDefault<z.ZodString>;
    maxTokens: z.ZodDefault<z.ZodNumber>;
    temperature: z.ZodDefault<z.ZodNumber>;
    systemPrompt: z.ZodDefault<z.ZodString>;
    enableCaching: z.ZodDefault<z.ZodBoolean>;
    cacheExpiry: z.ZodDefault<z.ZodNumber>;
}, z.core.$strip>;
type LLMConfig = z.infer<typeof LLMConfigSchema>;
export interface LLMRequest {
    prompt: string;
    context?: string;
    language?: 'asl' | 'bsl' | 'lsf' | 'other';
    taskType?: 'translate' | 'explain' | 'generate' | 'chat';
}
export interface LLMResponse {
    id: string;
    content: string;
    tokenUsage: {
        prompt: number;
        completion: number;
        total: number;
    };
    cached: boolean;
    processingTime: number;
}
export declare class LanguageModelService {
    private config;
    private cache;
    constructor(config?: Partial<LLMConfig>);
    generate(request: LLMRequest): Promise<LLMResponse>;
    private callLLM;
}
export declare function getLanguageModel(config?: Partial<LLMConfig>): LanguageModelService;
export default LanguageModelService;
