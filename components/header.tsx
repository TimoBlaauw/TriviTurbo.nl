"use client"

import Image from "next/image"
import { usePopup } from "@/contexts/popup-context"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "#hoe-het-werkt", label: "Hoe het werkt" },
  { href: "#calculator", label: "Bespaarcheck" },
  { href: "#voorbeeld", label: "Voorbeelden" },
  { href: "#prijzen", label: "Prijzen" },
  { href: "#faq", label: "FAQ" },
]

export function Header() {
  const { openPopup } = usePopup()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* MATCH hero: container mx-auto px-4 */}
      <div className="container mx-auto px-4">
        <div
          className={`mx-auto mt-4 w-full transition-all duration-500 ${scrolled
              ? "bg-white/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(7,42,200,0.12)] rounded-full"
              : "bg-white/90 backdrop-blur-md shadow-[0_4px_20px_rgba(7,42,200,0.08)] rounded-full"
            }`}
        >
          <div className="px-4 md:px-6 py-3 flex items-center justify-between">
            <a href="#" className="flex items-center gap-2 flex-shrink-0">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Trivi-Turbo-Logo-9FgJYGnIpjwFGebhk7V6xDrblbKtYC.png"
                alt="TriviTurbo Logo"
                width={150}
                height={40}
                className="max-h-8 md:max-h-10 w-auto"
                priority
              />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-[#072AC8]/80 hover:text-[#072AC8] hover:bg-[#072AC8]/5 px-4 py-2 rounded-full transition-all"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Button
                id="ttv-cta-open"
                onClick={openPopup}
                className="hidden sm:flex bg-[#072AC8] text-white hover:bg-[#0095FF] font-bold text-sm px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 hover:-translate-y-0.5"
              >
                Gratis voorbeeldwebsite
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-full text-[#072AC8] hover:bg-[#072AC8]/10 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu — same container width */}
        {mobileOpen && (
          <div className="lg:hidden mt-2 w-full bg-white rounded-2xl shadow-[0_8px_32px_rgba(7,42,200,0.15)] border border-[#072AC8]/5 overflow-hidden animate-in slide-in-from-top-2 duration-200">
            <nav className="p-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[#072AC8] font-semibold py-3 px-4 hover:bg-[#072AC8]/5 rounded-xl transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Button
                onClick={() => {
                  setMobileOpen(false)
                  openPopup()
                }}
                className="mt-3 bg-[#072AC8] text-white hover:bg-[#0095FF] font-bold rounded-full py-6"
              >
                Gratis voorbeeldwebsite
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
