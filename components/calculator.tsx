"use client"

import { useState, useMemo } from "react"
import { usePopup } from "@/contexts/popup-context"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft, Calculator as CalcIcon } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const WEBSITE_SETUP_COST = 1997
const MAX_SCORE = 35

interface ScenarioType {
  name: string
  minLift: number
  maxLift: number
  text: string
}

function parseNumber(value: string): number {
  if (!value) return 0
  let str = value.trim().replace(/\s/g, "")

  if (str.includes(",") && str.includes(".")) {
    if (str.lastIndexOf(",") > str.lastIndexOf(".")) {
      str = str.replace(/\./g, "").replace(",", ".")
    } else {
      str = str.replace(/,/g, "")
    }
  } else if (str.includes(",")) {
    str = str.replace(",", ".")
  }

  str = str.replace(/[^\d.-]/g, "")
  const num = Number(str)
  return isNaN(num) ? 0 : num
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Math.max(0, value))
}

function formatRange(minValue: number, maxValue: number): string {
  return `${formatCurrency(minValue)} – ${formatCurrency(maxValue)}`
}

function formatMonths(value: number): string | null {
  if (!isFinite(value) || value <= 0) return null
  if (value < 1) return "minder dan 1 maand"
  return value.toFixed(1).replace(".", ",") + " maanden"
}

function getScenario(score: number): ScenarioType {
  if (score <= 4) {
    return {
      name: "Zeer lage potentie",
      minLift: 0.0,
      maxLift: 0.03,
      text: "Zonder extra bereik, herhaalboekingen of direct boekingsvoordeel zal een eigen website meestal nog maar beperkte extra directe boekingen opleveren.",
    }
  }
  if (score <= 14) {
    return {
      name: "Basis potentie",
      minLift: 0.03,
      maxLift: 0.1,
      text: "Er is al duidelijke kans op een eerste stroom extra directe boekingen naast je platformboekingen, vooral als je een paar groeikansen actief benut.",
    }
  }
  if (score <= 26) {
    return {
      name: "Sterke potentie",
      minLift: 0.1,
      maxLift: 0.22,
      text: "Jouw situatie biedt een sterke basis om in jaar 1 merkbaar extra directe boekingen te genereren via je eigen website.",
    }
  }
  return {
    name: "Hoge potentie",
    minLift: 0.22,
    maxLift: 0.4,
    text: "Jouw vakantiehuis heeft serieuze potentie om een sterk extra direct boekingskanaal op te bouwen naast de platformen.",
  }
}

const selectOptions = {
  yesNo: [
    { value: "0", label: "Nee" },
    { value: "2", label: "Misschien / Een beetje" },
    { value: "4", label: "Ja, zeker" },
  ],
  google: [
    { value: "0", label: "Nee" },
    { value: "2", label: "Waarschijnlijk wel" },
    { value: "4", label: "Ja, zeker" },
  ],
  social: [
    { value: "0", label: "Nee" },
    { value: "2", label: "Af en toe" },
    { value: "4", label: "Ja, regelmatig" },
  ],
  photos: [
    { value: "0", label: "Nog niet" },
    { value: "2", label: "Redelijk" },
    { value: "4", label: "Ja, zeker" },
  ],
  location: [
    { value: "0", label: "Niet echt" },
    { value: "2", label: "Redelijk" },
    { value: "4", label: "Ja, zeker" },
  ],
  content: [
    { value: "0", label: "Nee, waarschijnlijk niet" },
    { value: "1", label: "Af en toe, een paar pagina's" },
    { value: "3", label: "Ja, regelmatig" },
  ],
}

