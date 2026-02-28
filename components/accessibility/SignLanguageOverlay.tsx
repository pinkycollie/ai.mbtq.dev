"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Settings } from "lucide-react"

export type SignLanguageType = "asl" | "bsl" | "auslan" | "nzsl" | "lsf" | "dgs" | "jsl"

export interface SignVideoLibrary {
  [word: string]: {
    url: string
    duration: number
    thumbnail?: string
  }
}

export interface SignLanguageOverlayProps {
  /** Text content to be translated to sign language */
  text?: string
  /** Current sign language type */
  language: SignLanguageType
  /** Video library for sign lookup */
  videoLibrary?: SignVideoLibrary
  /** AWS GenASL endpoint for real-time avatar generation */
  genAslEndpoint?: string
  /** Position on screen */
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center"
  /** Size of the overlay */
  size?: "small" | "medium" | "large"
  /** Whether overlay is visible */
  visible?: boolean
  /** Callback when overlay visibility changes */
  onVisibilityChange?: (visible: boolean) => void
  /** Custom className */
  className?: string
  /** Avatar style preference */
  avatarStyle?: "realistic" | "animated" | "minimal"
  /** Playback speed (0.5 to 2.0) */
  playbackSpeed?: number
}

/** Maximum characters to display in the signing indicator */
const MAX_DISPLAY_TEXT_LENGTH = 30

/**
 * SignLanguageOverlay - Real-time sign language video overlay component
 * 
 * Features:
 * - Supports multiple sign languages (ASL, BSL, Auslan, NZSL, LSF, DGS, JSL)
 * - Integration with AWS GenASL for avatar generation
 * - Video library lookup for pre-recorded signs
 * - Adjustable playback speed for learning
 * - WCAG 2.1 AA compliant
 */
export function SignLanguageOverlay({
  text = "",
  language = "asl",
  videoLibrary,
  genAslEndpoint,
  position = "bottom-right",
  size = "medium",
  visible = true,
  onVisibilityChange,
  className = "",
  avatarStyle = "animated",
  playbackSpeed = 1.0,
}: SignLanguageOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVisible, setIsVisible] = useState(visible)
  const [isLoading, setIsLoading] = useState(false)
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null)
  const [showSettings, setShowSettings] = useState(false)
  const [currentSpeed, setCurrentSpeed] = useState(playbackSpeed)
  const [announcement, setAnnouncement] = useState("")

  const languageNames: Record<SignLanguageType, string> = {
    asl: "American Sign Language",
    bsl: "British Sign Language",
    auslan: "Australian Sign Language",
    nzsl: "New Zealand Sign Language",
    lsf: "French Sign Language",
    dgs: "German Sign Language",
    jsl: "Japanese Sign Language",
  }

  const announce = useCallback((message: string) => {
    setAnnouncement(message)
    setTimeout(() => setAnnouncement(""), 1000)
  }, [])

  const sizeClasses = {
    small: "w-32 h-24",
    medium: "w-48 h-36",
    large: "w-64 h-48",
  }

  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  }

  // Generate sign language video from text
  const generateSignVideo = useCallback(async (inputText: string) => {
    if (!inputText.trim()) return

    setIsLoading(true)

    try {
      // First check video library for pre-recorded signs
      if (videoLibrary) {
        const words = inputText.toLowerCase().split(/\s+/)
        for (const word of words) {
          if (videoLibrary[word]) {
            setCurrentVideoUrl(videoLibrary[word].url)
            setIsLoading(false)
            return
          }
        }
      }

      // Fall back to AWS GenASL endpoint if available
      if (genAslEndpoint) {
        const response = await fetch(genAslEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: inputText,
            language,
            avatarStyle,
            speed: currentSpeed,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          setCurrentVideoUrl(data.videoUrl)
        }
      }
    } catch (error) {
      console.error("Error generating sign video:", error)
    } finally {
      setIsLoading(false)
    }
  }, [videoLibrary, genAslEndpoint, language, avatarStyle, currentSpeed])

  // Generate video when text changes
  useEffect(() => {
    if (text && isVisible) {
      generateSignVideo(text)
    }
  }, [text, isVisible, generateSignVideo])

  // Update playback speed
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = currentSpeed
    }
  }, [currentSpeed])

  const toggleVisibility = () => {
    const newVisibility = !isVisible
    setIsVisible(newVisibility)
    onVisibilityChange?.(newVisibility)
    announce(newVisibility ? "Sign language overlay visible" : "Sign language overlay hidden")
  }

  const handleSpeedChange = (speed: number) => {
    setCurrentSpeed(speed)
    announce(`Playback speed set to ${speed}x`)
  }

  if (!isVisible) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={toggleVisibility}
        className={`fixed ${positionClasses[position]} z-50 ${className}`}
        aria-label="Show sign language overlay"
      >
        <Eye className="h-4 w-4 mr-2" />
        Show Sign Language
      </Button>
    )
  }

  return (
    <Card
      className={`fixed ${positionClasses[position]} z-50 shadow-lg ${className}`}
      role="region"
      aria-label={`${languageNames[language]} interpretation overlay`}
    >
      {/* Screen reader announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>

      <CardHeader className="p-2 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">
          {language.toUpperCase()}
        </CardTitle>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
            className="h-6 w-6 p-0"
            aria-label="Toggle settings"
            aria-expanded={showSettings}
          >
            <Settings className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleVisibility}
            className="h-6 w-6 p-0"
            aria-label="Hide sign language overlay"
          >
            <EyeOff className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-2">
        {/* Settings panel */}
        {showSettings && (
          <div className="mb-2 p-2 bg-muted rounded text-xs">
            <label htmlFor="speed-slider" className="block mb-1">
              Speed: {currentSpeed}x
            </label>
            <input
              id="speed-slider"
              type="range"
              min={0.5}
              max={2.0}
              step={0.25}
              value={currentSpeed}
              onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
              className="w-full"
              aria-valuemin={0.5}
              aria-valuemax={2.0}
              aria-valuenow={currentSpeed}
            />
          </div>
        )}

        {/* Video container */}
        <div
          className={`${sizeClasses[size]} bg-gray-900 rounded overflow-hidden relative`}
        >
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
            </div>
          ) : currentVideoUrl ? (
            <video
              ref={videoRef}
              src={currentVideoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              aria-label={`Sign language interpretation: ${text}`}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-white text-xs text-center p-2">
              <div>
                <div className="text-2xl mb-1">🤟</div>
                <p>{languageNames[language]}</p>
                <p className="text-gray-400 mt-1">Waiting for content...</p>
              </div>
            </div>
          )}
        </div>

        {/* Current text being signed */}
        {text && (
          <div className="mt-2 text-xs text-muted-foreground truncate" title={text}>
            Signing: &quot;{text.substring(0, MAX_DISPLAY_TEXT_LENGTH)}{text.length > MAX_DISPLAY_TEXT_LENGTH ? "..." : ""}&quot;
          </div>
        )}
      </CardContent>
    </Card>
  )
}

