"use client"

import Image from "next/image"
import { usePopup } from "@/contexts/popup-context"
import { Button } from "@/components/ui/button"
import { ExternalLink, Quote, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useState } from "react"

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

const portfolioItems = [
  {
    name: "El Olivo Dorado",
    url: "https://www.elolivodorado.es/",
    domain: "elolivodorado.es",
    image: "/images/el-olivo-dorado-screenshot.jpg",
    description: "Sfeervolle bed & breakfast in Ronda, Zuid-Spanje. Volledig geïntegreerd boekingssysteem met online betaling en meertalige ondersteuning.",
    tags: ["Boekingssysteem", "Online betalen", "Meertalig"],
  },
  {
    name: "Landal Bad Bentheim 309",
    url: "https://landalbadbentheim309.de",
    domain: "landalbadbentheim309.de",
    image: "/images/landal-bad-bentheim-screenshot.jpg",
    description: "Vakantiewoning in het Duitse graafschap Bad Bentheim met directe doorklik naar het officiële Landal boekingskanaal.",
    tags: ["Mobielvriendelijk", "Snelle laadtijd", "Doorklik boeken"],
  },
]

export function Portfolio() {
  const { openPopup } = usePopup()
  const [currentSlide, setCurrentSlide] = useState(0)

  const headerAnimation = useScrollAnimation<HTMLDivElement>()
  const portfolioAnimation = useScrollAnimation<HTMLDivElement>()
  const testimonialsAnimation = useScrollAnimation<HTMLDivElement>()
  const ctaAnimation = useScrollAnimation<HTMLDivElement>()

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % portfolioItems.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length)

  return (
    <section id="voorbeeld" className="py-20 md:py-28 bg-gradient-to-b from-[#f0f6ff] via-[#f0f6ff] to-white scroll-mt-20 overflow-x-hidden">
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

        {/* Portfolio Items - Desktop Grid / Mobile Carousel */}
        <div
          ref={portfolioAnimation.ref}
          className="mb-20 md:mb-44 max-w-5xl mx-auto transition-all duration-700 ease-out"
          style={{
            opacity: portfolioAnimation.isVisible ? 1 : 0,
            transform: portfolioAnimation.isVisible
              ? "translateY(0) scale(1)"
              : "translateY(30px) scale(0.98)",
          }}
        >
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 gap-8">
            {portfolioItems.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-[#f0f6ff] to-white rounded-2xl p-6 border border-[#072AC8]/10 shadow-lg overflow-hidden flex flex-col">
                <div className="relative mb-6">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#072AC8]/10">
                    <div className="bg-gradient-to-r from-gray-100 to-gray-50 px-4 py-2.5 flex items-center gap-2 border-b">
                      <div className="flex gap-1.5 flex-shrink-0">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                      </div>
                      <div className="flex-1 mx-3 min-w-0">
                        <div className="bg-white rounded-md px-3 py-1 text-sm text-gray-400 flex items-center gap-2 min-w-0 overflow-hidden">
                          <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          <span className="truncate">{item.domain}</span>
                        </div>
                      </div>
                    </div>
                    <Image src={item.image} alt={`${item.name} website screenshot`} width={600} height={375} className="w-full h-auto" style={{ height: "auto" }} />
                  </div>
                  <div className="absolute -top-3 right-3 bg-gradient-to-r from-[#072AC8] to-[#0095FF] text-white px-4 py-1.5 rounded-full font-bold text-sm shadow-lg">
                    Live Website
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <h3 className="text-2xl font-black text-[#072AC8] mb-3">{item.name}</h3>
                  <p className="text-[#4b5b8a] text-base leading-relaxed mb-5 flex-grow">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-[#0095FF]/10 text-[#072AC8] px-4 py-2 rounded-full text-sm font-semibold">{tag}</span>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#072AC8] to-[#0095FF] text-white font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 text-base">
                      Bekijk live website
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <Button onClick={openPopup} variant="outline" className="border-2 border-[#072AC8]/20 text-[#072AC8] font-bold px-6 py-3 rounded-xl hover:bg-[#072AC8] hover:text-white transition-all text-base">
                      Dit wil ik ook
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <div className="relative">
              {/* Carousel Container */}
              <div className="overflow-hidden rounded-2xl">
                <div
                  className="flex transition-transform duration-300 ease-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {portfolioItems.map((item, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-1">
                      <div className="bg-gradient-to-br from-[#f0f6ff] to-white rounded-2xl p-5 border border-[#072AC8]/10 shadow-lg overflow-hidden flex flex-col">
                        <div className="relative mb-5">
                          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#072AC8]/10">
                            <div className="bg-gradient-to-r from-gray-100 to-gray-50 px-3 py-2 flex items-center gap-2 border-b">
                              <div className="flex gap-1.5 flex-shrink-0">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                              </div>
                              <div className="flex-1 mx-2 min-w-0">
                                <div className="bg-white rounded px-2 py-0.5 text-xs text-gray-400 flex items-center gap-1.5 min-w-0 overflow-hidden">
                                  <svg className="w-2.5 h-2.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                  </svg>
                                  <span className="truncate">{item.domain}</span>
                                </div>
                              </div>
                            </div>
                            <Image src={item.image} alt={`${item.name} website screenshot`} width={500} height={313} className="w-full h-auto" style={{ height: "auto" }} />
                          </div>
                          <div className="absolute -top-2 right-2 bg-gradient-to-r from-[#072AC8] to-[#0095FF] text-white px-3 py-1 rounded-full font-bold text-xs shadow-lg">
                            Live Website
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col">
                          <h3 className="text-xl font-black text-[#072AC8] mb-2">{item.name}</h3>
                          <p className="text-[#4b5b8a] text-sm leading-relaxed mb-4">{item.description}</p>
                          <div className="flex flex-wrap gap-2 mb-5">
                            {item.tags.map((tag, tagIndex) => (
                              <span key={tagIndex} className="bg-[#0095FF]/10 text-[#072AC8] px-3 py-1.5 rounded-full text-xs font-semibold">{tag}</span>
                            ))}
                          </div>
                          <div className="flex flex-col gap-3">
                            <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#072AC8] to-[#0095FF] text-white font-bold px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all text-sm">
                              Bekijk live website
                              <ExternalLink className="w-4 h-4" />
                            </a>
                            <Button onClick={openPopup} variant="outline" className="border-2 border-[#072AC8]/20 text-[#072AC8] font-bold px-5 py-2.5 rounded-xl hover:bg-[#072AC8] hover:text-white transition-all text-sm w-full">
                              Dit wil ik ook
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-[#072AC8] hover:bg-[#072AC8] hover:text-white transition-all z-10"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-[#072AC8] hover:bg-[#072AC8] hover:text-white transition-all z-10"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {portfolioItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${currentSlide === index
                      ? 'bg-[#072AC8] w-6'
                      : 'bg-[#072AC8]/30 hover:bg-[#072AC8]/50'
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <p className="text-center text-xs text-[#4b5b8a] mt-2">Swipe of klik voor meer voorbeelden</p>
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
