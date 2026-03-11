"use client"

import { DollarSign, Building2, TrendingDown } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const problems = [
  {
    icon: DollarSign,
    title: "Je verliest geld op elke boeking",
    description:
      "Elke gast die via Airbnb boekt, kost je bij een boeking van €2.000 al snel €300 tot €400 aan kosten. Dat betekent dat er elk jaar €2.000 tot €5.000 uit jouw zak verdwijnt. Geld dat eigenlijk gewoon van jou hoort te zijn.",
    highlight: "€2.000 tot €5.000",
  },
  {
    icon: Building2,
    title: "Je bouwt aan het platform van Airbnb, niet aan je eigen merk",
    description:
      "Elke 5-sterren review maakt Airbnb sterker, niet jouw eigen merk. Elke terugkerende gast gaat eerst weer naar het platform, in plaats van rechtstreeks naar jou. Jij doet al het werk, maar de klant wordt vooral trouw aan iemand anders.",
    highlight: "Airbnb sterker",
  },
  {
    icon: TrendingDown,
    title: "Eén wijziging in het algoritme kan je inkomsten raken",
    description:
      "De rankings op platformen kunnen van de ene op de andere dag veranderen. Nieuwe concurrenten komen erbij. Een update in het algoritme kan jouw advertentie verder naar beneden drukken. Als 100% van je boekingen afhangt van platformen waar jij geen controle over hebt, dan ben je altijd afhankelijk van regels die zomaar kunnen veranderen.",
    highlight: "100% van je boekingen",
  },
]

export function Problems() {
  const headerAnimation = useScrollAnimation<HTMLDivElement>()
  const cardsAnimation = useScrollAnimation<HTMLDivElement>()

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-[#f0f6ff]">
      <div className="container mx-auto px-4">
        <div 
          ref={headerAnimation.ref}
          className="text-center mb-16 transition-all duration-700 ease-out"
          style={{
            opacity: headerAnimation.isVisible ? 1 : 0,
            transform: headerAnimation.isVisible ? 'translateY(0)' : 'translateY(30px)'
          }}
        >
          <p className="text-[#0095FF] font-bold text-sm tracking-wider uppercase mb-4">
            DE VERBORGEN KOSTEN
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#072AC8] max-w-4xl mx-auto text-balance leading-tight">
            Waarom slimme vakantiehuiseigenaren niet meer 100% afhankelijk willen
            zijn van platformen
          </h2>
        </div>

        <div 
          ref={cardsAnimation.ref}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {problems.map((problem, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg border border-[#072AC8]/8 hover:shadow-2xl hover:border-[#0095FF]/20 transition-all duration-500 hover:-translate-y-1 h-full flex flex-col"
              style={{
                opacity: cardsAnimation.isVisible ? 1 : 0,
                transform: cardsAnimation.isVisible ? 'translateY(0)' : 'translateY(40px)',
                transitionDelay: `${index * 150}ms`
              }}
            >
              {/* Problem Number */}
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br from-[#072AC8] to-[#0095FF] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-[#0095FF]/10 to-[#01BCFF]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform flex-shrink-0">
                <problem.icon className="w-8 h-8 text-[#0095FF]" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-[#072AC8] mb-4 leading-snug flex-shrink-0">
                {problem.title}
              </h3>
              <p className="text-[#4b5b8a] leading-relaxed flex-grow">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
