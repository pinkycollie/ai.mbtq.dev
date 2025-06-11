"use client"

import { motion } from "framer-motion"
import { DollarSign, Code, Users, TrendingUp, Heart } from "lucide-react"

export default function FundingSlide() {
  const fundingAllocation = [
    {
      icon: <Code className="h-6 w-6 text-white" />,
      title: "Platform Development",
      amount: "$500,000",
      description: "Development and launch of our AI-powered platform",
      color: "bg-purple-600",
    },
    {
      icon: <Users className="h-6 w-6 text-white" />,
      title: "Staffing",
      amount: "$300,000",
      description: "Hiring and training staff",
      color: "bg-indigo-600",
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      title: "Marketing",
      amount: "$300,000",
      description: "Marketing and advertising campaigns",
      color: "bg-violet-600",
    },
    {
      icon: <DollarSign className="h-6 w-6 text-white" />,
      title: "Working Capital",
      amount: "$400,000",
      description: "Operational expenses and contingency",
      color: "bg-fuchsia-600",
    },
    {
      icon: <Heart className="h-6 w-6 text-white" />,
      title: "Non-Profit Arm",
      amount: "$100,000",
      description: "Initial funding for non-profit initiatives",
      color: "bg-pink-600",
    },
  ]

  return (
    <div className="h-full flex flex-col p-10 bg-slate-50">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl font-bold text-purple-800 mb-2">Funding Request</h2>
        <div className="w-20 h-1 bg-purple-600 mb-8"></div>
      </motion.div>

      <div className="flex-1 flex flex-col md:flex-row gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="md:w-1/3"
        >
          <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl shadow-lg p-6 h-full flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-white mb-4">We're seeking</h3>
            <div className="text-5xl font-bold text-white mb-6">$1,500,000</div>
            <p className="text-white/90">
              To support the launch and growth of our platform, enabling us to reach entrepreneurs and small business
              owners, particularly those with disabilities.
            </p>
            <div className="mt-6 bg-white/20 p-4 rounded-lg">
              <p className="text-white font-medium">
                Our funding will be strategically allocated to maximize impact and ensure sustainable growth.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="md:w-2/3"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 h-full">
            <h3 className="text-xl font-semibold text-slate-800 mb-6">Funding Allocation</h3>
            <div className="space-y-4">
              {fundingAllocation.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  className="flex items-center"
                >
                  <div className={`${item.color} p-3 rounded-lg mr-4`}>{item.icon}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-slate-800">{item.title}</h4>
                      <span className="font-bold text-purple-700">{item.amount}</span>
                    </div>
                    <p className="text-sm text-slate-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="mt-6 bg-purple-50 p-4 rounded-lg"
            >
              <h4 className="font-medium text-purple-800 mb-2">Return on Investment</h4>
              <p className="text-slate-700">
                Investors can expect a competitive ROI based on our projected growth and revenue streams, with
                additional social impact benefits through our non-profit initiatives.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

