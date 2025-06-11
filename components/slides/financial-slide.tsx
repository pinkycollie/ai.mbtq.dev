"use client"

import { motion } from "framer-motion"
import { DollarSign } from "lucide-react"

export default function FinancialSlide() {
  const financialData = [
    { year: "Year 1", revenue: 1000000, netIncome: 200000 },
    { year: "Year 2", revenue: 2000000, netIncome: 400000 },
    { year: "Year 3", revenue: 5000000, netIncome: 1000000 },
  ]

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="h-full flex flex-col p-10 bg-slate-50">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl font-bold text-purple-800 mb-2">Financial Projections</h2>
        <div className="w-20 h-1 bg-purple-600 mb-8"></div>
      </motion.div>

      <div className="flex-1 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-6"
        >
          <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
            <DollarSign className="h-6 w-6 text-green-600 mr-2" />
            Three-Year Financial Forecast
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="py-3 text-left text-slate-600">Period</th>
                  <th className="py-3 text-right text-slate-600">Revenue</th>
                  <th className="py-3 text-right text-slate-600">Net Income</th>
                  <th className="py-3 text-right text-slate-600">Profit Margin</th>
                </tr>
              </thead>
              <tbody>
                {financialData.map((data, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.2, duration: 0.4 }}
                    className="border-b border-slate-100"
                  >
                    <td className="py-4 font-medium text-slate-800">{data.year}</td>
                    <td className="py-4 text-right text-slate-800">{formatCurrency(data.revenue)}</td>
                    <td className="py-4 text-right text-slate-800">{formatCurrency(data.netIncome)}</td>
                    <td className="py-4 text-right text-green-600 font-medium">
                      {Math.round((data.netIncome / data.revenue) * 100)}%
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Revenue Streams</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>Subscription-based services</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>Advertising partnerships</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>Corporate sponsorships</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>Premium AI-powered tools</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>Grants for non-profit initiatives</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Growth Strategy</h3>
            <p className="text-slate-700 mb-4">
              Our financial projections are based on a strategic growth plan that includes:
            </p>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>Expanding our user base by 100% year-over-year</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>Increasing subscription retention rates to 85%</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>Launching new AI-powered tools quarterly</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>Geographic expansion beyond Texas in Year 2</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

