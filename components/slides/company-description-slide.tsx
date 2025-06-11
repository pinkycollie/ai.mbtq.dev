"use client"

import { motion } from "framer-motion"
import { Building, Award } from "lucide-react"

export default function CompanyDescriptionSlide() {
  return (
    <div className="h-full flex flex-col p-10 bg-slate-50">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl font-bold text-purple-800 mb-2">Company Description</h2>
        <div className="w-20 h-1 bg-purple-600 mb-8"></div>
      </motion.div>

      <div className="flex-1 flex flex-col md:flex-row gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex-1"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 h-full">
            <div className="flex items-center mb-4">
              <Building className="h-8 w-8 text-purple-600 mr-3" />
              <h3 className="text-xl font-semibold text-slate-800">Corporate Structure</h3>
            </div>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>S-Corporation registered in Delaware</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>501(c)(3) non-profit arm for community support</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>Owned and operated by Pinky Collie</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>10 years of business development experience</span>
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex-1"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 h-full">
            <div className="flex items-center mb-4">
              <Award className="h-8 w-8 text-purple-600 mr-3" />
              <h3 className="text-xl font-semibold text-slate-800">Mission & Vision</h3>
            </div>
            <div className="space-y-4 text-slate-700">
              <p>
                <span className="font-semibold text-purple-700">Mission:</span> To empower entrepreneurs and small
                business owners with accessible, AI-powered tools and resources that drive success.
              </p>
              <p>
                <span className="font-semibold text-purple-700">Vision:</span> A business landscape where entrepreneurs
                of all backgrounds, especially those with disabilities, have equal access to cutting-edge business
                development resources.
              </p>
              <p>
                <span className="font-semibold text-purple-700">Focus:</span> Special emphasis on serving the Deaf
                community and entrepreneurs with disabilities - an overlooked yet valuable market segment.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

