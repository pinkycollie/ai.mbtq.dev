"use client"

import { motion } from "framer-motion"
import { FileText, BarChart, PiggyBank, GraduationCap } from "lucide-react"

export default function ServicesSlide() {
  const services = [
    {
      icon: <FileText className="h-10 w-10 text-white" />,
      title: "Business Planning",
      description:
        "AI-powered business planning tool providing personalized plans tailored to each client's unique needs and goals.",
      color: "bg-purple-600",
    },
    {
      icon: <BarChart className="h-10 w-10 text-white" />,
      title: "Marketing",
      description:
        "AI-powered marketing tool providing personalized strategies and campaigns designed to reach each client's target audience.",
      color: "bg-indigo-600",
    },
    {
      icon: <PiggyBank className="h-10 w-10 text-white" />,
      title: "Financial Management",
      description:
        "AI-powered financial management tool providing personalized planning and management services to help clients achieve their financial goals.",
      color: "bg-violet-600",
    },
    {
      icon: <GraduationCap className="h-10 w-10 text-white" />,
      title: "Free & Low-Cost Resources",
      description:
        "Our non-profit arm provides webinars, workshops, and one-on-one coaching to support small businesses and entrepreneurs.",
      color: "bg-fuchsia-600",
    },
  ]

  return (
    <div className="h-full flex flex-col p-10 bg-slate-50">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl font-bold text-purple-800 mb-2">Our Services</h2>
        <div className="w-20 h-1 bg-purple-600 mb-8"></div>
      </motion.div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
          >
            <div className={`${service.color} p-4 flex items-center`}>
              <div className="bg-white/20 rounded-full p-3 mr-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-white">{service.title}</h3>
            </div>
            <div className="p-6 flex-1">
              <p className="text-slate-700">{service.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

