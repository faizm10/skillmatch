"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Users, Zap, Target, Trophy, Menu, X, Github, Linkedin, Play, Globe, Shield } from "lucide-react"
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid"
import { Button } from "../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import Link from "next/link"
import { cn } from "../lib/utils"

export default function SkillMatchLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const stats = [
    { number: "50K+", label: "Developers Matched", icon: Users },
    { number: "2,500+", label: "Teams Formed", icon: Target },
    { number: "89%", label: "Success Rate", icon: Trophy },
    { number: "72h", label: "Avg. Match Time", icon: Zap },
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Full-Stack Developer",
      company: "Winner - EthGlobal 2024",
      content: "Found my dream team in 6 hours. We won first place and are now building a startup together.",
      avatar: "SC",
    },
    {
      name: "Marcus Rodriguez",
      role: "AI/ML Engineer",
      company: "TechCrunch Disrupt Finalist",
      content: "SkillMatch's algorithm perfectly matched our complementary skills. Our prototype got acquired.",
      avatar: "MR",
    },
    {
      name: "Priya Patel",
      role: "Product Designer",
      company: "Y Combinator W24",
      content: "The team I found here became my co-founders. We just closed our seed round.",
      avatar: "PP",
    },
  ]

  const features = [
    {
      icon: Target,
      title: "Smart Skill Matching",
      description:
        "AI-powered algorithm analyzes technical skills, experience levels, and project preferences to find your perfect team match.",
      className: "lg:col-span-2",
      header: (
        <div className="flex flex-col items-center justify-center h-full">
          <Target className="w-16 h-16 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900">Smart Skill Matching</h3>
        </div>
      ),
    },
    {
      icon: Zap,
      title: "Instant Team Formation",
      description: "Get matched with compatible team members in minutes, not days. Start building immediately.",
      className: "lg:col-span-1",
      header: (
        <div className="flex flex-col items-center justify-center h-full">
          <Zap className="w-16 h-16 text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900">Instant Team Formation</h3>
        </div>
      ),
    },
    {
      icon: Shield,
      title: "Verified Profiles",
      description:
        "GitHub integration and skill verification ensure you're working with genuine, qualified developers.",
      className: "lg:col-span-1",
      header: (
        <div className="flex flex-col items-center justify-center h-full">
          <Shield className="w-16 h-16 text-green-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900">Verified Profiles</h3>
        </div>
      ),
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Connect with talent worldwide. Remote-first approach opens unlimited collaboration possibilities.",
      className: "lg:col-span-2",
      header: (
        <div className="flex flex-col items-center justify-center h-full">
          <Globe className="w-16 h-16 text-orange-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900">Global Community</h3>
        </div>
      ),
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav
        className={cn(
          "fixed w-full z-50 transition-all duration-300",
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-lg py-2" : "bg-transparent py-4",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div
                className={cn(
                  "bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transition-all duration-300",
                  isScrolled ? "w-8 h-8" : "w-10 h-10",
                )}
              >
                <Target className={cn("text-white transition-all duration-300", isScrolled ? "w-5 h-5" : "w-6 h-6")} />
              </div>
              <span
                className={cn(
                  "font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transition-all duration-300",
                  isScrolled ? "text-xl" : "text-2xl",
                )}
              >
                SkillMatch
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">
                Features
              </a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">
                Success Stories
              </a>
              <Button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all duration-200 hover:scale-105">
                Get Started
              </Button>
            </div>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block text-gray-700">
                Features
              </a>
              <a href="#testimonials" className="block text-gray-700">
                Success Stories
              </a>
              <Button className="w-full bg-blue-600 text-white py-2 rounded-full">Get Started</Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-blue-200">
            <Zap className="w-4 h-4 mr-2" />
            Join 50,000+ developers finding their dream teams
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Find Your Perfect
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              Hackathon Team
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Stop wasting time on mismatched teams. Our AI-powered platform connects you with developers who complement
            your skills and share your vision. Build winning projects, faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center">
              Start Matching Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="ghost"
              className="flex items-center text-gray-700 hover:text-blue-600 transition-colors px-6 py-4"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo (2 min)
            </Button>
          </div>

          {/* Image/Video Placeholder below CTA */}
          <div className="relative w-full max-w-5xl mx-auto mt-16 mb-20">
            <img
              src="/placeholder.svg?height=500&width=900"
              alt="SkillMatch Platform Interface"
              className="rounded-xl shadow-2xl object-cover w-full h-auto border border-gray-200"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Teams Choose SkillMatch</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built by hackathon winners for hackathon winners. Every feature is designed to eliminate friction and
              maximize your chances of success.
            </p>
          </div>
          <BentoGrid className="max-w-4xl mx-auto">
            {features.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                icon={<item.icon className="h-4 w-4 text-neutral-500" />}
                className={item.className}
              />
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* Social Proof */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">
              Real teams, real wins, real startups born from SkillMatch connections
            </p>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl">
              <div className="flex items-center mb-6">
                <Avatar className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  <AvatarFallback>{testimonials[activeTestimonial].avatar}</AvatarFallback>
                  <AvatarImage
                    src={`/placeholder.svg?height=64&width=64&query=${testimonials[activeTestimonial].name}`}
                    alt={testimonials[activeTestimonial].name}
                  />
                </Avatar>
                <div>
                  <div className="font-semibold text-gray-900 text-lg">{testimonials[activeTestimonial].name}</div>
                  <div className="text-gray-600">
                    {testimonials[activeTestimonial].role} • {testimonials[activeTestimonial].company}
                  </div>
                </div>
              </div>
              <blockquote className="text-xl text-gray-700 leading-relaxed mb-6">
                {`"${testimonials[activeTestimonial].content}"`}
              </blockquote>
              <div className="flex justify-center space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${index === activeTestimonial ? "bg-blue-600" : "bg-gray-300"}`}
                    onClick={() => setActiveTestimonial(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Build Something Amazing?</h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Join thousands of developers who've found their perfect team match. Your next breakthrough project starts
            with the right team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center">
              Start Your Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="ghost"
              className="text-white hover:text-blue-100 transition-colors px-6 py-4 flex items-center"
            >
              <Github className="w-5 h-5 mr-2" />
              Connect with GitHub
            </Button>
          </div>
          <div className="mt-10 text-blue-100 text-sm">
            🚀 No credit card required • 🔒 Cancel anytime • ⚡ Setup in 2 minutes
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">SkillMatch</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto mb-6">
            The future of hackathon team formation. Built by developers, for developers.
          </p>
          <div className="flex justify-center space-x-4 mb-6">
            <Link href="#" className="hover:text-white transition-colors" aria-label="GitHub">
              <Github className="w-6 h-6" />
            </Link>
            <Link href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-6 h-6" />
            </Link>
          </div>
          <div className="border-t border-gray-800 pt-6 text-gray-400 text-xs">
            <p>&copy; 2025 SkillMatch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
