"use client"

import React from "react"
import { usePopup } from "@/contexts/popup-context"
import { Button } from "@/components/ui/button"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import {
  Monitor,
  Rocket,
  CalendarCheck,
  Check,
  Smartphone,
  Users,
  Clock,
  RefreshCcw,
  Zap,
  PiggyBank
} from "lucide-react"

const steps = [
  {
    number: "1",
    title: "Wij bouwen gratis jouw persoonlijke voorbeeldwebsite",
    description:
      "Je ziet precies hoe jouw directe boekingskanaal eruit komt te zien, op basis van jouw echte foto's en woninginformatie. Geen giswerk. Geen verrassingen. Je betaalt nog niets.",
    icon: Monitor,
  },
  {
    number: "2",
    title: "Zet je inkomstenkanaal snel live",
    description:
      "Na goedkeuring zetten wij jouw directe boekingssysteem snel voor je klaar. Geen maanden wachten. Geen eindeloze aanpassingsrondes.",
    icon: Rocket,
  },
  {
    number: "3",
    title: "Ontvang directe boekingen",
    description:
      "Je systeem gaat live met een professionele presentatie, een mobielvriendelijk ontwerp en formulieren die bezoekers omzetten in boekingen.",
    icon: CalendarCheck,
  },
]

const benefits = [
  {
    icon: Check,
    text: "Minimaal 3 directe boekingen in 90 dagen, anders krijg je je geld terug",
  },
  {
    icon: PiggyBank,
    text: "Jaarlijks €2.000–€5.000 besparen op platformkosten die je nu nog betaalt",
  },
  {
    icon: Users,
    text: "Zelf eigenaar zijn van de relatie met je gasten, in plaats van afhankelijk zijn van Airbnb",
  },
  {
    icon: Clock,
    text: "Een boekingskanaal dat 24/7 voor je werkt, zonder afhankelijk te zijn van algoritmes",
  },
  {
    icon: RefreshCcw,
    text: "Meer terugkerende gasten die rechtstreeks bij jou boeken",
  },
  {
    icon: Smartphone,
    text: "Een professioneel en mobielvriendelijk systeem dat bezoekers omzet in boekingen",
  },
]

const features = [
  {
    icon: Zap,
    title: "Systeem voor directe boekingen",
    description:
      "Een professionele presentatie van je woning, ingericht om boekingen te stimuleren — niet alleen om bekeken te worden.",
  },
  {
    icon: Smartphone,
    title: "Mobielvriendelijk ontwerp",
    description:
      "Perfect zichtbaar op elk apparaat, juist omdat veel boekingen via mobiel beginnen.",
  },
  {
    icon: Users,
    title: "Zelf eigenaar van je gastrelaties",
    description:
      "Bouw je eigen database op, in plaats van het platform sterker te maken.",
  },
  {
    icon: Clock,
    title: "24/7 boekingskanaal",
    description:
      "Ontvang boekingsaanvragen terwijl jij slaapt, zonder steeds commissie te betalen aan platformen.",
  },
]

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

