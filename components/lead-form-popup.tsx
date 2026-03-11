"use client"

import { useEffect, useState } from "react"
import { usePopup } from "@/contexts/popup-context"
import { Button } from "@/components/ui/button"
import { X, ChevronRight, ChevronLeft, Check, Loader2 } from "lucide-react"

const WEB3FORMS_ACCESS_KEY = "275c0cb4-71c7-4211-851d-855bbc323a0b"

interface FormData {
  // Step A
  firstName: string
  email: string
  phone: string
  language: string

  // Step B - Required
  accommodationName: string
  locationCity: string
  locationCountry: string
  platformLink: string
  keyFeatures: string
  colorPreference: string

  // Step B - Optional
  currentWebsite: string
  googleBusinessProfile: string
  extraPlatformLinks: string
  inspirationUrl: string
  style: string
  photosLink: string

  managesOwnBooking: string
  bookingPreference: string

  channelManager: string
  channelManagerName: string

  desiredDomain: string

  // Consent
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

  channelManager: "",
  channelManagerName: "",

  desiredDomain: "",

  consent: false,
}

function formatMessage(d: FormData) {
  const lines: string[] = []

  lines.push("=== CONTACT ===")
  lines.push(`Voornaam: ${d.firstName}`)
  lines.push(`Email: ${d.email}`)
  lines.push(`Telefoon/WhatsApp: ${d.phone || "-"}`)
  lines.push(`Taal: ${d.language || "-"}`)
  lines.push("")

  lines.push("=== ACCOMMODATIE (required) ===")
  lines.push(`Naam accommodatie: ${d.accommodationName}`)
  lines.push(`Locatie: ${d.locationCity} (${d.locationCountry})`)
  lines.push(`Platform link: ${d.platformLink}`)
  lines.push(`Kernpunten: ${d.keyFeatures}`)
  lines.push(`Kleurvoorkeur: ${d.colorPreference}`)
  lines.push("")

  lines.push("=== OPTIONEEL ===")
  lines.push(`Huidige website: ${d.currentWebsite || "-"}`)
  lines.push(`Google Business Profile: ${d.googleBusinessProfile || "-"}`)
  lines.push(`Extra platform links: ${d.extraPlatformLinks || "-"}`)
  lines.push(`Inspiratie URL: ${d.inspirationUrl || "-"}`)
  lines.push(`Stijl: ${d.style || "-"}`)
  lines.push(`Foto's link: ${d.photosLink || "-"}`)
  lines.push(`Mag zelf boekingen beheren: ${d.managesOwnBooking || "-"}`)
  lines.push(`Boekingsvoorkeur: ${d.bookingPreference || "-"}`)
  lines.push(
    `Channel manager: ${d.channelManager || "-"}${d.channelManager === "yes" && d.channelManagerName ? ` (${d.channelManagerName})` : ""
    }`
  )
  lines.push(`Gewenste domeinnaam: ${d.desiredDomain || "-"}`)
  lines.push("")

  lines.push("=== CONSENT ===")
  lines.push(`Akkoord: ${d.consent ? "Ja" : "Nee"}`)

  return lines.join("\n")
}

