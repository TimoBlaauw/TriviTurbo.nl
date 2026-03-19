"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft, Check, Loader2 } from "lucide-react"

const GHL_WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/5jh9KpAoe1eQ80Bfj9mP/webhook-trigger/5f751d49-82ea-4e4b-8a88-e5274eb193cf"
const WEB3FORMS_ACCESS_KEY = "275c0cb4-71c7-4211-851d-855bbc323a0b"

interface FormData {
  firstName: string
  email: string
  phone: string
  language: string

  accommodationName: string
  locationCity: string
  locationCountry: string
  platformLink: string
  keyFeatures: string
  colorPreference: string

  currentWebsite: string
  googleBusinessProfile: string
  extraPlatformLinks: string
  inspirationUrl: string
  style: string
  photosLink: string

  managesOwnBooking: string
  bookingPreference: string

  consent: boolean
}

const initialFormData: FormData = {
  firstName: "",
  email: "",
  phone: "",
  language: "NL",
  accommodationName: "",
  locationCity: "",
  locationCountry: "",
  platformLink: "",
  keyFeatures: "",
  colorPreference: "",
  currentWebsite: "",
  googleBusinessProfile: "",
  extraPlatformLinks: "",
  inspirationUrl: "",
  style: "",
  photosLink: "",
  managesOwnBooking: "",
  bookingPreference: "",
  consent: false,
}

function formatMessage(d: FormData) {
  return `
=== NIEUWE AANVRAAG ===
Naam: ${d.firstName}
Email: ${d.email}
Telefoon: ${d.phone}
Taal: ${d.language}

=== ACCOMMODATIE ===
Naam: ${d.accommodationName}
Locatie: ${d.locationCity}, ${d.locationCountry}
Platform Link: ${d.platformLink}
Kernpunten: ${d.keyFeatures}
Kleurvoorkeur: ${d.colorPreference}

=== OPTIONEEL ===
Huidige site: ${d.currentWebsite || "-"}
Google Business: ${d.googleBusinessProfile || "-"}
Foto link: ${d.photosLink || "-"}
Zelf beheer: ${d.managesOwnBooking || "-"}
Boekingsvoorkeur: ${d.bookingPreference || "-"}
  `.trim()
}

