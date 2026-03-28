import { z } from 'zod';
import crypto from 'crypto';
const LLMConfigSchema = z.object({
    model: z.string().default('llama-3.1-70b-versatile'),
    maxTokens: z.number().default(4096),
    temperature: z.number().min(0).max(2).default(0.7),
    systemPrompt: z.string().default("You are PINKY AI."),
    enableCaching: z.boolean().default(true),
    cacheExpiry: z.number().default(3600000),
});
export class LanguageModelService {
    config;
    cache = new Map();
    constructor(config = {}) { this.config = LLMConfigSchema.parse(config); }
    async generate(request) {
        const startTime = Date.now();
        const cacheKey = JSON.stringify(request);
        if (this.config.enableCaching) {
            const entry = this.cache.get(cacheKey);
            if (entry && Date.now() - entry.timestamp < this.config.cacheExpiry) {
                return { ...entry.response, cached: true, processingTime: Date.now() - startTime };
            }
        }
        const response = await this.callLLM(request);
        if (this.config.enableCaching)
            this.cache.set(cacheKey, { response, timestamp: Date.now() });
        return { ...response, cached: false, processingTime: Date.now() - startTime };
    }
    async callLLM(request) {
        const content = "Response to " + request.prompt;
        return { id: crypto.randomUUID(), content, tokenUsage: { prompt: 10, completion: 10, total: 20 }, cached: false, processingTime: 0 };
    }
}
let llmInstance = null;
export function getLanguageModel(config) {
    if (!llmInstance)
        llmInstance = new LanguageModelService(config);
    return llmInstance;
}
export default LanguageModelService;
//# sourceMappingURL=language-model.js.map