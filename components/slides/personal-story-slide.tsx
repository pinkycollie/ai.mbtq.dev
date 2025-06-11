"use client"

import { motion } from "framer-motion"
import { MapPin, GraduationCap, Users, Award } from "lucide-react"
import SlideWrapper from "../slide-wrapper"

export default function PersonalStorySlide() {
  return (
    <SlideWrapper>
      <div className="min-h-full flex flex-col p-10 bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2 className="text-3xl font-bold mb-2">The Founder's Journey</h2>
          <div className="w-20 h-1 bg-purple-400 mb-8"></div>
        </motion.div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 h-full">
              <h3 className="text-xl font-bold text-purple-300 mb-4">Pinky Collie</h3>
              <p className="text-white/90 mb-6">
                A visionary entrepreneur with a unique perspective and powerful mission to transform business
                accessibility for the Deaf community.
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-purple-800/50 p-2 rounded-full mr-3">
                    <MapPin className="h-5 w-5 text-purple-300" />
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-300">Fort Worth Native</h4>
                    <p className="text-sm text-white/80">
                      Born and raised in Fort Worth, deeply connected to the local community
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-800/50 p-2 rounded-full mr-3">
                    <GraduationCap className="h-5 w-5 text-purple-300" />
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-300">Academic Excellence</h4>
                    <p className="text-sm text-white/80">
                      MBA candidate in Data Analytics at Texas Wesleyan University, accepted for May 2025
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-800/50 p-2 rounded-full mr-3">
                    <Users className="h-5 w-5 text-purple-300" />
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-300">Community Leader</h4>
                    <p className="text-sm text-white/80">Advocate for the Deaf and Hard of Hearing community</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-800/50 p-2 rounded-full mr-3">
                    <Award className="h-5 w-5 text-purple-300" />
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-300">Unique Perspective</h4>
                    <p className="text-sm text-white/80">Black, Woman, Deaf entrepreneur bringing diverse insights</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 h-full">
              <h3 className="text-xl font-bold text-purple-300 mb-4">Vision & Mission</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-purple-300 mb-2">Fort Worth Initiative</h4>
                  <p className="text-white/80">
                    Committed to being an integral part of Fort Worth's economic development initiatives, creating
                    opportunities for underserved communities.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-purple-300 mb-2">Unity Ecosystem</h4>
                  <p className="text-white/80">
                    Building a comprehensive, interconnected business ecosystem that provides all necessary resources in
                    one place, specifically designed for the Deaf community's unique needs.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-purple-300 mb-2">Transparent Governance</h4>
                  <p className="text-white/80">
                    Implementing blockchain technology and smart contracts to ensure transparency and accountability,
                    with multi-language ASL Connect support.
                  </p>
                </div>

                <div className="bg-purple-600/30 p-4 rounded-lg mt-4">
                  <p className="text-white font-medium">
                    "My goal is to create a Fort Worth where the Deaf and Hard of Hearing community has equal access to
                    business opportunities and resources."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SlideWrapper>
  )
}

