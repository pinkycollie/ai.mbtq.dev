"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function ManagementSlide() {
  const team = [
    {
      name: "Pinky Collie",
      position: "CEO & Founder",
      description: "Seasoned business professional with 10 years of experience in business development and management.",
      initials: "PC",
    },
    {
      name: "TBD",
      position: "COO",
      description: "Experienced business professional with expertise in operations and management.",
      initials: "COO",
    },
    {
      name: "TBD",
      position: "CMO",
      description: "Experienced marketing professional with expertise in marketing and advertising.",
      initials: "CMO",
    },
    {
      name: "TBD",
      position: "CTO",
      description:
        "Experienced AI engineer and web developer with expertise in developing AI-powered business solutions.",
      initials: "CTO",
    },
    {
      name: "TBD",
      position: "Executive Director of Non-Profit Arm",
      description:
        "Experienced non-profit professional with expertise in managing and developing non-profit organizations.",
      initials: "ED",
    },
  ]

  return (
    <div className="h-full flex flex-col p-10 bg-slate-50">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl font-bold text-purple-800 mb-2">Management & Organization</h2>
        <div className="w-20 h-1 bg-purple-600 mb-8"></div>
      </motion.div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
        {team.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col"
          >
            <div className="flex items-center mb-4">
              <Avatar className="h-12 w-12 bg-purple-100 text-purple-700 mr-4">
                <AvatarFallback>{member.initials}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-slate-800">{member.name}</h3>
                <p className="text-sm text-purple-600">{member.position}</p>
              </div>
            </div>
            <p className="text-slate-700 text-sm flex-1">{member.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-6 bg-purple-100 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-purple-800 mb-3">Organizational Structure</h3>
        <p className="text-slate-700 mb-4">
          360 Business Magician operates with a lean, efficient team structure that maximizes impact while minimizing
          overhead. Our organization is designed to:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-3">
            <p className="text-slate-700">
              <span className="font-medium text-purple-700">•</span> Integrate for-profit and non-profit operations
              seamlessly
            </p>
          </div>
          <div className="bg-white rounded-lg p-3">
            <p className="text-slate-700">
              <span className="font-medium text-purple-700">•</span> Leverage AI to automate routine tasks and processes
            </p>
          </div>
          <div className="bg-white rounded-lg p-3">
            <p className="text-slate-700">
              <span className="font-medium text-purple-700">•</span> Maintain accessibility at every level of the
              organization
            </p>
          </div>
          <div className="bg-white rounded-lg p-3">
            <p className="text-slate-700">
              <span className="font-medium text-purple-700">•</span> Scale efficiently as we grow our user base and
              services
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

