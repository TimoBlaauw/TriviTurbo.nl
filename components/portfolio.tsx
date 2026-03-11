"use client"

import Image from "next/image"
import { usePopup } from "@/contexts/popup-context"
import { Button } from "@/components/ui/button"
import { ExternalLink, Quote, Clock } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const testimonials = [
  {
    quote: "We kregen 3 directe boekingen binnen 4 weken. Daarmee bespaarde we direct €340 aan platformkosten.",
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
    <section id="voorbeeld" className="py-20 md:py-28 bg-white scroll-mt-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          ref={headerAnimation.ref}
          className="text-center mb-16 max-w-4xl mx-auto transition-all duration-700 ease-out"
          style={{
            opacity: headerAnimation.isVisible ? 1 : 0,
            transform: headerAnimation.isVisible ? 'translateY(0)' : 'translateY(30px)'
          }}
        >
          <p className="text-[#0095FF] font-bold text-sm tracking-wider uppercase mb-4">
            LIVE VOORBEELD
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#072AC8] leading-tight mb-6 text-balance">
            Vakantiehuiswebsite die we hebben gebouwd
          </h2>
          <p className="text-lg text-[#4b5b8a] leading-relaxed">
            Wil je eerst zien wat je krijgt? Dit is één van de website die we al hebben opgeleverd:
          </p>
        </div>

        {/* Portfolio Item */}
        <div
          ref={portfolioAnimation.ref}
          className="max-w-5xl mx-auto mb-20 transition-all duration-700 ease-out"
          style={{
            opacity: portfolioAnimation.isVisible ? 1 : 0,
            transform: portfolioAnimation.isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.98)'
          }}
        >
          <div className="bg-gradient-to-br from-[#f0f6ff] to-white rounded-3xl p-8 md:p-12 border border-[#072AC8]/10 shadow-xl">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Device Mockup */}
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#072AC8]/10">
                  {/* Browser Header */}
                  <div className="bg-gradient-to-r from-gray-100 to-gray-50 px-4 py-3 flex items-center gap-2 border-b">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="bg-white rounded-md px-3 py-1.5 text-xs text-gray-400 flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                        landalbadbentheim309.de
                      </div>
                    </div>
                  </div>
                  {/* Screenshot */}
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot-website-we-build-before-PeSzrzylwQ8tCQfHcqyxCzm6VI7uXS.png"
                    alt="Landal Bad Bentheim 309 website screenshot"
                    width={800}
                    height={500}
                    className="w-full h-auto"
                  />
                </div>
                {/* Badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#072AC8] to-[#0095FF] text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                  Live Website
                </div>
              </div>

              {/* Info */}
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-[#072AC8] mb-4">Landal Bad Bentheim 309</h3>
                <p className="text-[#4b5b8a] leading-relaxed mb-6">
                  Zo ziet een snelle, professionele vakantiehuiswebsite eruit: rustig design, duidelijke informatie
                  en een sterke route naar een reserveringsaanvraag.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="bg-[#0095FF]/10 text-[#072AC8] px-4 py-2 rounded-full text-sm font-semibold">
                    Mobielvriendelijk
                  </span>
                  <span className="bg-[#0095FF]/10 text-[#072AC8] px-4 py-2 rounded-full text-sm font-semibold">
                    Snelle laadtijd
                  </span>
                  <span className="bg-[#0095FF]/10 text-[#072AC8] px-4 py-2 rounded-full text-sm font-semibold">
                    Direct contact
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://landalbadbentheim309.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#072AC8] to-[#0095FF] text-white font-bold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  >
                    Bekijk live voorbeeld
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <Button
                    onClick={openPopup}
                    variant="outline"
                    className="border-2 border-[#072AC8]/20 text-[#072AC8] font-bold px-6 py-3 rounded-2xl hover:bg-[#072AC8] hover:text-white transition-all"
                  >
                    Dit wil ik ook
                  </Button>
                </div>
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
              transform: testimonialsAnimation.isVisible ? 'translateY(0)' : 'translateY(30px)'
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
                  transform: testimonialsAnimation.isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: `${200 + index * 150}ms`
                }}
              >
                <Quote className="w-10 h-10 text-[#01BCFF] mb-4 flex-shrink-0" />
                <p className="text-[#072AC8] font-medium mb-6 leading-relaxed flex-grow">&quot;{testimonial.quote}&quot;</p>
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
            transform: ctaAnimation.isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.98)'
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
              className="bg-[#FCF300] text-[#072AC8] hover:bg-[#FCF300]/90 font-bold text-base sm:text-lg px-10 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105"
            >
              BOUW MIJN GRATIS VOORBEELDWEBSITE NU
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
