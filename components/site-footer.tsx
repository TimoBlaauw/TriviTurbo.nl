"use client"

import Image from "next/image"
import { usePopup } from "@/contexts/popup-context"
import { Button } from "@/components/ui/button"

export function SiteFooter() {
  const { openPopup } = usePopup()

  return (
    <>
      {/* Final CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-[#072AC8] via-[#0095FF] to-[#01BCFF] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="footerPattern"
                x="0"
                y="0"
                width="200"
                height="200"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="100" cy="100" r="80" fill="rgba(255,255,255,0.1)" />
                <circle cx="0" cy="0" r="60" fill="rgba(255,255,255,0.05)" />
                <circle cx="200" cy="0" r="60" fill="rgba(255,255,255,0.05)" />
                <circle cx="0" cy="200" r="60" fill="rgba(255,255,255,0.05)" />
                <circle cx="200" cy="200" r="60" fill="rgba(255,255,255,0.05)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#footerPattern)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6 text-balance">
              Stop met het verdienmodel van platformen te voeden met jouw harde werk
            </h2>
            <p className="text-xl text-white/90 leading-relaxed mb-8 max-w-3xl mx-auto">
              Het Directe Boekingskanaal-systeem geeft jou weer meer controle over je boekingsomzet. Met jouw gratis
              voorbeeldwebsite zie je precies hoeveel geld je zelf zou kunnen houden, in plaats van weg te geven aan
              platformen.
            </p>

            <div className="flex justify-center px-4">
              <Button
                onClick={openPopup}
                size="lg"
                className="bg-[#FCF300] text-[#072AC8] hover:bg-white font-bold text-base md:text-lg px-8 md:px-12 py-6 md:py-7 rounded-2xl shadow-2xl hover:shadow-3xl transition-all hover:scale-105 w-full sm:w-auto max-w-full"
              >
                BOUW MIJN GRATIS VOORBEELDWEBSITE NU
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#072AC8] py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Trivi-Turbo-Logo-9FgJYGnIpjwFGebhk7V6xDrblbKtYC.png"
                alt="TriviTurbo Logo"
                width={140}
                height={40}
                className="h-8 w-auto brightness-0 invert"
              />
            </div>

            <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <a href="#calculator" className="text-white/70 hover:text-white transition-colors">
                Calculator
              </a>
              <a href="#voorbeeld" className="text-white/70 hover:text-white transition-colors">
                Voorbeelden
              </a>
              <a href="#faq" className="text-white/70 hover:text-white transition-colors">
                FAQ
              </a>
            </nav>

            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} TriviTurbo. Alle rechten voorbehouden.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
