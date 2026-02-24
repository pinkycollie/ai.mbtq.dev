/**
 * Sign Language Translation Service
 * ASL/BSL translation system for Deaf-centric accessibility
 */

import { z } from 'zod'

// Supported sign languages
// asl = American Sign Language
// bsl = British Sign Language
// lsf = Langue des Signes Française (French)
// dgs = Deutsche Gebärdensprache (German)
// jsl = Japanese Sign Language
// auslan = Australian Sign Language
// lsrd = Lengua de Señas de la República Dominicana (Dominican Republic)
export type SignLanguage = 'asl' | 'bsl' | 'lsf' | 'dgs' | 'jsl' | 'auslan' | 'lsrd'

// Configuration schema
const TranslationConfigSchema = z.object({
  defaultLanguage: z.enum(['asl', 'bsl', 'lsf', 'dgs', 'jsl', 'auslan', 'lsrd']).default('asl'),
  enableGlossNotation: z.boolean().default(true),
  includeFacialExpressions: z.boolean().default(true),
  includeNonManualSignals: z.boolean().default(true),
  confidenceThreshold: z.number().min(0).max(1).default(0.7),
})

type TranslationConfig = z.infer<typeof TranslationConfigSchema>

// Sign representation
interface SignRepresentation {
  gloss: string // Written representation
  handshape: string
  movement: string
  location: string
  palmOrientation: string
  facialExpression?: string
  nonManualSignals?: string[]
}

// Translation result
interface TranslationResult {
  id: string
  inputText: string
  inputLanguage: string
  outputLanguage: SignLanguage
  signs: SignRepresentation[]
  glossNotation: string
  confidence: number
  processingTime: number
  alternatives?: TranslationResult[]
}

// Recognition result (video/image to text)
interface RecognitionResult {
  id: string
  inputType: 'video' | 'image' | 'stream'
  detectedSigns: DetectedSign[]
  translatedText: string
  confidence: number
  processingTime: number
}

interface DetectedSign {
  sign: string
  timestamp?: number
  duration?: number
  confidence: number
  language: SignLanguage
}

// Common ASL signs database (simplified)
const ASL_SIGNS_DATABASE: Record<string, SignRepresentation> = {
  'hello': {
    gloss: 'HELLO',
    handshape: 'B-hand (flat hand)',
    movement: 'Wave from forehead outward',
    location: 'Forehead',
    palmOrientation: 'Palm out',
    facialExpression: 'Friendly expression',
  },
  'thank-you': {
    gloss: 'THANK-YOU',
    handshape: 'Flat hand',
    movement: 'Hand moves from chin forward',
    location: 'Chin',
    palmOrientation: 'Palm toward face, then out',
    facialExpression: 'Appreciative smile',
  },
  'please': {
    gloss: 'PLEASE',
    handshape: 'Flat hand',
    movement: 'Circular motion on chest',
    location: 'Chest',
    palmOrientation: 'Palm against chest',
  },
  'yes': {
    gloss: 'YES',
    handshape: 'S-hand (fist)',
    movement: 'Nod fist up and down',
    location: 'Neutral space',
    palmOrientation: 'Palm facing left',
  },
  'no': {
    gloss: 'NO',
    handshape: 'Index and middle finger extended',
    movement: 'Snap fingers together',
    location: 'Neutral space',
    palmOrientation: 'Palm down',
    facialExpression: 'Head shake',
  },
  'help': {
    gloss: 'HELP',
    handshape: 'A-hand on flat hand',
    movement: 'Flat hand lifts fist upward',
    location: 'Neutral space',
    palmOrientation: 'Palm up for flat hand',
  },
  'sorry': {
    gloss: 'SORRY',
    handshape: 'A-hand (fist with thumb up)',
    movement: 'Circular motion on chest',
    location: 'Chest',
    palmOrientation: 'Palm toward chest',
    facialExpression: 'Apologetic expression',
  },
  'love': {
    gloss: 'LOVE',
    handshape: 'Crossed arms',
    movement: 'Arms cross over chest',
    location: 'Chest',
    palmOrientation: 'Palms facing body',
  },
  'name': {
    gloss: 'NAME',
    handshape: 'H-hand (index and middle finger extended)',
    movement: 'Tap fingers together twice',
    location: 'Neutral space',
    palmOrientation: 'Palms facing each other',
  },
  'learn': {
    gloss: 'LEARN',
    handshape: 'Flat hand to claw hand',
    movement: 'Pull hand from flat palm to forehead',
    location: 'Palm to forehead',
    palmOrientation: 'Palm up then toward head',
  },
}

/**
 * Sign Language Translation Service
 */
