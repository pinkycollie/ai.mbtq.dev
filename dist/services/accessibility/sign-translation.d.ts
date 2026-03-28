/**
 * Sign Language Translation Service
 * ASL/BSL translation system for Deaf-centric accessibility
 */
import { z } from 'zod';
export type SignLanguage = 'asl' | 'bsl' | 'lsf' | 'dgs' | 'jsl' | 'auslan' | 'lsrd';
declare const TranslationConfigSchema: z.ZodObject<{
    defaultLanguage: z.ZodDefault<z.ZodEnum<{
        asl: "asl";
        bsl: "bsl";
        lsf: "lsf";
        dgs: "dgs";
        jsl: "jsl";
        auslan: "auslan";
        lsrd: "lsrd";
    }>>;
    enableGlossNotation: z.ZodDefault<z.ZodBoolean>;
    includeFacialExpressions: z.ZodDefault<z.ZodBoolean>;
    includeNonManualSignals: z.ZodDefault<z.ZodBoolean>;
    confidenceThreshold: z.ZodDefault<z.ZodNumber>;
}, z.core.$strip>;
type TranslationConfig = z.infer<typeof TranslationConfigSchema>;
interface SignRepresentation {
    gloss: string;
    handshape: string;
    movement: string;
    location: string;
    palmOrientation: string;
    facialExpression?: string;
    nonManualSignals?: string[];
}
interface TranslationResult {
    id: string;
    inputText: string;
    inputLanguage: string;
    outputLanguage: SignLanguage;
    signs: SignRepresentation[];
    glossNotation: string;
    confidence: number;
    processingTime: number;
    alternatives?: TranslationResult[];
}
interface RecognitionResult {
    id: string;
    inputType: 'video' | 'image' | 'stream';
    detectedSigns: DetectedSign[];
    translatedText: string;
    confidence: number;
    processingTime: number;
}
interface DetectedSign {
    sign: string;
    timestamp?: number;
    duration?: number;
    confidence: number;
    language: SignLanguage;
}
/**
 * Sign Language Translation Service
 */
export declare class SignLanguageTranslationService {
    private config;
    constructor(config?: Partial<TranslationConfig>);
    /**
     * Translate text to sign language representation
     */
    translateTextToSign(text: string, targetLanguage?: SignLanguage): Promise<TranslationResult>;
    /**
     * Recognize signs from video/image input
     */
    recognizeSigns(inputData: ArrayBuffer | string, inputType: 'video' | 'image' | 'stream'): Promise<RecognitionResult>;
    /**
     * Get sign details
     */
    getSignDetails(sign: string, language?: SignLanguage): Promise<SignRepresentation | null>;
    /**
     * Get all available signs
     */
    getAvailableSigns(language?: SignLanguage): string[];
    /**
     * Get supported languages
     */
    getSupportedLanguages(): SignLanguage[];
    /**
     * Tokenize input text
     */
    private tokenizeText;
    /**
     * Look up a sign in the database
     */
    private lookupSign;
    /**
     * Create fingerspelling representation for unknown words
     */
    private fingerspell;
    /**
     * Calculate confidence score for translation
     */
    private calculateConfidence;
    /**
     * Calculate average confidence from detections
     */
    private calculateAvgConfidence;
}
export declare function getSignTranslation(config?: Partial<TranslationConfig>): SignLanguageTranslationService;
export default SignLanguageTranslationService;
