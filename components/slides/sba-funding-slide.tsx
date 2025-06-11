"use client"

import { motion } from "framer-motion"
import { DollarSign, CheckCircle, Target, Award } from "lucide-react"
import SlideWrapper from "../slide-wrapper"

export default function SBAFundingSlide() {
  const fundingOpportunities = [
    {
      title: "8(a) Business Development Program",
      description: "For socially and economically disadvantaged individuals",
      eligibility: ["Minority-owned business", "51% owned by disadvantaged individuals", "Personal net worth < $750K"],
      icon: <Target className="h-6 w-6 text-purple-600" />,
    },
    {
      title: "Women-Owned Small Business Program",
      description: "For businesses that are at least 51% owned by women",
      eligibility: ["51% owned by women", "Woman manages day-to-day operations", "U.S. citizen"],
      icon: <Award className="h-6 w-6 text-purple-600" />,
    },
    {
      title: "SBA 7(a) Loan Program",
      description: "The SBA's primary program for providing financial assistance",
      eligibility: ["For-profit business", "Reasonable owner equity", "Used personal resources"],
      icon: <DollarSign className="h-6 w-6 text-purple-600" />,
    },
    {
      title: "SBIR/STTR Programs",
      description: "Research grants for innovative technologies",
      eligibility: [
        "Small business with < 500 employees",
        "U.S. ownership",
        "Principal researcher employed by company",
      ],
      icon: <CheckCircle className="h-6 w-6 text-purple-600" />,
    },
  ]

  return (
    <SlideWrapper>
      <div className="min-h-full flex flex-col p-10 bg-slate-50">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2 className="text-3xl font-bold text-purple-800 mb-2">SBA Funding Opportunities</h2>
          <div className="w-20 h-1 bg-purple-600 mb-8"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
            <h3 className="text-xl font-semibold mb-4">Perfect Alignment: 360 Business Magician & SBA</h3>
            <p className="text-white/90">
              As a Black, Deaf woman entrepreneur from Fort Worth pursuing an MBA, I qualify for multiple SBA programs
              designed to support underrepresented business owners. My mission to create an accessible business
              ecosystem for the Deaf community aligns perfectly with SBA's goals of fostering innovation and supporting
              underserved markets.
            </p>
          </div>
        </motion.div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          {fundingOpportunities.map((opportunity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 p-2 rounded-full mr-3">{opportunity.icon}</div>
                <h3 className="text-lg font-semibold text-slate-800">{opportunity.title}</h3>
              </div>

              <p className="text-slate-600 mb-4">{opportunity.description}</p>

              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-slate-700 mb-2">Key Eligibility Factors:</h4>
                <ul className="space-y-1">
                  {opportunity.eligibility.map((item, i) => (
                    <li key={i} className="text-sm text-slate-600 flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideWrapper>
  )
}

