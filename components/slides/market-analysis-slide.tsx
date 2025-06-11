"use client"

import { motion } from "framer-motion"
import { PieChart, Target, TrendingUp } from "lucide-react"

export default function MarketAnalysisSlide() {
  return (
    <div className="h-full flex flex-col p-10 bg-slate-50">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl font-bold text-purple-800 mb-2">Market Analysis</h2>
        <div className="w-20 h-1 bg-purple-600 mb-8"></div>
      </motion.div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center mb-4">
            <PieChart className="h-8 w-8 text-purple-600 mr-3" />
            <h3 className="text-xl font-semibold text-slate-800">Market Overview</h3>
          </div>
          <ul className="space-y-3 text-slate-700">
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>
              <span>Highly competitive business development services market</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>
              <span>Growing demand for AI-powered business solutions</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>
              <span>Hybrid for-profit/non-profit model creates unique positioning</span>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center mb-4">
            <Target className="h-8 w-8 text-purple-600 mr-3" />
            <h3 className="text-xl font-semibold text-slate-800">Target Market</h3>
          </div>
          <ul className="space-y-3 text-slate-700">
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>
              <span>Entrepreneurs and small business owners in the United States</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>
              <span>Primary focus on the Texas region</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>
              <span>
                <strong>Specialized niche:</strong> Entrepreneurs with disabilities, particularly the Deaf community
              </span>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center mb-4">
            <TrendingUp className="h-8 w-8 text-purple-600 mr-3" />
            <h3 className="text-xl font-semibold text-slate-800">Competitive Advantage</h3>
          </div>
          <ul className="space-y-3 text-slate-700">
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>
              <span>Comprehensive and personalized approach to business development</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>
              <span>Cutting-edge AI technology tailored for business needs</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>
              <span>Serving an underrepresented market (Deaf entrepreneurs)</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>
              <span>Dual revenue/impact model creates sustainability</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}