/**
 * SignLanguageLibrary - Pre-built sign video library interface
 */
export interface SignLanguageLibraryItem {
  id: string
  word: string
  language: SignLanguageType
  videoUrl: string
  thumbnailUrl?: string
  category: string
  duration: number
}

/**
 * useSignLanguageLibrary - Hook for accessing sign language video libraries
 */
export function useSignLanguageLibrary(language: SignLanguageType) {
  const [library, setLibrary] = useState<SignLanguageLibraryItem[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const loadLibrary = useCallback(async () => {
    setIsLoading(true)
    try {
      // This would typically fetch from an API
      // For now, return sample structure
      const sampleLibrary: SignLanguageLibraryItem[] = [
        {
          id: "hello-asl",
          word: "hello",
          language: "asl",
          videoUrl: "/videos/signs/asl/hello.mp4",
          category: "greetings",
          duration: 1.5,
        },
        {
          id: "thankyou-asl",
          word: "thank you",
          language: "asl",
          videoUrl: "/videos/signs/asl/thankyou.mp4",
          category: "greetings",
          duration: 2.0,
        },
        {
          id: "welcome-asl",
          word: "welcome",
          language: "asl",
          videoUrl: "/videos/signs/asl/welcome.mp4",
          category: "greetings",
          duration: 1.8,
        },
      ]

      setLibrary(sampleLibrary.filter((item) => item.language === language))
    } catch (error) {
      console.error("Error loading sign library:", error)
    } finally {
      setIsLoading(false)
    }
  }, [language])

  useEffect(() => {
    loadLibrary()
  }, [loadLibrary])

  const findSign = useCallback(
    (word: string) => {
      return library.find(
        (item) =>
          item.word.toLowerCase() === word.toLowerCase() &&
          item.language === language
      )
    },
    [library, language]
  )

  return {
    library,
    isLoading,
    findSign,
    reload: loadLibrary,
  }
}
