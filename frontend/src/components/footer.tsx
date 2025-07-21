import { Github, Twitter, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white py-12 dark:bg-neutral-950">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center">
              <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700">
                <span className="text-lg font-bold text-white">SM</span>
              </div>
              <span className="text-xl font-bold text-slate-800 dark:text-white">SkillMatch</span>
            </div>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Find your perfect hackathon team with our GraphQL-powered matching platform.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="md:col-span-1">
            <h3 className="mb-4 text-lg font-semibold text-slate-800 dark:text-white">Product</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#features"
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                  API
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="mb-4 text-lg font-semibold text-slate-800 dark:text-white">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                  Hackathon Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                  Success Stories
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="mb-4 text-lg font-semibold text-slate-800 dark:text-white">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-200 pt-8 text-center dark:border-neutral-800">
          <p className="text-slate-600 dark:text-slate-400">
            © {new Date().getFullYear()} SkillMatch. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
