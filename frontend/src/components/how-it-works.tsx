"use client"

import { motion } from "motion/react"
import { UserPlus, Users, MessageSquare, Rocket } from "lucide-react"

const steps = [
  {
    icon: <UserPlus className="h-8 w-8 text-white" />,
    title: "Create Your Profile",
    description: "Sign up and create your profile with skills, interests, and project goals.",
    color: "from-blue-400 to-blue-600",
  },
  {
    icon: <Users className="h-8 w-8 text-white" />,
    title: "Get Matched",
    description: "Our GraphQL algorithm finds teammates with complementary skills and interests.",
    color: "from-blue-500 to-blue-700",
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-white" />,
    title: "Connect & Chat",
    description: "Message potential teammates to discuss project ideas and goals.",
    color: "from-blue-600 to-blue-800",
  },
  {
    icon: <Rocket className="h-8 w-8 text-white" />,
    title: "Build Amazing Projects",
    description: "Form your dream team and start building your next hackathon project.",
    color: "from-blue-700 to-blue-900",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-blue-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-4 text-3xl font-bold text-slate-800 md:text-4xl dark:text-slate-200"
          >
            How SkillMatch Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400"
          >
            Find your perfect hackathon team in four simple steps
          </motion.p>
        </div>

        <div className="relative">
          

          <div className="relative grid gap-12 md:grid-cols-4 md:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div
                  className={`relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${step.color}`}
                >
                  {step.icon}
                  <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm font-bold text-blue-600 shadow-md dark:bg-neutral-800 dark:text-blue-400">
                    {index + 1}
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-slate-800 dark:text-slate-200">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
