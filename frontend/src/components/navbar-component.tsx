"use client"

import { useState } from "react"
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
  NavbarButton,
} from "@/components/ui/navbar"

const navItems = [
  {
    name: "Features",
    link: "#features",
  },
  {
    name: "How It Works",
    link: "#how-it-works",
  },
  {
    name: "Testimonials",
    link: "#testimonials",
  },
  {
    name: "FAQ",
    link: "#faq",
  },
]

export default function NavbarComponent() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Navbar>
        <NavBody>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center">
              <NavbarLogo />
            </div>
            <NavItems items={navItems} />
            <div className="flex items-center space-x-4">
              <NavbarButton href="/login" variant="secondary">
                Log in
              </NavbarButton>
              <NavbarButton href="/signup" variant="gradient">
                Sign up
              </NavbarButton>
            </div>
          </div>
        </NavBody>
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
          </MobileNavHeader>
          <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                className="w-full py-2 text-lg font-medium text-neutral-700 dark:text-neutral-200"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="mt-4 flex w-full flex-col gap-2">
              <NavbarButton href="/login" variant="secondary" className="w-full">
                Log in
              </NavbarButton>
              <NavbarButton href="/signup" variant="gradient" className="w-full">
                Sign up
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </>
  )
}
