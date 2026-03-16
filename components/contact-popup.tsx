"use client"

import { useState } from "react"
import { useContactPopup } from "@/contexts/contact-popup-context"
import { Button } from "@/components/ui/button"
import { X, Loader2 } from "lucide-react"

const WEB3FORMS_ACCESS_KEY = "275c0cb4-71c7-4211-851d-855bbc323a0b"
const GHL_WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/5jh9KpAoe1eQ80Bfj9mP/webhook-trigger/drJeUe6mFz4tbn7tnOpv"

export function ContactPopup() {
  const { isContactOpen, closeContactPopup } = useContactPopup()
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)

    const dataToSend = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      subject: "Nieuwe aanvraag TriviTurbo",
      access_key: WEB3FORMS_ACCESS_KEY
    }

    try {
      await Promise.all([
        fetch(GHL_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          mode: "no-cors",
          body: JSON.stringify(dataToSend),
        }),
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        })
      ])

      setIsSuccess(true)
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isContactOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80">
      <div className="bg-white p-8 rounded-3xl max-w-md w-full relative">
        <button onClick={closeContactPopup} className="absolute top-4 right-4 text-black"><X /></button>

        {isSuccess ? (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Gelukt!</h2>
            <p className="text-gray-600">Check nu GHL of de data binnenkomt.</p>
            <Button onClick={closeContactPopup} className="mt-6">Sluiten</Button>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-900">Test Verbinding</h2>
            <input
              placeholder="Naam"
              className="w-full p-3 border rounded-xl text-black"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              placeholder="E-mail"
              className="w-full p-3 border rounded-xl text-black"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <textarea
              placeholder="Je vraag"
              className="w-full p-3 border rounded-xl text-black"
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
            <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              {isSubmitting ? <Loader2 className="animate-spin" /> : "Verstuur Test"}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}