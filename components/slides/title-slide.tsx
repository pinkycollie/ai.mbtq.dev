"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import SlideWrapper from "../slide-wrapper"

export default function TitleSlide() {
  return (
    <SlideWrapper>
      <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-purple-600 to-indigo-800 text-white p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex items-center mb-6"
        >
          <Sparkles className="h-12 w-12 mr-4" />
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">360 Business Magician</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-xl md:text-2xl text-center max-w-3xl mt-6"
        >
          Empowering entrepreneurs and small businesses with AI-powered solutions
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-12 text-lg"
        >
          Presented by: Pinky Collie, CEO & Founder
        </motion.div>
      </div>
    </SlideWrapper>
  )
}

