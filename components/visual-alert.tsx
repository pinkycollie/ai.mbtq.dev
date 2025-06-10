"use client"

import { useState, useEffect } from "react"
import { AlertCircle, CheckCircle, Info, X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const alertVariants = cva(
  "fixed z-50 flex items-center gap-3 p-4 border shadow-lg transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-background border-border",
        success:
          "bg-green-50 text-green-900 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30",
        error: "bg-red-50 text-red-900 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30",
        warning:
          "bg-yellow-50 text-yellow-900 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-900/30",
        info: "bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30",
      },
      position: {
        topRight: "top-4 right-4 rounded-lg",
        topLeft: "top-4 left-4 rounded-lg",
        bottomRight: "bottom-4 right-4 rounded-lg",
        bottomLeft: "bottom-4 left-4 rounded-lg",
        top: "top-4 left-1/2 -translate-x-1/2 rounded-lg",
        bottom: "bottom-4 left-1/2 -translate-x-1/2 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      position: "topRight",
    },
  },
)

export interface VisualAlertProps extends VariantProps<typeof alertVariants> {
  title: string
  message?: string
  duration?: number
  onClose?: () => void
  showIcon?: boolean
  role?: string
  politeAnnounce?: boolean
}

export function VisualAlert({
  title,
  message,
  variant = "default",
  position = "topRight",
  duration = 5000,
  onClose,
  showIcon = true,
  role = "alert",
  politeAnnounce = true,
}: VisualAlertProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (duration > 0 && !isFocused) {
      timeout = setTimeout(() => {
        setIsVisible(false)
        if (onClose) onClose()
      }, duration)
    }

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [duration, onClose, isFocused])

  const handleClose = () => {
    setIsVisible(false)
    if (onClose) onClose()
  }

  const getIcon = () => {
    switch (variant) {
      case "success":
        return <CheckCircle className="h-5 w-5" />
      case "error":
        return <AlertCircle className="h-5 w-5" />
      case "warning":
        return <AlertCircle className="h-5 w-5" />
      case "info":
        return <Info className="h-5 w-5" />
      default:
        return <Info className="h-5 w-5" />
    }
  }

  if (!isVisible) return null

  return (
    <div
      className={cn(
        alertVariants({ variant, position }),
        "animate-in fade-in slide-in-from-top-5",
        !isVisible && "animate-out fade-out slide-out-to-top-5",
      )}
      role={role}
      aria-live={politeAnnounce ? "polite" : "assertive"}
      tabIndex={0}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onKeyDown={(e) => {
        if (e.key === "Escape") handleClose()
      }}
    >
      {showIcon && <div className="flex-shrink-0">{getIcon()}</div>}
      <div className="flex-1">
        <h4 className="font-medium">{title}</h4>
        {message && <p className="text-sm opacity-90">{message}</p>}
      </div>
      <button
        onClick={handleClose}
        className="flex-shrink-0 rounded-full p-1 hover:bg-background/10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
