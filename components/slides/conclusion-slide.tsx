"use client"

import { motion } from "framer-motion"
import { Sparkles, Mail, Phone, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import SlideWrapper from "../slide-wrapper"

export default function ConclusionSlide() {
  return (
    <SlideWrapper>
      <div className="h-full flex flex-col p-10 bg-gradient-to-br from-purple-600 to-indigo-800 text-white">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold mb-2">Thank You</h2>
          <div className="w-20 h-1 bg-white mx-auto"></div>
        </motion.div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-3xl w-full"
          >
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-10 w-10 mr-4 text-purple-300" />
              <h3 className="text-3xl font-bold">360 Business Magician</h3>
            </div>

            <p className="text-lg text-center mb-8">
              We're leveraging AI and modern web technologies to empower entrepreneurs and small business owners, with a
              special focus on the Deaf community and those with disabilities.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-purple-200">Our Vision</h4>
                <p>
                  A business landscape where entrepreneurs of all backgrounds have equal access to cutting-edge business
                  development resources.
                </p>
              </div>

              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-purple-200">Our Impact</h4>
                <p>
                  Bridging the gap for underserved entrepreneurs while building a sustainable, profitable business
                  model.
                </p>
              </div>
            </div>

            <div className="text-center">
              <Button className="bg-white text-purple-700 hover:bg-purple-100 px-8 py-6 text-lg font-semibold">
                Join Our Journey
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-2 text-purple-300" />
              <span>pinky@mbtquniverse.com</span>
            </div>

            <div className="flex items-center">
              <Phone className="h-5 w-5 mr-2 text-purple-300" />
              <span>(817) 886-2798</span>
            </div>

            <div className="flex items-center">
              <Globe className="h-5 w-5 mr-2 text-purple-300" />
              <span>360businessmagician.mbtquniverse.com</span>
            </div>
          </motion.div>
        </div>
      </div>
    </SlideWrapper>
  )
}

