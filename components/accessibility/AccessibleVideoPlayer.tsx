"use client"

import React, { useRef, useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize,
  ClosedCaptions,
  Hand
} from "lucide-react"

export interface CaptionTrack {
  src: string
  label: string
  language: string
  default?: boolean
}

export interface SignLanguageOverlay {
  videoSrc: string
  language: "asl" | "bsl" | "auslan" | "nzsl" | "lsf"
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"
}

export interface AccessibleVideoPlayerProps {
  src: string
  poster?: string
  title: string
  description?: string
  captions?: CaptionTrack[]
  signLanguageOverlay?: SignLanguageOverlay
  className?: string
  autoPlay?: boolean
  loop?: boolean
  onTimeUpdate?: (currentTime: number) => void
  onEnded?: () => void
}

/**
 * AccessibleVideoPlayer - WCAG 2.1 AA compliant video player
 * 
 * Features:
 * - Built-in closed captioning support
 * - Sign language video overlay (PiP style)
 * - Keyboard navigation (Space, Arrow keys, M for mute)
 * - High contrast focus indicators
 * - Screen reader announcements
 * - Visual-first interface design for Deaf users
 */
export function AccessibleVideoPlayer({
  src,
  poster,
  title,
  description,
  captions = [],
  signLanguageOverlay,
  className = "",
  autoPlay = false,
  loop = false,
  onTimeUpdate,
  onEnded,
}: AccessibleVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const signVideoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true) // Default muted for Deaf users
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showCaptions, setShowCaptions] = useState(true)
  const [showSignOverlay, setShowSignOverlay] = useState(!!signLanguageOverlay)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [announcement, setAnnouncement] = useState("")

  // Announce state changes for screen readers
  const announce = useCallback((message: string) => {
    setAnnouncement(message)
    setTimeout(() => setAnnouncement(""), 1000)
  }, [])

  // Sync sign language overlay with main video
  useEffect(() => {
    if (signVideoRef.current && videoRef.current) {
      if (isPlaying) {
        signVideoRef.current.play().catch(() => {})
      } else {
        signVideoRef.current.pause()
      }
      signVideoRef.current.currentTime = videoRef.current.currentTime
    }
  }, [isPlaying, currentTime])

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        announce("Video paused")
      } else {
        videoRef.current.play()
        announce("Video playing")
      }
      setIsPlaying(!isPlaying)
    }
  }, [isPlaying, announce])

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
      announce(isMuted ? "Audio unmuted" : "Audio muted")
    }
  }, [isMuted, announce])

  const toggleCaptions = useCallback(() => {
    setShowCaptions(!showCaptions)
    announce(showCaptions ? "Captions hidden" : "Captions visible")
    
    // Toggle track visibility
    if (videoRef.current) {
      const tracks = videoRef.current.textTracks
      for (let i = 0; i < tracks.length; i++) {
        tracks[i].mode = showCaptions ? "hidden" : "showing"
      }
    }
  }, [showCaptions, announce])

  const toggleSignOverlay = useCallback(() => {
    setShowSignOverlay(!showSignOverlay)
    announce(showSignOverlay ? "Sign language overlay hidden" : "Sign language overlay visible")
  }, [showSignOverlay, announce])

  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current) return

    try {
      if (!isFullscreen) {
        await containerRef.current.requestFullscreen()
        announce("Fullscreen mode")
      } else {
        await document.exitFullscreen()
        announce("Exited fullscreen")
      }
      setIsFullscreen(!isFullscreen)
    } catch {
      console.error("Fullscreen not supported")
    }
  }, [isFullscreen, announce])

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime
      setCurrentTime(time)
      onTimeUpdate?.(time)
    }
  }, [onTimeUpdate])

  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }, [])

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }, [])

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.volume = vol
      setVolume(vol)
      setIsMuted(vol === 0)
    }
  }, [])

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case " ":
      case "k":
        e.preventDefault()
        togglePlay()
        break
      case "m":
        e.preventDefault()
        toggleMute()
        break
      case "c":
        e.preventDefault()
        toggleCaptions()
        break
      case "s":
        e.preventDefault()
        if (signLanguageOverlay) toggleSignOverlay()
        break
      case "f":
        e.preventDefault()
        toggleFullscreen()
        break
      case "ArrowLeft":
        e.preventDefault()
        if (videoRef.current) {
          videoRef.current.currentTime = Math.max(0, currentTime - 5)
          announce("Rewinding 5 seconds")
        }
        break
      case "ArrowRight":
        e.preventDefault()
        if (videoRef.current) {
          videoRef.current.currentTime = Math.min(duration, currentTime + 5)
          announce("Forward 5 seconds")
        }
        break
      case "ArrowUp":
        e.preventDefault()
        if (videoRef.current) {
          const newVol = Math.min(1, volume + 0.1)
          videoRef.current.volume = newVol
          setVolume(newVol)
          announce(`Volume ${Math.round(newVol * 100)}%`)
        }
        break
      case "ArrowDown":
        e.preventDefault()
        if (videoRef.current) {
          const newVol = Math.max(0, volume - 0.1)
          videoRef.current.volume = newVol
          setVolume(newVol)
          announce(`Volume ${Math.round(newVol * 100)}%`)
        }
        break
    }
  }, [togglePlay, toggleMute, toggleCaptions, toggleSignOverlay, toggleFullscreen, currentTime, duration, volume, signLanguageOverlay, announce])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const getOverlayPosition = () => {
    const pos = signLanguageOverlay?.position || "bottom-right"
    const positions = {
      "top-left": "top-2 left-2",
      "top-right": "top-2 right-2",
      "bottom-left": "bottom-16 left-2",
      "bottom-right": "bottom-16 right-2",
    }
    return positions[pos]
  }

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-0">
        <div
          ref={containerRef}
          className="relative bg-black"
          role="region"
          aria-label={`Video player: ${title}`}
          tabIndex={0}
          onKeyDown={handleKeyDown}
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

          {/* Main video */}
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            autoPlay={autoPlay}
            loop={loop}
            muted={isMuted}
            className="w-full aspect-video"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={onEnded}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            aria-describedby={description ? "video-description" : undefined}
          >
            {captions.map((caption, index) => (
              <track
                key={index}
                kind="captions"
                src={caption.src}
                srcLang={caption.language}
                label={caption.label}
                default={caption.default && showCaptions}
              />
            ))}
          </video>

          {/* Sign language overlay (Picture-in-Picture style) */}
          {signLanguageOverlay && showSignOverlay && (
            <div
              className={`absolute ${getOverlayPosition()} w-1/4 min-w-[120px] max-w-[200px] rounded-lg overflow-hidden shadow-lg border-2 border-white/50`}
              aria-label={`${signLanguageOverlay.language.toUpperCase()} sign language interpretation`}
            >
              <video
                ref={signVideoRef}
                src={signLanguageOverlay.videoSrc}
                muted
                loop={loop}
                className="w-full aspect-video object-cover"
                aria-hidden="true"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 text-center">
                {signLanguageOverlay.language.toUpperCase()}
              </div>
            </div>
          )}

          {/* Video controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            {/* Progress bar */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-white text-sm min-w-[40px]">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min={0}
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 h-1 bg-white/30 rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 
                  [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full 
                  [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer
                  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                aria-label="Video progress"
                aria-valuemin={0}
                aria-valuemax={duration}
                aria-valuenow={currentTime}
                aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
              />
              <span className="text-white text-sm min-w-[40px]">
                {formatTime(duration)}
              </span>
            </div>

            {/* Control buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* Play/Pause */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={togglePlay}
                  className="text-white hover:bg-white/20 focus:ring-2 focus:ring-white"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>

                {/* Mute/Unmute */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMute}
                  className="text-white hover:bg-white/20 focus:ring-2 focus:ring-white"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>

                {/* Volume slider */}
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.1}
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-white/30 rounded-full appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 
                    [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full 
                    [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer
                    focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                  aria-label="Volume"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(volume * 100)}
                />
              </div>

              <div className="flex items-center gap-2">
                {/* Captions toggle */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleCaptions}
                  className={`text-white hover:bg-white/20 focus:ring-2 focus:ring-white ${
                    showCaptions ? "bg-white/20" : ""
                  }`}
                  aria-label={showCaptions ? "Hide captions" : "Show captions"}
                  aria-pressed={showCaptions}
                >
                  <ClosedCaptions className="h-5 w-5" />
                </Button>

                {/* Sign language overlay toggle */}
                {signLanguageOverlay && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleSignOverlay}
                    className={`text-white hover:bg-white/20 focus:ring-2 focus:ring-white ${
                      showSignOverlay ? "bg-white/20" : ""
                    }`}
                    aria-label={showSignOverlay ? "Hide sign language" : "Show sign language"}
                    aria-pressed={showSignOverlay}
                  >
                    <Hand className="h-5 w-5" />
                  </Button>
                )}

                {/* Fullscreen toggle */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleFullscreen}
                  className="text-white hover:bg-white/20 focus:ring-2 focus:ring-white"
                  aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Hidden description for screen readers */}
          {description && (
            <div id="video-description" className="sr-only">
              {description}
            </div>
          )}
        </div>

        {/* Video information below player */}
        <div className="p-4">
          <h3 className="font-semibold text-lg">{title}</h3>
          {description && (
            <p className="text-muted-foreground text-sm mt-1">{description}</p>
          )}
          <div className="flex flex-wrap gap-2 mt-2 text-xs text-muted-foreground">
            <span>Press K or Space to play/pause</span>
            <span>•</span>
            <span>M to mute</span>
            <span>•</span>
            <span>C for captions</span>
            {signLanguageOverlay && (
              <>
                <span>•</span>
                <span>S for sign language</span>
              </>
            )}
            <span>•</span>
            <span>F for fullscreen</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
