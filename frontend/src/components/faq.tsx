"use client"

import { motion } from "motion/react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "How does the matching algorithm work?",
    answer:
      "Our GraphQL-powered matching algorithm analyzes your skills, interests, and project goals to find teammates with complementary abilities. It considers factors like technical skills, time availability, and project interests to suggest the most compatible matches.",
  },
  {
    question: "Can I use SkillMatch for virtual hackathons?",
    answer:
      "SkillMatch works for both in-person and virtual hackathons. Our messaging system makes it easy to connect with potential teammates regardless of location.",
  },
  {
    question: "How many hackathons can I participate in simultaneously?",
    answer:
      "Free users can participate in 1 active hackathon at a time, Pro users can join up to 5 active hackathons, and Team plan users have unlimited hackathon participation.",
  },
  {
    question: "Can hackathon organizers use SkillMatch?",
    answer:
      "Yes! Our Team plan is designed specifically for hackathon organizers. It includes features like custom hackathon creation, team management dashboard, and analytics to help you run successful events.",
  },
  {
    question: "How do I update my skills and interests?",
    answer:
      "You can update your skills and interests anytime from your profile settings. Changes will be reflected immediately in the matching algorithm.",
  },
  {
    question: "Is there an API available for integration?",
    answer:
      "Yes, API access is available for Team plan subscribers. This allows you to integrate SkillMatch with your existing hackathon management systems.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-4 text-3xl font-bold text-slate-800 md:text-4xl dark:text-slate-200"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400"
          >
            Everything you need to know about SkillMatch
          </motion.p>
        </div>

        <div className="mx-auto max-w-3xl">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`mb-4 overflow-hidden rounded-lg border ${
                openIndex === index
                  ? "border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-900/20"
                  : "border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"
              }`}
            >
              <button
                className="flex w-full items-center justify-between p-6 text-left"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">{faq.question}</h3>
                <ChevronDown
                  className={`h-5 w-5 text-slate-600 transition-transform dark:text-slate-400 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`px-6 transition-all duration-300 ${
                  openIndex === index ? "pb-6 opacity-100" : "h-0 opacity-0"
                }`}
              >
                <p className="text-slate-600 dark:text-slate-400">{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
