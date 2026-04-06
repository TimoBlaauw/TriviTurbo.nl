"use client"

import Image from "next/image"
import { usePopup } from "@/contexts/popup-context"
import { Button } from "@/components/ui/button"
import { ExternalLink, Quote, Clock } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const testimonials = [
  {
    quote: "We kregen 3 directe boekingen binnen 4 weken. Daarmee bespaarden we direct €340 aan platformkosten.",
    author: "Marloes",
    role: "eigenaar van een villa in de Franse Alpen",
  },
  {
    quote: "We merkten meteen verschil in vertrouwen. Mensen nemen sneller contact op en vragen gerichter naar beschikbaarheid en prijzen.",
    author: "Sofie",
    role: "eigenaar van een natuurhuisje in Münsterland",
  },
  {
    quote: "5 directe boekingen in 9 weken. De website heeft zichzelf nu al terugverdiend.",
    author: "Frank",
    role: "eigenaar van een appartement aan de kust van Walcheren",
  },
]

export function Portfolio() {
  const { openPopup } = usePopup()

  const headerAnimation = useScrollAnimation<HTMLDivElement>()
  const portfolioAnimation = useScrollAnimation<HTMLDivElement>()
  const testimonialsAnimation = useScrollAnimation<HTMLDivElement>()
  const ctaAnimation = useScrollAnimation<HTMLDivElement>()

  return (
    <section id="voorbeeld" className="py-20 md:py-28 bg-white scroll-mt-20 overflow-x-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          ref={headerAnimation.ref}
          className="text-center mb-16 max-w-4xl mx-auto transition-all duration-700 ease-out"
          style={{
            opacity: headerAnimation.isVisible ? 1 : 0,
            transform: headerAnimation.isVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <p className="text-[#0095FF] font-bold text-sm tracking-wider uppercase mb-4">LIVE VOORBEELDEN</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#072AC8] leading-tight mb-6 text-balance">
            Websites die we hebben gebouwd
          </h2>
          <p className="text-lg text-[#4b5b8a] leading-relaxed">
            Wil je eerst zien wat je krijgt? Bekijk hier een aantal voorbeelden van websites die we al hebben opgeleverd:
          </p>
        </div>

        {/* Portfolio Items Grid */}
        <div
          ref={portfolioAnimation.ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 transition-all duration-700 ease-out"
          style={{
            opacity: portfolioAnimation.isVisible ? 1 : 0,
            transform: portfolioAnimation.isVisible
              ? "translateY(0) scale(1)"
              : "translateY(30px) scale(0.98)",
          }}
        >
          {/* Card 1: Landal Bad Bentheim 309 */}
          <div className="bg-gradient-to-br from-[#f0f6ff] to-white rounded-3xl p-6 border border-[#072AC8]/10 shadow-xl overflow-hidden flex flex-col">
            {/* Device Mockup */}
            <div className="relative mb-6">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#072AC8]/10">
                {/* Browser Header */}
                <div className="bg-gradient-to-r from-gray-100 to-gray-50 px-4 py-2.5 flex items-center gap-2 border-b">
                  <div className="flex gap-1.5 flex-shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 mx-3 min-w-0">
                    <div className="bg-white rounded-md px-2.5 py-1 text-xs text-gray-400 flex items-center gap-1.5 min-w-0 overflow-hidden">
                      <svg className="w-2.5 h-2.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span className="truncate">landalbadbentheim309.de</span>
                    </div>
                  </div>
                </div>
                {/* Screenshot */}
                <Image
                  src="/images/landal-bad-bentheim-screenshot.jpg"
                  alt="Landal Bad Bentheim 309 website screenshot"
                  width={600}
                  height={375}
                  className="w-full h-auto"
                  style={{ height: "auto" }}
                />
              </div>
              {/* Badge */}
              <div className="absolute -top-3 right-3 bg-gradient-to-r from-[#072AC8] to-[#0095FF] text-white px-3 py-1.5 rounded-full font-bold text-xs shadow-lg">
                Live Website
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col">
              <h3 className="text-xl md:text-2xl font-black text-[#072AC8] mb-3">
                Landal Bad Bentheim 309
              </h3>
              <p className="text-[#4b5b8a] text-sm leading-relaxed mb-4 flex-grow">
                Vakantiewoning in Duitsland met doorklik naar het officiële boekingskanaal van Landal.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-[#0095FF]/10 text-[#072AC8] px-3 py-1.5 rounded-full text-xs font-semibold">
                  Mobielvriendelijk
                </span>
                <span className="bg-[#0095FF]/10 text-[#072AC8] px-3 py-1.5 rounded-full text-xs font-semibold">
                  Snelle laadtijd
                </span>
                <span className="bg-[#0095FF]/10 text-[#072AC8] px-3 py-1.5 rounded-full text-xs font-semibold">
                  Doorklik boekingssysteem
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://landalbadbentheim309.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#072AC8] to-[#0095FF] text-white font-bold px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 text-sm"
                >
                  Bekijk live voorbeeld
                  <ExternalLink className="w-4 h-4" />
                </a>
                <Button
                  onClick={openPopup}
                  variant="outline"
                  className="border-2 border-[#072AC8]/20 text-[#072AC8] font-bold px-5 py-2.5 rounded-xl hover:bg-[#072AC8] hover:text-white transition-all text-sm"
                >
                  Dit wil ik ook
                </Button>
              </div>
            </div>
          </div>

          {/* Card 2: El Olivo Dorado */}
          <div className="bg-gradient-to-br from-[#f0f6ff] to-white rounded-3xl p-6 border border-[#072AC8]/10 shadow-xl overflow-hidden flex flex-col">
            {/* Device Mockup */}
            <div className="relative mb-6">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#072AC8]/10">
                {/* Browser Header */}
                <div className="bg-gradient-to-r from-gray-100 to-gray-50 px-4 py-2.5 flex items-center gap-2 border-b">
                  <div className="flex gap-1.5 flex-shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 mx-3 min-w-0">
                    <div className="bg-white rounded-md px-2.5 py-1 text-xs text-gray-400 flex items-center gap-1.5 min-w-0 overflow-hidden">
                      <svg className="w-2.5 h-2.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span className="truncate">elolivodorado.es</span>
                    </div>
                  </div>
                </div>
                {/* Screenshot */}
                <Image
                  src="/images/el-olivo-dorado-screenshot.jpg"
                  alt="El Olivo Dorado website screenshot"
                  width={600}
                  height={375}
                  className="w-full h-auto"
                  style={{ height: "auto" }}
                />
              </div>
              {/* Badge */}
              <div className="absolute -top-3 right-3 bg-gradient-to-r from-[#072AC8] to-[#0095FF] text-white px-3 py-1.5 rounded-full font-bold text-xs shadow-lg">
                Live Website
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col">
              <h3 className="text-xl md:text-2xl font-black text-[#072AC8] mb-3">
                El Olivo Dorado
              </h3>
              <p className="text-[#4b5b8a] text-sm leading-relaxed mb-4 flex-grow">
                Bed & breakfast in Ronda, Zuid-Spanje met een volledig geïntegreerd boekingssysteem en online betaling.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-[#0095FF]/10 text-[#072AC8] px-3 py-1.5 rounded-full text-xs font-semibold">
                  Boekingssysteem
                </span>
                <span className="bg-[#0095FF]/10 text-[#072AC8] px-3 py-1.5 rounded-full text-xs font-semibold">
                  Online betalen
                </span>
                <span className="bg-[#0095FF]/10 text-[#072AC8] px-3 py-1.5 rounded-full text-xs font-semibold">
                  Meertalig
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://www.elolivodorado.es/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#072AC8] to-[#0095FF] text-white font-bold px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 text-sm"
                >
                  Bekijk live voorbeeld
                  <ExternalLink className="w-4 h-4" />
                </a>
                <Button
                  onClick={openPopup}
                  variant="outline"
                  className="border-2 border-[#072AC8]/20 text-[#072AC8] font-bold px-5 py-2.5 rounded-xl hover:bg-[#072AC8] hover:text-white transition-all text-sm"
                >
                  Dit wil ik ook
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <div
            ref={testimonialsAnimation.ref}
            className="transition-all duration-700 ease-out"
            style={{
              opacity: testimonialsAnimation.isVisible ? 1 : 0,
              transform: testimonialsAnimation.isVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <h3 className="text-2xl md:text-3xl font-black text-[#072AC8] text-center mb-10">
              Wat eigenaren zeggen
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#f0f6ff] to-white rounded-2xl p-6 border border-[#072AC8]/8 shadow-lg hover:shadow-xl transition-all duration-500 h-full flex flex-col"
                style={{
                  opacity: testimonialsAnimation.isVisible ? 1 : 0,
                  transform: testimonialsAnimation.isVisible ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: `${200 + index * 150}ms`,
                }}
              >
                <Quote className="w-10 h-10 text-[#01BCFF] mb-4 flex-shrink-0" />
                <p className="text-[#072AC8] font-medium mb-6 leading-relaxed flex-grow">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#072AC8] to-[#0095FF] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.author[0]}
                  </div>
                  <div>
                    <p className="font-bold text-[#072AC8]">{testimonial.author}</p>
                    <p className="text-sm text-[#4b5b8a]">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          ref={ctaAnimation.ref}
          className="text-center bg-gradient-to-r from-[#FCF300]/20 to-[#01BCFF]/10 rounded-3xl p-8 md:p-12 border border-[#FCF300]/30 transition-all duration-700 ease-out"
          style={{
            opacity: ctaAnimation.isVisible ? 1 : 0,
            transform: ctaAnimation.isVisible
              ? "translateY(0) scale(1)"
              : "translateY(30px) scale(0.98)",
          }}
        >
          <p className="text-lg md:text-xl font-semibold text-[#072AC8] mb-4">
            Wil je zien hoe dit eruitziet voor jouw accommodatie?
          </p>

          <div className="flex items-center justify-center gap-2 mb-6 text-[#4b5b8a]">
            <Clock className="w-5 h-5 text-[#0095FF]" />
            <span className="text-sm font-medium">Je ontvangt je voorbeeldwebsite binnen 48 uur</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={openPopup}
              size="lg"
              className="bg-[#FCF300] text-[#072AC8] hover:bg-[#FCF300]/90 font-bold text-sm sm:text-base md:text-lg px-6 sm:px-10 py-5 sm:py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 w-full sm:w-auto max-w-full"
            >
              <span className="whitespace-normal sm:whitespace-nowrap">Bouw mijn gratis voorbeeldwebsite</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
