"use client"

import { useEffect, useState } from "react"
import { useContactPopup } from "@/contexts/contact-popup-context"
import { Button } from "@/components/ui/button"
import { X, Loader2, MessageCircle } from "lucide-react"

const WEB3FORMS_ACCESS_KEY = "275c0cb4-71c7-4211-851d-855bbc323a0b"
const GHL_WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/5jh9KpAoe1eQ80Bfj9mP/webhook-trigger/drJeUe6mFz4tbn7tnOpv"

interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
}

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  message: "",
}

export function ContactPopup() {
  const { isContactOpen, closeContactPopup } = useContactPopup()
  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const [botcheck, setBotcheck] = useState("")

  useEffect(() => {
    if (!isContactOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [isContactOpen])

  useEffect(() => {
    if (!isContactOpen) return
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [isContactOpen])

  const updateField = <K extends keyof ContactFormData>(key: K, value: ContactFormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {}
    if (!formData.name.trim()) newErrors.name = "Naam is verplicht"
    if (!formData.email.trim()) {
      newErrors.email = "E-mail is verplicht"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Voer een geldig e-mailadres in"
    }
    if (!formData.message.trim()) newErrors.message = "Je vraag is verplicht"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleClose = () => {
    closeContactPopup()
    setTimeout(() => {
      setFormData(initialFormData)
      setErrors({})
      setIsSubmitting(false)
      setSubmitError("")
      setIsSuccess(false)
      setBotcheck("")
    }, 300)
  }

  const handleSubmit = async () => {
    setSubmitError("")
    if (!validate()) return

    if (botcheck.trim().length > 0) {
      setSubmitError("Er ging iets mis.")
      return
    }

    setIsSubmitting(true)

    try {
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: "Nieuwe website aanvraag TriviTurbo",
        from_name: "TriviTurbo Contact",
        name: formData.name,
        email: formData.email,
        phone: formData.phone || "-",
        message: formData.message,
      }

      const [web3Response, ghlResponse] = await Promise.all([
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }),
        fetch(GHL_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
          }),
        }),
      ])

      if (web3Response.ok || ghlResponse.ok) {
        setIsSuccess(true)
      } else {
        setSubmitError("Verzenden mislukt. Probeer het opnieuw.")
      }
    } catch (err) {
      setSubmitError("Verbindingsfout.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isContactOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#072AC8]/80 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-[#072AC8]/10 hover:bg-[#072AC8]/20 rounded-full flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-[#072AC8]" />
        </button>

        <div className="bg-gradient-to-r from-[#072AC8] to-[#0095FF] p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-black text-white pr-10">
            {isSuccess ? "Bericht ontvangen" : "Stel je vraag"}
          </h2>
          {!isSuccess && <p className="text-white/80 mt-2">We reageren meestal binnen 1 werkdag.</p>}
        </div>

        <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-160px)]">
          <input type="text" value={botcheck} onChange={(e) => setBotcheck(e.target.value)} className="hidden" />

          {submitError && (
            <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitError}
            </div>
          )}

          {isSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#072AC8] mb-3">Top — we hebben je bericht.</h3>
              <p className="text-[#4b5b8a] mb-6 leading-relaxed">We reageren meestal binnen 1 werkdag.</p>
              <Button onClick={handleClose} className="bg-gradient-to-r from-[#072AC8] to-[#0095FF] text-white font-bold px-8 py-4 rounded-2xl">
                Sluiten
              </Button>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-[#072AC8] mb-2">Naam *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Bijv. Jan"
                  className="w-full px-4 py-3 rounded-xl border border-[#072AC8]/12 bg-white text-[#072AC8] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 transition-all"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-[#072AC8] mb-2">E-mail *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="jan@voorbeeld.nl"
                  className="w-full px-4 py-3 rounded-xl border border-[#072AC8]/12 bg-white text-[#072AC8] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 transition-all"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-[#072AC8] mb-2">Telefoon/WhatsApp</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="+31 6 12345678"
                  className="w-full px-4 py-3 rounded-xl border border-[#072AC8]/12 bg-white text-[#072AC8] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#072AC8] mb-2">Je vraag *</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  placeholder="Waar kunnen we je mee helpen?"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-[#072AC8]/12 bg-white text-[#072AC8] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 transition-all resize-none"
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full bg-gradient-to-r from-[#072AC8] to-[#0095FF] text-white font-bold py-4 rounded-2xl shadow-lg transition-all disabled:opacity-70">
                {isSubmitting ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : "Verstuur je vraag"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}