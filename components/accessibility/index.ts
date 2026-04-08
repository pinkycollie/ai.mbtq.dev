/**
 * Accessible Components for Deaf Inclusion
 *
 * WCAG 2.1 AA compliant components designed with Deaf users as the primary audience.
 *
 * Features:
 * - Built-in sign language video support (ASL, BSL, Auslan, NZSL, LSF, DGS, JSL)
 * - Customizable caption display with high contrast options
 * - Visual-first interface design
 * - Full keyboard navigation
 * - Screen reader compatible
 * - AWS GenASL integration support
 */

export {
  AccessibleVideoPlayer,
  type AccessibleVideoPlayerProps,
  type CaptionTrack,
  type SignLanguageOverlay as VideoSignLanguageOverlay,
} from "./AccessibleVideoPlayer"

export {
  SignLanguageOverlay,
  useSignLanguageLibrary,
  type SignLanguageOverlayProps,
  type SignLanguageType,
  type SignVideoLibrary,
  type SignLanguageLibraryItem,
} from "./SignLanguageOverlay"

export {
  AccessibleCaptionDisplay,
  useCaptionParser,
  type AccessibleCaptionDisplayProps,
  type CaptionSegment,
  type CaptionSettings,
} from "./AccessibleCaptionDisplay"
