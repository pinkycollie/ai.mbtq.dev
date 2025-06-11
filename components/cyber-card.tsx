"use client"

import { useState } from "react"
// Import styles from our helper file instead of directly from the CSS module
import styles from "./styles"

interface CyberCardProps {
  title: string
  subtitle: string
  prompt?: string
  highlightText?: string
}

export default function CyberCard({
  title,
  subtitle,
  prompt = "HOVER ME",
  highlightText = "360 BUSINESS MAGICIAN",
}: CyberCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Create an array of 25 elements for the tracking grid
  const trackingElements = Array.from({ length: 25 }, (_, i) => i + 1)

  return (
    <div className={styles.container} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className={styles.canvas}>
        {trackingElements.map((num) => (
          <div key={num} className={`${styles.tracker} ${styles[`tr-${num}`]}`}></div>
        ))}
      </div>

      <div id="card" className={styles.card}>
        <div className={styles["card-content"]}>
          <div id="prompt" className={styles.prompt}>
            {prompt}
          </div>

          <h2 className={styles.title}>{title}</h2>

          <div className={styles.subtitle}>
            {subtitle}
            <span className={styles.highlight}>{highlightText}</span>
          </div>

          <div className={styles["glowing-elements"]}>
            <div className={styles["glow-1"]}></div>
            <div className={styles["glow-2"]}></div>
            <div className={styles["glow-3"]}></div>
          </div>

          <div className={styles["card-particles"]}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className={styles["card-glare"]}></div>

          <div className={styles["cyber-lines"]}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className={styles["corner-elements"]}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className={styles["scan-line"]}></div>
        </div>
      </div>
    </div>
  )
}

