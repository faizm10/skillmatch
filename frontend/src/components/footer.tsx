import { Github, Twitter, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white py-6 dark:bg-neutral-950">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center">
          <span className="text-center text-slate-800 dark:text-white font-semibold">
            SkillMatch © 2025
          </span>
        </div>
      </div>
    </footer>
  )
}