export class SignLanguageTranslationService {
  private config: TranslationConfig

  constructor(config: Partial<TranslationConfig> = {}) {
    this.config = TranslationConfigSchema.parse(config)
  }

  /**
   * Translate text to sign language representation
   */
  async translateTextToSign(
    text: string,
    targetLanguage: SignLanguage = this.config.defaultLanguage
  ): Promise<TranslationResult> {
    const startTime = Date.now()
    const words = this.tokenizeText(text)
    const signs: SignRepresentation[] = []

    for (const word of words) {
      const sign = await this.lookupSign(word.toLowerCase(), targetLanguage)
      if (sign) {
        signs.push(sign)
      } else {
        // Fingerspell unknown words
        signs.push(this.fingerspell(word))
      }
    }

    const glossNotation = signs.map(s => s.gloss).join(' ')

    return {
      id: crypto.randomUUID(),
      inputText: text,
      inputLanguage: 'en',
      outputLanguage: targetLanguage,
      signs,
      glossNotation,
      confidence: this.calculateConfidence(signs),
      processingTime: Date.now() - startTime,
    }
  }

  /**
   * Recognize signs from video/image input
   */
  async recognizeSigns(
    inputData: ArrayBuffer | string,
    inputType: 'video' | 'image' | 'stream'
  ): Promise<RecognitionResult> {
    const startTime = Date.now()

    // In production, this would use ML model for recognition
    // For now, return mock data
    const detectedSigns: DetectedSign[] = [
      { sign: 'HELLO', confidence: 0.95, language: 'asl', timestamp: 0, duration: 1.5 },
      { sign: 'HOW', confidence: 0.88, language: 'asl', timestamp: 1.5, duration: 1.0 },
      { sign: 'YOU', confidence: 0.92, language: 'asl', timestamp: 2.5, duration: 0.8 },
    ]

    const translatedText = detectedSigns.map(s => s.sign.toLowerCase()).join(' ')

    return {
      id: crypto.randomUUID(),
      inputType,
      detectedSigns,
      translatedText,
      confidence: this.calculateAvgConfidence(detectedSigns),
      processingTime: Date.now() - startTime,
    }
  }

  /**
   * Get sign details
   */
  async getSignDetails(sign: string, language: SignLanguage = 'asl'): Promise<SignRepresentation | null> {
    return this.lookupSign(sign.toLowerCase(), language)
  }

  /**
   * Get all available signs
   */
  getAvailableSigns(language: SignLanguage = 'asl'): string[] {
    // Currently only ASL database is populated
    if (language === 'asl') {
      return Object.keys(ASL_SIGNS_DATABASE)
    }
    return []
  }

  /**
   * Get supported languages
   */
  getSupportedLanguages(): SignLanguage[] {
    return ['asl', 'bsl', 'lsf', 'dgs', 'jsl', 'auslan', 'lsrd']
  }

  /**
   * Tokenize input text
   */
  private tokenizeText(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 0)
  }

  /**
   * Look up a sign in the database
   */
  private async lookupSign(word: string, language: SignLanguage): Promise<SignRepresentation | null> {
    // Currently only ASL is fully supported
    if (language === 'asl') {
      return ASL_SIGNS_DATABASE[word] || null
    }
    return null
  }

  /**
   * Create fingerspelling representation for unknown words
   */
  private fingerspell(word: string): SignRepresentation {
    return {
      gloss: `FS:${word.toUpperCase()}`,
      handshape: 'Fingerspelling handshapes',
      movement: 'Sequential letter formation',
      location: 'Neutral space (shoulder height)',
      palmOrientation: 'Palm facing viewer',
      nonManualSignals: ['Slight rightward movement for each letter'],
    }
  }

  /**
   * Calculate confidence score for translation
   */
  private calculateConfidence(signs: SignRepresentation[]): number {
    const knownSigns = signs.filter(s => !s.gloss.startsWith('FS:'))
    if (signs.length === 0) return 0
    return knownSigns.length / signs.length
  }

  /**
   * Calculate average confidence from detections
   */
  private calculateAvgConfidence(detections: DetectedSign[]): number {
    if (detections.length === 0) return 0
    const sum = detections.reduce((acc, d) => acc + d.confidence, 0)
    return sum / detections.length
  }
}

// Singleton instance
let translationInstance: SignLanguageTranslationService | null = null

export function getSignTranslation(config?: Partial<TranslationConfig>): SignLanguageTranslationService {
  if (!translationInstance) {
    translationInstance = new SignLanguageTranslationService(config)
  }
  return translationInstance
}

export default SignLanguageTranslationService
