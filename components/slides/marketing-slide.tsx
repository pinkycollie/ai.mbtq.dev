"use client"

import { motion } from "framer-motion"
import { Share2, FileText, Search, CreditCard, Users } from "lucide-react"

export default function MarketingSlide() {
  const strategies = [
    {
      icon: <Share2 className="h-6 w-6 text-purple-600" />,
      title: "Social Media Marketing",
      description:
        "Promoting our platform and engaging with our target market through strategic social media campaigns.",
    },
    {
      icon: <FileText className="h-6 w-6 text-purple-600" />,
      title: "Content Marketing",
      description:
        "Creating and distributing valuable content including blog posts, videos, and podcasts to attract and retain our target market.",
    },
    {
      icon: <Search className="h-6 w-6 text-purple-600" />,
      title: "Search Engine Optimization",
      description:
        "Optimizing our website and online presence to improve search engine rankings and drive organic traffic.",
    },
    {
      icon: <CreditCard className="h-6 w-6 text-purple-600" />,
      title: "Paid Advertising",
      description: "Using Google Ads and Facebook Ads to reach our target market and drive traffic to our site.",
    },
    {
      icon: <Users className="h-6 w-6 text-purple-600" />,
      title: "Partnerships",
      description:
        "Partnering with other organizations and businesses to provide additional resources and services to our clients.",
    },
  ]

  return (
    <div className="h-full flex flex-col p-10 bg-slate-50">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl font-bold text-purple-800 mb-2">Marketing & Sales</h2>
        <div className="w-20 h-1 bg-purple-600 mb-8"></div>
      </motion.div>

      <div className="flex-1 flex flex-col md:flex-row gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex-1"
        >
          <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl shadow-lg p-6 h-full flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-white mb-6">Our Marketing Approach</h3>
            <p className="text-white/90 text-lg mb-6">
              360 Business Magician employs a multi-channel marketing strategy to reach entrepreneurs and small business
              owners, with special focus on accessibility for the Deaf community.
            </p>
            <div className="bg-white/20 p-4 rounded-lg">
              <p className="text-white font-medium">
                Our marketing materials are designed to be inclusive, with ASL translations, captions, and accessible
                formats to reach our target audience effectively.
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
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Marketing Strategies</h3>
            <div className="space-y-4">
              {strategies.map((strategy, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  className="flex items-start"
                >
                  <div className="bg-purple-100 p-2 rounded-full mr-3 mt-1">{strategy.icon}</div>
                  <div>
                    <h4 className="font-medium text-slate-800">{strategy.title}</h4>
                    <p className="text-sm text-slate-600">{strategy.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