export function LeadFormStandalone() {
  const [step, setStep] = useState<"A" | "B" | "success">("A")
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    }
  }

  const validateStepA = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "Voornaam is verplicht"

    if (!formData.email.trim()) {
      newErrors.email = "E-mail is verplicht"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Voer een geldig e-mailadres in"
    }

    if (!formData.phone.trim()) newErrors.phone = "Telefoonnummer is verplicht"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStepB = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    if (!formData.accommodationName.trim()) {
      newErrors.accommodationName = "Naam accommodatie is verplicht"
    }
    if (!formData.locationCity.trim()) {
      newErrors.locationCity = "Plaats/regio is verplicht"
    }
    if (!formData.locationCountry.trim()) {
      newErrors.locationCountry = "Land is verplicht"
    }
    if (!formData.platformLink.trim()) {
      newErrors.platformLink = "Platform link is verplicht"
    }
    if (!formData.keyFeatures.trim()) {
      newErrors.keyFeatures = "Kernpunten zijn verplicht"
    }
    if (!formData.colorPreference.trim()) {
      newErrors.colorPreference = "Kleurvoorkeur is verplicht"
    }
    if (!formData.consent) {
      newErrors.consent = "Je moet akkoord gaan met de voorwaarden"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const resetForm = () => {
    setStep("A")
    setFormData(initialFormData)
    setErrors({})
    setIsSubmitting(false)
    setSubmitError("")
  }

  const handleSubmit = async () => {
    setSubmitError("")
    if (!validateStepB()) return

    setIsSubmitting(true)

    try {
      const ghlParams = new URLSearchParams()

      Object.entries({
        ...formData,
        source: "voorbeeldwebsite",
      }).forEach(([key, value]) => {
        ghlParams.append(key, String(value))
      })

      const web3Payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `Nieuwe aanvraag: ${formData.firstName} - ${formData.accommodationName}`,
        from_name: "TriviTurbo",
        name: formData.firstName,
        email: formData.email,
        message: formatMessage(formData),
        source: "voorbeeldwebsite",
        ...formData,
      }

      await Promise.all([
        fetch(`${GHL_WEBHOOK_URL}?${ghlParams.toString()}`, {
          method: "GET",
          mode: "no-cors",
        }),
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(web3Payload),
        }),
      ])

      setStep("success")
    } catch (err) {
      console.error(err)
      setSubmitError("Verzenden mislukt. Probeer het opnieuw.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const isCompactStep = step === "A"

  return (
    <div className="h-[100dvh] bg-[#1a3fd3] p-4 md:p-6 flex items-start md:items-center justify-center overflow-hidden">
      <div
        className={`relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl border border-white/30 overflow-hidden flex flex-col ${isCompactStep
          ? ""
          : "h-[calc(100dvh-2rem)] md:h-[calc(100dvh-3rem)] max-h-[820px]"
          }`}
      >
        <div className="shrink-0 bg-gradient-to-r from-[#072AC8] to-[#0095FF] p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-black text-white pr-10">
            {step === "success" ? "Aanvraag ontvangen" : "Gratis voorbeeldwebsite aanvragen"}
          </h2>

          {step !== "success" && (
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === "A" ? "bg-[#FCF300] text-[#072AC8]" : "bg-white/20 text-white"
                    }`}
                >
                  {step === "B" ? <Check className="w-4 h-4" /> : "1"}
                </div>
                <span className="text-white/80 text-sm">Contact</span>
              </div>

              <div className="w-12 h-0.5 bg-white/20" />

              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === "B" ? "bg-[#FCF300] text-[#072AC8]" : "bg-white/20 text-white"
                    }`}
                >
                  2
                </div>
                <span className="text-white/80 text-sm">Accommodatie</span>
              </div>
            </div>
          )}
        </div>

        <div
          className={`p-6 md:p-8 ${isCompactStep ? "" : "flex-1 min-h-0 overflow-y-auto overscroll-contain"
            }`}
        >
          {submitError && (
            <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitError}
            </div>
          )}

          {step === "A" && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-[#072AC8] mb-2">Voornaam *</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => updateField("firstName", e.target.value)}
                  placeholder="Bijv. Jan"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.firstName ? "border-red-400" : "border-[#072AC8]/12"
                    } bg-white text-[#072AC8] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 transition-all`}
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-[#072AC8] mb-2">E-mail *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="jan@voorbeeld.nl"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.email ? "border-red-400" : "border-[#072AC8]/12"
                    } bg-white text-[#072AC8] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 transition-all`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-[#072AC8] mb-2">Telefoon/WhatsApp *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="+31 6 12345678"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? "border-red-400" : "border-[#072AC8]/12"
                    } bg-white text-[#072AC8] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 transition-all`}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-[#072AC8] mb-2">Voorkeurstaal</label>
                <select
                  value={formData.language}
                  onChange={(e) => updateField("language", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#072AC8]/12 bg-white text-[#072AC8] focus:outline-none transition-all"
                >
                  <option value="NL">Nederlands</option>
                  <option value="EN">English</option>
                  <option value="DE">Deutsch</option>
                </select>
              </div>

              <div className="pt-4">
                <Button
                  onClick={() => validateStepA() && setStep("B")}
                  className="w-full bg-gradient-to-r from-[#072AC8] to-[#0095FF] text-white font-bold py-4 rounded-2xl shadow-lg"
                >
                  Volgende stap <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === "B" && (
            <div className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#072AC8] mb-2">Naam accommodatie *</label>
                  <input
                    type="text"
                    value={formData.accommodationName}
                    onChange={(e) => updateField("accommodationName", e.target.value)}
                    placeholder="Bijv. Villa Zeezicht"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.accommodationName ? "border-red-400" : "border-[#072AC8]/12"
                      } bg-white text-[#072AC8] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 transition-all`}
                  />
                  {errors.accommodationName && (
                    <p className="text-red-500 text-sm mt-1">{errors.accommodationName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#072AC8] mb-2">Land *</label>
                  <input
                    type="text"
                    value={formData.locationCountry}
                    onChange={(e) => updateField("locationCountry", e.target.value)}
                    placeholder="Bijv. Nederland"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.locationCountry ? "border-red-400" : "border-[#072AC8]/12"
                      } bg-white text-[#072AC8] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 transition-all`}
                  />
                  {errors.locationCountry && (
                    <p className="text-red-500 text-sm mt-1">{errors.locationCountry}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#072AC8] mb-2">Plaats/Regio *</label>
                <input
                  type="text"
                  value={formData.locationCity}
                  onChange={(e) => updateField("locationCity", e.target.value)}
                  placeholder="Bijv. Burgh-Haamstede"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.locationCity ? "border-red-400" : "border-[#072AC8]/12"
                    } bg-white text-[#072AC8] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 transition-all`}
                />
                {errors.locationCity && <p className="text-red-500 text-sm mt-1">{errors.locationCity}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-[#072AC8] mb-2">
                  Platform link (Airbnb/Booking) *
                </label>
                <input
                  type="url"
                  value={formData.platformLink}
                  onChange={(e) => updateField("platformLink", e.target.value)}
                  placeholder="Bijv. https://www.airbnb.com/rooms/12345678"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.platformLink ? "border-red-400" : "border-[#072AC8]/12"
                    } bg-white text-[#072AC8] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 transition-all`}
                />
                {errors.platformLink && <p className="text-red-500 text-sm mt-1">{errors.platformLink}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-[#072AC8] mb-2">Noem minimaal 5 kenmerken die jouw accommodatie uniek maken. *</label>
                <textarea
                  value={formData.keyFeatures}
                  onChange={(e) => updateField("keyFeatures", e.target.value)}
                  placeholder="Bijv. zwembad, zeezicht, 6 personen, privé terras, gratis parkeren"
                  rows={2}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.keyFeatures ? "border-red-400" : "border-[#072AC8]/12"
                    } bg-white text-[#072AC8] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 transition-all resize-none`}
                />
                {errors.keyFeatures && <p className="text-red-500 text-sm mt-1">{errors.keyFeatures}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-[#072AC8] mb-2">Kleurvoorkeur *</label>
                <input
                  type="text"
                  value={formData.colorPreference}
                  onChange={(e) => updateField("colorPreference", e.target.value)}
                  placeholder="Bijv. donkerblauw, wit en goud"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.colorPreference ? "border-red-400" : "border-[#072AC8]/12"
                    } bg-white text-[#072AC8] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 transition-all`}
                />
                {errors.colorPreference && (
                  <p className="text-red-500 text-sm mt-1">{errors.colorPreference}</p>
                )}
              </div>

              <div className="border-t pt-5 mt-6 space-y-4">
                <p className="text-sm font-bold text-[#4b5b8a]">Optionele informatie</p>

                <input
                  type="url"
                  placeholder="Huidige website URL"
                  value={formData.currentWebsite}
                  onChange={(e) => updateField("currentWebsite", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#072AC8]/12 bg-white text-[#072AC8] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 transition-all"
                />

                <input
                  type="url"
                  placeholder="Google Business Profile URL"
                  value={formData.googleBusinessProfile}
                  onChange={(e) => updateField("googleBusinessProfile", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#072AC8]/12 bg-white text-[#072AC8] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 transition-all"
                />

                <input
                  type="url"
                  placeholder="Foto's link (Dropbox/Drive)"
                  value={formData.photosLink}
                  onChange={(e) => updateField("photosLink", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#072AC8]/12 bg-white text-[#072AC8] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 transition-all"
                />

                <select
                  value={formData.managesOwnBooking}
                  onChange={(e) => updateField("managesOwnBooking", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#072AC8]/12 bg-white text-[#072AC8] focus:outline-none transition-all"
                >
                  <option value="">Beheer je zelf boekingen?</option>
                  <option value="yes">Ja</option>
                  <option value="no">Nee (Park/Beheerder)</option>
                </select>
              </div>

              <div className="pt-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => updateField("consent", e.target.checked)}
                    className="mt-1 w-5 h-5 rounded text-[#0095FF]"
                  />
                  <span className="text-sm text-[#4b5b8a]">
                    Akkoord: TriviTurbo mag mijn gegevens gebruiken voor het maken van een
                    voorbeeldwebsite. *
                  </span>
                </label>
                {errors.consent && <p className="text-red-500 text-sm mt-2">{errors.consent}</p>}
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  onClick={() => setStep("A")}
                  variant="outline"
                  className="border-[#072AC8]/12 text-[#072AC8] font-bold px-6 py-4 rounded-2xl"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" /> Terug
                </Button>

                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-[#072AC8] to-[#0095FF] text-white font-bold py-4 rounded-2xl shadow-lg"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verstuur aanvraag"}
                </Button>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>

              <h3 className="text-2xl font-bold text-[#072AC8] mb-4">
                Bedankt voor je aanvraag!
              </h3>

              <p className="text-[#4b5b8a] mb-8">
                We gaan direct aan de slag. Je hoort uiterlijk morgen van ons.
              </p>

              <Button
                onClick={() => {
                  window.location.href = "https://triviturbo.nl"
                }}
                className="bg-[#072AC8] text-white px-8 py-3 rounded-xl"
              >
                Terug naar TriviTurbo.nl
              </Button>

              <a
                href="https://triviturbo.nl"
                className="block mt-4 text-sm text-[#072AC8] underline underline-offset-4"
              >
                triviturbo.nl
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}