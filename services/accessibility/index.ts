/**
 * Accessibility Services Index
 * Export all accessibility-related services for the MBTQ Platform
 */

export { 
  SignLanguageTranslationService, 
  getSignTranslation,
  type SignLanguage 
} from './sign-translation'

// Re-export types
export type { default as SignLanguageTranslationServiceType } from './sign-translation'
