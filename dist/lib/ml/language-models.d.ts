/**
 * Sign Language Grammar and Translation Models
 * Handles ASL/BSL syntax and translation logic
 */
import { z } from 'zod';
export declare const GrammarRuleSchema: z.ZodObject<{
    language: z.ZodDefault<z.ZodEnum<{
        asl: "asl";
        bsl: "bsl";
        lsf: "lsf";
        other: "other";
    }>>;
    syntax: z.ZodDefault<z.ZodEnum<{
        SOV: "SOV";
        SVO: "SVO";
        OSV: "OSV";
        "Topic-Comment": "Topic-Comment";
    }>>;
    nonManualMarkers: z.ZodDefault<z.ZodBoolean>;
    facialExpressions: z.ZodDefault<z.ZodBoolean>;
    spaceUsage: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export type GrammarRule = z.infer<typeof GrammarRuleSchema>;
export interface TranslationRequest {
    text: string;
    sourceLang: string;
    targetLang: string;
    preserveTone?: boolean;
    includeGloss?: boolean;
}
export interface TranslationResult {
    translatedText: string;
    gloss?: string;
    confidence: number;
    metadata: {
        grammarUsed: string;
        processingTime: number;
    };
}
/**
 * Sign Language Translator
 */
export declare class SignLanguageTranslator {
    private language;
    private rules;
    constructor(language?: string, rules?: Partial<GrammarRule>);
    /**
     * Translate text to sign language gloss/representation
     */
    translate(request: TranslationRequest): Promise<TranslationResult>;
    /**
     * Get grammar rules for current language
     */
    getGrammarRules(): GrammarRule;
    /**
     * Validate if text can be translated
     */
    validateText(text: string): boolean;
}
export default SignLanguageTranslator;
