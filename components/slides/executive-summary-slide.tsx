"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import SlideWrapper from "../slide-wrapper"

export default function ExecutiveSummarySlide() {
  return (
    <SlideWrapper>
      <div className="h-full flex flex-col p-10 bg-slate-50">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2 className="text-3xl font-bold text-purple-800 mb-2">Executive Summary</h2>
          <div className="w-20 h-1 bg-purple-600 mb-8"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex-1 flex items-center justify-center"
        >
          <Card className="w-full max-w-4xl shadow-lg">
            <CardContent className="p-6">
              <p className="text-lg leading-relaxed text-slate-700">
                360 Business Magician is a hybrid for-profit and not-for-profit organization that leverages the power of
                AI and modern web technologies to provide entrepreneurs and small business owners with the tools and
                resources they need to succeed. Our platform is designed to generate revenue through a combination of
                subscription-based services, advertising, and sponsorships, while also providing a range of free and
                low-cost resources and services to support the development of small businesses and entrepreneurs.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-purple-100 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">AI-Powered Solutions</h3>
                  <p className="text-slate-700">Cutting-edge technology tailored for business success</p>
                </div>

                <div className="bg-indigo-100 p-4 rounded-lg">
                  <h3 className="font-semibold text-indigo-800 mb-2">Hybrid Business Model</h3>
                  <p className="text-slate-700">For-profit efficiency with not-for-profit impact</p>
                </div>

                <div className="bg-violet-100 p-4 rounded-lg">
                  <h3 className="font-semibold text-violet-800 mb-2">Inclusive Approach</h3>
                  <p className="text-slate-700">Special focus on entrepreneurs with disabilities</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </SlideWrapper>
  )
}