export function LeadFormPopup() {
  const { isOpen, closePopup } = usePopup()
  const [step, setStep] = useState<"A" | "B" | "success">("A")
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [botcheck, setBotcheck] = useState("") // honeypot

  // ✅ Lock background scroll while popup is open
  useEffect(() => {
    if (!isOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen])

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const validateStepA = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "Voornaam is verplicht"
    if (!formData.email.trim()) {
      newErrors.email = "E-mail is verplicht"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Voer een geldig e-mailadres in"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStepB = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    if (!formData.accommodationName.trim()) newErrors.accommodationName = "Naam accommodatie is verplicht"
    if (!formData.locationCity.trim()) newErrors.locationCity = "Locatie is verplicht"
    if (!formData.locationCountry.trim()) newErrors.locationCountry = "Land is verplicht"
    if (!formData.platformLink.trim()) newErrors.platformLink = "Platform link is verplicht"
    if (!formData.keyFeatures.trim()) newErrors.keyFeatures = "Kernpunten zijn verplicht"
    if (!formData.colorPreference.trim()) newErrors.colorPreference = "Kleurvoorkeur is verplicht"
    if (!formData.consent) newErrors.consent = "Je moet akkoord gaan met de voorwaarden"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (validateStepA()) setStep("B")
  }

  const handleSubmit = async () => {
    setSubmitError("")
    if (!validateStepB()) return

    // Honeypot: bots fill it
    if (botcheck.trim().length > 0) {
      setSubmitError("Er ging iets mis. Probeer het later opnieuw.")
      return
    }

    setIsSubmitting(true)

    try {
      const message = formatMessage(formData)

      const payload: Record<string, any> = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `Nieuwe voorbeeldwebsite aanvraag: ${formData.firstName} — ${formData.accommodationName}`,
        from_name: "TriviTurbo",
        name: formData.firstName,
        email: formData.email,
        message,
        botcheck,
        ...formData, // extra velden ook meesturen
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const result = await response.json()
      if (result?.success) {
        setStep("success")
      } else {
        console.error("Web3Forms error:", result)
        setSubmitError("Verzenden mislukt. Probeer het opnieuw.")
      }
    } catch (err) {
      console.error(err)
      setSubmitError("Verzenden mislukt. Probeer het opnieuw.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    closePopup()
    setTimeout(() => {
      setStep("A")
      setFormData(initialFormData)
      setErrors({})
      setIsSubmitting(false)
      setSubmitError("")
      setBotcheck("")
    }, 300)
  }

  if (!isOpen) return null

  return (
    <div id="gratis-voorbeeldwebsite-formulier" className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#072AC8]/80 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-[#072AC8]/10 hover:bg-[#072AC8]/20 rounded-full flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-[#072AC8]" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-[#072AC8] to-[#0095FF] p-6 md:p-8">
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

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto overscroll-contain max-h-[calc(90vh-180px)]">
          {/* Honeypot */}
          <input
            type="text"
            value={botcheck}
            onChange={(e) => setBotcheck(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          {submitError && (
            <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitError}
            </div>
          )}

          {step === "A" && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-[#072AC8] mb-2">
                  Voornaam <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => updateField("firstName", e.target.value)}
                  placeholder="Bijv. Jan"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.firstName ? "border-red-400" : "border-[#072AC8]/12"
                    } bg-white text-[#072AC8] placeholder:text-[#8ba0d7] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 focus:border-[#0095FF] transition-all`}
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-[#072AC8] mb-2">
                  E-mail <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="jan@voorbeeld.nl"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.email ? "border-red-400" : "border-[#072AC8]/12"
                    } bg-white text-[#072AC8] placeholder:text-[#8ba0d7] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 focus:border-[#0095FF] transition-all`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-[#072AC8] mb-2">Telefoon/WhatsApp (optioneel)</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="+31 6 12345678"
                  className="w-full px-4 py-3 rounded-xl border border-[#072AC8]/12 bg-white text-[#072AC8] placeholder:text-[#8ba0d7] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 focus:border-[#0095FF] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#072AC8] mb-2">Voorkeurstaal (optioneel)</label>
                <select
                  value={formData.language}
                  onChange={(e) => updateField("language", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#072AC8]/12 bg-white text-[#072AC8] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 focus:border-[#0095FF] transition-all"
                >
                  <option value="NL">Nederlands</option>
                  <option value="EN">English</option>
                  <option value="DE">Deutsch</option>
                </select>
              </div>

              <div className="pt-4">
                <Button
                  onClick={handleNextStep}
                  className="w-full bg-gradient-to-r from-[#072AC8] to-[#0095FF] text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                >
                  Volgende stap
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === "B" && (
            <div className="space-y-5">
              {/* Required */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#072AC8] mb-2">
                    Naam accommodatie <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.accommodationName}
                    onChange={(e) => updateField("accommodationName", e.target.value)}
                    placeholder="Bijv. Villa Sunshine"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.accommodationName ? "border-red-400" : "border-[#072AC8]/12"
                      } bg-white text-[#072AC8] placeholder:text-[#8ba0d7] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 focus:border-[#0095FF] transition-all`}
                  />
                  {errors.accommodationName && (
                    <p className="text-red-500 text-sm mt-1">{errors.accommodationName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#072AC8] mb-2">
                    Land <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.locationCountry}
                    onChange={(e) => updateField("locationCountry", e.target.value)}
                    placeholder="Bijv. Spanje"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.locationCountry ? "border-red-400" : "border-[#072AC8]/12"
                      } bg-white text-[#072AC8] placeholder:text-[#8ba0d7] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 focus:border-[#0095FF] transition-all`}
                  />
                  {errors.locationCountry && (
                    <p className="text-red-500 text-sm mt-1">{errors.locationCountry}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#072AC8] mb-2">
                  Plaats/Regio <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.locationCity}
                  onChange={(e) => updateField("locationCity", e.target.value)}
                  placeholder="Bijv. Veluwe / Otterlo"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.locationCity ? "border-red-400" : "border-[#072AC8]/12"
                    } bg-white text-[#072AC8] placeholder:text-[#8ba0d7] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 focus:border-[#0095FF] transition-all`}
                />
                {errors.locationCity && <p className="text-red-500 text-sm mt-1">{errors.locationCity}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-[#072AC8] mb-2">
                  Link naar je belangrijkste platform advertentie <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  value={formData.platformLink}
                  onChange={(e) => updateField("platformLink", e.target.value)}
                  placeholder="https://www.airbnb.nl/rooms/..."
                  className={`w-full px-4 py-3 rounded-xl border ${errors.platformLink ? "border-red-400" : "border-[#072AC8]/12"
                    } bg-white text-[#072AC8] placeholder:text-[#8ba0d7] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 focus:border-[#0095FF] transition-all`}
                />
                {errors.platformLink && <p className="text-red-500 text-sm mt-1">{errors.platformLink}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-[#072AC8] mb-2">
                  5 kernpunten/bijzonderheden <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.keyFeatures}
                  onChange={(e) => updateField("keyFeatures", e.target.value)}
                  placeholder="Bijv: sauna, hond welkom, bos, open haard, jacuzzi"
                  rows={3}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.keyFeatures ? "border-red-400" : "border-[#072AC8]/12"
                    } bg-white text-[#072AC8] placeholder:text-[#8ba0d7] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 focus:border-[#0095FF] transition-all resize-none`}
                />
                {errors.keyFeatures && <p className="text-red-500 text-sm mt-1">{errors.keyFeatures}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-[#072AC8] mb-2">
                  Kleuren/branding voorkeur <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.colorPreference}
                  onChange={(e) => updateField("colorPreference", e.target.value)}
                  placeholder="Bijv: modern blauw/wit, natuurlijke tinten"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.colorPreference ? "border-red-400" : "border-[#072AC8]/12"
                    } bg-white text-[#072AC8] placeholder:text-[#8ba0d7] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 focus:border-[#0095FF] transition-all`}
                />
                {errors.colorPreference && <p className="text-red-500 text-sm mt-1">{errors.colorPreference}</p>}
              </div>

              {/* Optional */}
              <div className="border-t border-[#072AC8]/10 pt-5 mt-6">
                <p className="text-sm font-bold text-[#4b5b8a] mb-4">Optionele informatie</p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-[#072AC8] mb-2">Huidige website URL</label>
                    <input
                      type="url"
                      value={formData.currentWebsite}
                      onChange={(e) => updateField("currentWebsite", e.target.value)}
                      placeholder="https://..."
                      className="w-full px-4 py-3 rounded-xl border border-[#072AC8]/12 bg-white text-[#072AC8] placeholder:text-[#8ba0d7] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 focus:border-[#0095FF] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#072AC8] mb-2">Google Business Profile URL</label>
                    <input
                      type="url"
                      value={formData.googleBusinessProfile}
                      onChange={(e) => updateField("googleBusinessProfile", e.target.value)}
                      placeholder="https://..."
                      className="w-full px-4 py-3 rounded-xl border border-[#072AC8]/12 bg-white text-[#072AC8] placeholder:text-[#8ba0d7] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 focus:border-[#0095FF] transition-all"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-bold text-[#072AC8] mb-2">Extra platform links</label>
                  <input
                    type="text"
                    value={formData.extraPlatformLinks}
                    onChange={(e) => updateField("extraPlatformLinks", e.target.value)}
                    placeholder="Booking.com, VRBO links..."
                    className="w-full px-4 py-3 rounded-xl border border-[#072AC8]/12 bg-white text-[#072AC8] placeholder:text-[#8ba0d7] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 focus:border-[#0095FF] transition-all"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-bold text-[#072AC8] mb-2">Website inspiratie URL</label>
                  <input
                    type="url"
                    value={formData.inspirationUrl}
                    onChange={(e) => updateField("inspirationUrl", e.target.value)}
                    placeholder="Website die je mooi vindt..."
                    className="w-full px-4 py-3 rounded-xl border border-[#072AC8]/12 bg-white text-[#072AC8] placeholder:text-[#8ba0d7] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 focus:border-[#0095FF] transition-all"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-bold text-[#072AC8] mb-2">Gewenste stijl</label>
                  <select
                    value={formData.style}
                    onChange={(e) => updateField("style", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#072AC8]/12 bg-white text-[#072AC8] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 focus:border-[#0095FF] transition-all"
                  >
                    <option value="">Selecteer een stijl...</option>
                    <option value="luxe">Rustig & luxe</option>
                    <option value="modern">Modern & strak</option>
                    <option value="warm">Warm & gezellig</option>
                  </select>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-bold text-[#072AC8] mb-2">Foto's link (Drive/Dropbox/WeTransfer)</label>
                  <input
                    type="url"
                    value={formData.photosLink}
                    onChange={(e) => updateField("photosLink", e.target.value)}
                    placeholder="Link naar je foto's..."
                    className="w-full px-4 py-3 rounded-xl border border-[#072AC8]/12 bg-white text-[#072AC8] placeholder:text-[#8ba0d7] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 focus:border-[#0095FF] transition-all"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-bold text-[#072AC8] mb-2">Mag je zelf je boekingen beheren?</label>
                  <select
                    value={formData.managesOwnBooking}
                    onChange={(e) => {
                      updateField("managesOwnBooking", e.target.value)
                      updateField("bookingPreference", "")
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-[#072AC8]/12 bg-white text-[#072AC8] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 focus:border-[#0095FF] transition-all"
                  >
                    <option value="">Selecteer...</option>
                    <option value="yes">Ja</option>
                    <option value="no">Nee, mijn beheerder/park regelt dit (bijv. Landal/Roompot)</option>
                    <option value="unknown">Weet ik niet</option>
                  </select>
                </div>

                {formData.managesOwnBooking && (
                  <div className="mt-4">
                    <label className="block text-sm font-bold text-[#072AC8] mb-2">Boekingsvoorkeur</label>
                    <select
                      value={formData.bookingPreference}
                      onChange={(e) => updateField("bookingPreference", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#072AC8]/12 bg-white text-[#072AC8] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 focus:border-[#0095FF] transition-all"
                    >
                      <option value="">Selecteer...</option>

                      {formData.managesOwnBooking === "yes" && (
                        <>
                          <option value="requests">Alleen aanvragen</option>
                          <option value="calendar">Kalender + boekingsaanvraag</option>
                        </>
                      )}

                      {formData.managesOwnBooking === "no" && (
                        <option value="redirect">
                          Doorklik naar officiële boekingspagina van beheerder/park (bijv. Landal/Roompot) + korte uitleg op de site
                        </option>
                      )}

                      {formData.managesOwnBooking === "unknown" && (
                        <>
                          <option value="requests">Alleen aanvragen</option>
                          <option value="calendar">Kalender + boekingsaanvraag</option>
                          <option value="redirect">
                            Doorklik naar officiële boekingspagina van beheerder/park (bijv. Landal/Roompot) + korte uitleg op de site
                          </option>
                        </>
                      )}
                    </select>
                  </div>
                )}

                <div className="mt-4">
                  <label className="block text-sm font-bold text-[#072AC8] mb-2">
                    Gebruik je software die je beschikbaarheid automatisch synchroniseert (channel manager)?
                  </label>
                  <select
                    value={formData.channelManager}
                    onChange={(e) => {
                      updateField("channelManager", e.target.value)
                      if (e.target.value !== "yes") updateField("channelManagerName", "")
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-[#072AC8]/12 bg-white text-[#072AC8] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 focus:border-[#0095FF] transition-all"
                  >
                    <option value="">Selecteer...</option>
                    <option value="yes">Ja</option>
                    <option value="no">Nee</option>
                    <option value="unknown">Weet ik niet</option>
                  </select>
                </div>

                {formData.channelManager === "yes" && (
                  <div className="mt-4">
                    <label className="block text-sm font-bold text-[#072AC8] mb-2">Welke software?</label>
                    <input
                      type="text"
                      value={formData.channelManagerName}
                      onChange={(e) => updateField("channelManagerName", e.target.value)}
                      placeholder="Bijv. Lodgify, Smoobu, Hostaway..."
                      className="w-full px-4 py-3 rounded-xl border border-[#072AC8]/12 bg-white text-[#072AC8] placeholder:text-[#8ba0d7] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 focus:border-[#0095FF] transition-all"
                    />
                  </div>
                )}

                <div className="mt-4">
                  <label className="block text-sm font-bold text-[#072AC8] mb-2">Gewenste domeinnaam</label>
                  <input
                    type="text"
                    value={formData.desiredDomain}
                    onChange={(e) => updateField("desiredDomain", e.target.value)}
                    placeholder="Bijv. villasunshine.nl"
                    className="w-full px-4 py-3 rounded-xl border border-[#072AC8]/12 bg-white text-[#072AC8] placeholder:text-[#8ba0d7] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 focus:border-[#0095FF] transition-all"
                  />
                </div>
              </div>

              {/* Consent */}
              <div className="border-t border-[#072AC8]/10 pt-5 mt-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => updateField("consent", e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-[#072AC8]/20 text-[#0095FF] focus:ring-[#0095FF]/30"
                  />
                  <span className="text-sm text-[#4b5b8a] leading-relaxed">
                    Akkoord: TriviTurbo gebruikt mijn gegevens om een gratis voorbeeldwebsite te maken en contact op te nemen.{" "}
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                {errors.consent && <p className="text-red-500 text-sm mt-2">{errors.consent}</p>}
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  onClick={() => setStep("A")}
                  variant="outline"
                  className="border-[#072AC8]/12 text-[#072AC8] font-bold px-6 py-4 rounded-2xl"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Terug
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-[#072AC8] to-[#0095FF] text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Verzenden...
                    </>
                  ) : (
                    <>
                      Verstuur aanvraag
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-gradient-to-br from-[#01BCFF]/20 to-[#0095FF]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-[#0095FF]" />
              </div>
              <h3 className="text-2xl font-black text-[#072AC8] mb-4">Je aanvraag is ontvangen</h3>
              <p className="text-[#4b5b8a] leading-relaxed mb-6 max-w-md mx-auto">
                Je ontvangt je persoonlijke voorbeeldwebsite binnen 48 uur. Houd je inbox in de gaten.
              </p>
              <Button
                onClick={handleClose}
                className="bg-gradient-to-r from-[#072AC8] to-[#0095FF] text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                Sluiten
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}