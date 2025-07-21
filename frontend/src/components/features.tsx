"use client"

import { motion } from "motion/react"
import { Users, MessageSquare, Search, Code, Award, Clock } from "lucide-react"

const features = [
  {
    icon: <Users className="h-8 w-8 text-blue-500" />,
    title: "Smart Profile Creation",
    description: "Create detailed profiles with your skills, interests, and project goals to find the perfect match.",
  },
  {
    icon: <Code className="h-8 w-8 text-blue-500" />,
    title: "Skill-Based Matching",
    description: "Our GraphQL-powered algorithm finds teammates with complementary skills for balanced teams.",
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-blue-500" />,
    title: "Real-time Messaging",
    description: "Connect instantly with potential teammates through our built-in messaging system.",
  },
  {
    icon: <Search className="h-8 w-8 text-blue-500" />,
    title: "Advanced Discovery",
    description: "Browse and filter potential teammates based on skills, interests, and availability.",
  },
  {
    icon: <Award className="h-8 w-8 text-blue-500" />,
    title: "Project Showcase",
    description: "Highlight your past hackathon projects and achievements to attract the best teammates.",
  },
  {
    icon: <Clock className="h-8 w-8 text-blue-500" />,
    title: "Availability Matching",
    description: "Find teammates who can commit to the same schedule as you for maximum productivity.",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-4 text-3xl font-bold text-slate-800 md:text-4xl dark:text-slate-200"
          >
            Powerful Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400"
          >
            Everything you need to build the perfect hackathon team
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-800 dark:text-slate-200">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
