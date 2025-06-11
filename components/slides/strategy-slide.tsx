"use client"

import { motion } from "framer-motion"
import { CheckCircle, Clock, FileText, Users, Award } from "lucide-react"

export default function StrategySlide() {
  const shortTermSteps = [
    "Complete SBA 8(a) Business Development Program application",
    "Apply for Women-Owned Small Business certification",
    "Schedule meeting with Fort Worth Economic Development office",
    "Connect with TWU business department for research partnership",
    "Develop detailed business plan highlighting community impact",
  ]

  const mediumTermSteps = [
    "Apply for SBA 7(a) loan for initial platform development",
    "Establish advisory board with Deaf community leaders",
    "Create prototype of ASL Connect support system",
    "Develop blockchain transparency framework",
    "Secure office space in Fort Worth innovation district",
  ]

  return (
    <div className="min-h-full flex flex-col p-10 bg-slate-50">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl font-bold text-purple-800 mb-2">Strategic Implementation Plan</h2>
        <div className="w-20 h-1 bg-purple-600 mb-8"></div>
      </motion.div>

      <div className="flex-1 flex flex-col md:flex-row gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex-1"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 h-full">
            <div className="flex items-center mb-6">
              <Clock className="h-8 w-8 text-purple-600 mr-3" />
              <h3 className="text-xl font-semibold text-slate-800">Short-Term Action Items (0-6 months)</h3>
            </div>

            <ul className="space-y-4">
              {shortTermSteps.map((step, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  className="flex items-start"
                >
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">{step}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center mb-2">
                <FileText className="h-5 w-5 text-purple-600 mr-2" />
                <h4 className="font-medium text-purple-700">Key Document: SBA Eligibility Narrative</h4>
              </div>
              <p className="text-sm text-slate-600">
                Develop a compelling narrative highlighting your unique qualifications as a Black, Deaf, woman
                entrepreneur and how your business addresses a critical need in an underserved community.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex-1"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 h-full">
            <div className="flex items-center mb-6">
              <Clock className="h-8 w-8 text-indigo-600 mr-3" />
              <h3 className="text-xl font-semibold text-slate-800">Medium-Term Goals (6-18 months)</h3>
            </div>

            <ul className="space-y-4">
              {mediumTermSteps.map((step, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  className="flex items-start"
                >
                  <CheckCircle className="h-5 w-5 text-indigo-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">{step}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
              <div className="flex items-center mb-2">
                <Users className="h-5 w-5 text-indigo-600 mr-2" />
                <h4 className="font-medium text-indigo-700">Key Partnership: Fort Worth Innovation Ecosystem</h4>
              </div>
              <p className="text-sm text-slate-600">
                Establish formal partnerships with Fort Worth economic development initiatives, positioning 360 Business
                Magician as a key player in the city's inclusive innovation strategy.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white"
      >
        <div className="flex items-center mb-4">
          <Award className="h-8 w-8 text-white mr-3" />
          <h3 className="text-xl font-semibold">Competitive Advantage for SBA Funding</h3>
        </div>

        <p className="mb-6">
          My unique combination of identities and experiences creates a compelling case for SBA support. As a Black,
          Deaf, woman entrepreneur from Fort Worth with an MBA in Data Analytics, I represent exactly the type of
          business owner that SBA programs are designed to empower.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/20 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Multiple Priority Categories</h4>
            <p className="text-sm text-white/90">
              I qualify under multiple SBA priority categories, strengthening my application for competitive programs.
            </p>
          </div>

          <div className="bg-white/20 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Innovative Technology Approach</h4>
            <p className="text-sm text-white/90">
              My blockchain and AI integration makes me eligible for innovation-focused grants and programs.
            </p>
          </div>

          <div className="bg-white/20 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Community Impact Multiplier</h4>
            <p className="text-sm text-white/90">
              My focus on an underserved community aligns with SBA's mission to promote inclusive entrepreneurship.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

