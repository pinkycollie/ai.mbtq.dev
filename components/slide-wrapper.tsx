"use client"

import type { ReactNode } from "react"
import QRCode from "./qr-code"

interface SlideWrapperProps {
  children: ReactNode
  className?: string
}

export default function SlideWrapper({ children, className = "" }: SlideWrapperProps) {
  return (
    <div className={`min-h-full relative ${className}`}>
      <div className="absolute top-4 right-4 z-10">
        <QRCode url="https://kzmoekejcsr4z0fe5ump.lite.vusercontent.net/" />
      </div>
      {children}
    </div>
  )
}

