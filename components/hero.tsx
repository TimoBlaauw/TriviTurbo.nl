"use client"

import { usePopup } from "@/contexts/popup-context"
import { Button } from "@/components/ui/button"
import { Play, Star, Clock, ShieldCheck } from "lucide-react"

export function Hero() {
  const { openPopup } = usePopup()

  return (
    <section className="relative min-h-screen flex items-center overflow-x-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#072AC8] via-[#0095FF] to-[#01BCFF]">
        {/* Geometric Circle Pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-30"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="circlePattern"
              x="0"
              y="0"
              width="200"
              height="200"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="100" cy="100" r="80" fill="rgba(1, 188, 255, 0.3)" />
              <circle cx="0" cy="0" r="60" fill="rgba(0, 149, 255, 0.2)" />
              <circle cx="200" cy="0" r="60" fill="rgba(0, 149, 255, 0.2)" />
              <circle cx="0" cy="200" r="60" fill="rgba(0, 149, 255, 0.2)" />
              <circle cx="200" cy="200" r="60" fill="rgba(0, 149, 255, 0.2)" />
              <circle cx="100" cy="0" r="40" fill="rgba(7, 42, 200, 0.25)" />
              <circle cx="100" cy="200" r="40" fill="rgba(7, 42, 200, 0.25)" />
              <circle cx="0" cy="100" r="40" fill="rgba(7, 42, 200, 0.25)" />
              <circle cx="200" cy="100" r="40" fill="rgba(7, 42, 200, 0.25)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circlePattern)" />
        </svg>
        {/* Overlay gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#072AC8]/40 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Copy */}
          <div className="text-white overflow-hidden lg:overflow-visible">
            {/* Eyebrow */}
            <p className="text-[#FCF300] font-bold text-sm tracking-wider uppercase mb-4 animate-fade-in">
              LET OP, VAKANTIEHUISEIGENAREN
            </p>

            {/* Main Headline */}
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight mb-6 text-balance">
              Krijg minimaal 3 directe boekingen in 90 dagen via je eigen boekingswebsite{" "}
              <span className="text-[#FCF300]">— of je betaalt niets.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base md:text-xl text-white/90 leading-relaxed mb-4 max-w-xl">
              Wij bouwen jouw boekingswebsite met een direct-aanvraag systeem, zodat je niet langer elk jaar{" "}
              <strong className="text-[#FCF300]">{"€2.000–€5.000"}</strong> kwijt bent aan platformkosten.
            </p>

            {/* Support line - hidden on mobile for cleaner layout */}
            <p className="hidden lg:block text-white/80 mb-6">
              Bekijk eerst gratis jouw persoonlijke voorbeeldwebsite, voordat je iets betaalt.
            </p>

            {/* Video - Mobile only (between text and CTA) */}
            <div className="relative mb-6 lg:hidden">
              <div className="rounded-2xl shadow-2xl overflow-hidden">
                <div className="relative" style={{ paddingTop: "56.25%" }}>
                  <iframe
                    src="https://player.vimeo.com/video/1172968512?badge=0&;autopause=0&;player_id=0&;app_id=58479"
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title="TriviTurbo VSL"
                  />
                </div>
              </div>
              {/* Badge */}
              <div className="absolute -top-3 right-3 bg-[#FCF300] text-[#072AC8] px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2">
                <Play className="w-4 h-4" fill="currentColor" />
                5 min uitleg
              </div>
            </div>

            {/* CTA */}
            <div className="mb-4">
              <Button
                onClick={openPopup}
                size="lg"
                className="bg-[#FCF300] text-[#072AC8] hover:bg-white font-bold text-sm sm:text-base px-4 sm:px-8 py-5 sm:py-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all hover:scale-105 group w-full sm:w-auto"
              >
                <span className="whitespace-normal sm:whitespace-nowrap">Bouw mijn gratis voorbeeldwebsite</span>
              </Button>
            </div>

            {/* 48 hour promise */}
            <div className="flex items-center gap-2 text-white/90">
              <Clock className="w-5 h-5 text-[#FCF300]" />
              <span className="text-sm font-medium">Je ontvangt je voorbeeldwebsite binnen 48 uur</span>
            </div>

            {/* Trust Row — desktop only inside hero */}
            <div className="mt-5 hidden lg:flex items-center gap-3">
              <div className="flex -space-x-2 flex-shrink-0">
                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Linda-7sYNQclmTkltuly8ZW57icmYTzgV40.jpg" alt="Linda" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Thomas-cgqrj4PdCzhjCMt3b7HGsjPxtOaBXS.jpg" alt="Thomas" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sofia-5HzNdzQWMUaJfQWnnRc7h6qbNOMWI7.jpg" alt="Sofia" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
              </div>
              <div className="flex flex-col">
                <div className="flex gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FCF300] text-[#FCF300]" />
                  ))}
                </div>
                <p className="text-white/80 text-sm font-medium">
                  Vertrouwd door 50+ vakantiehuiseigenaren
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Video (Desktop only) */}
          <div className="relative hidden lg:block">
            <div className="rounded-2xl shadow-2xl overflow-hidden">
              <div className="relative" style={{ paddingTop: "56.25%" }}>
                <iframe
                  src="https://player.vimeo.com/video/1172968512?badge=0&;autopause=0&;player_id=0&;app_id=58479"
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="TriviTurbo VSL"
                />
              </div>
            </div>
            {/* Badge */}
            <div className="absolute -top-3 -right-3 bg-[#FCF300] text-[#072AC8] px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2">
              <Play className="w-4 h-4" fill="currentColor" />
              5 min uitleg
            </div>
          </div>
        </div>
      </div>

    </section>

    {/* Trust Row — mobile only, rendered BELOW the hero so it's below the fold */}
    <div className="lg:hidden bg-[#072AC8] py-4 px-4">
      <div className="flex items-center justify-center gap-3">
        <div className="flex -space-x-2 flex-shrink-0">
          <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Linda-7sYNQclmTkltuly8ZW57icmYTzgV40.jpg" alt="Linda" className="w-9 h-9 rounded-full border-2 border-white object-cover" />
          <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Thomas-cgqrj4PdCzhjCMt3b7HGsjPxtOaBXS.jpg" alt="Thomas" className="w-9 h-9 rounded-full border-2 border-white object-cover" />
          <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sofia-5HzNdzQWMUaJfQWnnRc7h6qbNOMWI7.jpg" alt="Sofia" className="w-9 h-9 rounded-full border-2 border-white object-cover" />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5 flex-shrink-0">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-[#FCF300] text-[#FCF300]" />
            ))}
          </div>
          <p className="text-white/90 text-xs font-medium whitespace-nowrap">
            Vertrouwd door 50+ eigenaren
          </p>
        </div>
      </div>
    </div>
  )
}
