"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Check, X, AlertCircle, DollarSign } from 'lucide-react'

export type SplashStatus = "funded" | "not-funded" | "needs-funding"

export interface SplashProps {
  /** The funding status to display */
  status?: SplashStatus
  /** Custom text to display in the splash */
  text?: string
  /** Position of the splash component */
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center"
  /** Size of the splash component */
  size?: "small" | "medium" | "large" | "responsive"
  /** Primary color for the splash (tailwind color class) */
  color?: string
  /** Whether to show the splash with a bounce animation */
  animated?: boolean
  /** Whether the splash can be dismissed */
  dismissible?: boolean
  /** Custom icon to display (will override default status icon) */
  icon?: React.ReactNode
  /** Callback when splash is clicked */
  onClick?: () => void
  /** Additional CSS classes */
  className?: string
  /** Whether to pulse the splash */
  pulse?: boolean
  /** Whether to rotate the splash */
  rotate?: boolean
  /** Delay before showing the splash (ms) */
  showDelay?: number
  /** Whether to show the splash */
  show?: boolean
  /** Z-index for the splash */
  zIndex?: number
  /** Whether the splash is relative to its container instead of fixed on the screen */
  relative?: boolean
  /** Custom margin/offset from the edge (in pixels or CSS units) */
  offset?: string
  /** Whether to use a safe area inset on mobile devices */
  useSafeArea?: boolean
  /** Whether to adapt size based on screen size */
  adaptiveSize?: boolean
}

export function Splash({
  status = "needs-funding",
  text,
  position = "top-right",
  size = "medium",
  color,
  animated = true,
  dismissible = false,
  icon,
  onClick,
  className,
  pulse = true,
  rotate = false,
  showDelay = 0,
  show = true,
  zIndex = 50,
  relative = false,
  offset,
  useSafeArea = true,
  adaptiveSize = true,
}: SplashProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [screenSize, setScreenSize] = useState<"small" | "medium" | "large">("medium")
  const splashRef = useRef<HTMLDivElement>(null)

  // Handle screen size detection for responsive sizing
  useEffect(() => {
    if (typeof window === "undefined") return

    const handleResize = () => {
      if (window.innerWidth < 640) {
        setScreenSize("small")
      } else if (window.innerWidth < 1024) {
        setScreenSize("medium")
      } else {
        setScreenSize("large")
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    setIsMounted(true)
    const timer = setTimeout(() => {
      setIsVisible(show)
    }, showDelay)

    return () => clearTimeout(timer)
  }, [show, showDelay])

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsVisible(false)
  }

  // Default colors based on status
  const getDefaultColor = () => {
    switch (status) {
      case "funded":
        return "bg-green-500"
      case "not-funded":
        return "bg-red-500"
      case "needs-funding":
        return "bg-amber-500"
      default:
        return "bg-blue-500"
    }
  }

  // Default text based on status
  const getDefaultText = () => {
    switch (status) {
      case "funded":
        return "FUNDED!"
      case "not-funded":
        return "NOT FUNDED"
      case "needs-funding":
        return "NEEDS FUNDING"
      default:
        return "SPLASH!"
    }
  }

  // Default icon based on status
  const getDefaultIcon = () => {
    switch (status) {
      case "funded":
        return <Check className="h-4 w-4" />
      case "not-funded":
        return <X className="h-4 w-4" />
      case "needs-funding":
        return <DollarSign className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  // Get size based on screen size if adaptiveSize is true
  const getSize = () => {
    if (size !== "responsive" || !adaptiveSize) return size
    
    return screenSize === "small" ? "small" : screenSize === "medium" ? "medium" : "large"
  }

  // Size classes
  const sizeClasses = {
    small: "text-xs py-1 px-2",
    medium: "text-sm py-1.5 px-3",
    large: "text-base py-2 px-4",
    responsive: screenSize === "small" ? "text-xs py-1 px-2" : 
                screenSize === "medium" ? "text-sm py-1.5 px-3" : 
                "text-base py-2 px-4"
  }

  // Position classes
  const getPositionStyles = () => {
    const baseOffset = offset || "1rem"
    const safeAreaClass = useSafeArea ? "safe-area-inset" : ""
    
    if (position === "center") {
      return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    }
    
    switch (position) {
      case "top-left":
        return `top-[${baseOffset}] left-[${baseOffset}] ${safeAreaClass && "pt-safe-top pl-safe-left"}`
      case "top-right":
        return `top-[${baseOffset}] right-[${baseOffset}] ${safeAreaClass && "pt-safe-top pr-safe-right"}`
      case "bottom-left":
        return `bottom-[${baseOffset}] left-[${baseOffset}] ${safeAreaClass && "pb-safe-bottom pl-safe-left"}`
      case "bottom-right":
        return `bottom-[${baseOffset}] right-[${baseOffset}] ${safeAreaClass && "pb-safe-bottom pr-safe-right"}`
      default:
        return `top-[${baseOffset}] right-[${baseOffset}] ${safeAreaClass && "pt-safe-top pr-safe-right"}`
    }
  }

  // Animation variants
  const variants = {
    initial: {
      scale: 0.8,
      opacity: 0,
      rotate: rotate ? -10 : 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      rotate: rotate ? 0 : 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 20,
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  }

  if (!isMounted) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={splashRef}
          className={cn(
            relative ? "absolute" : "fixed",
            "rounded-full shadow-lg font-bold flex items-center gap-1.5",
            color || getDefaultColor(),
            sizeClasses[getSize()],
            "text-white",
            pulse && "animate-pulse",
            className,
          )}
          style={{
            zIndex,
            ...(!className?.includes("top-") && !className?.includes("bottom-") && !className?.includes("left-") && !className?.includes("right-") && {
              position: relative ? "absolute" : "fixed",
              ...getPositionStyles().split(" ").reduce((acc, cls) => {
                const [prop, value] = cls.split("-")
                if (prop && value && !cls.includes("safe")) {
                  const cssProperty = prop === "top" || prop === "bottom" || prop === "left" || prop === "right" ? prop : null
                  if (cssProperty) {
                    acc[cssProperty] = offset || "1rem"
                  }
                }
                return acc
              }, {} as Record<string, string>),
            }),
          }}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={animated ? variants : {}}
          onClick={onClick}
          onTouchEnd={onClick} // Ensure touch events work properly on mobile
          role={onClick ? "button" : "status"}
          tabIndex={onClick ? 0 : undefined}
          aria-label={text || getDefaultText()}
        >
          {icon || getDefaultIcon()}
          <span>{text || getDefaultText()}</span>
          {dismissible && (
            <button 
              onClick={handleDismiss} 
              onTouchEnd={(e) => {
                e.stopPropagation()
                handleDismiss(e as unknown as React.MouseEvent)
              }}
              className="ml-1 rounded-full hover:bg-white/20 p-0.5" 
              aria-label="Dismiss"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
