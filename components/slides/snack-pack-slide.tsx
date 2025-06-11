"use client"

import { motion } from "framer-motion"
import {
  UserX,
  Search,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  CheckCircle,
  ArrowRight,
  Code,
  Smartphone,
  Globe,
} from "lucide-react"
import SlideWrapper from "../slide-wrapper"
import QRCode from "../qr-code"

export default function SnackPackSlide() {
  const steps = [
    {
      icon: <UserX className="h-10 w-10 text-white" />,
      title: "Unemployed",
      description: "User enters platform while seeking employment opportunities",
      color: "bg-red-500",
    },
    {
      icon: <Search className="h-10 w-10 text-white" />,
      title: "Skills Assessment",
      description: "AI analyzes user's skills, experience, and career goals",
      color: "bg-amber-500",
    },
    {
      icon: <GraduationCap className="h-10 w-10 text-white" />,
      title: "Personalized Training",
      description: "Custom learning path created to fill skill gaps",
      color: "bg-blue-500",
    },
    {
      icon: <FileText className="h-10 w-10 text-white" />,
      title: "Resume Builder",
      description: "AI-powered resume and portfolio creation",
      color: "bg-indigo-500",
    },
    {
      icon: <Briefcase className="h-10 w-10 text-white" />,
      title: "Job Matching",
      description: "Automated matching with suitable employment opportunities",
      color: "bg-purple-500",
    },
    {
      icon: <Award className="h-10 w-10 text-white" />,
      title: "Interview Prep",
      description: "AI coaching for interviews and negotiations",
      color: "bg-violet-500",
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-white" />,
      title: "Employed",
      description: "User secures employment with ongoing support",
      color: "bg-green-500",
    },
  ]

  const nextFeatures = [
    {
      title: "Modern Tech Stack",
      description: "Built with Next.js for optimal performance and SEO",
      icon: <Code className="h-5 w-5 text-purple-600" />,
    },
    {
      title: "Responsive Design",
      description: "Fully optimized for all devices and screen sizes",
      icon: <Smartphone className="h-5 w-5 text-purple-600" />,
    },
    {
      title: "Enhanced Accessibility",
      description: "Improved ASL support and screen reader compatibility",
      icon: <Globe className="h-5 w-5 text-purple-600" />,
    },
  ]

  return (
    <SlideWrapper>
      <div className="min-h-full flex flex-col p-10 bg-slate-50">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center">
            <h2 className="text-3xl font-bold text-purple-800 mb-2">Surprise Snack Pack</h2>
            <div className="ml-3 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              Automated Employment Journey
            </div>
          </div>
          <div className="w-20 h-1 bg-purple-600 mb-8"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">
              From Unemployed to Employed: The 360 Business Magician Way
            </h3>
            <p className="text-slate-700">
              Our platform provides a complete, automated journey that transforms job seekers into successfully employed
              professionals. With special accommodations for the Deaf community and those with disabilities, we ensure
              no one is left behind in their career journey.
            </p>
          </div>
        </motion.div>

        <div className="relative mb-8">
          <div className="absolute inset-x-0 top-1/2 h-2 bg-gradient-to-r from-red-300 via-purple-300 to-green-300 transform -translate-y-1/2 z-0"></div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-7 gap-4 md:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <div className={`${step.color} rounded-full p-4 mb-4 shadow-lg`}>{step.icon}</div>

                {index < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute left-0 right-0 top-10 mx-auto"
                    style={{ left: `calc(${(index + 0.5) * (100 / 7)}% + 1rem)`, width: "1.5rem" }}
                  >
                    <ArrowRight className="h-6 w-6 text-purple-400" />
                  </div>
                )}

                <h4 className="font-semibold text-slate-800 text-center mb-1">{step.title}</h4>
                <p className="text-sm text-slate-600 text-center">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
        >
          <div className="md:col-span-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center mb-4">
              <Code className="h-8 w-8 text-white mr-3" />
              <h3 className="text-xl font-semibold">Next.js Implementation</h3>
            </div>
            <p className="mb-4">
              We're rebuilding 360 Job Magician with Next.js to provide an enhanced user experience with improved
              performance, accessibility, and modern features.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {nextFeatures.map((feature, index) => (
                <div key={index} className="bg-white/20 p-3 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="bg-white/20 p-1 rounded-full mr-2">{feature.icon}</div>
                    <h4 className="font-medium text-sm">{feature.title}</h4>
                  </div>
                  <p className="text-xs text-white/90">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold text-purple-800 mb-3 text-center">Job Magician Portal</h3>
            <div className="mb-4">
              <QRCode url="https://kzmoekejcsr4z0fe5ump.lite.vusercontent.net/" size={120} />
            </div>
            <p className="text-sm text-slate-600 text-center">
              Scan to access our specialized employment platform for the Deaf community
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="bg-purple-100 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-purple-800 mb-3">Platform Automation Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-medium text-purple-700 mb-2">AI-Powered Matching</h4>
              <p className="text-sm text-slate-700">
                Our algorithms match users with opportunities based on skills, experience, and preferences with 92%
                accuracy.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-medium text-purple-700 mb-2">Accessibility First</h4>
              <p className="text-sm text-slate-700">
                ASL video interfaces, captioning, and screen reader optimization for users with disabilities.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-medium text-purple-700 mb-2">Continuous Support</h4>
              <p className="text-sm text-slate-700">
                The journey doesn't end at employment - we provide ongoing career development and advancement tools.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideWrapper>
  )
}

