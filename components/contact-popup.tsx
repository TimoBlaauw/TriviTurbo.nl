"use client"

import { useEffect, useState } from "react"
import { useContactPopup } from "@/contexts/contact-popup-context"
import { Button } from "@/components/ui/button"
import { X, Loader2, MessageCircle, Phone } from "lucide-react"

const WEB3FORMS_ACCESS_KEY = "275c0cb4-71c7-4211-851d-855bbc323a0b"

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

  // Lock background scroll while popup is open
  useEffect(() => {
    if (!isContactOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [isContactOpen])

  // Handle ESC key
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

  const handleSubmit = async () => {
    setSubmitError("")
    if (!validate()) return

    // Honeypot check
    if (botcheck.trim().length > 0) {
      setSubmitError("Er ging iets mis. Probeer het later opnieuw.")
      return
    }

    setIsSubmitting(true)

    try {
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `Nieuwe vraag van ${formData.name}`,
        from_name: "TriviTurbo Contact",
        name: formData.name,
        email: formData.email,
        phone: formData.phone || "-",
        message: formData.message,
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
        timestamp: new Date().toISOString(),
        botcheck,
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const result = await response.json()
      if (result?.success) {
        setIsSuccess(true)
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

  if (!isContactOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#072AC8]/80 backdrop-blur-sm" 
        onClick={handleClose} 
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-300">
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
            {isSuccess ? "Bericht ontvangen" : "Stel je vraag"}
          </h2>
          {!isSuccess && (
            <p className="text-white/80 mt-2">
              We reageren meestal binnen 1 werkdag.
            </p>
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto overscroll-contain max-h-[calc(90vh-160px)]">
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

          {isSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#072AC8] mb-3">
                Top — we hebben je bericht.
              </h3>
              <p className="text-[#4b5b8a] mb-6 leading-relaxed">
                We reageren meestal binnen 1 werkdag. Als het sneller moet: WhatsApp ons even op{" "}
                <a 
                  href="https://wa.me/31644792472" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#0095FF] font-semibold hover:underline"
                >
                  +31 6 44792472
                </a>
              </p>
              <Button
                onClick={handleClose}
                className="bg-gradient-to-r from-[#072AC8] to-[#0095FF] text-white font-bold px-8 py-4 rounded-2xl"
              >
                Sluiten
              </Button>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-[#072AC8] mb-2">
                  Naam <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Bijv. Jan"
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.name ? "border-red-400" : "border-[#072AC8]/12"
                  } bg-white text-[#072AC8] placeholder:text-[#8ba0d7] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 focus:border-[#0095FF] transition-all`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
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
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.email ? "border-red-400" : "border-[#072AC8]/12"
                  } bg-white text-[#072AC8] placeholder:text-[#8ba0d7] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 focus:border-[#0095FF] transition-all`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-[#072AC8] mb-2">
                  Telefoon/WhatsApp <span className="text-[#4b5b8a] font-normal">(optioneel)</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="+31 6 12345678"
                  className="w-full px-4 py-3 rounded-xl border border-[#072AC8]/12 bg-white text-[#072AC8] placeholder:text-[#8ba0d7] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 focus:border-[#0095FF] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#072AC8] mb-2">
                  Je vraag <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  placeholder="Waar kunnen we je mee helpen?"
                  rows={4}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.message ? "border-red-400" : "border-[#072AC8]/12"
                  } bg-white text-[#072AC8] placeholder:text-[#8ba0d7] focus:outline-none focus:ring-2 focus:ring-[#0095FF]/30 focus:border-[#0095FF] transition-all resize-none`}
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              {/* WhatsApp/Call Option */}
              <div className="bg-[#f0f6ff] rounded-2xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-[#25D366]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[#4b5b8a]">Liever even bellen of WhatsAppen?</p>
                  <a 
                    href="https://wa.me/31644792472" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#072AC8] font-bold hover:text-[#0095FF] transition-colors"
                  >
                    +31 6 44792472
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#072AC8] to-[#0095FF] text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Verzenden...
                    </>
                  ) : (
                    "Verstuur je vraag"
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
