"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const faqs = [
  {
    question: "Hoe snel zie ik mijn voorbeeldwebsite?",
    answer:
      "Je persoonlijke voorbeeldwebsite ontvang je binnen 48 uur nadat je je woninginformatie hebt aangeleverd.",
  },
  {
    question: "Wat als ik de voorbeeldwebsite niet goed vind?",
    answer:
      "De voorbeeldwebsite is helemaal gratis. Je investeert alleen als je verder wilt.",
  },
  {
    question: "Vervangt dit mijn Airbnb-vermeldingen?",
    answer:
      "Nee. Dit is een aanvulling op je bestaande aanwezigheid op platformen. Je krijgt er een tweede boekingskanaal bij waar jij zelf controle over hebt.",
  },
  {
    question: "Geven jullie garantie op resultaat?",
    answer:
      "Ja. Krijg je binnen 90 dagen geen 3 directe boekingen? Dan krijg je je volledige €1.997 terug.",
  },
  {
    question: "Wat kost dit vergeleken met platformkosten?",
    answer:
      "De investering is €1.997. De meeste verhuurders verliezen al meer dan dat aan platformkosten bij slechts 10 tot 15 boekingen.",
  },
  {
    question: "Wat als ik niet technisch ben?",
    answer:
      "Geen probleem. Wij regelen alles. Jij levert foto's en informatie aan, wij bouwen en lanceren het systeem.",
  },
  {
    question: "Mijn beheerder (bijv. Landal) laat niet toe dat ik mijn eigen boekingssysteem beheer. Is een website dan wel interessant?",
    answer:
      "Ja. Dan bouwen we de website als professionele presentatie + slim doorklikkanaal naar het officiële boekingskanaal van je beheerder. Je bezoekers zien jouw huisje overzichtelijk, krijgen alle info en foto's op één plek, en klikken daarna door om via het officiële systeem te boeken — precies zoals we dat hebben gedaan bij Landal Bad Bentheim 309. Om het extra simpel te maken plaatsen we ook een korte uitlegvideo op de site waarin we laten zien hoe gasten jouw specifieke huisje boeken via het officiële kanaal.",
  },
]

export function FAQ() {
  const headerAnimation = useScrollAnimation<HTMLDivElement>()
  const accordionAnimation = useScrollAnimation<HTMLDivElement>()

  return (
    <section id="faq" className="py-20 md:py-28 bg-white scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div
            ref={headerAnimation.ref}
            className="text-center mb-12 transition-all duration-700 ease-out"
            style={{
              opacity: headerAnimation.isVisible ? 1 : 0,
              transform: headerAnimation.isVisible ? 'translateY(0)' : 'translateY(30px)'
            }}
          >
            <p className="text-[#0095FF] font-bold text-sm tracking-wider uppercase mb-4">
              VEELGESTELDE VRAGEN
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#072AC8] leading-tight text-balance">
              Heb je nog vragen?
            </h2>
          </div>

          {/* Accordion */}
          <div
            ref={accordionAnimation.ref}
            className="transition-all duration-700 ease-out"
            style={{
              opacity: accordionAnimation.isVisible ? 1 : 0,
              transform: accordionAnimation.isVisible ? 'translateY(0)' : 'translateY(30px)'
            }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-gradient-to-br from-[#f0f6ff] to-white rounded-2xl border border-[#072AC8]/10 px-6 shadow-sm hover:shadow-md transition-all duration-500"
                  style={{
                    opacity: accordionAnimation.isVisible ? 1 : 0,
                    transform: accordionAnimation.isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: `${100 + index * 75}ms`
                  }}
                >
                  <AccordionTrigger className="text-left text-[#072AC8] font-bold text-lg hover:no-underline py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#4b5b8a] leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
