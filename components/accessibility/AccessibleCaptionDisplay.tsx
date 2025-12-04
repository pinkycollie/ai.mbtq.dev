"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Type, 
  Settings,
  ChevronUp,
  ChevronDown
} from "lucide-react"

export interface CaptionSegment {
  id: string
  startTime: number
  endTime: number
  text: string
  speaker?: string
}

export interface CaptionSettings {
  fontSize: "small" | "medium" | "large" | "extra-large"
  fontFamily: "sans-serif" | "serif" | "mono"
  textColor: string
  backgroundColor: string
  backgroundOpacity: number
  position: "top" | "bottom"
  textAlign: "left" | "center" | "right"
}

export interface AccessibleCaptionDisplayProps {
  /** Caption segments to display */
  captions: CaptionSegment[]
  /** Current playback time in seconds */
  currentTime: number
  /** Whether captions are visible */
  visible?: boolean
  /** Initial caption settings */
  settings?: Partial<CaptionSettings>
  /** Callback when settings change */
  onSettingsChange?: (settings: CaptionSettings) => void
  /** Custom className */
  className?: string
  /** Show speaker labels */
  showSpeakerLabels?: boolean
  /** Enable live captions mode (for real-time transcription) */
  liveMode?: boolean
}

const defaultSettings: CaptionSettings = {
  fontSize: "medium",
  fontFamily: "sans-serif",
  textColor: "#ffffff",
  backgroundColor: "#000000",
  backgroundOpacity: 0.75,
  position: "bottom",
  textAlign: "center",
}

const fontSizeMap = {
  small: "text-sm",
  medium: "text-lg",
  large: "text-2xl",
  "extra-large": "text-4xl",
}

const fontFamilyMap = {
  "sans-serif": "font-sans",
  serif: "font-serif",
  mono: "font-mono",
}

/**
 * AccessibleCaptionDisplay - WCAG 2.1 AA compliant caption display
 * 
 * Features:
 * - Customizable font size, color, and background
 * - Support for speaker labels
 * - Live caption mode for real-time transcription
 * - Keyboard accessible settings panel
 * - High contrast options for visual accessibility
 */
export function AccessibleCaptionDisplay({
  captions,
  currentTime,
  visible = true,
  settings: initialSettings,
  onSettingsChange,
  className = "",
  showSpeakerLabels = true,
  liveMode = false,
}: AccessibleCaptionDisplayProps) {
  const [settings, setSettings] = useState<CaptionSettings>({
    ...defaultSettings,
    ...initialSettings,
  })
  const [showSettingsPanel, setShowSettingsPanel] = useState(false)
  const [announcement, setAnnouncement] = useState("")
  const captionRef = useRef<HTMLDivElement>(null)

  const announce = useCallback((message: string) => {
    setAnnouncement(message)
    setTimeout(() => setAnnouncement(""), 1000)
  }, [])

  // Find current caption based on time
  const currentCaption = captions.find(
    (caption) =>
      currentTime >= caption.startTime && currentTime <= caption.endTime
  )

  // Get recent captions for live mode (last 3)
  const recentCaptions = liveMode
    ? captions
        .filter((c) => c.startTime <= currentTime)
        .slice(-3)
    : []

  const updateSettings = useCallback(
    (updates: Partial<CaptionSettings>) => {
      const newSettings = { ...settings, ...updates }
      setSettings(newSettings)
      onSettingsChange?.(newSettings)
    },
    [settings, onSettingsChange]
  )

  const togglePosition = useCallback(() => {
    const newPosition = settings.position === "top" ? "bottom" : "top"
    updateSettings({ position: newPosition })
    announce(`Captions moved to ${newPosition}`)
  }, [settings.position, updateSettings, announce])

  const cycleFontSize = useCallback(() => {
    const sizes: CaptionSettings["fontSize"][] = [
      "small",
      "medium",
      "large",
      "extra-large",
    ]
    const currentIndex = sizes.indexOf(settings.fontSize)
    const nextIndex = (currentIndex + 1) % sizes.length
    updateSettings({ fontSize: sizes[nextIndex] })
    announce(`Font size: ${sizes[nextIndex]}`)
  }, [settings.fontSize, updateSettings, announce])

  // Keyboard navigation for settings
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!visible) return

      switch (e.key) {
        case "+":
        case "=":
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            cycleFontSize()
          }
          break
        case "p":
          if (e.altKey) {
            e.preventDefault()
            togglePosition()
          }
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [visible, cycleFontSize, togglePosition])

  if (!visible) return null

  const positionClass =
    settings.position === "top" ? "top-0" : "bottom-0"
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[settings.textAlign]

  return (
    <div
      className={`fixed left-0 right-0 ${positionClass} z-40 p-4 ${className}`}
      role="region"
      aria-label="Captions"
      aria-live="polite"
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

      {/* Caption text */}
      <div
        ref={captionRef}
        className={`max-w-4xl mx-auto ${alignClass}`}
      >
        {liveMode ? (
          // Live mode - show recent captions
          <div className="space-y-2">
            {recentCaptions.map((caption, index) => (
              <div
                key={caption.id}
                className={`transition-opacity duration-300 ${
                  index === recentCaptions.length - 1
                    ? "opacity-100"
                    : "opacity-60"
                }`}
              >
                <CaptionText
                  caption={caption}
                  settings={settings}
                  showSpeakerLabel={showSpeakerLabels}
                />
              </div>
            ))}
          </div>
        ) : (
          // Standard mode - show current caption
          currentCaption && (
            <CaptionText
              caption={currentCaption}
              settings={settings}
              showSpeakerLabel={showSpeakerLabels}
            />
          )
        )}
      </div>

      {/* Settings button */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowSettingsPanel(!showSettingsPanel)}
          className="text-white/70 hover:text-white hover:bg-white/20"
          aria-label="Caption settings"
          aria-expanded={showSettingsPanel}
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      {/* Settings panel */}
      {showSettingsPanel && (
        <CaptionSettingsPanel
          settings={settings}
          onSettingsChange={updateSettings}
          onClose={() => setShowSettingsPanel(false)}
        />
      )}
    </div>
  )
}

