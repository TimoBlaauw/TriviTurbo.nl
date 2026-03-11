"use client"

import { usePopup } from "@/contexts/popup-context"
import { Button } from "@/components/ui/button"
import { Check, Shield, Zap } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const included = [
  "Complete website met volledig boekingssysteem",
  "Boekingskalender met realtime beschikbaarheid",
  "Veilige online betalingen (Stripe)",
  "Automatische bevestigingsmails & gastbeheer",
  "Basis SEO voor betere vindbaarheid",
  "Google Business profiel optimalisatie",
  "Conversie-geoptimaliseerd design (mobile-first)",
  "Vertrouwenselementen zoals reviews en badges",
  "Exit-popups om bezoekers vast te houden",
  "Gratis persoonlijke voorbeeldwebsite vooraf",
  "Hosting & maandelijkse updates",
  "Maandelijkse rapportage (verkeer, aanvragen, boekingen)",
  "We blijven eraan werken tot jij tevreden bent",
  "90-dagen garantie op resultaat",
  "Laagdrempelig aanvraagformulier voor twijfelaars",
  "Conversiegerichte copywriting"
]

export function Pricing() {
  const { openPopup } = usePopup()
  const headerAnimation = useScrollAnimation<HTMLDivElement>()
  const cardAnimation = useScrollAnimation<HTMLDivElement>()

  return (
    <section id="prijzen" className="py-20 md:py-28 bg-gradient-to-b from-white to-[#f0f6ff] scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
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
              INVESTERING
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#072AC8] leading-tight mb-6 text-balance">
              Klaar om te stoppen met geld verliezen aan platformkosten?
            </h2>
            <p className="text-lg text-[#4b5b8a] leading-relaxed max-w-2xl mx-auto">
              Elke dag dat je wacht, kost je potentiële directe boekingen én betaal je opnieuw platformkosten.
            </p>
          </div>

          {/* Pricing Card */}
          <div
            ref={cardAnimation.ref}
            className="bg-white rounded-3xl shadow-2xl border border-[#072AC8]/10 overflow-hidden transition-all duration-700 ease-out"
            style={{
              opacity: cardAnimation.isVisible ? 1 : 0,
              transform: cardAnimation.isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.98)'
            }}
          >
            <div className="bg-gradient-to-r from-[#072AC8] to-[#0095FF] p-8 md:p-10 text-center">
              <p className="text-white/80 font-semibold mb-2">Het Directe Boekingskanaal-systeem</p>
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-5xl md:text-6xl font-black text-white">{"1.997"}</span>
              </div>
              <p className="text-white/70 text-sm">Eenmalige investering</p>
            </div>

            <div className="p-8 md:p-10">
              {/* What's included */}
              <h3 className="text-xl font-bold text-[#072AC8] mb-6">Wat je krijgt:</h3>
              <ul className="grid md:grid-cols-2 gap-x-6 gap-y-4 mb-8">
                {included.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 transition-all duration-500"
                    style={{
                      opacity: cardAnimation.isVisible ? 1 : 0,
                      transform: cardAnimation.isVisible ? 'translateX(0)' : 'translateX(-20px)',
                      transitionDelay: `${300 + index * 50}ms`
                    }}
                  >
                    <div className="w-6 h-6 bg-[#01BCFF]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-[#0095FF]" />
                    </div>
                    <span className="text-[#072AC8] font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Guarantee Box */}
              <div className="bg-gradient-to-br from-[#FCF300]/20 to-[#FCF300]/5 rounded-2xl p-6 border border-[#FCF300]/30 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#FCF300] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-[#072AC8]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#072AC8] text-lg mb-2">90-dagen resultaatgarantie</h4>
                    <p className="text-[#4b5b8a] leading-relaxed">
                      Krijg je binnen 90 dagen geen 3 directe boekingen? Dan krijg je je volledige {"1.997"} terug.
                      Geen vragen, geen gedoe.
                    </p>
                  </div>
                </div>
              </div>

              {/* Comparison */}
              <div className="bg-[#f0f6ff] rounded-2xl p-6 mb-8">
                <h4 className="font-bold text-[#072AC8] mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#0095FF]" />
                  Wat kost dit vergeleken met platformkosten?
                </h4>
                <p className="text-[#4b5b8a] leading-relaxed">
                  De meeste verhuurders verliezen al meer dan {"1.997"} aan platformkosten bij slechts{" "}
                  <strong className="text-[#072AC8]">10 tot 15 boekingen</strong>. Met je eigen directe boekingskanaal
                  verdien je deze investering vaak al terug bij je eerste paar directe boekingen.
                </p>
              </div>

              {/* CTA */}
              <div className="text-center">
                <p className="text-[#4b5b8a] mb-4">
                  Bekijk eerst gratis jouw persoonlijke voorbeeldwebsite. Je betaalt pas als je overtuigd bent.
                </p>
                <Button
                  onClick={openPopup}
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-[#072AC8] to-[#0095FF] text-white font-bold text-base sm:text-lg px-12 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                >
                  BOUW MIJN GRATIS VOORBEELDWEBSITE NU
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
