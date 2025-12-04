/**
 * Language Model Utilities for ASL Syntax Translation
 * and Accessibility Standards Generation
 * 
 * Features:
 * - ASL/BSL grammar rule translation
 * - Text-to-sign sequence conversion
 * - WCAG accessibility content generation
 * - Multi-language sign translation support
 */

import type { SignLanguage } from "./vision-models"

/**
 * ASL Grammar Rules and Syntax Structure
 * 
 * ASL follows a Topic-Comment structure and differs significantly from English:
 * - Time indicators come first
 * - Topic is established before comment
 * - Questions use specific facial grammar
 * - Negation often comes at the end
 */

export interface SignGloss {
  sign: string
  meaning: string
  timing?: "before" | "simultaneous" | "after"
  nonManualMarkers?: NonManualMarker[]
}

export interface NonManualMarker {
  type: "eyebrows" | "mouth" | "head" | "body" | "eye-gaze"
  value: string
  intensity: number
}

export interface TranslationResult {
  originalText: string
  signSequence: SignGloss[]
  language: SignLanguage
  grammarNotes?: string[]
  confidence: number
}

export interface GrammarRule {
  name: string
  description: string
  pattern: RegExp | string
  transform: (text: string) => string
  examples: Array<{ input: string; output: string }>
}

/**
 * ASL Grammar Rules
 */