interface CaptionTextProps {
  caption: CaptionSegment
  settings: CaptionSettings
  showSpeakerLabel: boolean
}

function CaptionText({ caption, settings, showSpeakerLabel }: CaptionTextProps) {
  const bgStyle = {
    backgroundColor: `${settings.backgroundColor}${Math.round(
      settings.backgroundOpacity * 255
    )
      .toString(16)
      .padStart(2, "0")}`,
  }

  return (
    <div
      className={`inline-block px-4 py-2 rounded-lg ${fontSizeMap[settings.fontSize]} ${fontFamilyMap[settings.fontFamily]}`}
      style={{
        ...bgStyle,
        color: settings.textColor,
      }}
    >
      {showSpeakerLabel && caption.speaker && (
        <span className="font-bold mr-2">[{caption.speaker}]</span>
      )}
      <span>{caption.text}</span>
    </div>
  )
}

interface CaptionSettingsPanelProps {
  settings: CaptionSettings
  onSettingsChange: (updates: Partial<CaptionSettings>) => void
  onClose: () => void
}

function CaptionSettingsPanel({
  settings,
  onSettingsChange,
  onClose,
}: CaptionSettingsPanelProps) {
  const colorPresets = [
    { bg: "#000000", text: "#ffffff", label: "White on Black" },
    { bg: "#ffffff", text: "#000000", label: "Black on White" },
    { bg: "#000000", text: "#ffff00", label: "Yellow on Black" },
    { bg: "#00008b", text: "#ffffff", label: "White on Blue" },
    { bg: "#1a1a1a", text: "#00ff00", label: "Green on Dark" },
  ]

  return (
    <Card className="absolute right-4 bottom-full mb-2 w-72 shadow-xl">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Caption Settings</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-6 w-6 p-0"
            aria-label="Close settings"
          >
            ×
          </Button>
        </div>

        {/* Font Size */}
        <div className="mb-4">
          <label className="text-sm font-medium block mb-2">Font Size</label>
          <div className="flex gap-2">
            {(["small", "medium", "large", "extra-large"] as const).map(
              (size) => (
                <Button
                  key={size}
                  variant={settings.fontSize === size ? "default" : "outline"}
                  size="sm"
                  onClick={() => onSettingsChange({ fontSize: size })}
                  className="flex-1 text-xs"
                >
                  <Type
                    className={`h-3 w-3 ${
                      size === "small"
                        ? "scale-75"
                        : size === "large"
                        ? "scale-110"
                        : size === "extra-large"
                        ? "scale-125"
                        : ""
                    }`}
                  />
                </Button>
              )
            )}
          </div>
        </div>

        {/* Font Family */}
        <div className="mb-4">
          <label className="text-sm font-medium block mb-2">Font Style</label>
          <div className="flex gap-2">
            {(["sans-serif", "serif", "mono"] as const).map((font) => (
              <Button
                key={font}
                variant={settings.fontFamily === font ? "default" : "outline"}
                size="sm"
                onClick={() => onSettingsChange({ fontFamily: font })}
                className={`flex-1 text-xs ${fontFamilyMap[font]}`}
              >
                Aa
              </Button>
            ))}
          </div>
        </div>

        {/* Color Presets */}
        <div className="mb-4">
          <label className="text-sm font-medium block mb-2">Color Theme</label>
          <div className="flex gap-2 flex-wrap">
            {colorPresets.map((preset, index) => (
              <button
                key={index}
                onClick={() =>
                  onSettingsChange({
                    backgroundColor: preset.bg,
                    textColor: preset.text,
                  })
                }
                className={`w-8 h-8 rounded border-2 ${
                  settings.backgroundColor === preset.bg &&
                  settings.textColor === preset.text
                    ? "border-primary"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: preset.bg }}
                title={preset.label}
                aria-label={preset.label}
              >
                <span
                  style={{ color: preset.text }}
                  className="text-xs font-bold"
                >
                  A
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Background Opacity */}
        <div className="mb-4">
          <label className="text-sm font-medium block mb-2">
            Background Opacity: {Math.round(settings.backgroundOpacity * 100)}%
          </label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={settings.backgroundOpacity}
            onChange={(e) =>
              onSettingsChange({
                backgroundOpacity: parseFloat(e.target.value),
              })
            }
            className="w-full"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(settings.backgroundOpacity * 100)}
          />
        </div>

        {/* Position */}
        <div className="mb-4">
          <label className="text-sm font-medium block mb-2">Position</label>
          <div className="flex gap-2">
            <Button
              variant={settings.position === "top" ? "default" : "outline"}
              size="sm"
              onClick={() => onSettingsChange({ position: "top" })}
              className="flex-1"
            >
              <ChevronUp className="h-4 w-4 mr-1" />
              Top
            </Button>
            <Button
              variant={settings.position === "bottom" ? "default" : "outline"}
              size="sm"
              onClick={() => onSettingsChange({ position: "bottom" })}
              className="flex-1"
            >
              <ChevronDown className="h-4 w-4 mr-1" />
              Bottom
            </Button>
          </div>
        </div>

        {/* Text Alignment */}
        <div>
          <label className="text-sm font-medium block mb-2">Alignment</label>
          <div className="flex gap-2">
            {(["left", "center", "right"] as const).map((align) => (
              <Button
                key={align}
                variant={settings.textAlign === align ? "default" : "outline"}
                size="sm"
                onClick={() => onSettingsChange({ textAlign: align })}
                className="flex-1 capitalize"
              >
                {align}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * useCaptionParser - Hook for parsing caption files (VTT, SRT)
 */
export function useCaptionParser() {
  const parseVTT = useCallback((content: string): CaptionSegment[] => {
    const lines = content.split("\n")
    const captions: CaptionSegment[] = []
    let i = 0

    // Skip WEBVTT header
    if (lines[0]?.startsWith("WEBVTT")) {
      i = 1
    }

    while (i < lines.length) {
      // Skip empty lines
      if (!lines[i]?.trim()) {
        i++
        continue
      }

      // Check for cue identifier or timestamp
      const timestampLine = lines[i]?.includes("-->") ? lines[i] : lines[++i]
      if (!timestampLine?.includes("-->")) {
        i++
        continue
      }

      const [start, end] = timestampLine.split("-->").map((t) => {
        const parts = t.trim().split(":")
        const seconds = parseFloat(parts.pop() || "0")
        const minutes = parseInt(parts.pop() || "0", 10)
        const hours = parseInt(parts.pop() || "0", 10)
        return hours * 3600 + minutes * 60 + seconds
      })

      i++
      let text = ""
      while (i < lines.length && lines[i]?.trim()) {
        text += (text ? "\n" : "") + lines[i]
        i++
      }

      // Extract speaker if present (format: [Speaker]: text)
      const speakerMatch = text.match(/^\[([^\]]+)\]:\s*(.+)/)
      const speaker = speakerMatch ? speakerMatch[1] : undefined
      const captionText = speakerMatch ? speakerMatch[2] : text

      captions.push({
        id: `caption-${captions.length}`,
        startTime: start,
        endTime: end,
        text: captionText,
        speaker,
      })
    }

    return captions
  }, [])

  const parseSRT = useCallback((content: string): CaptionSegment[] => {
    const blocks = content.split(/\n\n+/)
    const captions: CaptionSegment[] = []

    for (const block of blocks) {
      const lines = block.split("\n")
      if (lines.length < 3) continue

      const timestampLine = lines[1]
      const [start, end] = timestampLine.split(" --> ").map((t) => {
        const [time, ms] = t.split(",")
        const parts = time.split(":")
        const seconds = parseInt(parts.pop() || "0", 10)
        const minutes = parseInt(parts.pop() || "0", 10)
        const hours = parseInt(parts.pop() || "0", 10)
        return hours * 3600 + minutes * 60 + seconds + parseInt(ms || "0", 10) / 1000
      })

      const text = lines.slice(2).join("\n")

      captions.push({
        id: `caption-${captions.length}`,
        startTime: start,
        endTime: end,
        text,
      })
    }

    return captions
  }, [])

  return { parseVTT, parseSRT }
}