export function Calculator() {
  const { openPopup } = usePopup()
  const headerAnimation = useScrollAnimation<HTMLDivElement>()
  const cardAnimation = useScrollAnimation<HTMLDivElement>()
  const [currentStep, setCurrentStep] = useState(1)
  const [validationError, setValidationError] = useState("")

  // Step 1 inputs
  const [platformBookings, setPlatformBookings] = useState("")
  const [bookingValue, setBookingValue] = useState("")
  const [platformFee, setPlatformFee] = useState("15")

  // Step 2 inputs
  const [oldGuests, setOldGuests] = useState("0")
  const [repeatPush, setRepeatPush] = useState("0")
  const [directBenefit, setDirectBenefit] = useState("0")
  const [googleProfile, setGoogleProfile] = useState("0")
  const [social, setSocial] = useState("0")

  // Step 3 inputs
  const [photos, setPhotos] = useState("0")
  const [location, setLocation] = useState("0")
  const [branding, setBranding] = useState("0")
  const [content, setContent] = useState("0")

  const score = useMemo(() => {
    return (
      Number(oldGuests) +
      Number(repeatPush) +
      Number(directBenefit) +
      Number(googleProfile) +
      Number(social) +
      Number(photos) +
      Number(location) +
      Number(branding) +
      Number(content)
    )
  }, [oldGuests, repeatPush, directBenefit, googleProfile, social, photos, location, branding, content])

  const results = useMemo(() => {
    const monthlyPlatformBookings = parseNumber(platformBookings)
    const avgBookingValue = parseNumber(bookingValue)
    const platformFeeRate = parseNumber(platformFee) / 100

    const annualPlatformBookings = monthlyPlatformBookings * 12
    const monthlyPlatformRevenue = monthlyPlatformBookings * avgBookingValue
    const annualPlatformRevenue = annualPlatformBookings * avgBookingValue

    const monthlyFees = monthlyPlatformRevenue * Math.max(0, platformFeeRate)
    const annualFees = annualPlatformRevenue * Math.max(0, platformFeeRate)

    const scenario = getScenario(score)

    let extraBookingsMin = 0
    let extraBookingsMax = 0

    if (annualPlatformBookings > 0) {
      extraBookingsMin = Math.max(0, Math.floor(annualPlatformBookings * scenario.minLift))
      extraBookingsMax = Math.max(extraBookingsMin, Math.ceil(annualPlatformBookings * scenario.maxLift))
    }

    const extraRevenueMin = extraBookingsMin * avgBookingValue
    const extraRevenueMax = extraBookingsMax * avgBookingValue

    const avoidedFeesMin = extraRevenueMin * Math.max(0, platformFeeRate)
    const avoidedFeesMax = extraRevenueMax * Math.max(0, platformFeeRate)

    let bookingsNeededText = "Vul eerst je boekingswaarde in"
    let breakEvenText = "Vul eerst je gegevens in"

    if (avgBookingValue > 0) {
      const bookingsNeeded = Math.ceil(WEBSITE_SETUP_COST / avgBookingValue)
      bookingsNeededText = String(bookingsNeeded)

      if (extraBookingsMax <= 0) {
        breakEvenText = "Nog niet overtuigend op basis van deze invoer"
      } else if (extraBookingsMin <= 0 && extraBookingsMax > 0) {
        const monthsFast = bookingsNeeded / (extraBookingsMax / 12)
        const fastText = formatMonths(monthsFast)
        breakEvenText = fastText ? `vanaf ${fastText} (als je deze kansen actief inzet)` : "Afhankelijk van je inzet"
      } else {
        const monthsFast = bookingsNeeded / (extraBookingsMax / 12)
        const monthsSlow = bookingsNeeded / (extraBookingsMin / 12)
        const fastText = formatMonths(monthsFast)
        const slowText = formatMonths(monthsSlow)
        if (fastText && slowText) {
          breakEvenText = `${fastText} tot ${slowText}`
        } else {
          breakEvenText = "Afhankelijk van je inzet"
        }
      }
    }

    const liftMinPct = Math.round(scenario.minLift * 100)
    const liftMaxPct = Math.round(scenario.maxLift * 100)

    return {
      score,
      scenario,
      monthlyFees,
      annualFees,
      extraBookingsMin,
      extraBookingsMax,
      extraRevenueMin,
      extraRevenueMax,
      avoidedFeesMin,
      avoidedFeesMax,
      bookingsNeededText,
      breakEvenText,
      liftMinPct,
      liftMaxPct,
      monthlyPlatformBookings,
      avgBookingValue,
    }
  }, [platformBookings, bookingValue, platformFee, score])

  const validateStep = (step: number): boolean => {
    if (step !== 1) return true

    const monthlyPlatformBookings = parseNumber(platformBookings)
    const avgBookingValue = parseNumber(bookingValue)
    const fee = parseNumber(platformFee)

    if (monthlyPlatformBookings <= 0) {
      setValidationError("Vul eerst je gemiddelde aantal platformboekingen per maand in.")
      return false
    }

    if (avgBookingValue <= 0) {
      setValidationError("Vul eerst je gemiddelde boekingswaarde in.")
      return false
    }

    if (fee < 0) {
      setValidationError("Vul een geldig percentage voor platformkosten in.")
      return false
    }

    setValidationError("")
    return true
  }

  const goToStep = (step: number) => {
    if (step > currentStep && !validateStep(currentStep)) return
    setCurrentStep(Math.max(1, Math.min(4, step)))
    setValidationError("")
  }

  const getCtaContent = () => {
    const { monthlyPlatformBookings, avgBookingValue, extraBookingsMax } = results

    if (monthlyPlatformBookings <= 0 || avgBookingValue <= 0) {
      return {
        kicker: "GRATIS INZICHT",
        title: "Vul je gegevens in en ontdek je directe boekingspotentie",
        text: "Na je berekening kun je direct een gratis voorbeeldwebsite aanvragen om te zien hoe jouw accommodatie sterker gepresenteerd kan worden.",
        button: "Bekijk mijn gratis voorbeeldwebsite",
      }
    }
    if (score <= 4) {
      return {
        kicker: "EERSTE STAP",
        title: "Er is nog veel winst te halen met een sterker direct boekingskanaal",
        text: "Jouw score laat zien dat er nu nog weinig groeifactoren actief zijn. Juist daarom kan een gratis voorbeeldwebsite helpen om te zien hoe je een betere basis opbouwt voor directe boekingen.",
        button: "Bekijk een gratis voorbeeldwebsite",
      }
    }
    if (score <= 14) {
      return {
        kicker: "MOOIE KANS",
        title: "Jouw accommodatie heeft al duidelijke directe boekingspotentie",
        text: `Je hebt al een aantal sterke aanknopingspunten. Met een gratis voorbeeldwebsite zie je hoe je die kansen kunt omzetten in meer directe boekingen.${extraBookingsMax >= 8 ? " Op basis van je huidige invoer lijkt er serieuze ruimte te zijn voor extra directe boekingen in jaar 1." : ""}`,
        button: "Vraag mijn gratis voorbeeldwebsite aan",
      }
    }
    if (score <= 26) {
      return {
        kicker: "STERKE MATCH",
        title: "Jouw situatie lijkt interessant voor een eigen Boekingssysteem Website",
        text: `Op basis van je score en berekening is er serieuze potentie om extra directe boekingen toe te voegen.${extraBookingsMax >= 8 ? " Op basis van je huidige invoer lijkt er serieuze ruimte te zijn voor extra directe boekingen in jaar 1." : ""}`,
        button: "Laat mijn gratis voorbeeldwebsite maken",
      }
    }
    return {
      kicker: "HOGE POTENTIE",
      title: "Jouw vakantiehuis lijkt sterke directe boekingspotentie te hebben",
      text: `Jouw score wijst op een sterke basis voor extra directe boekingen.${extraBookingsMax >= 8 ? " Op basis van je huidige invoer lijkt er serieuze ruimte te zijn voor extra directe boekingen in jaar 1." : ""}`,
      button: "Claim mijn gratis voorbeeldwebsite",
    }
  }

  const ctaContent = getCtaContent()

  return (
    <section id="calculator" className="py-20 md:py-28 bg-white scroll-mt-20 overflow-x-hidden">
      <div className="container mx-auto px-4 max-w-full">
        <div className="max-w-4xl mx-auto">
          {/* Card */}
          <div
            ref={cardAnimation.ref}
            className="bg-gradient-to-b from-[#01BCFF]/5 to-white rounded-3xl border border-[#072AC8]/10 shadow-2xl overflow-hidden transition-all duration-700 ease-out"
            style={{
              opacity: cardAnimation.isVisible ? 1 : 0,
              transform: cardAnimation.isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.98)'
            }}
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-[#072AC8]/10">
              <p className="text-[#072AC8] font-bold text-xs tracking-wider uppercase mb-2">
                TRIVITURBO POTENTIE-CALCULATOR
              </p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#072AC8] leading-tight mb-3">
                Zie hoeveel extra directe boekingen jouw vakantiehuis kan opleveren
              </h2>
              <p className="text-[#4b5b8a] leading-relaxed">
                Deze calculator laat zien hoeveel <strong>extra directe boekingen</strong> je mogelijk kunt genereren
                met een eigen <strong>Boekingssysteem Website</strong> — bovenop je huidige platformboekingen.
              </p>
            </div>

            {/* Progress */}
            <div className="p-6 md:p-8 bg-white/90 border-b border-[#072AC8]/10">
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm font-bold text-[#4b5b8a]">Voortgang</p>
                <p className="text-sm font-bold text-[#4b5b8a]">{currentStep} van 4</p>
              </div>
              <div className="w-full h-2.5 bg-[#072AC8]/8 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-gradient-to-r from-[#01BCFF] via-[#0095FF] to-[#072AC8] rounded-full transition-all duration-500"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {["Situatie", "Bereik", "Zichtbaarheid", "Resultaten"].map((label, idx) => (
                  <div
                    key={label}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${idx + 1 === currentStep
                      ? "bg-[#0095FF]/10 border border-[#0095FF]/20"
                      : idx + 1 < currentStep
                        ? "bg-[#0095FF]/10 border border-[#0095FF]/20"
                        : "bg-[#072AC8]/4"
                      }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${idx + 1 <= currentStep
                        ? "bg-gradient-to-br from-[#072AC8] to-[#0095FF] text-white"
                        : "bg-[#072AC8]/8 text-[#072AC8]"
                        }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="hidden sm:inline text-[#072AC8]">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Validation Message */}
            {validationError && (
              <div className="mx-6 md:mx-8 mt-6 p-4 bg-[#FCF300]/20 border border-[#FCF300]/50 rounded-xl text-[#072AC8] text-sm">
                {validationError}
              </div>
            )}

            {/* Steps */}
            <div className="p-6 md:p-8">
              {/* Step 1 */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="bg-white border border-[#072AC8]/10 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-[#072AC8] mb-2">1. Jouw huidige situatie</h3>
                    <p className="text-sm text-[#4b5b8a] mb-6">
                      Vul hier je huidige platformboekingen in. Dat gebruiken we als basis om je potentie te berekenen.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-[#072AC8] mb-2">
                          Gemiddeld aantal platformboekingen per maand
                        </label>
                        <input
                          type="text"
                          inputMode="decimal"
                          placeholder="Bijv. 8"
                          value={platformBookings}
                          onChange={(e) => setPlatformBookings(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-[#072AC8]/12 bg-white text-[#072AC8] placeholder:text-[#8ba0d7] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 focus:border-[#0095FF] transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-[#072AC8] mb-2">
                          {"Gemiddelde boekingswaarde (€)"}
                        </label>
                        <input
                          type="text"
                          inputMode="decimal"
                          placeholder="Bijv. 850"
                          value={bookingValue}
                          onChange={(e) => setBookingValue(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-[#072AC8]/12 bg-white text-[#072AC8] placeholder:text-[#8ba0d7] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 focus:border-[#0095FF] transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-[#072AC8] mb-2">
                          Gemiddelde platformkosten (%)
                        </label>
                        <input
                          type="text"
                          inputMode="decimal"
                          placeholder="Bijv. 15"
                          value={platformFee}
                          onChange={(e) => setPlatformFee(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-[#072AC8]/12 bg-white text-[#072AC8] placeholder:text-[#8ba0d7] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 focus:border-[#0095FF] transition-all"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      onClick={() => goToStep(2)}
                      className="bg-gradient-to-r from-[#072AC8] to-[#0095FF] text-white font-bold px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                    >
                      Volgende stap
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="bg-white border border-[#072AC8]/10 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-[#072AC8] mb-2">
                      2. Wat kun je activeren via bereik en herhaalboekingen?
                    </h3>
                    <p className="text-sm text-[#4b5b8a] mb-6">
                      Dit gaat niet om wat je nu al doet, maar om wat je <strong>kunt of wilt gaan inzetten</strong>{" "}
                      zodra je een eigen website hebt.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-[#072AC8] mb-2">
                          Kun je oude gasten opnieuw benaderen via e-mail of WhatsApp?
                        </label>
                        <select
                          value={oldGuests}
                          onChange={(e) => setOldGuests(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-[#072AC8]/12 bg-white text-[#072AC8] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 focus:border-[#0095FF] transition-all"
                        >
                          {selectOptions.yesNo.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-[#072AC8] mb-2">
                          Kun je gasten stimuleren om de volgende keer direct bij jou te boeken?
                        </label>
                        <select
                          value={repeatPush}
                          onChange={(e) => setRepeatPush(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-[#072AC8]/12 bg-white text-[#072AC8] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 focus:border-[#0095FF] transition-all"
                        >
                          {selectOptions.yesNo.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-[#072AC8] mb-2">
                          Zou je een voordeel geven bij direct boeken?
                        </label>
                        <select
                          value={directBenefit}
                          onChange={(e) => setDirectBenefit(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-[#072AC8]/12 bg-white text-[#072AC8] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 focus:border-[#0095FF] transition-all"
                        >
                          {selectOptions.yesNo.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-[#072AC8] mb-2">
                          Kun je een Google Bedrijfsprofiel aanmaken of verbeteren?
                        </label>
                        <select
                          value={googleProfile}
                          onChange={(e) => setGoogleProfile(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-[#072AC8]/12 bg-white text-[#072AC8] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 focus:border-[#0095FF] transition-all"
                        >
                          {selectOptions.google.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-[#072AC8] mb-2">
                          Kun je je accommodatie af en toe delen op social media?
                        </label>
                        <select
                          value={social}
                          onChange={(e) => setSocial(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-[#072AC8]/12 bg-white text-[#072AC8] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 focus:border-[#0095FF] transition-all"
                        >
                          {selectOptions.social.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Button
                      onClick={() => goToStep(1)}
                      variant="outline"
                      className="border-[#072AC8]/12 text-[#072AC8] font-bold px-6 py-3 rounded-2xl"
                    >
                      <ChevronLeft className="w-5 h-5 mr-2" />
                      Vorige stap
                    </Button>
                    <Button
                      onClick={() => goToStep(3)}
                      className="bg-gradient-to-r from-[#072AC8] to-[#0095FF] text-white font-bold px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                    >
                      Volgende stap
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="bg-white border border-[#072AC8]/10 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-[#072AC8] mb-2">
                      3. Wat kun je activeren via zichtbaarheid en presentatie?
                    </h3>
                    <p className="text-sm text-[#4b5b8a] mb-6">
                      Deze factoren vergroten de kans dat jouw website extra directe boekingen gaat opleveren.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-[#072AC8] mb-2">
                          {"Heb je sterke foto's of kun je die laten maken?"}
                        </label>
                        <select
                          value={photos}
                          onChange={(e) => setPhotos(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-[#072AC8]/12 bg-white text-[#072AC8] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 focus:border-[#0095FF] transition-all"
                        >
                          {selectOptions.photos.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-[#072AC8] mb-2">
                          Ligt je accommodatie in een regio met duidelijke toeristische vraag?
                        </label>
                        <select
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-[#072AC8]/12 bg-white text-[#072AC8] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 focus:border-[#0095FF] transition-all"
                        >
                          {selectOptions.location.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-[#072AC8] mb-2">
                          Kun je jouw accommodatie als eigen merk presenteren?
                        </label>
                        <select
                          value={branding}
                          onChange={(e) => setBranding(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-[#072AC8]/12 bg-white text-[#072AC8] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 focus:border-[#0095FF] transition-all"
                        >
                          {selectOptions.location.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-[#072AC8] mb-2">
                          Kun je op je website regelmatig nuttige informatie delen?
                        </label>
                        <select
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-[#072AC8]/12 bg-white text-[#072AC8] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 focus:border-[#0095FF] transition-all"
                        >
                          {selectOptions.content.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Button
                      onClick={() => goToStep(2)}
                      variant="outline"
                      className="border-[#072AC8]/12 text-[#072AC8] font-bold px-6 py-3 rounded-2xl"
                    >
                      <ChevronLeft className="w-5 h-5 mr-2" />
                      Vorige stap
                    </Button>
                    <Button
                      onClick={() => goToStep(4)}
                      className="bg-gradient-to-r from-[#072AC8] to-[#0095FF] text-white font-bold px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                    >
                      <CalcIcon className="w-5 h-5 mr-2" />
                      Bekijk resultaten
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4 - Results */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  {/* Score Card */}
                  <div className="bg-gradient-to-br from-[#072AC8]/6 to-[#01BCFF]/6 rounded-2xl border border-[#072AC8]/10 p-6">
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-sm font-bold text-[#4b5b8a]">Jouw directe boekingspotentie</p>
                      <p className="text-sm font-bold text-[#072AC8]">{results.score}/{MAX_SCORE}</p>
                    </div>
                    <div className="w-full h-3 bg-[#072AC8]/8 rounded-full overflow-hidden mb-4">
                      <div
                        className="h-full bg-gradient-to-r from-[#01BCFF] via-[#0095FF] to-[#072AC8] rounded-full transition-all duration-700"
                        style={{ width: `${Math.min(100, (results.score / MAX_SCORE) * 100)}%` }}
                      />
                    </div>
                    <p className="text-lg font-black text-[#072AC8] mb-2">{results.scenario.name}</p>
                    <p className="text-sm text-[#4b5b8a] leading-relaxed">{results.scenario.text}</p>
                  </div>

                  {/* Results Grid */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <ResultBox title="Jouw platformkosten per maand" value={formatCurrency(results.monthlyFees)} />
                    <ResultBox title="Jouw platformkosten per jaar" value={formatCurrency(results.annualFees)} />
                    <ResultBox
                      title="Mogelijke extra directe boekingen per jaar"
                      value={`${results.extraBookingsMin} – ${results.extraBookingsMax}`}
                    />
                    <ResultBox
                      title="Potentiële extra directe omzet per jaar"
                      value={formatRange(results.extraRevenueMin, results.extraRevenueMax)}
                    />
                    <ResultBox
                      title="Platformkosten die je op die directe boekingen niet afdraagt"
                      value={formatRange(results.avoidedFeesMin, results.avoidedFeesMax)}
                    />
                    <ResultBox
                      title="Extra directe boekingen nodig om je opstartkosten terug te verdienen"
                      value={results.bookingsNeededText}
                    />
                    <ResultBox
                      title="Indicatieve terugverdientijd van je opstartkosten"
                      value={results.breakEvenText}
                      highlight
                    />
                    <ResultBox
                      title="Bandbreedte waarop deze inschatting is gebaseerd"
                      value={`${results.liftMinPct}% – ${results.liftMaxPct}%`}
                    />
                  </div>

                  {/* Method Card */}
                  <div className="bg-gradient-to-br from-[#072AC8]/4 to-[#01BCFF]/4 rounded-2xl border border-[#072AC8]/10 p-5">
                    <p className="font-bold text-[#072AC8] mb-2">Waar zijn deze cijfers op gebaseerd?</p>
                    <p className="text-sm text-[#4b5b8a] leading-relaxed">
                      Deze inschatting gebruikt je huidige platformboekingen als indicatie van bestaande vraag. Op
                      basis van jouw score van {results.score} uit 35 plaatsen we jouw situatie in het scenario &quot;
                      {results.scenario.name}&quot;. Daarbij rekenen we met een conservatieve bandbreedte van{" "}
                      {results.liftMinPct}% tot {results.liftMaxPct}% extra directe boekingen per jaar bovenop je
                      huidige platformboekingen.
                    </p>
                  </div>

                  {/* CTA Card */}
                  <div className="bg-gradient-to-br from-[#FCF300]/20 to-[#01BCFF]/10 rounded-2xl border border-[#072AC8]/14 p-6">
                    <p className="text-xs font-bold tracking-wider uppercase text-[#072AC8] mb-2">
                      {ctaContent.kicker}
                    </p>
                    <h3 className="text-xl md:text-2xl font-black text-[#072AC8] mb-3">{ctaContent.title}</h3>
                    <p className="text-[#072AC8]/80 mb-5">{ctaContent.text}</p>
                    <Button
                      onClick={openPopup}
                      data-popup-target="gratis-voorbeeldwebsite-formulier"
                      className="bg-gradient-to-r from-[#072AC8] to-[#0095FF] text-white font-bold px-4 sm:px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all text-sm sm:text-base w-full sm:w-auto"
                    >
                      <span className="whitespace-normal sm:whitespace-nowrap">{ctaContent.button}</span>
                    </Button>
                  </div>

                  {/* Note */}
                  <div className="bg-[#0095FF]/6 border border-[#072AC8]/10 rounded-2xl p-5 text-sm text-[#4b5b8a] leading-relaxed">
                    <strong>Belangrijk:</strong> deze calculator rekent met{" "}
                    <strong>extra directe boekingen bovenop je huidige platformboekingen</strong>. Dus niet met een
                    verschuiving van platformen naar je website, maar met extra omzetkansen via je eigen kanaal. De
                    berekening gebruikt jouw ingevulde gemiddelde platform-fee-percentage en vaste websitekosten van{" "}
                    <strong>{"1.997"}</strong>.
                  </div>

                  <div className="flex justify-start">
                    <Button
                      onClick={() => goToStep(3)}
                      variant="outline"
                      className="border-[#072AC8]/12 text-[#072AC8] font-bold px-6 py-3 rounded-2xl"
                    >
                      <ChevronLeft className="w-5 h-5 mr-2" />
                      Vorige stap
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ResultBox({
  title,
  value,
  highlight = false,
}: {
  title: string
  value: string
  highlight?: boolean
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${highlight
        ? "bg-gradient-to-br from-[#FCF300]/20 to-white border-[#FCF300]/45"
        : "bg-[#f5faff] border-[#072AC8]/10"
        }`}
    >
      <p className="text-sm font-bold text-[#4b5b8a] mb-2">{title}</p>
      <p className="text-2xl md:text-3xl font-black text-[#072AC8] leading-tight break-words">{value}</p>
    </div>
  )
}