export const ASLGrammarRules: GrammarRule[] = [
  {
    name: "Topic-Comment Structure",
    description: "Place topic before comment/action",
    pattern: /^(.+?)\s+(is|are|was|were)\s+(.+?)$/i,
    transform: (text: string) => {
      const match = text.match(/^(.+?)\s+(is|are|was|were)\s+(.+?)$/i)
      if (match) {
        return `${match[1].toUpperCase()} ${match[3].toUpperCase()}`
      }
      return text
    },
    examples: [
      { input: "The cat is sleeping", output: "CAT SLEEPING" },
      { input: "My name is John", output: "NAME J-O-H-N" },
    ],
  },
  {
    name: "Time-Topic-Comment",
    description: "Time indicators come first",
    pattern: /\b(yesterday|today|tomorrow|last week|next week)\b/i,
    transform: (text: string) => {
      const timeMatch = text.match(/\b(yesterday|today|tomorrow|last week|next week)\b/i)
      if (timeMatch) {
        const time = timeMatch[1].toUpperCase().replace(/\s+/g, "-")
        const rest = text.replace(timeMatch[0], "").trim()
        return `${time} ${rest.toUpperCase()}`
      }
      return text
    },
    examples: [
      { input: "I went to the store yesterday", output: "YESTERDAY STORE GO" },
      { input: "Tomorrow I will eat", output: "TOMORROW EAT" },
    ],
  },
  {
    name: "Question Formation (WH)",
    description: "WH-questions use lowered eyebrows and forward head tilt",
    pattern: /^(what|where|when|why|who|which|how)\b/i,
    transform: (text: string) => {
      // Move WH-word to end in ASL
      const match = text.match(/^(what|where|when|why|who|which|how)\s+(.+?)\??$/i)
      if (match) {
        return `${match[2].toUpperCase()} ${match[1].toUpperCase()}`
      }
      return text
    },
    examples: [
      { input: "What is your name?", output: "YOUR NAME WHAT" },
      { input: "Where do you live?", output: "YOU LIVE WHERE" },
    ],
  },
  {
    name: "Question Formation (Yes/No)",
    description: "Yes/No questions use raised eyebrows and forward lean",
    pattern: /^(do|does|did|is|are|was|were|can|will|would|should)\s+/i,
    transform: (text: string) => {
      const cleaned = text
        .replace(/^(do|does|did|is|are|was|were|can|will|would|should)\s+/i, "")
        .replace(/\?$/, "")
      return cleaned.toUpperCase()
    },
    examples: [
      { input: "Do you understand?", output: "YOU UNDERSTAND" },
      { input: "Are you deaf?", output: "YOU DEAF" },
    ],
  },
  {
    name: "Pronoun Simplification",
    description: "ASL uses pointing for pronouns - represented in gloss",
    pattern: /\b(I|me|my|you|your|he|him|his|she|her|they|them|their|we|us|our)\b/gi,
    transform: (text: string) => {
      return text
        .replace(/\b(I|me|my)\b/gi, "IX-1")
        .replace(/\b(you|your)\b/gi, "IX-2")
        .replace(/\b(he|him|his)\b/gi, "IX-3")
        .replace(/\b(she|her)\b/gi, "IX-3")
        .replace(/\b(they|them|their)\b/gi, "IX-3-PL")
        .replace(/\b(we|us|our)\b/gi, "IX-1-PL")
    },
    examples: [
      { input: "I love you", output: "IX-1 LOVE IX-2" },
      { input: "She went home", output: "IX-3 HOME GO" },
    ],
  },
  {
    name: "Negation",
    description: "Negation often accompanies head shake",
    pattern: /\b(not|n't|never|nothing|no one|nobody|nowhere)\b/i,
    transform: (text: string) => {
      // Move negation to the end in many contexts
      const cleaned = text
        .replace(/\bdo(es)?n't\b/gi, "NOT")
        .replace(/\bcan't\b/gi, "CAN NOT")
        .replace(/\bwon't\b/gi, "WILL NOT")
        .replace(/\bisn't\b/gi, "NOT")
        .replace(/\baren't\b/gi, "NOT")
        .replace(/\bnot\b/gi, "NOT")
        .replace(/\bnever\b/gi, "NEVER")
      return cleaned.toUpperCase()
    },
    examples: [
      { input: "I don't understand", output: "IX-1 UNDERSTAND NOT" },
      { input: "She never came", output: "IX-3 COME NEVER" },
    ],
  },
]

/**
 * SignLanguageTranslator - Translates text to sign language sequences
 */
export class SignLanguageTranslator {
  private language: SignLanguage
  private customDictionary: Map<string, SignGloss[]>

  constructor(language: SignLanguage = "asl") {
    this.language = language
    this.customDictionary = new Map()
    this.initializeBaseDictionary()
  }

  private initializeBaseDictionary(): void {
    // Common words to sign mappings
    const commonWords: Record<string, SignGloss[]> = {
      hello: [{ sign: "HELLO", meaning: "greeting" }],
      goodbye: [{ sign: "GOODBYE", meaning: "farewell" }],
      "thank you": [{ sign: "THANK-YOU", meaning: "gratitude" }],
      thanks: [{ sign: "THANK-YOU", meaning: "gratitude" }],
      please: [{ sign: "PLEASE", meaning: "polite request" }],
      sorry: [{ sign: "SORRY", meaning: "apology" }],
      help: [{ sign: "HELP", meaning: "assistance" }],
      yes: [{ sign: "YES", meaning: "affirmation" }],
      no: [{ sign: "NO", meaning: "negation" }],
      love: [{ sign: "LOVE", meaning: "affection" }],
      friend: [{ sign: "FRIEND", meaning: "companion" }],
      family: [{ sign: "FAMILY", meaning: "relatives" }],
      home: [{ sign: "HOME", meaning: "residence" }],
      work: [{ sign: "WORK", meaning: "employment/activity" }],
      school: [{ sign: "SCHOOL", meaning: "education place" }],
      learn: [{ sign: "LEARN", meaning: "acquire knowledge" }],
      teach: [{ sign: "TEACH", meaning: "instruct" }],
      understand: [{ sign: "UNDERSTAND", meaning: "comprehend" }],
      deaf: [{ sign: "DEAF", meaning: "deaf identity" }],
      hearing: [{ sign: "HEARING", meaning: "hearing person" }],
      sign: [{ sign: "SIGN", meaning: "sign language" }],
    }

    for (const [word, glosses] of Object.entries(commonWords)) {
      this.customDictionary.set(word.toLowerCase(), glosses)
    }
  }

  /**
   * Translate English text to sign language gloss sequence
   */
  translate(text: string): TranslationResult {
    let processedText = text.trim()
    const grammarNotes: string[] = []

    // Apply grammar rules in order
    for (const rule of ASLGrammarRules) {
      if (typeof rule.pattern === "string" 
        ? processedText.includes(rule.pattern)
        : rule.pattern.test(processedText)
      ) {
        processedText = rule.transform(processedText)
        grammarNotes.push(rule.name)
      }
    }

    // Convert to sign sequence
    const words = processedText.split(/\s+/)
    const signSequence: SignGloss[] = []

    for (const word of words) {
      const cleanWord = word.toLowerCase().replace(/[^a-z0-9-]/g, "")
      
      // Check dictionary first
      const dictEntry = this.customDictionary.get(cleanWord)
      if (dictEntry) {
        signSequence.push(...dictEntry)
      } else {
        // Default: use word as sign gloss or fingerspell
        if (cleanWord.length <= 2 || /^[a-z]$/.test(cleanWord)) {
          // Short words get fingerspelled
          signSequence.push({
            sign: cleanWord.toUpperCase().split("").join("-"),
            meaning: `fingerspelled: ${cleanWord}`,
          })
        } else {
          signSequence.push({
            sign: cleanWord.toUpperCase(),
            meaning: cleanWord,
          })
        }
      }
    }

    return {
      originalText: text,
      signSequence,
      language: this.language,
      grammarNotes,
      confidence: this.calculateConfidence(signSequence),
    }
  }

  private calculateConfidence(sequence: SignGloss[]): number {
    // Higher confidence for known dictionary words
    const knownSigns = sequence.filter((s) => 
      Array.from(this.customDictionary.values()).flat().some(
        (d) => d.sign === s.sign
      )
    )
    return Math.min(0.95, 0.5 + (knownSigns.length / sequence.length) * 0.5)
  }

  /**
   * Add custom word-to-sign mapping
   */
  addToDictionary(word: string, glosses: SignGloss[]): void {
    this.customDictionary.set(word.toLowerCase(), glosses)
  }

  /**
   * Get fingerspelling sequence for a word
   */
  fingerspell(word: string): SignGloss[] {
    return word.split("").map((letter) => ({
      sign: letter.toUpperCase(),
      meaning: `letter ${letter}`,
      timing: "simultaneous" as const,
    }))
  }

  /**
   * Get sign for a number
   */
  signNumber(num: number): SignGloss[] {
    if (num >= 1 && num <= 10) {
      return [{ sign: num.toString(), meaning: `number ${num}` }]
    }
    // For larger numbers, break into components
    const str = num.toString()
    return str.split("").map((digit) => ({
      sign: digit,
      meaning: `digit ${digit}`,
    }))
  }
}

/**
 * Accessibility Standards Generator
 * 
 * Generates WCAG-compliant content and guidelines
 */
export interface AccessibilityGuideline {
  id: string
  level: "A" | "AA" | "AAA"
  title: string
  description: string
  techniques: string[]
  deafSpecific: boolean
}

export interface AccessibilityReport {
  compliant: boolean
  level: "A" | "AA" | "AAA" | "none"
  issues: AccessibilityIssue[]
  recommendations: string[]
  deafInclusionScore: number
}

export interface AccessibilityIssue {
  guideline: string
  severity: "critical" | "major" | "minor"
  description: string
  location?: string
  fix?: string
}

export class AccessibilityStandardsGenerator {
  private guidelines: AccessibilityGuideline[] = [
    {
      id: "1.2.1",
      level: "A",
      title: "Audio-only and Video-only (Prerecorded)",
      description: "Provide alternatives for time-based media",
      techniques: ["Provide transcript", "Provide audio description"],
      deafSpecific: true,
    },
    {
      id: "1.2.2",
      level: "A",
      title: "Captions (Prerecorded)",
      description: "Provide captions for prerecorded audio content",
      techniques: ["Add synchronized captions", "Ensure caption accuracy"],
      deafSpecific: true,
    },
    {
      id: "1.2.4",
      level: "AA",
      title: "Captions (Live)",
      description: "Provide captions for live audio content",
      techniques: ["Use real-time captioning", "CART services"],
      deafSpecific: true,
    },
    {
      id: "1.2.6",
      level: "AAA",
      title: "Sign Language (Prerecorded)",
      description: "Provide sign language interpretation for prerecorded audio",
      techniques: ["Add sign language video", "Picture-in-picture interpreter"],
      deafSpecific: true,
    },
    {
      id: "1.4.3",
      level: "AA",
      title: "Contrast (Minimum)",
      description: "Text has contrast ratio of at least 4.5:1",
      techniques: ["Use high contrast colors", "Avoid light text on light backgrounds"],
      deafSpecific: false,
    },
    {
      id: "2.1.1",
      level: "A",
      title: "Keyboard",
      description: "All functionality available from keyboard",
      techniques: ["Ensure all controls are keyboard accessible"],
      deafSpecific: false,
    },
    {
      id: "2.4.7",
      level: "AA",
      title: "Focus Visible",
      description: "Keyboard focus indicator is visible",
      techniques: ["Provide clear focus styles", "High contrast focus rings"],
      deafSpecific: false,
    },
  ]

  /**
   * Generate accessibility report for content
   */
  generateReport(content: {
    hasCaptions?: boolean
    hasSignLanguage?: boolean
    hasTranscript?: boolean
    contrastRatio?: number
    keyboardAccessible?: boolean
    focusVisible?: boolean
  }): AccessibilityReport {
    const issues: AccessibilityIssue[] = []
    let levelA = true
    let levelAA = true

    // Check captions
    if (!content.hasCaptions) {
      issues.push({
        guideline: "1.2.2",
        severity: "critical",
        description: "Missing captions for audio/video content",
        fix: "Add synchronized captions to all audio/video content",
      })
      levelA = false
    }

    // Check sign language
    if (!content.hasSignLanguage) {
      issues.push({
        guideline: "1.2.6",
        severity: "minor",
        description: "No sign language interpretation provided",
        fix: "Add sign language video overlay for enhanced accessibility",
      })
    }

    // Check transcript
    if (!content.hasTranscript) {
      issues.push({
        guideline: "1.2.1",
        severity: "major",
        description: "Missing transcript for audio content",
        fix: "Provide text transcript of audio content",
      })
      levelA = false
    }

    // Check contrast
    if (content.contrastRatio && content.contrastRatio < 4.5) {
      issues.push({
        guideline: "1.4.3",
        severity: "major",
        description: `Contrast ratio ${content.contrastRatio}:1 is below minimum 4.5:1`,
        fix: "Increase text contrast to at least 4.5:1",
      })
      levelAA = false
    }

    // Check keyboard
    if (content.keyboardAccessible === false) {
      issues.push({
        guideline: "2.1.1",
        severity: "critical",
        description: "Content not fully keyboard accessible",
        fix: "Ensure all interactive elements can be accessed via keyboard",
      })
      levelA = false
    }

    // Check focus
    if (content.focusVisible === false) {
      issues.push({
        guideline: "2.4.7",
        severity: "major",
        description: "Focus indicator not visible",
        fix: "Add visible focus styles to interactive elements",
      })
      levelAA = false
    }

    // Calculate Deaf inclusion score
    let deafScore = 0
    if (content.hasCaptions) deafScore += 40
    if (content.hasSignLanguage) deafScore += 35
    if (content.hasTranscript) deafScore += 25

    // Determine compliance level
    let level: "A" | "AA" | "AAA" | "none" = "none"
    if (levelA && levelAA && content.hasSignLanguage) level = "AAA"
    else if (levelA && levelAA) level = "AA"
    else if (levelA) level = "A"

    return {
      compliant: issues.filter((i) => i.severity === "critical").length === 0,
      level,
      issues,
      recommendations: this.generateRecommendations(content),
      deafInclusionScore: deafScore,
    }
  }

  private generateRecommendations(content: {
    hasCaptions?: boolean
    hasSignLanguage?: boolean
    hasTranscript?: boolean
  }): string[] {
    const recommendations: string[] = []

    if (!content.hasCaptions) {
      recommendations.push(
        "Add captions to all video content - essential for Deaf users"
      )
    }

    if (!content.hasSignLanguage) {
      recommendations.push(
        "Consider adding sign language interpretation for key content"
      )
      recommendations.push(
        "Explore AWS GenASL for automated sign language avatar generation"
      )
    }

    if (!content.hasTranscript) {
      recommendations.push(
        "Provide downloadable transcripts for audio/video content"
      )
    }

    recommendations.push(
      "Test with Deaf users to ensure content meets their needs"
    )
    recommendations.push(
      "Use visual indicators instead of audio-only cues"
    )

    return recommendations
  }

  /**
   * Get all guidelines for a specific level
   */
  getGuidelinesForLevel(level: "A" | "AA" | "AAA"): AccessibilityGuideline[] {
    const levels = { A: 1, AA: 2, AAA: 3 }
    const targetLevel = levels[level]
    
    return this.guidelines.filter(
      (g) => levels[g.level] <= targetLevel
    )
  }

  /**
   * Get Deaf-specific guidelines
   */
  getDeafSpecificGuidelines(): AccessibilityGuideline[] {
    return this.guidelines.filter((g) => g.deafSpecific)
  }
}
