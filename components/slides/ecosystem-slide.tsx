"use client"

import { motion } from "framer-motion"
import { Layers, MessageSquare, Shield, Database, Users, Zap } from "lucide-react"

export default function EcosystemSlide() {
  return (
    <div className="min-h-full flex flex-col p-10 bg-slate-50">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl font-bold text-purple-800 mb-2">Unity Ecosystem Vision</h2>
        <div className="w-20 h-1 bg-purple-600 mb-8"></div>
      </motion.div>

      <div className="flex-1 flex flex-col">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">
              A Unified Business Ecosystem for the Deaf Community
            </h3>
            <p className="text-slate-700">
              The 360 Business Magician platform creates a comprehensive, interconnected ecosystem that addresses the
              unique challenges faced by Deaf entrepreneurs and business owners. By bringing all necessary resources
              under one umbrella, we eliminate barriers and create a seamless experience.
            </p>
          </div>
        </motion.div>

        <div className="relative flex-1 mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 bg-purple-100 rounded-full flex items-center justify-center z-10">
              <Layers className="h-16 w-16 text-purple-600" />
            </div>
            <div
              className="absolute inset-0 bg-purple-50 rounded-full animate-pulse"
              style={{ animation: "pulse 2s infinite" }}
            ></div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative z-20"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-20">
              <div className="col-span-2 md:col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-5 transform hover:scale-105 transition-transform">
                  <div className="bg-purple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <MessageSquare className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">ASL Connect Support</h4>
                  <p className="text-sm text-slate-600">
                    Multi-language ASL support line providing real-time assistance for business needs
                  </p>
                </div>
              </div>

              <div className="col-span-2 md:col-span-1 md:mt-16">
                <div className="bg-white rounded-xl shadow-lg p-5 transform hover:scale-105 transition-transform">
                  <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">Blockchain Transparency</h4>
                  <p className="text-sm text-slate-600">
                    Smart contracts and blockchain technology ensuring accountability and trust
                  </p>
                </div>
              </div>

              <div className="col-span-2 md:col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-5 transform hover:scale-105 transition-transform">
                  <div className="bg-violet-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Database className="h-6 w-6 text-violet-600" />
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">Resource Hub</h4>
                  <p className="text-sm text-slate-600">
                    Centralized access to business tools, templates, and educational resources
                  </p>
                </div>
              </div>

              <div className="col-span-2 md:col-span-1 md:mt-16">
                <div className="bg-white rounded-xl shadow-lg p-5 transform hover:scale-105 transition-transform">
                  <div className="bg-fuchsia-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-fuchsia-600" />
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">Community Network</h4>
                  <p className="text-sm text-slate-600">
                    Connecting Deaf entrepreneurs with mentors, partners, and customers
                  </p>
                </div>
              </div>

              <div className="col-span-2 md:col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-5 transform hover:scale-105 transition-transform">
                  <div className="bg-pink-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-pink-600" />
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">AI-Powered Tools</h4>
                  <p className="text-sm text-slate-600">
                    Customized business intelligence and automation tools with ASL interfaces
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="bg-purple-100 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-purple-800 mb-3">Fort Worth Initiative Alignment</h3>
          <p className="text-slate-700 mb-4">
            This ecosystem directly supports Fort Worth's economic development goals by:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <p className="text-slate-700">
                <span className="font-medium text-purple-700">•</span> Empowering an underserved community to
                participate fully in the local economy
              </p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <p className="text-slate-700">
                <span className="font-medium text-purple-700">•</span> Creating jobs and business opportunities
                specifically for Deaf and Hard of Hearing individuals
              </p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <p className="text-slate-700">
                <span className="font-medium text-purple-700">•</span> Positioning Fort Worth as a leader in accessible
                business innovation and inclusive entrepreneurship
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

