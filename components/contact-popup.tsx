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

  const updateField = <K extends keyof ContactFormData>(key: K, value: ContactFormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {}
    if (!formData.name.trim()) newErrors.name = "Naam is verplicht"
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Geldig e-mailadres verplicht"
    }
    if (!formData.message.trim()) newErrors.message = "Je vraag is verplicht"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setSubmitError("")
    setIsSubmitting(true)

    try {
      // 1. Voorbereiden van de URL-stijl data (net als je browser-test)
      const queryParams = new URLSearchParams({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || "-",
        message: formData.message,
      }).toString();

      // 2. We sturen ze allebei, maar GHL sturen we nu via de "Query" methode
      await Promise.all([
        // Web3Forms (blijft via JSON, want dat werkte al)
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: "Nieuwe aanvraag TriviTurbo",
            ...formData
          }),
        }),
        // GHL (nu via de URL-methode die 100% werkte in je browser)
        fetch(`${GHL_WEBHOOK_URL}?${queryParams}`, {
          method: "GET", // We gebruiken GET omdat je browser-test ook een GET was
          mode: "no-cors"
        })
      ])

      setIsSuccess(true)
    } catch (err) {
      setSubmitError("Er ging iets mis bij het verzenden.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    closeContactPopup()
    setTimeout(() => {
      setFormData(initialFormData)
      setIsSuccess(false)
      setIsSubmitting(false)
    }, 300)
  }

  if (!isContactOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#072AC8]/80 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        <button onClick={handleClose} className="absolute top-4 right-4 z-10 w-10 h-10 bg-[#072AC8]/10 rounded-full flex items-center justify-center">
          <X className="w-5 h-5 text-[#072AC8]" />
        </button>

        <div className="bg-gradient-to-r from-[#072AC8] to-[#0095FF] p-6 md:p-8 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-black">{isSuccess ? "Verzonden!" : "Stel je vraag"}</h2>
          {!isSuccess && <p className="opacity-90 mt-2">We reageren meestal binnen 1 werkdag.</p>}
        </div>

        <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-160px)]">
          {isSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">✓</div>
              <p className="text-[#4b5b8a] mb-6">Top! We hebben je bericht ontvangen en gaan voor je aan de slag.</p>
              <Button onClick={handleClose} className="bg-[#072AC8] text-white px-8 py-3 rounded-xl">Sluiten</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <input placeholder="Naam *" className="w-full p-4 rounded-xl border border-gray-200" value={formData.name} onChange={(e) => updateField("name", e.target.value)} />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

              <input placeholder="E-mail *" className="w-full p-4 rounded-xl border border-gray-200" value={formData.email} onChange={(e) => updateField("email", e.target.value)} />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

              <input placeholder="Telefoon (optioneel)" className="w-full p-4 rounded-xl border border-gray-200" value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} />

              <textarea placeholder="Je vraag *" rows={4} className="w-full p-4 rounded-xl border border-gray-200" value={formData.message} onChange={(e) => updateField("message", e.target.value)} />
              {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}

              <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full bg-gradient-to-r from-[#072AC8] to-[#0095FF] text-white font-bold py-4 rounded-2xl shadow-lg">
                {isSubmitting ? <Loader2 className="animate-spin" /> : "Verstuur bericht"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}