export function Solution() {
  const { openPopup } = usePopup()
  const headerAnimation = useScrollAnimation<HTMLDivElement>()
  const stepsAnimation = useScrollAnimation<HTMLDivElement>()
  const benefitsAnimation = useScrollAnimation<HTMLDivElement>()
  const featuresAnimation = useScrollAnimation<HTMLDivElement>()

  return (
    <section
      id="hoe-het-werkt"
      className="py-20 md:py-28 bg-gradient-to-b from-[#f0f6ff] to-[#f0f6ff] overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Intro */}
        <div
          ref={headerAnimation.ref}
          className="text-center mb-16 max-w-4xl mx-auto transition-all duration-700 ease-out"
          style={{
            opacity: headerAnimation.isVisible ? 1 : 0,
            transform: headerAnimation.isVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <p className="text-[#0095FF] font-bold text-sm tracking-wider uppercase mb-4">
            DE OPLOSSING
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#072AC8] leading-tight mb-6 text-balance">
            Het Directe Boekingskanaal-systeem
          </h2>
          <p className="text-lg text-[#4b5b8a] leading-relaxed">
            Slimme vakantiehuiseigenaren proberen Airbnb niet volledig te vervangen. Zij bouwen een{" "}
            <strong className="text-[#072AC8]">tweede inkomstenkanaal</strong> waar ze zelf controle over
            hebben. Het Directe Boekingskanaal-systeem zorgt voor een eigen stroom aan serieuze aanvragen,
            ook als jij niet actief bezig bent.
          </p>
        </div>

        {/* How it works - Steps */}
        <div className="mb-20">
          <AnimatedSection className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-black text-[#072AC8]">
              Hoe het Directe Boekingskanaal-systeem werkt
            </h3>
          </AnimatedSection>

          <div ref={stepsAnimation.ref} className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative transition-all duration-700 ease-out"
                style={{
                  opacity: stepsAnimation.isVisible ? 1 : 0,
                  transform: stepsAnimation.isVisible ? "translateY(0)" : "translateY(40px)",
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[calc(50%+60px)] w-[calc(100%-80px)] h-0.5 bg-gradient-to-r from-[#0095FF] to-[#01BCFF]" />
                )}

                <div className="bg-white rounded-3xl p-8 shadow-xl border border-[#072AC8]/8 hover:shadow-2xl transition-all duration-300 relative h-full flex flex-col">
                  {/* Number + icon naast elkaar */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#072AC8] to-[#0095FF] rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg flex-shrink-0">
                      {step.number}
                    </div>
                    <div className="w-12 h-12 bg-[#01BCFF]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-6 h-6 text-[#0095FF]" />
                    </div>
                  </div>

                  <h4 className="text-xl font-bold text-[#072AC8] mb-3 leading-snug flex-shrink-0 min-h-[3.5rem]">
                    {step.title}
                  </h4>
                  <p className="text-[#4b5b8a] leading-relaxed flex-grow">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div
          ref={benefitsAnimation.ref}
          className="bg-gradient-to-br from-[#072AC8] to-[#0095FF] rounded-3xl p-8 md:p-12 mb-20 shadow-2xl transition-all duration-700 ease-out"
          style={{
            opacity: benefitsAnimation.isVisible ? 1 : 0,
            transform: benefitsAnimation.isVisible
              ? "translateY(0) scale(1)"
              : "translateY(30px) scale(0.98)",
          }}
        >
          <h3 className="text-2xl md:text-3xl font-black text-white text-center mb-10">
            Wat het Directe Boekingskanaal-systeem je oplevert
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10 transition-all duration-500"
                style={{
                  opacity: benefitsAnimation.isVisible ? 1 : 0,
                  transform: benefitsAnimation.isVisible ? "translateX(0)" : "translateX(-20px)",
                  transitionDelay: `${300 + index * 100}ms`,
                }}
              >
                <div className="w-10 h-10 bg-[#FCF300] rounded-xl flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-5 h-5 text-[#072AC8]" />
                </div>
                <p className="text-white/95 font-medium leading-relaxed">{benefit.text}</p>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="mt-10 text-center">
            <blockquote className="text-white/90 text-lg italic mb-4 max-w-2xl mx-auto">
              {'"Onze eerste directe boeking bespaarde ons €280. De investering had zich meteen terugverdiend."'}
            </blockquote>
            <p className="text-[#FCF300] font-bold">— Thomas, eigenaar van een chalet in de Alpen</p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <AnimatedSection className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-black text-[#072AC8]">
              Exclusieve onderdelen die inbegrepen zijn
            </h3>
          </AnimatedSection>

          <div ref={featuresAnimation.ref} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-[#072AC8]/8 hover:shadow-xl hover:border-[#0095FF]/20 transition-all duration-500 h-full flex flex-col"
                style={{
                  opacity: featuresAnimation.isVisible ? 1 : 0,
                  transform: featuresAnimation.isVisible ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#0095FF]/10 to-[#01BCFF]/10 rounded-2xl flex items-center justify-center mb-4 flex-shrink-0">
                  <feature.icon className="w-7 h-7 text-[#0095FF]" />
                </div>
                <h4 className="text-lg font-bold text-[#072AC8] mb-2 flex-shrink-0">
                  {feature.title}
                </h4>
                <p className="text-[#4b5b8a] text-sm leading-relaxed flex-grow">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <AnimatedSection className="text-center px-4">
          <Button
            onClick={openPopup}
            size="lg"
            className="bg-[#FCF300] text-[#072AC8] hover:bg-[#FCF300]/90 font-bold text-sm sm:text-base md:text-lg px-6 sm:px-10 py-5 sm:py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 w-full sm:w-auto max-w-full"
          >
            <span className="whitespace-normal sm:whitespace-nowrap">Bouw mijn gratis voorbeeldwebsite</span>
          </Button>
        </AnimatedSection>
      </div>
    </section>
  )
}
