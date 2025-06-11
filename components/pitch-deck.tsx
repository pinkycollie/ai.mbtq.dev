"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import TitleSlide from "./slides/title-slide"
import ExecutiveSummarySlide from "./slides/executive-summary-slide"
import CompanyDescriptionSlide from "./slides/company-description-slide"
import MarketAnalysisSlide from "./slides/market-analysis-slide"
import ServicesSlide from "./slides/services-slide"
import MarketingSlide from "./slides/marketing-slide"
import FinancialSlide from "./slides/financial-slide"
import ManagementSlide from "./slides/management-slide"
import FundingSlide from "./slides/funding-slide"
import SnackPackSlide from "./slides/snack-pack-slide"
import ConclusionSlide from "./slides/conclusion-slide"
import PersonalStorySlide from "./slides/personal-story-slide"
import SBAFundingSlide from "./slides/sba-funding-slide"
import EcosystemSlide from "./slides/ecosystem-slide"
import StrategySlide from "./slides/strategy-slide"
import CyberCardGrid from "./cyber-card-grid"

const slides = [
  { id: "title", component: TitleSlide },
  { id: "personal-story", component: PersonalStorySlide },
  { id: "executive-summary", component: ExecutiveSummarySlide },
  { id: "company-description", component: CompanyDescriptionSlide },
  { id: "market-analysis", component: MarketAnalysisSlide },
  { id: "services", component: ServicesSlide },
  { id: "ecosystem", component: EcosystemSlide },
  { id: "sba-funding", component: SBAFundingSlide },
  { id: "strategy", component: StrategySlide },
  { id: "marketing", component: MarketingSlide },
  { id: "financial", component: FinancialSlide },
  { id: "management", component: ManagementSlide },
  { id: "funding", component: FundingSlide },
  { id: "snack-pack", component: SnackPackSlide },
  { id: "cyber-cards", component: CyberCardGrid },
  { id: "conclusion", component: ConclusionSlide },
]

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)

  const goToNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setDirection(1)
      setCurrentSlide(currentSlide + 1)
    }
  }

  const goToPrevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1)
      setCurrentSlide(currentSlide - 1)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        goToNextSlide()
      } else if (e.key === "ArrowLeft") {
        goToPrevSlide()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSlide])

  const progressPercentage = ((currentSlide + 1) / slides.length) * 100

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      }
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      }
    },
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="absolute top-4 left-4 right-4 z-10">
        <Progress value={progressPercentage} className="h-2" />
      </div>

      <div className="w-full max-w-6xl h-[calc(100vh-8rem)] relative bg-white rounded-lg shadow-2xl">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 overflow-y-auto"
          >
            {slides.map((slide, index) => {
              const SlideComponent = slide.component
              return currentSlide === index ? <SlideComponent key={slide.id} /> : null
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={goToPrevSlide}
          disabled={currentSlide === 0}
          className="bg-white/90 hover:bg-white"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <div className="px-4 py-2 bg-white/90 rounded-md font-medium">
          {currentSlide + 1} / {slides.length}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={goToNextSlide}
          disabled={currentSlide === slides.length - 1}
          className="bg-white/90 hover:bg-white"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}

