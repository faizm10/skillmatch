"use client"

import { motion } from "motion/react"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Full Stack Developer",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "SkillMatch helped me find the perfect teammates for my hackathon project. We ended up winning first place! The skill-based matching is incredibly accurate.",
    stars: 5,
  },
  {
    name: "Sarah Chen",
    role: "UI/UX Designer",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "As a designer, I was always struggling to find developers who appreciated good design. SkillMatch connected me with amazing developers who valued my skills.",
    stars: 5,
  },
  {
    name: "Michael Rodriguez",
    role: "Machine Learning Engineer",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "The GraphQL matching algorithm is brilliant! I found teammates with complementary skills who were just as passionate about AI as I am.",
    stars: 4,
  },
  {
    name: "Priya Patel",
    role: "Product Manager",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "SkillMatch made team formation so easy. I found developers and designers who understood my vision and helped bring our project to life.",
    stars: 5,
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-4 text-3xl font-bold text-slate-800 md:text-4xl dark:text-slate-200"
          >
            What Our Users Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400"
          >
            Success stories from hackathon participants who found their dream teams
          </motion.p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-2xl bg-white p-8 shadow-lg dark:bg-neutral-900">
            <div className="flex flex-col items-center md:flex-row">
              <div className="mb-6 flex-shrink-0 md:mb-0 md:mr-8">
                <img
                  src={testimonials[currentIndex].image || "/placeholder.svg"}
                  alt={testimonials[currentIndex].name}
                  className="h-24 w-24 rounded-full object-cover"
                />
              </div>
              <div>
                <div className="mb-2 flex">
                  {[...Array(testimonials[currentIndex].stars)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-4 text-lg italic text-slate-600 dark:text-slate-300">
                  "{testimonials[currentIndex].content}"
                </p>
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={prevTestimonial}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-colors hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-800/50"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === currentIndex ? "w-6 bg-blue-600 dark:bg-blue-500" : "bg-blue-200 dark:bg-blue-900"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-colors hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-800/50"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
