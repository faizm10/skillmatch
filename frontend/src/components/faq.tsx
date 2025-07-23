"use client"

import { motion } from "motion/react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./ui/accordion"

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
          <Accordion type="single" collapsible>
          {faqs.map((faq, index) => (
              <AccordionItem key={index} value={String(index)}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
          ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
