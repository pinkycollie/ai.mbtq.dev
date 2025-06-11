"use client"

import { useEffect, useRef } from "react"
import QRCodeStyling from "qr-code-styling"

interface QRCodeProps {
  url: string
  size?: number
  className?: string
}

export default function QRCode({ url, size = 80, className = "" }: QRCodeProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const qrCode = new QRCodeStyling({
      width: size,
      height: size,
      type: "svg",
      data: url,
      dotsOptions: {
        color: "#8b5cf6",
        type: "rounded",
      },
      cornersSquareOptions: {
        color: "#6d28d9",
        type: "extra-rounded",
      },
      cornersDotOptions: {
        color: "#4c1d95",
        type: "dot",
      },
      backgroundOptions: {
        color: "#ffffff",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 5,
      },
    })

    // Clear previous QR code if any
    if (ref.current.firstChild) {
      ref.current.removeChild(ref.current.firstChild)
    }

    qrCode.append(ref.current)
  }, [url, size])

  return <div ref={ref} className={`rounded-lg overflow-hidden shadow-md bg-white ${className}`}></div>
}

